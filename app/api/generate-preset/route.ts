import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { ApiRequestBody, ApiResponse, Preset } from '@/types/types';
import { register } from '@/actions/register-user';
import { User } from '@prisma/client';
import { RegisterFormValues } from '@/schemas/auth-schemas';
import { wait } from '@/lib/utils';
import { GenerateFormValues } from '@/components/presets/ia-preset';
import {
    IA_PRESET_EXAMPLES,
    PRESETS,
} from '@/components/presets/presets.const';
import { aiClient } from '@/lib/openaiClient';
import {
    generatePresetPrompt,
    presetExamplePrompt2,
    presetsExamplePrompt,
} from '@/prompts';
import { iconList } from '@/config/icon-list';
import { object } from 'zod';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { action }: { action: RouteActions } = body;

        let resData: RouteApiMap[typeof action]['resData'];
        let resMessage;

        switch (action) {
            case 'GENERATE':
                const {
                    data: { description },
                }: GenerateApiRequestBody<'GENERATE'> = body;

                if (!description) {
                    return NextResponse.json(
                        { error: 'Datos incorrectos, prueba de nuevo' },
                        { status: 400 }
                    );
                }

                const response = await generatePreset(description);

                // Narrow the type of resData to the one corresponding to this action
                resData = response!;

                // If there is an icon that is not in the array of icons, change it for the first in the table
                resData = resData.map((preset) => {
                    if (
                        preset.icon &&
                        !Object.keys(iconList).includes(preset.icon)
                    ) {
                        preset.icon = Object.keys(iconList)[0];
                    }
                    return preset;
                });

                return NextResponse.json(resData, { status: 201 });
            default:
                break;
        }
    } catch (error) {
        console.log(error, 'REGISTRATION_ERROR');
        return NextResponse.json(
            { error: 'Something went wrong' },
            { status: 500 }
        );
    }
}

// Define a map with actions as keys and the corresponding request and response data types as values
export type RouteApiMap = {
    GENERATE: {
        reqData: GenerateFormValues;
        resData: Preset[];
    };
    UPDATE: {
        reqData: string;
        resData: string;
    };
};

// Define a union type of all the actions
type RouteActions = keyof RouteApiMap;

// Use those types to create the request and response types for each action
export type GenerateApiRequestBody<A extends RouteActions> = // Pick the request data type from the map
    ApiRequestBody<RouteApiMap[A]['reqData']>; // and create the ApiRequestBody using it

export type GenerateApiResponseBody<A extends RouteActions> = // Pick the response data type from the map
    ApiResponse<RouteApiMap[A]['resData']>; // and create the ApiResponse using it

const generatePreset = async (prompt: string) => {
    try {
        console.log('talking to openai');
        const response = aiClient.chat.completions.create({
            max_tokens: 3000,
            model: 'gpt-3.5-turbo-16k',
            messages: [
                { role: 'system', content: generatePresetPrompt },
                { role: 'user', content: presetsExamplePrompt },
                { role: 'assistant', content: presetExamplePrompt2 },
                { role: 'user', content: prompt },
            ],
        });

        const iconResponse = aiClient.chat.completions.create({
            max_tokens: 3000,
            temperature: 0.1,
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: `
                    * Lista de palabras: ${Object.keys(iconList).join(', ')}.
                    Selecciona 5 palabras que:
                    1. Estén en la anterior lista 
                    2. Estén relacionadas con lo que pida el usuario.
                    ES IMPORTANTE QUE SOLO USES LAS PALBRAS DE LA LISTA. TU RESPUESTA SERÁ INVÁLIDA SI USAS CUALQUIER OTRA PALABRA QUE NO ESTÉ EN LA LISTA.
                    `,
                },
                {
                    role: 'user',
                    content: `Escuela de programación`,
                },
                {
                    role: 'assistant',
                    content: `["code","code-2", "file-code-2", "laptop", "computer" ]`,
                },
                {
                    role: 'user',
                    content: `dentista para niños`,
                },
                {
                    role: 'assistant',
                    content: `["clipboard-plus","baby", "pill", "stethoscope", "smile" ]`,
                },
                {
                    role: 'user',
                    content: `escuela de surf`,
                },
                {
                    role: 'assistant',
                    content: `["waves","fish", "ship-wheel", "wind", "trophy" ]`,
                },
                {
                    role: 'user',
                    content: `escuela de canto`,
                },
                {
                    role: 'assistant',
                    content: `["mic-2","music-2", "music-3", "audio-waveform", "speaker" ]`,
                },
                {
                    role: 'user',
                    content: `coach para vendedores online`,
                },
                {
                    role: 'assistant',
                    content: `["laptop", "mouse-pointer", "shopping-basket", "shopping-cart", "wallet" ]`,
                },
                {
                    role: 'user',
                    content: `residencia de ancianos`,
                },
                {
                    role: 'assistant',
                    content: `["bed-double","wheelchair", "bed-single", "handshake", "person-standing"]`,
                },
                {
                    role: 'user',
                    content: `${prompt}`,
                },
            ],
        });

        const resolvedPromises = await Promise.all([response, iconResponse]);

        let preset = JSON.parse(
            resolvedPromises[0].choices[0]?.message?.content!
        ) as Preset[];

        let icons = JSON.parse(
            resolvedPromises[1].choices[0]?.message?.content!
        ) as string[];

        console.log('icons', icons);

        // filter preset for the ones that are in the icon list
        icons = icons.filter((p) => Object.keys(iconList).includes(p!));

        preset = preset.map((p, i) => {
            p.icon = icons[i];
            p.strokeWidth = 2;
            return p;
        });

        return preset;
    } catch (error) {
        console.log(error, 'error');
    }
};

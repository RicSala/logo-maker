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

                console.log('response', response?.choices[0]?.message?.content);
                // Narrow the type of resData to the one corresponding to this action
                resData = JSON.parse(
                    response?.choices[0]?.message?.content!
                ) as Preset[];

                console.log(description, 'description');

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
        const response = await aiClient.chat.completions.create({
            max_tokens: 3000,
            model: 'gpt-3.5-turbo-16k',
            messages: [
                { role: 'system', content: generatePresetPrompt },
                { role: 'user', content: presetsExamplePrompt },
                { role: 'assistant', content: presetExamplePrompt2 },
                { role: 'user', content: prompt },
            ],
        });
        console.log(response, 'response');
        return response;
    } catch (error) {
        console.log(error, 'error');
    }
};

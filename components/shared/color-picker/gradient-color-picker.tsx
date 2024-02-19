'use client';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { AppContext } from '@/providers/app/app-provider';
import { useCallback, useContext, useEffect, useState } from 'react';
import BestGradientColorPicker, {
    useColorPicker,
} from 'react-best-gradient-color-picker';
import { SliderWithLabel } from '../slider-with-label';

type GradientColorPickerProps = {
    setColor: (color: string) => void;
    setIsGradient: (isGradient: boolean) => void;
    color: string;
};

export function GradientColorPicker({
    setColor,
    setIsGradient,
    color,
}: GradientColorPickerProps) {
    const { logo } = useContext(AppContext);

    const {
        setSolid,
        setGradient,
        isGradient,
        gradientType,
        setLinear,
        setRadial,
        degrees,
        setDegrees,
    } = useColorPicker(color, setColor);

    useEffect(() => {
        setIsGradient(isGradient);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGradient]);

    return (
        <div className='space-y-2'>
            <div className='flex justify-between'>
                <Label className='text-sm'>Color</Label>
                {/* <Label className='text-sm'>{value}</Label> */}
            </div>{' '}
            {/* REVIEW: Why they work as arrow functions but they don't as just passing the functions? */}
            <div className='flex items-center space-x-2 justify-center rbgcp-control-icon-bt'>
                <Label htmlFor='airplane-mode'>Sólido</Label>
                <Switch
                    id='airplane-mode'
                    checked={isGradient === true}
                    onCheckedChange={(checked: boolean) => {
                        // @ts-ignore
                        checked ? setGradient() : setSolid('#000000');
                    }}
                />
                <Label htmlFor='airplane-mode'>Gradiente</Label>
            </div>
            <BestGradientColorPicker
                width={250}
                value={color}
                onChange={(value: string) => {
                    console.log('color picked', value);
                    setColor(value);
                }}
                className={`
                mx-auto
                `}
            />
            <GradientSettings
                gradientType={gradientType}
                setLinear={setLinear}
                setRadial={setRadial}
                degrees={degrees}
                setDegrees={setDegrees}
            />
            <style>{`
               
                
                `}</style>
        </div>
    );
}

type GradientSettingsProps = {
    degrees: number;
    setDegrees: (n: number) => void;
    setLinear: () => void;
    setRadial: () => void;
    gradientType: any;
};

const GradientSettings = ({
    degrees,
    setDegrees,
    gradientType,
    setLinear,
    setRadial,
}: GradientSettingsProps) => {
    return (
        <div className='flex flex-col gap-2'>
            <div className='flex items-center space-x-2 justify-center rbgcp-control-icon-bt'>
                <Label>Linear</Label>
                <Switch
                    checked={gradientType === 'radial-gradient'}
                    onCheckedChange={(checked: boolean) => {
                        checked ? setRadial() : setLinear();
                    }}
                />
                <Label>Radial</Label>
            </div>
            {gradientType === 'linear-gradient' && (
                <div>
                    <SliderWithLabel
                        label='Rotación de degradado'
                        min={0}
                        max={360}
                        value={degrees}
                        onChange={(value) => {
                            setDegrees(value);
                        }}
                    />
                </div>
            )}
        </div>
    );
};

//  /*INPUTS*/
//  .rbgcp-input {
//     background-color: hsl(var(--secondary))!important;
//     color: hsl(var(--secondary-foreground))!important;
// }

// .rbgcp-input-label {
//     color: hsl(var(--secondary-foreground))!important;
// }

// #rbgcp-inputs-wrap {
//     overflow: hidden;
// }

// #paintSquare {
//     max-width: 100%;
//     border-radius: 0.5rem;
//     margin: 0 auto;
// }

// .rbgcp-handle {
//     width: 1.5rem;
// }

// #rbgcp-wrapper > div.c-resize.ps-rl > canvas {
//     width: 100%
// }

// TODO: Improve styles
// STYLES - PENDIND

// /*BUTTONS AND ICONS*/
// .rbgcp-control-btn-wrapper {
//     background-color: hsl(var(--secondary))!important;
// }

// .rbgcp-control-icon2 {
//     stroke: hsl(var(--primary))!important;
// }
// .rbgcp-control-icon {
//     stroke: hsl(var(--primary))!important;
// }

// #rbgcp-degree-input {
//     color: hsl(var(--primary))!important;
// }

// .rbgcp-degree-icon {
//     color: hsl(var(--primary))!important;
// }

'use client';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { AppContext } from '@/providers/app-provider';
import { useCallback, useContext, useEffect, useState } from 'react';
import BestGradientColorPicker, {
    useColorPicker,
} from 'react-best-gradient-color-picker';
import { SliderWithLabel } from '../slider-with-label';

export function GradientColorPicker({}) {
    const { logo, setBackgroundColor, setIsGradientBackground } =
        useContext(AppContext);

    const {
        setSolid,
        setGradient,
        isGradient,
        gradientType,
        setLinear,
        setRadial,
        degrees,
        setDegrees,
    } = useColorPicker(logo.backgroundColor, setBackgroundColor);

    // REVIEW: CHECK WITH COMEAU. I don't like this pattern of controlling a state with a useEffect and syncing it with another state.
    //  What should be the best way to do this? Should lift the hook to the context? isn't that an overkill?
    useEffect(() => {
        setIsGradientBackground(isGradient);
    }, [isGradient, setIsGradientBackground]);

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
                        checked ? setGradient() : setSolid();
                    }}
                />
                <Label htmlFor='airplane-mode'>Gradiente</Label>
            </div>
            <BestGradientColorPicker
                value={logo.backgroundColor}
                onChange={(value: string) => {
                    console.log('color picked', value);
                    setBackgroundColor(value);
                }}
                className={''}
                hideColorTypeBtns
                hideGradientStop
                // hideGradientControls
                hideAdvancedSliders
                hideColorGuide
                height={200}
            />
            <GradientSettings
                gradientType={gradientType}
                setLinear={setLinear}
                setRadial={setRadial}
                degrees={degrees}
                setDegrees={setDegrees}
            />
            <style>{`
                /*INPUTS*/
                .rbgcp-input {
                    background-color: hsl(var(--secondary))!important;
                    color: hsl(var(--secondary-foreground))!important;
                }

                .rbgcp-input-label {
                    color: hsl(var(--secondary-foreground))!important;
                }
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

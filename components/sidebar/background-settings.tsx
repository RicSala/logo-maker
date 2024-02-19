'use client';

import { useContext } from 'react';
import { ColorPicker } from '../shared/color-picker/color-picker';
import { SliderWithLabel } from '../shared/slider-with-label';
import { AppContext } from '@/providers/app/app-provider';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { set } from 'zod';
import { GradientColorPicker } from '../shared/color-picker/gradient-color-picker';

export function BackgroundSettings({}) {
    const {
        logo,
        setBorderRadius,
        setBgRotate,
        setBackgroundColor,
        setIsGradientBackground,
    } = useContext(AppContext);

    return (
        <div className='flex flex-col gap-8 mt-8'>
            <SliderWithLabel
                key={'bg-rotate'}
                label='Rotar fondo'
                value={logo.bgRotate}
                onChange={setBgRotate}
                step={15}
                min={0}
                max={360}
            />
            <SliderWithLabel
                key={'rounded'}
                label='Redondeo esquinas'
                value={logo.borderRadius}
                onChange={setBorderRadius}
                min={0}
                max={100}
            />
            <GradientColorPicker
                color={logo.backgroundColor}
                setColor={setBackgroundColor}
                setIsGradient={setIsGradientBackground}
            />
        </div>
    );
}

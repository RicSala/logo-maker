'use client';

import { useContext } from 'react';
import { ColorPicker } from './shared/color-picker/color-picker';
import { SliderWithLabel } from './shared/slider-with-label';
import { AppContext } from '@/providers/app-provider';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { set } from 'zod';
import { GradientColorPicker } from './shared/color-picker/gradient-color-picker';

export function BackgroundSettings({}) {
    const { logo, setBorderRadius } = useContext(AppContext);

    return (
        <div className='flex flex-col gap-8 mt-8'>
            <SliderWithLabel
                key={'rounded'}
                label='Redondeo esquinas'
                value={logo.borderRadius}
                onChange={setBorderRadius}
                min={0}
                max={200}
            />
            <GradientColorPicker />
        </div>
    );
}

'use client';

import { useContext, useState } from 'react';
import { ColorPicker } from '../shared/color-picker/color-picker';
import { SliderWithLabel } from '../shared/slider-with-label';
import { AppContext } from '@/providers/app/app-provider';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import IconGrid from '../icon-selector';
import { kebabCaseToCapitlizedCamelCase, kebabCaseToString } from '@/lib/utils';
import IconComp from '../icon-comp';
import { IconSelectorModal } from '../icon-selector-modal';
import { FontSelector } from '../FontSelector';

export function IconSettings({}) {
    const {
        logo,
        setIconSize,
        setIconRotation,
        setStrokeWidth,
        setStrokeColor,
        setFillColor,
        setIsFilled,
        setFontSize,
        setIconTranslateX,
        setIconTranslateY,
        setFontFamily,
    } = useContext(AppContext);

    // console.log('logo', logo);

    return (
        <div className='flex flex-col gap-4'>
            <IconSelectorModal />

            <SliderWithLabel
                key={'size'}
                label='Tamaño'
                value={logo.size}
                onChange={setIconSize}
            />

            <SliderWithLabel
                key={'translateX'}
                label='Mover horizontal'
                value={logo.iconTranslateX}
                onChange={setIconTranslateX}
                min={-50}
                max={50}
                step={1}
            />
            <SliderWithLabel
                key={'translateY'}
                label='Mover Vertical'
                value={logo.iconTranslateY}
                onChange={setIconTranslateY}
                min={-50}
                max={50}
                step={1}
            />
            <SliderWithLabel
                key={'rotation'}
                label='Rotar icono'
                value={logo.rotation}
                onChange={setIconRotation}
                min={-180}
                max={180}
            />
            <SliderWithLabel
                label='Grosor de trazo'
                value={logo.strokeWidth}
                onChange={setStrokeWidth}
                min={0.2}
                max={5}
                step={0.1}
            />
            <ColorPicker
                label={'Color de línea'}
                value={logo.strokeColor}
                setValue={setStrokeColor}
            />
            <div className='flex items-center space-x-2'>
                <Switch
                    id='fill-toggle'
                    checked={logo.isFilled}
                    onCheckedChange={setIsFilled}
                />
                <Label htmlFor='airplane-mode'>Rellenar icono</Label>
            </div>
            <ColorPicker
                disabled={!logo.isFilled}
                label={'Color de relleno'}
                value={logo.fillColor}
                setValue={setFillColor}
            />
        </div>
    );
}

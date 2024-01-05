'use client';

import { useContext, useState } from 'react';
import { ColorPicker } from './shared/color-picker/color-picker';
import { SliderWithLabel } from './shared/slider-with-label';
import { AppContext } from '@/providers/app-provider';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import IconGrid from './icon-selector';
import { kebabCaseToCapitlizedCamelCase, kebabCaseToString } from '@/lib/utils';
import IconComp from './lucide-icon';
import { IconSelectorModal } from './icon-selector-modal';

export function IconSettings({}) {
    const {
        iconSize,
        setIconSize,
        iconRotation,
        setIconRotation,
        strokeWidth,
        setStrokeWidth,
        strokeColor,
        setStrokeColor,
        fillColor,
        setFillColor,
        isFilled,
        setIsFilled,
        logoIcon,
    } = useContext(AppContext);

    return (
        <div className='flex flex-col gap-4'>
            <IconSelectorModal />
            <SliderWithLabel
                key={'size'}
                label='Size'
                value={iconSize}
                onChange={setIconSize}
            />
            <SliderWithLabel
                key={'rotation'}
                label='Rotate'
                value={iconRotation}
                onChange={setIconRotation}
            />
            <SliderWithLabel
                label='Border width'
                value={strokeWidth}
                onChange={setStrokeWidth}
                min={0.2}
                max={5}
                step={0.1}
            />
            <ColorPicker
                label={'Color de línea'}
                value={strokeColor}
                setValue={setStrokeColor}
            />
            <div className='flex items-center space-x-2'>
                <Switch
                    id='airplane-mode'
                    checked={isFilled}
                    onCheckedChange={setIsFilled}
                />
                <Label htmlFor='airplane-mode'>Rellenar icono</Label>
            </div>
            <ColorPicker
                disabled={!isFilled}
                label={'Color de relleno'}
                value={fillColor}
                setValue={setFillColor}
            />
        </div>
    );
}

'use client';

import { useContext } from 'react';
import { SliderWithLabel } from '../shared/slider-with-label';
import { AppContext } from '@/providers/app/app-provider';
import { FontSelector } from '../FontSelector';
import { GradientColorPicker } from '../shared/color-picker/gradient-color-picker';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export function TextSettings({}) {
    const {
        logo,
        setLogoTextTranslateY,
        setLogoTextTranslateX,
        setFontFamily,
        setFontSize,
        setFontWeight,
        setFontColor,
        setIsGradientFont,
        setLogoText,
        setTextTranslateX,
        setTextTranslateY,
    } = useContext(AppContext);

    // console.log('logo', logo);

    return (
        <div className='flex flex-col gap-4'>
            <div>
                <Label>Texto</Label>
                <Input
                    value={logo.text}
                    className='border border-primary/30'
                    onChange={(e) => setLogoText(e.target.value)}
                />
            </div>
            <FontSelector onSelect={setFontFamily} selectedFont='inter' />
            <SliderWithLabel
                key={'font-weight'}
                label='Grosor de letra'
                value={logo.fontWeight}
                onChange={setFontWeight}
                min={200}
                max={800}
                step={1}
            />
            <SliderWithLabel
                key={'font-size'}
                label='Tamaño de letra'
                value={logo.fontSize}
                onChange={setFontSize}
            />
            <SliderWithLabel
                key={'translateX'}
                label='Mover horizontal'
                value={logo.textTranslateX}
                onChange={setTextTranslateX}
                min={-50}
                max={50}
                step={1}
            />
            <SliderWithLabel
                key={'translateY'}
                label='Mover Vertical'
                value={logo.textTranslateY}
                onChange={setTextTranslateY}
                min={-50}
                max={50}
                step={1}
            />
            <GradientColorPicker
                color={logo.fontColor}
                setColor={setFontColor}
                setIsGradient={setIsGradientFont}
            />
        </div>
    );
}

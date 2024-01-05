// Reference: https://uiwjs.github.io/react-color/
// Gradient color picker: https://gradient-package-demo.web.app/

'use client';

import { hexToHsva, hsvaToHex, validHex } from '@uiw/react-color';
import Circle from '@uiw/react-color-circle';
import ColorSlider from '@uiw/react-color-slider';
import ColorSaturation from '@uiw/react-color-saturation';
import ColorHue from '@uiw/react-color-hue';
import HexInput from '@uiw/react-color-editable-input';
import RGBAInput from '@uiw/react-color-editable-input-rgba';

import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Label } from '@radix-ui/react-dropdown-menu';

type ColorPickerProps = {
    label: string;
    value: string;
    setValue: (value: string) => void;
    disabled?: boolean;
};

export function ColorPicker({
    label,
    value,
    setValue,
    disabled, //TODO: Implement this
}: ColorPickerProps) {
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex justify-between'>
                <Label className='text-sm'>{label}</Label>
                <Label className='text-sm'>{value}</Label>
            </div>{' '}
            <ColorSaturation
                hsva={hexToHsva(value)}
                onChange={(color) => {
                    console.log(color);
                    let hexColor = hsvaToHex(color);
                    console.log(hexColor);
                    setValue(hexColor);
                }}
                radius={10}
                style={{
                    width: '100%',
                }}
            />
            <div className='flex'>
                <HexInput
                    className=' w-12'
                    label='Hex'
                    placement='bottom'
                    value={removeHash(value)}
                    onChange={(event) => {
                        if (validHex(event.target.value))
                            setValue(event.target.value);
                    }}
                />
                <Separator
                    orientation='vertical'
                    className='h-full mx-2 text-black'
                />
                <RGBAInput
                    className='w-80'
                    hsva={hexToHsva(value)}
                    onChange={(color) => {
                        console.log(color);
                        setValue(color.hex);
                    }}
                    aProps={{
                        hidden: true,
                        label: '',
                        className: 'hidden',
                    }}
                />
            </div>
            <ColorHue
                hue={hexToHsva(value).h}
                onChange={(color) => {
                    console.log(color);
                    let hsvaColor = hexToHsva(value);
                    const newColor = hsvaToHex({
                        h: color.h,
                        s: hsvaColor.s,
                        v: hsvaColor.v,
                        a: hsvaColor.a,
                    });
                    setValue(newColor);
                }}
            />
            <ColorSlider
                color={value}
                onChange={(color) => {
                    setValue(color.hex);
                }}
            />
            <Circle
                colors={['#F44E3B', '#FE9200', '#FCDC00', '#DBDF00']}
                color={value}
                onChange={(color) => {
                    setValue(color.hex);
                }}
            />
        </div>
    );
}

const removeHash = (hex: string) => hex.replace(/^#/, '');

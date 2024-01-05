'use client';

import { useContext } from 'react';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { AppContext } from '@/providers/app-provider';

type SliderWithLabelProps = {
    label: string;
    value: number;
    onChange: (value: number) => void;
};

type SliderProps = Omit<
    React.ComponentProps<typeof Slider>,
    'value' | 'onChange'
>;

export const SliderWithLabel = ({
    label,
    value,
    onChange,
    ...props
}: SliderWithLabelProps & SliderProps) => {
    return (
        <div className='space-y-2'>
            <div className='flex justify-between'>
                <Label className='text-sm'>{label}</Label>
                <Label className='text-sm'>{value}</Label>
            </div>
            <Slider
                defaultValue={[33]}
                max={500}
                step={1}
                value={[value]}
                onValueChange={(value) => {
                    onChange(value[0]);
                }}
                {...props}
            />
        </div>
    );
};

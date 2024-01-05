// REFERENCE: https://medium.com/geekculture/building-a-simple-colour-picker-in-react-from-scratch-8ef0d3f4e9cc

import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { MouseEventHandler } from 'react';

export type ColorPickerVariant = 'predefined' | 'free';

type ColorPickerProps = {
    value?: string;
    onChange?: (value: string) => void;
    palette?: string[];
    className?: string;
    variant?: ColorPickerVariant;
};

export function ColorPicker({
    value,
    onChange,
    palette,
    className,
    variant,
    ...props
}: ColorPickerProps) {
    return (
        <div>
            <FreeSelector />
            <PredefinedSelector />
        </div>
    );
}

type PredefinedSelectorProps = {
    value?: string;
    onChange?: (value: string) => void;
    palette?: string[];
};

// This is the color picker with predefined swatches
export const PredefinedSelector = ({
    value,
    onChange,
    palette,
}: PredefinedSelectorProps) => <div>PredefinedSelector</div>;

// This is the color picker with free color selection a map with saturation and a slider with hue
type FreeSelectorProps = {
    value?: string;
    onSaturationChange?: MouseEventHandler<HTMLDivElement>;
    onHueChange?: MouseEventHandler;
    satCoords?: number[]; // [0-100, 0-100]
    hueCoords?: number; // 0-360
};

export const FreeSelector = ({
    value,
    onSaturationChange,
    onHueChange,
    satCoords,
    hueCoords,
}: FreeSelectorProps) => (
    <div className=''>
        <div
            className='w-full h-40 border border-border
        bg-[linear-gradient(transparent,black),linear-gradient(to_right,white,transparent)] rounded-md relative cursor-crosshair
        '
            onClick={onSaturationChange}
            style={{
                backgroundColor: `hsl(360, 100%, 50%)`,
            }}
        ></div>

        <div
            className='w-full h-3 bg-[linear-gradient(to_right,#ff0000,#ffff00,#00ff00,#00ffff,#0000ff,#ff00ff,#ff0000)] rounded-full cursor-crosshair relative'
            onClick={onHueChange}
        ></div>
        <Slider className='w-full h-3 bg-[linear-gradient(to_right,#ff0000,#ffff00,#00ff00,#00ffff,#0000ff,#ff00ff,#ff0000)] rounded-full cursor-crosshair relative'></Slider>
    </div>
);

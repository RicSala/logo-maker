'use client';
import { Logo as LogoType } from '@/providers/app/types';
import { PRESETS } from './presets.const';
import { LogoDesign } from '../logo-design/LogoDesign';
import IconComp from '../icon-comp';
import { cn, kebabCaseToCapitlizedCamelCase } from '@/lib/utils';
import { useContext } from 'react';
import { AppContext } from '@/providers/app/app-provider';
import { Nullable, Preset } from '@/types/types';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '../ui/tooltip';
import { LogoIcon } from '../logo-design/LogoIcon';

export const Presets = ({ maxPresets = 5 }) => {
    return (
        <div className='flex h-full gap-2 items-center'>
            <p className='hidden md:inline'>Presets</p>
            {PRESETS.map((preset, index) => {
                return <PresetButton key={preset.id} preset={preset} />;
            })}
            {/* <PresetButton logo={PRESETS[0]} /> */}
        </div>
    );
};

type PresetButtonProps = {
    preset: Preset;
    tooltip?: string;
    onClick?: () => void;
    className?: string;
};

export const PresetButton = ({
    preset,
    tooltip,
    onClick,
    className,
}: PresetButtonProps) => {
    const { logo, setNewLogo } = useContext(AppContext);
    const appliedPresetLogo = { ...applyPreset(preset, logo), bgRotate: 0 };
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div
                        className={cn(`h-12 w-12`, className)}
                        onClick={() => {
                            onClick
                                ? onClick()
                                : setNewLogo(applyPreset(preset, logo, 60));
                        }}
                    >
                        <LogoIcon className='w-auto' logo={appliedPresetLogo} />
                    </div>
                </TooltipTrigger>
                <TooltipContent className='max-w-md'>
                    {tooltip ? tooltip : preset.description}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

/**
 * Given a preset and an a logo, returns the logo with all the properties of the preset applied. The property might be null, in which case it will not be applied. It iterates programatically all the properties. It returns the new logo.
 */
export const applyPreset = (preset: Preset, logo: LogoType, size?: number) => {
    const newLogo = { ...logo };

    for (const property in preset) {
        const key = property as keyof LogoType;
        if (preset[property as keyof LogoType] !== null) {
            // REVIEW: How can I prevent the need for the ts-ignore?
            // @ts-ignore
            newLogo[key] = preset[key];
        }
    }

    // The size is a special case, we need to adapt it to the size of the workbench... probably could be done better with a relative css property
    if (size) {
        newLogo.size = size;
    }

    newLogo.isFilled = false;

    return newLogo;
};

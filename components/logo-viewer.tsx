'use client';
import { cn, kebabCaseToCapitlizedCamelCase } from '@/lib/utils';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from './ui/tooltip';
import { useContext, useRef } from 'react';
import { AppContext } from '@/providers/app-provider';
import IconComp from './lucide-icon';

type LogoViewerProps = {
    className?: string;
};

export function LogoViewer({ className }: LogoViewerProps) {
    return (
        <div
            className={cn(
                `bg-slate-100/50 bg-[url('/images/decoration/backgrounds/grid.svg')]
                flex justify-center items-center
                `,
                className
            )}
        >
            <WorkBench />
        </div>
    );
}

type WorkBenchProps = {
    className?: string;
    iconSize?: number;
};

export const WorkBench = ({ className }: WorkBenchProps) => {
    const {
        iconSize,
        iconRotation,
        strokeWidth,
        strokeColor,
        fillColor,
        isFilled,
        backgroundColor,
        borderRadius,
        logoRef,
        logoIcon,
        isGradientBackground,
    } = useContext(AppContext);

    return (
        <>
            <TooltipProvider>
                <Tooltip delayDuration={200}>
                    <TooltipTrigger>
                        <div
                            id='workbench'
                            className='aspect-square w-[400px] bg-slate-200/30
                            border-2

                        hover:border-dashed
                        hover:bg-slate-200/40
                        hover:border-2
                        hover:border-slate-300
                        flex justify-center items-center
                        
                        '
                        >
                            <div
                                className='w-full h-full flex justify-center items-center'
                                ref={logoRef}
                            >
                                <div
                                    style={{
                                        backgroundImage: isGradientBackground
                                            ? backgroundColor
                                            : undefined,
                                        backgroundColor: !isGradientBackground
                                            ? backgroundColor
                                            : undefined,
                                        borderRadius: `${borderRadius}px`,
                                    }}
                                    className={`
                            rounded-[20px]
                            h-[80%]
                            w-[80%]
                            flex justify-center items-center
                            overflow-hidden
                            `}
                                >
                                    <div className='w-full h-full flex items-center justify-center'>
                                        <span>
                                            <IconComp
                                                name={kebabCaseToCapitlizedCamelCase(
                                                    logoIcon
                                                )}
                                                style={{
                                                    transform: `rotate(${iconRotation}deg)`,
                                                    strokeWidth: `${strokeWidth}px`,
                                                    stroke: `${strokeColor}`,
                                                    fill: `${
                                                        isFilled
                                                            ? fillColor
                                                            : 'none'
                                                    }`,
                                                }}
                                                width={iconSize}
                                                height={iconSize}
                                                viewBox='0 0 24 24'
                                            />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>Esta es la zona de descarga</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </>
    );
};

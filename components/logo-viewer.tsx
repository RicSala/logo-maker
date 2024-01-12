'use client';
import { cn, kebabCaseToCapitlizedCamelCase } from '@/lib/utils';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from './ui/tooltip';
import { useContext, useRef } from 'react';
import { AppContext } from '@/providers/app/app-provider';
import IconComp from './icon-comp';
import { Logo } from './logo';

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
    const { logo, logoRef } = useContext(AppContext);

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
                        flex justify-center items-center'
                        >
                            <Logo logo={logo} logoRef={logoRef} />
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>Esta es la zona de descarga</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </>
    );
};

'use client';
import { cn, kebabCaseToCapitlizedCamelCase } from '@/lib/utils';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '../ui/tooltip';
import { useContext, useRef } from 'react';
import { AppContext } from '@/providers/app/app-provider';
import IconComp from '../icon-comp';
import { LogoDesign } from './LogoDesign';
import { Logo } from '@/providers/app/types';

type LogoViewerProps = {
    className?: string;
};

export function LogoViewer({ className }: LogoViewerProps) {
    // @ts-ignore
    const { logoHistory } = useContext(AppContext);

    return (
        <div
            className={cn(
                `
                bg-slate-100/50 bg-[url('/images/decoration/backgrounds/grid.svg')]
                flex justify-center items-center relative
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
                    <TooltipTrigger asChild>
                        <div
                            id='workbench'
                            className='
                            shrink-0
                            scale-50
                            md:scale-[65%]
                            lg:scale-[none]
                            w-auto
                             bg-slate-200/30
                            border-2
                        hover:border-dashed
                        hover:bg-slate-200/40
                        hover:border-2
                        hover:border-slate-300
                        flex justify-center items-center
                        relative
                        '
                            // overflow-hidden
                        >
                            <LogoDesign logo={logo} logoRef={logoRef} />
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>Esta es la zona de descarga</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </>
    );
};

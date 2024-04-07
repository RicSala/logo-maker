'use client';

import { Logo } from '@/providers/app/types';
import { RefObject } from 'react';
import { LogoIcon } from './LogoIcon';
import { LogoText } from './LogoText';

type LogoViewerProps = {
    logo: Logo;
    logoRef?: RefObject<HTMLDivElement> | null;
};

export function LogoDesign({ logo, logoRef }: LogoViewerProps) {
    return (
        <div className='p-0 isolate p-8' ref={logoRef ? logoRef : null}>
            <div className='w-full h-full flex justify-center items-center gap-6'>
                <LogoIcon className='shrink-0' logo={logo} isPreset={false} />
                <LogoText className='shrink-0' logo={logo} />
            </div>
        </div>
    );
}

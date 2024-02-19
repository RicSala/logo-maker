'use client';

import { Logo } from '@/providers/app/types';
import { RefObject } from 'react';
import { LogoIcon } from './LogoIcon';

type LogoViewerProps = {
    logo: Logo;
    logoRef?: RefObject<HTMLDivElement> | null;
};

export function LogoDesign({ logo, logoRef }: LogoViewerProps) {
    return (
        <div className='p-0 isolate' ref={logoRef ? logoRef : null}>
            <div className='w-full h-full flex justify-center items-center gap-8 p-8'>
                <LogoIcon className='shrink-0' logo={logo} isPreset={false} />
                {/* <LogoText className='shrink-0' logo={logo} /> */}
            </div>
        </div>
    );
}
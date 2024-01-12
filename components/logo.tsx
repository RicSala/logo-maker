'use client';

import { kebabCaseToCapitlizedCamelCase } from '@/lib/utils';
import IconComp from './icon-comp';
import { Logo } from '@/providers/app/types';
import { RefObject } from 'react';

type LogoViewerProps = {
    logo: Logo;
    logoRef?: RefObject<HTMLDivElement> | null;
};

export function Logo({ logo, logoRef }: LogoViewerProps) {
    return (
        <div
            className='w-full h-full flex justify-center items-center'
            ref={logoRef ? logoRef : null}
        >
            <div
                style={{
                    backgroundImage: logo.isGradientBackground
                        ? logo.backgroundColor
                        : undefined,
                    backgroundColor: !logo.isGradientBackground
                        ? logo.backgroundColor
                        : undefined,
                    borderRadius: `${logo.borderRadius}%`,
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
                            name={kebabCaseToCapitlizedCamelCase(logo.icon)}
                            style={{
                                transform: `rotate(${logo.rotation}deg)`,
                                strokeWidth: `${logo.strokeWidth}px`,
                                stroke: `${logo.strokeColor}`,
                                fill: `${
                                    logo.isFilled ? logo.fillColor : 'none'
                                }`,
                            }}
                            width={logo.size}
                            height={logo.size}
                            viewBox='0 0 24 24'
                        />
                    </span>
                </div>
            </div>
        </div>
    );
}

'use client';

import { fontsMap } from '@/config/fonts';
import { cn } from '@/lib/utils';
import { AppContext } from '@/providers/app/app-provider';
import { Logo } from '@/providers/app/types';
import { useContext } from 'react';

type LogoTextProps = {
    logo: Logo;
    className?: string;
};

export const LogoText = ({ logo, className }: LogoTextProps) => {
    const { setLogoTextTranslateX, setLogoTextTranslateY } =
        useContext(AppContext);

    return (
        <>
            <p
                className={cn(
                    `cursor-move
                relative
                top-0
                left-0
                bg-clip-text	
                select-none
                `,
                    // @ts-ignore
                    fontsMap[logo.fontFamily].className,
                    className
                )}
                style={{
                    fontSize: `${logo.fontSize}px`,
                    transform: `translate(${logo.textTranslateX}px, ${logo.textTranslateY}px)`,
                    fontWeight: logo.fontWeight,
                    backgroundImage: logo.isGradientFont
                        ? logo.fontColor
                        : undefined,
                    backgroundColor: !logo.isGradientFont
                        ? logo.fontColor
                        : undefined,
                    color: logo.isGradientFont ? 'transparent' : logo.fontColor,
                }}
            >
                {logo.text}
            </p>
        </>
    );
};

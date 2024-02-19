'use client';

import { cn, kebabCaseToCapitlizedCamelCase } from '@/lib/utils';
import { Logo } from '@/providers/app/types';
import IconComp from '../icon-comp';
import Draggable from 'react-draggable'; // The default
import {
    createRef,
    useContext,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import { AppContext } from '@/providers/app/app-provider';

type LogoIconProps = {
    logo: Logo;
    className?: string;
    isPreset?: boolean;
};

export const LogoIcon = ({
    logo,
    className,
    isPreset = true,
}: LogoIconProps) => {
    return (
        <>
            {/* DEBUG BOX */}
            {/* <div className='absolute right-0 top-[300px] bg-green-600 z-[100]'>
                <p>HERE: </p>
                <p>
                    Initial position:{' '}
                    {JSON.stringify(initialPositionRef.current)}
                </p>
                <p>
                    Current position:{' '}
                    {iconRef.current &&
                        JSON.stringify({
                            x:
                                (iconRef.current?.getBoundingClientRect()
                                    .right +
                                    iconRef.current.getBoundingClientRect().x) /
                                2,
                            y:
                                iconRef.current?.getBoundingClientRect().y +
                                iconRef.current.getBoundingClientRect().height /
                                    2,
                        })}
                </p>
                <p>
                    Right and top:{' '}
                    {JSON.stringify({
                        right: iconRef.current?.getBoundingClientRect().right,
                        top: iconRef.current?.getBoundingClientRect().top,
                    })}
                </p>
                <p>
                    Center:{' '}
                    {iconRef.current &&
                        JSON.stringify({
                            x:
                                iconRef.current?.getBoundingClientRect().x +
                                (iconRef.current?.getBoundingClientRect()
                                    .width || 0) /
                                    2,
                            y:
                                iconRef.current?.getBoundingClientRect().y +
                                (iconRef.current?.getBoundingClientRect()
                                    .height || 0) /
                                    2,
                        })}
                </p>
                <p>Deltas: {JSON.stringify(deltas)}</p>
                <p>
                    Width and height:
                    {JSON.stringify({
                        width: iconRef.current?.getBoundingClientRect().width,
                        height: iconRef.current?.getBoundingClientRect().height,
                    })}
                </p>
                <p>
                    Logo position state
                    {JSON.stringify(logo.iconPosition)}
                </p>
            </div> */}
            <div
                style={{
                    backgroundImage: logo.isGradientBackground
                        ? logo.backgroundColor
                        : undefined,
                    backgroundColor: !logo.isGradientBackground
                        ? logo.backgroundColor
                        : undefined,
                    borderRadius: `${logo.borderRadius}%`,
                    // rotate: `0 0 1 ${logo.bgRotate}deg`,
                    transform: isPreset
                        ? undefined
                        : `translate(${logo.iconTranslateX}px, ${logo.iconTranslateY}px) rotate(${logo.bgRotate}deg)`,
                }}
                className={cn(
                    `
                rounded-[20px]
                w-[6rem]
                aspect-square
                flex justify-center items-center
                overflow-hidden
                relative
                z-10
                will-change-transform
                `,
                    className
                )}
            >
                <div className='w-full h-full flex items-center justify-center'>
                    <span
                        className='
                    '
                    >
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
        </>
    );
};

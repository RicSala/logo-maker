'use client';

import { AppContext } from '@/providers/app-provider';
import { useContext } from 'react';

export function Presets({}) {
    const { logoIcon } = useContext(AppContext);

    return <></>;
}

// Example of complete "logoIcon" object:

type logo = {
    icon: string;
    size: number;
    rotation: number;
    radius: number;
    strokeWidth: number;
    strokeColor: string;
    fillColor: string;
    isFilled: boolean;
    borderRadius: number;
    backgroundColor: string;
    shadow: string;
    isGradientBackground: boolean;
};

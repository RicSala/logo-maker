import { TFontNames } from '@/types/types';
import { Dispatch, SetStateAction } from 'react';

export type HistoryState<T> = {
    past: T[];
    present: T;
    future: T[];
};

export interface ContextProps {
    sidebarOpen: boolean;
    setSidebarOpen: Dispatch<SetStateAction<boolean>>;
    logo: Logo;
    setLogoText: (value: string) => void;
    setBackgroundColor: (value: string) => void;
    setIconSize: (value: number) => void;
    setIconRotation: (value: number) => void;
    setBgRotate: (value: number) => void;
    setStrokeWidth: (value: number) => void;
    setStrokeColor: (value: string) => void;
    setFillColor: (value: string) => void;
    setIsFilled: (value: boolean) => void;
    setBorderRadius: (value: number) => void;
    setLogoIcon: (value: string) => void;
    setIsGradientBackground: (value: boolean) => void;
    setIsGradientFont: (value: boolean) => void;
    setShadow: (value: string) => void;
    logoRef: React.RefObject<HTMLDivElement> | null;
    undo: () => void;
    redo: () => void;
    setNewLogo: (value: Logo) => void;
    setFontSize: (value: number) => void;
    setFontFamily: (value: string) => void;
    setLogoTextTranslateX: (value: number) => void;
    setLogoTextTranslateY: (value: number) => void;
    setFontWeight: (value: number) => void;
    setFontColor: (value: string) => void;
    setIconTranslateX: (value: number) => void;
    setIconTranslateY: (value: number) => void;
    setTextTranslateX: (value: number) => void;
    setTextTranslateY: (value: number) => void;
}

export type Logo = {
    text: string;
    fontColor: string;
    icon: string;
    size: number;
    rotation: number;
    bgRotate: number;
    strokeWidth: number;
    strokeColor: string;
    fillColor: string;
    isFilled: boolean;
    borderRadius: number;
    backgroundColor: string;
    shadow: string;
    isGradientBackground: boolean;
    fontSize: number; //Pixels
    fontFamily: TFontNames;
    logoTextTranslateX: number;
    logoTextTranslateY: number;
    fontWeight: number;
    isGradientFont: boolean;
    iconTranslateX: number;
    iconTranslateY: number;
    textTranslateX: number;
    textTranslateY: number;
};

export type Position = {
    x: number;
    y: number;
};

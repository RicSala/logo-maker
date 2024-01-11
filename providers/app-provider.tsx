'use client';
import {
    createContext,
    Dispatch,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useReducer,
    useRef,
    useState,
} from 'react';

import { useLocalStorage, useHistoryState } from '@uidotdev/usehooks';

import { reducer } from './reducer';
import logo from '@/components/shared/logo';

type HistoryState<T> = {
    past: T[];
    present: T;
    future: T[];
};

interface ContextProps {
    sidebarOpen: boolean;
    setSidebarOpen: Dispatch<SetStateAction<boolean>>;
    logo: Logo;
    setBackgroundColor: (value: string) => void;
    setIconSize: (value: number) => void;
    setIconRotation: (value: number) => void;
    setStrokeWidth: (value: number) => void;
    setStrokeColor: (value: string) => void;
    setFillColor: (value: string) => void;
    setIsFilled: (value: boolean) => void;
    setBorderRadius: (value: number) => void;
    setLogoIcon: (value: string) => void;
    setIsGradientBackground: (value: boolean) => void;
    setShadow: (value: string) => void;
    logoRef: React.RefObject<HTMLDivElement> | null;
    undo: () => void;
}

export type Logo = {
    icon: string;
    size: number;
    rotation: number;
    strokeWidth: number;
    strokeColor: string;
    fillColor: string;
    isFilled: boolean;
    borderRadius: number;
    backgroundColor: string;
    shadow: string;
    isGradientBackground: boolean;
};

const INITIAL_LOGO: Logo = {
    icon: 'chef-hat',
    size: 200,
    rotation: 15,
    strokeWidth: 2,
    strokeColor: '#ffffff',
    fillColor: '#000000',
    isFilled: false,
    borderRadius: 65,
    backgroundColor:
        'linear-gradient(45deg, RGBA(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',
    shadow: '0px 0px 0px 0px rgba(0,0,0,0)',
    isGradientBackground: true,
};

// BOILER: export the context in the boilerplate
export const AppContext = createContext<ContextProps>({
    sidebarOpen: false,
    setSidebarOpen: () => false,
    logo: INITIAL_LOGO,
    setBackgroundColor: () => '',
    setIconSize: () => 0,
    setIconRotation: () => 45,
    setStrokeWidth: () => 0,
    setStrokeColor: () => '',
    setFillColor: () => '',
    setIsFilled: () => false,
    setBorderRadius: () => 0,
    setLogoIcon: () => '',
    setIsGradientBackground: () => false,
    setShadow: () => '',
    logoRef: null,
    undo: () => {},
});

export default function AppProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    // Use useLocalStorage to get the initial state
    const [logoHistory, setLogoHistory] = useLocalStorage('logoHistory', {
        past: [] as Logo[],
        present: INITIAL_LOGO,
        future: [] as Logo[],
    });

    console.log('logo history from context', logoHistory);

    const logoRef = useRef<HTMLDivElement>(null);
    // Update local storage whenever the state changes

    const setIconSize = (value: number) => {
        setLogoHistory({
            past: [],
            present: { ...logoHistory.present, size: value },
            future: [],
        });
    };

    const setIconRotation = (value: number) => {
        setLogoHistory({
            past: [],
            present: { ...logoHistory.present, rotation: value },
            future: [],
        });
    };

    const setStrokeWidth = (value: number) => {
        setLogoHistory({
            past: [],
            present: { ...logoHistory.present, strokeWidth: value },
            future: [],
        });
    };

    const setStrokeColor = (value: string) => {
        setLogoHistory({
            past: [],
            present: { ...logoHistory.present, strokeColor: value },
            future: [],
        });
    };

    const setFillColor = (value: string) => {
        setLogoHistory({
            past: [],
            present: { ...logoHistory.present, fillColor: value },
            future: [],
        });
    };

    const setIsFilled = (value: boolean) => {
        setLogoHistory({
            past: [],
            present: { ...logoHistory.present, isFilled: value },
            future: [],
        });
    };

    const setBorderRadius = (value: number) => {
        setLogoHistory({
            past: [],
            present: { ...logoHistory.present, borderRadius: value },
            future: [],
        });
    };

    const setBackgroundColor = (value: string) => {
        setLogoHistory({
            past: [],
            present: { ...logoHistory.present, backgroundColor: value },
            future: [],
        });
    };

    const setLogoIcon = useCallback((value: string) => {
        setLogoHistory({
            past: [],
            present: { ...logoHistory.present, icon: value },
            future: [],
        });
    }, []);

    const setIsGradientBackground = useCallback((value: boolean) => {
        setLogoHistory({
            past: [],
            present: { ...logoHistory.present, isGradientBackground: value },
            future: [],
        });
    }, []);

    const setShadow = (value: string) => {
        setLogoHistory({
            past: [],
            present: { ...logoHistory.present, shadow: value },
            future: [],
        });
    };
    const setLogo = (value: Logo) => {
        setLogoHistory({
            past: [],
            present: value,
            future: [],
        });
    };

    const undo = () => {
        setLogoHistory({
            past: logoHistory.past.slice(0, -1),
            present: logoHistory.past[logoHistory.past.length - 1],
            future: [logoHistory.present, ...logoHistory.future],
        });
    };

    return (
        <AppContext.Provider
            value={{
                logo: logoHistory.present,
                sidebarOpen,
                setSidebarOpen,
                setIconSize,
                setIconRotation,
                setStrokeWidth,
                setStrokeColor,
                setFillColor,
                setIsFilled,
                setBorderRadius,
                setBackgroundColor,
                setLogoIcon,
                setIsGradientBackground,
                setShadow,
                undo,

                logoRef,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export const useAppProvider = () => useContext(AppContext);

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
import {
    debouncedFunction,
    leadingEdgeThrottledFunction,
    throttledFunction,
    updateHistory,
} from '@/lib/utils';

export type HistoryState<T> = {
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
    const [logoHistory, originalSetLogoHistory] = useLocalStorage(
        'logoHistory',
        {
            past: [] as Logo[],
            present: INITIAL_LOGO,
            future: [] as Logo[],
        }
    );

    // console.log('logo history from context', logoHistory);

    const throttledUpdateHistoryRef = useRef(
        leadingEdgeThrottledFunction(updateHistory<Logo>, 500)
    );

    // REVIEW: how do we know if a function coming from a third party library is memoized? stable?
    const setLogoHistory = useCallback(
        (newHistory: HistoryState<Logo>) => {
            const stalePresent = JSON.parse(
                JSON.stringify(logoHistory.present)
            );

            // first we save the logo as usual (We change the present)
            originalSetLogoHistory(newHistory);
            // then we update the history, but we debounce it so it doesn't get called too often
            throttledUpdateHistoryRef.current(
                {
                    ...newHistory,
                    present: stalePresent, // REVIEW: This smells bad. Is there a better way to do this?
                },
                10,
                originalSetLogoHistory
            );

            // if the past is equal to the present, delete the last item in the past
            if (
                JSON.stringify(newHistory.past[newHistory.past.length - 1]) ===
                JSON.stringify(newHistory.present)
            ) {
                newHistory.past = [...newHistory.past].slice(0, -1);
                originalSetLogoHistory(newHistory);
            }
        },
        [logoHistory.present, originalSetLogoHistory]
    );

    const logoRef = useRef<HTMLDivElement>(null);
    // Update local storage whenever the state changes

    const setIconSize = (value: number) => {
        let newHistory: HistoryState<Logo> = {
            // REVIEW: Probably need a deep copy here
            past: [...logoHistory.past],
            present: { ...logoHistory.present, size: value },
            future: [...logoHistory.future],
        };
        setLogoHistory(newHistory);
    };

    const setIconRotation = (value: number) => {
        let newHistory: HistoryState<Logo> = {
            // REVIEW: Probably need a deep copy here
            past: [...logoHistory.past],
            present: { ...logoHistory.present, rotation: value },
            future: [...logoHistory.future],
        };
        setLogoHistory(newHistory);
    };

    const setStrokeWidth = (value: number) => {
        let newHistory: HistoryState<Logo> = {
            // REVIEW: Probably need a deep copy here
            past: [...logoHistory.past],
            present: { ...logoHistory.present, strokeWidth: value },
            future: [...logoHistory.future],
        };
        setLogoHistory(newHistory);
    };

    const setStrokeColor = (value: string) => {
        let newHistory: HistoryState<Logo> = {
            // REVIEW: Probably need a deep copy here
            past: [...logoHistory.past],
            present: { ...logoHistory.present, strokeColor: value },
            future: [...logoHistory.future],
        };
        setLogoHistory(newHistory);
    };

    const setFillColor = (value: string) => {
        let newHistory: HistoryState<Logo> = {
            // REVIEW: Probably need a deep copy here
            past: [...logoHistory.past],
            present: { ...logoHistory.present, fillColor: value },
            future: [...logoHistory.future],
        };
        setLogoHistory(newHistory);
    };

    const setIsFilled = (value: boolean) => {
        console.log('IS FILLED from the setter', logoHistory.present.isFilled);
        console.log('IS FILLED', value);
        let newHistory: HistoryState<Logo> = {
            // REVIEW: Probably need a deep copy here
            past: [...logoHistory.past],
            present: { ...logoHistory.present, isFilled: value },
            future: [...logoHistory.future],
        };
        setLogoHistory(newHistory);
    };

    const setBorderRadius = (value: number) => {
        let newHistory: HistoryState<Logo> = {
            // REVIEW: Probably need a deep copy here
            past: [...logoHistory.past],
            present: { ...logoHistory.present, borderRadius: value },
            future: [...logoHistory.future],
        };
        setLogoHistory(newHistory);
    };

    const setBackgroundColor = (value: string) => {
        let newHistory: HistoryState<Logo> = {
            // REVIEW: Probably need a deep copy here
            past: [...logoHistory.past],
            present: { ...logoHistory.present, backgroundColor: value },
            future: [...logoHistory.future],
        };
        setLogoHistory(newHistory);
    };

    const setLogoIcon = (value: string) => {
        let newHistory: HistoryState<Logo> = {
            // REVIEW: Probably need a deep copy here
            past: [...logoHistory.past],
            present: { ...logoHistory.present, icon: value },
            future: [...logoHistory.future],
        };
        setLogoHistory(newHistory);
    };

    const setIsGradientBackground = (value: boolean) => {
        // deep copy the logo history
        let newHistory: HistoryState<Logo> = JSON.parse(
            JSON.stringify(logoHistory)
        );

        newHistory = {
            past: [...newHistory.past],
            present: { ...newHistory.present, isGradientBackground: value },
            future: [...newHistory.future],
        };

        setLogoHistory(newHistory);
    };

    const setShadow = (value: string) => {
        let newHistory: HistoryState<Logo> = {
            // REVIEW: Probably need a deep copy here
            past: [...logoHistory.past],
            present: { ...logoHistory.present, shadow: value },
            future: [...logoHistory.future],
        };
        setLogoHistory(newHistory);
    };

    const undo = () => {
        // deep copy the logo history
        const newHistory: HistoryState<Logo> = JSON.parse(
            JSON.stringify(logoHistory)
        );

        // If the past is equal to the present, then we need to go back one more step
        // TODO: This should probably be done in the updater itself
        if (
            JSON.stringify(newHistory.past[newHistory.past.length - 1]) ===
            JSON.stringify(newHistory.present)
        ) {
            newHistory.past = newHistory.past.slice(0, -1);
        }

        // if there is not past, then we can't undo
        if (newHistory.past.length === 0) return;

        originalSetLogoHistory({
            past: newHistory.past.slice(0, -1),
            present: newHistory.past[newHistory.past.length - 1],
            future: [],
            // future: [logoHistory.present, ...logoHistory.future],
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

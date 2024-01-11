'use client';

import {
    createContext,
    Dispatch,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useReducer,
    useRef,
    useState,
} from 'react';

import { reducer } from './logo-reducer';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { debouncedFunction, updateArray } from '@/lib/utils';

const MAX_UNDOS = 10;

export type ContextProps = {
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
};

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

export const INITIAL_LOGO: Logo = {
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
    const logoRef = useRef<HTMLDivElement>(null); // Ref to the logo div
    const memoizedInitialLogo = useMemo(() => [INITIAL_LOGO], []);
    const historyRef = useRef<Logo | null>(INITIAL_LOGO);

    const [logoHistory, setLogoHistory] = useLocalStorage<Logo[]>(
        'newLogo',
        memoizedInitialLogo,
        historyRef
    );

    const [logo, reducerDispatch] = useReducer(
        reducer,
        INITIAL_LOGO,
        (initialValue) => {
            // REVIEW: Why we cannot do it this way? Do the effects run AFTER the reducer?
            // I think so! That's why we can do the "isMounted" trick! Because the effect runs after the reducer!
            // if (logoHistory !== null) {
            //     if (isValidLogo(logoHistory[logoHistory.length - 1])) {
            //         return logoHistory[logoHistory.length - 1];
            //     }
            // }
            return initialValue;
        }
    );

    // When the app loads, we need to take the last logo from the history and set it as the current logo. For that, I need to persist the history from the very first render. I can do that with a useRef.

    // Using useRef to persist the function across renders
    // Review: What's the difference between useRef and useCallback then?
    const debouncedUpdateHistoryRef = useRef<
        (newItem: Logo, history: Logo[]) => void
    >(
        debouncedFunction((newItem, array) => {
            // console.log('previous from debounced', { array });
            const newHistory = updateArray(newItem, array, MAX_UNDOS);
            // console.log('history from debounced', { newHistory });
            setLogoHistory(newHistory);
        }, 300)
    );

    // useEffect to set the logo to the ref
    useEffect(() => {
        if (logoRef.current) {
            reducerDispatch({
                type: 'SET_COMPLETE_LOGO',
                value: historyRef.current as Logo,
            });
        }
    }, []);

    // Monkey patch the dispatch function to update the history
    const dispatch = useCallback(
        (action: any) => {
            reducerDispatch(action);
            if (debouncedUpdateHistoryRef.current) {
                // console.log('dispatch', { logo, logoHistory });
                // FIXED: BUG: here the logo is not updated yet!!!!!!!!!!!!
                // debouncedUpdateHistoryRef.current(logo, logoHistory);

                // // SOLUTION: apply the action value to the logo
                const newLogo = reducer(logo, action);
                debouncedUpdateHistoryRef.current(newLogo, logoHistory);
            }
        },
        [logo, logoHistory]
    );

    const undo = () => {
        if (logoHistory.length <= 1) {
            return;
        }
        const newHistory = [...logoHistory];
        newHistory.pop();
        // set the local storage
        setLogoHistory(newHistory);
        // Show the last logo
        const lastLogo = newHistory[newHistory.length - 1];
        reducerDispatch({ type: 'SET_COMPLETE_LOGO', value: lastLogo });
    };

    const setIconSize = (value: number) => {
        dispatch({ type: 'SET_ICON_SIZE', value });
    };

    const setIconRotation = (value: number) => {
        dispatch({ type: 'SET_ICON_ROTATION', value });
    };

    const setStrokeWidth = (value: number) => {
        dispatch({ type: 'SET_STROKE_WIDTH', value });
    };

    const setStrokeColor = (value: string) => {
        dispatch({ type: 'SET_STROKE_COLOR', value });
    };

    const setFillColor = (value: string) => {
        dispatch({ type: 'SET_FILL_COLOR', value });
    };

    const setIsFilled = (value: boolean) => {
        dispatch({ type: 'SET_IS_FILLED', value });
    };

    const setBorderRadius = (value: number) => {
        dispatch({ type: 'SET_BORDER_RADIUS', value });
    };

    const setBackgroundColor = (value: string) => {
        dispatch({ type: 'SET_BACKGROUND_COLOR', value });
    };

    const setLogoIcon = (value: string) => {
        dispatch({ type: 'SET_LOGO_ICON', value });
    };

    const setIsGradientBackground = useCallback(
        (value: boolean) => {
            dispatch({ type: 'IS_GRADIENT_BACKGROUND', value });
        },
        [dispatch]
    );

    const setShadow = (value: string) => {
        dispatch({ type: 'SET_SHADOW', value });
    };

    const setCompleteLogo = (logo: Logo) => {
        dispatch({ type: 'SET_COMPLETE_LOGO', value: logo });
    };

    return (
        <AppContext.Provider
            value={{
                logo,
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
                logoRef,
                // @ts-ignore
                logoHistory,
                undo,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export const useAppProvider = () => useContext(AppContext);

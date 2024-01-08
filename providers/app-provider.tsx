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

import { reducer } from './logo-reducer';
import { useLocalStorage } from '@/hooks/use-local-storage';

const MAX_UNDOS = 10;

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

const isValidLogo = (logo: Logo) => {
    console.log('isValidLogo');
    // TODO: This is validate the logo
    if (logo === undefined || logo === null || logo.icon === undefined) {
        return false;
    }
    return true;
};

function debounce<T extends (...args: any[]) => any>(func: T, waitFor: number) {
    console.log('debounce');
    // This variable will hold the reference to the timeout
    let timeout: NodeJS.Timeout;

    // Return a new function that will debounce the execution of 'func'
    return (...args: Parameters<T>) => {
        // If 'timeout' is already set, clear it. This happens if the debounced
        // function is called again before the timeout has elapsed
        if (timeout) {
            console.log('clearTimeout');
            clearTimeout(timeout);
        }
        console.log('setTimeout');
        // if no timeout has been set, call 'func' after 'waitFor' ms
        timeout = setTimeout(() => {
            func(...args);
        }, waitFor);
    };
}

export default function AppProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const logoRef = useRef<HTMLDivElement>(null);
    const [logoHistory, setLogoHistory] = useLocalStorage<Logo[]>('logo', []);
    // Using useRef to persist the function across renders
    const debouncedUpdateHistoryRef = useRef<(logo: Logo) => void>();

    useEffect(() => {
        // Initialize the debounced function when the component mounts
        debouncedUpdateHistoryRef.current = debounce(updateHistory, 300);
    }, []); // Empty dependency array to run only once on mount

    const [logo, reducerDispatch] = useReducer(
        reducer,
        INITIAL_LOGO,
        (initialValue) => {
            // let history: Logo[] = [];
            if (logoHistory !== null) {
                if (isValidLogo(logoHistory[logoHistory.length - 1])) {
                    return logoHistory[logoHistory.length - 1];
                }
            }
            return initialValue;
        }
    );

    const updateHistory = (logo: Logo) => {
        console.log('updateHistory');
        let newHistory: Logo[] = [];
        if (logoHistory !== null) {
            newHistory = logoHistory;
        }
        newHistory.push(logo);
        if (newHistory.length > MAX_UNDOS) {
            newHistory.shift();
        }
        // set the local storage
        setLogoHistory(newHistory);
    };

    // Monkey patch the dispatch function to update the history
    const dispatch = useCallback(
        (action: any) => {
            reducerDispatch(action);
            if (debouncedUpdateHistoryRef.current) {
                debouncedUpdateHistoryRef.current(logo);
            }
        },
        [logo]
    );

    const undo = () => {
        let history: Logo[] = [];
        if (localStorage.getItem('logo') !== null) {
            history = JSON.parse(localStorage.getItem('logo')!);
        }
        if (history.length <= 1) {
            return;
        }
        history.pop();
        // set the local storage
        localStorage.setItem('logo', JSON.stringify(history));
        const lastLogo = history[history.length - 1];
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

    const setIsGradientBackground = (value: boolean) => {
        dispatch({ type: 'IS_GRADIENT_BACKGROUND', value });
    };

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
                logoRef,
                undo,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export const useAppProvider = () => useContext(AppContext);

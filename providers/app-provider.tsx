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

/**
 * Debounce function. When we call this function, it will return a new function that will have a timeout (closure). If the timeout is already set, it will clear it and set a new one, creating a "debounce" effect. The function has access to the timeout variable because of the closure: it was in its scope when the function was created.
 */
function debouncedFunction<T extends (...args: any[]) => any>(
    func: T,
    waitFor: number
) {
    // This variable will hold the reference to the timeout
    let timeout: NodeJS.Timeout;

    // Return a new function that will debounce the execution of 'func'
    return (...args: Parameters<T>) => {
        // If 'timeout' is already set, clear it. This happens if the debounced
        // function is called again before the timeout has elapsed
        if (timeout) {
            clearTimeout(timeout);
        } else {
        }
        // create a new timeout
        timeout = setTimeout(() => {
            func(...args);
        }, waitFor);
    };
}

const updateArray = <T,>(newElement: T, array: T[]) => {
    let newHistory: T[] = [];
    if (array !== null) {
        newHistory = array;
    }
    newHistory.push(newElement);
    if (newHistory.length > MAX_UNDOS) {
        newHistory.shift();
    }
    return newHistory;
};

export default function AppProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const logoRef = useRef<HTMLDivElement>(null);
    const [logoHistory, setLogoHistory] = useLocalStorage<Logo[]>('logo', []);

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

    // Using useRef to persist the function across renders
    const debouncedUpdateHistoryRef = useRef<
        (newItem: Logo, history: Logo[]) => void
    >(
        debouncedFunction((newItem, array) => {
            // console.log('previous from debounced', { array });
            const newHistory = updateArray(newItem, array);
            // console.log('history from debounced', { newHistory });
            setLogoHistory(newHistory);
        }, 300)
    );

    // Monkey patch the dispatch function to update the history
    const dispatch = useCallback(
        (action: any) => {
            reducerDispatch(action);
            if (debouncedUpdateHistoryRef.current) {
                console.log('dispatch', { logo, logoHistory });
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

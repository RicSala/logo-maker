'use client';
import {
    createContext,
    Dispatch,
    SetStateAction,
    useCallback,
    useContext,
    useReducer,
    useRef,
    useState,
} from 'react';

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
}

type Logo = {
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

type LogoAction =
    | {
          type: 'SET_LOGO_ICON';
          value: Logo['icon'];
      }
    | {
          type: 'SET_ICON_SIZE';
          value: Logo['size'];
      }
    | {
          type: 'SET_ICON_ROTATION';
          value: Logo['rotation'];
      }
    | {
          type: 'SET_STROKE_WIDTH';
          value: Logo['strokeWidth'];
      }
    | {
          type: 'SET_STROKE_COLOR';
          value: Logo['strokeColor'];
      }
    | {
          type: 'SET_FILL_COLOR';
          value: Logo['fillColor'];
      }
    | {
          type: 'SET_IS_FILLED';
          value: Logo['isFilled'];
      }
    | {
          type: 'SET_BORDER_RADIUS';
          value: Logo['borderRadius'];
      }
    | {
          type: 'SET_BACKGROUND_COLOR';
          value: Logo['backgroundColor'];
      }
    | {
          type: 'SET_SHADOW';
          value: Logo['shadow'];
      }
    | {
          type: 'IS_GRADIENT_BACKGROUND';
          value: Logo['isGradientBackground'];
      };

const reducer = (logo: Logo, action: LogoAction) => {
    switch (action.type) {
        case 'SET_LOGO_ICON':
            return {
                ...logo,
                icon: action.value,
            };

        case 'SET_ICON_SIZE':
            return {
                ...logo,
                size: action.value,
            };

        case 'SET_ICON_ROTATION':
            return {
                ...logo,
                rotation: action.value,
            };

        case 'SET_STROKE_WIDTH':
            return {
                ...logo,
                strokeWidth: action.value,
            };

        case 'SET_STROKE_COLOR':
            return {
                ...logo,
                strokeColor: action.value,
            };

        case 'SET_FILL_COLOR':
            return {
                ...logo,
                fillColor: action.value,
            };

        case 'SET_IS_FILLED':
            return {
                ...logo,
                isFilled: action.value,
            };

        case 'SET_BORDER_RADIUS':
            return {
                ...logo,
                borderRadius: action.value,
            };

        case 'SET_BACKGROUND_COLOR':
            return {
                ...logo,
                backgroundColor: action.value,
            };

        case 'SET_SHADOW':
            return {
                ...logo,
                shadow: action.value,
            };

        case 'IS_GRADIENT_BACKGROUND':
            return {
                ...logo,
                isGradientBackground: action.value,
            };

        default:
            throw new Error();
    }
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
});

export default function AppProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [logo, dispatch] = useReducer(reducer, INITIAL_LOGO);
    const logoRef = useRef<HTMLDivElement>(null);

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

    const setLogoIcon = useCallback((value: string) => {
        dispatch({ type: 'SET_LOGO_ICON', value });
    }, []);

    const setIsGradientBackground = useCallback((value: boolean) => {
        dispatch({ type: 'IS_GRADIENT_BACKGROUND', value });
    }, []);

    const setShadow = (value: string) => {
        dispatch({ type: 'SET_SHADOW', value });
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
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export const useAppProvider = () => useContext(AppContext);

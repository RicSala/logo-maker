'use client';

import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useRef,
    useState,
} from 'react';

interface ContextProps {
    sidebarOpen: boolean;
    setSidebarOpen: Dispatch<SetStateAction<boolean>>; //REVIEW: Why this is type Dispatch<SetStateAction<boolean>>?
    iconSize: number;
    setIconSize: Dispatch<SetStateAction<number>>;
    iconRotation: number;
    setIconRotation: Dispatch<SetStateAction<number>>;
    strokeWidth: number;
    setStrokeWidth: Dispatch<SetStateAction<number>>;
    strokeColor: string;
    setStrokeColor: Dispatch<SetStateAction<string>>;
    fillColor: string;
    setFillColor: Dispatch<SetStateAction<string>>;
    isFilled: boolean;
    setIsFilled: Dispatch<SetStateAction<boolean>>;
    borderRadius: number;
    setBorderRadius: Dispatch<SetStateAction<number>>;
    backgroundColor: string;
    setBackgroundColor: Dispatch<SetStateAction<string>>;
    // A ref that contains the logo
    logoRef: React.RefObject<HTMLDivElement> | null;
    logoIcon: string;
    setLogoIcon: Dispatch<SetStateAction<string>>;
    isGradientBackground: boolean;
    setIsGradientBackground: Dispatch<SetStateAction<boolean>>;
}

// BOILER: export the context in the boilerplate
export const AppContext = createContext<ContextProps>({
    sidebarOpen: false,
    setSidebarOpen: (): boolean => false,
    iconSize: 200,
    setIconSize: (): number => 200,
    iconRotation: 0,
    setIconRotation: (): number => 0,
    strokeWidth: 2,
    setStrokeWidth: (): number => 0,
    strokeColor: '#000000',
    setStrokeColor: (): string => '#000000',
    fillColor: '#000000',
    setFillColor: (): string => '#000000',
    isFilled: false,
    setIsFilled: (): boolean => false,
    borderRadius: 0,
    setBorderRadius: (): number => 0,
    backgroundColor: '#000000',
    setBackgroundColor: (): string => '#000000',
    logoRef: null,
    logoIcon: '',
    setLogoIcon: (): string => '',
    isGradientBackground: false,
    setIsGradientBackground: (): boolean => false,
});

export default function AppProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [iconSize, setIconSize] = useState<number>(200);
    const [iconRotation, setIconRotation] = useState<number>(0);
    const [strokeWidth, setStrokeWidth] = useState<number>(2);
    const [strokeColor, setStrokeColor] = useState<string>('#ffffff');
    const [fillColor, setFillColor] = useState<string>('#000000');
    const [isFilled, setIsFilled] = useState<boolean>(false);
    const [borderRadius, setBorderRadius] = useState<number>(0);
    const [backgroundColor, setBackgroundColor] = useState<string>(
        'linear-gradient(90deg, rgba(96,93,93,1) 0%, rgba(255,255,255,1) 100%)'
    );
    const logoRef = useRef<HTMLDivElement>(null);
    const [logoIcon, setLogoIcon] = useState<string>('chef-hat');
    const [isGradientBackground, setIsGradientBackground] =
        useState<boolean>(true);

    return (
        <AppContext.Provider
            value={{
                sidebarOpen,
                setSidebarOpen,
                iconSize,
                setIconSize,
                iconRotation,
                setIconRotation,
                strokeWidth,
                setStrokeWidth,
                strokeColor,
                setStrokeColor,
                fillColor,
                setFillColor,
                isFilled,
                setIsFilled,
                borderRadius,
                setBorderRadius,
                backgroundColor,
                setBackgroundColor,
                logoRef,
                logoIcon,
                setLogoIcon,
                isGradientBackground,
                setIsGradientBackground,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export const useAppProvider = () => useContext(AppContext);

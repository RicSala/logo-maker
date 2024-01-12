'use client';
import {
    createContext,
    useCallback,
    useContext,
    useRef,
    useState,
} from 'react';

import { useLocalStorage } from '@uidotdev/usehooks';
import {
    deepCopy,
    leadingEdgeThrottledFunction,
    updateHistory,
} from '@/lib/utils';
import { ContextProps, HistoryState, Logo } from '../app/types';

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

const MAX_UNDOS = 10;
const MAX_REDOS = 10;

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
    redo: () => {},
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

    const logoRef = useRef<HTMLDivElement>(null);

    const throttledUpdateHistoryRef = useRef(
        leadingEdgeThrottledFunction(updateHistory<Logo>, 500)
    );

    // REVIEW: how do we know if a function coming from a third party library is memoized? stable?
    /**
     * Given a new history, we update the history in local storage
     */
    const setLogoHistory = useCallback(
        (newHistory: HistoryState<Logo>, stalePresent: Logo) => {
            // deep copy the logo history
            console.log('NEW HISTORY FROM SET LOGO HISTORY', newHistory);
            // first we save the logo as usual (We change the present)
            originalSetLogoHistory(newHistory);

            // then we update the history, but we debounce it so it doesn't get called too often
            throttledUpdateHistoryRef.current(
                stalePresent,
                newHistory,
                MAX_UNDOS,
                originalSetLogoHistory
            );
        },
        [originalSetLogoHistory]
    );

    // Instead of creating a function for each setter, we create a generic function and bind it to property we want to set
    const setProperty = (
        propertyName: keyof Logo,
        value: string | number | boolean
    ) => {
        const stalePresent = deepCopy(logoHistory.present);
        let newHistory: HistoryState<Logo> = {
            // REVIEW: Probably need a deep copy here
            past: [...logoHistory.past],
            present: { ...logoHistory.present, [propertyName]: value },
            future: [...logoHistory.future], // Should we clean the future each time we set a new property? Otherwise would could have like a...multiverse of futures lol
        };
        setLogoHistory(newHistory, stalePresent);
    };

    //
    const setIconSize = setProperty.bind(null, 'size');
    const setIconRotation = setProperty.bind(null, 'rotation');
    const setStrokeWidth = setProperty.bind(null, 'strokeWidth');
    const setStrokeColor = setProperty.bind(null, 'strokeColor');
    const setFillColor = setProperty.bind(null, 'fillColor');
    const setIsFilled = setProperty.bind(null, 'isFilled');
    const setBorderRadius = setProperty.bind(null, 'borderRadius');
    const setBackgroundColor = setProperty.bind(null, 'backgroundColor');
    const setLogoIcon = setProperty.bind(null, 'icon');
    const setIsGradientBackground = setProperty.bind(
        null,
        'isGradientBackground'
    );
    const setShadow = setProperty.bind(null, 'shadow');

    const undo = () => {
        // deep copy the logo history
        const newHistory: HistoryState<Logo> = deepCopy(logoHistory);
        if (newHistory.past.length === 0) return;

        const newFuture = [newHistory.present, ...newHistory.future];
        if (newFuture.length > MAX_REDOS) newFuture.pop();

        originalSetLogoHistory({
            past: newHistory.past.slice(0, -1),
            present: newHistory.past[newHistory.past.length - 1],
            future: newFuture,
            // future: [logoHistory.present, ...logoHistory.future],
        });
    };

    const redo = () => {
        let newHistory: HistoryState<Logo> = deepCopy(logoHistory);
        const newPresent = newHistory.future.shift();
        if (!newPresent) return; // there is nothing to redo
        const newPast = [...newHistory.past, newHistory.present];

        originalSetLogoHistory({
            past: newPast,
            present: newPresent,
            future: newHistory.future,
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
                redo,

                logoRef,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export const useAppProvider = () => useContext(AppContext);
//
//
//
//
//
// ####### OLD CODE #######

// (value: number) => {
//     console.log('SET ICON SIZE', logoHistory.present.size);
//     const stalePresent = JSON.parse(JSON.stringify(logoHistory.present));
//     let newHistory: HistoryState<Logo> = {
//         // REVIEW: Probably need a deep copy here
//         past: [...logoHistory.past],
//         present: { ...logoHistory.present, size: value },
//         future: [...logoHistory.future],
//     };
//     console.log('NEW HISTORY', newHistory);
//     setLogoHistory(newHistory, stalePresent);
// };

// const setIconRotation = (value: number) => {
//     let newHistory: HistoryState<Logo> = {
//         // REVIEW: Probably need a deep copy here
//         past: [...logoHistory.past],
//         present: { ...logoHistory.present, rotation: value },
//         future: [...logoHistory.future],
//     };
//     setLogoHistory(newHistory);
// };

// const setStrokeWidth = (value: number) => {
//     let newHistory: HistoryState<Logo> = {
//         // REVIEW: Probably need a deep copy here
//         past: [...logoHistory.past],
//         present: { ...logoHistory.present, strokeWidth: value },
//         future: [...logoHistory.future],
//     };
//     setLogoHistory(newHistory);
// };

// const setStrokeColor = (value: string) => {
//     let newHistory: HistoryState<Logo> = {
//         // REVIEW: Probably need a deep copy here
//         past: [...logoHistory.past],
//         present: { ...logoHistory.present, strokeColor: value },
//         future: [...logoHistory.future],
//     };
//     setLogoHistory(newHistory);
// };

// const setFillColor = (value: string) => {
//     let newHistory: HistoryState<Logo> = {
//         // REVIEW: Probably need a deep copy here
//         past: [...logoHistory.past],
//         present: { ...logoHistory.present, fillColor: value },
//         future: [...logoHistory.future],
//     };
//     setLogoHistory(newHistory);
// };

// const setIsFilled = (value: boolean) => {
//     console.log('IS FILLED from the setter', logoHistory.present.isFilled);
//     console.log('IS FILLED', value);
//     let newHistory: HistoryState<Logo> = {
//         // REVIEW: Probably need a deep copy here
//         past: [...logoHistory.past],
//         present: { ...logoHistory.present, isFilled: value },
//         future: [...logoHistory.future],
//     };
//     setLogoHistory(newHistory);
// };

// const setBorderRadius = (value: number) => {
//     let newHistory: HistoryState<Logo> = {
//         // REVIEW: Probably need a deep copy here
//         past: [...logoHistory.past],
//         present: { ...logoHistory.present, borderRadius: value },
//         future: [...logoHistory.future],
//     };
//     setLogoHistory(newHistory);
// };

// const setBackgroundColor = (value: string) => {
//     let newHistory: HistoryState<Logo> = {
//         // REVIEW: Probably need a deep copy here
//         past: [...logoHistory.past],
//         present: { ...logoHistory.present, backgroundColor: value },
//         future: [...logoHistory.future],
//     };
//     setLogoHistory(newHistory);
// };

// const setLogoIcon = (value: string) => {
//     let newHistory: HistoryState<Logo> = {
//         // REVIEW: Probably need a deep copy here
//         past: [...logoHistory.past],
//         present: { ...logoHistory.present, icon: value },
//         future: [...logoHistory.future],
//     };
//     setLogoHistory(newHistory);
// };

// const setIsGradientBackground = (value: boolean) => {
//     // deep copy the logo history
//     let newHistory: HistoryState<Logo> = JSON.parse(
//         JSON.stringify(logoHistory)
//     );

//     newHistory = {
//         past: [...newHistory.past],
//         present: { ...newHistory.present, isGradientBackground: value },
//         future: [...newHistory.future],
//     };

//     setLogoHistory(newHistory);
// };

// const setShadow = (value: string) => {
//     let newHistory: HistoryState<Logo> = {
//         // REVIEW: Probably need a deep copy here
//         past: [...logoHistory.past],
//         present: { ...logoHistory.present, shadow: value },
//         future: [...logoHistory.future],
//     };
//     setLogoHistory(newHistory);
// };

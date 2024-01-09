import { useCallback, useState } from "react";

function debounce<T extends (...args: any[]) => any>(func: T, waitFor: number) {
    let timeout: NodeJS.Timeout;

    return (...args: Parameters<T>) => {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            func(...args);
        }, waitFor);
    };
}

const debounceSetLocalStorage = debounce(
    (isClient: boolean, key: string, valueToStore: any) => {
        console.log("attempting to set local storage");
        try {
            if (isClient) {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.error("Error setting localStorage:", error);
        }
    },
    300
);

export function useLocalStorage<T>(key: string, initialValue: T) {
    // Only try to access localStorage if it's available (client-side)
    const isClient = typeof window !== "undefined";

    const [storedValue, setStoredValue] = useState<T>(() => {
        if (!isClient) {
            return initialValue;
        }
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error("Error accessing localStorage:", error);
            return initialValue;
        }
    });

    const setValue = (value: T | ((val: T) => T)) => {
        const valueToStore =
            value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        debounceSetLocalStorage(isClient, key, valueToStore);
    };

    return [storedValue, setValue] as const;
}

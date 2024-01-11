import { useCallback, useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
    // Only try to access localStorage if it's available (client-side)
    const isClient = typeof window !== 'undefined';

    const [storedValue, setStoredValue] = useState<T>(initialValue);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        try {
            const item = window.localStorage.getItem(key);
            if (item) {
                setStoredValue(JSON.parse(item));
            }
        } catch (error) {
            console.error('Error accessing localStorage:', error);
        }
        setIsLoaded(true);
    }, [key]);

    const setValue = useCallback((value: T | ((val: T) => T)) => {
        try {
            setStoredValue((prevValue) => {
                const valueToStore = value instanceof Function ? value(prevValue) : value;
                if (isClient) {
                    window.localStorage.setItem(key, JSON.stringify(valueToStore));
                }
                return valueToStore;
            });
        } catch (error) {
            console.error('Error setting localStorage:', error);
        }
    }, [isClient, key]);

    return [storedValue, setValue, isLoaded] as const;
}

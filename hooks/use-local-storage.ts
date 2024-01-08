import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
    // Only try to access localStorage if it's available (client-side)
    const isClient = typeof window !== 'undefined';

    const [storedValue, setStoredValue] = useState<T>(() => {
        if (!isClient) {
            return initialValue;
        }
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error('Error accessing localStorage:', error);
            return initialValue;
        }
    });

    const setValue = (value: T | ((val: T) => T)) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            if (isClient) {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.error('Error setting localStorage:', error);
        }
    };

    return [storedValue, setValue] as const;
}
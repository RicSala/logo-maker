import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
    // Only try to access localStorage if it's available (client-side)
    const isClient = typeof window !== 'undefined';

    // This version is creating hydration issues: when in the client, it's the local storage value, but when in the server, it's the initial value, so it's creating a mismatch. I guess the solution could be one of two options:
    // 1. Use a useEffect to set the value
    // 2. Use a useState to set the value??? Why does this not work?
    // REVIEW
    // const [storedValue, setStoredValue] = useState<T>(() => {
    //     // If localStorage isn't available, return the initial value
    //     if (!isClient) {
    //         return initialValue;
    //     }
    //     // If the key is already in localStorage, return the stored value
    //     try {
    //         const item = window.localStorage.getItem(key);
    //         return item ? JSON.parse(item) : initialValue; // if no item, return initialValue
    //     } catch (error) {
    //         console.error('Error accessing localStorage:', error);
    //         return initialValue;
    //     }
    // });

    const [storedValue, setStoredValue] = useState<T>(initialValue);

    useEffect(() => {
        const item = window.localStorage.getItem(key);
        setStoredValue(item ? JSON.parse(item) : initialValue);
    }, [key, initialValue]);

    const setValue = (value: T | ((val: T) => T)) => {
        console.log('value from useLocalStorage', { value });
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            console.log('valueToStore', valueToStore);
            setStoredValue(() => valueToStore);
            if (isClient) {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.error('Error setting localStorage:', error);
        }
    };

    return [storedValue, setValue] as const;
}

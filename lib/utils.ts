import { Logo } from '@/providers/app/app-provider';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const verboseLog = (message: string, ...optionalParams: any[]) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(message, optionalParams);
    }
};

export const wait = async (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Converts a kebab-case string to a capitalized camel case string
 * @Example
 * kebab-case-to-capitlized-camel-case => KebabCaseToCapitlizedCamelCase
 */
export const kebabCaseToCapitlizedCamelCase = (str: string) => {
    return str
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
};

export const kebabCaseToString = (str: string) => {
    console.log('here!!', { str });
    return str
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

// BOILER: include this in your project
export const range = (start: number, end: number, step = 1) => {
    let output = [];

    if (typeof end === 'undefined') {
        end = start;
        start = 0;
    }

    for (let i = start; i < end; i += step) {
        output.push(i);
    }

    return output;
};

/**
 * Debounce function. When we call this function, it will return a new function that will have a timeout (closure). If the timeout is already set, it will clear it and set a new one, creating a "debounce" effect. The function has access to the timeout variable because of the closure: it was in its scope when the function was created.
 */
export function debouncedFunction<T extends (...args: any[]) => any>(
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

export const isValidLogo = (logo: Logo) => {
    // console.log('isValidLogo');
    // TODO: This is validate the logo
    if (logo === undefined || logo === null || logo.icon === undefined) {
        return false;
    }
    return true;
};

export const updateArray = <T>(
    newElement: T,
    array: T[],
    MAX_UNDOS: number
) => {
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

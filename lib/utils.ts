import { HistoryState, Logo } from '@/providers/app/types';
import { type ClassValue, clsx } from 'clsx';
import { Dispatch, SetStateAction } from 'react';
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

/**
 * Given a history object, it will update it with the new present, use it as argument in the callback and return the new history object
 */
export const updateHistory = <T>(
    stalePresent: T,
    history: HistoryState<T>,
    maxSnapshots: number,
    setHistory: Dispatch<SetStateAction<{ past: T[]; present: T; future: T[] }>>
) => {
    let newHistory: HistoryState<T> = {
        past: [],
        present: {} as T,
        future: [],
    };

    console.log('upadting history');
    console.log('history from updateHistory', { history });
    console.log('stalePresent from updateHistory', { stalePresent });
    console.log('maxSnapshots from updateHistory', { maxSnapshots });

    // create a deep copy of the history, in case it is a state object
    newHistory = deepCopy(history);

    // if there is something in the present, add it to the past
    if (newHistory.present !== null && newHistory.present !== undefined) {
        newHistory.past = [...newHistory.past, stalePresent];
    }

    // if after adding the present to the past, the past is too long, remove the first element
    if (newHistory.past.length > maxSnapshots) {
        newHistory.past.shift();
    }

    setHistory(newHistory);

    return newHistory;
};

/**
 * Given a function and a time in miliseconds, it will return a new function that will be throttled
 */
export const throttledFunction = <T extends (...args: any[]) => any>(
    func: T,
    waitFor: number
) => {
    // This variable will hold the reference to the last execution time
    //   This variable is local to the returned function because of the closure, so it won't change between calls
    let lastExecutionTime: number = Date.now() - waitFor; // We are kind of lying, but it's to avoid the first execution to be throttled

    // Return a new function that will throttle the execution of 'func'
    return (...args: Parameters<T>) => {
        const now = Date.now();
        // Check if 'waitFor' time has elapsed since the last execution
        if (now - lastExecutionTime >= waitFor) {
            // the first time this will always be true
            lastExecutionTime = now;
            func(...args);
        }
    };
};

/**
 * Leading-edge Throttle function. Executes the passed function immediately on the first call,
 * then ignores subsequent calls within the 'waitFor' period.
 */
export function leadingEdgeThrottledFunction<T extends (...args: any[]) => any>(
    func: T,
    waitFor: number
) {
    // This variable will hold the reference to whether the function is in the cooldown period
    let inCooldown = false; // This variable is local to the returned function because of the closure, so once we have created a throttled function, each function will have its own cooldown period / variable

    // Return a new function that will throttle the execution of 'func'
    return (...args: Parameters<T>) => {
        // Check if the function is in cooldown period, if so do nothing
        if (inCooldown) return;

        // If not in cooldown, call the function
        console.log('calling throttled function');
        func(...args);
        // and start the cooldown period (set 'inCooldown' to true)
        inCooldown = true;
        // Set a timeout to reset the cooldown period after 'waitFor' milliseconds
        setTimeout(() => {
            inCooldown = false;
        }, waitFor);
    };
}

export const deepCopy = (obj: Record<any, any>) => {
    return JSON.parse(JSON.stringify(obj));
};

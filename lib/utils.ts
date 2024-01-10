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

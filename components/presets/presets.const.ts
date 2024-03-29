// At the end of the day, presets are just "states" of the logo.

import { Logo } from '@/providers/app/types';
import { Nullable, Preset } from '@/types/types';

// Create 5 different presets that look good and different from each other. Colors can include gradients in the format 'linear-gradient(45deg, RGBA(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)'. They MUST be different from each other!
export const PRESETS: any[] = [
    {
        id: 'modern-tech',
        name: 'Modern Tech',
        description:
            'Ideal for technology companies seeking a modern and dynamic image with a sleek, futuristic appeal.',
        backgroundColor:
            'linear-gradient(90deg, rgba(0, 255, 136, 1) 0%, rgba(96, 239, 255, 1) 100%)',
        borderRadius: 15,
        fillColor: '#2c3e50',
        icon: null,
        isFilled: false,
        isGradientBackground: true,
        rotation: 10,
        shadow: '3px 3px 8px rgba(0,0,0,0.3)',
        size: 25,
        strokeColor: '#003028',
        strokeWidth: 2,
        fontFamily: 'inter',
        fontSize: 100,
        logoTextTranslateX: 0,
        logoTextTranslateY: 0,
    },
    // Preset 7
    {
        id: 'classic-elegance',
        name: 'Classic Elegance',
        description:
            'Perfect for luxury brands or high-end services, embodying sophistication with a classic, timeless design.',
        backgroundColor:
            'linear-gradient(120deg, rgba(26,188,156,1) 0%, rgba(46,204,113,1) 100%)',
        borderRadius: 30,
        fillColor: '#ecf0f1',
        icon: null,
        isFilled: false,
        isGradientBackground: true,
        rotation: 0,
        shadow: 'none',
        size: 25,
        strokeColor: '#FFF',
        strokeWidth: 3,
        fontFamily: 'inter',
        fontSize: 100,
        logoTextTranslateX: 0,
        logoTextTranslateY: 0,
    },
    // Preset 8
    {
        id: 'sunny-side',
        name: 'Sunny Side',
        description:
            'Great for upbeat, youthful brands, especially in the food or hospitality industry, radiating warmth and positivity.',
        backgroundColor:
            'linear-gradient(90deg, rgba(66, 201, 254, 1) 0%, rgba(232, 25, 255, 1) 100%)',
        borderRadius: 5,
        fillColor: '#f1c40f',
        icon: null,
        isFilled: false,
        isGradientBackground: true,
        rotation: 45,
        shadow: '4px 4px 12px rgba(0,0,0,0.2)',
        size: 25,
        strokeColor: '#ffffff',
        strokeWidth: 2,
        fontFamily: 'inter',
        fontSize: 100,
        logoTextTranslateX: 0,
        logoTextTranslateY: 0,
    },
    // Preset 9
    {
        id: 'corporate-bold',
        name: 'Corporate Bold',
        description:
            'Suited for corporate entities looking for a bold and authoritative presence, with a strong and confident color scheme.',
        backgroundColor:
            'linear-gradient(90deg, rgba(0, 97, 255, 1) 0%, rgba(96, 239, 255, 1) 100%)',
        borderRadius: 20,
        fillColor: '#34495e',
        icon: null,
        isFilled: false,
        isGradientBackground: true,
        rotation: -20,
        shadow: '2px 2px 6px rgba(0,0,0,0.1)',
        size: 25,
        strokeColor: '#031e2f',
        strokeWidth: 2,
        fontFamily: 'inter',
        fontSize: 100,
        logoTextTranslateX: 0,
        logoTextTranslateY: 0,
    },
    // Preset 10
    {
        id: 'urban-chic',
        name: 'Urban Chic',
        description:
            'Ideal for fashion or design-oriented businesses, offering a sleek and stylish urban aesthetic.',
        backgroundColor:
            'linear-gradient(90deg, rgba(52,152,219,1) 0%, rgba(41,128,185,1) 100%)',
        borderRadius: 40,
        fillColor: '#2c3e50',
        icon: null,
        isFilled: false,
        isGradientBackground: true,
        rotation: 0,
        shadow: '5px 5px 15px rgba(0,0,0,0.4)',
        size: 25,
        strokeColor: '#ffffff',
        strokeWidth: 2,
        fontFamily: 'inter',
        fontSize: 100,
        logoTextTranslateX: 0,
        logoTextTranslateY: 0,
    },
    // Preset 11
    {
        id: 'minimalist-dream',
        name: 'Minimalist Dream',
        description:
            'Best for businesses valuing minimalism and simplicity, with a clean and understated look.',
        backgroundColor: '#ecf0f1',
        borderRadius: 0,
        fillColor: '#bdc3c7',
        icon: null,
        isFilled: false,
        isGradientBackground: false,
        rotation: 0,
        shadow: '1px 1px 3px rgba(0,0,0,0.2)',
        size: 25,
        strokeColor: '#6a7171',
        strokeWidth: 2,
        fontFamily: 'inter',
        fontSize: 100,
        logoTextTranslateX: 0,
        logoTextTranslateY: 0,
    },
    // Preset 12
    {
        id: 'green-leaf',
        name: 'Green Leaf',
        description:
            'Especially fitting for eco-friendly or organic businesses, conveying a natural and earthy vibe.',
        backgroundColor: '#1abc9c',
        borderRadius: 10,
        fillColor: '#16a085',
        icon: null,
        isFilled: false,
        isGradientBackground: false,
        rotation: 0,
        shadow: 'none',
        size: 25,
        strokeColor: '#80f7ae',
        strokeWidth: 2,
        fontFamily: 'inter',
        fontSize: 100,
        logoTextTranslateX: 0,
        logoTextTranslateY: 0,
    },
    // Preset 13
    {
        id: 'fiery-edge',
        name: 'Fiery Edge',
        description:
            'A bold choice for dynamic startups or fitness brands, symbolizing energy, passion, and drive.',
        backgroundColor:
            'linear-gradient(60deg, rgba(231,76,60,1) 0%, rgba(230,126,34,1) 100%)',
        borderRadius: 25,
        fillColor: '#e74c3c',
        icon: null,
        isFilled: false,
        isGradientBackground: true,
        rotation: 15,
        shadow: '3px 3px 10px rgba(0,0,0,0.25)',
        size: 25,
        strokeColor: '#b3382a',
        strokeWidth: 2,
        fontFamily: 'inter',
        fontSize: 100,
        logoTextTranslateX: 0,
        logoTextTranslateY: 0,
    },
    // Preset 14
    {
        id: 'cool-waters',
        name: 'Cool Waters',
        description:
            'Perfect for wellness or spa businesses, reflecting serenity and calm with a soothing color palette.',
        backgroundColor: '#95a5a6',
        borderRadius: 35,
        fillColor: '#7f8c8d',
        icon: null,
        isFilled: false,
        isGradientBackground: false,
        rotation: -30,
        shadow: '4px 4px 10px rgba(0,0,0,0.3)',
        size: 25,
        strokeColor: '#34495e',
        strokeWidth: 2,
        fontFamily: 'inter',
        fontSize: 100,
        logoTextTranslateX: 0,
        logoTextTranslateY: 0,
    },
    // Preset 15
    {
        id: 'eco-modern',
        name: 'Eco Modern',
        description:
            'Excellent for modern eco-conscious brands, merging environmental themes with a contemporary look.',
        backgroundColor:
            'linear-gradient(90deg, rgba(240, 244, 30, 1) 0%, rgba(87, 207, 2, 1) 100%)',
        borderRadius: 5,
        fillColor: '#27ae60',
        icon: null,
        isFilled: true,
        isGradientBackground: true,
        rotation: 45,
        shadow: '2px 2px 5px rgba(0,0,0,0.2)',
        size: 25,
        strokeColor: '#2e4053',
        strokeWidth: 2,
        fontFamily: 'inter',
        fontSize: 100,
        logoTextTranslateX: 0,
        logoTextTranslateY: 0,
    },
];

export const IA_PRESET_EXAMPLES: any[] = [
    {
        id: 'minimalist-dream',
        name: 'Minimalist Dream',
        description:
            'Best for businesses valuing minimalism and simplicity, with a clean and understated look.',
        backgroundColor: '#ecf0f1',
        borderRadius: 0,
        fillColor: '#bdc3c7',
        icon: 'play-circle',
        isFilled: false,
        isGradientBackground: false,
        rotation: 0,
        shadow: '1px 1px 3px rgba(0,0,0,0.2)',
        size: 25,
        strokeColor: '#6a7171',
        strokeWidth: 2,
        fontFamily: 'inter',
        fontSize: 100,
        logoTextTranslateX: 0,
        logoTextTranslateY: 0,
    },
    {
        id: 'modern-tech',
        name: 'Modern Tech',
        description:
            'Ideal for technology companies seeking a modern and dynamic image with a sleek, futuristic appeal.',
        backgroundColor:
            'linear-gradient(120deg, rgba(26,188,156,1) 0%, rgba(46,204,113,1) 100%)',
        borderRadius: 15,
        fillColor: '#2c3e50',
        icon: 'chef-hat',
        isFilled: false,
        isGradientBackground: true,
        rotation: 10,
        shadow: '3px 3px 8px rgba(0,0,0,0.3)',
        size: 25,
        strokeColor: '#003028',
        strokeWidth: 2,
        fontFamily: 'inter',
        fontSize: 100,
        logoTextTranslateX: 0,
        logoTextTranslateY: 0,
    },
    {
        id: 'sunny-side',
        name: 'Sunny Side',
        description:
            'Great for upbeat, youthful brands, especially in the food or hospitality industry, radiating warmth and positivity.',
        backgroundColor: '#f39c12',
        borderRadius: 5,
        fillColor: '#f1c40f',
        icon: 'lightbulb',
        isFilled: true,
        isGradientBackground: false,
        rotation: 45,
        shadow: '4px 4px 12px rgba(0,0,0,0.2)',
        size: 25,
        strokeColor: '#b86114',
        strokeWidth: 1,
        fontFamily: 'inter',
        fontSize: 100,
        logoTextTranslateX: 0,
        logoTextTranslateY: 0,
    },
];

import { Bricolage_Grotesque, Inter, Indie_Flower } from 'next/font/google';
import {
    Sofia,
    Montserrat,
    Raleway,
    Playfair_Display,
    Work_Sans,
    Lora,
    Mulish,
    Quicksand,
    Manrope,
    Josefin_Sans,
    Dosis,
    Bitter,
    Jost,
    Dancing_Script,
} from 'next/font/google';

export const primaryFont = Inter({ subsets: ['latin'] });

export const secondaryFont = Bricolage_Grotesque({
    subsets: ['latin'],
    variable: '--font-grotesque',
    display: 'swap',
});

export const handwritten = Indie_Flower({
    subsets: ['latin'],
    variable: '--font-grotesque',
    display: 'swap',
    weight: ['400'],
});

// ### FONTS I LIKE ###
// ### HANDWRITTEN
// Indie Flower
// Caveat

// FONTS FOR THE USER

export const bricolage = Bricolage_Grotesque({
    subsets: ['latin'],
    variable: '--font-grotesque',
    display: 'swap',
    preload: false,
});
export const inter = Inter({
    subsets: ['latin'],
    variable: '--font-roboto',
    display: 'swap',
    preload: false,
});

export const sofia = Sofia({
    subsets: ['latin'],
    variable: '--font-sofia',
    display: 'auto',
    weight: ['400'],
    preload: false,
});

export const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat',
    display: 'auto',
    preload: false,
});

export const raleway = Raleway({
    subsets: ['latin'],
    variable: '--font-raleway',
    display: 'auto',
    preload: false,
});

export const playfairDisplay = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair-display',
    display: 'auto',
    preload: false,
});

export const workSans = Work_Sans({
    subsets: ['latin'],
    variable: '--font-work-sans',
    display: 'auto',
    preload: false,
});

export const lora = Lora({
    subsets: ['latin'],
    variable: '--font-lora',
    display: 'auto',
    preload: false,
});

export const mulish = Mulish({
    subsets: ['latin'],
    variable: '--font-mulish',
    display: 'auto',
    preload: false,
});

export const quicksand = Quicksand({
    subsets: ['latin'],
    variable: '--font-quicksand',
    display: 'auto',
    preload: false,
});

export const manrope = Manrope({
    subsets: ['latin'],
    variable: '--font-manrope',
    display: 'auto',
    preload: false,
});

export const josefinSans = Josefin_Sans({
    subsets: ['latin'],
    variable: '--font-josefin-sans',
    display: 'auto',
    preload: false,
});

export const dosis = Dosis({
    subsets: ['latin'],
    variable: '--font-dosis',
    display: 'auto',
    preload: false,
});

export const bitter = Bitter({
    subsets: ['latin'],
    variable: '--font-bitter',
    display: 'auto',
    preload: false,
});

export const jost = Jost({
    subsets: ['latin'],
    variable: '--font-jost',
    display: 'auto',
    preload: false,
});

export const dancingScript = Dancing_Script({
    subsets: ['latin'],
    variable: '--font-dancing-script',
    display: 'auto',
    preload: false,
});

export const fontsMap = {
    bricolage: secondaryFont,
    inter: primaryFont,
    Indie_Flower: handwritten,
    sofia,
    montserrat,
    raleway,
    playfairDisplay,
    workSans,
    lora,
    mulish,
    quicksand,
    manrope,
    josefinSans,
    dosis,
    bitter,
    jost,
    dancingScript,
} as const;

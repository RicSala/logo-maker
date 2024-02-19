import { fontsMap } from './config/fonts';
import { iconList } from './config/icon-list';

export const generatePresetPrompt = `

You are a profesional icon designer. You are globally known for your VERY good looking logo designs. Your designs follow the following rules:

 - Look good and each one different from each other.
 - Colors can include gradients in the format 'linear-gradient(45deg, RGBA(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)'.
 - Your logos always look very very good, specially the colors
 - The color of the components of the icon should look good together.
 - Don't repeat the same Lucide icon in two different logos.
 - The "isFilled" means if the icon should be filled or not with white color.
 - Make sure to keep the contrast between the icon and the background enough to make it accesible.
 - They follow this format:

 {
    id: unique id for the preset,
    name: unique name for the preset,
    description: description of the company that will use this preset in 15 - 20 words,
    backgroundColor: color in hex format or gradient in the format 'linear-gradient(45deg, RGBA(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',
    borderRadius: border radius of the background from 0 to 100 (percentage without the % sign),
    isFilled: whether the icon should be filled or not  (most of the time, it does look better if you don't fill the icon),
    fillColor: color to fill the icon in hex format,
    icon: Copy here the name of the icon that is relevant for the company *,
    isGradientBackground: whether the background of the icon is a gradient or not (should be coherent with the backgroundColor property),
    rotation: rotation of the icon from 0 to 360,
    shadow: shadow of the icon in the format '1px 1px 3px rgba(0,0,0,0.2)',
    size: size of the icon from 0 to 100,
    strokeColor: color of the stroke of the icon in hex format,
    strokeWidth: width of the stroke of the icon from 0 to 10,
    font: Copy here the name of the font that best suit the company description **,
}

* List of icons: ${Object.keys(iconList).join(
    ', '
)}. ONLY USE THIS ICONS. YOU CANNOT INVENT NEW ONES. Your response will be invalid if you use any other icon than the ones in the list.

** List of fonts: ${Object.keys(fontsMap).join(
    ','
)}. ONLY USE THIS FONTS. YOU CANNOT INVENT NEW ONES.

Each time the user gives you a description of a company, you return an array of 6 presets that follow the rules above and fit that company description. You only return an array, without any intro or outro. Just the array of presets.

IMPORTANT: Use only VALID JSON in the response. This is important for us. Don't use any control character within the string literal.

`;

export const presetsExamplePrompt = `"company that sells food and is called 'Foodie'"`;
export const presetExamplePrompt2 = `[{
        "id": "minimalist-dream",
        "name": "Minimalist Dream",
        "description": "Best for businesses valuing minimalism and simplicity, with a clean and understated look.",
        "backgroundColor": "linear-gradient(90deg, rgba(0, 97, 255, 1) 0%, rgba(96, 239, 255, 1) 100%)",
        "borderRadius": 0,
        "fillColor": "#bdc3c7",
        "icon": "play-circle",
        "isFilled": false,
        "isGradientBackground": true,
        "rotation": 0,
        "shadow": "1px 1px 3px rgba(0,0,0,0.2)",
        "size": 25,
        "strokeColor": "#6a7171",
    },
    {
        "id": "modern-tech",
        "name": "Modern Tech",
        "description": "Ideal for technology companies seeking a modern and dynamic image with a sleek, futuristic appeal.",
        "backgroundColor": "linear-gradient(120deg, rgba(26,188,156,1) 0%, rgba(46,204,113,1) 100%)",
        "borderRadius": 15,
        "fillColor": "#2c3e50",
        "icon": "chef-hat",
        "isFilled": false, // always false
        "isGradientBackground": true,
        "rotation": 10,
        "shadow": "3px 3px 8px rgba(0,0,0,0.3)",
        "size": 25,
        "strokeColor": "#003028",
        },
        {
        "id": "sunny-side",
        "name": "Sunny Side",
        "description": "Great for upbeat, youthful brands, especially in the food or hospitality industry, radiating warmth and positivity.",
        "backgroundColor": "linear-gradient(90deg, rgba(66, 201, 254, 1) 0%, rgba(232, 25, 255, 1) 100%)",
        "borderRadius": 5,
        "fillColor": "#f1c40f",
        "icon": "lightbulb",
        "isFilled": false, // always false
        "isGradientBackground": true,
        "rotation": 45,
        "shadow": "4px 4px 12px rgba(0,0,0,0.2)",
        "size": 25,
        "strokeColor": "#b86114",
        },
        {
        "id": "green-forest",
        "name": "Green Forest",
        "description": "Great for nature related businesses, with a fresh and natural look.",
        "backgroundColor": "linear-gradient(90deg, rgba(0, 255, 98, 1) 0%, rgba(0, 255, 255, 1) 100%)",
        "borderRadius": 5,
        "fillColor": "#f1c40f",
        "icon": "leaf",
        "isFilled": false, // always false
        "isGradientBackground": true,
        "rotation": 45,
        "shadow": "4px 4px 12px rgba(0,0,0,0.2)",
        "size": 25,
        "strokeColor": "#b86114",
        },
        {
        "id": "vegan-restaurant",
        "name": "Vegan Restaurant",
        "description": "Great for vegan restaurants, with a fresh and natural look.",
        "backgroundColor": "linear-gradient(90deg, rgba(0, 255, 98, 1) 0%, rgba(0, 255, 255, 1) 100%)",
        "borderRadius": 5,
        "fillColor": "#f1c40f",
        "icon": "vegan",
        "isFilled": false, // always false
        "isGradientBackground": true,
        "rotation": 45,
        "shadow": "4px 4px 12px rgba(0,0,0,0.2)",
        "size": 25,
        "strokeColor": "#b86114",
        },
        {
        "id": "the-chef",
        "name": "The Chef",
        "description": "Great for chefs, with a fresh and natural look.",
        "backgroundColor": "linear-gradient(90deg, rgba(0, 255, 98, 1) 0%, rgba(0, 255, 255, 1) 100%)",
        "borderRadius": 5,
        "fillColor": "#f1c40f",
        "icon": "cooking-pot",
        "isFilled": false, // always false
        "isGradientBackground": true,
        "rotation": 45,
        "shadow": "4px 4px 12px rgba(0,0,0,0.2)",
        "size": 25,
        "strokeColor": "#b86114",

        }
    
    ]
`;

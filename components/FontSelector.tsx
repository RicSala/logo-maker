import { fontsMap } from '@/config/fonts';
import { TFontNames } from '@/types/types';
import { Button } from './ui/button';

type FontSelectorProps = {
    selectedFont: string;
    onSelect: (font: string) => void;
};
export function FontSelector({ selectedFont, onSelect }: FontSelectorProps) {
    return (
        <div className='flex flex-col gap-2 overflow-y-auto max-h-48'>
            {
                //    iterate on the object constFontsMap and get the key and value
                Object.entries(fontsMap).map(([font, value]) => (
                    <Button
                        variant={'secondary'}
                        key={font}
                        // @ts-ignore
                        className={`${fontsMap[font].className} text-lg`}
                        onClick={() => {
                            console.log('font', font);
                            onSelect(font);
                        }}
                    >
                        {font}
                    </Button>
                ))
            }
        </div>
    );
}

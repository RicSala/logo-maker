'use client';
import { iconList } from '@/config/icon-list';
import { kebabCaseToCapitlizedCamelCase } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';
import { Input } from './ui/input';
import {
    memo,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
// BOILER: better change to useHooks
import { useDebouncedValue } from '@mantine/hooks';
import { AppContext } from '@/providers/app/app-provider';
import { Button } from './ui/button';

type IconProps = {
    name?: keyof typeof LucideIcons.icons;
    color?: String;
    size?: string;
    onSelect: () => void;
};

type LucideIconType = React.ComponentProps<
    (typeof LucideIcons.icons)[keyof typeof LucideIcons.icons]
>;

const iconNames: (keyof typeof LucideIcons.icons)[] = Object.keys(
    iconList
) as (keyof typeof LucideIcons.icons)[];

const searchQuery = (searchQuery: string) => {
    return iconNames.filter((iconName) =>
        iconName.toLowerCase().includes(searchQuery.toLowerCase())
    );
};

const IconSelector = ({
    onSelect,
}: IconProps & Omit<LucideIconType, 'color' | 'size'>) => {
    console.log('Icon selector mounted');

    const [query, setQuery] = useState('');
    const [lastItem, setLastItem] = useState(100);
    const [debounced] = useDebouncedValue(query, 300);
    const { setLogoIcon } = useContext(AppContext);

    // We want to make the last item an intercepting item that will trigger the load of more icons
    //  when the user scrolls to the bottom of the list.
    //  To do this, we need to know when the user has scrolled to the bottom of the list.
    //  We can do this by using a ref and the useEffect hook.
    //  We will create a ref and assign it to the last item in the list.
    //  We will then create a useEffect hook that will be called whenever the ref changes.
    //  In the useEffect hook, we will check if the ref is in the viewport.
    //  If it is, we will load more items.
    //  To check if the ref is in the viewport, we will use the Intersection Observer API.
    //  We will create an observer and assign it to the ref.

    // Step 1: Create a ref
    const observerRef = useRef(null);

    // Step 2: Create a useEffect hook that will be called whenever the ref changes.
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    console.log('load more items');
                    setLastItem((lastItem) => lastItem + 100);
                }
            },
            {
                rootMargin: '300px 0px 0px 0px',
            }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => observer.disconnect();
    }, []); // Empty dependency array to set up observer once

    const iconComponents = () => {
        let count = 0;
        return searchQuery(debounced).map((name) => {
            if (count++ > lastItem) return;
            const camelCaseName = kebabCaseToCapitlizedCamelCase(
                name
            ) as keyof typeof LucideIcons.icons;
            const IconComponent = LucideIcons[camelCaseName];
            return (
                <Button
                    key={name}
                    variant={'secondary'}
                    style={{
                        padding: '10px',
                        display: 'inline-block',
                        textAlign: 'center',
                    }}
                    onClick={() => {
                        setLogoIcon(name);
                        onSelect();
                    }}
                >
                    <IconComponent size={24} />
                </Button>
            );
        });
    };

    // Step 4: Return a div that renders the icon components in a grid
    return (
        <>
            <Input
                placeholder='Buscar icono'
                className='max-w-sm'
                value={query}
                onChange={(event) => {
                    setQuery(event.target.value);
                }}
            />
            <div className='flex flex-wrap gap-2 justify-center items-start'>
                {iconComponents()}
                <div ref={observerRef} className='observer-sentinel' />{' '}
                {/* Stable sentinel element */}
            </div>
        </>
    );
};

export default IconSelector;

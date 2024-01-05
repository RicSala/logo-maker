'use client';
import { iconList } from '@/config/icon-list';
import { kebabCaseToCapitlizedCamelCase } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';
import { Input } from './ui/input';
import { memo, useCallback, useContext, useMemo, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import { AppContext } from '@/providers/app-provider';
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

const IconSelector = ({
    onSelect,
    ...props
}: IconProps & Omit<LucideIconType, 'color' | 'size'>) => {
    console.log('Icon selector mounted');

    const [query, setQuery] = useState('');
    const [debounced] = useDebouncedValue(query, 300);
    const { setLogoIcon } = useContext(AppContext);

    const iconNames: (keyof typeof LucideIcons.icons)[] = useMemo(() => {
        return Object.keys(iconList) as (keyof typeof LucideIcons.icons)[];
    }, []);

    const searchQuery = useCallback(
        (searchQuery: string) => {
            return iconNames.filter((iconName) =>
                iconName.toLowerCase().includes(searchQuery.toLowerCase())
            );
        },
        [iconNames]
    );

    const iconComponents = useMemo(
        () =>
            searchQuery(debounced).map((name) => {
                // if (count++ > 100) return;
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
            }),
        [debounced, onSelect, searchQuery, setLogoIcon]
    );

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
                {iconComponents}
            </div>
        </>
    );
};

export default memo(IconSelector);

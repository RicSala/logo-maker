import { icons } from 'lucide-react';

// Get the type of

type IconProps = {
    name: String;
    color?: String;
    size?: string;
};

type LucideIconType = React.ComponentProps<(typeof icons)[keyof typeof icons]>;

const IconComp = ({
    name,
    color,
    size,
    ...props
}: IconProps & Omit<LucideIconType, 'color' | 'size'>) => {
    // @ts-ignore
    const LucideIcon = icons[name];

    return <LucideIcon color={color} size={size} {...props} />;
};

export default IconComp;

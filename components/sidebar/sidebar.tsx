import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { IconSettings } from './icon-settings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { BackgroundSettings } from './background-settings';
import { TextSettings } from './text-settings';

type SidebarProps = {
    className?: string;
};

export function Sidebar({ className, ...props }: SidebarProps) {
    return (
        <div
            className={cn(
                `
                bg-background
                p-4
                mx-auto
                w-full
                h-[600px]
                lg:h-auto
                md:shrink-0
                md:w-[80%]
                lg:w-80
                relative
                md:max-h-[calc(100vh-4rem)]
                overflow-y-scroll
                `,
                className
            )}
            {...props}
        >
            <Tabs defaultValue='text' className='w-full max-w-lg mx-auto'>
                <TabsList className='w-full justify-around'>
                    <TabsTrigger value='text'>Texto</TabsTrigger>
                    <TabsTrigger value='icon'>Icono</TabsTrigger>
                    <TabsTrigger value='background'>Fondo</TabsTrigger>
                </TabsList>
                <TabsContent value='text'>
                    <TextSettings />
                </TabsContent>
                <TabsContent value='icon'>
                    <IconSettings />
                </TabsContent>
                <TabsContent value='background'>
                    <BackgroundSettings />
                </TabsContent>
            </Tabs>
        </div>
    );
}

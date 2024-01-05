import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { IconSettings } from './icon-settings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { BackgroundSettings } from './background-settings';

type SidebarProps = {
    className?: string;
};

export function Sidebar({ className, ...props }: SidebarProps) {
    return (
        <div
            className={cn(
                `flex flex-col border-r-2 border-l-2 border-border h-full p-2 gap-6
                w-80
                `,
                className
            )}
            {...props}
        >
            <Tabs defaultValue='icon' className='w-full'>
                <TabsList className='w-full justify-around'>
                    <TabsTrigger value='icon'>Icono</TabsTrigger>
                    <TabsTrigger value='background'>Fondo</TabsTrigger>
                </TabsList>
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

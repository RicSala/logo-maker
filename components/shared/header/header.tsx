'use client';

import { DownloadButton } from '@/components/downloadButton';
import { Button } from '@/components/ui/button';
import { useAppProvider } from '@/providers/app/app-provider';
import { Menu, Redo, Undo } from 'lucide-react';
import { useState } from 'react';
import { Presets } from '@/components/presets/presets';
import { IaPreset } from '@/components/presets/ia-preset';
import Logo from '../logo';

export default function Header() {
    const { sidebarOpen, setSidebarOpen, undo, redo } = useAppProvider();

    return (
        <header className='sticky top-0 bg-white dark:bg-[#182235] border-b border-slate-200 dark:border-slate-700 z-30'>
            <div className='px-2 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between p-2 -mb-px flex-col gap-2  lg:flex-row'>
                    <div className='flex gap-2 w-full lg:w-auto'>
                        <Logo />
                        <Button
                            className='ml-auto lg:ml-0'
                            onClick={() => {
                                console.log('undoing...');
                                undo();
                            }}
                        >
                            <Undo size={24} />
                        </Button>
                        <Button
                            onClick={() => {
                                console.log('redoing...');
                                redo();
                            }}
                        >
                            <Redo size={24} />
                        </Button>
                        <DownloadButton />
                    </div>

                    <div className='flex items-center space-x-3 md:ml-auto overflow-x-auto max-w-full'>
                        <hr className='w-px h-6 bg-slate-200 dark:bg-slate-700 border-none' />
                        <Presets />
                        <IaPreset />
                    </div>
                </div>
            </div>
        </header>
    );
}

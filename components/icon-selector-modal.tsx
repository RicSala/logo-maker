'use client';

import { kebabCaseToCapitlizedCamelCase, kebabCaseToString } from '@/lib/utils';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Button } from './ui/button';
import IconComp from './icon-comp';
import { useCallback, useContext, useState } from 'react';
import IconSelector from './icon-selector';
import { AppContext } from '@/providers/app/app-provider';

type IconSelectorModalProps = {};

export function IconSelectorModal({}: IconSelectorModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { logo } = useContext(AppContext);

    console.log('logo from iconselector modal', logo);

    const closeDialog = useCallback(() => {
        setIsOpen(false);
    }, []);
    // {/* TODO: How can we improve performance of the modal rendering? */}
    return (
        <div>
            <div className='flex justify-between'>
                <Label className='text-sm'>Icono</Label>
                <Label className='text-sm'>
                    {kebabCaseToString(logo.icon)}
                </Label>
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button variant={'secondary'}>
                        <IconComp
                            name={kebabCaseToCapitlizedCamelCase(logo.icon)}
                        />
                    </Button>
                </DialogTrigger>
                <DialogContent
                    className='overflow-scroll h-full flex flex-col justify-start pt-12 items-center'
                    forceMount
                >
                    <IconSelector onSelect={closeDialog} />
                </DialogContent>
            </Dialog>
        </div>
    );
}

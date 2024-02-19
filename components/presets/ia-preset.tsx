import { useContext, useEffect, useState } from 'react';
import { PresetButton, applyPreset } from './presets';
import { IA_PRESET_EXAMPLES, PRESETS } from './presets.const';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/button';
import Logo from '../shared/logo';
import { Separator } from '../ui/separator';
import { ApiRequestBody, Preset } from '@/types/types';
import { apiClient } from '@/lib/apiClient';
import {
    GenerateApiRequestBody,
    GenerateApiResponseBody,
} from '@/app/api/generate-preset/route';
import { cn, range } from '@/lib/utils';
import { AppContext } from '@/providers/app/app-provider';
import Spinner from '../icons/spinner';

export function IaPreset({}) {
    // Show a new example of the array every 3 seconds
    const [exampleIndex, setExampleIndex] = useState<number>(0);
    const [isOpen, setIsOpen] = useState(false);

    const closeDialog = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setExampleIndex((exampleIndex + 1) % IA_PRESET_EXAMPLES.length); // This is how you make it loop!
        }, 1000);
        return () => clearInterval(interval);
    }, [exampleIndex]);
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger>
                <PresetButton
                    preset={IA_PRESET_EXAMPLES[exampleIndex]}
                    tooltip='Deja que la IA cree un diseño para ti'
                    onClick={() => {}}
                />
            </DialogTrigger>
            <DialogContent className='min-w-fit'>
                <AIModal onClose={closeDialog} />
            </DialogContent>
        </Dialog>
    );
}

export const CompanyDescriptionSchema = z.object({
    description: z.string().min(10, 'Mínimo 10 caracteres'),
});

export type GenerateFormValues = z.infer<typeof CompanyDescriptionSchema>;

export const AIModal = ({ onClose }: { onClose: () => void }) => {
    const [presets, setPresets] = useState<Preset[]>([]);
    const [status, setStatus] = useState<presetStatus>('idle');
    const { logo, setNewLogo } = useContext(AppContext);

    const onSubmit = async (data: any) => {
        setStatus('loading');
        console.log(data);
        try {
            const body: GenerateApiRequestBody<'GENERATE'> = {
                action: 'GENERATE',
                data: {
                    description: data.description,
                },
            };
            const res: GenerateApiResponseBody<'GENERATE'> =
                await apiClient.post('/generate-preset', body);

            setPresets(res.data as Preset[]);
            setStatus('success');
        } catch (e) {
            setStatus('error');
        } finally {
            setStatus('idle');
        }
    };
    const onError: SubmitErrorHandler<any> = (errors, e) =>
        console.log(errors, e);

    const form = useForm({
        resolver: zodResolver(CompanyDescriptionSchema),
    });

    const buttonLabel = status === 'loading' ? 'Generando...' : 'Generar Logos';
    const ButtonIcon = status === 'loading' ? <Spinner /> : <span>✨</span>;

    return (
        <div className='flex flex-col gap-8'>
            <h3>Describe tu negocio y deja a la IA hacer su magia</h3>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit, onError)}
                    className='flex flex-col gap-4'
                >
                    <FormField
                        control={form.control}
                        name='description'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel></FormLabel>
                                <FormControl>
                                    <Input
                                        type=''
                                        placeholder='Coach para emprendedores que quieren aumentar sus ventas'
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Cuéntanos qué hace tu negocio
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type='submit' className='w-full flex gap-2'>
                        {ButtonIcon}
                        {buttonLabel}
                    </Button>
                </form>
            </Form>
            {/* GENERATED LOGOS */}
            <Separator />
            <div className='flex gap-2'>
                {presets.length > 0 ? (
                    presets.map((preset) => (
                        <LogoProposal
                            preset={{ ...preset, size: 60 }}
                            className='h-40 w-40'
                            key={preset.id}
                            onClick={() => {
                                setNewLogo(applyPreset(preset, logo, 80));
                                onClose();
                            }}
                            status={status}
                        />
                    ))
                ) : (
                    <>
                        <LogoProposal status={status} />
                        <LogoProposal status={status} />
                        <LogoProposal status={status} />
                    </>
                )}
            </div>
        </div>
    );
};

type presetStatus = 'idle' | 'loading' | 'error' | 'success';

type LogoPlaceholderProps = {
    preset?: Preset;
    status?: presetStatus;
    className?: string;
    onClick?: () => void;
    rest?: any;
};

const LogoProposal = ({
    preset,
    status,
    className,
    onClick,
    ...rest
}: LogoPlaceholderProps) => {
    if (!preset && status === 'idle')
        return (
            <div className='h-40 w-40 flex justify-center items-center bg-muted rounded-md'>
                ?
            </div>
        );

    if (status === 'loading')
        return (
            <div className='h-40 w-40 flex justify-center items-center bg-muted rounded-md'>
                <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-primary'></div>
            </div>
        );

    if (status === 'error')
        return (
            <div className='h-40 w-40 flex justify-center items-center bg-muted rounded-md'>
                <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-primary'></div>
            </div>
        );

    if (preset)
        return (
            <>
                <PresetButton
                    preset={preset}
                    className={cn(`h-40 w-40`, className)}
                    onClick={onClick}
                    {...rest}
                />
            </>
        );
};

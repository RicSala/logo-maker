'use client';

import { Download } from 'lucide-react';
import { Button } from './ui/button';
import { toPng, toSvg } from 'html-to-image';
import { useContext, useRef } from 'react';
import { AppContext } from '@/providers/app/app-provider';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import {
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';

type ImageFormat = 'png' | 'svg';

export function DownloadButton({}) {
    const { logoRef } = useContext(AppContext);

    const onDownload = async (format: ImageFormat) => {
        if (!logoRef!.current) return alert("Couldn't download image");
        console.log(logoRef!.current);
        let dataUrl;
        let link = document.createElement('a');

        switch (format) {
            case 'png':
                dataUrl = toPng(logoRef!.current);
                link.download = `logo.png`;

                break;
            case 'svg':
                dataUrl = toSvg(logoRef!.current);
                link.download = `logo.svg`;
                break;
        }
        link.href = await dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button>
                    Descargar
                    <Download className='ml-2' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem
                    onClick={() => {
                        onDownload('svg');
                    }}
                >
                    SVG
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => {
                        onDownload('png');
                    }}
                >
                    PNG
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

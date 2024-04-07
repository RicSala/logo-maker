'use client';

import { Download } from 'lucide-react';
import { Button } from './ui/button';
import { toBlob, toPng, toSvg } from 'html-to-image';
import { useContext, useRef } from 'react';
import { AppContext } from '@/providers/app/app-provider';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import {
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { uploadToCloudinary } from '@/actions/server-actions';
import cloudinary from 'cloudinary';
import Script from 'next/script';
// import ImageTracer from 'imagetracerjs';

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
                dataUrl = await toPng(logoRef!.current, {});
                link.download = `logo.png`;

                break;
            case 'svg':
                link.download = `logo.svg`;
                let imagePng = await toPng(logoRef!.current, { pixelRatio: 1 });
                let imageBlob = await toBlob(logoRef!.current, {});
                // ImageTracer.imageToSVG(
                //     imagePng,
                //     (svg: any) => {
                //         console.log(svg);
                //     },
                //     'sharp'
                // );
                // let svgstring = ImageTracer.imagedataToSVG(imageBlob, {});
                // console.log(svgstring);
                const formData = new FormData();
                formData.append('logo', imageBlob!, 'logo.png');
                const response = await uploadToCloudinary(formData);
                console.log(response);
                // dataUrl = response;
                return;
                break;
        }
        // @ts-ignore
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (
        <>
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
                            onDownload('png');
                        }}
                    >
                        PNG
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Script src='imagetracer_v1.2.6.js' strategy='afterInteractive' />
        </>
    );
}

// <DropdownMenuItem
//     onClick={() => {
//         onDownload('svg');
//     }}
// >
//     SVG
// </DropdownMenuItem>

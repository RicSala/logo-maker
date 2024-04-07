'use server';

import cloudinary from 'cloudinary';
import fs from 'fs';
import {
    vectorize,
    ColorMode,
    PathSimplifyMode,
    Hierarchical,
} from '@neplex/vectorizer';

// NOT USED FOR NOW
export const uploadToCloudinary = async (
    formData: FormData
): Promise<cloudinary.UploadApiResponse | undefined> => {
    cloudinary.v2.config({
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    return new Promise(async (resolve, reject) => {
        // Get the file from the FormData
        const fileRaw = formData.get('logo') as Blob;
        if (!fileRaw) {
            reject(new Error("No file named 'logo' in FormData"));
            return;
        }

        const arrayBuffer = await fileRaw.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const filePath = `logos/test}`;
        fs.writeFileSync(filePath, buffer);

        // get a read stream from the file
        const readStream = fs.createReadStream(filePath);

        // get a write stream to upload the file to cloudinary
        const writeStream = cloudinary.v2.uploader.upload_stream(
            { folder: 'logos' },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    const svg = cloudinary.v2.url(result?.public_id!, {
                        format: 'svg',
                        effect: 'vectorize',
                    });

                    // ImageTracer.imageToSVG(
                    //     result?.secure_url /* input filename / URL */,
                    //     function (svgstr: any) {
                    //         console.log(svgstr);
                    //     } /* callback function to run on SVG string result */,
                    //     'posterized2' /* Option preset */
                    // );
                    console.log(svg);
                    // @ts-ignore
                    resolve(svg);
                }
            }
        );

        // pipe the read stream to the write stream
        readStream.pipe(writeStream);

        // delete the file after uploading

        readStream.on('end', () => {
            fs.unlinkSync(filePath);
        });

        readStream.on('error', (error) => {
            reject(error);
        });
    });
};

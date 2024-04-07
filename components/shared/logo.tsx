import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export default function Logo({ className }: { className?: string }) {
    return (
        <Link
            className={cn(`block w-48 h-16 relative min-w-[4rem]`, className)}
            href='/'
        >
            <Image
                src={'/images/logo.png'}
                alt='Logo'
                fill
                className='object-contain invisible sm:visible'
            />
            <Image
                src={'/images/favicon.png'}
                alt='Logo'
                fill
                className='object-contain sm:invisible'
            />
        </Link>
    );
}

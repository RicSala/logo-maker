import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
    return (
        <Link className='block w-10 h-10 relative' href='/'>
            <Image src={'/images/logo.png'} alt='Logo' fill />
        </Link>
    );
}

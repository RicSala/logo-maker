'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export const Newsletter = () => {
    return (
        <section className='max-w-xl mt-12 mx-auto px-4 md:px-8'>
            <div className='space-y-3 text-center'>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-14 w-14 mx-auto text-gray-300'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76'
                    />
                </svg>
                <h3 className='text-3xl text-gray-800 font-bold'>
                    Subscribe to our newsletter
                </h3>
                <p className='text-gray-400 leading-relaxed'>
                    Stay up to date with the roadmap progress, announcements and
                    exclusive discounts feel free to sign up with your email.
                </p>
            </div>
            <div className='mt-6'>
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className='items-center justify-center sm:flex'
                >
                    <Input
                        type='email'
                        placeholder='Enter your email'
                        className='text-gray-500 w-full p-3 rounded-md border outline-none focus:border-primary'
                    />
                    <Button className='ml-2'>Subscribe</Button>
                </form>
                <p className='mt-3 mx-auto text-center max-w-lg text-[15px] text-gray-400'>
                    No spam ever, we are care about the protection of your data.
                    Read our{' '}
                    <Link className='text-primary underline' href=''>
                        {' '}
                        Privacy Policy{' '}
                    </Link>
                </p>
            </div>
        </section>
    );
};

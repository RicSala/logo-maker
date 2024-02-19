// import Sidebar from '@/components/ui/sidebar';
// import Header from '@/components/ui/header';

import Container from '@/components/shared/container';
import Header from '@/components/shared/header/header';

export default function DefaultLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='flex h-[100dvh] overflow-hidden'>
            {/* <Sidebar /> */}

            {/* Content area */}
            <div className='relative flex flex-col flex-1 overflow-y-hidden overflow-x-hidden'>
                {/*  Site header */}
                <Header />

                <main className='gap flex flex-1 flex-col [&>*:first-child]:scroll-mt-16 h-[calc(100%-4rem)]'>
                    <Container className={'min-h-full px-0 md:px-0 xl:px-0'}>
                        {children}
                    </Container>
                </main>
            </div>
        </div>
    );
}

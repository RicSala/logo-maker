import { LogoViewer } from '@/components/logo-design/logo-viewer';
import { Sidebar } from '@/components/sidebar/sidebar';

export default function Page({}) {
    return (
        <div className='flex lg:flex-row flex-col-reverse h-full isolate z-10 overflow-hidden'>
            <Sidebar />
            <LogoViewer className='isolate flex-grow' />
        </div>
    );
}

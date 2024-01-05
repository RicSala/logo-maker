import { LogoViewer } from '@/components/logo-viewer';
import { Sidebar } from '@/components/sidebar';

export default function Page({}) {
    return (
        <div className='flex h-full'>
            <Sidebar />
            <LogoViewer className='flex-grow' />
        </div>
    );
}

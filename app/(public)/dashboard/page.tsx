'use client';

import { useState } from 'react';
import ColorPicker from 'react-best-gradient-color-picker';

export default function Home() {
    const [color, setColor] = useState('rgba(255,255,255,1)');

    return (
        <div className='gap flex flex-col items-center justify-between'>
            <ColorPicker value={color} onChange={setColor} />{' '}
        </div>
    );
}

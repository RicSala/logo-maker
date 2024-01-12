import { useEffect, useState } from 'react';
import { PresetButton } from './presets';
import { IA_PRESET_EXAMPLES } from './presets.const';

export function IaPreset({}) {
    // Show a new example of the array every 3 seconds
    const [exampleIndex, setExampleIndex] = useState<number>(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setExampleIndex((exampleIndex + 1) % IA_PRESET_EXAMPLES.length); // This is how you make it loop!
        }, 1000);
        return () => clearInterval(interval);
    }, [exampleIndex]);
    return <PresetButton preset={IA_PRESET_EXAMPLES[exampleIndex]} />;
}

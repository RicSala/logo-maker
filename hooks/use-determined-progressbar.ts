import { useState, useEffect } from 'react';

function useDeterminedProgressBar({
    isUploading = false,
    onComplete = () => {},
    onError = () => {},
    interval = 300,
    increment = 5,
}) {
    const [progressValue, setProgressValue] = useState<number>(0);
    const [showProgressBar, setShowProgressBar] = useState(false);

    useEffect(() => {
        let intervalId: any;

        if (isUploading) {
            setShowProgressBar(true);
            intervalId = setInterval(() => {
                setProgressValue((prevProgressValue) => {
                    const newProgressValue = prevProgressValue + increment;
                    return newProgressValue >= 100 ? 0 : newProgressValue;
                });
            }, interval);
        } else if (progressValue !== 100 && progressValue !== 0) {
            setProgressValue(100);
            if (onComplete) {
                onComplete();
            }
            setTimeout(() => {
                setShowProgressBar(false);
                setProgressValue(0);
            }, 2000); // delay hiding the progress bar
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [isUploading, progressValue, onComplete, interval, increment]);

    useEffect(() => {
        // @ts-ignore
        if (isUploading && onError) {
            // Handle potential errors during upload
            // If an error occurs, call the onError callback.
        }
    }, [isUploading, onError]);

    return [progressValue, showProgressBar];
}

export default useDeterminedProgressBar;

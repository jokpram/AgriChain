import { useRef } from 'react';

export function useThrottle<T extends (...args: any[]) => void>(
    callback: T,
    delay: number
) {
    const lastCall = useRef(0);

    return (...args: Parameters<T>) => {
        const now = new Date().getTime();
        if (now - lastCall.current >= delay) {
            lastCall.current = now;
            callback(...args);
        }
    };
}

import { useState, useEffect } from 'react';
import { DebounceInterface } from './interfaces';

const Debounce = (props: DebounceInterface) => {

    const { value, delay } = props;

    // State and setters for debounced value
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {

        // Set debounceValue to value after the specified delay
        const handler = setTimeout(() => {
            setDebounceValue(value)
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay])

    return debounceValue;
}

export default Debounce;


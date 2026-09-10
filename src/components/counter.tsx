import { useState } from 'react';
import { Button } from './ui/button';

function Counter() {
    const [count, setCount] = useState(0)

    function increment() {
        setCount(count + 1)
    }
    return (
        <div>
            <h1>
                Counter
            </h1>
            <Button className="button" type="button" onClick={increment}>Increment</Button>
            <p>Count: {count}</p>
        </div>
    );
}

export default Counter;
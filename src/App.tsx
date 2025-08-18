import {useState} from "react";

function App() {
    const [counter, setCounter] = useState(0)

    function setCount() {
        setCounter(prevCount => prevCount + 1)
    }

    return (
        <div>
            <h1 className="text-3xl font-bold">
                Hello world!
            </h1>

            <button type={"button"} onClick={setCount}>click me</button>
            <p>{counter}</p>
        </div>
    )
}

export default App

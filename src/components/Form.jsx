import React from "react";

export default function Form() {

    const [sum, setSum] = React.useState(0)
    const [count, setCount] = React.useState(0)

    const value = React.useRef();

    const submit = e => {
        e.preventDefault();
        if (isNaN(value.current.value)) alert("to nie liczba!")
        else {
            setSum(parseInt(value.current.value) + sum)
            setCount(count + 1)
        }
        value.current.value = "";
    }

    return (
        <>
            <form onSubmit={submit}>
                <input ref={value} type="text" placeholder="podal liczby" required />
                <button>Oblicz</button>
            </form>
            <p>
                <span>Średnia: {sum === 0 ? 0 : sum/count}</span><br/>
                <span>Suma: {sum}</span>
            </p>
        </>
    );
}
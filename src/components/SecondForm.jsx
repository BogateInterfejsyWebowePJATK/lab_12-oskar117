import React from "react";
import '../App.css'

export default function SecondForm() {

    const [name, setName] = React.useState()
    const [surname, setSurname] = React.useState()
    const [gender, setGender] = React.useState("Mężczyzna")
    const [color, setColor] = React.useState("Czarny")
    const [agreement, setAgreement] = React.useState(false)
    const [send, setSend] = React.useState(false)

    const submit = e => {
        e.preventDefault();
        setSend(true)
    }

    const reset = () => {
        setName("")
        setSurname("")
        setGender("Mężczyzna")
        setColor("Czarny")
        setAgreement(false)
    }

    return (
        <>
            {!send ? 
                <form onSubmit={submit}>
                    <label>Imie:</label>
                    <input value={name} type="text" required onChange={(e) => setName(e.target.value)}/><br/>
                    <label>Nazwisko:</label>
                    <input value={surname} type="text" required onChange={(e) => setSurname(e.target.value)}/><br/>
                    <label>Płeć:</label><br/>
                    <label>M:</label><input name="gender" type="radio" onChange={() => setGender("Mężczyzna")}/>
                    <label>K:</label><input name="gender" type="radio" onChange={() => setGender("Kobieta")}/><br/>
                    <label>Ulubiony kolor:</label>
                    <select value={color} onChange={e => setColor(e.target.value)} required>
                        <option value="Czarny">Czarny</option>
                        <option value="biały">biały</option>
                        <option value="czerwony">czerwony</option>
                        <option value="niebieski">niebieski</option>
                    </select><br/>
                    <label>Zgoda na oddanie nerki:</label>
                    <input type="checkbox" checked={agreement} onChange={() => setAgreement(!agreement)} /><br/>

                    <button onClick={() => reset()}>Reset</button>
                    <input type="submit" value="oblicz"/>
                </form>
            :
                <table style={{border: "1px solid black"}}>
                    <tbody>
                        <tr>
                            <td>Imie</td>
                            <td>{name}</td>
                        </tr>
                        <tr>
                            <td>Nazwisko</td>
                            <td>{surname}</td>
                        </tr>
                        <tr>
                            <td>Płeć</td>
                            <td>{gender}</td>
                        </tr>
                        <tr>
                            <td>Ulubiony kolor</td>
                            <td>{color}</td>
                        </tr>
                        <tr>
                            <td>Wyraził zgode</td>
                            <td>{agreement ? "tak" : "nie"}</td>
                    </tr>
                    </tbody>
                </table>    
            }
           
        </>
    );
}
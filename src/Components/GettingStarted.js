import "./GettingStarted.css";
import { useState } from 'react'
import { Link } from "react-router-dom";

const GettingStarted = () => {
    const [value, setValue] = useState("");
    window.localStorage.clear();
    const handleButtonClick = () => {
        window.localStorage.setItem("name", value);
        window.localStorage.setItem("date", new Date());
    }

    return (
        <div className="getting-started">
            <form className="form">
                <input required type="text" placeholder='Type your username' onChange={(event) => setValue(event.target.value)} />
                <button type="submit">
                    <Link 
                    to="/comments" 
                    style={{color : "rgb(2, 71, 160)", textDecoration : "none"}} 
                    onClick={handleButtonClick}>
                        Getting Started
                    </Link>
                </button>
            </form>
        </div>
    )
}

export default GettingStarted;

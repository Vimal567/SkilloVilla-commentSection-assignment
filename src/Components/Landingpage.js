import AddComment from "./AddComment";
import "./Landingpage.css";
import jsonData from "../data.json";
import { createContext, useState } from "react";
import CommentSection from "./CommentSection";
import { Link } from "react-router-dom";

export const allData = createContext();

const Landingpage = () => {
    const [data, setData] = useState(jsonData);
    return (
        <div className="landingpage">
            <button className="logout">
                <Link to="/" style={{color : "white", textDecoration : "none"}}>Logout</Link>
            </button>
            <div className="comment-container">
                <allData.Provider value ={data} >
                <AddComment save={(comment)=> setData(comment)} />
                <CommentSection save={(newData)=> setData(newData)} />
                </allData.Provider>
            </div>
        </div>
    )
    }
export default Landingpage;

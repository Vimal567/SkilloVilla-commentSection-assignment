import { useContext, useState } from "react";
import "./AddComent.css";
import { allData } from "./Landingpage";

const AddComment = ({save}) => {
    const [value, setValue] = useState("");
    const data = useContext(allData)

    const handleAddComment = () => {
        if(!value){
            alert("Field cannot be empty");
            return;
        }
        const onLoadDate = new Date(window.localStorage.getItem("date"));
        const onLoadTime = onLoadDate.getTime();
        const nowTime = new Date().getTime();
        const minutesPassed = Math.ceil((nowTime - onLoadTime) / 60000);
        const newId = Math.floor(Math.random() * (99999 - 10000)) + 10000;
        const newCommentObj = {
            id: newId,
            name : localStorage.getItem("name"),
            image : "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            comment : value,
            time : minutesPassed,
            likes: 0,
            dislikes: 0,
            "reply": []
        }
        const comment = [...data, newCommentObj];
        save(comment);
        setValue("");
    }

    return (
        <div className='add-comment'>
            <img alt='logo' src='https://cdn-icons-png.flaticon.com/512/149/149071.png' />
            <input required value={value} onChange={(event)=> setValue(event.target.value)} type="text" placeholder="Join the discussion..." />
            <button onClick={handleAddComment}>Add Comment</button>
        </div>
    )
}

export default AddComment;

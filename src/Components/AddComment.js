import { useContext, useState } from "react";
import "./AddComent.css";
import { allData } from "./Landingpage";

const AddComment = ({save}) => {
    const data = useContext(allData)
    const [value, setValue] = useState("");
    const [sortBy, setSorBy] = useState("");

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

    const handleSort = (event) => {
        if(event.target.value === "time"){
            const newObj = [...data];
            newObj.sort(function(a, b) {
                return a.time - b.time;
            });
            save(newObj);
        }
        if(event.target.value === "likes"){
            const newObj = [...data];
            newObj.sort(function(a, b) {
                return a.likes - b.likes;
            });
            save(newObj);
        }
    }

    return (
        <div className='add-comment'>
            <img alt='logo' src='https://cdn-icons-png.flaticon.com/512/149/149071.png' />
            <input required value={value} onChange={(event)=> setValue(event.target.value)} type="text" placeholder="Join the discussion..." />
            <button onClick={handleAddComment}>Add Comment</button>
            <select name="sort" onChange={handleSort}>
                <option value="">-Sort options-</option>
                <option value="time">Time</option>
                <option value="likes">Likes</option>
            </select>
        </div>
    )
}

export default AddComment;

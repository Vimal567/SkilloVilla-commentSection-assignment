import "./CommentSection.css";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useContext, useRef, useState } from "react";
import { allData } from "./Landingpage";

const username = localStorage.getItem("name");

const CommentSection = ({save}) => {
    const data = useContext(allData)
    const [editOn, setEditOn] = useState({
        id : null,
        idx : null,
        keyes: null
    });
    const [replyOn, setReplyOn] = useState({
        id : null,
        name : "",
        idx : null,
        keyes: null
    });
    const replyInput = useRef();
    const editInput = useRef("");

    const handleLike = (idx, keyes)=> {
        if(keyes === undefined){
            const newObj = [...data]
            newObj[idx].likes = data[idx].likes + 1;
            save(newObj);
            return;
        }
        const newObj = [...data];
        const replies = newObj[idx].reply;
        replies[keyes].likes = replies[keyes].likes + 1;
        newObj[idx].reply = replies;
        save(newObj);
        return;
    }

    const handleDislike = (idx, keyes)=> {
        if(keyes === undefined){
            const newObj = [...data]
            newObj[idx].dislikes = data[idx].dislikes + 1;
            save(newObj);
            return;
        }
        const newObj = [...data];
        const replies = newObj[idx].reply;
        replies[keyes].dislikes = replies[keyes].dislikes + 1;
        newObj[idx].reply = replies;
        save(newObj);
        return;
    }

    const handleReply = (event, commentId, idx, keyes) => {
        setReplyOn({
            id : commentId,
            name: event.target.name,
            idx : idx,
            keyes: keyes
        });
    }

    const handleReplyCancel = () => {
        setReplyOn(replyOn.id = 0);
        replyInput.current.value = "";
    }

    const handleReplySave = () => {
        if(!replyInput.current.value){
            alert("Type the comment before posting");
            return;
        }
        const onLoadDate = new Date(window.localStorage.getItem("date"));
        const onLoadTime = onLoadDate.getTime();
        const nowTime = new Date().getTime();
        const minutesPassed = Math.ceil((nowTime - onLoadTime) / 60000);
        const newId = Math.floor(Math.random() * (99999 - 10000)) + 10000;
        const newReplyObj = {
            id: newId,
            name : username,
            replyTo : replyOn.name,
            image : "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            comment : replyInput.current.value,
            time : minutesPassed,
            likes: 0,
            dislikes: 0
        }
        const newObj = [...data];
        const repliesArray = newObj[replyOn.idx].reply;
        const newReplyArray = [...repliesArray, newReplyObj];
        newObj[replyOn.idx].reply = newReplyArray;
        save(newObj);
        handleReplyCancel();
    }
    
    const handleEdit = (commentId, idx, keyes) => {
        setEditOn({
            id : commentId,
            idx : idx,
            keyes: keyes
        });
    }

    const handleEditCancel = () => {
        setEditOn(editOn.id = 0);
    }

    const handleEditSave = () => {
        if(!editInput.current.value){
            alert("Type the comment before posting");
            return;
        }
        const onLoadDate = new Date(window.localStorage.getItem("date"));
        const onLoadTime = onLoadDate.getTime();
        const nowTime = new Date().getTime();
        const minutesPassed = Math.ceil((nowTime - onLoadTime) / 60000);
        if(editOn.keyes === undefined){
            const newObj = [...data];
            newObj[editOn.idx].comment = editInput.current.value;
            newObj[editOn.idx].time = minutesPassed;
            save(newObj);
            handleEditCancel();
            return;
        }
        const newObj = [...data];
        const newReplyArray = newObj[editOn.idx].reply;
        newReplyArray[editOn.keyes].comment =  editInput.current.value;
        newReplyArray[editOn.keyes].time =  minutesPassed;
        newObj[editOn.idx].reply = newReplyArray;
        save(newObj);
        handleEditCancel();
        return;
    }

    const handleDelete = (idx, keyes) => {
        if(keyes === undefined){
            const newObj = [...data];
            delete newObj[idx];
            save(newObj);
            return;
        }
        const newObj = [...data];
        delete newObj[idx].reply[keyes];
        save(newObj);
        return;
    }

    const CommentElement =({item, idx, keyes, marginIndex})=> {
        return(<div>
            <div className="each-comment">
                <img style={{marginLeft :`${marginIndex}rem`}} alt="logo" src={item.image} />
                {editOn.id === item.id ? 
                (<span className="edit-section">
                    <input required ref={editInput} type="text" className="edit"/>
                    <div>
                        <button onClick={handleEditCancel}>Cancel</button>
                        <button onClick={handleEditSave}>Save</button>
                    </div>
                </span>
                ) : (
                <span className="user-details">
                    <span className="user-name-time">
                        <span className="name">{item.name}</span>
                        <span className="time">{item.time > 60 ? `${Math.floor(item.time/60)} hours ago`: `${item.time} minutes ago`}</span>
                    </span>
                    <p>{item.replyTo && <span style={{fontWeight:"bold", display: "inline"}}>{item.replyTo +"@ "}</span>}{item.comment}</p>
                    <span className="new-functionality-section">
                        {item.likes}<ThumbUpIcon onClick={()=>handleLike(idx, keyes)}  className="thumb" />
                        {item.dislikes}<ThumbDownIcon onClick={()=>handleDislike(idx, keyes)} className="thumb" />
                        <button name={item.name} onClick={(event)=>handleReply(event, item.id, idx, keyes)}>Reply</button>
                    </span>
                    {item.name === username && <span className="action-buttons">
                        <EditIcon onClick={()=>handleEdit(item.id, idx, keyes)}/>
                        <DeleteIcon onClick={()=>handleDelete(idx, keyes)} />
                    </span>}
                </span>)}
            </div>
            {replyOn.id === item.id && 
                <div className="each-comment">
                    <img style={{marginLeft :`${marginIndex}rem`}} alt="logo" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
                    <span className="addReply">
                        <input required ref={replyInput}  type="text" />
                        <span style={{marginTop: "0.3rem"}}>
                            <button onClick={handleReplyCancel}>Cancel</button>
                            <button onClick={handleReplySave}>Save</button>
                        </span>
                    </span>
                </div>
                }
            {item.reply && item.reply.map((item, index) => <CommentElement key={index} idx={idx} item={item} keyes={index}  marginIndex={marginIndex ? marginIndex : 3}/>)}
        </div>
        )
    }

    return (
        <div className="comment-section">
            {data.map((item, index) => {
                return <CommentElement key={index}  item={item} idx={index} />
            })}
        </div>
    )
}

export default CommentSection;

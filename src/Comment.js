import { useState, useRef } from "react";
import "./Comment.css";
import dayjs from "dayjs";

function Comment() {
    // 必须要在dom渲染完成后 才能获取到input元素的引用，所以需要使用useRef来创建一个ref对象，并将其绑定到input元素上。
    const inputRef = useRef(null);
    const [idNumber, setIdNumber] = useState(1);
    const [commentList, setComment] = useState([
        {
            id: 99,
            content: "欢迎使用评论系统！",
            pubDate: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            likeCount: 0,
        }
    ]);

    const pubComment = (context) => {
        if (context.trim() === "") {
            alert("评论内容不能为空");
            return;
        }
        setIdNumber(prev => prev + 1);
        setComment(prev => [
            {
                id: idNumber,
                content: context,
                pubDate: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                likeCount: 0,
            },
            ...commentList,
        ]);
        inputRef.current.value = "";
        // 重新聚焦
        inputRef.current.focus();
    };

    const deleteComment = (id) => {
        setComment(prev => prev.filter(comment => comment.id !== id));
    };

    const sortByLikeCount = () => {
        const sortedList = [...commentList].sort((a, b) => b.likeCount - a.likeCount);
        setComment(sortedList);
    };

    const sortByPubDate = () => {
        const sortedList = [...commentList].sort((a, b) => b.pubDate - a.pubDate);
        setComment(sortedList);
    };

    return (
        <div className="main-wrapper">
            <Navigation 
                commentCount={commentList.length} 
                sortByLikeCount={sortByLikeCount} 
                sortByPubDate={sortByPubDate}
            />
            <hr className="divider"/>
            
            <div className="input-box">
                <input 
                    type="text" 
                    placeholder="请输入评论内容" 
                    ref={inputRef}
                    className="comment-input"
                />
                <button 
                    className="pub-btn"
                    onClick={() => pubComment(inputRef.current.value)}
                >
                    发表评论
                </button>
            </div>
            
            <hr className="divider"/>
            
            <ul className="comment-list">
                {commentList.map(comment => {
                    return (
                        <li key={comment.id} className="comment-item">
                            <p className="item-id">评论ID: {comment.id}</p>
                            <p className="item-content">{comment.content}</p>
                            <p className="item-date">{new Date(comment.pubDate).toLocaleString()}</p>
                            <p className="item-likes">点赞数: {comment.likeCount}</p>
                            <button 
                                className="del-btn"
                                onClick={() => deleteComment(comment.id)}
                            >
                                删除
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

const Navigation = (props) => {
    return (
        <div className="nav-container">
            <span className="commentCount">评论数量: {props.commentCount}</span>
            <div className="sort-box">
                <p className="likeCount" onClick={props.sortByLikeCount}>点赞排序</p>
                <p className="pubDate" onClick={props.sortByPubDate}>时间排序</p>
            </div>
        </div>
    );
}

export default Comment;

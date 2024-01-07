import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./Comment.scss"
import Comment from './Comment';
import CommentForm from './CommentForm';

const Comments = ({currentUser, productId}) => {
    const [comments, setComments] = useState([]);
    const [activeComment, setActiveComment] = useState(null)
    const rootComment = comments.filter((item) => item.com_parentid === null).sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

const getReplies = commentId => {
    return comments.filter((item) => item.com_parentid === commentId).sort((a, b) => 
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
}

const addComment = async (com_content, parentId) => {
    try {
        await axios.post("http://localhost:5000/api/comments", [
            currentUser?.user_id, com_content, parentId, currentUser?.username, productId,
        ]).then(comment => {            
            setComments([comment.data[0], ...comments]);
            setActiveComment(null);
        })
    } catch (error) {
        console.log(error)
    }
}

const deleteComment = async (commentId) => {
    try {
        if (window.confirm("Bạn có muốn xóa nhận xét này không?"))
            await axios.delete(`http://localhost:5000/api/comments/${commentId}`).then(() => {
                const updateComments = comments.filter((comment) => comment.com_id !== commentId);
                setComments(updateComments);
            });
    } catch (error) {
        console.log(error)
    }
}

const updateComment = async (text, commentId) => {
    try {
        await axios.put(`http://localhost:5000/api/comments/${commentId}`, [
            text, commentId,
        ]).then(() => {
            const updateComments = comments.map((comment) => {
                if (comment.com_id === commentId) {
                    return { ...comment, com_content: text }
                }
                return comment;
            });
            setComments(updateComments);
            setActiveComment(null);
        })
    } catch (error) {
        console.log(error)
    }
}

    useEffect(() => {
        const fetchComment = async () => {
            try {
                await axios.get(`http://localhost:5000/api/comments/${productId}`)          
                .then((res) => {
                    setComments(res.data);
                })
            } catch (error) {
                console.log(error)
            }
        }
        fetchComment();
    }, [productId]);    
    return (
        <div className='comments'>
            <div className="commentFormTitle">Viết nhận xét</div>
            <CommentForm submitLabel="Đăng" handleSubmit={addComment} currentUser={currentUser} />
            <hr />
            <div className='commentContainer'>
                {rootComment.map((item) => (
                    <Comment
                        key={item.com_id}
                        comment={item}
                        replies={getReplies(item.com_id)}
                        currentUser={currentUser}
                        deleteComment={deleteComment}
                        activeComment={activeComment}
                        setActiveComment={setActiveComment}
                        addComment={addComment}
                        updateComment={updateComment}
                        productId={productId}
                    />
                ))}
            </div>
        </div>
    );
}

export default Comments;
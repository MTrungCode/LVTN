import React from 'react';
import moment from "moment";
import CommentForm from './CommentForm';

const Comment = ({
    comment,
    replies,
    currentUser,
    deleteComment,
    activeComment,
    setActiveComment,
    addComment,
    updateComment,
    parentId = null,
    productId
}) => {
    const fiveminute = 300000;
    const timePassed = new Date() - new Date(comment.created_at) > fiveminute;
    const canReply = Boolean(currentUser?.user_id);
    const canEdit = currentUser?.user_id === comment.user_id && !timePassed;
    const canDelete = currentUser?.user_id === comment.user_id && replies.length === 0 && !timePassed;
    const isReplying = activeComment && activeComment.type === "replying" && activeComment.id === comment.com_id;
    const isEditing = activeComment && activeComment.type === "editing" && activeComment.id === comment.com_id;    
    return (
        <div className='comment'>
            <img className='commentImageContainer' src="/assets/ava1.jpg" alt="" />
            <div className="commentRightPart">
                <div className="commentContent">
                    <span className="commentAuthor">{comment.com_username}</span>
                    <span>{moment(comment.created_at).fromNow()}</span>
                </div>
                {!isEditing && <div className="commentText">{comment.com_content}</div>}
                {isEditing && (
                    <CommentForm
                        submitLabel="Update"
                        hasCancelButton
                        initialText={comment.com_content} 
                        handleSubmit={(text) => updateComment(text, comment.com_id)}
                        handleCancel={() => setActiveComment(null)}
                    />
                )}
                <div className="commnetAction">
                    <span className="commentActionitem">Thích</span>
                    {canReply && <span className="commentActionitem"
                        onClick={() => setActiveComment({
                            id: comment.com_id, type: "replying"
                        })}    
                    >Trả lời</span>}
                    {canEdit && <span className="commentActionitem"
                        onClick={() => setActiveComment({
                            id: comment.com_id, type: "editing"
                        })}
                    >Sửa</span>}
                    {canDelete && <span className="commentActionitem" onClick={()=>deleteComment(comment.com_id)}>Xóa</span>}
                </div>
                {isReplying && (
                    <CommentForm
                        submitLabel="Reply"
                        handleSubmit={(text) => addComment(text, parentId ? parentId : comment.com_id, productId)}
                    />
                )}
                {replies.length > 0 && (
                    <div className="replies">
                        {replies.map((reply) => (
                            <Comment
                                comment={reply}
                                key={reply.com_id}
                                replies={[]}
                                currentUser={currentUser}
                                deleteComment={deleteComment}
                                addComment={addComment}
                                parentId={comment.com_id}
                                updateComment={updateComment}
                                activeComment={activeComment}
                                setActiveComment={setActiveComment}
                                productId={productId}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Comment;
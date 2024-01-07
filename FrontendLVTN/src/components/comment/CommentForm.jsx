import React, { useState } from 'react';

const CommentForm = ({
    handleSubmit,
    submitLabel,
    currentUser,
    hasCancelButton = false,
    initialText = "",
    handleCancel
}) => {
    const [text, setText] = useState(initialText);
    const isDisable = currentUser === null;
      
const onSubmit = e => {
    e.preventDefault();
    handleSubmit(text);
    setText("");
}

    return (
        <form onSubmit={onSubmit}>
            <textarea
                className='commentFormTextarea'
                value={text}
                name="com_content"
                onChange={e=>setText(e.target.value)}
                cols="30"
                rows="10"
                placeholder='Hãy cho chúng tôi biết ý kiến của bạn'                           
            />
            <button className='commentFormButton'
                disabled={isDisable}
                style={text.length === 0 ? {backgroundColor: "gray"} : {backgroundColor: "darkcyan"}}
            >{submitLabel}</button>
            {hasCancelButton && <button className='commentFormCancelButton' onClick={handleCancel}>Cancel</button>}
        </form>
    );
}

export default CommentForm;
import React, { useState, useEffect } from 'react';
import './Comment.css'

const CommentSection = () => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [saveDetails, setSSaveDetails] = useState(false);

    useEffect(() => {
        const savedUsername = localStorage.getItem('username');
        const savedEmail = localStorage.getItem('email');

        if (savedUsername) setUsername(savedUsername);
        if (savedEmail) setEmail(savedEmail);
    }, [])
    const EmailChange = (e) => {
        setEmail(e.target.value);
    };

    const usernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleInputChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleAddComment = () => {
        if (newComment.trim() !== '') {
            setComments([...comments, { text: newComment, date: new Date() }]);
            setNewComment('');
            if (saveDetails) {
                localStorage.setItem('username', username);
                localStorage.setItem('email', email);
            } else {
                localStorage.removeItem('username');
                localStorage.removeItem('email');
            }
        }
    };

    return (
        <div className='comment-section'>
            <h2>Comments</h2>
            <div className='comment-input'>
            <input type='text' value={username} onChange={usernameChange} placeholder='Write a comment...' />
            <input type='email' value={email} onChange={EmailChange} placeholder='Write a comment...' />

                <textarea value={newComment} onChange={handleInputChange} placeholder='Write a comment...' />
                <button onClick={handleAddComment}>Add Comment</button>
            </div>
            <div className='comment-list'>
                {comments.map((comment, index) => (
                    <div key={index} className='comment'>
                        <p>{comment.text}</p>
                        <span>{comment.date.toLocaleString()}</span>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default CommentSection;
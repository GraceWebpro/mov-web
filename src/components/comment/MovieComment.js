import React, { useState, useEffect } from 'react';
import './Comment.css'
import { MdArrowForwardIos } from 'react-icons/md';
import { collection, addDoc, serverTimestamp, getDocs, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../config/Firebase';
import { query, orderBy, where, limit, startAfter } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const CommentSection = () => {
      const [lastVisible, setLastVisible] = useState(null);

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [saveDetails, setSaveDetails] = useState(false);
    const [replyingTo, setReplyingTo] = useState(null);
    const [reply, setReply] = useState('');
    const [showReplyForm, setShowReplyForm] = useState(null);

    useEffect(() => {
        if (saveDetails) {
            localStorage.setItem('username', username);
            localStorage.setItem('email', email);

        }
    }, [saveDetails, username, email]);

    useEffect(() => {

            const savedUsername = localStorage.getItem('username', username);
            const savedEmail = localStorage.getItem('email', email);
            if (savedUsername && savedEmail) {
                setUsername(savedUsername);
                setEmail(savedEmail);
                setSaveDetails(true);
            }
   
    }, [saveDetails, username, email]);


    useEffect(() => {
    const fetchMovies = async () => {
      try {
        const q = query(collection(db, 'comments'), orderBy('createdAt', 'desc'), limit(8));
        const querySnapshot = await getDocs(q);
        const moviesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(moviesList);
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      } catch (error) {
        console.error("Error fetching movies: ", error);
      }
    };

    fetchMovies();
  }, []);

    const EmailChange = (e) => {
        setEmail(e.target.value);
    };

    const usernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleInputChange = (e) => {
        setComment(e.target.value);
    };

    const handleReplyChange = (e) => {
        setReply(e.target.value);
    };


    const handleCheckboxChange = (e) => {
        setSaveDetails(e.target.checked);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newComment = {
            username,
            email,
            comment,
            replies: [],
            createdAt: serverTimestamp(),
        };

        try {
            const docRef = await addDoc(collection(db, 'comments'), newComment);
            setComments([...comments, { id: docRef.id, ...newComment }]);
        } catch (error) {
            console.error('Error adding comment: ', error);
        }

        setComment('');
    };

    const handleReplySubmit = async (e, commentId) => {
        e.preventDefault();

        const commentRef = doc(db, 'comments', commentId);

        try {

            await updateDoc(commentRef, {
                replies: arrayUnion({ username, email, reply }),
            });
            setComments(comments.map((c) => {
                if (c.id === commentId) {
                    return {
                        ...c,
                        replies: [...c.replies, { username,email, reply }],
                    };
                }

                return c;
            }));
        } catch (error) {
            console.error('Error adding comment: ', error);
        }

        setReply('');
        setReplyingTo(null);
        setShowReplyForm(null);

    };

    const handleCancelReply = () => {
        setReplyingTo(null);
        setReply('');
    };

    const handleReplyClick = (commentId) => {
        setReplyingTo(commentId);
    };



    return (
        <div className='comment-section'>
            <h4 style={{ color: 'black', opacity: '70%' }}><MdArrowForwardIos style={{ color: 'var(--first-color)'}}/>THIS MOVIE HAS {comments?.length || 0} COMMENT{comments?.length !== 1 ? 'S' : ''}</h4>
            
            <ul className='comment-list'>
                {comments.map((c) => (
                    <div key={c.id} className='comment'>
                        <p style={{ display: 'flex' }}>
                            <strong>{c.username}</strong><span style={{ color: '#000', opacity: '70%' }}>time</span>
                            <div>
                                <button onClick={() => handleReplyClick(c.id)} className='reply-btn'>REPLY</button>
                                {showReplyForm && replyingTo === c.id && (
                                    <div>
                                        <div style={{ display: 'flex' }}>
                                            <h3>Reply to {c.username}</h3>
                                            <button onClick={handleCancelReply} className='cancel-btn'>Cancel</button>

                                        </div>
                                        <textarea value={reply} onChange={handleReplyChange} placeholder='Your response here...' required />
                                        <input type='text' value={username} onChange={usernameChange} placeholder='Name (required)' />
                                        <input type='email' value={email} onChange={EmailChange} placeholder='Email (required)' />

                                        <button onClick={(event) => handleReplySubmit(event, c.id)}>Submit</button>

                                    </div>
                                )}
                            </div>
                        </p>
                        <p>{c.comment}</p>
                        {c.replies.length > 0 && (
                            <ul>
                                {c.replies.map((r, index) => (
                                    <li key={index}>
                                    <strong>{r.username}</strong>
                                    <p>{r.reply}</p>
                                </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </ul>
           {!showReplyForm && (
                <form className='comment-container' onSubmit={handleSubmit}>
                <input type='text' value={username} onChange={usernameChange} placeholder='Name (required)' />
                <input type='email' value={email} onChange={EmailChange} placeholder='Email (required)' />

                <textarea value={comment} onChange={handleInputChange} placeholder='Write a comment...' />
                <label className='custom-checkbox'>
                    <input type='checkbox' checked={saveDetails} onChange={handleCheckboxChange} className='checkbox' />
                    <span className='checkmark'></span>
                    Save my details for next time
                </label>
                <button type='submit'>Add Comment</button>
            </form>
           )}
            
        </div>
    )
};

export default CommentSection;
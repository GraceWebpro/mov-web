import React, { useState, useEffect } from 'react';
import './Comment.css'
import { MdArrowForwardIos } from 'react-icons/md';
import { collection, onSnapshot, Timestamp, addDoc, serverTimestamp, getDocs, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../config/Firebase';
import { query, orderBy, where, limit, startAfter } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';


const CommentSection = ({ movieId }) => {
      const [lastComment, setLastComment] = useState(null);
      const [totalComments, setTotalComments] = useState(0);
        const [loadingMore, setLoadingMore] = useState(false)
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [saveDetails, setSaveDetails] = useState(false);
    const [replyingTo, setReplyingTo] = useState(null);
    const [reply, setReply] = useState('');
    const [showReplyForm, setShowReplyForm] = useState(null);

    const COMMENTS_LIMIT = 5;

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
        const q = query(collection(db, 'comments'), where('id', '==', movieId), orderBy('createdAt', 'desc'), limit(COMMENTS_LIMIT));
        const querySnapshot = await getDocs(q);
        const moviesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || null,

        }));
        setComments(moviesList);
        setLastComment(querySnapshot.docs[querySnapshot.docs.length - 1]);
      
        const allComments = await getDocs(collection(db, 'comments'));
        setTotalComments(allComments.size);
      
      } catch (error) {
        console.error("Error fetching movies: ", error);
      }
    };

    if (movieId) {
        fetchMovies();
    }
  }, [movieId]);

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
        };

        try {
            const docRef = await addDoc(collection(db, 'comments'), newComment);
            
            setComments([...comments, { id: docRef.id, ...newComment, createdAt: serverTimestamp()  }]);

            const moviesSnapshot = await getDocs(collection(db, comments));
            const movieList = moviesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate() || null,

            }));
            setComments(movieList);
        } catch (error) {
            console.error('Error adding comment: ', error);
        }

        setComment('');
    };

    const loadMore = async () => {
        if (lastComment) {
        setLoadingMore(true);
            const commentRef = collection(db, 'comments');

      const q = query(commentRef, orderBy('createdAt', 'desc'), startAfter(lastComment), limit(COMMENTS_LIMIT));
      
      const querySnapshot = await getDocs(q);
      const moreMovies = querySnapshot.docs.map((doc) => ({
            id: doc.id, ...doc.data() })
        );

      setComments(prevComments => [...prevComments, ...moreMovies]);
      
      setLastComment(querySnapshot.docs[querySnapshot.docs.length - 1]);
                  setLoadingMore(false);

    }
       
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
            <h4 style={{ color: 'black', opacity: '70%', marginBottom: '20px' }}><IoIosArrowForward style={{ color: 'var(--first-color)'}}/>THIS MOVIE HAS {totalComments} COMMENT{comments?.length !== 1 ? 'S' : ''}</h4>
            
            <ul className='comment-list'>
                {comments.length > 0 ? (
                    comments.map((c) => (
                    <div key={c.id} className='comment'>
                        <p style={{ display: 'flex' }}>
                            <strong>{c.username}</strong>
                           
                        </p>
                        <p>{c.comment}</p>
                        <span style={{ color: '#000', opacity: '70%', marginTop: '20px' }}>{c.createdAt ? c.createdAt.toLocaleString() : 'No Date'}</span>
                        
                    </div>
                ))
                ) : (
                    <p>No comments yet</p>
                )}

                {comments.length < totalComments && (
                    <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', marginTop: '30px' }}>
                    <button onClick={loadMore} disabled={loadingMore}>
                        {loadingMore ? 'Loading...' : 'Load More Comments'}
                    </button>
                    </div>
                )}
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
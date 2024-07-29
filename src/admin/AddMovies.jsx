import React, { useState } from 'react'
import { addDoc } from 'firebase/firestore'
import { movieCollectionRef } from '../config/Firestore-collections'
import { storage } from '../config/Firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"


export default function AddMovies() {

    const [title, setName] = useState('')
    const [image, setImage] = useState('')
    const [percent, setPercent] = useState(0);
    
    function handleSubmit(e) {
    
        
        e.preventDefault()
        if(title === ''){
            return
        }
        //const moviesCollRef = collection(db, 'movies')
        addDoc(movieCollectionRef, {title},{image}).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error.message)
            alert('Data cant be addede')
        })
        alert('Data is successfully added!')
    }

    function handleUpload() {
        if (!image) {
            alert("Please upload an image first!");
        }
 
        const storageRef = ref(storage, `/files/${image.name}`)
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
    
                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                });
            }
        ); 
    }



  return (
    <div>
        <h4>AddMovie</h4>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Movie Name</label>
            <input 
            id="name" 
            type='text'
            value={title} 
            onChange={e => setName(e.target.value)} 
            /><br />
            <label htmlFor="image">Movie Image</label>
            <input 
            id="image" 
            type='file'
            value={image} 
            onChange={e => setImage(e.target.value)}
            accept="/image/*" 
            />
            <button type='submit' onClick={handleUpload}>Add movie</button>
            <p>{percent} "% done"</p>
        </form>
    </div>
  )
}

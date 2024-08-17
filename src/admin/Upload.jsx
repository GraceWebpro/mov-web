import React, { useState } from 'react'
import { updateDoc, doc } from "@firebase/firestore";
import { db } from '../../config/firebase'


const UpdateVideo = () => {
    const [url, setUrl] = useState('')


    const updateVideo = async (e) => {
        e.preventDefault()
        if ( url === '' ){
            return
        }

        const docRef = doc(db, 'video', 'amLI7lEUulcjXM8Tddbz')
        updateDoc(docRef, {url})
        .then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error.message)
            alert('video cant be saved')
        })
        alert('Video is saved successfully!')
    };

    

    

    return (
        <div>
            <center>
            <div className='video-container2'>
                
              <h2>Update Video</h2>

              <form onSubmit={updateVideo}>
                <input className='url' type='url' name='homepage' placeholder='Video url' value={url} onChange={e => setUrl(e.target.value)}  />
                
                <input className='submit' type='submit' value='update' />
              </form>
            </div>
            </center>
        </div>
    )
}

export default UpdateVideo;

import React, { useState } from 'react';
import { getDocs, doc, deleteDoc, query, where } from 'firebase/firestore'
import { movieCollectionRef } from '../../config/Firestore-collections'

const SearchBar = ({ onSearch }) => {

    const [query, setQuery] = useState("")
    
    function handleSearch(e){
        e.preventDefault()
        onSearch(query) 
    };

    return (
        <form onSubmit={handleSearch}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search movies..."
            />    
            <button type="submit" className="bg-white p-4">🔍</button>
        </form>
       
    );
};

export default SearchBar;
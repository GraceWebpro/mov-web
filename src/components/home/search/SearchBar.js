
import React, { useState } from 'react';
import './Search.css';

const SearchBar = ({ onSearch }) => {

    const [query, setQuery] = useState("")
    
    function handleSearch(e){
        e.preventDefault()
        onSearch(query) 
    };

    return (
        <form onSubmit={handleSearch} className="search-bar">
            <input className="search-input" style={{ width: "100%",
                padding: "10px",
                marginLeft: '10px',
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontSize: "14px",
                }}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search here..."
            />    
            <button type="submit" className="search-btn">🔍</button>
        </form>
       
    );
};

export default SearchBar;
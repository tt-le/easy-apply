import React, {useState} from 'react';
import './SearchBar.css';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import api from "../../api"; 

function SearchBar({placeholder, data}){
    const [filteredData, setFilteredData] = useState([]); 
    const [wordEntered, setWordEntered] = useState(""); 

    const handleFilter = async(event) => {
        const searchWord = event.target.value
        setWordEntered(searchWord);
        const dict = await api.get("/jobs/search/"+searchWord);
        const data = dict['jobs']; 
        // for (var i = 0; i<data.length; i++) {
        //     return data[i].title.toLowerCase().includes(searchWord.toLowerCase()); 
        // }; 

        const newFilter = data.filter((value) => {
            return value.title.toLowerCase().includes(searchWord.toLowerCase()); 
        }); 

        setFilteredData(newFilter); 
    }; 

    const clearInput = () => {
        setFilteredData = ([]); 
        setWordEntered = (""); 
    }

    return (
        <div className="search">
            <div className="searchInputs">
                <input type="text" placeholder={placeholder}  value={wordEntered} onChange={handleFilter} />
                <div className="searchIcon">
                    {filteredData.length === 0 ? (
                    <SearchIcon /> 
                    ) : (
                    <ClearIcon id="clearBtn" onClick={clearInput}/>) }
                </div>
            </div>
            
            {filteredData.length != 0 && (
            <div className="dataResult">
                </div> 
            )}
            </div>
    )

}

export default SearchBar
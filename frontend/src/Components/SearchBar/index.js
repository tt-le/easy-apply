
import React, {useState, useEffect} from 'react';
import './SearchBar.css';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import api from "../../api"; 

function SearchBar({placeholder, data}){
    const [filteredData, setFilteredData] = useState([]); 

    const [unfilteredData, setUnfilteredData] = useState([]); // CREATING A CONSTANT UNFILTERED DATA
    const [wordEntered, setWordEntered] = useState(""); 
    
    const beforeAll = async () => {
        const dict2 = await api.get("/jobs/get"); //GET CALL TO GET ALL JOBS
        const myData2 = dict2['data']['jobs']; //SETTING VARIABLE TO MYDATA2
        setUnfilteredData(myData2); 

        //console.log(dict2);
       // console.log(myData2);
    };

    useEffect(() => {  
        {beforeAll()}

       });
       


    const handleFilter = async(event) => {
        const searchWord = event.target.value 
        setWordEntered(searchWord);
        
        const dict = await api.get("/jobs/search/"+searchWord);
        const myData = dict['data']['jobs']; 
        setFilteredData(myData); 

        const newFilter = myData.filter((value) => {
            return value.jobName.toLowerCase().includes(searchWord.toLowerCase()) || value.companyName.toLowerCase().includes(searchWord.toLowerCase()); 
        });

        if (searchWord === "") {
            setFilteredData([]); 
            //setUnfilteredData(myData2); //IF SEARCH WORD IS EMPTY SET UNFILTERED DATA TO MYDATA2
        }
        else {
            setFilteredData(newFilter); 
            //setUnfilteredData(myData2);
        }

        //console.log(filteredData); 
    }; 

    const clearInput = () => {
        //setUnfilteredData(myData2);
        setFilteredData([]); 
        setWordEntered(""); 
    }
    return (
        <div className="app-container">
            <div className="search" onBeforeInput={beforeAll}>
                <div className="searchInputs">
                    <input type="text" placeholder="Search for Jobs"  value={wordEntered} onChange={handleFilter} />

                    <div className="searchIcon">
                        {filteredData.length === 0 ? (
                        <SearchIcon /> 
                        ) : (
                        <ClearIcon id="clearBtn" onClick={clearInput}/>) }
                    </div>
                </div>
                
                {filteredData.length != 0 && (
                <div className="dataResult">
                    {filteredData.slice(0, 15).map((value, key) => {
                        return <a className="dataItem"> 
                        <p> {value.jobName} at {value.companyName} </p>
                        </a>
                    })}
                    </div> 
                )}

                </div>
                
                <table>
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Position Name</th>
                        <th>Job Description</th>
                        <th>Location</th>
                    </tr>
                </thead>

                {filteredData.length === 0 ? ( //IF STATEMENT
                    <tbody>
                    {unfilteredData.map((info) => (
                        <tr>
                        <td>{info.companyName}</td>
                        <td>{info.jobName}</td>
                        <td>{info.introduction}</td>
                        <td>{info.location}</td>
                    </tr>
                    ))}

                </tbody>
                 ) : (

                <tbody>
                    {filteredData.map((info) => (
                        <tr>
                        <td>{info.companyName}</td>
                        <td>{info.jobName}</td>
                        <td>{info.introduction}</td>
                        <td>{info.location}</td>
                    </tr>
                    ))}
                    
                </tbody>
                )}
            </table>


        </div>
    )

}

export default SearchBar
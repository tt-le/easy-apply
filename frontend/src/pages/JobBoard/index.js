import { useState } from 'react';
import api from '../../api';
import "./JobBoard.css";
import DataTable from '../../Components/SearchBar';
//import data from "./mock_data.json";
import SearchBar from '../../Components/SearchBar';
//import handleFilter from SearchBar; 
import "../../Components/SearchBar/SearchBar.css";

function JobBoard () {
    return (
        <div className="Jobs">
            <DataTable/> 
        </div>
    );
    
}
export default JobBoard;
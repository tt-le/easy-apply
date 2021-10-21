import { useState } from 'react';
import api from '../../api';
import "./JobBoard.css";
//import data from "./mock_data.json";
import SearchBar from '../../Components/SearchBar';
//import handleFilter from SearchBar; 
import "../../Components/SearchBar/SearchBar.css";

function JobBoard () {
    //const [boardinfo, setBoardinfo] = useState(data);
    return (
        <div className="app-container">
           <SearchBar placeholder="Enter the Job Description..."/>
            <table>
                <thead>
                    <tr>
                        <th>Hi</th>
                        <th>Position Name</th>
                        <th>Job Description</th>
                        <th>Date Posted</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {boardinfo.map((info) => (
                        <tr>
                        <td>{info.Company}</td>
                        <td>{info.PositionName}</td>
                        <td>{info.Jobdescription}</td>
                        <td>{info.DatePosted}</td>
                    </tr>
                    ))}
                     */}
                </tbody>
            </table>
        </div>
    );
}
export default JobBoard;
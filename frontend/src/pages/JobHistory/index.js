import { useState } from 'react';
import api from '../../api';
import "./JobHistory.css"
import data from "./mock_data.json"

function JobHistory () {
    const [boardinfo, setBoardinfo] = useState(data);
    return (
        <div className="app-container">
            <h1 class="font-weight-bold"> 
                Applied Job History
            </h1>
            <table>
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Job Name</th>
                        <th>Job ID</th>
                        <th>Location</th>
                        <th>Job Description</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {boardinfo.map((info) => (
                        <tr>
                        <td>{info.Company}</td>
                        <td>{info.PositionName}</td>
                        <td>{info.JobID}</td>
                        <td>{info.Location}</td>
                        <td>{info.Jobdescription}</td>
                        
                    </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>
    );
}
export default JobHistory;
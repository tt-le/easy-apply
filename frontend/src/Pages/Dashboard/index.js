import React from "react";
import navBar from "../../Components/NavBar"
import Button from '@mui/material/Button';
import data from "./mock_data.json"


function DashBoard(){
    const [tableInfo, setTableInfo] = useState(data);
    return (<div id="root">
        <navBar></navBar>
        <div id = "dashboard_header">
            <h2>Welcome, placeholder</h2>
        </div>
        <div id = "dashboard_body">
            <h3>view your recent jobs</h3>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>position name</th>
                        <th>company</th>
                        <th>status</th>
                    </tr>
                </thead>
                <tbody>
                    {tableInfo.format_map((data) => (
                        <tr>
                        <td>{data.id}</td>
                        <td>{data.position_name}</td>
                        <td>{data.company}</td>
                        <td><Button>view status</Button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    )
};

export default DashBoard
import {useState} from "react";
import navBar from "../../Components/NavBar"
import api from "../../api";
import Button from '@mui/material/Button';
import data from "./mock_data.json"
import "./dashboard.css";
import { useState } from "react";


function DashBoard(){
    const [tableInfo, setTableInfo] = useState(data);
    return (
        <div id="root">
            <div id="navBar">
                <NavBar/>
            </div>
            <div id ="dashboard_header">
                <h2 id="dashboardBanner">Welcome, placeholder</h2>
            </div>
            <div id = "dashboard_body">
                <h3 id="dashboardStatus">view your recent jobs</h3>
                <table id = "table">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>position name</th>
                            <th>company</th>
                            <th>status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {tableInfo.map((data) => (
                        <tr>
                        <td>{data.id}</td>
                        <td>{data.position_name}</td>
                        <td>{data.company}</td>
                        <td><Button id = "button">view status</Button></td>
                        </tr>
                    ))}                   
                    </tbody>
                </table>
            </div>
            <div id="postJobButton">
                <Button id = "button">post job</Button>
            </div>
        </div>
    )
};

export default DashBoard
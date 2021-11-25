import {useEffect, useState} from "react";
import NavBar from "../../Components/NavBar"
import api from "../../api";
import Button from '@mui/material/Button';
import data from "./mock_data.json"
import "./dashboard.css";
import {useHistory} from "react-router-dom"

function DashBoard(){
    const [tableInfo, setTableInfo] = useState(data);
    const history = useHistory();

    const handleClick = () => {
        let path = "/postJob";
        history.push(path);
    }

    const applicantCheck = () => {
        let path = "/jobHistory";
        history.push(path);
    }

    useEffect(() => {
        api.get("/jobs/checkEmployer").then((resp) => {
            if(resp.status != 200) {
                history.push("/login")
            }
        }).catch((err) => {
            history.push("/login")
        });

        api.get("/jobs/getJobs").then((resp) => {
            setTableInfo(resp["data"]["jobs"])
        });
    }, []);

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
                            <th>position name</th>
                            <th>company</th>
                            <th>status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {tableInfo.map((data) => (
                        <tr>
                        <td>{data.jobName}</td>
                        <td>{data.companyName}</td>
                        <td><Button id = "button" onClick={applicantCheck}>view status</Button></td>
                        </tr>
                    ))}                   
                    </tbody>
                </table>
            </div>
            <div id="postJobButton">
                <Button id = "button" onClick={handleClick}>post a new job</Button>
            </div>
        </div>
    )
};

export default DashBoard
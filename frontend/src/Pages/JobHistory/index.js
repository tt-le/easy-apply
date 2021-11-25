import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom'
import { Table, Form} from "antd"; 
import Paper from '@mui/material/Paper';
import api from "../../api"; 
import "./Jobhistory.css"
import ViewButton from '../../Components/ViewButton';

// For applicants, display job history(like a job board without apply button).
const ApplicantTable = () => {
    const [gridData, setGridData] = useState([]); 
    const [loading, setLoading] = useState(false); 
    const [form] = Form.useForm(); 
    let[filteredData] = useState(); 

    useEffect(() => {
        loadData();
    }, [])

    const loadData = async() => {
        setLoading(true); 
        const response = await api.get("/jobs/get");
        const myData2 = response['data']['jobs'];
        setGridData(myData2); 
        setLoading(false); 
    }

    const columns = [{ 
        title: "ID",
        dataIndex: "jobID",
    }, 
    {
        title: "Job Name", 
        dataIndex: "jobName", 
        align: "center",
        editable: true,
    }, 

    {
        title: "Company Name", 
        dataIndex: "companyName", 
        align: "center",
        editable: true,

    }, 
    {
        title: "Location", 
        dataIndex: "location", 
        align: "center",
    },   
]; 

const mock_applied = [
    {
        jobID: 203,
        jobName: "frontend developer",
        companyName: "Meta",
        location: "California",
        introduction:"Meta offers other products and services, including Facebook, Messenger, Facebook Watch, and Facebook Portal."
    }
]
 
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden',backgroundColor: '#FFFFFF', height: "100vh" }}>
            <h1>History of applied jobs</h1>
            <Form form={form}>
                <Table 
                columns={columns}
                expandable = {{
                    expandedRowRender: (record) => (
                        <p style={{margin: 0}}>
                            {record.introduction}
                        </p>
                    ),
                    rowExpandable: (record) => record.introduction !== "Not Expandable",

                }}
                // dataSource={filteredData && filteredData.length ? filteredData : gridData}
                dataSource = {mock_applied}
                bordered
                loading={loading}
                pagination
                />
            </Form>
        </Paper>

    ); 
}; 

// For employers, display the jobs that he posted, each with a shortlist of applicants.
const EmployerTable = () => {

    const columns = [
    {
        title: "Job Name", 
        dataIndex: "jobName", 
        align: "center",
        editable: true,
    }, 

    {
        title: "Company Name", 
        dataIndex: "companyName", 
        align: "center",
        editable: true,

    }, 
    {
        title: "Location", 
        dataIndex: "location", 
        align: "center",
    },   
]; 
    //TODO: get rid of the mock data
    const [post, setPost] = useState([]);

    useEffect(() => {
        api.get("/jobs/getJobs").then(resp => {
            setPost(resp["data"]["jobs"]);
        });
    }, []);

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden',backgroundColor: '#2b2b2b', height: "100vh" }}>
            <h1 className="header">History of posted jobs</h1>
            <Table
            className="Table"
            columns={columns}
            expandable = {{
                expandedRowRender: (record) => {
                    var order = [(<p>All Applicants</p>),];
                    for(const app in record.applicants) {
                        var custom = "";
                        var profile = "";

                        var resume = <ViewButton subtext="" text="Resume" userId={record.applicants[app].userId} jobId={record.jobID}/>

                        if(record.applicants[app].custom) {
                            custom = <ViewButton subtext="Custom" text="Pitch" userId={record.applicants[app].userId} jobId={record.jobID}/>
                        }

                        if(record.applicants[app].profile) {
                            profile = <ViewButton subtext="Profile" text="Pitch" userId={record.applicants[app].userId}/>
                        }

                        order.push(<div>{record.applicants[app].Name} {resume} {profile} {custom}</div>)
                    }

                    order.push(<p>Top Applicants</p>)

                    for(const app in record.topApplicants) {
                        var resume = <ViewButton subtext="" text="Resume" userId={record.applicants[app].userId} jobId={record.jobID}/>
                        var custom = <ViewButton subtext="Custom" text="Pitch" userId={record.applicants[app].userId} jobId={record.jobID}/>

                        order.push(<div>{record.topApplicants[app].Name} {resume} {custom}</div>)
                    }

                    return order
                },
                //TODO: this condition may need to change for edge cases(like there's no 10 applicants)
                rowExpandable: (record) => record.description !== "Not Expandable",

            }}
            dataSource={post}
            bordered
            pagination
            />
        </Paper>
    ); 
}; 

//TODO: need a way to check if user is applicant or employer(by using auth or sth?) and store it in state
function HistoryControl(props) {
    const isEmployer = true;
    let table;

    if (isEmployer) {
        table = <EmployerTable/>
    } else {
        table = <ApplicantTable/>
    }

    return (
        <div>
            {table}
        </div>
    )
}

export default HistoryControl;
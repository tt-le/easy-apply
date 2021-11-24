import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom'
import { Table, Form} from "antd"; 
import Paper from '@mui/material/Paper';
import api from "../../api"; 
import "./Jobhistory.css"

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
    //TODO: get rid of the mock data
    const mock_post = [
        {
            jobID: 2,
            jobName: "Backend developer",
            companyName: "Apple",
            location: "California",
            shortlist: [
                {
                    name: 'John Brown',
                    age: 42,
                    address: 'New York No. 2 Lake Park',
                },
                {
                    name: 'Steve Jobs',
                    age: 42,
                    address: 'New York No. 2 Lake Park',
                },
                {
                    name: 'Rachel Green',
                    age: 42,
                    address: 'New York No. 2 Lake Park',
                },
                {
                    name: 'Monica Geller',
                    age: 42,
                    address: 'New York No. 2 Lake Park',
                },
                {
                    name: 'Phoebe Buffay',
                    age: 42,
                    address: 'New York No. 2 Lake Park',
                },
                {
                    name: 'Joey Tribbiani',
                    age: 42,
                    address: 'New York No. 2 Lake Park',
                },
                {
                    name: 'Chandler Bing',
                    age: 42,
                    address: 'New York No. 2 Lake Park',
                },
                {
                    name: 'Ross Geller',
                    age: 42,
                    address: 'New York No. 2 Lake Park',
                },
                {
                    name: 'Janice',
                    age: 42,
                    address: 'New York No. 2 Lake Park',
                },
                {
                    name: 'Gunther',
                    age: 42,
                    address: 'New York No. 2 Lake Park',
                }
            ]
        }
    ]

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden',backgroundColor: '#2b2b2b', height: "100vh" }}>
            <h1 className="header">History of posted jobs</h1>
            <Table
            className="Table"
            columns={columns}
            expandable = {{
                expandedRowRender: (record) => (
                    <p style={{margin: 0}}>
                        {record.shortlist[0].name},
                        {record.shortlist[1].name},
                        {record.shortlist[2].name},
                        {record.shortlist[3].name},
                        {record.shortlist[4].name},
                        {record.shortlist[5].name},
                        {record.shortlist[6].name},
                        {record.shortlist[7].name},
                        {record.shortlist[8].name},
                        {record.shortlist[9].name}
                    </p>
                ),
                //TODO: this condition may need to change for edge cases(like there's no 10 applicants)
                rowExpandable: (record) => record.description !== "Not Expandable",

            }}
            dataSource={mock_post}
            bordered
            pagination
            />
        </Paper>
    ); 
}; 

//TODO: need a way to check if user is applicant or employer(by using auth or sth?) and store it in state
export default class HistoryControl extends React.Component {
    constructor(props) {
      super(props);
      this.state = {isEmployer: true};
    }

    render() {
      const isEmployer = this.state.isEmployer;
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
}

ReactDOM.render(
<HistoryControl />,
document.getElementById('root')
);
import React, {useState, useEffect} from 'react';
import axios from "axios"; 
import { Table, Popconfirm, Button, Space, Form, Input} from "antd"; 
import {isEmpty} from "lodash";
import { useHistory } from "react-router-dom";

import { render } from 'react-dom';
import { slideDown, slideUp } from './anim';
import './SearchBar.css';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import api from "../../api"; 
import PopUp from "../PopUp"; 
import { useTheme } from '@emotion/react';

// import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
// import Box from '@material-ui/core/Box';
// import Collapse from '@material-ui/core/Collapse';
// import IconButton from '@material-ui/core/IconButton';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
// import Container from '@material-ui/core/Container';
// const useRowStyles = makeStyles({
//   root: {
//     '& > *': {
//       borderBottom: 'unset',
//     },
//   },
// });

// const [gridData, setGridData] = useState([]); 
// const [loading, setLoading] = useState(false); 
// const [searchText, setSearchText] = useState(""); 
// const [form] = Form.useForm(); 
// const [applyRow, setApply] = useState(false); 
// let[filteredData] = useState(); 

// useEffect(() => {
//     loadData();
// }, [])

// const loadData = async() => {
//     setLoading(true); 
//     const response = await api.get("/jobs/get");
//     const myData2 = response['data']['jobs'];
//     setGridData(myData2); 
//     setLoading(false); 
// }; 

// const handleSearch = (e) => { 
//     setSearchText(e.target.value); 
//     if (e.target.value === ""){
//         loadData(); 
//     }
// };
// const globalSearch = () => {
//     filteredData = gridData.filter((value) => {
//         return (
//             value.jobName.toLowerCase().includes(searchText.toLowerCase()) || 
//             value.companyName.toLowerCase().includes(searchText.toLowerCase()) || 
//             value.location.toLowerCase().includes(searchText.toLowerCase()) || 
//             value.introduction.toLowerCase().includes(searchText.toLowerCase()) 
//         );
//     });
//     setGridData(filteredData); 
// }; 

// function Row(props) {
//   const { row } = props;
//   const [open, setOpen] = React.useState(false);
//   const classes = useRowStyles();
//   return (
//     <React.Fragment>
//       <TableRow className={classes.root}>
//         <TableCell>
//           <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
//             {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//           </IconButton>
//         </TableCell>
//         <TableCell component="th" scope="row">
//           {row.name}
//         </TableCell>
//         <TableCell align="right">{row.jobName}</TableCell>
//         <TableCell align="right">{row.companyName}</TableCell>
//         <TableCell align="right">{row.location}</TableCell>
//         <TableCell align="right">{row.introduction}</TableCell>
//       </TableRow>
//       <TableRow>
//         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//           <Collapse in={open} timeout="auto" unmountOnExit>
//             <Box margin={1}>
//               <Typography variant="h6" gutterBottom component="div">
//                 History
//               </Typography>
//               <Table size="small" aria-label="purchases">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Date</TableCell>
//                     <TableCell>Customer</TableCell>
//                     <TableCell align="right">Amount</TableCell>
//                     <TableCell align="right">Total price ($)</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {row.history.map((historyRow) => (
//                     <TableRow key={historyRow.companyName}>
//                       <TableCell component="th" scope="row">
//                         {historyRow.date}
//                       </TableCell>
//                       <TableCell>{historyRow.customerId}</TableCell>
//                       <TableCell align="right">{historyRow.amount}</TableCell>
//                       <TableCell align="right">
//                         {Math.round(historyRow.amount * row.price * 100) / 100}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </Box>
//           </Collapse>
//         </TableCell>
//       </TableRow>
//     </React.Fragment>
//   );
// }
// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };
// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
//   createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
//   createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
//   createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
// ];
// export default function CollapsibleTable() {
//   return (
    
//       <TableContainer component={Paper}>
//         <Table aria-label="collapsible table">
//           <TableHead>
//             <TableRow>
//               <TableCell />
//               <TableCell>Dessert (100g serving)</TableCell>
//               <TableCell align="right">Calories</TableCell>
//               <TableCell align="right">Fat (g)</TableCell>
//               <TableCell align="right">Carbs (g)</TableCell>
//               <TableCell align="right">Protein (g)</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.map((row) => (
//               <Row key={row.name} row={row} />
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
     
//   );
// }

const DataTable = () => {
    const [gridData, setGridData] = useState([]); 
    const [loading, setLoading] = useState(false); 
    const [searchText, setSearchText] = useState(""); 
    const [form] = Form.useForm(); 
    const history = useHistory();
    const [applyRow, setApply] = useState(false); 
    const navigateTo = (jobId) => history.push('/apply'+jobId);//eg.history.push('/login');
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

    }; 

    const handleApply = () => {


    }; 
 
   // console.log("gridData", gridData); 

    const columns = [{ 
        title: "ID",
        dataIndex: "employerID",
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
    {
        title: "Apply", 
        //dataIndex: "location", 
        align: "center",
        render: (_, record) => {
            return gridData.length >= 1 ? (
                <Space> 
                    <Button type="primary" onClick={navigateTo}> Apply </Button>
                </Space>
        ): null;
    },
},    
]; 


const handleSearch = (e) => { 
    setSearchText(e.target.value); 
    if (e.target.value === ""){
        loadData(); 
    }
};
const globalSearch = () => {
    filteredData = gridData.filter((value) => {
        return (
            value.jobName.toLowerCase().includes(searchText.toLowerCase()) || 
            value.companyName.toLowerCase().includes(searchText.toLowerCase()) || 
            value.location.toLowerCase().includes(searchText.toLowerCase()) || 
            value.introduction.toLowerCase().includes(searchText.toLowerCase()) 
        );
    });
    setGridData(filteredData); 
}; 

// const modifiedData = gridData.map(({body,...item}) => ({

//     ...item, 
//     key: item.id, 
//     comment: isEmpty(introduction) ? item.comment: introduction, 

// }));

const clearAll = () =>{
    setSearchText("");
}
 
    return (
        <div>
            <Space style={{marginBottom: 16}}>
            <Input 
                placeholder="Search for Jobs"
                onChange={handleSearch}
                type="text"
                allowClear
                value= {searchText}
            />
                <Button type="primary" onClick={globalSearch}>Search</Button>
                <Button onClick={clearAll}>Clear All</Button>            
            </Space>
            <Form form={form}>
                <Table 
                columns={columns}
                expandable = {{
                    expandedRowRender: (record) => (
                        <p style={{margin: 0}}>{record.introduction}</p>
                    ),
                    rowExpandable: (record) => record.introduction !== "Not Expandable",

                }}
                dataSource={filteredData && filteredData.length ? filteredData : gridData}
                bordered
                loading={loading}
                pagination
                />
            </Form>
        </div>
    ); 
}; 
 
export default DataTable

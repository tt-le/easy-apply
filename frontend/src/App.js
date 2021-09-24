import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import api from './api';

function App() {
  const [rows, updateRows] = useState(null);
  const clickHandler = async () => {
    updateRows((await api.get('/get')).data.table.map(entry =><tr>{entry}</tr>))
  };

  return (
    <div className="App">
        <button onClick={clickHandler} > click me to see the table! </button>
        <form onSubmit={(e)=>{api.post(`/create/${e.target.elements.name.value}`); console.log(e.target.elements.name.value);}}> 
        <input type="text" name="name"/>
        <input type="submit" value="submit"/>
        </form>
        <div className="table">
          {rows && (<table>{rows}</table>) }
        </div>
    </div>
  );
}

export default App;

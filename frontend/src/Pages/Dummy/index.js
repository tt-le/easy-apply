import { useState } from 'react';
import api from '../../api';
function Dummy() {
    const [rows, updateRows] = useState(null);

    const clickHandler = async () => {
        let table = (await api.get('/get')).data.table.map(entry =><tr>{entry}</tr>)
        updateRows(table)
    };
    
    return (
      <div>
          <button onClick={clickHandler} > click me to see the table! </button>
          <form onSubmit={(e)=>{api.post(`/create/${e.target.elements.name.value}`); console.log(e.target.elements.name.value);}}> 
          <input type="text" name="name"/>
          <input type="submit" value="submit"/>
          </form>
          <div>
            {rows && (<table>{rows}</table>) }
          </div>
      </div>
    );
    }

export default Dummy;
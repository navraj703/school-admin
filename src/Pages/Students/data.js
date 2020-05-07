import React ,{ useEffect ,useState } from 'react';
import MaterialTable from 'material-table';
import { db } from '../../firebase'
export default function Data() {
 
  const  [rows,setRow] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await db.collection("Students").get();
      setRow(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    };
    fetchData();
  }, []);
  const [state, setState] = React.useState({
    
    columns: [
      { title: 'Id', field: 'id' },
      { title: 'Name', field: 'name' },
      { title: 'FatherName', field: 'fatherName' },
      { title: 'MotherName', field: 'motherName',  },
      { title: 'Gender', field: 'gender'  },
      { title: 'Category', field: 'category'  },
      { title: 'Adhaar', field: 'adhaar',  },
  
      { title: 'Account No', field: 'account'  },
      { title: 'IFSC', field: 'ifsc'  },
      { title: 'Family Income', field: 'income'  },

    ],
    // data:  rows ],
  });
  console.log(state.data);
  console.log(rows) ;
  return (
    <MaterialTable
      title="Students"
      options={{
          sorting: true
        }}
      columns={state.columns}
      style={{paddingLeft:"10px"}}
      data={rows}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise(async(resolve) => {
            await db.collection('Students').doc(oldData.id).set({...newData})
             setRow( (data) => {
                 data =  [...rows]
                 data[data.indexOf(oldData)] = newData;
                return [...data]

             })
             
             resolve();
              
          }),
        onRowDelete: (oldData) =>
          new Promise(async(resolve) => {
              await db.collection('Students').doc(oldData.id).delete();
              setRow((data) => {
            
                // ...data.filter((dt)=> (dt.id!=oldData.id)) 
                return [...data.filter((dt)=> (dt.id!=oldData.id)) ];
              });
              resolve();
          }),
      }}
    />
  );
}

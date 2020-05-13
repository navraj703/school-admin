import React ,{ useEffect ,useState } from 'react';
import MaterialTable  from 'material-table';
import { db } from '../../Firebase'
import { Print } from '@material-ui/icons'
import { Button } from '@material-ui/core'
import {  btn_style  } from '../Students/data'
import { FilterList , SettingsApplicationsOutlined } from '@material-ui/icons'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
export default function Data() {
   

  const  [rows,setRow] = useState([]);
  const  [filter,setFilter] = useState(false)
  const columns = [
    { title: 'Id', field: 'id' },
    { title: 'Name', field: 'name' },
    { title: 'Email', field: 'email' },
  ]
  useEffect(() => {
    const fetchData = async () => {
      const data = await db.collection("Msg").get();
      setRow(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    };
    fetchData();
  }, []);
  
   const handleFilter = () => {
    if(filter) {
      setFilter(false)
    } else {
       setFilter(true)
    }
  }
  const exportPdf = () => {
     const unit = "pt";
     const size = "A1"; // Use A1, A2, A3 or A4
     const orientation = "landscape"
    
    const marginLeft = 5;
    const doc = new jsPDF(orientation, unit, size);
     doc.setFontSize(20);
     doc.setTextColor(40);
     doc.setFontStyle('Ubuntu Mono');
    
    const headers = ["Id","Name" ,"Email","Message"]
    const tBody = rows.map( (e) => [ e.id, e.name , e.email ,e.msg ])
    const title = "Message";
   
    doc.autoTable(headers,tBody, {
    startY: doc.autoTableEndPosY() + 70,
    margin: { horizontal: 10 },
    styles: { overflow: 'linebreak' },
    bodyStyles: { valign: 'top' },
    columnStyles: { email: { columnWidth: 'wrap' } },
    theme: "grid"
    },);
      doc.text(title, marginLeft, 40);
    doc.save("Students.pdf")


  }
  return (
    <>
       <div style={btn_style}
      >
           <Button onClick={exportPdf}><Print color="inherit"/></Button>
            <Button onClick={handleFilter}><FilterList color="inherit"/></Button>
            
    
      </div>
      <MaterialTable
        title="Messages"
        options={{
            sorting: true ,
            filtering: filter ,
             headerStyle: {

            }
          }}
        
        columns={columns}
        data={rows}
        editable={{
          onRowDelete: (oldData) =>
            new Promise(async(resolve) => {
                await db.collection('Msg').doc(oldData.id).delete();
                setRow((data) => {
              
                  // ...data.filter((dt)=> (dt.id!=oldData.id)) 
                  return [...data.filter((dt)=> (dt.id!==oldData.id)) ];
                });
                resolve();
            }),
        }}
        detailPanel={ rows => {
          return (
           <div>
           <h5 align="center">Message</h5>
           <p align="center"> {rows.msg}</p>
           </div>
          )
          }}
       
       
      />
    </>
  );
}






import React ,{ useEffect ,useState } from 'react';
import MaterialTable from 'material-table';
import { db } from '../../Firebase'
import { Button   } from '@material-ui/core'
import { Print , FilterList } from '@material-ui/icons'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const btn_style = { 
   display:"flex",
   justifyContent:"flex-start",
   maginTop : "10px",
   color: "white",
   width: "max-content"

}

 
  
export default function Data() {
  const [filter,setFilter] = useState(false);
  const  [rows,setRow] = useState([]);
  const columns = [
    
    { title: 'Name', field: 'name' },
    { title: 'FatherName', field: 'fatherName' },
    { title: 'MotherName', field: 'motherName',  },
    { title: 'Gender', field: 'gender'  },
    { title: 'Category', field: 'category'  },
    { title: 'Date of Submission', field: 'date'  },
    { title: 'Village', field: 'village',  },
    { title: 'Choosed class', field: 'class',  },
    { title: 'Last class', field: 'perivClass',  },
    { title: 'Adhaar', field: 'adhaar',  },
    { title: 'Phone Number', field: 'PhoneNumber',  },
    { title: 'Account No', field: 'account'  },
    { title: 'IFSC', field: 'ifsc'  },
    { title: 'Family Income', field: 'income'  },

  ]

  
  useEffect(() => {
    const fetchData = async () => {
      const data = await db.collection("Students").get();
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
     const size = "A0"; // Use A1, A2, A3 or A4
     const orientation = "landscape"
    
    const marginLeft = 5;
    const doc = new jsPDF(orientation, unit, size);
     doc.setFontSize(20);
     doc.setTextColor(40);
     doc.setFontStyle('Ubuntu Mono');
    
    
    const tBody = rows.map( (e) => [  e.name , e.fatherName , e.motherName , e.gender , e.category , e.date ,e.village , e.class, e.perivClass , e.adhaar , e.PhoneNumber , e.account , e.ifsc , e.income , e.photoUrl , e.signUrl])
    const title = "Students";
   
    doc.autoTable(columns,tBody, {
    startY: doc.autoTableEndPosY() + 70,
    margin: { horizontal: 2 },
    styles: { overflow: 'linebreak' },
    bodyStyles: { valign: 'top' },
    columnStyles: { email: { columnWidth: 'wrap' } },
    theme: "grid"
    },);
      doc.text(title, marginLeft, 40);
    doc.save("Students.pdf")


  }
  return (
    <div  >
       <div style={btn_style}
      >
      
           <Button onClick={exportPdf}><Print color="inherit"/></Button>
            <Button onClick={handleFilter}><FilterList color="inherit"/></Button>
          
      </div>
      <div >
      <MaterialTable
        title="Students"
        options={{
            sorting: true,
            filtering :filter ,
          }}
        id="material-table"
        
        columns={columns}
        
        data={rows}
        detailPanel={ rows => {
          return (
           <div style={{display:"flex",flexDirection:"column" ,justifyContent:"center" ,alignContent:"center"}}>
           <h4 align="center">Documents</h4>
           <div style={{display:"flex" ,justifyContent:"center"}}>
           <img alt="img" src={rows.imageUrl || "https://via.placeholder.com/100"} width="100px" height="100px" className="mr-3"/>
           <img alt="sign" src={rows.signUrl || "https://via.placeholder.com/100"} width="100px" height="100px"/>
           </div>
           </div>
          )
          }}
        editable={{
            onRowAdd: (newData) =>
            new Promise(async(resolve) => {
              await db.collection('Students').add({
                 ...newData

              })
               setRow( (data) => {
                 data = [...rows]
                 data.push(newData);
                 return [...data]

               })
                resolve();
            }),
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
                  return [...data.filter((dt)=> (dt.id!==oldData.id)) ];
                });
                resolve();
            }),
        }}
      />
      </div>
     
    </div>
  );
}
export { btn_style  };

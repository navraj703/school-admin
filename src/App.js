import  React , { useState } from 'react'
import Header from './Component/Header';
import Students from './Pages/Students'
const App = () => {
  const [width, setwidth] = useState(0);
  return (
    <div className="App">
      <Header onWidthChange = {(wi)=>setwidth(wi)}/>
      <Students width = {width} />
    </div>
  )
}

export default App;

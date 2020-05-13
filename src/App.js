import  React , { useState } from 'react'
import Header from './Component/Header';
import Students from './Pages/Students';
import Message from './Pages/Message'
import Login from './Pages/Login'
import Forgot from './Pages/Forgot'
import {
  HashRouter,
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
const App = () => {
  const [width, setwidth] = useState(50);
  return (
    <div className="App">
     
      <Router>
        <HashRouter>
            <Switch>
              <Route path="/" exact>
                 <Header onWidthChange = {(wi)=>setwidth(wi)}/>
                 <Students width = {width} />
              </Route>
              <Route path="/message" exact  >
                <Header onWidthChange = {(wi)=>setwidth(wi)}/>
                <Message width = {width} />
              </Route>
             <Route path='/login' exact component={Login}/>
             <Route path='/reset' exact component={Forgot}/>
            </Switch>
        </HashRouter>
      </Router>
    </div>
  )
}

export default App;

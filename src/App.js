import "./App.css";
// importing components from react-router-dom package
import {
BrowserRouter as Router
} from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Communicate from "./components/Communicate";
import Chat from "./components/Chat";

function App() {
  return (
    <Router>
        <Routes>
        <Route exact path='/' element={<Login/>} />
        <Route exact path='/communicate' element={<Communicate/>} />			
        <Route exact path='/chat' element={<Chat/>} />			
        <Route path="*" element={<Login/>}/>
        </Routes>
    </Router>
  );
}

export default App;

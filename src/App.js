import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import oldLoginForm from './components/oldLoginForm';
import Chat from './components/Chat';
import SignupForm from './components/oldSignUpForm';
import Home from './components/Home';
import Sample from './components/Sample';
import Registration from './components/Registration';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route exact path="/signup" element={<SignupForm />} />
          <Route exact path="/chat" element={<Chat />} />
          <Route exact path="/oldlogin" element={<oldLoginForm />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/sample" element={<Sample />} />

          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Registration />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

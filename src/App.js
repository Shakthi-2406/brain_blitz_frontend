import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Login from './components/LoginForm';
import Chat from './components/Chat';
import SignupForm from './components/SignUpForm';
import Home from './components/Home';
import LoginRegister from './components/LoginRegister';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route exact path="/signup" element={<SignupForm />} />
          <Route exact path="/chat" element={<Chat />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/loginRegister" element={<LoginRegister />} />
          <Route exact path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

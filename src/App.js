import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import oldLoginForm from './components/oldLoginForm';
import Chat from './components/Chat';
import SignupForm from './components/oldSignUpForm';
import Home from './components/Home';
import Registration from './components/Registration';
import Login from './components/Login';
import Quiz from './components/Quiz';
import Result from './components/Result';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/chat" element={<Chat />} />
          <Route exact path="/oldlogin" element={<oldLoginForm />} />

          <Route path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/signup" element={<SignupForm />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Registration />} />
          <Route exact path="/quiz" element={<Quiz/>} />
          <Route exact path="/result" element={<Result/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

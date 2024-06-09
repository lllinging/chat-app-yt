import { Navigate, Route, Routes} from 'react-router-dom';
import './App.css';
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext.jsx';

function App() {
  const {authUser} = useAuthContext();

  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      {/* <SignUp /> */}
      {/* <Login /> */}
      {/* <Home /> */}
      {/* Routes purpose is to define the routes of the application. */}
      <Routes>
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignUp />} />
        <Route path="/" element={authUser ? <Home /> : <Navigate to={"/login"} />} />
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App;

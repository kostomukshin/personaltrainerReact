import './App.css';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {BrowserRouter,  Routes,  Route,  Link} from"react-router-dom";

import Home from './components/Home';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import Tcalendar from './components/Tcalendar'
import Statistacs from './components/Statistacs'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <AppBar position="static" style={{background: 'darkturqoise'}}>
      
        <Toolbar>
          <Typography variant="h5">
            <Link to="/customerlist">customer list</Link>{'  '}
           
            <Link to="/traininglist">training list</Link>{'  '}
         
            <Link to="/calendar">calendar</Link>{'  '}
         
            <Link to="/statistics">statistics</Link>{' '}
       

          </Typography>
        </Toolbar>
      </AppBar>
 
    <Routes>
    <Route exact path="/" element={<Home />} />
    <Route exact path="/customerlist" element={<Customerlist />} />
    <Route exact path="/traininglist" element={<Traininglist />} />
    <Route exact path="/calendar" element={<Tcalendar />} />
    <Route exact path="/statistics" element={<Statistacs />} />

    </Routes>
    
    </div>
    </BrowserRouter>
    
  );
}

export default App;
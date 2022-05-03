import './App.css';
import Customerlist from './components/Customerlist'
import Traininglist from './components/Traininglist'
import Home from './components/Home'
import Notfound from './components/Notfound'

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';
import React, {useState} from 'react';
import {BrowserRouter,  Routes,  Route,  Link} from 'react-router-dom';

import Tabs from './components/Tabs';

function App() {
  return (
    <>
    <Tabs />
    </>
  )
}

export default App;

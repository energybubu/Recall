import { useState } from 'react'

import './App.css'
import './css/pageWithExample.css'
import { HashRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import PageWithExample from './pages/pageWithExample'
import Firstpage from './pages/firstPage'

function App() {

  const topics = ['Badminton Competition', 'Studying Computer Engineering', "Playing the Guitar", 'Driving Experiences', 'Ping-Pong Competition']

  return (

    <Router>
      <Routes>
        <Route path='/' element={<Firstpage/> }/>
        {
          topics.map((id, index)=>(
            <Route path={id.replace(/ /g, "")} element={<PageWithExample storyId={index} />}/>
          ))
        }
      </Routes>

    </Router>
  );
}
export default App


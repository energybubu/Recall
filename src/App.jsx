import { useState } from 'react'

import './App.css'
import './css/pageWithExample.css'
import { HashRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import PageWithExample from './pages/pageWithExample'
import Firstpage from './pages/firstPage'
import Promptpage from './pages/promptPage'
import DatasetPage from './pages/datasetPage'
function App() {

  const topics = ['Badminton Competition', 'Studying Computer Engineering', "Playing the Guitar", 'Driving Experiences', 'Ping-Pong Competition']

  return (

    <Router>
      <Routes>
        <Route path='/' element={<Firstpage/> }/>
        <Route path='/prompt' element={<Promptpage/> }/>
        <Route path='/dataset' element={<DatasetPage/> }/>
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


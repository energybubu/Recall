import { useState } from 'react'

import './App.css'
import './css/pageWithExample.css'
import { HashRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import PageWithExample from './pages/pageWithExample'
import Firstpage from './pages/firstPage'
// import UploadImages from './pages/UploadImage'

function App() {

  const [loading, setLoading] = useState(false)
  const topics = ['Badminton Competition', 'Studying Computer Engineering', "Playing the Guitar", 'Driving Experiences', 'Ping-Pong Competition']

  return (

    <Router>
      <Routes>
        <Route path='/' element={<Firstpage/> }/>
        {
          topics.map((id, index)=>(
            <Route path={id.replace(/ /g, "")} element={<PageWithExample storyId={index} loading={loading} setLoading={setLoading}/>}/>
          ))
        }

      {/* <Route path="/caption" element={<UploadImages dense={0}/> } />
      <Route path="/densecaption" element={<UploadImages dense={1}/> } /> */}
      </Routes>

    </Router>
  );
}
export default App


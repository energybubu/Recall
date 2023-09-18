import { useState } from 'react'

import './App.css'
import './css/pageWithExample.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PageWithExample from './pages/pageWithExample'

import { Avatar } from '@mui/material';

// import PageWithoutExample from './pages/pageWithoutExample'
const About = () => <h1>About Page</h1>;
const Dashboard = () => <h1>About Page</h1>;

function App() {

  const [storyId, setStoryId] = useState(3)
  const [loading, setLoading] = useState(false)
  return (
    <Router basename='/Recall'>
      <div>

        <Routes>
          <Route path="/" element={
            
            <div>

              <div style={{display:"flex", alignItems:"center", justifyContent:'center', flexDirection:"column"}}>
                <h1>Choose a story to start:</h1>
                <div>
                  <div style={{display:"flex", flexDirection:"row"}}><Avatar style={{margin:"10px", fontSize:40}} sx={{ width: 70, height: 70 }}>S1</Avatar><h2> You, the User</h2></div>
                  <div style={{display:"flex", flexDirection:"row"}}><Avatar style={{margin:"10px", fontSize:40}} sx={{ width: 70, height: 70 }}>S2</Avatar><h2> Your Friend, the Bot</h2></div>
                </div>
              </div>
              <ul style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              {['Badminton Competition', 'Studying Computer Engineering', "Playing the Guitar", 'Driving Experiences', 'Ping-Pong Competition'].map((id, index) => (
                  <>
                    <Link key={index} className='story-chooser' to="/withexample" onClick={() => setStoryId(index)}>

                      <img src={`https://raw.githubusercontent.com/energybubu/Recall/main/img/${index+1}.PNG`} alt={id} />
                      {id}
                      <br/>
                    </Link>
                  </>  

              ))}
              </ul>
              <div style={{height:'40vh'}}></div>
            </div>
          }/>
          <Route path="/withexample" element={
            <>
              <div style={{display:"flex", justifyContent:"center", alignContent:"center"}}>
              </div>
              <PageWithExample storyId={storyId} setStoryId={setStoryId} loading={loading} setLoading={setLoading}/>
            </>
          }/>
        </Routes>
      </div>
    </Router>
  );
}
export default App

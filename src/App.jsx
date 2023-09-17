import { useState } from 'react'

import './App.css'
import './css/pageWithExample.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PageWithExample from './pages/pageWithExample'

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

              <div style={{display:"flex", alignItems:"center", flexDirection:"column"}}>
                <h2>In the Chatroom, You will represent S1, and the bot will represent S2 in your conversation.<br/></h2>
                <h2>Choose a story to start:</h2>
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

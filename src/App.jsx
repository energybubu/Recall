import { useState } from 'react'

import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PageWithExample from './pages/pageWithExample'
// import PageWithoutExample from './pages/pageWithoutExample'
const About = () => <h1>About Page</h1>;
const Dashboard = () => <h1>About Page</h1>;

function App() {
  return (
    <Router>
      <div>
        {/* <ul style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <li>
            <Link to="/withexample">Try using examples and historical dialogues from our dataset</Link>
          </li>
          <li>
            <Link to="/withoutexample">Make you own historical dialogues and test</Link>
          </li>
        </ul> */}


        {/* <hr /> */}

        <Routes>
          <Route exact path="/Recall/" element={<PageWithExample />}/>
          {/* <Route path="/withoutexample" element={<PageWithoutExample />}/> */}
        </Routes>
      </div>
    </Router>
  );
}
export default App

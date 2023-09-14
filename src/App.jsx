import { useState } from 'react'

import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PageWithExample from './pages/pageWithExample'
// import PageWithoutExample from './pages/pageWithoutExample'
const About = () => <h1>About Page</h1>;
const Dashboard = () => <h1>About Page</h1>;

function App() {
  return (
    <PageWithExample />
  );
}
export default App

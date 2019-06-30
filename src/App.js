import React from 'react';
import './App.css';

import Dashboard from './dashboard'
import Store from './store'

function App() {
  return (
    <div className="App">
        <Store>
        <Dashboard/>
        </Store>
    </div>
  );
}

export default App;

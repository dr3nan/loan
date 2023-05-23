import React from 'react';
import './app.scss';
import { Routes, Route } from 'react-router-dom';
import { Loan } from './components/Loan/Loan';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/partner_test.html/:id' Component={Loan} />
      </Routes>
    </div>
  );
}

export default App;

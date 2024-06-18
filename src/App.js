import React from 'react';
import { BrowserRouter, Routes,  Route } from 'react-router-dom';
import Notes from './components/Notes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Notes />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

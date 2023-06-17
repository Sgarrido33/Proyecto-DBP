import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisLogin from './componentes/RegisLogin';
import Menu from './componentes/Menu';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/*" element={<RegisLogin />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
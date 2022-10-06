import { Navigate, Route, BrowserRouter, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import './App.css';
import Error404 from './pages/Error/Error404';
import Home from './pages/Home/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <main className="main">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            {/* <Route path="/" element={<Navigate replace to="/login" />} /> */}
            <Route path="*" element={<Error404 />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;

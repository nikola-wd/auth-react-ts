// import { Navigate, Route, BrowserRouter, Routes } from 'react-router-dom';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Error404 from './pages/Error/Error404';
import Home from './pages/Home/Home';
import AuthGuard from './guards/AuthGuard';
import PublicGuard from './guards/PublicGuard';
import Posts from './pages/Posts/Posts';
import TryPersistLogin from './components/auth/TryPersistLogin/TryPersistLogin';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <main className="main">
          <Routes>
            <Route path="/posts" element={<Posts />} />
            <Route element={<TryPersistLogin />}>
              <Route element={<AuthGuard />}>
                <Route path="/" element={<Home />} />
                <Route path="/my-posts" element={<>To be implemented</>} />
              </Route>
            </Route>
            <Route element={<PublicGuard />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            {/* <Route path="/" element={<Navigate replace to="/login" />} /> */}
            <Route path="*" element={<Error404 />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;

// import { Navigate, Route, BrowserRouter, Routes } from 'react-router-dom';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';

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
import MyPosts from './pages/MyPosts/MyPosts';
import PostPublic from './pages/Posts/PostPublic';
import CreatePost from './pages/MyPosts/CreatePost';
import EditPost from './pages/MyPosts/EditPost';

// TODO: Fix. When logged in, and then going to login screen, it doesn't redirect but stays there, and doesn't TryPersist or try get auth state correctly

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <main className="main">
          <Routes>
            <Route path="posts">
              <Route index element={<Posts />} />
              <Route path=":slug" element={<PostPublic />} />
            </Route>
            <Route element={<TryPersistLogin />}>
              <Route element={<AuthGuard />}>
                <Route index element={<Home />} />
                <Route path="my-posts">
                  <Route index element={<MyPosts />} />
                  <Route path="create" element={<CreatePost />} />
                  <Route path=":postId" element={<EditPost />} />
                </Route>
              </Route>

              {/* TEST remove */}
              <Route element={<PublicGuard />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Route>
            </Route>
            {/* <Route element={<PublicGuard />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route> */}

            <Route path="*" element={<Error404 />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;

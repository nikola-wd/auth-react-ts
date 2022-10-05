import './App.css';
import Header from './components/Header/Header';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

function App() {
  return (
    <div className="App">
      <Header />

      <main className="main">
        Content Wrap
        <Register />
        <Login />
      </main>
    </div>
  );
}

export default App;

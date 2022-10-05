import './App.css';
import Header from './components/Header/Header';
import Login from './pages/Login/Login';

function App() {
  return (
    <div className="App">
      <Header />

      <main className="main">
        Content Wrap
        <Login />
      </main>
    </div>
  );
}

export default App;

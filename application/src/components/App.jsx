import Page404 from './Page404.jsx';
import Authorization from './Authorization.jsx';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="d-flex flex-column h-100">
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <a href="/" className="navbar-brand">Hexlet Chat</a>
          </div>
        </nav>
        <Routes>
          <Route exact path='/' element={<Authorization />} />
          <Route path='/login' element={<Authorization />} />
          <Route path='*' element={<Page404 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

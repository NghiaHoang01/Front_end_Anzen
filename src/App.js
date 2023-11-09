import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import DefaultLayout from "./components/DefaultLayout"
import Login from './page/Login';
function App() {
  return (
    <div className="anzen">
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<DefaultLayout />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

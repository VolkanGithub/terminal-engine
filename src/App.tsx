import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    <Routes>
      {/* Ana Layout rotası */}
      <Route path="/" element={<MainLayout />}>
        {/* Layout'un içine yüklenecek sayfalar (Outlet) */}
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  )
}

export default App
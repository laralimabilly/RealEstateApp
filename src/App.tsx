import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppProviders from './AppProviders';
import ListingsPage from './pages/ListingsPage/ListingsPage';
import ListingDetailsPage from './pages/ListingDetailsPage/ListingDetailsPage';
import './App.css';

function App() {
  return (
    <AppProviders>
      <Router>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<ListingsPage />} />
            <Route path="/listings/:id" element={<ListingDetailsPage />} />
          </Routes>
        </div>
      </Router>
    </AppProviders>
  );
}

export default App;
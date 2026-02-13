import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import DayView from './pages/DayView';
import Login from './pages/Login';
import MessageSubmission from './pages/MessageSubmission';
import AdminView from './pages/AdminView';
import Layout from './components/Layout';
import { KeepsakeProvider } from './utils/KeepsakeContext';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/day/:dayId" element={<DayView />} />
        <Route path="/admin" element={<AdminView />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasSubmittedMessage, setHasSubmittedMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    const messageStatus = localStorage.getItem('messageSubmitted') === 'true';

    setIsAuthenticated(authStatus);
    setHasSubmittedMessage(messageStatus);
    setIsLoading(false);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleMessageSubmitSuccess = () => {
    setHasSubmittedMessage(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="text-[#eb6f92] text-2xl animate-pulse">Loading...</div>
      </div>
    );
  }

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // Show message submission if authenticated but hasn't submitted message
  if (!hasSubmittedMessage) {
    return <MessageSubmission onSubmitSuccess={handleMessageSubmitSuccess} />;
  }

  // Show main app if both authenticated and message submitted
  return (
    <Router>
      <KeepsakeProvider>
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </KeepsakeProvider>
    </Router>
  );
}

export default App;

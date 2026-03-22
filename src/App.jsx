import { useEffect,useState } from "react";
import Navbar from './components/Navbar'
import FilterComp from './components/FilterComp'
import Dashboard from './components/Dashboard';
import ContactUs from './components/ContactUs';
import LoadCDR from './components/LoadCDR';
import Login from './components/Login';

function App() {
  // useEffect(() => {
  //   window.electronAPI.hello();
  // }, []);
    // Use a string state to track which view is active
  const [activeView, setActiveView] = useState('dashboard');

  // Helper function to render the correct component
  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'contact':
        return <ContactUs />;
      case 'loadCDR':
        return <LoadCDR />;
      case 'login':
        return <Login />;
      default:
        return <Dashboard />;
    }
  }



  return (
    <div className="h-screen  bg-gray-900 text-white">
     
       <div>
        <div className="min-h-screen bg-gray-100">
      {/* Navbar is fixed at the top, we pass the setter function to it */}
      <Navbar setView={setActiveView} activeView={activeView} />

      <main className="p-8">
        {/* Only the component matching the state will show here */}
        {renderContent()}
      </main>
    </div>
       </div>
    </div>
  );
}

export default App;
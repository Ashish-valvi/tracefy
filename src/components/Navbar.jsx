function Navbar({ setView, activeView }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'loadCDR', label: 'Load CDR' },
    { id: 'contact', label: 'Contact Us' },
    { id: 'login', label: 'Login' },
  ];

  return (
    <nav className="bg-blue-800 text-white p-4 flex gap-6 shadow-lg justify-between ">
      <div className="font-bold mr-4 text-xl">Tracefy</div>
      <div>
         {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setView(item.id)}
          className={`px-3 py-1 rounded transition ${
            activeView === item.id ? 'bg-blue-600 font-bold' : 'hover:bg-blue-700'
          }`}
        >
          {item.label}
        </button>
      ))}
      </div>
      
      
    </nav>
  );
}

export default Navbar;



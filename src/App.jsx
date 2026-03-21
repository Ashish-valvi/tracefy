import { useEffect } from "react";

function App() {
  useEffect(() => {
    window.electronAPI.hello();
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
      <h1 className="text-2xl font-bold text-yellow-300">
        🚀 Electron + Vite + React + Tailwind v3 - how its working
      </h1>
    </div>
  );
}

export default App;
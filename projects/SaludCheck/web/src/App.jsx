import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Pricing from './components/Pricing';

function App() {
  const [isActivated, setIsActivated] = useState(false);

  if (!isActivated) {
    return <Pricing onActivate={() => setIsActivated(true)} />;
  }

  return (
    <Dashboard />
  );
}

export default App;

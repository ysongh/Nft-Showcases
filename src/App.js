import React, { useState } from 'react';
import { Layout } from 'antd';

import './App.css';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard';

function App() {
  const [address, setAddress] = useState("");
  const [type, setType] = useState("137");

  return (
    <Layout className="layout">
      <Navbar
        address={address}
        setAddress={setAddress}
        setType={setType} />
      <Layout.Content style={{ padding: '0 55px', minHeight: '100vh' }}>
        <Dashboard
          address={address}
          type={type} />
      </Layout.Content>
    </Layout>
  );
}

export default App;

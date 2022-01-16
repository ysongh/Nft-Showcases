import React, { useState } from 'react';
import { Layout } from 'antd';

import './App.css';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard';

function App() {
  const [userNFTs, setUserNFTs] = useState([]);
  const [nftLoading, setNFTLoading] = useState(false);

  return (
    <Layout className="layout">
      <Navbar
        setUserNFTs={setUserNFTs}
        setNFTLoading={setNFTLoading}/>
      <Layout.Content style={{ padding: '0 55px', minHeight: '100vh' }}>
        <Dashboard
          userNFTs={userNFTs}
          nftLoading={nftLoading} />
      </Layout.Content>
    </Layout>
  );
}

export default App;

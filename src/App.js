import React, { useState } from 'react';
import { Layout } from 'antd';
import { HashRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard';
import ContractDetail from './pages/ContractDetail';

function App() {
  const [userNFTs, setUserNFTs] = useState([]);
  const [nftLoading, setNFTLoading] = useState(false);

  return (
    <Layout className="layout">
      <Navbar
        setUserNFTs={setUserNFTs}
        setNFTLoading={setNFTLoading}/>
      <Layout.Content style={{ padding: '0 55px', minHeight: '100vh' }}>
        <HashRouter>
          <Routes>
            <Route
              path="/contract/:contractaddress"
              element={
                <ContractDetail />} />
            <Route
              path="/"
              element={
                <Dashboard
                  userNFTs={userNFTs}
                  nftLoading={nftLoading} />} />
          </Routes>
        </HashRouter>
      </Layout.Content>
    </Layout>
  );
}

export default App;

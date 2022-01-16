import React from 'react';
import { Layout, Menu, Input, Select } from 'antd';

function Navbar({ address, setAddress, setType}) {
  const changeType = value => {
    console.log(`selected ${value}`);
    setType(value);
  }

  return (
    <Layout.Header className="primary-bg-color" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Menu className="primary-bg-color" mode="horizontal" style={{ flex: 2 }}>
        <Menu.Item key="1" className="logo secondary-color">NFT Showcases</Menu.Item>
      </Menu>
      <Input value={address} placeholder="0x0" onChange={(e) => setAddress(e.target.value)} style={{ maxWidth: '500px' }} />
      <Select
        placeholder="Select a Network"
        optionFilterProp="children"
        onChange={changeType}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Select.Option value="1">Ethereum Mainnet</Select.Option>
        <Select.Option value="42">Ethereum Testnet Kovan</Select.Option>
        <Select.Option value="137">Matic Mainnet</Select.Option>
        <Select.Option value="80001">Matic Testnet Mumbai</Select.Option>
        <Select.Option value="43114">Avalanche C-Chain Mainnet</Select.Option>
        <Select.Option value="43113">Avalanche Fuji Testnet</Select.Option>
        <Select.Option value="56">Binance Smart Chain</Select.Option>
        <Select.Option value="97">Binance Smart Chain Testnet</Select.Option>
      </Select>
    </Layout.Header>
  )
}

export default Navbar;

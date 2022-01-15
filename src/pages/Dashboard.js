import React, { useEffect, useState } from 'react';
import { Row, Select, Typography, Input, Spin } from 'antd';

import { COVALENT_APIKEY } from '../config';
import NFTCard from '../components/NFTCard';

function Dashboard() {
  const [address, setAddress] = useState("");
  const [type, setType] = useState("137");
  const [userNFTs, setUserNFTs] = useState([]);
  const [nftLoading, setNFTLoading] = useState(false);

  useEffect(() => {
    if(address.length === 42) loadMyCollection();
  }, [address, type])

  const loadMyCollection = async () => {
    try{
      setNFTLoading(true);
      const nft = await fetch(`https://api.covalenthq.com/v1/${type}/address/${address}/balances_v2/?nft=true&key=${COVALENT_APIKEY}`);
      const { data } = await nft.json();

      let nftData = [];
      data.items.forEach(item => {
        if(item.nft_data) nftData = nftData.concat(item.nft_data);
      });

      console.log(nftData);
      setUserNFTs(nftData || []);
      setNFTLoading(false);
    } catch(error) {
      console.error(error);
      setNFTLoading(false);
    }
  }


  const changeType = value => {
    console.log(`selected ${value}`);
    setType(value);
  }

  const getURLImage = url => {
    if(!url) return null;

    if(url.startsWith("http")){
      return url;
    }
    else{
      return `https://${url}.ipfs.dweb.link/`
    }

  }

  return (
    <div style={{ marginTop: "1rem" }}>
      <p style={{ margin: 0, fontWeight: 'bold' }}>Enter Wallet Address</p>
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
      <br />
      <br />
      {nftLoading
        ? <Spin className="spinner" size="large" />
        : <Row gutter={[16, 16]}>
            {userNFTs.length
              ? userNFTs.map((nft, index) => (
                  <NFTCard key={index} nftdata={nft} />
                ))
              : <Typography.Text type="danger" className="nonfts-message">No NFTs for this address</Typography.Text>
          }
          </Row>
      }
    </div>
  )
}

export default Dashboard;

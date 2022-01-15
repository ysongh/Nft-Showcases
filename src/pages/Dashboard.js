import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Select, Image, Typography, Input } from 'antd';

import { COVALENT_APIKEY } from '../config';

function Dashboard() {
  const [address, setAddress] = useState("");
  const [type, setType] = useState("137");
  const [userNFTs, setUserNFTs] = useState([]);

  useEffect(() => {
    if(address.length === 42) loadMyCollection();
  }, [address, type])

  const loadMyCollection = async () => {
    try{
      const nft = await fetch(`https://api.covalenthq.com/v1/${type}/address/${address}/balances_v2/?nft=true&key=${COVALENT_APIKEY}`);
      const { data } = await nft.json();
      console.log(data);
      let nftData = [];
      data.items.forEach(item => {
        if(item.nft_data) nftData = nftData.concat(item.nft_data);
      });
      setUserNFTs(nftData || []);
    } catch(error) {
      console.error(error);
    }
  }


  const changeType = value => {
    console.log(`selected ${value}`);
    setType(value);
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
      <Row gutter={[16, 16]}>
        {userNFTs.length
          ? userNFTs.map((nft, index) => (
              <Col xs={24} sm={12} md={8} lg={6} key={index}>
                <Card
                  hoverable
                  cover={<Image alt="NFT Image" src={nft.token_url} />}
                >
                  <Card.Meta title={nft.token_id}/>
                </Card>
              </Col>
            ))
          : <Typography.Text type="danger" className="nonfts-message">No NFTs for this address</Typography.Text>
        }
      </Row>
    </div>
  )
}

export default Dashboard;

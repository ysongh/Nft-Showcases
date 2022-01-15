import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Typography, Image, Input } from 'antd';

import { COVALENT_APIKEY } from '../config';

function Dashboard() {
  const [address, setAddress] = useState("");
  const [userNFTs, setUserNFTs] = useState([]);

  useEffect(() => {
    if(address.length === 42) loadMyCollection();
  }, [address])

  const loadMyCollection = async () => {
    try{
      const nft = await fetch(`https://api.covalenthq.com/v1/80001/address/${address}/balances_v2/?nft=true&key=${COVALENT_APIKEY}`);
      const { data } = await nft.json();
      console.log(data);
      let nftData = [];
      data.items.forEach(item => {
        if(item.nft_data) nftData = nftData.concat(item.nft_data);
      });
      setUserNFTs(nftData);
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <div style={{ marginTop: "1rem" }}>
      <p style={{ margin: 0, fontWeight: 'bold' }}>Enter Wallet Address</p>
      <Input value={address} placeholder="0x0" onChange={(e) => setAddress(e.target.value)} style={{ maxWidth: '500px' }} />
      <br />
      <br />
      <Row gutter={[16, 16]}>
        {userNFTs.map((nft, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <Card
              hoverable
              cover={<Image alt="NFT Image" src={nft.token_url} />}
            >
              <Card.Meta title={nft.token_id}/>
            </Card>
          </Col>
        ))}
      </Row>
      
    </div>
  )
}

export default Dashboard;

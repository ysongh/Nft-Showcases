import React from 'react';
import { Col, Card, Image } from 'antd';

function NFTCard({ nftdata }) {
  return (
    <Col xs={24} sm={12} md={8} lg={6}>
      <Card
        hoverable
        cover={<Image alt="NFT Image" src={nftdata.token_url} />}
      >
        <Card.Meta title={nftdata.token_id}/>
      </Card>
    </Col>
  )
}

export default NFTCard;

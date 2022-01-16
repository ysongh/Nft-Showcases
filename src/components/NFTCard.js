import React from 'react';
import { Col, Card, Image } from 'antd';

function NFTCard({ nftdata }) {
  const getURLImage = url => {
    if(url.startsWith("http")){
      return url;
    }
    else{
      return `https://ipfs.io/ipfs/${url}`;
    }
  }
  
  if(nftdata.external_data.image){
    return (
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card
          hoverable
          cover={<Image alt="NFT Image" src={nftdata.external_data.image} />}
        >
          <Card.Meta title={nftdata.external_data.name} description={nftdata.external_data.description} />
        </Card>
      </Col>
    )
  }
  else{
    return (
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card
          hoverable
          cover={<Image alt="NFT Image" src={getURLImage(nftdata.token_url)} />}
        >
          <Card.Meta title={nftdata.token_id}/>
        </Card>
      </Col>
    )
  }
}

export default NFTCard;

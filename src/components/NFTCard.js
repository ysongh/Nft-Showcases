import React, { useState } from 'react';
import { Col, Card, Tabs, Image } from 'antd';

function NFTCard({ nftdata }) {
  const getURLImage = url => {
    if(url.startsWith("http")){
      return url;
    }
    else{
      return `https://ipfs.io/ipfs/${url}`;
    }
  }

  return (
    <Col xs={24} sm={12} md={8} lg={6}>
      <Card
        hoverable
        cover={<Image className="card-image" alt="NFT Image" src={nftdata.external_data.image ? nftdata.external_data.image : getURLImage(nftdata.token_url)} />}
      >
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Contract Info" key="1">
            <Card.Meta title={`${nftdata.contract_name} (${nftdata.contract_ticker_symbol})`} description={`Id: ${nftdata.token_id}`} />
            <h4>{nftdata.contract_address}</h4>
          </Tabs.TabPane>

          <Tabs.TabPane tab="NFT Data" key="2">
            {nftdata.external_data.image
              ? <>
                  <Card.Meta title={nftdata.external_data.name} description={nftdata.external_data.description} />
                  <p>{nftdata.contract_address}</p>
                </>
              : <p>None</p>
            }
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </Col>
  )
}

export default NFTCard;

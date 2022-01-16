import React from 'react';
import { Row, Typography, Spin } from 'antd';

import NFTCard from '../components/NFTCard';

function Dashboard({ userNFTs, nftLoading }) {
  return (
    <div style={{ margin: "2rem 0" }}>
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

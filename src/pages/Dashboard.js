import React, { useEffect, useState } from 'react';
import { Row, Select, Typography, Input, Spin } from 'antd';

import { COVALENT_APIKEY } from '../config';
import NFTCard from '../components/NFTCard';

function Dashboard({ address, type }) {
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
      console.log(data);

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
  return (
    <div style={{ marginTop: "2rem" }}>
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

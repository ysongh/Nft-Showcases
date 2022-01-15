import React, { useEffect, useState } from 'react';

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
    <div>
      <p>Enter Wallet Address</p>
      <input value={address} placeholder="0x0" onChange={(e) => setAddress(e.target.value)}/>
      {userNFTs.map((nft, index) => (
        <div key={index}>
          <h1>ID {nft.token_id}</h1>
          <img src={nft.token_url} alt="NFT Image" />
        </div>
      ))}
    </div>
  )
}

export default Dashboard;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'antd';

import { NFTPORT_APIKEY } from '../config';

function ContractDetail() {
  const { contractaddress } = useParams();
  const [nfts, setNFTs] = useState([]);

  useEffect(() => {
    if(contractaddress) getContractNFTs();
  }, [contractaddress])

  const columns = [
    {
      title: 'Token ID',
      dataIndex: 'token_id',
      render: text => <p className="table-p">{text}</p>,
    },
    {
      title: 'File URL',
      dataIndex: 'file_url',
      render: url => <a href={url} target="_blank" rel="noopener noreferrer"><p className="table-url">{url}</p></a>,
    },
    {
      title: 'Metadata URL',
      dataIndex: 'metadata_url',
      render: url => <a href={url} target="_blank" rel="noopener noreferrer"><p className="table-url">{url}</p></a>,
    },
  ];

  const getContractNFTs = async () => {
    const options = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": NFTPORT_APIKEY
      },
    };

    const res = await fetch(`https://api.nftport.xyz/v0/nfts/${contractaddress}?` + new URLSearchParams({
        chain: 'polygon',
        page_size: 50,
        include: "all"
      }), options)
    let nftData = await res.json();
    nftData.nfts.forEach((nft, index) => {
      nft.key = index + 1;
    });
    console.log(nftData);
    setNFTs(nftData.nfts);
  }

  return (
    <div>
      <h1>{contractaddress}</h1>
      <Table columns={columns} dataSource={nfts} size="middle" expandable />
    </div>
  )
}

export default ContractDetail;

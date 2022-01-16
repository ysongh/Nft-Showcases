import React from 'react';
import { useParams } from 'react-router-dom';

function ContractDetail() {
  const { contractaddress } = useParams();
  return (
    <div>
      <h1>{contractaddress}</h1>
    </div>
  )
}

export default ContractDetail;

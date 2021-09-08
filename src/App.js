
import React, { useState, useRef } from 'react';
import { Form, Button, Tooltip, Overlay } from 'react-bootstrap';
import {
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const [address, setAddress] = useState(null);
  const [apiUrl, setApiUrl] = useState('https://api.testnet.solana.com');

  const handleTestnet = (e) => {
    setApiUrl('https://api.testnet.solana.com')
  }

  const handleDevnet = (e) => {
    setApiUrl('https://api.devnet.solana.com')
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (address != null) { sendSol() }
    else { alert('Enter public key.') }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setAddress(e.target.value);
  };

  const sendSol = async () => {

    try {
      // connect to cluster
      const connection = new Connection(apiUrl, "confirmed");
      console.log(await connection.getEpochInfo())
      const myAddress = new PublicKey(address);
      const signature = await connection.requestAirdrop(myAddress, LAMPORTS_PER_SOL);
      await connection.confirmTransaction(signature);
      showMessage();

    } catch (err) {
      alert('Invalid public key input!!!');
    }

  };

  const [show, setShow] = useState(false);
  const target = useRef(null);

  const showMessage = () => {
    setShow(true);
    const timer = setTimeout( () => { setShow(false) }, 3000);
    return () => clearTimeout(timer);
  }


  return (
    <div className="App">
      <h1 className="App-header">
        Solana Faucet
      </h1>
      <div className="container-fluid bg-light p-5">
      <div className='jumbotron'>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="text" placeholder="Enter Solana address to receive one sol" onChange={handleChange}/>
          </Form.Group>
          <div className="col">
            <Button variant="primary" type="submit" onClick={handleTestnet}>
              Testnet
            </Button>{' '}
            <Button variant="primary" type="submit" onClick={handleDevnet}>
              Devnet
            </Button>
          </div>
        </Form>
      </div>
      </div>
      <div className="container-fluid bg-light p-5" style={{'marginTop': '2px'}}>
      <div className='jumbotron'>
        <h6>
          Brought to you by: <a href="https://www.chartsmaster.com" target="_blank" rel="noreferrer"> www.chartsmaster.com</a>
        </h6>
      </div>
      </div>
      <div>
        <Overlay target={target.current} show={show}>
          {() => (
          <Tooltip>You got a sol :)</Tooltip>
          )}
        </Overlay>
      </div>
    </div>
  );
}

export default App;

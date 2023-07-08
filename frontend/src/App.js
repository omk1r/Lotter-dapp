import React, { useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";
import contractABI from "./contractABI.json";

function App() {
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState("");
  const [winner, setWinner] = useState("");
  const [user, setUser] = useState("");
  const [connected, setConnected] = useState(false);
  const contractAddress = "0x9d3e1f0c6a4759134c37ed7659c2bc2b44eb3f0f";

  let provider = typeof window !== "undefined" && window.ethereum;

  const connectMeta = async () => {
    try {
      if (!provider) return alert("Please install metamask");
      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });
      if (accounts.length) {
        setUser(accounts[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getContract = () => {
    try {
      const web3 = new Web3(provider);
      return new web3.eth.Contract(contractABI, contractAddress);
    } catch (error) {
      console.error(error);
    }
  };

  const getPlayers = async () => {
    try {
      const contract = getContract();
      const player = await contract.methods.allPlayers().call();
      const playerArray = Array.isArray(player) ? player : [player];
      setPlayers(playerArray);
    } catch (error) {
      console.error(error);
    }
  };

  const getBalance = async () => {
    try {
      const web3 = new Web3(provider);
      const balance = await web3.eth.getBalance(contractAddress);
      const balanceWei = web3.utils.fromWei(balance, "ether");
      setBalance(balanceWei);
    } catch (error) {
      console.error(error);
    }
  };

  const buyTicket = async () => {
    try {
      const contract = getContract();
      const web3 = new Web3(provider);
      const gasPrice = await web3.eth.getGasPrice();
      const amountInWei = web3.utils.toWei("1", "ether");
      await contract.methods.buyTickets().send({
        from: user,
        value: amountInWei,
        gasPrice: gasPrice,
      });
      getPlayers();
      getBalance();
    } catch (error) {
      console.error(error);
    }
  };

  const pickWinner = async () => {
    let tries = true;
    try {
      const contract = getContract();
      await contract.methods.pickWinner().call({ from: user });
    } catch (err) {
      const errorMessage =
        err.data || "You are not the Owner or Not enough Players";
      tries = false;
      alert(errorMessage);
    }
    if (tries) {
      const contract = getContract();
      await contract.methods.pickWinner().send({ from: user });
      getWinner();
      getPlayers();
      getBalance();
    }
  };

  const getWinner = async () => {
    const contract = getContract();
    const winner = await contract.methods.winner().call();
    setWinner(winner);
  };

  useEffect(() => {
    getPlayers();
    getBalance();
    getWinner();
  }, []);

  function connectWallet() {
    connectMeta();
    setConnected(true);
  }
  function disconnect() {
    setConnected(false);
    setUser("");
  }

  return (
    <div>
      <h1>Lottery DApp</h1>
      <div className="connect" onClick={connectWallet}>
        {connected ? user.slice(0, 4) + "..." + user.slice(38) : "Connect"}
      </div>

      {connected ? (
        <>
          <div className="container">
            <p className="address">Contract Address: {contractAddress}</p>
            <p>Number of Players: {players.length}</p>
            <p>Contract Balance: {balance} MATIC</p>
            <p>Last Winner: {winner}</p>

            <button className="button" onClick={buyTicket}>
              Buy Ticket
            </button>
            <button className="button" onClick={pickWinner}>
              Pick Winner
            </button>
          </div>
          <div className="players">
            <h3>Players:</h3>
            <ul>
              {players.map((player, index) => (
                <li key={index}>{player}</li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <>
          <div className="container">
            <h3>Please connect wallet</h3>
          </div>
          <div className="container">
            "(If you want to change account, go to metamask, disconnect this
            account and select the account you want to connect. Finally refresh
            the page. )"
          </div>
        </>
      )}
    </div>
  );
}

export default App;

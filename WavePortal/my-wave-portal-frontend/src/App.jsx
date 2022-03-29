import React from "react";
import { ethers } from "ethers";
import './App.css';
import abi from "./utils/WavePortal.json";
import WaveList from "./components/WaveList/WaveList.jsx";
import Header from "./components/Header/Header.jsx";
import DataContext from './data/DataContext'
import WaveObject from './utils/WaveObject'
import Footer from "./components/Footer/Footer";

export default function App() {

  const [waves, setWaves] = React.useState([])
  //variable to change the UI after it's sure that connected and received the available waves
  const [connected, setConnected] = React.useState(false)
  const [contract, setContract] = React.useState()
  const contractAddress = "0x3af05686FCbD64DccFB4eE8D86fA7Ef8Ac328Fe9"
  const contractABI = abi.abi

  //function to run upon receiving a NewWave event
  const onNewWave = (from, timestamp, message, id) => {
    setWaves(prevState => [
      ...prevState,
      new WaveObject(from, new Date(timestamp * 1000), message, false, id),
    ])
  }
  //function to run upon receiving a NewWinner event
  const onNewWinner = async (address, message) => {
    const currentAccount = await getCurrentAccount()
    if (address.toUpperCase() == currentAccount.toUpperCase()) {
      alert(message)
    }
  }
  const getContract = () => {
    let wavePortalContract
    try {
      const { ethereum } = window
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer)
        setContract(wavePortalContract)
        wavePortalContract.on("NewWave", onNewWave);
        wavePortalContract.on("NewWinner", onNewWinner)
      } else {
        console.log("No wallet found")
      }
    } catch (error) {
      console.log(error)
    }
    return () => {
      if (wavePortalContract) {
        wavePortalContract.off("NewWave", onNewWave);
        wavePortalContract.off("NewWinner", onNewWinner)
      }
    };


  }

  const getWaves = async () => {
    try {
      const wavesBlockchain = await contract.getAllWaves()
      //set connected to true after it received the waves
      setConnected(true)
      setWaves(wavesBlockchain.map(wave => {
        return new WaveObject(wave.waver, new Date(wave.timestamp * 1000), wave.message, false, wave.id)
      }))
    } catch (error) {
      console.log(error)
    }

  }

  const getCurrentAccount = async () => {

    try {
      const { ethereum } = window

      const accounts = await ethereum.request({ method: "eth_accounts" })
      if (accounts.length !== 0) {
        return accounts[0]
      } else {
        console.log("No accounts there")
      }
    } catch (error) {
      console.log(error)
    }
    return null
  }


  const connectWallet = async () => {
    try {
      const { ethereum } = window

      if (!ethereum) {
        alert("Download Metamask and join Web3")
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      getWaves();
      //setCurrentAccount(accounts[0])
    } catch (error) {
      console.log(error)
    }
  }


  React.useEffect(getContract, [])


  return (
    <DataContext.Provider value={{ waves, setWaves, contract, getCurrentAccount }}>
      <div className="mainContainer">
        <Header className="headContainer"
          totalWaves={waves.length}
          connected={connected}
          connectWallet={connectWallet} />
        <WaveList waves={waves} />
        <Footer className="footerContainer"></Footer>
      </div>
    </DataContext.Provider>

  );
}

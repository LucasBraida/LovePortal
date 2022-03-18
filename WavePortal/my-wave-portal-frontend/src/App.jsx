import React from "react";
import { ethers } from "ethers";
import './App.css';
import abi from "./utils/WavePortal.json";
import DoubbleBubble from "./components/DoubleBubble/DoubleBubble.jsx";
import WaveList from "./components/WaveList/WaveList.jsx";
import Header from "./components/Header/Header.jsx";
import DataContext from './data/DataContext'
import WaveObject from './utils/WaveObject'
import Footer from "./components/Footer/Footer";

export default function App() {

  const [currentAccount, setCurrentAccount] = React.useState()
  const [minningOver, setMinningOver] = React.useState(true)
  const [waves, setWaves] = React.useState([])
  //variable to change the UI after it's sure that connected and received the available waves
  const [connected, setConnected] = React.useState(false)
  const [contract, setContract] = React.useState()
  //const contractAddress = "0x5254b542a98716e54aB07247362E04Aa12acCC8c"
  const contractAddress = "0x6C7077c85692384047fFFAdC7FD6841b6c6d0025"
  const contractABI = abi.abi

  const createWave = (address, timestamp, message, lovedInSession) => {
    return {
      address,
      timestamp,
      message,
      lovedInSession
    }
  }

  const setWaveAsLovedInSession = (wave) => {
    const newWaves = waves.map(el => JSON.stringify(el) === JSON.stringify(wave) ?
      { ...el, lovedInSession: true }
      : el)
    setWaves(newWaves)
  }

  const getContract = () => {
    const { ethereum } = window
    const onNewWave = (from, timestamp, message) => {
      console.log("event happened")
      setWaves(prevState => [
        ...prevState,
        new WaveObject(from, new Date(timestamp * 1000), message, false),
        //createWave(from, new Date(timestamp * 1000), message, false),
      ])
    }
    const onNewWinner = (address, message) => {
      console.log("Event happended with winner")
      if(address === currentAccount){
        alert(message)
      }
    }
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer)
      setContract(wavePortalContract)
      //Set event listener to add a new wave to the waves variable every time the contract emits a new "NewWave" event
      wavePortalContract.on("NewWave", onNewWave);
      wavePortalContract.on("NewWinner", onNewWinner)
    } else {
      console.log("No wallet found")
    }
  }

  const getWaves = async () => {
    try {
      console.log(contract)

      const wavesBlockchain = await contract.getAllWaves()
      //set connected to true after it received the waves
      setConnected(true)
      setWaves(wavesBlockchain.map(wave => {
        return new WaveObject(wave.waver, new Date(wave.timestamp * 1000), wave.message, false)
        //return createWave(wave.waver, new Date(wave.timestamp * 1000) , wave.message, false)
      }))
    } catch (error) {
      console.log(error)
    }

  }

  const getOkayToWave = async (account) => {
    const okay = await contract.isWaverOkayToWave(account)
    console.log(okay)
    return okay
  }
  const wave = async (messageParam) => {
    try {
      const { ethereum } = window

      if (ethereum) {
        console.log(currentAccount)
        const okayToWave = await getOkayToWave(currentAccount)
        if (okayToWave) {
          if (messageParam.length > 0) {
            const waveWait = await contract.wave(messageParam, { gasLimit: 300000 })
            setMinningOver(false)
            await waveWait.wait()
            setMinningOver(true)
          } else {
            alert("A wave with a message is sooo much more special")
          }
        } else {
          alert("Wait a momment waver! We need a little time to breathe")
        }

      } else {
        console.log("No wallet found")
      }
    } catch (error) {
      console.log(error)
    }

  }



  const checkIfWalletisConnected = async () => {

    try {

      const { ethereum } = window

      const accounts = await ethereum.request({ method: "eth_accounts" })

      if (accounts.length !== 0) {
        console.log("Look a wallet address:" + accounts[0])
        setCurrentAccount(accounts[0])
      } else {
        console.log("No accounts there")
      }
    } catch (error) {
      console.log(error)
    }

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
      console.log(waves)
      setCurrentAccount(accounts[0])
    } catch (error) {
      console.log(error)
    }
  }

  function changeMessage(e) {
    setMessage(e.target.value)
  }

  React.useEffect(() => {
    getContract()
    return () => {
      if (contract) {
        contract.off("NewWave", onNewWave);
        contract.off("NewWinner", onNewWinner)
      }
    };
  }, [])



  return (
    <DataContext.Provider value={{ waves, setWaves, contract }}>
      <div className="mainContainer">
        <Header className="headContainer"
          totalWaves={waves.length}
          connected={connected}
          currentAccount={currentAccount}
          minningOver={minningOver}
          wave={wave}
          connectWallet={connectWallet} />
        <WaveList waves={waves} />
        <Footer className="footerContainer"></Footer>
      </div>
    </DataContext.Provider>

  );
}

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

  const [currentAccount, setCurrentAccount] = React.useState("")
  const [minningOver, setMinningOver] = React.useState(true)
  const [waves, setWaves] = React.useState([])
  //variable to change the UI after it's sure that connected and received the available waves
  const [connected, setConnected] = React.useState(false)
  const [contract, setContract] = React.useState()
  //const contractAddress = "0xDb0Ebd67f440d78C7E71e902C6DE680bB80166d0"
  const [waveMinning, setWaveMinning] = React.useState(false)
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
        //const accounts =  ethereum.request({ method: "eth_requestAccounts" });
        setContract(wavePortalContract)
        //Set event listener to add a new wave to the waves variable every time the contract emits a new "NewWave" event
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

  /*const getOkayToWave = async (account) => {
    const okay = await contract.isWaverOkayToWave(account)
    //console.log(okay)
    return okay
  }
  /*const wave = async (messageParam) => {
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

  }*/



  /*const checkIfWalletisConnected = async () => {

    try {
      const { ethereum } = window

      const accounts = await ethereum.request({ method: "eth_accounts" })

      if (accounts.length !== 0) {
        console.log("Look a wallet address:" + accounts[0])
        setCurrentAccount(accounts[0])
        console.log(currentAccount)
      } else {
        console.log("No accounts there")
      }
    } catch (error) {
      console.log(error)
    }
  }*/
  //reset current Account if it change after the connect button
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
      setCurrentAccount(accounts[0])
    } catch (error) {
      console.log(error)
    }
  }

 
  React.useEffect(getContract, [])
  //console.log(waves)

  return (
    <DataContext.Provider value={{ waves, setWaves, contract, currentAccount, getCurrentAccount, waveMinning, setWaveMinning }}>
      <div className="mainContainer">
        <Header className="headContainer"
          totalWaves={waves.length}
          connected={connected}
          currentAccount={currentAccount}
          minningOver={minningOver}
          //wave={wave}
          connectWallet={connectWallet} />
        <WaveList waves={waves} />
        <Footer className="footerContainer"></Footer>
      </div>
    </DataContext.Provider>

  );
}

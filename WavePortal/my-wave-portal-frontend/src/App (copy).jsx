import React from "react";
import { ethers } from "ethers";
import './App.css';
import abi from "./utils/WavePortal.json"
import DoubbleBubble from "./components/DoubleBubble/DoubleBubble.jsx"
import Wave from "./components/Wave/Wave.jsx"
export default function App() {

  const [currentAccount, setCurrentAccount] = React.useState()
  const [totalWaves, setTotalWaves] = React.useState()
  const [minningOver, setMinningOver] = React.useState(true)
  const [waves, setWaves] = React.useState([])
  const contractAddress = "0x66987b76C6Fa23633Dd97F919aabA8e687bA18Fa"
  const contractABI = abi.abi
  const [contract, setContract] = React.useState()
  const getContract = () => {
    const { ethereum } = window

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer)
      setContract(wavePortalContract)
    } else {
      console.log("No wallet found")
    }
  }

  const getWaves = async () => {
    try {

      const wavesBlockchain = await contract.getAllWaves()
      setWaves(wavesBlockchain.map(wave => {
        return {
          address: wave.waver,
          timestamp: new Date(wave.timestamp * 1000),
          message: wave.message
        }
      }))
    } catch (error) {
      console.log(error)
    }

  }
  const getTotalWaves = async () => {
    try {

      let count = await contract.getTotalWaves()
      setTotalWaves(count)


    } catch (error) {
      console.log(error)
    }
  }

  const wave = async () => {
    try {
      const { ethereum } = window

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer)
        const waveWait = await wavePortalContract.wave("I'm waving", { gasLimit: 300000 })
        setMinningOver(false)
        await waveWait.wait()
        setMinningOver(true)
        let count = await wavePortalContract.getTotalWaves()
        setTotalWaves(count)
        getWaves()
        console.log("There are " + count.toNumber() + " waves")

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
      getTotalWaves();
      getWaves();
      console.log("Connected", accounts[0])
      setCurrentAccount(accounts[0])
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    //checkIfWalletisConnected()
    //getTotalWaves()
    getContract()
  }, [])
  return (
    <div className="mainContainer">

      <div className="headContainer">
        <div className="header">
          👋 Hey there!
        </div>


        {totalWaves
          ? <div className="bio">
            {`We've had ${totalWaves} waves so far. Gives us a wave too`}
          </div>
          : <div className="bio">
            {`Connect your wallet and wave at me`}
          </div>}


        {currentAccount
          ? <button className="waveButton" onClick={wave}>
            Wave at Me
          </button> :
          <button className="waveButton" onClick={connectWallet}>
            Connect your Wallet
        </button>}
        {!minningOver && <DoubbleBubble speed={5} customText="Waiting those miners" />}


      </div>
      <div className="dataContainer">
        <Wave key="1" address="Blabla" timestamp="Blabla" message="BlablaBlablaBlablaBlablaBlablaBlablaBlablaBlablaBlablaBlablaBlablaBlablaBlablaBlablaBlablaBlablaBlablaBlablaBlablaBlablaBlablaBlablaBlablaBlablaBlablaBlablaBlablaBlablaBlablaBlabla BlablaBlablaBlablaBlablaBlablaBlablaBlablaBlablaBlabla"/>
        {waves.map((wave, index) => {
          return (<Wave key={index} address={wave.address} timestamp={wave.timestamp} message={wave.message}/>
          )
        })}
      </div>
    </div>
  );
}

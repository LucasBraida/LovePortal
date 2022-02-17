import React from "react";
import { ethers } from "ethers";
import './App.css';
import abi from "./utils/WavePortal.json"
import DoubbleBubble from "./components/DoubleBubble/DoubleBubble.jsx"
import WaveList from "./components/WaveList/WaveList.jsx"
import Header from "./components/Header/Header.jsx"

export default function App() {

  const [currentAccount, setCurrentAccount] = React.useState()
  const [totalWaves, setTotalWaves] = React.useState()
  const [minningOver, setMinningOver] = React.useState(true)
  const [waves, setWaves] = React.useState([{address: "Blabla", timestamp: "Blabla", message: "Blabla"}])
  const [contract, setContract] = React.useState()
  const [message, setMessage] = React.useState("")
  const contractAddress = "0x66987b76C6Fa23633Dd97F919aabA8e687bA18Fa"
  const contractABI = abi.abi
  
  const getContract = () => {
    const { ethereum } = window
    const onNewWave = (from, timestamp, message) => {
    console.log("NewWave", from, timestamp, message);
    setWaves(prevState => [
      ...prevState,
      {
        address: from,
        timestamp: new Date(timestamp * 1000),
        message: message,
      },
    ]);
  };
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer)
      setContract(wavePortalContract)
      wavePortalContract.on("NewWave", onNewWave);
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
        if(message.length > 0){
          const waveWait = await contract.wave(message, { gasLimit: 300000 })
          setMinningOver(false)
          await waveWait.wait()
          setMinningOver(true)
          setMessage("")
          let count = await contract.getTotalWaves()
          setTotalWaves(count)
          getWaves()
          console.log("There are " + count.toNumber() + " waves")
      }else{
        alert("A wave with a message is sooo more special")
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
      getTotalWaves();
      getWaves();
      console.log(accounts)
      setCurrentAccount(accounts[0])
    } catch (error) {
      console.log(error)
    }
  }

  function changeMessage(e) {
    setMessage(e.target.value)
  }
  React.useEffect(() => {
    //checkIfWalletisConnected()
    //getTotalWaves()
    getContract()
    return () => {
    if (contract) {
      contract.off("NewWave", onNewWave);
    }
  };
  }, [])

  
  return (
    <div className="mainContainer">
      <Header className="headContainer"
        totalWaves={totalWaves} 
        currentAccount={currentAccount} 
        minningOver={minningOver} 
        wave={wave} 
        message={message} 
        changeMessage ={changeMessage}
        connectWallet={connectWallet}/>
      <WaveList waves={waves}/>
    </div>
  );
}

/*
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
          ?(minningOver
          ? <div>
            <button className="waveButton" onClick={wave}>
            Wave at Me
            </button>
            <form onSubmit={(e) => {e.preventDefault()}}>
               <textarea
                  className="message"
                  type="text" 
                  placeholder="Sent us something funny"
                  value={message}
                  onChange={changeMessage}
               />
              </form>
            </div> 
          
          : <DoubbleBubble speed={5} customText="Waiting those miners" /> ):
          <button className="waveButton" onClick={connectWallet}>
            Connect your Wallet
        </button>
        }
      </div>
*/ 
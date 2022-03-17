import React from "react"
import "./Header.css"
import DoubbleBubble from "../DoubleBubble/DoubleBubble.jsx";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

function HeaderInput(props) {
  const [message, setMessage] = React.useState("")

  const changeMessage = (e) => {
    setMessage(e.target.value)
  }

  const sendWave = async () => {
    await props.wave(message)
    setMessage("")
  }
  return (
    <div className="headerInput">
      {props.minningOver
        ? <div className="headerInput">
          <button className="waveButton" onClick={sendWave}>
            Wave at Me

          </button>
          <form onSubmit={(e) => { e.preventDefault() }}>
            <textarea
              className="message"
              type="text"
              placeholder="Sent us something funny"
              value={message}
              onChange={changeMessage}
            />
          </form>
        </div>

        : <DoubbleBubble speed={5} customText="Waiting those beautifull miners" />}
    </div>
  )
}

export default function Header(props) {

  return (
    <div className="headContainer">
      <div className="header">
        👋 Hey there!
      </div>
      {/*Check if we'are communicating with the blockchain and were able to get the waves*/}
      {props.connected
        ? <>
          <div className="bio">
            {`We've had ${props.totalWaves} waves so far. Gives us a wave too`}
          </div>
          <HeaderInput minningOver={props.minningOver} wave={props.wave} message={props.message} changeMessage={props.changeMessage} />
        </>
        : <>
          <div className="bio">
            {`Connect your wallet and wave at me`}
          </div>
          <button className="waveButton" onClick={props.connectWallet}>
            Connect your Wallet
          </button>
        </>}

    </div>
  )
}

/*
return(
      <div className="headContainer">
        <div className="header">
          👋 Hey there!
        </div>
        {props.totalWaves
          ? <div className="bio">
            {`We've had ${props.totalWaves} waves so far. Gives us a wave too`}
          </div>
          : <div className="bio">
            {`Connect your wallet and wave at me`}
          </div>}


        {props.currentAccount
          ?
          <HeaderInput minningOver={props.minningOver} wave={props.wave} message={props.message} changeMessage ={props.changeMessage}/>
          :<button className="waveButton" onClick={props.connectWallet}>
            Connect your Wallet
        </button>

        }

      </div>
  )
*/

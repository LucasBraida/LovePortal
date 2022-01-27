import React from "react"
import "./Header.css"
import DoubbleBubble from "../DoubleBubble/DoubleBubble.jsx"

function HeaderInput(props){
    return(
      <div className="headerInput">
        {props.minningOver
          ? <div className="headerInput">
            <button className="waveButton" onClick={props.wave}>
            Wave at Me
            </button>
            <form onSubmit={(e) => {e.preventDefault()}}>
               <textarea
                  className="message"
                  type="text" 
                  placeholder="Sent us something funny"
                  value={props.message}
                  onChange={props.changeMessage}
               />
              </form>
            </div> 
          
          : <DoubbleBubble speed={5} customText="Waiting those beautifull miners" /> }
      </div>
    )
  }

export default function Header(props){

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
}
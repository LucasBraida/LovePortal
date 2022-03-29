import React from "react"
import "./Header.css"
import DoubbleBubble from "../DoubleBubble/DoubleBubble.jsx";
import DataContext from "../../data/DataContext";

function HeaderInput(props) {
  const [message, setMessage] = React.useState("")
  const messageMaxLength = 100
  const context = React.useContext(DataContext)
  const [minningOver, setMinningOver] = React.useState(true)
  const getOkayToWave = async (account) => {
    const okay = await context.contract.isWaverOkayToWave(account)
    //console.log(okay)
    return okay
  }
  const wave = async (messageParam) => {
    try {
      const { ethereum } = window

      if (ethereum) {
        //console.log(currentAccount)
        const currentAccount = await context.getCurrentAccount()
        const okayToWave = await getOkayToWave(currentAccount)
        if (okayToWave) {
          if (messageParam.length > 0) {
            const waveWait = await context.contract.wave(messageParam, { gasLimit: 300000 })
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
  const changeMessage = (e) => {
    setMessage(e.target.value)
  }

  const sendWave = async () => {
    await wave(message)
    setMessage("")
  }
  return (
    <div className="headerInput">
      {minningOver
        ? <div className="headerInput">
          <button className="waveButton" onClick={sendWave}>
            Wave at Us

          </button>
          <div className="headerInput--textarea">
            <form onSubmit={(e) => { e.preventDefault() }}>
              <textarea
                className="headerInput--message"
                type="text"
                placeholder="Sent us something funny or cute"
                value={message}
                onChange={changeMessage}
                maxLength={messageMaxLength}
              />
            </form>
            <div className="headerInput--counter">
              <span>{message.length}</span>
              <span>/{messageMaxLength}</span>
            </div>
          </div>
        </div>

        : <DoubbleBubble speed={5} customText="Waiting those beautifull miners" />}
    </div>
  )
}

export default function Header(props) {

  return (
    <div className="headContainer">
      <div className="header">
        ❤️ Hey there!
      </div>
      {/*Check if we'are communicating with the blockchain and were able to get the waves*/}
      {props.connected
        ? <>
          <div className="header--bio">
            {`We've had ${props.totalWaves} waves so far. Gives us one too.`}
            <br></br>
            If someone likes your message, they can send you some eth-love (love in the form of eth)
            <br></br>
            And you can do that too!!!!!!
          </div>
          <HeaderInput /*minningOver={props.minningOver}*/ wave={props.wave} message={props.message} changeMessage={props.changeMessage} />
        </>
        : <>
          <div className="bio">
            {`Connect your wallet using the Rinkeby Testnet and send a nice love-wave`}
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

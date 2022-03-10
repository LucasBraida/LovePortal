import React from "react"
import "./MessageWindow.css"
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const MessageWindow = React.forwardRef((props, ref) => {
  const [checked, setChecked] = React.useState(false)

  function checkboxNotShowAgain() {
    setChecked(prev => !prev)

  }
  function confirmNotShowAgain(){
    if(checked){
      props.doNotShowModal()

    }
    props.closeModal()
    props.confirmSendLove()
  }
  return (
    <div className="messageWindow">
      <h2 className="messageWindow--title">Send Love</h2>
      <div className="messageWindow--text">
        <p >Hello, lover person!
          <br></br>
          <br></br>
          Did you like that fun message? Me too!!! 😍 😍 😍
          <br></br>
          We have a cool way for you to show your apreciation (and maybe win some juicy eth 😋).
          <br></br>
          <br></br>
          <strong>Here is how the game works:</strong>
          <br></br>
        </p>
        <ul>
          <li>First, you send a tiny bit of eth (just to make sure the contract doesn't run out of money so we can all play).</li>
          <li>Second, you and the person that sent the message get a chance to win a LOT of eth 🤑 🤑 🤑 🤑 (it's not that much, but it's more than what you paid).</li>
          <li>Third,... That's it!</li>
          <li>Fourth, you find a new message and send some more love across the blockchain  ❤️❤️❤️❤️❤️❤️</li>
        </ul>
      </div>

      <div>
        <label className="messageWindow--checkbox">
          <input type="checkbox" checked={checked} onChange={() => {setChecked(prev => !prev)}} />
          I understand how this works and don't want to see this again
        </label>
      </div>
      <div className="messageWindow--buttons--div">
        <button className="messageWindow-button cancel" onClick={props.closeModal}>CANCEL</button>
        <button className="messageWindow-button confirm" onClick={confirmNotShowAgain}>CONFIRM</button>
      </div>
    </div>
  )


})

export default MessageWindow

/*<Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>

        </Box>*/

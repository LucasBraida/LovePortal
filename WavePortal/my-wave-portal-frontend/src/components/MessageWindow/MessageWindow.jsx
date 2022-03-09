import React from "react"
import "./MessageWindow.css"
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const MessageWindow = React.forwardRef((props, ref) => {
        const [checked, setChecked] = React.useState(false)

        function checkboxNotShowAgain(){
          setChecked(prev => !prev)
        }
        return (
            <div className="messageWindow">
                <h2 className="messageWindow--title">Send Love</h2>
                <p className="messageWindow--text">Hello, lover person!
                    <br></br>
                    <br></br>
                   Did you like that fun message? Me too!!! 😍 😍 😍
                   <br></br>
                   We have a cool way for you to show your apreciation (and maybe win some juicy eth 😋).
                   <br></br>
                   <br></br>
                   <strong>Here is how the game works:</strong>
                   <br></br>
                   <ul>
                     <li>First, you send a tiny bit of eth (just to make sure the contract doesn't run out of money so we can all play).</li>
                     <li>Second, you and the person that sent the message get a chance to win a LOT of eth 🤑 🤑 🤑 🤑 (it's not that much, but it's more than what you paid).</li>
                     <li>Third,... That's it!</li>
                     <li>Fourth, you find a new message and send some more love across the blockchain  ❤️❤️❤️❤️❤️❤️</li>
                   </ul>
                </p>

                <div className="messageWindow--buttons">
                  <button>CANCEL</button>
                  <button>CONFIRM</button>
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
                <div>
                  <label>
                    <input type="checkbox" checked={checked} onChange={che}/>
                    I understand how this works and don't want to see this again
                  </label>
                </div>
        </Box>*/

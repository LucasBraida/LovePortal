//import { Modal } from "@mui/material"
import React from "react"
//import MessageWindow from "../MessageWindow/MessageWindow.jsx";
import Wave from "../Wave/Wave.jsx"
import "./WaveList.css"

export default function WaveList(props) {
  const [open, setOpen] = React.useState(false)
  //Variable to mantain the user's choice, in the checkbox, to not see the Modal
  const [showModal, setShowModal] = React.useState(true)
  const [heartClicked, setHeartClicked] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  function sortWaves(waveOne, waveTwo) {
    if (waveOne.timestamp > waveTwo.timestamp) {
      return -1
    } else {
      return 1
    }
  }

  const waveElements = props.waves.sort(sortWaves).map((wave, index) => {
    return (<Wave key={index} address={wave.address} timestamp={wave.timestamp} message={wave.message}
            doNotShowModal={() =>{setShowModal(false)}}
            showModal={showModal}
            lovedInSession={wave.lovedInSession}
            />
    )
  })
  //console.log(props.waves)
  return (
    <div className="dataContainer">
      {/*<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <MessageWindow closeModal={handleClose} doNotShowModal={() =>{setShowModal(false)}} confirmSendLove={() => {setHeartClicked(true)}}/>
        </Modal>*/}
      {waveElements}
    </div>
  )
}

/*
<Wave key={index} address={wave.address} timestamp={wave.timestamp} message={wave.message}
            handleModal={showModal ? handleOpen : handleClose}
            showModal={showModal}
            heartClicked={heartClicked}/>
*/

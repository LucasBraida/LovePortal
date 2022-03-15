import React from "react"
import LoveButton from '../LoveButton/LoveButton'
import "./Wave.css"
import { Modal } from "@mui/material"
import MessageWindow from "../MessageWindow/MessageWindow.jsx";
import DataContext from "../../data/DataContext";

export default function Wave(props) {
  const [open, setOpen] = React.useState(false)

  const context = React.useContext(DataContext)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const waveObject = {
    address: props.address,
    timestamp: props.timestamp,
    message: props.message,
    lovedInSession: props.lovedInSession
  }

  const setLoved = (waveObj) =>{
    const newWaves = context.waves.map(el => JSON.stringify(el) === JSON.stringify(waveObj) ?
    {...el, lovedInSession: true}
    : el)
    context.setWaves(newWaves)
  }

  const confirmSendLove = () => {
    setLoved(waveObject)
  }
  return (
    <div className="wave" >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <MessageWindow closeModal={handleClose} doNotShowModal={props.doNotShowModal} confirmSendLove={confirmSendLove}
          setLoved = {() => {setLoved(waveObject)}}/>
      </Modal>
      <div className="wave--address wave--info--position wave--left--border">
        <span className="title">Address:</span>
        <span className="content">{props.address}</span></div>
      <div className="wave--message wave--info--position wave--left--border">
        <span className="title">Message:</span>
        <span>{props.message}</span></div>
      <div className="wave--timestamp wave--info--position ">
        <span className="title">Time:</span>
        <span className="content">{props.timestamp.toString()}</span>
      </div>
      <div className="wave--button"><LoveButton onClick={props.lovedInSession ? () => {} : handleOpen} showModal={props.showModal} confirmSendLove={confirmSendLove}
        lovedInSession={props.lovedInSession}
      ></LoveButton></div>

    </div>
  )
}

/*<LoveButton onClick={props.handleModal} showModal={props.showModal} heartClicked={props.heartClicked}></LoveButton> */

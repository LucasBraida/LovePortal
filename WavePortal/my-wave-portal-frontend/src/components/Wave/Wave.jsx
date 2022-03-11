import React from "react"
import LoveButton from '../LoveButton/LoveButton'
import "./Wave.css"
import { Modal } from "@mui/material"
import MessageWindow from "../MessageWindow/MessageWindow.jsx";
export default function Wave(props) {
  const [clicked, setClicked] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  //Variable to mantain the user's choice, in the checkbox, to not see the Modal
  const [showModal, setShowModal] = React.useState(true)
  const [heartClicked, setHeartClicked] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <div className="wave" >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <MessageWindow closeModal={handleClose} doNotShowModal={props.doNotShowModal} confirmSendLove={() => {setHeartClicked(true)}}/>
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
      <div className="wave--button"><LoveButton onClick={handleOpen} showModal={props.showModal} heartClicked={heartClicked} confirmSendLove={() => {setHeartClicked(true)}}></LoveButton></div>

    </div>
  )
}

/*<LoveButton onClick={props.handleModal} showModal={props.showModal} heartClicked={props.heartClicked}></LoveButton> */

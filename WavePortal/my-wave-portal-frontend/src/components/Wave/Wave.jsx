import React from "react"
import LoveButton from '../LoveButton/LoveButton'
import "./Wave.css"
import { Modal } from "@mui/material"
import MessageWindow from "../MessageWindow/MessageWindow.jsx";
import DataContext from "../../data/DataContext";
import { ethers } from "ethers";
export default function Wave(props) {
  const [open, setOpen] = React.useState(false)
  const [waitingSendLove, setWaitingSendLove] = React.useState(false)
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

  const confirmSendLove = async (waveObj) => {
    try{
      const sendLove =  await context.contract.sendLove(props.address, { gasLimit: 300000, value: ethers.utils.parseEther('0.0001') })
      //alert("Waiting to confirm your transaction")
      setWaitingSendLove(true)
      await sendLove.wait()
      setWaitingSendLove(false)
      setLoved(waveObject)
    }catch(error){
      alert("Something went wrong with your transaction")
      setWaitingSendLove(false)
      //console.log(error)
    }
    //console.log("Chegamos até aqui")
  }

  const tryTest = (num) =>{
    try{
      const res = 10/num
      console.log("Depois do possivel erro")
      console.log(res)
    }catch(error){

      console.log("Pego no erro")
    }
    console.log("Final da funcao")
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
        loading={waitingSendLove}
      ></LoveButton></div>

    </div>
  )
}

/*<LoveButton onClick={props.handleModal} showModal={props.showModal} heartClicked={props.heartClicked}></LoveButton> */

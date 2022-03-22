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
  //console.log("contexto na wave " + props.message)
  //console.log(context)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [change, setChange] = React.useState(false)
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
  const alterwaveObject = () =>{
    waveObject.lovedInSession = true
  }
  const confirmSendLove = async (waveObj) => {
    //get account in use
    const currentAccount = await context.getCurrentAccount()
    try{
      //meka sure users are not trying to send love to themselves
      if(currentAccount.toUpperCase() === props.address.toUpperCase()){
        alert("It's no fun sending love to yourself. Spread the love")
      }else{
        const sendLove =  await context.contract.sendLove(props.address, { gasLimit: 300000, value: ethers.utils.parseEther('0.0001') })
      //alert("Waiting to confirm your transaction")
      setWaitingSendLove(true)
      await sendLove.wait()
      setWaitingSendLove(false)
      //alterwaveObject()
      setChange(true)
      //setLoved(waveObject)
      }

    }catch(error){
      alert("Something went wrong with your transaction")
      setWaitingSendLove(false)
      //console.log(error)
    }
    //console.log("Chegamos até aqui")
  }

  React.useEffect(()=>{
    if(change){
      const newWaves = context.waves.map(el => JSON.stringify(el) === JSON.stringify(waveObject) ?
      {...el, lovedInSession: true}
      : el)
      context.setWaves(newWaves)
    }



  }, [change])
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

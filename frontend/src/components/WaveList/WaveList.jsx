//import { Modal } from "@mui/material"
import React from "react"
import DataContext from "../../data/DataContext.js"
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
  const context = React.useContext(DataContext)
  function sortWaves(waveOne, waveTwo) {
    if (waveOne.timestamp > waveTwo.timestamp) {
      return -1
    } else {
      return 1
    }
  }

  let waveElements = [...props.waves]
  waveElements = waveElements.sort(sortWaves).map((wave) => {
    return (<Wave key={wave.id} address={wave.address} timestamp={wave.timestamp} message={wave.message} id={wave.id}
            doNotShowModal={() =>{setShowModal(false)}}
            showModal={showModal}
            lovedInSession={wave.lovedInSession}
            />
    )
  })

  /*const waveElements3 = context.waves.map((wave, index) => {
    return (<Wave key={index} address={wave.address} timestamp={wave.timestamp} message={wave.message}
            doNotShowModal={() =>{setShowModal(false)}}
            showModal={showModal}
            lovedInSession={wave.lovedInSession}
            />
    )
  })
  const [stateWaveEl, setStateWaveEl] = React.useState(waveElements)*/
  //console.log("State Wave El")
  //console.log(stateWaveEl)
  /*const waveElements = props.waves.map((wave, index) => {
    return (<Wave key={index} address={wave.address} timestamp={wave.timestamp} message={wave.message}
            doNotShowModal={() =>{setShowModal(false)}}
            showModal={showModal}
            lovedInSession={wave.lovedInSession}
            />
    )
  })*/
  //console.log(props.waves)
  /*React.useEffect(()=>{
    console.log("runnig this")
    const waveElements2 = props.waves.sort(sortWaves).map((wave, index) => {
      return (<Wave key={wave.timestamp} address={wave.address} timestamp={wave.timestamp} message={wave.message}
              doNotShowModal={() =>{setShowModal(false)}}
              showModal={showModal}
              lovedInSession={wave.lovedInSession}
              />
      )
    })
    setStateWaveEl(waveElements2)
  },[])*/
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

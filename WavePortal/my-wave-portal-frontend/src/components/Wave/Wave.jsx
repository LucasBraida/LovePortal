import React from "react"
import LoveButton from '../LoveButton/LoveButton'
import "./Wave.css"


export default function Wave(props) {
  const [clicked, setClicked] = React.useState(false)

  return (
    <div className="wave" >
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
      <div className="wave--button"><LoveButton onClick={props.handleOpen}></LoveButton></div>

    </div>
  )
}

import React from "react"
import Wave from "../Wave/Wave.jsx"
import "./WaveList.css"

export default function WaveList(props){

  function sortWaves(waveOne, waveTwo){
    if(waveOne.timestamp > waveTwo.timestamp){
      return -1
    } else{
      return 1
    }
  }

  const waveElements= props.waves.sort(sortWaves).map((wave, index) => {
          return (<Wave key={index} address={wave.address} timestamp={wave.timestamp} message={wave.message}/>
          )
        })
  return (
    <div className="dataContainer">
      {waveElements}
    </div>
  )
}
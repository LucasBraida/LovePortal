import React from "react"
import IconButton from '@mui/material/IconButton';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
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
      <div>
      <IconButton className="wave--gap"color="secondary" aria-label="upload picture" size="large" component="span" onClick={()=>{setClicked(prev => !prev)}} >
          {!clicked?
          <FavoriteBorderRoundedIcon fontSize="inherit" style={{ color: 'pink' }}/>
          : <FavoriteRoundedIcon fontSize="inherit" style={{ color: 'pink' }}/>}

        </IconButton>
      </div>
    </div>
  )
}

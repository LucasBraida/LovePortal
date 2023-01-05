import React from "react"
import './Footer.css'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
export default function Footer(props){
    return (
        <footer className="footerContainer">
            <h4>Made with <span><FavoriteRoundedIcon fontSize="inherit" style={{ color: 'red' }} /></span> by Lucas Braida. <a href='https://lucasbraida.com' target="_blank">Come check more cool stuff</a></h4>
            <h4>With the beautiful background image <a href='https://www.freepik.com/vectors/watercolor'target="_blank">Watercolor vector created by renata.s - www.freepik.com</a></h4>
        </footer>
    )
}

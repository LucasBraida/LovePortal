import React from "react"
import IconButton from '@mui/material/IconButton';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { Tooltip } from "@mui/material";
import { withStyles } from '@mui/styles';

export default function Wave(props) {
    const [clicked, setClicked] = React.useState(false)
    const StyledTooltip = withStyles({
        tooltipPlacementTop: {
            top: "8px",
        },
    })(Tooltip);
    return (
            <StyledTooltip title="Send Love" placement="top" arrow disableHoverListener={props.heartClicked}>
                <IconButton color="secondary" size="large" onClick={() => {
                    if(props.showModal){
                        props.onClick()
                    }else {
                        props.confirmSendLove()
                    }
                    setClicked(prev => !prev)

                    }} >
                    {!props.heartClicked ?
                        <FavoriteBorderRoundedIcon fontSize="inherit" style={{ color: 'pink' }} />
                        : <FavoriteRoundedIcon fontSize="inherit" style={{ color: 'pink' }} />}

                </IconButton>
            </StyledTooltip>



    )
}

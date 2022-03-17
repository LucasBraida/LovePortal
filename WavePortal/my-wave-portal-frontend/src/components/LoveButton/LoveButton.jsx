import React from "react"
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { Tooltip } from "@mui/material";
import { withStyles } from '@mui/styles';

const LoveIcon = (props) => {
    return(
        !props.lovedInSession ?
            <FavoriteBorderRoundedIcon fontSize="large" style={{ color: 'pink' }} />
            : <FavoriteRoundedIcon fontSize="large" style={{ color: 'pink' }} />
    )

}
export default function Wave(props) {
    const StyledTooltip = withStyles({
        tooltipPlacementTop: {
            top: "8px",
        },
    })(Tooltip);
    return (
        <StyledTooltip title="Send Love" placement="top" arrow disableHoverListener={props.lovedInSession || props.loading}>
                <span>
                    <LoadingButton loading={props.loading} size="large" onClick={() => {
                        if (props.showModal) {
                            props.onClick()
                        } else {
                            props.confirmSendLove()
                        }

                    }} >
                        {props.loading?
                        <></>
                    :<LoveIcon lovedInSession={props.lovedInSession}></LoveIcon>}

                    </LoadingButton>
                </span>
        </StyledTooltip>



    )
}
/*{!props.lovedInSession ?
                            <FavoriteBorderRoundedIcon fontSize="large" style={{ color: 'pink' }} />
                            : <FavoriteRoundedIcon fontSize="large" style={{ color: 'pink' }} />} */

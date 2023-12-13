import React from 'react';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

import "./Login.css";

function Login(props) {
    return (
        <div className="login">
        {/* <button onClick={props.onClick}>Login to Spotify <FontAwesomeIcon icon={icon({name: 'spotify', style: 'brands'})} /></button> */}
            <Button variant="contained" onClick={props.onClick}>
                Login to Spotify
                <FontAwesomeIcon icon={icon({name: 'spotify', style: 'brands'})} />
            </Button>
        </div>
    )
}

export default Login;
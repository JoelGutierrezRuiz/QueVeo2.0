//imports
import React from "react";
import "../Css/Film.css"
//imports

function Film(){
    return(
        <div className="main__film">
            <img className="film-background" src="https://wallpaperaccess.com/full/5112240.jpg"></img>
            <div className="film-info-container">
                <p className="film-info-channel">Paramount</p>
                <img className="film-info-channelLogo"></img>
                <h2 className="film-info-title">Rick y morty</h2>
                <p className="film-info-sipnosis">Esta es la sipnosis</p>
            </div>
        </div>
    );
}

export default Film;
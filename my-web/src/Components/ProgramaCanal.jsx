//imports
import React from "react";
import "../Css/Cine.css"
//imports

function ProgramaCanal (props) {
    return(
        
        <div className="cine-peli">
        <div className="cine-peli-info">
            <p>{props.title}</p>
        </div>
        <div className="cine-peli-img-container">
            <div className="cine-peli-img-canal-logo-container">
                <img className="cine-peli-img-canal-logo" src={props.logo}></img>
            </div>


            
            <div className="cine-peli-rating-container">

                <div className="cine-peli-rating-imdbLogo-container">
                    <img className="cine-peli-rating-imdbLogo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"></img>
                </div>


                <p className="cine-peli-rating-number">5,6</p>
            </div>
            
            <img src={props.img} ></img>
        </div>
        
    </div>
    )
}

export default ProgramaCanal;
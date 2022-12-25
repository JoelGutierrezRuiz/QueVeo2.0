//imports
import React from "react";
import "../Css/ProgramaCanal.css"
//imports

function ProgramaCanal (props) {
    return(
        
        <div className="main__programa">

        <div className="programa-info">
            <p>{props.time}</p>
        </div>

        <div className="programa-container">

            <p className="programa-titulo">
                {props.title}
            </p>


            <div className="programa-canal-logo-container">
                <img className="programa-canal-logo" src={props.logo}></img>
            </div>

            
            <img className="programa-img" src={props.img} ></img>

        </div>
        
    </div>
    )
}

export default ProgramaCanal;
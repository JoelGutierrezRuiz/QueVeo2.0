//imports
import React from "react";
import { useRef } from "react";
import "../Css/ProgramaCanal.css"
//imports

function ProgramaCanal (props) {

    const element = useRef(null)

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

            {
            props.img?<img className="programa-img" ref={element} src={props.img} ></img>:null
            }
        </div>
        
    </div>
    )
}

export default ProgramaCanal;
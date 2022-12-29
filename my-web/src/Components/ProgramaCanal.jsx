//imports
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import "../Css/ProgramaCanal.css"
import {AiOutlineClose} from 'react-icons/ai'
//imports

function ProgramaCanal (props) {

    const element = useRef(null)
    const [infoContainer,setInfoContainer] = useState(false);
    const puntuacion = useRef(null)
    const [imdb,setImdb] = useState(false);


    const LoadImdb = async ()=>{
        await fetch(`https://que-veo2-0-api.vercel.app/programas/${props.title}`,{method:"GET"}).then(response=>(response.json()).then(response=>{console.log(response);setImdb(response[props.title])}))
    }

    return(
    <>  
        {
        infoContainer?
            <div className="main__infoPrograma">
                
                <div className="infoPrograma-container">
                    <AiOutlineClose className="infoPrograma-icon" onClick={()=>{setInfoContainer(false)}}  />
                    <p className="infoPrograma-title">{props.title}</p>

                    <div className="infoPrograma-img-container">
                        <img style={!props.img?{"display":"none"}:null} className="infoPrograma-img"  ref={element} src={props.img} ></img>
                    </div>
                    <p className="infoPrograma-sipnosis">{props.sipnosis}</p>
                    {imdb?
                        <div className="infoPrograma-rate-container">

                            <div className="infoPrograma-rate-img-container">
                                <img className="infoPrograma-rate-img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"></img>
                            </div>
                            
                            <p className="infoPrograma-rate">{imdb}</p>
                        </div>
                    :null
                    }
                </div>

            </div>
        :null
        }


            <div onClick={()=>{LoadImdb() ;setInfoContainer(true)}} className="main__programa">

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

                    
                    <img style={!props.img?{"display":"none"}:null} className="programa-img"  ref={element} src={props.img} ></img>
                    
                </div>
            
            </div>

    </>
    )
}

export default ProgramaCanal;
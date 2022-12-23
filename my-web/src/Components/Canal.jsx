//imports
import React, { useRef } from "react";
import { useEffect } from "react";
import "../Css/Canal.css"
//imports

function Canal (props){
    const elemento = useRef(null) 
    const elementoContainer = useRef(null) 

    useEffect(()=>{

        if(props.title==props.search){
            const y =  elemento.current.offsetLeft-(document.documentElement.clientWidth/2-30)
            console.log("coincidencia")
            console.log(y)
            props.Scroll(y)
            elementoContainer.current.style.borderBottom="3px solid #42f587"
            elemento.current.style.width="125%"
            elemento.current.style.height="125%"
            
        }else{
            elementoContainer.current.style.borderBottom="none"
            elemento.current.style.width="100%"
            elemento.current.style.height="100%"
        }
    })

    return(
        <div ref={elementoContainer} className="main__canal-container">
            <div  className="main__canal">
                <img ref={elemento} className="canal-img" loading="lazy" src={props.url}></img>
            </div>
        </div>

    );
}

export default Canal;
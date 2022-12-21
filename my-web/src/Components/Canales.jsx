//imports
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import "../Css/Canales.css"
import Canal from "./Canal";
import { FiSearch } from 'react-icons/fi';

//imports
function Canales (){

    const listaCanales = useRef(null)
    const [listaFinal,setListaFinal] = useState([])

    const Load = async ()=>{
        
       await fetch("https://que-veo2-0-api.vercel.app/",{method:"GET"}).then(response=>(response.json()).then(response=>{listaCanales.current=response}))
       console.log(listaCanales.current[0][0])
       const listaNueva = []
       let contador = 0;

       do{
            listaNueva.push([listaCanales.current[0][contador][0],listaCanales.current[0][contador][1]])
            contador++
       }while(listaCanales.current[0][contador+1])

       setListaFinal(listaNueva)


    }

    const HandelChange = (e)=>{
        
    }

    useEffect(()=>{
        Load().then(()=>{console.log(listaFinal)}) 
    },[])
    



    return(
        <>
        <div className="search-canales">
            <p className="search-canales-title">Canales</p>
            <div className="search-canales-input-container">
                <input className="search-canales-input"></input>
                <FiSearch className="search-icon"></FiSearch>
            </div>
            
        </div>
        <div className="main__canales">
            {
                listaFinal.map(canal=>(
                    <Canal url={canal[1]}></Canal>

                ))
            }
        </div>
        </>
        
    );
}

export default Canales;
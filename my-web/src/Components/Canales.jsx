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
    const [search,setSearch] = useState("")
    const elementoContainer = useRef(null)

    const Load = async ()=>{
        
       await fetch("https://que-veo2-0-api.vercel.app/",{method:"GET"}).then(response=>(response.json()).then(response=>{listaCanales.current=response}))
       const listaNueva = []
       let contador = 0;

        do{
            listaNueva.push([listaCanales.current[0][contador][0].toLowerCase(),listaCanales.current[0][contador][1]])
            contador++
       }while(listaCanales.current[0][contador+1])

       listaCanales.current=listaNueva;


    }

    const BuscadorLista = async ()=>{
        const mapaLista = listaCanales.current.map(canal=>(
            <Canal url={canal[1]} search={search} width={document.documentElement.clientWidth} Scroll={Scroll} title={canal[0]}></Canal>
    
        ))
        return mapaLista
    }

    const HandelChange = (e)=>{
        const text = e.target.value.toLowerCase()
        setSearch(text)
    }

    const Scroll = (y)=>{
        elementoContainer.current.scroll({
            left: y,
            behavior: 'smooth'
          })

    }

    useEffect(()=>{
        Load().then(()=>{BuscadorLista().then(response=>{setListaFinal(response)})})
        
        
    },[search])
    








    return(
        <>
        <div  className="search-canales">
            <p className="search-canales-title">Canales</p>
            <div className="search-canales-input-container">
                <input onChange={HandelChange} className="search-canales-input"></input>
                <FiSearch className="search-icon"></FiSearch>
            </div>
            
        </div>
        <div ref={elementoContainer} className="main__canales">
            {
                listaFinal
            }
        </div>
        </>
        
    );
}

export default Canales;
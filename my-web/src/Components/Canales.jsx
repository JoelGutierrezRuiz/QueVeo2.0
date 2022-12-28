//imports
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import "../Css/Canales.css"
import Canal from "./Canal";
import { FiSearch } from 'react-icons/fi';
import ProgramaCanal from "./ProgramaCanal";

//imports
function Canales (){

    const listaCanales = useRef(null)
    const [listaFinal,setListaFinal] = useState([])
    const [search,setSearch] = useState("")
    const elementoContainer = useRef(null)
    const prog = useRef(null)
    const [renderProg,setRenderProg] = useState(null)
    //en esta variable recibimos nombre y logo del canal
    const [canalInfo,setCanalInfo] = useState(null)

    const Load = async ()=>{
        
       await fetch("https://que-veo2-0-api.vercel.app/",{method:"GET"}).then(response=>(response.json()).then(response=>{listaCanales.current=response}))
       const listaNueva = []
       let contador = 0;

        do{
            listaNueva.push([listaCanales.current[contador][0].toLowerCase(),listaCanales.current[contador][1]])
            contador++
       }while(listaCanales.current[contador+1])

       listaCanales.current=listaNueva;


    }
    
    const BuscadorLista = async ()=>{
        const mapaLista = listaCanales.current.map(canal=>(
            <Canal BuscarProg={BuscarProg} url={canal[1]} search={search} width={document.documentElement.clientWidth} Scroll={Scroll} title={canal[0]}></Canal>
    
        ))
        return mapaLista
    }

    const HandelChange = (e)=>{
        const text = e.target.value.toLowerCase().trim()
        setSearch(text)
    }

    const Scroll = (y)=>{
        elementoContainer.current.scroll({
            left: y,
            behavior: 'smooth'
          })

    }


    const RenderProg = async ()=>{

        const mapaLista = prog.current.map(canal=>(
            <ProgramaCanal title={canal[0][0]} time={canal[0][3]} img={canal[0][4][1]} logo={canal[0][4][0]} sipnosis={canal[0][5][1]} ></ProgramaCanal>
    
        ))
        setRenderProg(mapaLista)
    }

    const BuscarProg = async (canal,logo)=>{

        setCanalInfo([canal,logo])


        await fetch(`https://que-veo2-0-api.vercel.app/canales/${canalcanal.replace(/\s/g, '-')}`,{method:"GET"}).then(response=>(response.json()).then(response=>{prog.current=response[canal.replace(/\s/g, '-')]}))

        const listaNueva = []
        let contador = 0;
        try{
        do{
            listaNueva.push([prog.current[contador]])
            contador++
       }while(prog.current[contador+1])

       prog.current=listaNueva;
       RenderProg()
        }catch{setRenderProg(null)}

    }






    useEffect(()=>{
        Load().then(()=>{BuscadorLista().then(response=>{setListaFinal(response)})})
        
        
    },[search,renderProg])
    








    return(
        <>
        <div  className="search-canales">
            <p className="search-canales-title">Buscar</p>
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

        {
            renderProg?   
            <> 
            <div className="canal-buscado-logo-container">
                <img src={canalInfo[1]}></img>
                <p>{canalInfo[0].charAt(0).toUpperCase() + canalInfo[0].slice(1)}</p>
            </div>
            <div className="canal-buscado-container">
                {
                    renderProg
                }
            </div>
            </>
            :null
        }
        </>
        
    );
}

export default Canales;
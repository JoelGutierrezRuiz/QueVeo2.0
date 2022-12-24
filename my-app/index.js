//imports
const axios = require("axios")
const express = require("express")
const cheerio = require("cheerio");
require("./database");
const util = require("util");
const { response } = require("express");
const Task=require("./task.js");//mongo
const { channel } = require("diagnostics_channel");
const sleep = util.promisify(setTimeout)
const cors = require("cors")
const morgan = require("morgan")
//imports
const App = express();
App.use(express.json())
App.use(morgan("dev"))

const url = "https://www.tvguia.es/tv/programacion-la-1"//url de incio
async function SubirInfo(info){
    const task = new Task(info);
    try{
        task.save(task).then(()=>{console.log("Info Uploaded")});
        
      }catch(e){
        console.log("Cant upload Trivial:")
      }
}



//Sacamos todos los canales con su respectivo html enlazado a el
async function  SacarCanales()
{
    const canales = []
    await axios(url,{ 
        headers: { "Accept-Encoding": "gzip,deflate,compress" } 
    })
    
    //Con el html sacado buscamos lo siguiente
    .then(response =>{
    
        //guardamos la respuesta del callback anterior (el HTML)
        const html = response.data
        //Usamos cheerio para manipular el Html
        const $ = cheerio.load(html)
    
        //hacemos busqueda de los canales y sus links para acceder a la programación
        $(".block-channel-programs-div-title", html).each(function(){
            
            //buscamos los enlaces los canales para acceder a su programación
            const canalUrl="https://www.tvguia.es"+$(this).find("a").attr("href")
            canales.push(canalUrl)
        })
    })
    return canales
}

//Sacamos los enlaces de todos los programas
async function SacarEnlaces(){
    //obtenemos el valor de la funcion sacarCanales (Array para map)
    const canales = await SacarCanales()
    //Esta variable servirá para almacenar temporalmente los resultados
    const programas = []

    //Aqui mapeamos todas las urls de los canales
    canales.map(async canal=>{

        //Sacamos el html de los canales cons async para evitar las dependencias de variables
        const response =await  axios(canal,{ 
            headers: { "Accept-Encoding": "gzip,deflate,compress" } 
        })

        //Guardamos los datos de la respuesta de axios (html)
        const html = response.data
        //Con esto podremos cargar y manipular el html
        const $ = cheerio.load(html)
        //Esta variables es para almacenar temporalmente el nombre del canal
        let channel = null
        //Buscamos el titulo del canal y guardamos su html para poder manipularlo sabiendo que canal es en un futuro 
        $("#main",html).each(function(){
            channel= $(this).find("h1").text()
            channel= channel.replace("Programación","")
            channel = channel.trim().toLowerCase()
            const logo = $(this).find("img").attr("src")
            
            programas.push([channel,html])
            
            
        })
            
    })
    await sleep(2000)
    
    return programas  
}



//SacarEnlaces().then(response=>{SubirInfo(response)})


//Obtenemos todos los programas de todos los canales
async function SacarTodosProgramas(){

    const canales = await SacarEnlaces()//html de todos los canales
    const programas = [] //aqui guardamos una lista que contiene el programa y el canal
    const todosLosCanales = {}//creamos un objeto que recibe el canal con una lista vacia
    canales.map(canal=>{
        const channel = canal[0]
        const html = canal[1]
        const $ = cheerio.load(html)
        todosLosCanales[channel] = []//aqui inicializamos el objeto con la lista para un futuro
    
        $(".channel-programs-title a",html).each(function(){
            const title = "https://www.tvguia.es"+$(this).attr("href")
            programas.push([channel,title])

        })

        
            
    })

    sleep(1500)
    programas.push(todosLosCanales)
    return programas

}


async function BuscarImdb(film){

    

    

    let imdbRate = {}
    
    film.map(async peli=>{
        
        try{
        await sleep(500)    
        let filtro = []
        let resultado = null
            
        const filmPAge = await  axios(`https://www.imdb.com/find?q=${peli[0]}&ref_=nv_sr_sm`,{ 
            headers: { "Accept-Encoding": "gzip,deflate,compress",Host:"www.imdb.com", "User-Agent":"Mozilla/5.0 (Macintosh; Intel)" } 
        })
    
        const htmlFilm = filmPAge.data
        const $ = cheerio.load(htmlFilm)
    
        $(".ipc-metadata-list-summary-item__t",htmlFilm).each(function(){
            let peliculaUrl = $(this).text().trim()
            filtro.push(peliculaUrl="https://www.imdb.com/"+$(this).attr("href"))
            resultado = filtro
        })
    
        const ratePage = await axios(resultado[0],{ 
            headers: { "Accept-Encoding": "gzip,deflate,compress",Host:"www.imdb.com", "User-Agent":"Mozilla/5.0 (Macintosh; Intel)" } 
        })
        htmlRate = ratePage.data
        pepe= cheerio.load(htmlRate)
    
        pepe(".sc-7ab21ed2-1",htmlRate).each(function(){
            const puntuacion = pepe(this).text()
            imdbRate[peli[0]]=puntuacion
    
        })
        }catch{}


    })

    await sleep(65000)    
    console.log(imdbRate)
    return imdbRate
    
    
    

}



async function BuscarCanal (busquedaHtml){
    try{

        const $ = cheerio.load(busquedaHtml)
        const programas = []
    
        $(".channel-programs-title a",busquedaHtml).each(function(){
        const title = "https://www.tvguia.es"+$(this).attr("href")
        programas.push(title)

        })
        sleep(20000)
        return programas

    }catch{console.log("Este canal no existe")}

    
}

async function BuscarProgramas (){
    const canales = {}
    let program = []
    
    const programasList=await SacarTodosProgramas()
    const listaFinal = programasList[programasList.length-1]
    programasList.map(async programa=>{
        
        try{
        const response =await axios(programa[1],{ 
            headers: { "Accept-Encoding": "gzip,deflate,compress" } 
        })
        const html = response.data
        $ = cheerio.load(html)

        $(".program-wrapper",html).each(async function(){
            const titulo = $(this).find(".program-title").text()
            const categoria = $(this).find(".tvprogram").text()
            const img = $(this).find("img").attr("src")
            const hora = $(this).find(".program-hour").text()
            const canal =  $(this).find("img").attr("src")

            titulo.trim()?await listaFinal[programa[0]].push([titulo,categoria,programa[0],img,hora,canal]):null

            //const hora = $(this).find(".program-hour").text()
            //const sipnosis = $(this).find(".program-element p").text()
            


        })
        
        
        
        }catch{}
        
    })
    await sleep(65000)
    return listaFinal
}

//BuscarProgramas().then(response=>{SubirInfo(response)})





App.listen(3000)

//const puntuacion = $(this).find(".sc-7ab21ed2-1").text()

App.get("/",cors(), (req,res)=>{
    Task.findById("63a123baa2be5d88494d43ac",function(err,doc){
        console.log(doc);res.send(doc)
    })


})

App.get("/canales/:canal",cors(), (req,res)=>{
    Task.findById("63a6ac07a590bc02b74d10c8",req.params.canal,function(err,doc){
        console.log(doc);res.send(doc)
    })



})
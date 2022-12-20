//imports
const axios = require("axios")
const express = require("express")
const cheerio = require("cheerio");
require("./database");
const util = require("util");
const { response } = require("express");
<<<<<<< HEAD
const { channel } = require("diagnostics_channel");
const sleep = util.promisify(setTimeout)
//imports
const App = express();

const url = "https://www.tvguia.es/tv/programacion-la-1"//url de incio



=======
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
>>>>>>> master
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
<<<<<<< HEAD


=======
>>>>>>> master
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
            
            programas.push([channel,logo])
            
            
        })
            
    })
    await sleep(2000)
    
    return programas  
}


<<<<<<< HEAD
//SacarEnlaces().then(response=>{console.log(response)})

=======
SacarEnlaces()//.then(response=>{SubirInfo(response)})
>>>>>>> master
async function SacarTodosProgramas(){
    const canales = await SacarEnlaces() 
    const programas = [] 
    const todosLosCanales = {}
    canales.map(canal=>{
        const channel = canal[0]
        const html = canal[1]
        const $ = cheerio.load(html)
        todosLosCanales[channel] = []
    
        $(".channel-programs-title a",html).each(function(){
            const title = "https://www.tvguia.es"+$(this).attr("href")
            programas.push([channel,title])

        })

        
            
    })

    sleep(1500)
    programas.push(todosLosCanales)
    return programas

}

<<<<<<< HEAD


const nombre = ["tintin","breaking bad", "Better call saul", "Cadena perpetua","avatar","las supernenad", "avatar 2", "airbender","vis a vis","walking dead", "fury", "pinoccio","titanic","lost", "midnight cospell", "el precio del poder","kill bill","hunger games", "cars 2", "masha y el oso","peter pan",]

=======
>>>>>>> master
async function BuscarImdb(film){

    

    

    let imdbRate = {}
    
    film.map(async peli=>{
        
        try{
        await sleep(500)    
        let filtro = []
        let resultado = null
            
        const filmPAge = await  axios(`https://www.imdb.com/find?q=${peli}&ref_=nv_sr_sm`,{ 
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
            imdbRate[peli]=puntuacion
    
        })
        }catch{}


    })

    await sleep(65000)    
    console.log(imdbRate)
    return imdbRate
    
    
    

}
<<<<<<< HEAD


//BuscarImdb(nombre)


=======
//BuscarImdb(nombre)
>>>>>>> master
//----------------


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
            //const categoria = $(this).find(".tvprogram").text()
            //const hora = $(this).find(".program-hour").text()
            //const sipnosis = $(this).find(".program-element p").text()
            titulo.trim()?await listaFinal[programa[0]].push(titulo):null


        })
        
        
        
        }catch{}
        
    })
    await sleep(65000)
    return listaFinal
}


//BuscarProgramas().then(response=>{console.log(response["tnt"]);BuscarImdb(response["tnt"])})


//Una vez guarda la lista de de canales vamos a buscar su programación 





//imdb



App.listen(3000)

//const puntuacion = $(this).find(".sc-7ab21ed2-1").text()
<<<<<<< HEAD
App.get("/",(req,res)=>{
    
=======
App.get("/",cors(),async (req,res)=>{
    
    await Task.find().then(response=>{console.log(response);res.send(response)})
>>>>>>> master

})
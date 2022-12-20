import './Css/App.css'
import React from 'react'
import Canales from './Components/Canales'
import BestRank from './Components/BestRank'
<<<<<<< HEAD

import axios from "axios"
import cheerio from "cheerio";
function App() {


=======
import { useEffect } from 'react'
function App() {





>>>>>>> master
  return (
    <div className="App">

      <section className='main__header'>
            <div className='header-container'>
                <ul className='header-list-container'>
<<<<<<< HEAD
                    <li>Queveo</li>
=======
                    <li className='header-title'>Queveo</li>
>>>>>>> master
                    <li>Buscar</li>
                </ul>
            </div>
      </section>
      <BestRank></BestRank>
      <Canales></Canales>

    </div>
  )
}

export default App

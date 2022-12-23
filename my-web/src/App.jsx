import './Css/App.css'
import React from 'react'
import Canales from './Components/Canales'
import BestRank from './Components/BestRank'
import { useEffect } from 'react'
import {AiOutlineMenu} from 'react-icons/ai'
import Programas from './Components/Programas'
function App() {

  return (
    <div className="App">

      <section className='main__header'>
            <div className='header-container'>
                <ul className='header-list-container'>
                    <li className='header-title'>Queveo</li>
                    <li><AiOutlineMenu></AiOutlineMenu></li>
                </ul>
            </div>
      </section>
      <BestRank></BestRank>
      <Canales></Canales>
      <Programas></Programas>

    </div>
  )
}

export default App

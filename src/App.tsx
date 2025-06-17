import { useState } from 'react'
import './App.css'
import Search from './components/Search'

function App() {

  const [searchTerm, setSearchTerm] = useState<string>('');

  return(
    <main>
      
      <div className='pattern'/>

      <div className='wrapper'>

        <header>

          <img src="./hero.png" alt="Hero Banner" />
          <h1>Procure <span className='text-gradient'>Filmes</span> que você ama sem problemas!</h1>

        </header>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />  

        <h1 className='text-3xl'> {searchTerm} </h1>


      </div>

      
      
    </main>
  )
}

export default App
  
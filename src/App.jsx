import MyApp from './components/MyApp';
// import Buscador from './components/Buscador';
import './App.css'

function App() {

  return (
    <>
      <header>
        <h2>Indicadores economicos</h2>
      </header>
      <main>
        <MyApp/>
      </main>
      <footer className='footer'>
        Este es el footer
      </footer>
    </>
  )
}

export default App

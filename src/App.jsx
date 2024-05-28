import MyApp from './components/MyApp';
// import Buscador from './components/Buscador';
import './App.css';
import { useState } from 'react';
import Buscador from './components/Buscador';

function App() {
   const [busqueda, setBusqueda] = useState('');

   return (
      <div className="contenedor">
         <header>
            <h2 style={{ textAlign: 'center' }}>Indicadores económicos</h2>
         </header>
         <nav
            className="navbar navbar-expand-lg navbar-dark bg-dark"
            style={{ width: '-webkit-fill-available' }}
         >
            <div className="container-fluid">
               <a className="navbar-brand" href="#">
                  Home
               </a>
               <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
               >
                  <span className="navbar-toggler-icon"></span>
               </button>
               <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
               >
                  {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Graficos</a>
              </li>
            </ul> */}
                  <Buscador busqueda={busqueda} setBusqueda={setBusqueda} />
               </div>
            </div>
         </nav>
         <section>
            <div className="appComponente">
               <MyApp busqueda={busqueda} />
            </div>
         </section>
         <footer className="footer">
            <p>Todos los derechos reservados. Mónica Ayala</p>
         </footer>
      </div>
   );
}

export default App;

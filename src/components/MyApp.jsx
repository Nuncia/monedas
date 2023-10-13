import { useState, useEffect } from 'react';
import Card from './Card';
import {Chart as ChartJS} from 'chart.js/auto'
import { Line } from 'react-chartjs-2';

function MyApp({busqueda}) {

  // Inicializamos el estado 'info' como un objeto vacío
  const [info, setInfo] = useState([]);
  const [historico, setHistorico] = useState([])

  const arregloHistorico = [];
  let data = [];

  // Utilizamos useEffect para llamar a consultarInformacion cuando el componente se monta
  useEffect(() => {
    consultarInformacion();
  }, []);

  // Definimos la función asincrónica para realizar la llamada a la API
  const consultarInformacion = async () => {
    let fecha = '';

    try {
      const endPoint = 'https://mindicador.cl/api';
      const response = await fetch(endPoint);
      const temporal = await response.json();//toma el texto y dice interpretalo como json
    
      const atributos =Object.keys(temporal)
      const lista = [];
      for(let i = 0; i < atributos.length; i ++){
        const nombreAtributo = atributos[i]; //Obtenemos los nomres de lsoa tributos
        const valorAtributo = temporal[nombreAtributo];
        lista.push(valorAtributo);
      }
      const listaMonedas = [];
      
      for(let moneda in lista){
        fecha = new Date(lista[moneda].fecha);
        if(lista[moneda].codigo && lista[moneda].fecha && lista[moneda].nombre && lista[moneda].valor) {
            const opciones = {year: 'numeric', month: 'numeric', day: 'numeric'};
            listaMonedas.push(
                {
                    identificador: lista[moneda].codigo,
                    fecha: fecha.toLocaleDateString(undefined,opciones),
                    nombre: lista[moneda].nombre,
                    valor: (lista[moneda].valor)
                }
            )
        }
      }
      setInfo(listaMonedas);
      obtenerEndPoints();
      ordenarMonedas(listaMonedas);
    } catch(e) {
        alert(e);
    }
  };

  const obtenerEndPoints = () => {
    let url = '';
      info.forEach((item) => {
      url = `https://mindicador.cl/api/${item.identificador}`;
      obtenerHistorico(url);
    });   
  };

  const obtenerHistorico = async (url) => {
    try{
      const res = await fetch(url);
      const datos = await res.json();
      arregloHistorico.push({
        id: datos.codigo,
        serie: datos.serie
      })

    }catch(e){
      console.error(e.message);
    }
    // console.log(arregloHistorico);
    setHistorico(arregloHistorico);
  };

 //Ordenando los datos obtenidos
  const ordenarMonedas = (listaMonedas) => {
    const MonedasOrdenadas = listaMonedas.sort((a,b) => a.valor - b.valor);
    setInfo(MonedasOrdenadas);
  };

  // Utilizamos useEffect para hacer log del estado 'info' cada vez que cambia
  useEffect(() => {
    console.log('Estado actual de historico:', historico);
  }, [historico]);
  
  let resultados = [];
  if(!busqueda){
    resultados = info;
  } else{
    resultados = info.filter((item) => item.nombre.toLowerCase().includes(busqueda.toLowerCase()));
  }

  // Renderizamos el componente
  return (
    <>
      {/* Verificamos si 'info' tiene elementos antes de cargarlos */}
      {info.length > 0 ? (
        // Mapeamos a través de 'info' y devolvemos JSX para cada objeto
        resultados.map((item, index) => (
           <div  key={index} >
              <Card key={index} item={item}/>
           </div>
         
        ))
      ) : (
        "Loading..."
      )}
    </>
  )
}

export default MyApp;
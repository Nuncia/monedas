import { useState, useEffect } from 'react';
import Card from './Card';
import {Chart as ChartJS} from 'chart.js/auto'
import { Line } from 'react-chartjs-2';

function MyApp({busqueda}) {

  // Inicializamos el estado 'info' como un objeto vacío
  const [info, setInfo] = useState([]);
  const [endPoints, setEndPoints] = useState([]);

  const data = {};

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
      console.log('listaMonedas:', listaMonedas)
    } catch(e) {
        alert(e);
    }
  };

  const obtenerEndPoints = () => {
    const arregloEndPoints = [];
    let url = '';
    info.forEach((item) => {
      url = `https://mindicador.cl/api/${item.identificador}`;
      obtenerDatosGraficos(url)
    })
    setEndPoints(arregloEndPoints);      
  };

  const obtenerDatosGraficos = async (url) => {
   try{
//Obteniedo los datos de fecha y valor para cada moneda
      const res = await fetch(url);
      const data = await res.json();
      const ultimosDias = data?.serie.reverse().splice(-10);
//Tengo los datos de la moneda
      setEndPoints(ultimosDias);
      prepararConfiguracion();
    } catch(e){
      alert(e);
    }
  };

  const prepararConfiguracion = () => {
    let fechasMoneda = [];
    let valoresMoneda = [];

    endPoints.forEach((moneda) => {
      fechasMoneda.push(moneda.fecha);
      valoresMoneda.push(moneda.valor);
    })
    let  data = {
      // type: 'line',
      data: {
        labels: fechasMoneda,
        datasets: [
          {
            fill: true,
            label: 'NOMBRE MONEDA',
            data: valoresMoneda,
            backgroundColor: 'red',
            borderWidth: 1,
          }
        ]
      }
    };
    setEndPoints(data);
    console.log(endPoints)
  };

 //Ordenando los datos obtenidos
  const ordenarMonedas = (listaMonedas) => {
    const MonedasOrdenadas = listaMonedas.sort((a,b) => a.valor - b.valor);
    setInfo(MonedasOrdenadas);
  };

  // Utilizamos useEffect para hacer log del estado 'info' cada vez que cambia
  useEffect(() => {
    // console.log('Estado actual de info:', info);
  }, [info]);
  
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
              <div>
                {endPoints.legth > 0 ? (<Line data={info.datasets}/>) : null}
              </div>
           </div>
         
        ))
      ) : (
        "Loading..."
      )}
    </>
  )
}

export default MyApp;
import { useState, useEffect } from 'react';
import Card from './Card';
import {Chart as ChartJS} from 'chart.js/auto'
import { Bar, Line } from 'react-chartjs-2';
// import Grafico from './Grafico';
import { Chart, BarElement, Tooltip,Legend, CategoryScale, LinearScale } from 'chart.js';
import Grafico from './Grafico';

ChartJS.register(
    BarElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale
);

function MyApp({busqueda}) {

  // Inicializamos el estado 'info' como un objeto vacío
  const [info, setInfo] = useState([]);
  // const [historico, setHistorico] = useState([]);
  const [data, setData] = useState({});
  const arregloHistorico = [];

  // Utilizamos useEffect para llamar a consultarInformacion cuando el componente se monta
  useEffect(() => {
    consultarInformacion();
    // preparandoConfiguracion();
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
      // obtenerHistorico(url);
      preparandoConfiguracion();
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

      const mondOrdenadas = arregloHistorico?.sort((a,b) => a.valor - b.valor)
      let historicoIndividual = []
      let fechas = [];
      let valores = [];
      let nombre = '';
      let hm = [];
      const opciones = {year: 'numeric', month: 'numeric', day: 'numeric'};
  //Para cada moneda se obtienen los ultimos 10 datos de fechas y valores
      for(let i = 0; i < mondOrdenadas.length ; i ++){
        nombre = mondOrdenadas[i].id;
        historicoIndividual = mondOrdenadas[i].serie.slice(0,10)
        hm = historicoIndividual[i].fecha;
        console.log(historicoIndividual[i].fecha)
        fechas.push(historicoIndividual[i].fecha)
        
        let datos = {
          type: 'bar',
          data: {
            labels: fechas,
            datasets: [
              {
                label: nombre,
                data: valores,
                borderWidth: 2,
              }
            ]
          }
        }
        // console.log(datos)
        setData(datos);
      }

    }catch(e){
      console.log(e.message);
    }    
  };

  const preparandoConfiguracion = () => {
    let datos = {
      type: 'bar',
      labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
      datasets: [
        {
          label: "Historico Monedas",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          data: [65, 59, 80, 81, 56],
        },
      ],
    };
    setData(datos);

  };

 //Ordenando los datos obtenidos
  const ordenarMonedas = (listaMonedas) => {
    console.log(listaMonedas)
    const MonedasOrdenadas = listaMonedas.sort((a,b) => a.valor - b.valor);
    setInfo(MonedasOrdenadas);
  };

  // Utilizamos useEffect para hacer log del estado 'info' cada vez que cambia
  useEffect(() => {
    // console.log('Estado actual de data:', data);
  }, [data]);
  
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
              <Bar data={data}/>
           </div>
         
        ))
      ) : (
        "Loading..."
      )}
    </>
  )
}

export default MyApp;
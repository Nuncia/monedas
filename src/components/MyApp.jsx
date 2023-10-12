import { useState, useEffect } from 'react';
import Card from './Card';
import Grafico from './Grafico';

function MyApp({busqueda}) {
  // Inicializamos el estado 'info' como un objeto vacío
  const [info, setInfo] = useState({});

  // Utilizamos useEffect para llamar a consultarInformacion cuando el componente se monta
  useEffect(() => {
    consultarInformacion();
    cargarDatosGrafico();
  }, []);

  // Definimos la función asincrónica para realizar la llamada a la API
  const consultarInformacion = async () => {
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
        if(lista[moneda].codigo && lista[moneda].fecha && lista[moneda].nombre && lista[moneda].valor) {
            
            listaMonedas.push(
                {
                    identificador: lista[moneda].codigo,
                    fecha: (lista[moneda]).fecha,
                    nombre: lista[moneda].nombre,
                    valor: parseInt(lista[moneda].valor)
                }
            )
        }
      }
      ordenarMonedas(listaMonedas);    
    } catch(e) {
        alert(e);
    }
  };

  const cargarDatosGrafico = () => {

  }

 //Ordenando los datos obtenidos
  const ordenarMonedas = (listaMonedas) => {
    const MonedasOrdenadas = listaMonedas.sort((a,b) => a.valor - b.valor);
    console.log(info)
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
              <Grafico/>
           </div>
         
        ))
      ) : (
        "Loading..."
      )}
    </>
  )
}

export default MyApp;
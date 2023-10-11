import { useState, useEffect } from 'react';
import Card from './Card';

function MyApp({busqueda}) {
  // Inicializamos el estado 'info' como un objeto vacío
  const [info, setInfo] = useState({});

  // Utilizamos useEffect para llamar a consultarInformacion cuando el componente se monta
  useEffect(() => {
    consultarInformacion();
  }, []);

  // Definimos la función asincrónica para realizar la llamada a la API
  const consultarInformacion = async () => {
    try {
      const endPoint = 'https://mindicador.cl/api';
      const response = await fetch(endPoint);
      const temporal = await response.json();//toma el texto y dice interpretalo como json
    
      //   console.log('Datos recibidos:', temporal); // Log para verificar los datos recibidos
    //   setInfo(temporal); // Establecemos el estado 'info' con los datos recibidos
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
      setInfo(listaMonedas)
      ordenarMonedas();
    
    } catch(e) {
        alert(e);
    }
  }

  const ordenarMonedas = () => {
    const MonedasOrdenadas = info.sort((a,b) => a.nombre - b.nombre);
    console.log(MonedasOrdenadas)
  };

  // Utilizamos useEffect para hacer log del estado 'info' cada vez que cambia
  useEffect(() => {
    // console.log('Estado actual de info:', info);
  }, [info]);
  // console.log(info)
  let resultados = [];
  if(!busqueda){
    resultados = info;
  } else{
    resultados = info.filter((item) => {
      return item.nombre.toLowerCase().include(busqueda.toLowerCase());
    });
  }
  console.log('resultados: ',resultados);

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
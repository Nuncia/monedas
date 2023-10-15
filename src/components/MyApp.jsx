import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import Grafico from './Grafico';

function MyApp({busqueda}) {
  
  const [cargando, setCargando] = useState(true);  // Estado para mostrar el indicador de carga
  const [resultados, setResultados] = useState([]);
  const [arregloHistorico, setArregloHistorico] = useState([]);//Estado para almacenar los datos del hastorico

  // Se define método para consultar la API
  const consultarInformacion = useCallback(async () => {
    setCargando(true);  
    let fecha = '';
    try {
      const endPoint = 'https://mindicador.cl/api';
      const response = await fetch(endPoint);
      const temporal = await response.json();
      const atributos = Object.keys(temporal);
      const lista = [];
      for(let i = 0; i < atributos.length; i++){
        const nombreAtributo = atributos[i];
        const valorAtributo = temporal[nombreAtributo];
        lista.push(valorAtributo);
      }
      const listaMonedas = [];
      // Aquí se almacena información sobre las monedas
      for(let moneda in lista){
        fecha = new Date(lista[moneda].fecha);
        if(lista[moneda].codigo && lista[moneda].fecha && lista[moneda].nombre && lista[moneda].valor) {
          const opciones = {year: 'numeric', month: 'numeric', day: 'numeric'};
          listaMonedas.push({
            identificador: lista[moneda].codigo,
            fecha: fecha.toLocaleDateString(undefined, opciones),
            nombre: lista[moneda].nombre,
            valor: (lista[moneda].valor)
          });
        }
      }
      //Se obtienen las monedas ordenadas por valor
      const monedasOrdenadas = listaMonedas.sort((a,b) => a.valor - b.valor)
      //Se obtiene los endPoints para obtener el historial de las monedas
      obtenerEndPoints(monedasOrdenadas);
    } catch(e) {
      alert(e);
    }
    setCargando(false);
  }, []);

  // Define un método para obtener los endPoints del historial de las monedas
  const obtenerEndPoints = async (listaMonedas) => {
    // Utiliza Promise.all para realizar solicitudes simultáneas para cada moneda y espera a que todas se completen
    const arregloHistoricoTemporal = await Promise.all(
        listaMonedas.map(async (item) => {
            const url = `https://mindicador.cl/api/${item.identificador}`;
            const respuesta = await llamarHistorico(url);
            if (respuesta && respuesta.serie.length > 0) {
                const datos = respuesta.serie.slice(0, 10).reverse();
                return {
                    identificador: item.identificador,
                    fecha: item.fecha,
                    valor: item.valor,
                    nombre: respuesta.nombre,
                    id: respuesta.codigo,
                    serie: datos
                };
            }
            return null;
        })
    );
    const filteredArray = arregloHistoricoTemporal.filter(item => item !== null);
    setArregloHistorico(filteredArray);
  };

  // Define un método para llamar al historial de la API
  const llamarHistorico = async (url) => {
    try{
      const res = await fetch(url);
      const datos = await res.json();
      return datos;
    }catch(e){
      alert(e.message);    
    }
  };

  useEffect(() => {
    consultarInformacion();
  }, [consultarInformacion]);

  useEffect(() => {
    let nuevosResultados = [];
    if(!busqueda){
      nuevosResultados = arregloHistorico;
    } else{
      nuevosResultados = arregloHistorico.filter((item) => 
        item.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
    }
    setResultados(nuevosResultados);
  }, [busqueda, arregloHistorico]);

  // Renderiza el componente
  return (
    <>
      {cargando ? (
        "Cargando..."
      ) : (
        resultados.length > 0 ? (
          resultados.map((item, index) => (
            <div key={index} >
              <Card key={index} item={item}/> 
              <Grafico data={item.serie} />            
            </div>         
          ))
        ) : (
          "No se encontraron resultados."
        )
      )}
    </>
  );
}

MyApp.propTypes = {
  busqueda: PropTypes.string.isRequired
};

export default MyApp;
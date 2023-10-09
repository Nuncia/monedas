import { useEffect, useState } from "react"
import Card from "./Card";

const MyApp = () => {
    const [results, setResults] = useState([])

    useEffect(() => {
        cargarAPI();
    },[]);

    const cargarAPI = async() => {
        try{
            const url = 'https://api.victorsanmartin.com/feriados/en.json';
            const res = await fetch(url);
            const data = await res.json();
            const arreglo = (data.data)
            console.log(arreglo[0]);
            setResults(arreglo);
        } catch (e) {
            alert(e);
        }
    };
  return (
    <>
        <div style={{display: 'flex', flexWrap: 'wrap', margin: '30px'}}>
                {results?.map((item) => (
                    <Card key={item.date} item={item}/>
                ))}    
        </div>
    </>
  )
}

export default MyApp
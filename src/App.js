import './App.css';
import axios from 'axios';
import React, { useState } from "react";

;

function App() {
  //Guardamos la data obtenida de la petición y la asignamos a constantes para poder mostrarla en el html.
  const [nombre, setNombre] = useState("");
  const [img, setImage] = useState("");
  const [peso, setPeso] = useState("");
  const [tipo, setTipo] = useState("");
  const [habilidad, setHabilidad] = useState("");

  //Extraemos el value del input para poder asignarlo donde queramos.
  const  [pokemon, setPokemon] = useState("");
  const onChangePokemon = function(evento) {
    setPokemon(evento.target.value.toLowerCase())
  }


  const buscar = async () => {
    // Configuración para hacer la petición con axios.
    const config = {
      method: `get`,
      url: `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
      json: true,
      headers: {
        'Content-Type': 'application/json'
    } 
    }
    
    // Ejecutando petición con axios y la configuración que queremos.
    const response = await axios(config);
    
    // Extracción de la info que trae la respuesta a la petición.
    let data = response.data    
    const nombre = data.name.toUpperCase()
    const img = data.sprites.front_default
    const peso = `Weight: ${data.weight/10} Kgs`
    
    // En el caso que la cantidad de items varie por pokemon, itemaron con map().
    let tipos = ""
    data.types.map(data => tipos += `${data.type.name} / `)
    tipos = `Type: ${tipos.substring(0, tipos.length - 2)}`
    
    let habilidades = ""
    data.abilities.map(data => habilidades += `${data.ability.name} / `)
    habilidades = `Abilities: ${habilidades.substring(0, habilidades.length - 2)}`
    
    // extraemos la data requerida y la llamamos en una constante para plasmarla en el html.
    setNombre(nombre);
    setImage(img);
    setPeso(peso);
    setTipo(tipos);
    setHabilidad(habilidades);
  }

  return (
    <div className="App">
      <div>
        <h1>PokePedia</h1>
        <input onChange={onChangePokemon} type="text" id="pokemon" placeholder="Nombre del pokemon..." /><br/>
        <button onClick={buscar} type='button' id='boton'>Buscar</button>
      </div>
      <div>
        <p>{nombre}</p>
        <img src={img} />
        <p>{tipo}</p>
        <p>{habilidad}</p>
        <p>{peso}</p>
      </div>
    </div>
  );
}

export default App;

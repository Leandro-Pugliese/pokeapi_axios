import './App.css';
import axios from 'axios';
import React, { useState } from "react";
import { saveAs } from 'file-saver'


;

function App() {
  //Guardamos la data obtenida de la petición y la asignamos a constantes para poder mostrarla en el html.
  const [nombre, setNombre] = useState("");
  const [img, setImage] = useState("");
  const [peso, setPeso] = useState("");
  const [tipo, setTipo] = useState("");
  const [habilidad, setHabilidad] = useState("");
  
  //Hook para ocultar y mostrar boton de descarga de la img solo cuando buscaste el pokemon.
  const [hideDownload, setHideDownload] = useState("");
 

  //Extraemos el value del input para poder asignarlo donde queramos.
  const  [pokemon, setPokemon] = useState("");
  const onChangePokemon = function(evento) {
    setPokemon(evento.target.value.toLowerCase())
  }


  const buscar = async () => {
    try{
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
    
    //Hook para ocultar y mostrar boton de descarga de la img solo cuando buscaste el pokemon.
    setHideDownload(true)

    } catch (error) {
      error = "No existe el pokemón"
      window.alert(error);
    }

  }

  
  //No funciona, pq no imnprime el sprite del pokemon, ya que tiene un origen diferente al del htmlToCanvas
  // const descargarIMG = function(evento) {
  //   html2canvas(document.querySelector("#carta")).then(canvas => {
  //     let img = canvas.toDataURL("image/png");
  //     let link = document.createElement("a");
  //     link.download = "pokedex.png";
  //     link.href = img;
  //     link.click();
  //     });
  // }
  // Posdata: no funciona guardar en local la url del sprite.


  //Solo descarga la imagen no toda la info.
  const downloadImage = () => {
    saveAs(`${img}`, 'image.jpg') // Put your image url here.
  }

  
  return (
    <div className="App">
      <div id='titulo-div'>
        <h1>Pokepedia</h1>
      </div>
      <div id='input-div'>
        <input onChange={onChangePokemon} type="text" id="pokemon" placeholder="Nombre del pokemon..." /><br/>
      </div>
      <div id='boton-div'>
        <button onClick={buscar} type='button' id='boton'>Buscar</button>
      </div>
      <div id='carta'>
        {/* <div id='fondo'>
          <img src='CSS/IMG/pokedexFondo2.jpg' />
        </div> */}
        <div id='nombre-div'>
          <p>{nombre}</p>
        </div>
        <div id='img-div'>
          <img src={img} />
        </div>
        <div id='tipos-div'>
          <p>{tipo}</p>
        </div>
        <div id='habilidades-div'>
          <p>{habilidad}</p>
        </div>
        <div id='peso-div'>
          <p>{peso}</p>
        </div>
        {(!!hideDownload) && 
        <div id='boton-div'>
          <button onClick={downloadImage}>Descargar imagen</button>
        </div>
        }
      </div>
      {/* <div id='descargar-div'>
        <button id='botonCrear' onClick={descargarIMG} type="button">Descargar</button>
      </div> */}
      
    </div>
  );
}

export default App;

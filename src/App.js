import './App.css';
import axios from './axios';
import React, { useState } from "react";
import { saveAs } from 'file-saver';

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
        url: `${pokemon}`,
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
        let msjError = "No existe el pokemón";
        window.alert(msjError);
    }

  }

  //Solo descarga la imagen no toda la info.
  const downloadImage = () => {
    saveAs(`${img}`, 'image.jpg') // Put your image url here.
  }

  return (
    <div className="App">
      <header className='titulo__container'>
        <h1 className='titulo__principal'> POKENCICLOPEDIA </h1>
        <h4 className='titulo__info'>Información del pokémon que quieras al instante</h4>
      </header>
      <div className='busqueda__container'>
        <input className='busqueda__input' onChange={onChangePokemon} type="text" placeholder="Nombre del pokémon..." />
        <button className='busqueda__boton' type='button' onClick={buscar} > Buscar </button>
      </div>
      <div className='info__container'>
        <div className='container__name'>
          <p className='info__name'> {nombre} </p>
        </div>
        <div className='container__imagen'>
          <img className='info__imagen' src={img} alt='imagen pokémon'/>
        </div>
        <div className='container__tipo'>
          <p className='info__tipo'> {tipo} </p>
        </div>
        <div className='container__habilidades'>
          <p className='info__habilidades'> {habilidad} </p>
        </div>
        <div className='container__peso'>
          <p className='info__peso'> {peso} </p>
        </div>
        {
          (!!hideDownload) && 
          <div className='descarga__boton-container'>
            <button className='descarga__boton' type='button' onClick={downloadImage}> Descargar imagen  </button>
          </div>
        }
      </div>
    </div>
  );
}

export default App;

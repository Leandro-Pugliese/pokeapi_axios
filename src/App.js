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
  
  //Hook para renderizar la info del pokemon y el boton para descargar la img.
  const [hideDownload, setHideDownload] = useState(false);
  
  //Hook para msj de error en la busqueda.
  const [msjError, setMsjError] = useState(false);

  //Hook para loader
  const [loader, setLoader] = useState(false);

  //Extraemos el value del input para poder asignarlo donde queramos.
  const  [pokemon, setPokemon] = useState("");
  const onChangePokemon = function(evento) {
    setPokemon(evento.target.value.toLowerCase())
  }

  const buscar = async () => {
      setHideDownload(false)
      setMsjError(false)
      setLoader(true)
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
      const peso = `${data.weight/10}`
      
      // En el caso que la cantidad de items varie por pokemon, itemaron con map().
      let tipos = ""
      data.types.map(data => tipos += `${data.type.name} / `)
      tipos = `${tipos.substring(0, tipos.length - 2)}`
      
      let habilidades = ""
      data.abilities.map(data => habilidades += `${data.ability.name} / `)
      habilidades = `${habilidades.substring(0, habilidades.length - 2)}`
      
      // extraemos la data requerida y la llamamos en una constante para plasmarla en el html.
      setNombre(nombre);
      setImage(img);
      setPeso(peso);
      setTipo(tipos);
      setHabilidad(habilidades);
      
      setMsjError(false)
      setHideDownload(true)
      setLoader(false)

    } catch (error) {
        setHideDownload(false)
        setMsjError(true)
        setLoader(false)
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
        <h4 className='titulo__info'> Información del pokémon que quieras al instante </h4>
      </header>
      <div className='busqueda__container'>
        <input className='busqueda__input' onChange={onChangePokemon} type="text" placeholder="Nombre del pokémon..." />
        <button className='busqueda__boton' type='button' onClick={buscar} > Buscar </button>
      </div>
      {
        (hideDownload) && 
        <div>
          <div className='container__general'>
            <div className='info__container'>
              <div className='container__name'>
                <p className='info__name'> Name: {nombre} </p>
              </div>
              <div className='container__imagen'>
                <img className='info__imagen' src={img} alt='imagen pokémon'/>
              </div>
              <div className='container__tipo'>
                <p className='info__tipo'> Type: {tipo.toUpperCase()} </p>
              </div>
              <div className='container__habilidades'>
                <p className='info__habilidades'> Abilities: {habilidad.toUpperCase()} </p>
              </div>
              <div className='container__peso'>
                <p className='info__peso'> Weight: {peso} Kgs</p>
              </div>
            </div>
          </div>
          <div className='descarga__boton-container'>
            <button className='descarga__boton' type='button' onClick={downloadImage}> Descargar imagen </button>
          </div>
        </div>
      }
      {
        (msjError) &&
        <div className='error__container'>
          <p className='error__msj'> Ups, parece que el pokémon que buscaste no existe en nuestra base de datos, prueba con otro nombre. </p>
        </div>
      }
      {
        (loader) &&
        <div class="lds-spinner">
          <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
      }
    </div>
  );
}

export default App;

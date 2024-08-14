import React from 'react'
import style from './App.module.css'
import videoBackground from './assets/vids/drone.mp4'
import tereFoto from './assets/teresópolis/pedraDoSino.jpg'
import friFoto from './assets/friburgo/countryClube.jpg'
import petFoto from './assets/petropolis/palacio3.jpg'

function App() {
  

  return (
    <>
      <div className={style.mainContainer} >
        <video autoPlay muted loop className={style.video}>
            <source src={videoBackground} type="video/mp4" />
            Seu navegador não suporta vídeos em HTML5.
        </video>
        <section className={style.container01}>
          <section className={style.container02}>
            <h2>Logo</h2>
            <p>© 2024 - Todos os direitos reservados</p>
          </section>
          <section className={style.container03}>
              <ul className={style.lista}>
                <li className={`${style.itemLista} ${style.teresopolis} `}><img className={style.listaImagem} src={tereFoto} alt="foto alto da pedra do sino" /><p>Teresópolis</p></li>
                <li className={`${style.itemLista} ${style.friburgo}` }><img className={style.listaImagem} src={friFoto} alt="foto alto da pedra do sino" /><p>Friburgo</p></li>
                <li className={`${style.itemLista} ${style.petropolis}`}><img className={style.listaImagem} src={petFoto} alt="foto alto da pedra do sino" /><p>Petrópolis</p></li>
              </ul>
            </section>
        </section>
        <a className={style.referenciaVideo} href="https://pixabay.com/pt/users/elegancefariamodacrist-23526092/" target="_blank" rel="noopener noreferrer">Agradecimento a elegancefariamodacrist no Pixabay</a>
      </div>
    </>
  )
}

export default App

import { useState, useEffect, useRef } from 'react'
import style from './App.module.css'
import videoBackground from './assets/vids/drone.mp4'
import tereFoto from './assets/teresópolis/pedraDoSino.jpg'
import friFoto from './assets/friburgo/countryClube.jpg'
import petFoto from './assets/petropolis/palacio3.jpg'
import logo from './assets/bioGroupLogo.png'

function App() {  
  const [activeIndex, setActiveIndex] = useState(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const containerRef = useRef(null)

  const handleMouseOver = (index) => {
    setActiveIndex(index);
  }

  const handleMouseOut = () => {
    setActiveIndex(null);
  }

  const handleNavClick = () => {
    setIsExpanded(!isExpanded);
  }

  useEffect(() => {
    if (isExpanded) {
      containerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [isExpanded]);



  return (
    <>
      <div className={`${style.mainContainer} ${
            isExpanded === true ? style.mainContainerExpanded : ''
          }`} >
        <video autoPlay muted loop className={style.video}>
            <source src={videoBackground} type="video/mp4" />
            Seu navegador não suporta vídeos em HTML5.
        </video>
        <nav className={style.nav} >
          <ul className={style.navList} >
            <li className={style.navItem}>Home</li>
            <li className={style.navItem}>Sobre</li>
            <li className={style.navItem}>Contato</li>
          </ul>
        </nav>
        <section className={style.container01}>
          <section className={`${style.container02} ${
            isExpanded === true ? style.container02Expanded : ''
          }`} ref={containerRef} id='container02' >
            <img onClick={() => setActiveIndex(null)} className={style.logo} src={logo} alt="BioGroup Logo" />
            <p>© 2024 - Todos os direitos reservados</p>
          </section>
          <section className={style.container03}>
              <ul className={style.lista}>
              <li
                onClick={() => handleNavClick()}
                onMouseOver={() => handleMouseOver(1)} 
                onMouseOut={handleMouseOut}
                className={`${style.itemLista} ${style.teresopolis} ${activeIndex !== null && activeIndex !== 1 ? style.inactive : ''}`}>
                <img className={style.listaImagem} src={tereFoto} alt="foto alto da pedra do sino" />
                <p>Teresópolis</p>
              </li>
              <li 
                onMouseOver={() => handleMouseOver(2)} 
                onMouseOut={handleMouseOut}
                className={`${style.itemLista} ${style.friburgo} ${activeIndex !== null && activeIndex !== 2 ? style.inactive : ''}`}>
                <img className={style.listaImagem} src={friFoto} alt="foto do country clube de Friburgo" />
                <p>Friburgo</p>
              </li>
              <li 
                onMouseOver={() => handleMouseOver(3)} 
                onMouseOut={handleMouseOut}
                className={`${style.itemLista} ${style.petropolis} ${activeIndex !== null && activeIndex !== 3 ? style.inactive : ''}`}>
                <img className={style.listaImagem} src={petFoto} alt="foto do palácio de Petrópolis" />
                <p>Petrópolis</p>
              </li>
              </ul>
            </section>
        </section>
        <a className={style.referenciaVideo} href="https://pixabay.com/pt/users/elegancefariamodacrist-23526092/" target="_blank" rel="noopener noreferrer"> elegancefariamodacrist no Pixabay</a>
      </div>
    </>
  )
}

export default App

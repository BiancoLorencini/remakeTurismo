import { useState, useEffect, useRef, createElement } from 'react'
import { useSpring, animated } from '@react-spring/web'
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
  const [scrollPosition, setScrollPosition] = useState('top');
  const [stickyItem, setStickyItem] = useState(false);

  const [props] = useSpring(
    () => ({
      from: { opacity: 0 , display: 'none'}, 
      to: { opacity: 1 , display: 'block'},
      delay: 4000,
    }),
    []
  )
  const handleMouseOver = (index) => {
    setActiveIndex(index);
  }

  const handleMouseOut = () => {
    setActiveIndex(null);
  }

  const handleNavClick = () => {
    setScrollPosition(scrollPosition === 'top' ? 'bottom' : 'top');
    setIsExpanded(!isExpanded);

    setStickyItem(!stickyItem);

    if (!isExpanded) {
      requestAnimationFrame(() => {
          containerRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
          });
      });
  }

    requestAnimationFrame(() => {
      containerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })
    });
  }

  useEffect(() => {
    if (isExpanded === true) {
      createElement('div', {className: style.infoCard}, null);
    }
  }, [isExpanded]);

  
  useEffect(() => {
    if (scrollPosition === 'top') {
      containerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    } else {
      containerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [isExpanded, scrollPosition]);

  return (
    <>
      <div className={`${style.mainContainer} ${
            isExpanded === true ? style.mainContainerExpanded : ''
          }`} >
        <video autoPlay muted loop className={style.video}>
          <source src={videoBackground} type="video/mp4"/>
          Seu navegador não suporta vídeos em HTML5.
        </video>
        <nav className={style.nav}>
          <ul className={style.navList} > 
            <animated.div style={props}> <li className={style.navItem}>Home</li></animated.div>
            <animated.div style={props}><li className={style.navItem}>Sobre</li></animated.div>
            <animated.div style={props}><li className={style.navItem}>Contato</li></animated.div>
          </ul>
        </nav>
        <section className={style.container01}>
          <section className={`${style.container02} ${
            isExpanded === true ? style.container02Expanded : ''
          }`} ref={containerRef} id='container02' >
            <img onClick={() => setActiveIndex(null)} className={style.logo} src={logo} alt="BioGroup Logo" />
            <p>© 2024 - Todos os direitos reservados</p>
            {isExpanded && (
              <div className={style.expandedInfoCard}>
                <p>Informações adicionais ao expandir.</p>
              </div>
            )}
          </section>
          <section className={style.container03}>
            <ul className={style.lista}>
              <li
                onClick={() => handleNavClick(1)}
                onMouseOver={() => handleMouseOver(1)} 
                onMouseOut={handleMouseOut}
                className={`${style.itemLista} ${style.teresopolis} ${activeIndex !== null && activeIndex !== 1 ? style.inactive : ''} ${stickyItem ? style.stickyFotoTeresopolis : ''}`}>
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
        <a className={style.referenciaVideo} href="https://pixabay.com/pt/users/elegancefariamodacrist-23526092/" target="_blank" rel="noopener noreferrer">Agradecimento <br/> elegancefariamodacrist no Pixabay</a>
      </div>
    </>
  )
}

export default App

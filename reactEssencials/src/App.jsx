import { useState, useEffect, useRef, createElement } from 'react'
import { useSpring, animated } from '@react-spring/web'
import style from './App.module.css'
import videoBackground from './assets/vids/drone.mp4'
import tereFoto from './assets/teresópolis/pedraDoSino.jpg'
import tereFoto02 from './assets/teresópolis/paisagemPedraSino01.jpg'
import friFoto from './assets/friburgo/countryClube.jpg'
import petFoto from './assets/petropolis/palacio3.jpg'
import logo from './assets/bioGroupLogo.png'

function App() {  
  const [activeIndex, setActiveIndex] = useState(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [scrollPosition, setScrollPosition] = useState('top');
  const [isFading, setIsFading] = useState(false);
  const [returnFading, setReturnFading] = useState(false);
  const containerRef = useRef(null)
  const videoRef = useRef(null);

  const [props] = useSpring(
    () => ({
      from: { opacity: 0 , display: 'none'}, 
      to: { opacity: 1 , display: 'block'},
      delay: 1000,
    }),
    []
  )

  const handleMouseOver = (index) => {
    setActiveIndex(index);
  }

  const handleMouseOut = () => {
    setActiveIndex(null);
  }

  const homeHandleClick = () => {
    if (isExpanded) {
      setIsExpanded(false)
    }
  }

  const handleNavClick = () => {
    setScrollPosition(scrollPosition === 'top' ? 'bottom' : 'top');
    setIsExpanded(!isExpanded);
    
    if (isExpanded === true) {
      containerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'bottom',
      })
    }

    requestAnimationFrame(() => {
      containerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })
    });
  }

  const handleClickFading = () => {
    const video = videoRef.current;
    setReturnFading(!returnFading);
    setTimeout(() => {
      setIsExpanded(!isExpanded);
      setReturnFading(false);
      video.currentTime = 0;
    }, 1000);
  }
    
  useEffect(() => {
    const video = videoRef.current;
    const handleVideoEnd = () => {
      setIsFading(true);
      setTimeout(() => {
        video.play();
        setIsFading(false); 
      }, 600);
    };
    video.addEventListener('ended', handleVideoEnd);
    return () => {
      video.removeEventListener('ended', handleVideoEnd);
    };
  }, []);

  useEffect(() => {
    if (isExpanded === true) {
      createElement('div', {className: style.infoCard}, null);
      createElement('div', {className: style.infoCard02}, null);
    } else {
      containerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }, [isExpanded]);

  useEffect(() => {
    if (scrollPosition === 'top') {
      containerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    } else {
      containerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })
    }
  }, [isExpanded, scrollPosition]);

  return (
    <>
      <div className={`${style.mainContainer} ${
            isExpanded === true ? style.mainContainerExpanded : ''
          }`} >
        <video ref={videoRef} autoPlay muted loop={false} style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          objectFit: 'cover',
          opacity: isFading ? 0 : 1,
          transition: 'opacity 1s ease-in-out',
        }} className={style.video}>
          <source src={videoBackground} type="video/mp4"/>
          Seu navegador não suporta vídeos em HTML5.
        </video>
        <nav className={style.nav}>
          <ul className={style.navList} > 
            <animated.div style={props}><li className={style.navItem} onClick={homeHandleClick}>Home</li></animated.div>
            <animated.div style={props}><li className={style.navItem}>Sobre</li></animated.div>
            <animated.div style={props}><li className={style.navItem}>Contato</li></animated.div>
          </ul>
        </nav>
        <section className={style.container01}>
          <section className={`${style.container02} ${
            isExpanded === true ? style.container02Expanded : ''
          } `} ref={containerRef} id='container02'  >
            <img onClick={() => setActiveIndex(null)} className={style.logo} src={logo} alt="BioGroup Logo" />
            <p>© 2024 - Todos os direitos reservados</p>
            {isExpanded && (
              <>
                <div onClick={handleClickFading} className={`${style.expandedFotoCard} ${returnFading ? style.revertReturnAnimations : '' }`} >
                  <img src={tereFoto} alt="foto alto da pedra do sino" />
                  <p>Teresópolis</p>
                </div>
                <div className={`${style.expandedInfoCard} ${returnFading ? style.revertTextAnimationsRight : '' }`}>
                  <p>
                  <span className={style.spanInfo}>A</span> Pedra do Sino, com 2.275 metros de altitude, é o ponto culminante do Parque Nacional da Serra dos Órgãos. Localizada no município de Guapimirim, no estado brasileiro do Rio de Janeiro, é procurada por montanhistas e alpinistas para a prática de diversos esportes e atividades turísticas.
                  Lá do alto a vista alcança toda a Baía de Guanabara, a cidade do Rio de Janeiro e parte do Vale do Paraíba, no lado continental. O acesso é feito a partir da Sede Teresópolis do Parnaso e e a trilha é um clássico do montanhismo.
                  </p>
                  <a target='_blank' href="https://www.icmbio.gov.br/parnaserradosorgaos/destaques/172-pedra-do-sino.html"><span className={style.spanInfoLink}>Veja Mais</span></a>
                  <div className={`${style.infoCard02} ${returnFading ? style.revertMapAnimations : '' }`}>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d58991.61649211872!2d-43.06126288800925!3d-22.467535015130448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1spedra%20do%20sino%20teres%C3%B3polis!5e0!3m2!1spt-BR!2sbr!4v1723908980222!5m2!1spt-BR!2sbr" width="98%" height="98%" frameBorder="0"></iframe>
                  </div>
                  <div className={`${style.infoCard03} ${returnFading ? style.revertFotoAnimations : '' }`}>
                    <img className={style.tereFoto01} src={tereFoto02} alt=" foto do alto da pedra do sino com o sol se pondo" />
                  </div>
                </div>
              </>
            )}
          </section>
          <section className={style.container03}>
            <ul className={style.lista}>
              <li
                onClick={() => handleNavClick(1)}
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
        <a className={style.referenciaVideo} href="https://pixabay.com/pt/users/elegancefariamodacrist-23526092/" target="_blank" rel="noopener noreferrer">Agradecimento <br/> elegancefariamodacrist no Pixabay</a>
      </div>
    </>
  )
}

export default App

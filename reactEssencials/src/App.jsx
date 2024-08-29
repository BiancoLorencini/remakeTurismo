import { useState, useEffect, useRef, createElement } from 'react'
import { useSpring, animated } from '@react-spring/web'
import Modal from 'react-modal'
import style from './App.module.css'
import videoBackground from './assets/vids/drone.mp4'
import tereFoto from './assets/teresópolis/pedraDoSino.jpg'
import tereFoto02 from './assets/teresópolis/paisagemPedraSino01.jpg'
import friFoto from './assets/friburgo/countryClube.jpg'
import friFoto02 from './assets/friburgo/countryClubRemake.png'
import petFoto from './assets/petropolis/palacio3.jpg'
import petFoto02 from './assets/petropolis/sescQuitandinha.jpg'
import logo from './assets/logoMod02.png'
import meAgain from './assets/me/EstradaDePrata.jpeg'
import github from './assets/github.png'
import linkedin from './assets/linkedin.png'
import facebook from './assets/facebook.png'
import emailJs from '@emailjs/browser'


function App() {  
  Modal.setAppElement('#root')
  const [isName, setIsName] = useState('')
  const [isEmail, setIsEmail] = useState('')
  const [isMessage, setIsMessage] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [scrollPosition, setScrollPosition] = useState('top');
  const [isFading, setIsFading] = useState(false);
  const [exitAboutSmooth, setExitAboutSmooth] = useState(true);
  const [returnFading, setReturnFading] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);
  const mainContainerRef = useRef(null);
  const containerRef = useRef(null)
  const videoRef = useRef(null);

  const [props] = useSpring(
    () => ({
      from: { opacity: 0 , display: 'none'}, 
      to: { opacity: 1 , display: 'block'},
      delay: 500,
    }),
    []
  )

  function sendEmail(e) {
    e.preventDefault();

    if (isName === '' || isEmail === '' || isMessage === '') {
      alert('Preencha todos os campos!')
      return
    }

    const templateParams = {
      from_name: isName,
      email: isEmail,
      message: isMessage
    }

    emailJs.send("service_9iec4xb", "template_z08a009", templateParams, "42qY5xB--BkeK2E8d")
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setIsName('')
        setIsEmail('')
        setIsMessage('')
        setIsConfirmationModalOpen(true);
      }, (err) => {
        console.log('FAILED...', err);
      });
  }

  const handleContato = () => {
    setIsModalOpen(!isModalOpen)
    if (isModalOpen === false) {
      if (mainContainerRef.current) {
        mainContainerRef.current.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    }
  }
  const handleChangePage = () => {
    if (paginaAtual === 1) {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setExitAboutSmooth(!exitAboutSmooth);
        setTimeout(() => {
          setPaginaAtual(2)
          setExitAboutSmooth(false);
        }, 300);
        setTimeout(() => {
          setIsTransitioning(false); 
        }, 300);
      }
    }
    if (mainContainerRef.current) {
      mainContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
    setTimeout(() => {
      setIsExpanded(false);
      setReturnFading(false);
    }, 500);
  };

  const handleMouseOver = (index) => {
    setActiveIndex(index);
  }

  const handleMouseOut = () => {
    setActiveIndex(null);
  }

  function handleNavClick(area) {
    setSelectedArea(area);
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
    if (mainContainerRef.current) {
      mainContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
    setTimeout(() => {
      setIsExpanded(!isExpanded);
      setReturnFading(false);
      video.currentTime = 0;
    }, 500);
  }

  const handleClickHomeReturning = () => {
    if (paginaAtual === 2) {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setExitAboutSmooth(!exitAboutSmooth);
        setTimeout(() => {
          setPaginaAtual(1)
          setExitAboutSmooth(true);
        }, 300);
        setTimeout(() => {
          setIsTransitioning(false); 
        }, 300);
      }
    }
    setReturnFading(false);
    if (mainContainerRef.current) {
      mainContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
    setTimeout(() => {
      setIsExpanded(false);
      setReturnFading(false);
      setPaginaAtual(paginaAtual === 1 ? 1 : 1);
    }, 500);
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
          }`} ref={mainContainerRef} >
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
            <animated.div style={props}><li className={style.navItem} onClick={handleClickHomeReturning}>Home</li></animated.div>
            <animated.div style={props}><li className={style.navItem} onClick={handleChangePage} >Sobre</li></animated.div>
            <animated.div style={props}><li className={style.navItem} onClick={handleContato}>Contato</li></animated.div>
          </ul>
        </nav>
        <Modal 
          isOpen={isModalOpen === true}
          overlayClassName={style.modalOverlay}
          className={style.modalContent}
          contentLabel="Contato">
            <h1>Contato</h1>
            <button className={style.btnClose} onClick={handleContato}>X</button>
            <form className={style.modalForm} onSubmit={sendEmail} >
              <div className={style.modalFormContainer} >
                <div className={style.modalFormInputs} >
                  <div className={style.modalFormInputInterno} >
                    <label className={style.label} htmlFor='nome'>Nome:</label>
                    <input type='text' onChange={(e) => setIsName(e.target.value)} value={isName} id='nome' name='nome' />
                  </div>
                  <div className={style.modalFormInputInterno} >
                    <label className={style.label} htmlFor='email'>Email:</label>
                    <input  type='email' onChange={(e) => setIsEmail(e.target.value)} value={isEmail} id='email' name='email' />
                  </div>
                </div>
                <div className={style.modalFormInputMessage} >
                  <label className={style.label} htmlFor='mensagem'>Mensagem:</label>
                  <textarea type='text' onChange={(e) => setIsMessage(e.target.value)} value={isMessage} id='mensagem' name='mensagem' />
                </div>
              </div>
              <button type='submit' className={style.closeBtn}>Enviar</button>
            </form>
          </Modal>
          <Modal
          isOpen={isConfirmationModalOpen === true}
          overlayClassName={style.overlay}
          className={style.modalContentConfirmation}>
          <div className={style.contactContent}>
            <h2>E-mail Enviado!</h2>
            <p>Seu e-mail foi enviado com sucesso!</p>
            <button className={style.contactButton} onClick={() => setIsConfirmationModalOpen(false)}>Fechar</button>
          </div>
        </Modal>
        <section className={style.container01}>
          <section className={`${style.container02} ${
            isExpanded === true ? style.container02Expanded : ''
          } `} ref={containerRef} id='container02'  >
            <img onClick={() => setActiveIndex(null)} className={style.logo} src={logo} alt="BioGroup Logo" />
            <p>© 2024 - Todos os direitos reservados</p>
            {isExpanded && (
              <>
                <div onClick={handleClickFading} className={`${style.expandedFotoCard} ${returnFading ? style.revertReturnAnimations : '' }`} >
                {selectedArea === 1 ? (
                  <><img src={tereFoto} alt="foto alto da pedra do sino" /> <p>Pedra do Sino</p></>
                  ) : selectedArea === 2 ? (
                  <><img src={friFoto} alt="foto do country clube de Friburgo" /> <p>Friburgo</p></>
                  ) : selectedArea === 3 ? (
                  <><img src={petFoto} alt="foto do palácio de Petrópolis" /><p>Petropolis</p></>
                ) : null}
                </div>
                <div className={`${style.expandedInfoCard} ${returnFading ? style.revertTextAnimationsRight : '' }`}>
                {selectedArea === 1 ? (
                  <><h1 className={style.h1Title}>Teresópolis</h1>
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
                  </div></>
                  ) : selectedArea === 2 ? (
                  <><h1 className={style.h1Title}>Friburgo</h1>
                  <p>
                  <span className={style.spanInfo}>O</span> Clube de Friburgo é um dos locais mais procurados para quem gosta de água, o Clube conta com um completo parque aquático com piscinas aquecidas e toboágua. Para quem quer relaxar e cuidar do corpo: saunas e banheiros com instalações modernas e confortáveis, com destaque para a banheira spa no vestiário feminino. O clube também oferece, aos sócios, o Espaço Saúde, com estúdio de pilates e massagens.
                  </p>
                  <a target='_blank' href="https://www.nfcc.com.br/"><span className={style.spanInfoLink}>Veja Mais</span></a>
                  <div className={`${style.infoCard02} ${returnFading ? style.revertMapAnimations : '' }`}>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.6406925793085!2d-42.539535025841595!3d-22.29159661617258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x978a65355e569b%3A0x936b08f6a08ea2bf!2sNova%20Friburgo%20Country%20Clube!5e0!3m2!1spt-BR!2sbr!4v1724906348022!5m2!1spt-BR!2sbr" width="98%" height="98%" frameBorder="0"></iframe>
                  </div>
                  <div className={`${style.infoCard03} ${returnFading ? style.revertFotoAnimations : '' }`}>
                    <img className={style.tereFoto01} src={friFoto02} alt=" foto do country clube de friburgo " />
                  </div></>
                  ) : selectedArea === 3 ? (
                  <><h1 className={style.h1Title}>Petrópolis</h1>
                  <p>
                  <span className={style.spanInfo}>A</span> Sesc Quitandinha, tradicional ponto turístico e centro cultural de Petrópolis, reabre no dia 1º de junho. Com rigoroso protocolo de segurança, Palácio e entorno do Lago Quitandinha voltarão a receber visitas após quase 1 ano e 3 meses fechados por conta da pandemia. Palácio inaugurado em 1944 para ser um hotel-cassino já foi considerado o maior centro internacional de turismo do Brasil. 
                  </p>
                  <a target='_blank' href="https://pcvb.com.br/o-que-fazer/perfil/palacio-quitandinha/"><span className={style.spanInfoLink}>Veja Mais</span></a>
                  <div className={`${style.infoCard02} ${returnFading ? style.revertMapAnimations : '' }`}>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.3871008491546!2d-43.21514242583175!3d-22.52716752441205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9908560b85039f%3A0x85d4fcea01c8617e!2sPal%C3%A1cio%20Quitandinha!5e0!3m2!1spt-BR!2sbr!4v1724906661470!5m2!1spt-BR!2sbr" width="98%" height="98%" frameBorder="0"></iframe>
                  </div>
                  <div className={`${style.infoCard03} ${returnFading ? style.revertFotoAnimations : '' }`}>
                    <img className={style.tereFoto01} src={petFoto02} alt=" foto do alto da pedra do sino com o sol se pondo" />
                  </div></>
                ) : null}
                </div>
              </>
            )}
          </section>
          <section className={style.container03}>
            {paginaAtual === 1 && <ul className={`${style.lista} ${exitAboutSmooth ? style.enterLeft : style.exitLeft}`}>
                <li
                  onClick={() => handleNavClick(1)}
                  onMouseOver={() => handleMouseOver(1)} 
                  onMouseOut={handleMouseOut}
                  className={`${style.itemLista} ${style.teresopolis} ${activeIndex !== null && activeIndex !== 1 ? style.inactive : ''}`}>
                  <img className={style.listaImagem} src={tereFoto} alt="foto alto da pedra do sino" />
                  <p>Teresópolis</p>
                </li>
                <li 
                  onClick={() => handleNavClick(2)}
                  onMouseOver={() => handleMouseOver(2)} 
                  onMouseOut={handleMouseOut}
                  className={`${style.itemLista} ${style.friburgo} ${activeIndex !== null && activeIndex !== 2 ? style.inactive : ''}`}>
                  <img className={style.listaImagem} src={friFoto} alt="foto do country clube de Friburgo" />
                  <p>Friburgo</p>
                </li>
                <li 
                  onClick={() => handleNavClick(3)}
                  onMouseOver={() => handleMouseOver(3)} 
                  onMouseOut={handleMouseOut}
                  className={`${style.itemLista} ${style.petropolis} ${activeIndex !== null && activeIndex !== 3 ? style.inactive : ''}`}>
                  <img className={style.listaImagem} src={petFoto} alt="foto do palácio de Petrópolis" />
                  <p>Petrópolis</p>
                </li>
              </ul>}
              {paginaAtual === 2 && <ul className={` ${style.lista} ${!exitAboutSmooth ? style.enterRight : style.exitRight} `}>
                <li 
                  className={`${style.itemLista} ${style.friburgo} ${activeIndex !== null && activeIndex !== 2 ? style.inactive : ''}`}>
                  <p className={style.aboutMeCard}>Projeto criado em React.js e CSS para aperfeiçoar e praticar o React.js aprendido no SerraTec fullstack no ano de 2024, para informações mais detalhadas acesse os links.</p>
                </li>
                <li
                  className={`${style.itemLista} ${style.teresopolis}`}>
                  <img className={style.listaImagem} src={meAgain} alt="eu e meu filho no parque nacional teresopolis" />
                  <p>Bianco Danilo Lorencini</p>
                </li>
                <li 
                  className={`${style.itemLista} ${style.petropolis} ${activeIndex !== null && activeIndex !== 3 ? style.inactive : ''}`}>
                  <div  className={style.midiaSocial}>
                    <a href="https://github.com/BiancoLorencini" target="_blank" rel="noopener noreferrer"><img src={github} alt="logo GitHub" /></a>
                    <a href="https://www.linkedin.com/in/bianco-lorencini/" target="_blank" rel="noopener noreferrer"><img src={linkedin} alt="logo GitHub" /></a>
                    <a href="https://www.facebook.com/profile.php?id=100067523982615&locale=pt_BR" target="_blank" rel="noopener noreferrer"><img src={facebook} alt="logo GitHub" /></a>
                  </div>
                </li>
              </ul>}
          </section>
        </section>
        <a className={style.referenciaVideo} href="https://pixabay.com/pt/users/elegancefariamodacrist-23526092/" target="_blank" rel="noopener noreferrer">Agradecimento <br/> elegancefariamodacrist no Pixabay</a>
      </div>
    </>
  )
}

export default App

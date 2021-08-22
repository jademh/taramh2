/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import styled, {createGlobalStyle} from 'styled-components'
import { fetchContent } from '../utils/contentful'
import ImageList from '../components/ImageList'
import DescriptionPanel from '../components/DescriptionPanel'
import InfoPanel from '../components/InfoPanel'
import trackEvent from '../utils/tracking'
import theme from '../theme/theme'

const GlobalStyle = createGlobalStyle`
  body {
    background: ${theme.base.colors.background};
    color: ${theme.base.colors.copy};
  }
  p a {
    color: ${theme.base.colors.copyLink};
  }
  p a:hover {
    color: ${theme.base.colors.copyLinkHover};
  }
`
const logoMargin = 30;

const Nav = styled.div`
  position: fixed;
  bottom: 10px;
  right: 15px;
  z-index: 5;
  @media (max-width: ${theme.breakpoints.mobile}) {
    top: 0;
    width: 100%;
    left: 0;
    bottom: auto;
    text-align: center;
    padding: 5px 0 2px 0;
    background: ${theme.base.colors.background};
    border-bottom: 2px solid ${theme.base.colors.modalBorder};
  }
`;

const NavButton = styled.button`
  display: inline-block;
  margin: 0 15px;
  text-transform: uppercase;
  text-decoration: none;
  color: ${theme.base.colors.navLink};
  font-size: ${theme.nav.fontSize};
  /* might be a button, not always an <a> */
  background: none;
  border: 0;
  cursor: pointer;
  transition: color 300ms ease-in-out;
  &:hover {
    color: ${theme.base.colors.navLinkHover};
  };
`;

const PageWrapper = styled.div`
  transition: 300ms padding ease-in-out;
  @media (min-width: ${theme.breakpoints.mobile}) {
    ${({modalOpen}) => modalOpen ? `padding-left: ${theme.imageInfoPanel.width};` : ``};
  }
`;

const LogoWrap = styled.div`
  background: ${theme.base.colors.background};
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  z-ndex: 1;
`;

const Logo = styled.img`
  max-width: calc(100% - ${logoMargin * 2}px);
  max-height: calc(100vh - ${logoMargin * 2}px);
  margin: ${logoMargin}px;
  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-top: ${logoMargin + 26}px;
  }
`;

export default function Home({cmsData, about, contact }) {

  const [descriptionPanelActive, setDescriptionPanelActive] = useState(false)
  const [activeImage, setActiveImage] = useState({id: null, title: null, description: null})
  const [aboutPanelActive, setAboutPanelActive] = useState(false)
  const [contactPanelActive, setContactPanelActive] = useState(false)

  const openDescriptionPanel = () => setDescriptionPanelActive(true)
  const closeDescriptionPanel = () => {
    setDescriptionPanelActive(false);
    setActiveImage({id: null, title: null, description: null});
  }
  const openAboutPanel = () => {
    trackEvent('Footer Info Link', 'Click', about.fields.title);
    setAboutPanelActive(true)
  }
  const closeAboutPanel = () => setAboutPanelActive(false)
  const openContactPanel = () => {
    trackEvent('Footer Info Link', 'Click', contact.fields.title);
    setContactPanelActive(true)
  }
  const closeContactPanel = () => setContactPanelActive(false)

  let descriptionPanelAnimationTimeout;

  const handleImageClick = ({id, title, description}) => {
    // if they click on the active image, close the panel
    if(activeImage.id === id) {
      closeDescriptionPanel();
    }
    else {
      // if they click on an image while the panel is open, close it and then open it again
      if(descriptionPanelActive) {
        closeDescriptionPanel();
        descriptionPanelAnimationTimeout = setTimeout(() => {
          trackEvent('Portfolio Image', 'Click', title);
          setActiveImage({id, title, description})
          openDescriptionPanel()
        }, theme.imageInfoPanel.transitionTime)
        
      }
      // if they click on an image and there is no active image, open it
      else {
        trackEvent('Portfolio Image', 'Click', title);
        setActiveImage({id, title, description})
        openDescriptionPanel(true)
      }
    }
  }

  useEffect(() => {
    return () => {
      if(descriptionPanelAnimationTimeout) {
        clearTimeout(descriptionPanelAnimationTimeout)
      }
    };
  }, []);

  const opengraphImage = cmsData.fields.opengraphImage.fields.file.url;
  const heroImage = cmsData.fields.heroImage.fields.file.url;

  return (

  <>
    <Head>
      <title>{cmsData.fields.pageTitle}</title>
      <meta name="description" content={cmsData.fields.pageDescription} />
      <meta property="og:image" content={`${opengraphImage}?w=800`} />
      <link rel="icon" href="/favicon.png" />
    </Head>
    <GlobalStyle />
    <div>
      <Nav>
        <NavButton onClick={openAboutPanel}>About</NavButton>
        <NavButton onClick={openContactPanel}>Contact</NavButton>
      </Nav>
    <PageWrapper modalOpen={descriptionPanelActive}>
      <LogoWrap>
        <Logo src={`${heroImage}?w=1600`} alt="hero image" />
      </LogoWrap>
      <ImageList images={cmsData.fields.imageList} onImageClick={handleImageClick} />
      <DescriptionPanel active={descriptionPanelActive} title={activeImage.title} description={activeImage.description} onClose={closeDescriptionPanel} />
      <InfoPanel active={aboutPanelActive} fields={about.fields} onClose={closeAboutPanel} />
      <InfoPanel active={contactPanelActive} fields={contact.fields} onClose={closeContactPanel} />
    </PageWrapper>
    </div>
  </>
  )
}


export async function getStaticProps() {
  const cmsData = await fetchContent('7MhAM9THkkKci0e0oIeYQa');
  const about = await fetchContent('5aXWUUNjqMWA6cOoUAEccW');
  const contact = await fetchContent('24kTSS8CcIkG8SOawago8c');

  return {
    props: {
      cmsData,
      about,
      contact,
    },
  }
}
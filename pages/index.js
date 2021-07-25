/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import { fetchContent } from '../utils/contentful'

const Wrapper = styled.div`
  background: hotpink;
`;

const Background = styled.div`
  background: #f5dcd2;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 1;
  img {
    max-width: calc(100% - 60px);
    max-height: calc(100vh - 60px);
    margin: 30px;
  }
`;

const Images = styled.div`
  margin: 102vh 0 0 0;
  z-index: 2;
  position: relative;
`;

const ImageElement = styled.div`
  margin: 20vh 0;
  text-align: center;
`;

export default function Home({cmsData, about, contact }) {


  const opengraphImage = cmsData.fields.opengraphImage.fields.file.url;
  const heroImage = cmsData.fields.heroImage.fields.file.url;
  return (
    <Wrapper>
      <Head>
        <title>{cmsData.fields.pageTitle}</title>
        <meta name="description" content={cmsData.fields.pageDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
   
      <img src={`${opengraphImage}?w=400`} alt="og image" />
      <Background><img src={`${heroImage}?w=400`} alt="hero image" /></Background>

      <Images>
        {cmsData.fields.imageList.map(image => {
          const imagePath = image.fields.media.fields.file.url;
          const imageSlug = image.fields.slug;
          const imageHeight = image.fields.imageHeight;
          const imageOffset = image.fields.imageOffset;
          const imageTitle = image.fields.title;
          const imageDescription = image.fields.longDescription;
          console.log(imageHeight, imageOffset)
          return (
            <ImageElement key={imageSlug} className="post">
              <img src={`${imagePath}?w=400`} alt={imageTitle} />
              <div>{imageTitle}</div>
              {imageDescription &&
              <p>{imageDescription}</p>
              }
            </ImageElement>
          )
        })}
      </Images>

      <h2>About</h2>
      {about.fields.contentModules.map(module => {
        const contentType = module.sys.contentType.sys.id;
        return(
          <div key={module.sys.id}>
              {contentType === "text" &&
                <ReactMarkdown>{module.fields.text}</ReactMarkdown>
              }
              {contentType === "button" &&
                <a href={module.fields.buttonLink}>{module.fields.buttonText}</a>
              }
          </div>
        )
      })}

      <h2>Contact</h2>
      {contact.fields.contentModules.map(module => {
        const contentType = module.sys.contentType.sys.id;
        return(
          <div key={module.sys.id}>
              {contentType === "text" &&
                <ReactMarkdown>{module.fields.text}</ReactMarkdown>
              }
              {contentType === "button" &&
                <a href={module.fields.buttonLink}>{module.fields.buttonText}</a>
              }
               {contentType === "credit" &&
                <ReactMarkdown>{module.fields.credit}</ReactMarkdown>
              }
          </div>
        )
      })}

    </Wrapper>
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
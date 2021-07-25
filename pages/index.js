/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import { fetchContent } from '../utils/contentful'

const Wrapper = styled.div`
  background: hotpink;
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
      <img src={`${heroImage}?w=400`} alt="hero image" />

      {cmsData.fields.imageList.map(image => {
        const imagePath = image.fields.media.fields.file.url;
        const imageSlug = image.fields.slug;
        const imageHeight = image.fields.imageHeight;
        const imageOffset = image.fields.imageOffset;
        const imageTitle = image.fields.title;
        const imageDescription = image.fields.longDescription;
        return (
        <div key={imageSlug} className="post">
          <img src={`${imagePath}?w=400`} alt={imageTitle} />
          <div>{imageTitle}</div>
          {imageDescription &&
          <p>{imageDescription}</p>
          }
          </div>
        )
      })}

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
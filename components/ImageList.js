import React from 'react'
import styled from 'styled-components'
import theme from '../theme/theme'
import helpCursor from '../public/cursors/help.png'

const ImageWrap = styled.div`
    margin: 20vh 0;
    text-align: center;
    @media (max-width: ${theme.breakpoints.mobile}) {
        margin: 10vh 0;
    }
    @media (min-width: ${theme.breakpoints.mobile}) {
        ${({imageOffset}) => {
            if(imageOffset === 'left-s') {
                return `padding: 0 0 0 40px;`
            }
            if(imageOffset === 'left-m') {
                return `padding: 0 0 0 60px;`
            }
            if(imageOffset === 'left-l') {
                return `padding: 0 0 0 80px;`
            }
            if(imageOffset === 'right-s') {
                return `padding: 0 40px 0 0;`
            }
            if(imageOffset === 'right-m') {
                return `padding: 0 60px 0 0;`
            }
            if(imageOffset === 'right-l') {
                return `padding: 0 80px 0 0;`
            }
        }}
    }
`;

const ImageElementWrap = styled.div`
    display: inline-block; // sometimes the wrapper is a button, so it needs to be a block element
    background: none;
    border: 0;
    padding: 0;
    transform: rotate(-1deg);
    max-width: 90%;
    ${({as}) => as === 'button' ? `cursor: url(${helpCursor.src}), help;`: ``}
`;

const Images = styled.div`
    margin: 102vh 0 0 0;
    padding: 0;
    z-index: 2;
    position: relative;
    ${ImageWrap}:nth-child(even) ${ImageElementWrap} {
        transform: rotate(1deg);
    }
    @media (max-width: ${theme.breakpoints.mobile}) {
        margin-top: 45vh;
    }
`;

const ImageElementImage = styled.img`
    height: auto;
    max-height: 90vh;
    max-width: 100%;
    @media (min-width: ${theme.breakpoints.mobile}) {
        ${({imageHeight}) => {
            if(imageHeight === 's') {
                return `max-height: 70vh`;
            }
            if(imageHeight === 'm') {
                return `max-height: 90vh`;
            }
            if(imageHeight === 'l') {
                return `max-height: 120vh`;
            }
            if(imageHeight === 'xl') {
                return `max-height: 150vh`;
            }
        }}
    }
`;


const ImageElement = ({imagePath, imageTitle, imageDescription, imageHeight, onImageClick}) => {
    const handleClick = () => {
        onImageClick({title: imageTitle, description: imageDescription})
    }
    return (
        <ImageElementWrap as={imageDescription? `button` : `div`} onClick={imageDescription ? handleClick : null}>
            <ImageElementImage src={`${imagePath}?w=1000`} alt={imageTitle} imageHeight={imageHeight} />
        </ImageElementWrap>
    )
}

export default function ImageList({images, onImageClick}) {
    return (
        <Images>
          {images.map(image => {
            const imagePath = image.fields.media.fields.file.url;
            const imageSlug = image.fields.slug;
            const imageHeight = image.fields.imageHeight;
            const imageOffset = image.fields.imageOffset;
            const imageTitle = image.fields.title;
            const imageDescription = image.fields.longDescription;
            return (
              <ImageWrap key={imageSlug} imageOffset={imageOffset}>
                <ImageElement imagePath={imagePath} imageTitle={imageTitle} imageDescription={imageDescription} imageHeight={imageHeight} onImageClick={onImageClick} />
              </ImageWrap>
            )
          })}
        </Images>
    )
}

import React from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import theme from '../theme/theme'

const Panel = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
    background: ${theme.base.colors.modalBackground};
    border-top: 5px solid ${theme.base.colors.modalBorder};
    width: 100%;
    height: 100vh;
    ${({active}) => active ? `margin-top: 0; visibility: visible;` : `margin-top: 100vh; visibility: hidden;`}
    display: flex;
    transition: all 300ms ease-in-out;
    align-items: center;
    color: ${theme.base.colors.modalCopy};
`;

const PanelContent = styled.div`
    width: 80%;
    margin: 0 auto;
    max-width: 26em;
`;

const Title = styled.h1`
    text-align: center;
    font-size: 1.5em;
    margin-bottom: 0.83em;
`;

const CloseButton = styled.button`
    background: none;
    border: 0;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    svg path {
    transition: fill 300ms ease-in-out;
    }
    &:hover svg path {
    fill: ${theme.base.colors.iconHover};
    }
`;

const AlignmentWrap = styled.div`
    ${({alignment}) => alignment ? `text-align: ${alignment};` : ``}
`;


const Button = styled.a`
    color: ${theme.base.colors.copyLink};
    font-family: sans-serif;
    transition: color 300ms ease-in-out;
    ${({buttonStyle}) => buttonStyle === 'primary' ? `font-size: ${theme.cta.primaryFontSize};` : `font-size: ${theme.cta.secondaryFontSize};`}
    &:hover {
      color: ${theme.base.colors.copyLinkHover};
    }
`;

const Credit = styled.div`
    @media (min-width: ${theme.breakpoints.mobile}) {
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        margin-top: 0;
        width: 100%;
        padding-right: 30px;
        text-align: right;
    }
    margin-top: 60px;
    a {
        color: red;
        &:hover {
            color: white;
        }
    }
`;

export default function InfoPanel({active, fields, onClose}) {
    const {title, contentModules} = fields;
    return (
        <Panel active={active}>
            <CloseButton type="button" onClick={onClose} aria-label={`Close ${title} Panel`}>
            <svg
              width="48"
              height="48"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill={theme.base.colors.icon} d="M 36.019531 8.445313 L 39.558594 11.980469 L 11.980469 39.554688 L 8.445313 36.019531 Z " />
              <path fill={theme.base.colors.icon} d="M 39.554688 36.023438 L 36.019531 39.558594 L 8.445313 11.976563 L 11.980469 8.441406 Z " />
            </svg>
          </CloseButton>
            <PanelContent>
                <Title>{title}</Title>
                {contentModules.map(module => {
                    const contentType = module.sys.contentType.sys.id;
                    return(
                    <div key={module.sys.id}>
                        {contentType === "text" &&
                        <div>
                            {module.fields.hideSubtitle === false &&
                                <h2>{module.fields.subtitle}</h2>
                            }
                            <AlignmentWrap alignment={module.fields.textAlignment}>
                                <ReactMarkdown>{module.fields.text}</ReactMarkdown>
                            </AlignmentWrap>
                        </div>
                        }
                        {contentType === "button" &&
                            <AlignmentWrap alignment={module.fields.buttonAlignment}>
                                <Button buttonStyle={module.fields.buttonStyle}
                                    href={module.fields.buttonLink}
                                    target={module.fields.openInANewWindow ? '_blank' : undefined}
                                    rel={module.fields.openInANewWindow ? 'noopener noreferrer' : undefined}
                                >
                                    {module.fields.buttonText}</Button>
                            </AlignmentWrap>
                        }
                        {contentType === "credit" &&
                             <Credit><ReactMarkdown>{module.fields.credit}</ReactMarkdown></Credit>
                        }
                    </div>
                    )
                })}
            </PanelContent>
        </Panel>
    )
}

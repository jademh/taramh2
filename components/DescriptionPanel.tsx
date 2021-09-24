import React from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import theme from "../theme/theme";

const Panel = styled.div<{ active: boolean }>`
  position: fixed;
  background: ${theme.base.colors.modalBackground};
  border-right: 5px solid ${theme.base.colors.modalBorder};
  height: 100%;
  top: 0;
  ${({ active }) =>
    active
      ? `left: 0; visibility: visible;`
      : `left: -${theme.imageInfoPanel.width}; visibility: hidden;`}
  width: ${theme.imageInfoPanel.width};
  padding: 0 20px;
  overflow-y: auto;
  z-index: 6;
  transition: all ${theme.imageInfoPanel.transitionTime}ms ease-in-out;
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100%;
    ${({ active }) => (active ? `left: 0;` : `left: -100%;`)}
  }
`;

const CloseButton = styled.button`
  background: none;
  border: 0;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  width: 36px;
  padding: 0;
  margin-top: -4px;
  svg {
    width: 100%;
  }
  svg path {
    transition: fill 300ms ease-in-out;
  }
  &:hover svg path {
    fill: ${theme.base.colors.iconHover};
  }
`;

const Title = styled.h2`
  padding-right: 30px;
`;

export default function DescriptionPanel({
  title,
  description,
  active,
  onClose,
}: {
  title: string;
  description: string;
  active: boolean;
  onClose: () => void;
}) {
  return (
    <Panel active={active}>
      <Title>{title}</Title>
      <ReactMarkdown>{description}</ReactMarkdown>
      <CloseButton
        type="button"
        aria-label="Close image info panel"
        onClick={onClose}
      >
        <svg
          viewBox="0 0 48 48"
          width="48"
          height="48"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={theme.base.colors.icon}
            d="M 36.019531 8.445313 L 39.558594 11.980469 L 11.980469 39.554688 L 8.445313 36.019531 Z "
          />
          <path
            fill={theme.base.colors.icon}
            d="M 39.554688 36.023438 L 36.019531 39.558594 L 8.445313 11.976563 L 11.980469 8.441406 Z "
          />
        </svg>
      </CloseButton>
    </Panel>
  );
}

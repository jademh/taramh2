import React from "react";
import Head from "next/head";
import Link from "next/link";
import styled, { createGlobalStyle } from "styled-components";
import theme from "../theme/theme";

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
`;

const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
`;

export default function Custom404() {
  return (
    <PageWrapper>
      <Head>
        <title>Page Not Found</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <GlobalStyle />
      <h1>404 - Page not Found</h1>
      <p>
        That page does not exist... try <Link href="/">here</Link>.
      </p>
    </PageWrapper>
  );
}

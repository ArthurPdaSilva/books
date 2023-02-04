import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head>
        <meta name="author" content="Arthur Pereira da Silva" />
        <meta name="keywords" content="read, book, react, books" />
        <meta name="description" content="Web site for ardent readers" />
        <link rel="shortcut icon" href="open-book.png" type="image/x-icon" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

import "./globals.css";
// import Head from "next/head";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <Head>
      <link rel="stylesheet" type="text/css" href="https://bitcointalk.org/Themes/custom1/style.css" />
      <link rel="stylesheet" type="text/css" href="https://bitcointalk.org/Themes/default/print.css" media="print" /><style type="text/css"></style>
    </Head> */}
      <body>
        {children}
      </body>
    </html>
  );
}

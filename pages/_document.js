import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from 'next/script';
import Container from '@mui/material/Container';
class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>


                    <link rel="preconnect" href="https://fonts.googleapis.com" />

                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    />

                    <Script id="gtag-link" strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />

                    <Script id="gtag-load" strategy="lazyOnload">
                        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
                `}
                    </Script>

                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <Container sx={{ pt: 2 }}>
                        <Script id="ad-load"> {`
	atOptions = {
		'key' : '7e4f681717ace319e62de052b7970e7d',
		'format' : 'iframe',
		'height' : 90,
		'width' : 728,
		'params' : {}
	};
	document.write('<scr' + 'ipt type="text/javascript" src="http' + (location.protocol === 'https:' ? 's' : '') + '://www.profitabledisplayformat.com/7e4f681717ace319e62de052b7970e7d/invoke.js"></scr' + 'ipt>');
    `}
                        </Script></Container>
                </body>
            </Html>
        );
    }
}

export default MyDocument;

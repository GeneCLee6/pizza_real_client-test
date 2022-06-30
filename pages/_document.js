import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
						crossOrigin="true"
					/>
					<link
						rel="stylesheet preload"
						href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,700&display=swap"
						media="print"
						type="text/css"
						onLoad="this.media='all'"
					/>
					<noscript>
						<link
							rel="stylesheet"
							type="text/css"
							href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,700&display=swap"
						/>
					</noscript>
					<noscript>
						<link
							rel="stylesheet"
							type="text/css"
							href="https://fonts.googleapis.com/css2?family=Festive&family=Open+Sans:ital@1&family=Playfair+Display:ital,wght@1,500&display=swap"
						></link>
					</noscript>
					<script src="https://www.paypal.com/sdk/js?client-id=ARp6ZbbCpWj1DVSrekXNSHlmeh8ha2AnHwhQtgrdt6Z1tDbBjLxETrDE5Vbaa4-twUiJazTxI6SLge9U&currency=AUD"></script>
					<script
						defer
						src="https://www.paypalobjects.com/api/checkout.js"
					></script>
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta
						name="apple-mobile-web-app-status-bar-style"
						content="black-translucent"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;

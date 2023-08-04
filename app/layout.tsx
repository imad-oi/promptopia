import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";
import Head from "next/head";

// export const metaData = {
//     title: 'Promptopia',
//     description: 'Promptopia is a place for writers to get inspiration for their next story.',
// }

const Rootlayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <html lang='en'>
            <Head>
                <title>Promptopia</title>
                <meta
                    name="description"
                    content="Ceci est la description de votre page"
                />
                <meta http-equiv="Content-Security-Policy" content="worker-src 'self' blob:" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <body >
                <Provider>
                    <div className='main'>
                        <div className='gradient'></div>
                    </div>
                    <main className="app">
                        <Nav />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    )
}

export default Rootlayout
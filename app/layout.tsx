import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";

export const metaData = {
    title: 'Promptopia',
    description: 'Promptopia is a place for writers to get inspiration for their next story.',
}

const Rootlayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <html lang='en'>
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
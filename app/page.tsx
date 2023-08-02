import Feed from "@components/Feed"


const Home = () => {
    return (
        <div>
            <section className="w-full flex-center flex-col">
                <h1 className="head_text text-center">
                    Discover & Share
                    <br className="max-md:hidden" />
                    <span className="orange_gradient text-center">
                        AI-Powred Prompts
                    </span>
                </h1>
                <p className="desc text-center">
                    Promptopia is a place for writers to get inspiration for their next story
                </p>

                <Feed />
            </section>
        </div>
    )
}

export default Home
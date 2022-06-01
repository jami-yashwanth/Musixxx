import Navbar from "./Navbar";

const AboutPage = () => {
    return (
        <div className="bg-searchPage min-h-screen bg-cover bg-fixed bg-center">
            <Navbar />
            <div className="grid place-items-center text-white">
                <div className="rounded-lg text-sm mt-10 grid place-items-center bg-gray-300 p-8 bg-opacity-20 bg-clip-padding backdrop-blur">
                    <span className="text-3xl font-bold">Technologies Used </span> <br />
                    <div>
                        <p className="mt-4 text-xl">➡️ Frontend - <span className="italic">ReactJS</span> <br /></p>
                        <p className="mt-4 text-xl">➡️ Backend  - <span className="italic">NodeJS , ExpressJS</span> <br /></p>
                        <p className="mt-4 text-xl">➡️ Database - <span className="italic">MongoDB</span> <br /></p>
                        <p className="mt-4 text-xl">➡️ API      - <span className="italic">Spotify API </span><br /></p>
                        <p className="mt-4 text-xl">➡️ Secured Authentication - <span className="italic">JWT (JsonWebTokens)</span> <br /></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutPage;
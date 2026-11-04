import Navbar from "./Navbar.comp";

function HeroSection() {
    return (
        <section id="section-1" className="hero-section">
            <Navbar />

            <div className="middle">
                <div className="left">
                    <h1>
                        WE <br />
                        Make <br />
                        Good <br />
                        Shit
                    </h1>
                </div>

                <div className="right">
                    <span className="hero-index">01 / 03</span>
                    <span className="hero-label">
                        INDEPENDENT CREATIVE STUDIO
                    </span>
                </div>
            </div>


            <div className="first-line" />
            <div className="second-line" />
        </section>
    );
}

export default HeroSection

const Navbar=()=>{
    return(
        <>
            <div>
                        <meta charSet="UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <title>Reddish Orange Navbar</title>
                        <link
                            rel="stylesheet"
                            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
                        />
                        {/* Import a new font for nav menu only */}
                        <link
                            href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap"
                            rel="stylesheet"
                        />
                        <style
                            dangerouslySetInnerHTML={{
                            __html: `
                                @keyframes neon-pulse {
                                0%, 100% { 
                                    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 
                                                0 0 20px #00ffff, 0 0 35px #00ffff, 0 0 40px #00ffff, 
                                                0 0 50px #00ffff, 0 0 75px #00ffff; 
                                }
                                50% { 
                                    text-shadow: 0 0 2px #fff, 0 0 5px #fff, 0 0 7px #fff, 
                                                0 0 10px #00ffff, 0 0 17px #00ffff, 0 0 20px #00ffff, 
                                                0 0 25px #00ffff, 0 0 37px #00ffff; 
                                }
                                }

                                .neon-text {
                                animation: neon-pulse 1.5s infinite alternate;
                                }

                                .bg-animated {
                                background: linear-gradient(-45deg, #FF4500, #FF6347, #FF7F50, #FF4500);
                                background-size: 400% 400%;
                                animation: gradient 15s ease infinite;
                                }

                                @keyframes gradient {
                                0% { background-position: 0% 50%; }
                                50% { background-position: 100% 50%; }
                                100% { background-position: 0% 50%; }
                                }

                                .cyber-grid {
                                background-image: linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                                                    linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px);
                                background-size: 20px 20px;
                                animation: cyber-grid-move 20s linear infinite;
                                }

                                @keyframes cyber-grid-move {
                                0% { background-position: 0 0; }
                                100% { background-position: 20px 20px; }
                                }

                                /* New nav menu style */
                                .nav-link {
                                font-family: 'Orbitron', monospace;
                                font-weight: 500;
                                color: #fff; /* Changed to white for visibility */
                                text-transform: uppercase;
                                letter-spacing: 0.1em;
                                padding: 6px 10px;
                                border: 2px solid transparent;
                                border-radius: 6px;
                                transition: all 0.3s ease;
                                position: relative;
                                overflow: hidden;
                                text-shadow: 0 0 5px rgba(255, 255, 255, 0.7);
                                }

                                .nav-link:hover {
                                color: #00ffff;
                                border-color: #00ffff;
                                background: rgba(0, 255, 255, 0.15);
                                box-shadow: 0 0 8px #00ffff;
                                }

                                /* Remove old neon underline and gradient hover for nav */
                                .nav-link::before,
                                .nav-link::after {
                                display: none;
                                }

                                /* Keep glitch effect exactly for CYBERLINK */
                                .glitch-effect {
                                position: relative;
                                }

                                .glitch-effect::before,
                                .glitch-effect::after {
                                content: attr(data-text);
                                position: absolute;
                                top: 0;
                                left: 0;
                                width: 100%;
                                height: 100%;
                                opacity: 0.8;
                                }

                                .glitch-effect::before {
                                left: 2px;
                                text-shadow: -2px 0 #ff00de;
                                clip: rect(24px, 550px, 90px, 0);
                                animation: glitch-anim 3s infinite linear alternate-reverse;
                                }

                                .glitch-effect::after {
                                left: -2px;
                                text-shadow: -2px 0 #00ffff;
                                clip: rect(85px, 550px, 140px, 0);
                                animation: glitch-anim 2s infinite linear alternate-reverse;
                                }

                                @keyframes glitch-anim {
                                0% { clip: rect(39px, 9999px, 71px, 0); }
                                20% { clip: rect(3px, 9999px, 5px, 0); }
                                40% { clip: rect(6px, 9999px, 38px, 0); }
                                60% { clip: rect(13px, 9999px, 43px, 0); }
                                80% { clip: rect(44px, 9999px, 93px, 0); }
                                100% { clip: rect(54px, 9999px, 47px, 0); }
                                }
                            `,
                            }}
                        />
                        <nav
                            className="fixed w-full z-50 bg-animated cyber-grid"
                            style={{ backgroundColor: "#FF4500" }}
                        >
                            <div className="container mx-auto px-4">
                            <div className="flex justify-between items-center py-4">
                                <a
                                href="#"
                                className="text-2xl font-bold neon-text glitch-effect"
                                data-text="THE 90's RESTAURANT & BAR"
                                >
                                THE 90's RESTAURANT & BAR
                                </a>

                                <input type="checkbox" id="menu-toggle" className="hidden" />
                                <label htmlFor="menu-toggle" className="menu-icon cursor-pointer md:hidden">
                                <span className="hamburger" />
                                </label>

                                <ul className="menu hidden md:flex md:items-center space-x-6">
                                <li>
                                    <a href="#" className="nav-link" data-text="Home">
                                    Home
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link" data-text="Features">
                                    Features
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link" data-text="About">
                                    About
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link" data-text="Contact">
                                    Contact
                                    </a>
                                </li>
                                <li>
                                    <a
                                    href="#"
                                    className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-2 px-4 rounded hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
                                    >
                                    Sign Up
                                    </a>
                                </li>
                                </ul>
                            </div>
                            </div>
                        </nav>
            </div>


        </>
    )
}

export default Navbar
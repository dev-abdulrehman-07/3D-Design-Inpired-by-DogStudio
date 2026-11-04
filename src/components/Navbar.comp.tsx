import Logo from "./Logo.comp";

function Navbar() {
    return (
        <nav className="navbar">
            <Logo />

            <div className="nav-elem reel">
                <i className="ri-arrow-right-s-line" />
                Our Show reel
            </div>

            <button className="nav-elem menu-btn" aria-label="Open menu">
                <i className="ri-menu-3-line" />
            </button>
        </nav>
    );
}

export default Navbar;
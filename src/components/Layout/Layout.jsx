import Header from "../Header/Header";
import NavMenu from "../NavMenu/NavMenu";

function Layout({ children }) {
    return (
        <>
            <Header />
            <NavMenu />
            <main>{children}</main>
        </>
    )
}

export default Layout;
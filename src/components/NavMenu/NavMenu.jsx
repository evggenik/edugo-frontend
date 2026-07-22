import { Link, useLocation } from "react-router-dom";
import "./NavMenu.css";

const menuItems = [
    { label: "Мои классы", path: "/classes" },
    { label: "Журналы", path: "/journal" },
    { label: "Расписание", path: "/teachers" },
];

function NavMenu() {
    const location = useLocation();

    return (
        <nav className="nav-menu">
            {menuItems.map(item => (
                <Link
                    key={item.path}
                    to={item.path}
                    className={location.pathname === item.path ? "nav-item active" : "nav-item"}
                >
                    {item.label}
                </Link>
            ))}
        </nav>
    )
}

export default NavMenu;
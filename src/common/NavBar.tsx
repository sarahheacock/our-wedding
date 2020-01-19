import * as React from "react";
import { Link, withRouter } from "react-router-dom";

interface Props {
    routes: ReadonlyArray<{
        path: string;
        name: string;
    }>;
    launchModal: () => void;
}

class NavBarBase extends React.Component<Props> {
    render(): JSX.Element {
        const { routes, launchModal, location } = this.props;
        const buttons = routes.map(({ path, name }) => (
            <li key={`button${name}`}>
                <Link
                    to={path}
                    className={`navigation-item ${location.pathname === path ? "active-navigation-item" : "navigation-item-hover"}`}
                >{name}</Link>
            </li>
        ));

        return (
            <div className="bar">
                <nav className="navbar">
                    <h1 className="logo">{"Sarah & Adam"}</h1>
                    <ul className="navigation">
                        {buttons}
                        <li><a className="navigation-item navigation-item-hover" onClick={launchModal}>RSVP</a></li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export const NavBar = withRouter((props) => <NavBarBase {...props} />);

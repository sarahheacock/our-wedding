import * as React from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

interface Props {
    routes: ReadonlyArray<{
        path: string;
        name: string;
    }>;
    launchModal: () => void;
}

interface State {
    isHidden: boolean;
}

class NavBarBase extends React.Component<Props & RouteComponentProps, State> {
    state: Readonly<State> = {
        isHidden: true,
    };

    toggle = (): void => {
        this.setState({ isHidden: !this.state.isHidden });
    }

    render(): JSX.Element {
        const { isHidden } = this.state;
        const { routes, launchModal, location } = this.props;
        const buttons = routes.map(({ path, name }) => (
            <Link
                key={`button${name}`}
                to={path}
                className={`${location.pathname === path ? "active-item" : "nav-item"}`}
            >{name}</Link>
        ));

        return (
            <div className={`topnav ${(isHidden ? "" : "responsive")}`}>
                <h2 className="logo">{"Sarah & Adam"}</h2>
                <span className="button-group">
                    {buttons}
                    <a className="nav-item" onClick={launchModal}><b>RSVP</b></a>
                    <a className="icon" onClick={this.toggle}>
                        <i className="fa fa-bars"></i>
                    </a>
                </span>
            </div>
        );
    }
}

export const NavBar = withRouter(NavBarBase as any) as any as React.ComponentType<Props>;

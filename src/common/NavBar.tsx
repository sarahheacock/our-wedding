import * as React from "react";
import { Link } from "react-router-dom";

interface Props {
    routes: ReadonlyArray<{
        path: string;
        name: string;
    }>;
}

export class NavBar extends React.Component<Props> {
    render(): JSX.Element {
        const { routes } = this.props;
        const buttons = routes.map(({ path, name }) => (
            <li key={`button${name}`}>
                <Link to={path}>{name}</Link>
            </li>
        ));

        return (
            <nav>
                <ul>
                    {buttons}
                </ul>
            </nav>
        );
    }
}

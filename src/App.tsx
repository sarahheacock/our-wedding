import * as React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import { NavBar } from "./common/index";
import "./styles/main.scss";

interface Props {
    routes: ReadonlyArray<{
        path: string;
        name: string;
        MyRoute: () => JSX.Element;
    }>;
}

class App extends React.Component<Props> {
    render(): JSX.Element {
        const { routes } = this.props;
        const routeLayouts = routes.map(({ path, MyRoute }) => (
            <Route exact path={path} key={path}>
                <MyRoute />
            </Route>
        ));
        const routeLinks = routes.map(({ path, name }) => ({
            name,
            path,
        }));

        return (
            <Router>
                <div>
                    <NavBar routes={routeLinks} />
                    <Switch>{routeLayouts}</Switch>
                </div>
            </Router>
        );
    }
}

export default App;

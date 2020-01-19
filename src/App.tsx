import * as React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import { NavBar, Modal, RSVP, Footer } from "./common/index";

import "./styles/main.scss";
// import "./styles/modal.scss";
// import "./styles/navbar.scss";

interface Props {
    routes: ReadonlyArray<{
        path: string;
        name: string;
        MyRoute: () => JSX.Element;
    }>;
}

interface State {
    isModalOpen: boolean;
}

class App extends React.Component<Props, State> {
    state: Readonly<State> = {
        // isModalOpen: false,
        isModalOpen: true,
    };

    closeModal = (): void => {
        this.setState({ isModalOpen: false });
    }

    launchModal = (): void => {
        this.setState({ isModalOpen: true });
    }

    render(): JSX.Element {
        const { routes } = this.props;
        const { isModalOpen } = this.state;

        const routeLayouts = routes.map(({ path, MyRoute }) => (
            <Route exact path={path} key={`route${path}`}>
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
                    <NavBar routes={routeLinks} launchModal={this.launchModal} />
                    <Switch>{routeLayouts}</Switch>
                    <Footer launchModal={this.launchModal} />
                    <Modal isOpen={isModalOpen} closeModal={this.closeModal}>
                        <RSVP onSubmit={this.closeModal} />
                    </Modal>
                </div>
            </Router>
        );
    }
}

export default App;

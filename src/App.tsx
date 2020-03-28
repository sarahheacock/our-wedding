import * as React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import { Corona, CoronaAlert, NavBar, Modal, RSVP, Footer } from "./common/index";

import "./styles/main.scss";

interface Props {
    routes: ReadonlyArray<{
        path: string;
        name: string;
        MyRoute: () => JSX.Element;
    }>;
}

interface State {
    isModalOpen: {
        corona: boolean;
        rsvp: boolean;
    };
}

class App extends React.Component<Props, State> {
    state: Readonly<State> = {
        isModalOpen: {
            corona: false, // TODO
            rsvp: false,
        },
        // isModalOpen: true,
    };

    closeModal = (): void => {
        this.setState({
            isModalOpen: {
                corona: false,
                rsvp: false,
            },
        });
    }

    launchModal = (type: keyof State["isModalOpen"]): void => {
        this.setState({
            isModalOpen: {
                ...this.state.isModalOpen,
                [type]: true,
            },
        });
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

        const modalOpen = Object.values(isModalOpen).reduce((cumm, curr) => (cumm || curr), false);

        let modalContent: JSX.Element | null = null;
        if (isModalOpen.rsvp) {
            modalContent = <RSVP onSubmit={this.closeModal} />;
        } else if (isModalOpen.corona) {
            modalContent = <Corona onSubmit={this.closeModal} />;
        }

        return (
            <Router>
                <div>
                    <CoronaAlert launchModal={() => this.launchModal("corona")} />
                    <NavBar routes={routeLinks} launchModal={() => this.launchModal("rsvp")} />
                    <Switch>{routeLayouts}</Switch>
                    <Footer launchModal={() => this.launchModal("rsvp")} />
                    <Modal isOpen={modalOpen} closeModal={this.closeModal}>
                        {modalContent}
                    </Modal>
                </div>
            </Router>
        );
    }
}

export default App;

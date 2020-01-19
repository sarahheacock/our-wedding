import * as React from "react";
import * as ReactDOM from "react-dom";

import {
    Home,
    WhenWhere,
    Hotels,
    Registry,
    SongList,
} from "./routes/index";
import App from "./App";

const routes: ReadonlyArray<{
        path: string;
        name: string;
        MyRoute: () => JSX.Element;
    }> = [{
        MyRoute: (): JSX.Element => <Home />,
        name: "Home",
        path: "/",
    }, {
        MyRoute: (): JSX.Element => <WhenWhere />,
        name: "When & Where",
        path: "/when-where",
    }, {
        MyRoute: (): JSX.Element => <Hotels />,
        name: "Hotels",
        path: "/hotels",
    }, {
        MyRoute: (): JSX.Element => <Registry />,
        name: "Registry",
        path: "/registry",
    }, {
        MyRoute: (): JSX.Element => <SongList />,
        name: "Song Requests",
        path: "/song-list",
    }];

ReactDOM.render(
    <App routes={routes} />,
    document.getElementById("root"),
);

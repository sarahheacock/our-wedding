import * as React from "react";
import * as ReactDOM from "react-dom";

import {
    Home,
    EventDetails,
    Registry,
    RSVP,
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
        MyRoute: (): JSX.Element => <EventDetails />,
        name: "Event Details",
        path: "/event-details",
    }, {
        MyRoute: (): JSX.Element => <Registry />,
        name: "Registry",
        path: "/registry",
    }, {
        MyRoute: (): JSX.Element => <SongList />,
        name: "Song Requests",
        path: "/song-list",
    }, {
        MyRoute: (): JSX.Element => <RSVP />,
        name: "RSVP",
        path: "/rsvp",
}];

ReactDOM.render(
    <App routes={routes} />,
    document.getElementById("root"),
);

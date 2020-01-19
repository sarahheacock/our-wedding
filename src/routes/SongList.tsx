import * as React from "react";

export class SongList extends React.Component {
    render(): JSX.Element {
        return (
            <div>
                <div className="cover song-cover">
                    <div className="cover-content song-cover-content">
                        <h2>Come dance with us!</h2>
                    </div>
                </div>
                <div className="content">
                    <h1>Song Requests</h1>
                    <p>Sorry, we're a little slow...<br />
                    We'll get song requests up soon!</p>
                </div>
            </div>
        );
    }
}

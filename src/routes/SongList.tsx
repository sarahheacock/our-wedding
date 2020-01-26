import * as React from "react";

export class SongList extends React.Component {
    render(): JSX.Element {
        return (
            <div>
                <div className="cover song-cover">
                    <div className="cover-content song-cover-content">
                        <h1>Come dance with us!</h1>
                    </div>
                </div>
                <div className="content">
                    <h2>Song Requests</h2>
                    <p>Sorry, we're a little slow...<br />
                    We'll get song requests up soon!</p>
                </div>
            </div>
        );
    }
}

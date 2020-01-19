import * as React from "react";

export class Home extends React.Component {
    render(): JSX.Element {
        return (
            <div>
                <div className="cover home-cover">
                    <div className="cover-content home-cover-content">
                        <h2>We're getting married!
                            <br />Please join us<br />
                            <b>Sunday, June 21st, 2020</b> at <b>Loveless Events</b></h2>
                        <h2><i className="fa fa-chevron-down" aria-hidden="true"></i></h2>
                    </div>
                </div>
                <div className="content">
                    <h1>Come celebrate with us!!</h1>
                    <p>We can't believe 6 years ago we met in organic chemistry class of all places.</p>
                </div>
            </div>
        );
    }
}

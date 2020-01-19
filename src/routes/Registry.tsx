import * as React from "react";

export class Registry extends React.Component {
    render(): JSX.Element {
        return (
            <div>
                <div className="cover registry-cover">
                    <div className="cover-content registry-cover-content">
                        <h2>Gifts...</h2>
                    </div>
                </div>
                <div className="content">
                    <h1>Registry</h1>
                    <p>Sorry, we're a little slow...<br />
                    We'll post links to our registry soon!</p>
                </div>
            </div>
        );
    }
}

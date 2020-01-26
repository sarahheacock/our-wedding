import * as React from "react";

export class Registry extends React.Component {
    render(): JSX.Element {
        return (
            <div>
                <div className="cover registry-cover">
                    <div className="cover-content registry-cover-content">
                        <h1>Gifts...</h1>
                    </div>
                </div>
                <div className="content">
                    <h2>Registry</h2>
                    <p>Sorry, we're a little slow...<br />
                    We'll post links to our registry soon!</p>
                </div>
            </div>
        );
    }
}

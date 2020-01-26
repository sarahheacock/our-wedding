import * as React from "react";

interface Props {
    launchModal: () => void;
}

export class Footer extends React.Component<Props> {
    render(): JSX.Element {
        const { launchModal } = this.props;
        return (
            <div>
                <div className="white-background">
                    <div className="content">
                        <h2>We would love to have you! <i className="fas fa-heart"></i></h2>
                        <p>Click on the RSVP button below</p>
                        <p><button onClick={launchModal} className="rsvp-btn">RSVP</button></p>
                    </div>
                </div>
                <div className="content footer">
                    <a href="http://www.anjphotographer.com/">Photography by Andrea M Scrivanich</a> <i className="fas fa-camera" style={{ fontSize: "1.7em" }}></i>
                </div>
            </div>
        );
    }
}

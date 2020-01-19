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
                        <h3>We would love to have you!</h3>
                        <p><i className="fas fa-heart"></i></p>
                        <a href="#" onClick={launchModal} className="rsvp-btn">RSVP here</a>
                    </div>
                </div>
                <div className="content footer">
                    <a href="http://www.anjphotographer.com/">Photography by Andrea M Scrivanich <i className="fas fa-camera"></i></a>
                    {/* <p>Icons made by <span><a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></span></p> */}
                </div>
            </div>
        );
    }
}

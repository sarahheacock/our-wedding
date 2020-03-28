import * as React from "react";

interface Props {
    launchModal: () => void;
}

export class CoronaAlert extends React.Component<Props> {
    render(): JSX.Element {
        const { launchModal } = this.props;
        return (
            <div className="alert">
                <p>
                    <i className="fas fa-exclamation-triangle"></i> During COVID-19,
                    we want to make sure everyone stays safe while celabrating with us.<br />
                    <a onClick={launchModal}>Join our email list</a> for the latest info
                </p>
            </div>
        );
    }
}

import * as React from "react";

interface Props {
    isOpen: boolean;
    closeModal: () => void;
}

interface State {

}

export class Modal extends React.Component<Props, State> {
    state: Readonly<State> = {
        
    };

    render(): JSX.Element {
        const { children, isOpen, closeModal } = this.props;
        return (
            <div className={`modale ${isOpen ? "opened" : ""}`} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-header">
                        <div className="align-right">
                            <a className="btn-close" aria-hidden="true" onClick={closeModal}>&times;</a>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        );
    }
}

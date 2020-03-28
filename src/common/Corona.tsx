import * as React from "react";

import { api } from "../constants";
import { Input } from "./index";

interface Props {
    onSubmit: () => void;
}

interface State {
    name: string;
    email: string;
    hasSubmitted: boolean;
}

export class Corona extends React.Component<Props, State> {
    state: Readonly<State> = {
        email: "",
        hasSubmitted: false,
        name: "",
    };

    get isValid(): { [k in keyof State]: boolean } {
        // @ts-ignore
        return Object.entries(this.state).reduce((cumm, [key, val]) => {
            const isValidField = !this.state.hasSubmitted || !!(val);
            return { ...cumm, [key]: isValidField };
        }, {} as any);
    }

    get isDone(): boolean {
        return Object.keys(this.state).reduce((cumm, key) => {
            return cumm && this.isValid[key as keyof State];
        }, true as any);
    }

    onFormChange = (e: any): void => {
        const { type, name, value } = e.target;

        // @ts-ignore
        this.setState({ [name]: value });
    }

    postForm = (): void => {
        if (!this.isDone) {
            // return alert("Oops! Looks like you're missing some required fields.");
            return;
        }

        fetch(`${api}/rsvp`, {
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST", // or 'PUT'
        })
        .then((response) => response.json())
        .then((data) => {
            // console.log("Success:", data);
            alert("Thank you for joining our email list. We will try to keep you up to date as soon as possible!");
            return this.props.onSubmit();
        })
        .catch((error) => {
            // console.error("Error:", error);
            return alert("Oops! Looks like something is wrong with our server. Reach out to us! 615-525-1915");
        });
    }

    handleFormSubmit = (): void => {
        this.setState({ hasSubmitted: true }, this.postForm);
    }

    render(): JSX.Element {
        const { email, name } = this.state;

        return (
            <div>
                <div className="modal-body">
                    <div className="form email-form">
                        <p>
                            Our wedding and festivities are tentatively still scheduled for June.
                            However, we are currently monitoring CDC guidelines
                            and will make the decision whether to postpone festivities
                            by mid-May at the latest.
                        </p>
                        <p>
                            Thank you and we hope everyone stays safe! <i className="fa fa-heart"></i>
                        </p>
                        <Input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            onChange={this.onFormChange}
                            value={name}
                            isDisabled={false}
                            isValid={this.isValid.name}
                        />
                        <Input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            onChange={this.onFormChange}
                            value={email}
                            isDisabled={false}
                            isValid={this.isValid.email}
                        />
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="rsvp-btn" onClick={this.handleFormSubmit}>Submit Email <i className="fa fa-envelope"></i></button>
                </div>
            </div>
        );
    }
}

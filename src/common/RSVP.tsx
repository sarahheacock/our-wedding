import * as React from "react";

import { api } from "../constants";
import { Input } from "./index";

interface Props {
    onSubmit: () => void;
}

interface State {
    name: string;
    email: string;
    message: string;
    num: string;
    numChild: string;
    attending: string;
    hasSubmitted: boolean;
}

export class RSVP extends React.Component<Props, State> {
    options = [
        "Ceremony & Reception",
        "Rehearsal Dinner",
        "Both Ceremony & Rehearsal!",
        "Regretfully will not be able to attend",
    ];

    state: Readonly<State> = {
        attending: this.options[0],
        email: "",
        hasSubmitted: false,
        message: "",
        name: "",
        num: "",
        numChild: "",
    };

    get isDisabled(): { [k in keyof State]: boolean }  {
        // @ts-ignore
        return Object.keys(this.state).reduce((cumm, key) => {
            const isDisabledField = (key === "num" || key === "numChild") ?
                this.state.attending === this.options[this.options.length - 1] : false;

            return { ...cumm, [key]: isDisabledField };
        }, {} as any);
    }

    get isRequired(): { [k in keyof State]: boolean } {
        // @ts-ignore
        return Object.keys(this.state).reduce((cumm, key) => {
            let isRequiredField = false;

            if (key === "email" || key === "name") {
                isRequiredField = true;
            } else if (key === "num" || key === "numChild") {
                isRequiredField = !this.isDisabled[key];
            }

            return { ...cumm, [key]: isRequiredField };
        }, {} as any);
    }

    get isValid(): { [k in keyof State]: boolean } {
        // @ts-ignore
        return Object.entries(this.state).reduce((cumm, [key, val]) => {
            let isValidField = true;

            if (!this.state.hasSubmitted) {
                isValidField = true;
            } else if (this.isRequired[key as keyof State]) {
                isValidField = !!val;
            }

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

        if (type === "radio") {
            this.setState({ attending: name });
        } else if (!this.isDisabled[name as keyof State]) {
            // @ts-ignore
            this.setState({ [name]: value });
        }
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
            alert("Thank you for sending your RSVP!");
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
        const { attending, email, message, name, num, numChild } = this.state;

        const isDisabled = this.isDisabled;
        const isValid = this.isValid;

        const attendingOptions = this.options.map((option, i) => (
            <span key={`rsvp${option}`}>
                <Input
                    type="radio"
                    name={option}
                    checked={!attending ? !i : attending === option}
                    onChange={this.onFormChange}
                    isDisabled={isDisabled.attending}
                    isValid={isValid.attending}
                />
                <label htmlFor={option}>{option}</label>
            </span>
        ));

        return (
            <div>
                <div className="modal-body">
                    <div className="form">
                        <p>Please let us know if you will be joining by<br /><b>Sunday, June 7th, 2020</b></p>
                        <Input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            onChange={this.onFormChange}
                            value={name}
                            isDisabled={isDisabled.name}
                            isValid={isValid.name}
                        />
                        <Input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            onChange={this.onFormChange}
                            value={email}
                            isDisabled={isDisabled.email}
                            isValid={isValid.email}
                        />
                        <Input
                            type="number"
                            name="num"
                            placeholder="Number of Adult Guests (Including Yourself)"
                            onChange={this.onFormChange}
                            value={!isDisabled.num ? num : "0"}
                            isDisabled={isDisabled.num}
                            isValid={isValid.num}
                        />
                        <Input
                            type="number"
                            name="numChild"
                            placeholder="Number of Child Guests Ages 0-12"
                            onChange={this.onFormChange}
                            value={!isDisabled.numChild ? numChild : "0"}
                            isDisabled={isDisabled.numChild}
                            isValid={isValid.numChild}
                        />
                        <div className="input-wrapper border">
                            <textarea
                                name="message"
                                className="text-input"
                                rows={2}
                                placeholder="Message"
                                onChange={this.onFormChange}
                                value={message}
                            />
                        </div>
                        <div className="radio-group">
                            {attendingOptions}
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="rsvp-btn" onClick={this.handleFormSubmit}>Submit RSVP!</button>
                </div>
            </div>
        );
    }
}

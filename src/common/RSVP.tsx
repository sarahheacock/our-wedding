import * as React from "react";

interface InputProps {
    type: string;
    placeholder: string;
    name: string;
}

class Input extends React.Component<InputProps> {
    render() {
        const { type } = this.props;

        return (
            <div className="input-wrapper">
                <input
                    {...this.props}
                    className={type !== "radio" ? "text-input" : "radio"}
                />
            </div>
        );
    }
}

/* tslint:disable:max-classes-per-file */
interface Props {
    onSubmit: () => void;
}

interface State {
    name: string;
    email: string;
    message: string;
    num: string;
    attending: string;
}

export class RSVP extends React.Component<Props, State> {
    options = [
        "Ceremony & Reception",
        "Rehearsal Dinner",
        "Both Ceremony & Rehearsal!",
        "None of the Above",
    ];

    state: Readonly<State> = {
        attending: this.options[0],
        email: "",
        message: "",
        name: "",
        num: "",
    };

    onFormChange = (e): void => {
        const { type, name, value } = e.target;

        if (type === "radio") {
            this.setState({ attending: name });
        } else {
            this.setState({ [name]: value });
        }
    }

    handleFormSubmit = (): void => {
        const isDone = Object.entries(this.state).reduce((cumm, [key, val]) => {
            return cumm && (key === "message" || !!val);
        }, true);

        if (!isDone) {
            return alert("Oops! Looks like you're missing some required fields.");
        }

        fetch("http://localhost:3000/rsvp", {
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST", // or 'PUT'
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:", data);
            return alert("Yay! Thank you for sending your RSVP!");
        })
        .catch((error) => {
            console.error("Error:", error);
            return alert("Oops! Looks like something is wrong with our server. Reach out to us! 615-525-1915");
        });
    }

    render(): JSX.Element {
        const { attending, email, message, name, num } = this.state;
        const attendingOptions = this.options.map((option, i) => (
            <span key={`rsvp${option}`}>
                <Input
                    type="radio"
                    name={option}
                    checked={!attending ? !i : attending === option}
                    onChange={this.onFormChange}
                />
                <label htmlFor={option}>{option}</label>
            </span>
        ));

        return (
            <div>
                <div className="modal-body">
                    <div className="form">
                        <p>Please let us know if you will be joining by Sunday, June 7th, 2020</p>
                        <Input
                            type="text"
                            name="name"
                            placeholder="* Full Name"
                            onChange={this.onFormChange}
                            value={name}
                        />
                        <Input
                            type="email"
                            name="email"
                            placeholder="* Email Address"
                            onChange={this.onFormChange}
                            value={email}
                        />
                        <Input
                            type="number"
                            name="num"
                            placeholder="* Number of Guests (Including Yourself)"
                            onChange={this.onFormChange}
                            value={num}
                        />
                        <div className="input-wrapper">
                            <textarea
                                name="message"
                                className="text-input"
                                rows="2"
                                placeholder="  Message"
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
                    <a className="rsvp-btn" onClick={this.handleFormSubmit}>Submit RSVP!</a>
                </div>
            </div>
        );
    }
}

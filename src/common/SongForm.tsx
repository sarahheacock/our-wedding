import * as React from "react";

import { api } from "../constants";
import { Input } from "./index";

interface Props {
    onSubmit: () => void;
}

interface State {
    artist: string;
    image: string;
    song: string;
    hasSubmitted: boolean;
}

export class SongForm extends React.Component<Props, State> {
    options = [
        "Ceremony & Reception",
        "Rehearsal Dinner",
        "Both Ceremony & Rehearsal!",
        "Regretfully will not be able to attend",
    ];

    state: Readonly<State> = {
        artist: "",
        hasSubmitted: false,
        image: "",
        song: "",
    };

    get isValid(): { [k in keyof State]: boolean } {
        // @ts-ignore
        return Object.entries(this.state).reduce((cumm, [key, val]) => {
            return { ...cumm, [key]: !this.state.hasSubmitted || key === "image" || !!val };
        }, {} as any);
    }

    get isDone(): boolean {
        return Object.keys(this.state).reduce((cumm, key) => {
            return cumm && this.isValid[key as keyof State];
        }, true as any);
    }

    onFormChange = (e: any): void => {
        const { name, value } = e.target;

        // @ts-ignore
        this.setState({ [name]: value });
    }

    postForm = (): void => {
        if (!this.isDone) {
            // return alert("Oops! Looks like you're missing some required fields.");
            return;
        }

        fetch(`${api}/songs`, {
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST", // or 'PUT'
        })
        .then((response) => response.json())
        .then((data) => {
            // console.log("Success:", data);
            localStorage.setItem(`song-${data.song._id}`, "true");
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
        const { artist, song } = this.state;

        const isValid = this.isValid;

        return (
            <div>
                <div className="modal-body">
                    <div className="form song-form">
                        <p>Thank you for helping make our playlist!<br />Add any kid friendly song below.</p>
                        <Input
                            type="text"
                            name="artist"
                            placeholder="Artist Name"
                            onChange={this.onFormChange}
                            value={artist}
                            isDisabled={false}
                            isValid={isValid.artist}
                        />
                        <Input
                            type="text"
                            name="song"
                            placeholder="Song"
                            onChange={this.onFormChange}
                            value={song}
                            isDisabled={false}
                            isValid={isValid.song}
                        />
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="rsvp-btn" onClick={this.handleFormSubmit}>
                        Submit Song <i className="fa fa-music"></i>
                    </button>
                </div>
            </div>
        );
    }
}

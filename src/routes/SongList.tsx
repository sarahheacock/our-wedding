import * as React from "react";

import { Modal, SongForm } from "../common/index";
import { api } from "../constants";

export interface SongInfo {
    _id: string;
    artist: string;
    image: string;
    song: string;
}

interface SongProps extends SongInfo {
    i: number;
    deleteSong: () => void;
    editSong: () => void;
}

const Song: React.ComponentType<SongProps> = ({ _id, artist, deleteSong, editSong, i, image, song }) => (
    <div className={`song-row ${!i && "border-top"}`}>
        <div className="image">
            <img src={image || "https://cdn.pixabay.com/photo/2016/04/07/22/09/note-1314942_1280.png"} />
        </div>
        <div className="description">
            <p><b>{song}</b><br /><b>By: </b>{artist}</p>
        </div>
        <div className="image">
            {
                (localStorage.getItem(`song-${_id}`)) &&
                    [<a><i className="fa fa-pencil-alt" aria-hidden="true" onClick={editSong}></i></a>,
                    <a><i className="fa fa-trash" aria-hidden="true" onClick={deleteSong}></i></a>]
            }
        </div>
    </div>
);

interface State {
    editSong: number | null;
    isModalOpen: boolean;
    songs: ReadonlyArray<SongInfo>;
}

export class SongList extends React.Component<{}, State> {
    state: Readonly<State> = {
        editSong: null,
        isModalOpen: false,
        // isModalOpen: true,
        songs: [],
    };

    componentDidMount() {
        this.getSongs();
    }

    getSongs = (): void => {
        fetch(`${api}/songs`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "GET", // or 'PUT'
        })
        .then((response) => response.json())
        .then((data) => {
            // tslint:disable-next-line
            console.log("Success:", data);
            this.setState({ songs: data.songs });
        })
        .catch((error) => {
            // console.error("Error:", error);
            return alert("Oops! Looks like something is wrong with our server. Reach out to us! 615-525-1915");
        });
    }

    deleteSong = (index: number): void => {
        const song = this.state.songs[index];

        if (!song) {
            return;
        }

        fetch(`${api}/songs/${song._id}`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "DELETE",
        })
        .then((response) => response.json())
        .then((data) => {
            return this.setState({ songs: this.state.songs.filter((curr: SongInfo) => curr._id !== song._id) });
        })
        .catch((error) => {
            // console.log(error);
            return alert("Oops! Looks like something is wrong with our server. Reach out to us! 615-525-1915");
        });
    }

    editSong = (index: number): void => {
        this.setState({ isModalOpen: true, editSong: index });
    }

    closeModal = (): void => {
        this.setState({ isModalOpen: false, editSong: null }, this.getSongs);
    }

    launchModal = (): void => {
        this.setState({ isModalOpen: true });
    }

    render(): JSX.Element {
        const { editSong, isModalOpen, songs } = this.state;
        const songComponents = songs.map((song, i) => (
            <Song
                key={`songInfo${i}`}
                i={i}
                deleteSong={() => this.deleteSong(i)}
                editSong={() => this.editSong(i)}
                {...song}
            />
        ));

        return (
          <div>
            <div className="cover song-cover">
                <div className="cover-content song-cover-content">
                <h1>Come dance with us!</h1>
            </div>
            </div>
            <div className="content">
                <h2>Song Requests</h2>
                <button onClick={this.launchModal} className="rsvp-btn">
                    Request a Song <i className="fa fa-music"></i>
                </button>
                <p></p>
                {songComponents}
            </div>
            <Modal isOpen={isModalOpen} closeModal={this.closeModal}>
                {isModalOpen ?
                <SongForm onSubmit={this.closeModal} editSong={editSong === null ? null : songs[editSong]} /> : null}
            </Modal>
          </div>
        );
    }
}

import * as React from "react";

interface EventProps {
    image: string;
    name: string;
    date: string;
    time: string;
    location: string;
    link: string;
    place: string;
}

const Event: React.ComponentType<EventProps> = ({ image, name, date, time, location, link, place }) => (
    <div className="event">
        <img src="" />
        <h3>{name}</h3>
        <p>{date}<br />
        {time}<br />
        {place}<br />
        {location}</p>
        <a href={link}>View Map</a>
    </div>
);

export class WhenWhere extends React.Component {
    events: ReadonlyArray<EventProps> = [{
        date: "Sunday, June 21st, 2020",
        image: "",
        link: "https://goo.gl/maps/Kn9rzuD4woBLa3AD6",
        location: "8400 TN-100, Nashville, TN 37221",
        name: "Ceremony & Reception",
        place: "Loveless Events",
        time: "5 - 9pm",
    }, {
        date: "Saturday, June 20th, 2020",
        image: "",
        link: "https://goo.gl/maps/vxCsiqA65LHnMemh7",
        location: "50 Vaughn Rd, Nashville, TN 37221",
        name: "Rehearsal Dinner",
        place: "Edwin Warner Park",
        time: "5 - 7pm",
    }];
    render(): JSX.Element {
        const events = this.events.map((obj) => (
            <Event key={`event${obj.name}`} {...obj} />
        ));

        return (
            <div>
                <div className="cover where-cover">
                    <div className="cover-content where-cover-content">
                        <h1>Times and Places?</h1>
                    </div>
                </div>
                <div className="content">
                    <h2>{"When & Where?"}</h2>
                    <div className="where-row">{events}</div>
                </div>
            </div>
        );
    }
}

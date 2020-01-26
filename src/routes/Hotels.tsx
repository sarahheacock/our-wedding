import * as React from "react";

interface HotelProps {
    address: string;
    code: string;
    hotel: string;
    link: string;
    name: string;
    phone: string;
}

const HotelInfo: React.ComponentType<HotelProps> = ({ hotel, address, name, code, link }) => (
    <div className="event">
        <h3>{hotel}</h3>
        <p><b>Group Name: </b>{name}<br />
        <b>Group Code: </b>{code}<br />
        <b>Check In: </b>Friday, June 19, 2020<br />
        <b>Check Out: </b>Monday, June 22, 2019<br />
        <b>Address: </b>{address}</p>
        <a href={link}>View Hotel</a>
    </div>
);

export class Hotels extends React.Component {
    hotels: ReadonlyArray<HotelProps> = [{
        address: "9150 Carothers Pkwy, Franklin, TN 37067",
        code: "SAW",
        hotel: "Hilton Garden Inn Nashville/Franklin Cool Springs",
        link: "https://hiltongardeninn.hilton.com/en/gi/groups/personalized/B/BNACSGI-SAW-20200619/index.jhtml?WT.mc_id=POG",
        name: "Sarah & Adam's Wedding",
        phone: "615-656-2700",
    }, {
        address: "601 Corporate Centre Dr, Franklin, TN 37067",
        code: "HEACOC",
        hotel: "Hilton Franklin Cool Springs",
        link: "https://www.hilton.com/en/hi/groups/personalized/B/BNAFRHH-HEACOC-20200619/index.jhtml?WT.mc_id=POG",
        name: "Heacock Woods Wedding",
        phone: "615-550-1650",
    }];

    render(): JSX.Element {
        const hotelComponents = this.hotels.map((hotel, i) => <HotelInfo key={`hotelInfo${i}`} {...hotel} />);

        return (
            <div>
                <div className="cover hotel-cover">
                    <div className="cover-content hotel-cover-content">
                        <h1>Where to Stay??</h1>
                    </div>
                </div>
                <div className="content">
                    <h2>Hotels</h2>
                    <p>
                        We blocked 10 rooms in each Hotels at discounted rates.<br />
                        The block will remain until <b>Sunday, May 17th, 2020.</b><br />
                        Please reach out if you have any questions or concerns!
                    </p>
                    {hotelComponents}
                </div>
            </div>
        );
    }
}

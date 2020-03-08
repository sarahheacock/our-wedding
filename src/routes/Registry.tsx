import * as React from "react";

interface LinkProps {
    description: string;
    img: string;
    link: string;
    linkName: string;
    name: string;
}

const Link: React.ComponentType<LinkProps> = ({ description, img, link, linkName, name }) => (
    <div className="registry-link">
        <h3>{name}</h3>
        <img src={img} />
        <p>{description}</p>
        <a href={link}>{linkName}</a>
    </div>
);

export class Registry extends React.Component {
    links: ReadonlyArray<LinkProps> = [{
        description: "Help us with our honeymoon to Disney",
        img: "https://cdn.pixabay.com/photo/2015/10/08/17/15/disney-world-978134_1280.jpg",
        link: "https://disney.honeymoonwishes.com/Honeymoon-Registry-409269-Walt-Disney-World-Resort-Sarah-Heacock-Adam-Woods.html",
        linkName: "View Registry",
        name: "Our Honeymoon",
    }, {
        description: "Help us donate to High Hopes Pediatric Center",
        img: "https://images.squarespace-cdn.com/content/v1/5d3d063f510a4e0001661b44/1567555012028-XQBPS5IJJ9UR5KOQYXMX/ke17ZwdGBToddI8pDm48kAf-OpKpNsh_OjjU8JOdDKBZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpzAFzFJoCInLPKyj9AG8yKe7-Q2aFvP177fkO9TY_-rz5WoqqTEZpmj4yDEOdwKV68/highhopes.jpg",
        link: "https://www.highhopesforkids.org/donate",
        linkName: "Make Donation",
        name: "High Hopes",
    }, {
        description: "Help us donate to Cottage Cove Urban Ministries",
        img: "https://cottagecove.org/cc_trans_xxs.png",
        link: "https://cottagecove.org/",
        linkName: "Make Donation",
        name: "Cottage Cove",
    }];

    render(): JSX.Element {
        const links = this.links.map((obj) => (
            <Link key={`registry${obj.name}`} {...obj} />
        ));

        return (
            <div>
                <div className="cover registry-cover">
                    <div className="cover-content registry-cover-content">
                        <h1>Gifts...</h1>
                    </div>
                </div>
                <div className="content">
                    <h2>Registry</h2>
                    <p>Thank you so much for your gifts! We don't need any house hold items.<br />
                        However, we would love help with our honeymoon fund and donations to our favorite charities.</p>
                    <div className="registry-row">{links}</div>
                </div>
            </div>
        );
    }
}

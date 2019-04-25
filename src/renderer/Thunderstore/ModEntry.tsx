import * as React from "react";
import styled, {css} from "styled-components";

import Navigation from "../Navigation";
import {Mod} from "./ThunderstoreAdapter";

const Container = styled.div<{pinned: boolean}>`
    background-color: #303030;
    border: 1px solid #444;
    :not(:first-child) {
        border-top: 0;
    }

    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    ${props => props.pinned && css`
        background-color: #444;
        border-color: #303030;
    `}

    h3 {
        margin: 0;
    }
`;
const Column = styled.div`
    display: flex;
    flex-direction: column;

    span {
        margin: 5px 0px;
    }
`;
const Row = styled.div`
    display: flex;
    flex-direction: row;

    span {
        margin: 0px 5px;
    }
`;
const Image = styled.img`
    width: auto;
    height: 128px;
    margin-right: 10px;
`;
interface Props {
    mod: Mod;
}

export default class ModEntry extends React.PureComponent<Props> {
    public onClick = () => {
        Navigation.changePage(`/package/${this.props.mod.owner}/${this.props.mod.name}`);
    }
    public render() {
        return (
            <Container pinned={this.props.mod.is_pinned}>
                <Image src={this.props.mod.versions[0].icon} />
                <Column>
                    <Row as="h3">
                        <a onClick={this.onClick}>{this.props.mod.name}</a>
                        <span>{this.props.mod.versions[0].version_number}</span>
                    </Row>
                    <span>{this.props.mod.versions[0].description}</span>
                    <Row>
                        <span>By {this.props.mod.owner}</span>
                        <span>|</span>
                        <span> {this.props.mod.versions[0].downloads} total downloads</span>
                        <span>|</span>
                        <span><a href={this.props.mod.versions[0].website_url} rel="noopener noreferrer" target="_blank">{this.props.mod.versions[0].website_url}</a></span>
                    </Row>
                    <span>Last Updated: {this.props.mod.date_updated.toLocaleString(undefined, {year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", timeZoneName: "short", hour12: true})}</span>
                </Column>
                
            </Container>
        )
    }
}
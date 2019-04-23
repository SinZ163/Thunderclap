import * as React from "react";
import styled, {css} from "styled-components";
import {darken} from "polished";
import {Link} from "react-router-dom";

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
const Anchor = styled.a`
    color: #00bc8c;
    text-decoration: unset;

    :hover {
        color: ${darken(0.2, "#00bc8c")};
        text-decoration: underline;
    }
`;
// Purely because typescript isn't doing prop checks correctly with "as"
const StyledLink = Anchor.withComponent(Link);
interface Props {
    mod: Mod;
}

export default class ModEntry extends React.PureComponent<Props> {
    public render() {
        return (
            <Container pinned={this.props.mod.is_pinned}>
                <Image src={this.props.mod.versions[0].icon} />
                <Column>
                    <Row as="h3">
                        <StyledLink to={`/package/${this.props.mod.owner}/${this.props.mod.name}`}>{this.props.mod.name}</StyledLink>
                        <span>{this.props.mod.versions[0].version_number}</span>
                    </Row>
                    <span>{this.props.mod.versions[0].description}</span>
                    <Row>
                        <span>By {this.props.mod.owner}</span>
                        <span>|</span>
                        <span> {this.props.mod.versions[0].downloads} total downloads</span>
                        <span>|</span>
                        <span><Anchor href={this.props.mod.versions[0].website_url} target="_blank">{this.props.mod.versions[0].website_url}</Anchor></span>
                    </Row>
                    <span>Last Updated: {this.props.mod.date_updated.toLocaleString(undefined, {year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", timeZoneName: "short", hour12: true})}</span>
                </Column>
                
            </Container>
        )
    }
}
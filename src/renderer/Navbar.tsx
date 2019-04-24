import {observer} from "mobx-react";
import * as React from "react";
import styled, {css} from "styled-components";

import Navigation from "./Navigation";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`;

const Link = styled.a<{active: boolean}>`
    color: gray;

    ${props => props.active && css`
        color: white;
    `}
`;

@observer
export default class Navbar extends React.Component {
    public toBrowse = () => Navigation.changePage("thunderstore");
    public toManage = () => Navigation.changePage("modmanager");
    public render() {
        return (
            <Container>
                <Link active={Navigation.currentPage === "thunderstore"} onClick={this.toBrowse}><h3>Browse Thunderstore</h3></Link>
                {/* TODO: Work out how to not have this if its not in electron mode*/}
                <Link active={Navigation.currentPage === "modmanager"} onClick={this.toManage}><h3>Installed Mods</h3></Link>
            </Container>
        );
    }
}
import * as React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`;

const activeClassName = "LinkActive";
const Link = styled(NavLink).attrs({activeClassName})`
    color: gray;

    &.${activeClassName} {
        color: white;
    }
`;

export default class Navbar extends React.PureComponent {
    public render() {
        return (
            <Container>
                <Link exact to="/"><h3>Browse Thunderstore</h3></Link>
                {/* TODO: Work out how to not have this if its not in electron mode*/}
                <Link exact to="/mod-manager"><h3>Installed Mods</h3></Link>
            </Container>
        );
    }
}
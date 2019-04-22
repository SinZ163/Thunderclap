import * as React from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`;

export default class Navbar extends React.PureComponent {
    public render() {
        return (
            <Container>
                <h3>Browse Thunderstore</h3>
                <h3>Installed Mods</h3>
            </Container>
        );
    }
}
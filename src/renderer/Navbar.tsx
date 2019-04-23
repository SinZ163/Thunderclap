import * as React from "react";
import styled from "styled-components";
import { NavLink, RouteComponentProps, withRouter,  } from "react-router-dom";

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

class Navbar extends React.Component<RouteComponentProps> {
    public onBrowse = (e: any) => {
        // eslint-disable-next-line no-console
        console.log("Replacing history manually for /");
        // eslint-disable-next-line no-console
        this.props.history.replace("/");
        e.preventDefault();
    }
    public onManage = (e: any) => {
        // eslint-disable-next-line no-console
        console.log("Replacing history manually for /mod-manager");
        // eslint-disable-next-line no-console
        console.log(this.props);
        this.props.history.replace("/mod-manager");
        e.preventDefault();
    }
    public render() {
        return (
            <Container>
                <Link onClick={this.onBrowse} exact to="/"><h3>Browse Thunderstore</h3></Link>
                {/* TODO: Work out how to not have this if its not in electron mode*/}
                <Link onClick={this.onManage} exact to="/mod-manager"><h3>Installed Mods</h3></Link>
            </Container>
        );
    }
}
export default withRouter(Navbar);
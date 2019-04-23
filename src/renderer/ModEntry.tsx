import * as React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

import {Mod} from "./ThunderstoreAdapter";

const PassiveLink = styled(Link)`
    color: unset;
    cursor: unset;
    text-decoration: unset;
`;

interface Props {
    mod: Mod;
}

export default class ModEntry extends React.PureComponent<Props> {
    public render() {
        return (
            <PassiveLink to={`/package/${this.props.mod.owner}/${this.props.mod.name}`}>
                <p>{this.props.mod.name}</p>
                <p>{this.props.mod.date_updated.toLocaleString()}</p>
            </PassiveLink>
        )
    }
}
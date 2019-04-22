import * as React from "react";

import {Mod} from "./ThunderstoreAdapter";

interface Props {
    mod: Mod;
}

export default class ModEntry extends React.PureComponent<Props> {
    public render() {
        return (
            <div>
                <p>{this.props.mod.name}</p>
                <p>{this.props.mod.date_updated.toLocaleString()}</p>
            </div>
        )
    }
}
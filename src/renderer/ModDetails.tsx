import * as React from "react";
import {RouteComponentProps} from "react-router-dom";
import { observer } from "mobx-react";

import ThunderstoreAdapter from "./ThunderstoreAdapter";

@observer
export default class ModDetails extends React.PureComponent<RouteComponentProps<{owner: string; name: string}>> {
    public render() {
        const mod = ThunderstoreAdapter.packages.find(mod => mod.owner === this.props.match.params.owner && mod.name === this.props.match.params.name);
        if (!mod) {
            return (
                <h1>Unknown mod</h1>
            );
        }
        return (
            <h1>HI I AM {mod.full_name} last updated {mod.date_updated.toLocaleString()}</h1>
        );
    }
}
import * as React from "react";
import {RouteComponentProps} from "react-router-dom";
import { observer } from "mobx-react";
import Markdown from "react-markdown";

import CodeBlock from "../utils/CodeBlock";
import ThunderstoreAdapter from "./ThunderstoreAdapter";

@observer
export default class ModDetails extends React.Component<RouteComponentProps<{owner: string; name: string}>> {
    public render() {
        // TODO: cache in state
        const mod = ThunderstoreAdapter.packages.find(mod => mod.owner === this.props.match.params.owner && mod.name === this.props.match.params.name);
        if (!mod) {
            return (
                <h1>Unknown mod</h1>
            );
        }
        return (
            <React.Fragment>
                <h1>HI I AM {mod.full_name} last updated {mod.date_updated.toLocaleString()}</h1>
                <Markdown
                    source={mod.versions[0].readme}
                    renderers={{code: CodeBlock}}
                />
                <pre>
                    {JSON.stringify(mod, undefined, 4)}
                </pre>
            </React.Fragment>
        );
    }
}
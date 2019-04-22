import * as React from "react";
import { Mod } from "./ThunderstoreAdapter";
import { observer } from "mobx-react";
import { computed } from "mobx";

interface Props {
    mod: Mod;
}
@observer
export default class ModDetails extends React.PureComponent<Props> {
    @computed public get markdown() {
        return this.props.mod;
    }
    public render() {
        return (
            <h1 />
        );
    }
}
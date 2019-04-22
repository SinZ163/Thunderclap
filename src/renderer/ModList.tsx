import * as React from "react";
import styled from "styled-components";
import {observer} from "mobx-react";
import ThunderstoreAdapter from "./ThunderstoreAdapter";
import ModEntry from "./ModEntry";

const VerticalLayout = styled.div`
    display: flex;
    flex-direction: column;
`;

@observer
export default class Modlist extends React.Component {
    public render() {
        // Sort by pinned status, then by date_updated descending
        const mods = [...ThunderstoreAdapter.packages].sort((a, b) => {
            if (a.is_pinned && !b.is_pinned) {
                return -1;
            }if (b.is_pinned && !a.is_pinned) {
                return 1;
            }
            return b.date_updated.valueOf() - a.date_updated.valueOf();
        });
        return (
            <VerticalLayout>
                {mods.map(mod => <ModEntry mod={mod} key={mod.uuid4} />)}
            </VerticalLayout>
        );
    }
}
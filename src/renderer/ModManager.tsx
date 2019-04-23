import * as React from "react";
import styled from "styled-components";
import {observer} from "mobx-react";

const VerticalLayout = styled.div`
    display: flex;
    flex-direction: column;
`;

@observer
export default class ModManager extends React.Component {
    public render() {
        return (
            <VerticalLayout>
                <h1>TODO</h1>
            </VerticalLayout>
        );
    }
}
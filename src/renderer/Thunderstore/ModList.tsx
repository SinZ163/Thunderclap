import * as React from "react";
import styled, {css} from "styled-components";
import {observer} from "mobx-react";
import ThunderstoreAdapter from "./ThunderstoreAdapter";
import ModEntry from "./ModEntry";


const VerticalLayout = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
`;

const FilterControls = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`;
const Buttons = styled.div`
    display: flex;
    flex-direction: row;
`;
const Button = styled.div<{active: boolean}>`
    color: white;
    background-color: #444;

    border: 1px solid #000;
    border-radius: 5px;

    padding: 10px;

    margin-right: 30px;

    :hover {
        background-color: #2b2a2a; 
    }
    ${props => props.active && css`
        background-color: #2b2a2a;
    `}
`;
const SearchInput = styled.input`
    float: right;
`;

enum SearchOrder {
    LastUpdated,
    Newest,
    MostDownloaded,
}

interface State {
    mode: SearchOrder;
    search: string;
}
@observer
export default class Modlist extends React.Component<{}, State> {
    public state = {
        mode: SearchOrder.LastUpdated,
        search: "",
    }
    public lastUpdated = () => this.setState({mode: SearchOrder.LastUpdated});
    public newest = () => this.setState({mode: SearchOrder.Newest});
    public mostDownloaded = () => this.setState({mode: SearchOrder.MostDownloaded});

    public searchChange = (event: React.FormEvent<HTMLInputElement>) => {
        if (event.target) {
            this.setState({search: event.currentTarget.value});
        }
    }
    public render() {
        // Sort by pinned status, then by date_updated descending
        let mods = [...ThunderstoreAdapter.packages].sort((a, b) => {
            if (a.is_pinned && !b.is_pinned) {
                return -1;
            }if (b.is_pinned && !a.is_pinned) {
                return 1;
            }
            switch(this.state.mode) {
                case SearchOrder.LastUpdated:
                    return b.date_updated.valueOf() - a.date_updated.valueOf();
                case SearchOrder.Newest:
                    return b.date_created.valueOf() - a.date_created.valueOf();
                case SearchOrder.MostDownloaded:
                    return b.totalDownloads.valueOf() - a.totalDownloads.valueOf();
            }
            return 0;
        });
        if (this.state.search.length > 0) {
            mods = mods.filter(mod => mod.full_name.indexOf(this.state.search) !== -1);
        }
        return (
            <VerticalLayout>
                <h1>All mods</h1>
                <FilterControls>
                    <Buttons>
                        <Button active={this.state.mode === SearchOrder.LastUpdated} onClick={this.lastUpdated}>Last updated</Button>
                        <Button active={this.state.mode === SearchOrder.Newest} onClick={this.newest}>Newest</Button>
                        <Button active={this.state.mode === SearchOrder.MostDownloaded} onClick={this.mostDownloaded}>Most downloaded</Button>
                    </Buttons>
                    <SearchInput type="text" value={this.state.search} onChange={this.searchChange}/>
                </FilterControls>
                {mods.map(mod => <ModEntry mod={mod} key={mod.uuid4} />)}
            </VerticalLayout>
        );
    }
}
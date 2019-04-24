import {observer} from "mobx-react";
import * as React from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";

import Navigation from "./Navigation";

import Navbar from "./Navbar";
import Modlist from "./Thunderstore/ModList";
import ModManager from "./ModManager/ModManager";
import ModDetails from "./Thunderstore/ModDetails";

const GlobalStyle = createGlobalStyle`
    body {
        font-family: "Lato", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        background-color: #222;
        color: #fff;
        margin: 0;
        font-weight: 400;
        line-height: 1.5;
        text-align: left;
    }
`;
const theme = {
}

@observer
export default class App extends React.Component {
    public render() {
        console.log(Navigation.currentPage); // eslint-disable-line no-console
        const isModDetails = Navigation.currentPage.match(/\/package\/(\w+)\/(\w+)/);
        console.log(isModDetails, isModDetails !== null); // eslint-disable-line no-console
        return (
            <ThemeProvider theme={theme}>
                <React.Fragment>
                    <GlobalStyle />
                    <Navbar />
                    {Navigation.currentPage === "thunderstore" && <Modlist /> }
                    {isModDetails !== null && <ModDetails owner={isModDetails[1]} name={isModDetails[2]} /> }
                    {/* TODO: Work out how to not have this if its not in electron mode*/}
                    {Navigation.currentPage === "modmanager" && <ModManager /> }
                </React.Fragment>
            </ThemeProvider>
        );
    }
}
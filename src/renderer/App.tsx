import * as React from "react";
import Navbar from "./Navbar";

import { ThemeProvider, createGlobalStyle } from "styled-components";
import Modlist from "./ModList";

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
export default class App extends React.PureComponent {
    public render() {
        return (
            <ThemeProvider theme={theme}>
                <React.Fragment>
                    <GlobalStyle />
                    <Navbar />
                    <Modlist />
                </React.Fragment>
            </ThemeProvider>
        );
    }
}
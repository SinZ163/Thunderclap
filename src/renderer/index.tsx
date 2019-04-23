import * as React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";

import ThunderstoreAdapter from "./ThunderstoreAdapter";

import App from "./App";

ThunderstoreAdapter.UpdatePackages();
ReactDOM.render(
    <HashRouter>
        <App />
    </HashRouter>,
    document.getElementById('app')
)
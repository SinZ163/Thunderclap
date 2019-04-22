import * as React from "react";
import ReactDOM from "react-dom";

import ThunderstoreAdapter from "./ThunderstoreAdapter";

import App from "./App";

ThunderstoreAdapter.UpdatePackages();
ReactDOM.render(
    <App />,
    document.getElementById('app')
)
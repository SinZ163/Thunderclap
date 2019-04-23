import * as React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import hljs from "highlight.js";

import ThunderstoreAdapter from "./Thunderstore/ThunderstoreAdapter";

import App from "./App";

hljs.configure({
    tabReplace: "    ",
});
document.head.insertAdjacentHTML("beforeend", `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.11.0/styles/atom-one-dark.min.css" />`);

ThunderstoreAdapter.UpdatePackages();

ReactDOM.render(
    <HashRouter>
        <App />
    </HashRouter>,
    document.getElementById('app')
)
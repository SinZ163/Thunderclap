import * as React from "react";
import hljs from "highlight.js";

interface Props {
    language: string;
    value: string;
}
export default class CodeBlock extends React.PureComponent<Props> {
    public static defaultProps = {
        language: "",
    }
    public codeEl = React.createRef<HTMLDivElement>();

    public componentDidMount() {
        this.highlightCode();
    }

    public componentDidUpdate() {
        this.highlightCode();
    }

    public highlightCode() {
        if (this.codeEl.current) {
            hljs.highlightBlock(this.codeEl.current);
        }
    }

    public render() {
        return (
            <pre>
                <code ref={this.codeEl} className={`language-${this.props.language}`}>
                    {this.props.value}
                </code>
            </pre>
        );
    }
}
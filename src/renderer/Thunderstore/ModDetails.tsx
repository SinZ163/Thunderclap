import * as React from "react";
import { observer } from "mobx-react";
import Markdown from "react-markdown";
import styled from "styled-components";

import CodeBlock from "../utils/CodeBlock";
import ThunderstoreAdapter from "./ThunderstoreAdapter";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: 0 auto;
`;
const Header = styled.div`
    display: grid;
    grid-template-columns: 128px 1fr 1fr;
    grid-template-rows: 2fr 1fr 1fr;
    grid-template-areas:
        "Image Title Title"
        "Image Desc Desc"
        "Image Author Link";
    height: 128px;
    grid-column-gap: 10px;
`;
//#region Header
const Image = styled.img`
    grid-area: Image;
    width: 100%;
    height: auto;
`;
const Title = styled.h1`
    grid-area: Title;
    margin: 0;
`;
const Description = styled.div`
    grid-area: Desc;
`;
const Author = styled.div`
    grid-area: Author;
`;
const WebsiteLink = styled.div`
    text-align: end;
    grid-area: Link;
`;
//#endregion
const Table = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
`;
const TableCell = styled.div`
    border-top: 1px solid #444;
    padding: 10px 0;
    vertical-align: middle;
`;
const Readme = styled.div`
    background-color: #303030;
`;
const ReadmeHeader = styled.h1`
    margin: 0;
    background-color: #444444;
`;
@observer
export default class ModDetails extends React.Component<{owner: string; name: string}> {
    public render() {
        // TODO: cache in state
        const mod = ThunderstoreAdapter.packages.find(mod => mod.owner === this.props.owner && mod.name === this.props.name);
        if (!mod) {
            return (
                <h1>Unknown mod</h1>
            );
        }
        return (
            <Container>
                <Header>
                    <Image src={mod.versions[0].icon} />
                    <Title>{mod.name}</Title>
                    <Description>{mod.versions[0].description}</Description>
                    <Author>By {mod.owner}</Author>
                    <WebsiteLink><a href={mod.versions[0].website_url} rel="noopener noreferrer" target="_blank">{mod.versions[0].website_url}</a></WebsiteLink>
                </Header>
                <Table>
                    <TableCell>Last updated</TableCell>
                    <TableCell>{mod.date_updated.toLocaleString(undefined, {year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", timeZoneName: "short", hour12: true})}</TableCell>
                    <TableCell>Latest version</TableCell>
                    <TableCell><a href={mod.versions[0].download_url}>{mod.versions[0].full_name}.zip</a></TableCell>
                    <TableCell>Total downloads</TableCell>
                    <TableCell>{mod.totalDownloads}</TableCell>
                    <TableCell>Dependency string</TableCell>
                    <TableCell>{mod.versions[0].full_name}</TableCell>
                    <TableCell>Dependants</TableCell>
                    <TableCell>Great question</TableCell>
                </Table>
                {mod.versions[0].readme && <Readme>
                    <ReadmeHeader>README</ReadmeHeader>
                    <Markdown
                        source={mod.versions[0].readme}
                        renderers={{code: CodeBlock}}
                        linkTarget={() => "_blank"} 
                    />
                </Readme>}
                <h1>Available versions</h1>
                <table>
                    <thead>
                        <th>Upload Date</th>
                        <th>Version number</th>
                        <th>Downloads</th>
                        <th>Download Link</th>
                    </thead>
                    <tbody>
                        {mod.versions.map(version => <tr key={version.uuid4}>
                            <TableCell as="td">{version.date_created.toLocaleDateString()}</TableCell>
                            <TableCell as="td">{version.version_number}</TableCell>
                            <TableCell as="td">{version.downloads}</TableCell>
                            <TableCell as="td"><a href={version.download_url} rel="noopener noreferrer" target="_blank">{version.full_name}.zip</a></TableCell>
                        </tr>)}
                    </tbody>
                </table>
                <pre>
                    {JSON.stringify(mod, undefined, 4)}
                </pre>
            </Container>
        );
    }
}
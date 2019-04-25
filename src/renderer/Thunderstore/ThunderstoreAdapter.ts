import { computed, observable } from "mobx";

export interface ModVersion {
    download_url: string;
    full_name: string;
    dependencies: string[];
    is_active: boolean;
    date_created: Date;
    downloads: number;
    name: string;
    version_number: string;
    website_url: string;
    description: string;
    readme: string;
    icon: string;
    uuid4: string;
}
export interface Mod {
    versions: ModVersion[];
    owner: string;
    maintainers: string[];
    full_name: string;
    name: string;
    is_active: boolean;
    date_created: Date;
    date_updated: Date;
    uuid4: string;
    is_pinned: boolean;

    totalDownloads: number;
}
class ThunderstoreAdapter {
    @observable private _packages = Array<Mod>();
    @computed public get packages() {
        return this._packages.slice();
    }

    public TransformMod(mod: Mod): Mod {
        const versions: ModVersion[] = [];
        for (let version of mod.versions) {
            versions.push({
                ...version,
                date_created: new Date(version.date_created),
            })
        }
        return {
            ...mod,
            versions,
            date_created: new Date(mod.date_created),
            date_updated: new Date(mod.date_updated),
            totalDownloads: versions.reduce((total, current) => total + current.downloads, 0),
        };
    }

    // TODO: Populate from local cache before doing network request?
    public async UpdatePackages() {
        const response = await fetch("http://localhost/api/v1/package/");
        const json: Mod[] = await response.json();
        // remove the old array
        this._packages.length = 0;
        for (const mod of json) {
            this._packages.push(this.TransformMod(mod));
        }
    }
}

const instance = new ThunderstoreAdapter();
export default instance; 
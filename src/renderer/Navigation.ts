import { observable } from "mobx";

class Navigation {
    @observable public currentPage: string = "thunderstore";
    public changePage = (pageName: string, updateHistory: boolean = true) => {
        this.currentPage = pageName;
        if (updateHistory) {
            history.pushState(pageName, "");
        }
    }
}

const instance = new Navigation();
export default instance;
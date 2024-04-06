import { createBrowserHistory } from "history";

const baseElement = document.getElementsByTagName("base")[0];
const baseUrl = baseElement ? baseElement.getAttribute("href") : "/";
export const browserHistory = createBrowserHistory({ basename: baseUrl });
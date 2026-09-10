import About from "./pages/About";
import App from "./App";
import Home from "./pages/Home";

export const routes = [
    {
        Component: App,
        children: [
            {
                path: "/",
                Component: Home,
            },
            {
                path: "about",
                Component: About,
            },
        ],
    },
];
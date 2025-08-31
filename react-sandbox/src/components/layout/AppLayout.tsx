import {Outlet} from "react-router-dom";
import {Header} from "./header/Header.tsx";

export const AppLayout = () => {
    return <>
        <Header/>
        <Outlet/>
    </>;
}
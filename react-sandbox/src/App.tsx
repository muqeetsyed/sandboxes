import {ProductItems} from "./components/layout/product/ProductItems.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {AppLayout} from "./components/layout/AppLayout.tsx";
import {CreateUser} from "./components/layout/user/CreateUser.tsx";
import {ListUsers} from "./components/layout/user/ListUsers.tsx";

export const App = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <AppLayout/>,
            children: [
                {
                    path: '/',
                    element: <ProductItems/>
                },
                {
                    path: '/shop-all',
                    element: <h1>shop-all</h1>
                },
                {
                    path: '/kitchen',
                    element: <h1>kitchen</h1>
                },
                {
                    path: '/bath',
                    element: <h1>bath</h1>
                },
                {
                    path: '/on-the-go',
                    element: <h1>on-the-go</h1>
                },
                {
                    path: '/about-us',
                    element: <h1>about-us</h1>
                },
                {
                    path: '/contact',
                    element: <h1>contact</h1>
                },
                {
                    path: '/user-info',
                    element: <h1>user info</h1>
                },
                {
                    path: '/create-new-user',
                    element: <CreateUser/>
                },
                {
                    path: '/list-users',
                    element: <ListUsers/>
                }
            ]
        },
    ]);

    return <RouterProvider router={router}/>;
}

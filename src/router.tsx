import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Users from "./components/Users";
import { PrivateRoute } from "./components/PrivateRoute";
import PaintStockList from "./routes/paintStock/PaintStockList";
import UserList from "./routes/users/UserList";
import RoleList from "./routes/users/RoleList";
import PaintStockEdit from "./routes/paintStock/PaintStockEdit";
import UserEdit from "./routes/users/UserEdit";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "PaintStockList",
                element: <PrivateRoute> <PaintStockList /></PrivateRoute>,
            },
            {
                path: "PaintStockList/Edit/:colourPk",
                element: <PrivateRoute> <PaintStockEdit /></PrivateRoute>,
            },
            {
                path: "/UserRole/Users/",
                element: <PrivateRoute> <UserList /></PrivateRoute>,
            },
            {
                path: "/UserRole/Users/Edit/:userId",
                element: <PrivateRoute> <UserEdit /></PrivateRoute>,
            },
            {
                path: "/UserRole/Roles/",
                element: <PrivateRoute> <RoleList /></PrivateRoute>,
            },
        ],
    },

]);
export default router;

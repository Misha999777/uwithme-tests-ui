import React, {lazy, Suspense} from "react";
import {createRoot} from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./store/store";
import LoadingIndicator from "./components/common/LoadingIndicator";
import App from "./App";

const Begin = lazy(() => import("./components/session/Begin"));
const Test = lazy(() => import("./components/test/Test"));
const Question = lazy(() => import("./components/test/Question"));
const Result = lazy(() => import("./components/test/Result"));
const Session = lazy(() => import("./components/session/Session"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "admin",
                element: <Test/>
            },
            {
                path: "question",
                element: <Question/>
            },
            {
                path: "result",
                element: <Result/>
            },
            {
                path: "start",
                element: <Begin/>
            },
            {
                path: "test",
                element: <Session/>
            }
        ]
    }
]);

const root = createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Suspense fallback={<LoadingIndicator/>}>
                <RouterProvider router={router}/>
            </Suspense>
        </Provider>
    </React.StrictMode>
);

if (location.protocol === "https:") {
    navigator.serviceWorker?.register("/sw.js");
}
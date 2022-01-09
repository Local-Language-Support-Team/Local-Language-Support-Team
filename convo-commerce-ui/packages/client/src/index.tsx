import React, { Suspense } from "react";
import "regenerator-runtime/runtime.js"; // Required for async/await to work with ES5 browserlist target
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import reportWebVitals from "./reportWebVitals";

import "./style.scss";

const LazyHome = React.lazy(() => import("./pages/home/home"));

const loadingScreen = <span className="loading">Loading</span>;

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Suspense fallback={loadingScreen}>
            <LazyHome />
          </Suspense>
        </Route>
      </Switch>
    </Router>
  );
}

ReactDOM.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>,
  document.getElementById("root")
);

module?.hot?.accept();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}

reportWebVitals(console.log);

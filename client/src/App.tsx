import React from "react";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import CountryPage from "./pages/CountryPage";
import MainPage from "./pages/MainPage";
import Footer from "./views/Footer";
import Header from "./views/Header";
import { theme } from "./theme";
import "./App.css";

const App:React.FC<{}> = React.memo(() => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route path="/country/:id?">
            <CountryPage />
          </Route>
        </Switch>
        <Footer />
      </div>
    </ThemeProvider>
  );
})

export default App;

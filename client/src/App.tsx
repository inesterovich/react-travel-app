import React from "react";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider, Container } from "@material-ui/core";
import CountryPage from "./pages/CountryPage";
import MainPage from "./pages/MainPage";
import Footer from "./views/Footer";
import Header from "./views/Header";
import { theme } from "./theme";
import "./App.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <main className="App">
        <Container maxWidth="xl">
          <Switch>
            <Route exact path="/">
              <MainPage />
            </Route>
            <Route path="/country">
              <CountryPage />
            </Route>
          </Switch>
        </Container>
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;

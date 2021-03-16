import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { ThemeProvider, Container, Snackbar } from "@material-ui/core";
import CountryPage from "./pages/CountryPage";
import MainPage from "./pages/MainPage";
import Footer from "./views/Footer";
import Header from "./views/Header";
import { theme } from "./theme";
import Promo from "./views/components/Promo";
import { useSelector } from "react-redux";
import { RootState } from "./redux/rootReducer";
import { Alert } from "@material-ui/lab";
import { typeLocalization, Lang } from "./types";

const textAuth: typeLocalization = {
  [Lang.Ru]: "Зарегестрированным пользователям доступен рейтинг",
  [Lang.En]: "Registered users have access to the rating",
  [Lang.Es]: "Los usuarios registrados tienen acceso a la calificación",
};

const App: React.FC<{}> = React.memo(() => {
  const location = useLocation();

  const currentLanguage = useSelector(
    (state: RootState) => state.countries.currentLanguage
  );

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <main className="App">
        {location.pathname === "/" && <Promo />}
        <Container maxWidth="xl">
          <Switch>
            <Route exact path="/">
              <MainPage />
            </Route>
            <Route path="/:id?">
              <CountryPage />
            </Route>
          </Switch>
        </Container>
        {isLoggedIn && (
          <Snackbar open={true} autoHideDuration={2000}>
            <Alert variant="filled" severity="success">
              {textAuth[currentLanguage as Lang]}
            </Alert>
          </Snackbar>
        )}
      </main>
      <Footer />
    </ThemeProvider>
  );
});

export default App;

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CountryPage from './pages/CountryPage';
import MainPage from './pages/MainPage';
import Footer from './views/Footer';
import Header from './views/Header';
import Search from './views/Search';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route exact path='/'>
          <Search />
          <MainPage />
        </Route>
        <Route path='/country'>
          <CountryPage />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;

import React from "react";
import posts, {InitialStateType} from "./redux/countries/reducers";
import {
  actionCountriesRequest,
  actionCountriesSuccess,
  actionSetCurrentLanguage,
  actionSetSearch
} from "./redux/countries";
import {render} from '@testing-library/react'
import MainPage from "./pages/MainPage";
import {Provider} from "react-redux";
import configureStore from 'redux-mock-store'
import thunk from "redux-thunk";
import {BrowserRouter} from "react-router-dom";
import CountryCard from "./views/components/Promo";
import {ActionTypes} from "./types";
import Footer from "./views/Footer";


const countryData = {
  "en": {"name": "United States",},
  "ru": {"name": "Соединенные Штаты",},
  "es": {"name": "Estados Unidos",}
}
let state: InitialStateType
const storeMock = configureStore([thunk]);
beforeEach(() => {
  state = {
    data: [
      countryData,countryData,countryData,countryData,
      {
        "en": {"name": "Russia",},
        "ru": {"name": "Россия",},
        "es": {"name": "Rusia",}
      }

    ] as Array<Object> | [],
    isLoading: false,
    error: null as string | null,
    currentLanguage: "en",
    currentCountry: [] as Array<Object> | [],
    search: "",
    isLoaderWeather: false as boolean,
    isLoaderCurrency: false as boolean
  }
})


describe("Country reducer", () => {
  it('should change language to ru', () => {
    const action = actionSetCurrentLanguage("ru")
    const newState = posts(state, action)
    expect(newState.currentLanguage).toBe("ru")
  });
  it("should change search to `123`", () => {
    const action = actionSetSearch("123")
    const newState = posts(state, action)
    expect(newState.search).toBe("123")
  })
})

describe("Language", ()=>{
  const languageTestFunc = (state:InitialStateType, language:"en"|"ru"|"es") => {
    const action = actionSetCurrentLanguage(language)
    const newState = posts(state, action)
    const reduxState = {"countries": {...newState}}
    const store = storeMock(reduxState)
    const {container} = render(<Provider store={store}><BrowserRouter><CountryCard/></BrowserRouter></Provider>)
    return container
  }

  it("promo text should be in ru", ()=> {
    const container = languageTestFunc(state, "ru")
    expect(container.querySelector("#promo")?.textContent).toBe("Откройте для себя Красоту Прекрасного мира")
  })
  it("promo text should be in en", ()=> {
    const container = languageTestFunc(state, "en")
    expect(container.querySelector("#promo")?.textContent).toBe("Explore the Beauty of the Beautiful World")
  })
  it("promo text should be in es", ()=> {
    const container = languageTestFunc(state, "es")
    expect(container.querySelector("#promo")?.textContent).toBe("Explore la Belleza del Hermoso mundo")
  })
})

describe("Main page", ()=>{
  const mainPageTestFunc = (action:ActionTypes) => {
    const newState = posts(state, action)
    const reduxState = {"countries": {...newState}}
    const store = storeMock(reduxState)
    const {container} = render(<Provider store={store}><BrowserRouter><MainPage/></BrowserRouter></Provider>)
    return container
  }

  it("should show preloader if isLoading", ()=>{
    const container = mainPageTestFunc(actionCountriesRequest())
    expect(container.querySelector("#center_block")).not.toBeNull()
    expect(container.querySelector("#flex-wrap")).toBeNull()
  })
  it("should show content if NOT isLoading", ()=>{
    const container = mainPageTestFunc(actionCountriesSuccess([]))
    expect(container.querySelector("#flex-wrap")).not.toBeNull()
    expect(container.querySelector("#center_block")).toBeNull()
  })

  it("should show 5 countries", async () => {
    const reduxState = {"countries": {...state}}
    const store = storeMock(reduxState)
    const {container} = render(<Provider store={store}><BrowserRouter><MainPage/></BrowserRouter></Provider>)
    expect(container.querySelectorAll("#countryCard")).toHaveLength(5)
  })

  it("should show 1 country with name `Russia`", ()=>{
    const action = actionSetSearch("Russia")
    const newState = posts(state, action)
    const reduxState = {"countries": {...newState}}
    const store = storeMock(reduxState)
    const {container} = render(<Provider store={store}><BrowserRouter><MainPage/></BrowserRouter></Provider>)
    expect(container.querySelectorAll("#countryCard")).toHaveLength(1)
  })

  it("should show footer", async ()=>{
    const {container} = render(<Footer/>)
    expect(container.querySelectorAll("#footer")).toHaveLength(1)
  })
})

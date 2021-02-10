import React from "react";
import SearchList from "./containers/SearchList";
import GlobalStyle from "./GlobalStyles";

export default function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <SearchList />
    </div>
  );
}

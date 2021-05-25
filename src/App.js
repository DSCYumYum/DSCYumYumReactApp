import Header from "./component/header";
import Map from "./component/map";
import Footer from "./component/footer";
import SearchAppBar from "./component/SearchAppBar";
import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import styled from "styled-components";

function App() {
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <div className="App">
      <SearchAppBar
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
      <Grid container direction="column" justify="center" alignItems="stretch">
        <Header />
        <Map searchKeyword={searchKeyword} />
        <Footer />
      </Grid>
    </div>
  );
}

const layoutStyle = {};

export default App;

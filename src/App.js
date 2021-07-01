import Header from "./component/common/header";
import Map from "./component/map/map";
import Footer from "./component/common/footer";
import SearchAppBar from "./component/search/SearchAppBar";
import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import styled from "styled-components";
import Search from "./component/search/search";

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
        <Search />
        <Map searchKeyword={searchKeyword} />
        <Footer />
      </Grid>
    </div>
  );
}

export default App;

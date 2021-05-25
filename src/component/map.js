import {
  FormatAlignJustify,
  SettingsInputAntennaTwoTone,
} from "@material-ui/icons";
import React from "react";
import styled from "styled-components";

/*global kakao*/

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //초기 : 부산대학교
      centerLat: 35.2335004352527,
      centerLng: 129.078417978798,
    };
  }
  callback = (result, status) => {
    if (status === kakao.maps.services.Status.OK) {
      //console.log(result);
      this.setState({
        centerLat: result[0].y,
        centerLng: result[0].x,
      });
      console.log(this.state.centerLat, this.state.centerLng);
    }
  };
  componentDidMount() {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_APP_KEY}&libraries=LIBRARY`;
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        let container = document.getElementById("map");

        let options = {
          center: new kakao.maps.LatLng(
            this.state.centerLat,
            this.state.centerLng
          ),
          level: 4,
        };
        const map = new window.kakao.maps.Map(container, options);
        // let markerPosition = new kakao.maps.LatLng(
        //   35.2335004352527,
        //   129.078417978798
        // );

        // let marker = new kakao.maps.Marker({
        //   position: markerPosition,
        // });
        // marker.setMap(map);
      });
    };
  }

  render() {
    // const places = new kakao.maps.services.Places();
    // places.keywordSearch(this.props.searchKeyword, this.callback);
    return (
      <>
        <div id="map" style={mapstyle}></div>
      </>
    );
  }
}

const mapstyle = {
  height: "500px",
  weight: "400px",
};

export default Map;

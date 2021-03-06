import React from "react";
import { List, ListItem } from "@material-ui/core";
import searchByCategory from "../search/functions/searchByCategory";
import Review from "../review";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

/*global kakao*/
class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      centerLat: 35.2335004352527,
      centerLng: 129.078417978798,
      markers: [],
      category: "디저트",
      tmp_title: "",
    };
  }
  componentWillReceiveProps(nextProps) {
    const keyword = nextProps.searchKeyword;
    if (this.props.searchKeyword !== nextProps.searchKeyword) {
      this.setState({ category: keyword }, () => {
        this.initMap();
      });
    }
  }
  componentDidMount() {
    const script = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_APP_KEY}&libraries=services,clusterer,drawing&autoload=false`;
    document.head.appendChild(script);
    script.onload = () => kakao.maps.load(this.initMap);
  }

  initMap = () => {
    let container = document.getElementById("map");

    let options = {
      center: new kakao.maps.LatLng(this.state.centerLat, this.state.centerLng),
      level: 4,
    };

    const map = new window.kakao.maps.Map(container, options);
    let markerPosition = new kakao.maps.LatLng(
      this.state.centerLat,
      this.state.centerLng
    );

    let marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    // marker.setMap(map);
    // this.setState({ markers: [...this.state.markers, marker] });

    /* test */
    const ps = new kakao.maps.services.Places();
    const self = this;

    ps.keywordSearch(this.state.category, placesSearch, {
      category_group_code: "FD6",
      location: new kakao.maps.LatLng(35.2335004352527, 129.078417978798),
      radius: 2000,
    });

    function placesSearch(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        console.log(data);
        self.displayMarkers(data);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 존재하지 않습니다.");
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
        return;
      }
    }
  };

  displayMarkers = (places) => {
    const { markers } = this.state;
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(this.state.centerLat, this.state.centerLng),
      level: 4,
    };
    let bounds = new kakao.maps.LatLngBounds();
    const map = new window.kakao.maps.Map(container, options);
    let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    let self = this;

    this.removeMarker();

    for (let place of places) {
      let placePosition = new kakao.maps.LatLng(place.y, place.x);
      let marker = new kakao.maps.Marker({
        position: placePosition,
      });

      marker.setMap(map);
      this.setState({
        markers: [...markers, marker],
      });

      bounds.extend(placePosition);

      (function (marker, title) {
        kakao.maps.event.addListener(marker, "mouseover", function () {
          displayInfowindow(marker, title);
        });

        kakao.maps.event.addListener(marker, "mouseout", function () {
          infowindow.close();
        });

        kakao.maps.event.addListener(marker, "click", function () {
          self.setState({ tmp_title: self.createSearchKeyword(title) });
          // show content
        });
      })(marker, place.place_name);
    }

    map.setBounds(bounds);

    function displayInfowindow(marker, title) {
      let content =
        '<div style="padding:5px;z-index:1;font-family:Do Hyeon">' +
        title +
        "</div>";

      infowindow.setContent(content);
      infowindow.open(map, marker);
    }
  };

  removeMarker = () => {
    const { markers } = this.state;

    for (let marker of markers) {
      marker.setMap(null);
    }

    this.setState({ markers: markers.splice(0, markers.length) });
  };

  createSearchKeyword = (title) => {
    let index = title.lastIndexOf(" ");

    if (index != -1) {
      if (title.includes("부산", index) || title.includes("금정", index)) {
        title = title.substring(0, index);
      }
    }

    return title;
  };

  render() {
    const flexContainer = {
      display: "flex",
      flexDirection: "row",
      padding: 0,
    };
    return (
      <>
        <div style={mapContainerStyle}>
          <div style={titleStyle}>
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              style={{
                color: "#238cfa",
                paddingRight: "10px",
              }}
            />
            <span>플레이스</span>
          </div>
          <div id="map" style={mapstyle}></div>
        </div>
        <Review title={this.state.tmp_title}></Review>
      </>
    );
  }
}
const titleStyle = {
  display: "flex",
  alignItems: "center",
  margin: "2vh 10vw",
  fontFamily: 'Do Hyeon',
  fontSize: "30px",
};

const mapstyle = {
  height: "60vh",
  weight: "60vw",
  margin: "0px 10vw",
  background: "#FAFAFA",
  border: "2px solid #F5dF4D",
  borderRadius: "30px",
};

const mapContainerStyle = {};
export default Map;

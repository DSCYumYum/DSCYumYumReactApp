import axios from "axios";
/*global kakao*/
export default async function searchByCategory(category) {
  // return await axios.get(
  //   `https://dapi.kakao.com//v2/local/search/keyword.json?appkey="05057a1945562275fa5a142191f10842"query={'피자'}&category_group_code=FD6&y=35.2335004352527&x=129.078417978798&radius=2000`,
  //   { Authorization: "KakaoAK 05057a1945562275fa5a142191f10842" }
  // );

  var places = new kakao.maps.services.Places();
  var callback = function (result, status) {
    if (status === kakao.maps.services.Status.OK) {
      console.log(result);
    }
  };
  await places.keywordSearch(category, callback, {
    category_group_code: "FD6",
    location: new kakao.maps.LatLng(35.2335004352527, 129.078417978798),
    radius: 2000,
  });
}

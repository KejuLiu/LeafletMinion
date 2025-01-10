var geoJsonLayer = null;

// var markers = [
//     { lat: 31.97246200000001, lng: 120.90744199999995, id: 1, title: "南通大学啬园校区", type: "学校" },
//     { lat: 31.98, lng: 120.894, id: 2, title: "南通市人民政府", type: "政府" },
//     { lat: 31.965, lng: 120.909433, id: 3, title: "啬园", type: "景区" },
//     { lat: 31.968580, lng: 120.894585, id: 6, title: "南通市中南城购物中心", type: "商场" },
//   ];

// // 创建一个空的标记图层
// var markerLayer = L.layerGroup().addTo(map);

// // 遍历 POI 数据，将标记添加到图层
// markers.forEach(function(markerData) {
//     var markers = L.marker([markerData.lat, markerData.lng])
//         .bindPopup('<b>' + markerData.title + '</b><br>' + '类型：' + markerData.type)
//         .addTo(markerLayer);
// });

// 如果你需要将这个图层加入或移除地图，可以使用以下代码：
// 加载图层
// markerLayer.addTo(map);

// 卸载图层
// markerLayer.clearLayers();  // 或者用 markerLayer.remove() 来移除整个图层




// 加载 GeoJSON 数据
function loadGeoJSON(map) {
    if (!geoJsonLayer) {
        if (typeof data === 'undefined') {
            console.error('json is not defined. Make sure json.js is loaded.');
            return;
        }
        // 添加到地图
        geoJsonLayer = L.geoJson(data,{

        }).addTo(map);

        console.log("GeoJSON data has been loaded.");
    } else {
        console.log("GeoJSON data is already loaded.");
    }
}

 // GeoJSON Layer
 const geoJSONLayer = L.geoJSON(data, {
    onEachFeature: (feature, layer) => {
      if (feature.properties && feature.properties.name) {
        layer.bindPopup(
          '编号：' + feature.properties.OBJECTID + '</br>' +
          '类型：地级市' + '</br>' +
          '城市：' + feature.properties.name + '</br>' +
          '周长：' + feature.properties.Shape_Length + '米' + '</br>' +
          '面积：' + feature.properties.Shape_Area + '平方米');
      }
    },
    style: () => {
      return { color: 'red' };
    },
    pointToLayer: (feature, latlng) => {
      return L.circleMarker(latlng, {
        radius: 8,
        fillColor: 'red',
        color: '#000',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      });
    }
  }).addTo(map);

// 卸载 GeoJSON 数据
function unloadGeoJSON(map) {
    if (geoJsonLayer) {
        map.removeLayer(geoJsonLayer);  // 从地图中移除图层
        geoJsonLayer = null;  // 清空图层变量
        console.log("GeoJSON data has been unloaded.");
    } else {
        console.log("No GeoJSON data to unload.");
    }
}

// 卸载 GeoJSON 数据
function unloadGeoJSON(map) {
    if (geoJsonLayer) {
        map.removeLayer(geoJsonLayer);
        geoJsonLayer = null;
        console.log("GeoJSON data has been unloaded.");
    } else {
        console.log("No GeoJSON data to unload.");
    }
}

// POI点数据
const markers = [
    { lat: 31.97246200000001, lng: 120.90744199999995, id: 1, title: "南通大学啬园校区", type: "学校" },
    { lat: 31.98, lng: 120.894, id: 2, title: "南通市人民政府", type: "政府" },
    { lat: 31.965, lng: 120.909433, id: 3, title: "啬园", type: "景区" },
    { lat: 34.20425600000002, lng: 117.28415799999993, id: 4, title: "徐州市人民政府", type: "政府" },
    { lat: 34.19432319067596, lng: 118.35546535505398, id: 5, title: "新沂市马陵山", type: "景区" },
    { lat: 31.968580, lng: 120.894585, id: 6, title: "南通市中南城购物中心", type: "商场" },
    { lat: 34.236473, lng: 117.152441, id: 7, title: "云龙湖", type: "景区" },
    { lat: 34.247095, lng: 117.221461, id: 8, title: "徐州汉文化博景区", type: "景区" },
    { lat: 34.176627, lng: 118.073091, id: 9, title: "窑湾古镇", type: "景区" },
    { lat: 34.368592, lng: 118.354522, id: 10, title: "新沂市人民政府", type: "政府" }
];

let markerClusterGroup = L.markerClusterGroup();  // 创建一个聚合层，用来聚合POI点

// 自定义图标样式
const customIcon = L.icon({
    iconUrl: './icon/map_854929.png',  // 这里是自定义的图标链接
    iconSize: [32, 32],  // 图标的尺寸
    iconAnchor: [16, 32],  // 图标的锚点，通常设置为图标宽度的一半和高度
    popupAnchor: [0, -32]  // 弹出框的相对位置
});

// 加载POI点到地图
function loadPOI() {
    markers.forEach(marker => {
        const poiMarker = L.marker([marker.lat, marker.lng], { icon: customIcon })  // 使用自定义图标
            .bindPopup(`<b>${marker.title}</b><br>类型: ${marker.type}`)
            .addTo(markerClusterGroup); // 将POI点添加到聚合图层中
    });

    // 将聚合图层添加到地图
    map.addLayer(markerClusterGroup);
}

// 清空POI点
function clearPOI() {
    // 清除聚合图层中的所有POI点
    markerClusterGroup.clearLayers();
    alert("已清除所有POI点！");
}

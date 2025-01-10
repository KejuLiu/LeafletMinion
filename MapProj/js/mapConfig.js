// 初始化 Leaflet 地图
var map = L.map('map').setView([39.9042, 116.4074], 13);

// 图层定义
var amapLayer = L.tileLayer('https://webrd02.is.autonavi.com/appmaptile?size=1&scale=1&style=7&x={x}&y={y}&z={z}', {
    maxZoom: 18,
    attribution: '高德地图'
}).addTo(map);

var arcgisLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var tdtVecLayer = L.tileLayer('https://t{s}.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=ef6dcee8b5c5358173fea69093fbaa26', {
    subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
    maxZoom: 18,
    attribution: '天地图矢量地图'
});

// 添加比例尺控件
L.control.scale().addTo(map);

// 添加绘制工具条
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

var drawControl = new L.Control.Draw({
    edit: {
        featureGroup: drawnItems,
        remove: true
    },
    draw: {
        polyline: true,
        polygon: true,
        circle: true,
        rectangle: true,
        marker: true
    }
});
map.addControl(drawControl);

// 监听绘制事件
map.on(L.Draw.Event.CREATED, function (event) {
    var layer = event.layer;
    drawnItems.addLayer(layer);
});

// 小地图
var miniMapLayer = L.tileLayer('https://webrd02.is.autonavi.com/appmaptile?size=1&scale=1&style=7&x={x}&y={y}&z={z}', {
    maxZoom: 18,
    minZoom: 0
});

var miniMap = new L.Map('miniMap', {
    layers: [miniMapLayer],
    zoomControl: false,
    attributionControl: false,
    dragging: false,
    scrollWheelZoom: false
}).setView(map.getCenter(), Math.max(map.getZoom() - 4, 0));

// 同步小地图与主地图
map.on('move', function () {
    var center = map.getCenter();
    miniMap.setView(center, Math.max(map.getZoom() - 4, 0));
});

map.on('zoomend', function () {
    miniMap.setZoom(Math.max(map.getZoom() - 4, 0));
});


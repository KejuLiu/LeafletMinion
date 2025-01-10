// 更新地图中心点显示
function updateMapCenter() {
    var center = map.getCenter();
    document.getElementById('mapCenter').textContent = `经度: ${center.lng.toFixed(4)}, 纬度: ${center.lat.toFixed(4)}`;
}

// 更新鼠标位置显示
function updateCursorPosition(e) {
    document.getElementById('cursorPosition').textContent = `经度: ${e.latlng.lng.toFixed(4)}, 纬度: ${e.latlng.lat.toFixed(4)}`;
}

// 绑定地图事件
map.on('move', updateMapCenter);
map.on('mousemove', updateCursorPosition);

// 初始化中心点显示
updateMapCenter();

// 切换瓦片图层
document.getElementById('tileLayerSelect').addEventListener('change', function() {
    var selectedLayer = this.value;
    map.eachLayer(function(layer) {
        map.removeLayer(layer);
    });
    if (selectedLayer === 'amap') {
        map.addLayer(amapLayer);
    } else if (selectedLayer === 'arcgis') {
        map.addLayer(arcgisLayer);
    } else if (selectedLayer === 'tdt_vec') {
        map.addLayer(tdtVecLayer);
    } else if (selectedLayer === 'tdt_img') {
        map.addLayer(tdtImgLayer);
    } else if (selectedLayer === 'tdt_ter') {
        map.addLayer(tdtTerLayer);
    }
});

// 清空绘制
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);
document.getElementById('clear').addEventListener('click', function() {
    drawnItems.clearLayers();
});

// 设置视图
document.getElementById('setView').addEventListener('click', function() {
    var zoomLevel = parseInt(document.getElementById('zoomLevel').value, 10);
    map.setView(map.getCenter(), zoomLevel);
});

// 全屏切换
var isFullscreen = false;
document.getElementById('fullscreen').addEventListener('click', function() {
    if (!isFullscreen) {
        document.body.requestFullscreen();
        isFullscreen = true;
    } else {
        document.exitFullscreen();
        isFullscreen = false;
    }
});



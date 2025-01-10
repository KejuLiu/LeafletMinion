// 初始化一个图层用于显示查询结果
var queryResultLayer = L.layerGroup();

// 添加矢量地块查询功能
function queryVectorLayer(map) {
    // 清空之前的查询结果
    queryResultLayer.clearLayers();

    // 示例矢量数据（GeoJSON 格式）
    var vectorData = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[[116.4, 39.9], [116.41, 39.9], [116.41, 39.91], [116.4, 39.91], [116.4, 39.9]]]
                },
                "properties": {
                    "name": "北京市天安门东长安街南区",
                    "id": 1,
                    "description": "该区域位于天安门东侧，是重要的商业和旅游区。"
                    
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[[116.42, 39.92], [116.43, 39.92], [116.43, 39.93], [116.42, 39.93], [116.42, 39.92]]]
                },
                "properties": {
                    "name": "北京市朝阳门大街区",
                    "id": 2,
                    "description": "该区域位于朝阳门大街，是重要的交通枢纽和商业区。"
                }
            }
        ]
    };

    // 将矢量数据加载到查询图层
    L.geoJSON(vectorData, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup(
                `<b>地块名称:</b> ${feature.properties.name}<br>` +
                `<b>ID:</b> ${feature.properties.id}<br>`+
                `<b>描述:</b> ${feature.properties.description}<br>`
                
            );
        },
        style: {
            color: "blue",
            weight: 2,
            fillOpacity: 0.5
        }
    }).addTo(queryResultLayer);

    // 将查询结果图层添加到地图
    queryResultLayer.addTo(map);
}

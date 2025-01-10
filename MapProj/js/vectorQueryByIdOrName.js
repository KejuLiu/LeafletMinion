// 假设的矢量数据（GeoJSON 格式）
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

// 初始化一个图层用于显示查询结果
var queryResultLayer = L.layerGroup();

// 按照ID或name查询地块
function queryVectorByIdOrName(map, queryValue, searchBy) {
    // 清空之前的查询结果
    queryResultLayer.clearLayers();

    // 根据查询方式（ID 或 name）筛选出符合条件的地块
    var result = vectorData.features.filter(function (feature) {
        if (searchBy === 'id') {
            return feature.properties.id === parseInt(queryValue);
        } else if (searchBy === 'name') {
            return feature.properties.name.includes(queryValue);
        }
    });

    // 如果有结果，添加到查询结果图层
    result.forEach(function (feature) {
        L.geoJSON(feature, {
            onEachFeature: function (feature, layer) {
                layer.bindPopup(
                    `<b>地块名称:</b> ${feature.properties.name}<br>` +
                    `<b>ID:</b> ${feature.properties.id}<br>` +
                    `<b>描述:</b> ${feature.properties.description}<br>`
                );
            },
            style: {
                color: "blue",
                weight: 2,
                fillOpacity: 0.5
            }
        }).addTo(queryResultLayer);
    });

    // 如果查询到结果，则将查询结果图层添加到地图
    if (result.length > 0) {
        queryResultLayer.addTo(map);
    } else {
        alert("未找到符合条件的地块。");
    }
}

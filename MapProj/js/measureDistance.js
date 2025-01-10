let distanceLayerGroup; // 图层组用于管理测量折线
let isMeasuring = false; // 测量状态标志
let points = []; // 存储点坐标

function enableDistanceMeasure(map) {
    if (isMeasuring) {
        // 如果已经在测量模式，则关闭测量模式
        disableDistanceMeasure(map);
        return;
    }

    isMeasuring = true;
    distanceLayerGroup = L.layerGroup().addTo(map);

    let tempLine = null; // 临时折线

    const clickHandler = (e) => {
        const { lat, lng } = e.latlng;

        // 添加点
        points.push([lat, lng]);
        L.circleMarker([lat, lng], { color: "red", radius: 5 }).addTo(distanceLayerGroup);

        // 更新折线
        if (tempLine) {
            distanceLayerGroup.removeLayer(tempLine);
        }
        tempLine = L.polyline(points, { color: "blue" }).addTo(distanceLayerGroup);

        // 计算总距离
        const distance = calculateTotalDistance(points);
        showDistanceTooltip(distance, e.latlng);
    };

    const moveHandler = (e) => {
        if (points.length > 0) {
            const tempPoints = [...points, [e.latlng.lat, e.latlng.lng]];
            if (tempLine) {
                distanceLayerGroup.removeLayer(tempLine);
            }
            tempLine = L.polyline(tempPoints, { color: "blue", dashArray: "5, 5" }).addTo(distanceLayerGroup);
        }
    };

    const calculateTotalDistance = (points) => {
        let total = 0;
        for (let i = 1; i < points.length; i++) {
            total += map.distance(points[i - 1], points[i]); // Leaflet 内置距离计算
        }
        return total.toFixed(2); // 保留两位小数
    };

    const showDistanceTooltip = (distance, latlng) => {
        L.popup()
            .setLatLng(latlng)
            .setContent(`<b>总距离:</b> ${distance} 米`)
            .openOn(map);
    };

    const endHandler = () => {
        map.off("click", clickHandler);
        map.off("mousemove", moveHandler);
        map.off("contextmenu", endHandler);
        map.closePopup();
        isMeasuring = false;
    };

    map.on("click", clickHandler);
    map.on("mousemove", moveHandler);
    map.on("contextmenu", endHandler); // 右键结束测量
}

function disableDistanceMeasure(map) {
    if (!isMeasuring) return;

    map.off("click");
    map.off("mousemove");
    map.off("contextmenu");

    if (distanceLayerGroup) {
        map.removeLayer(distanceLayerGroup);
        distanceLayerGroup = null;
    }

    points = []; // 清空点列表
    isMeasuring = false;
}

// 新增清空折线图层功能
function clearDistanceLayer() {
    if (distanceLayerGroup) {
        distanceLayerGroup.clearLayers();
    }
    points = []; // 同时清空点
    alert("测距绘制已清空！");
}

// 新增导出测距结果功能
function exportDistanceResult() {
    if (points.length === 0) {
        alert("没有测距结果可以导出！");
        return;
    }

    // 创建 GeoJSON 对象
    const geoJsonData = {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                properties: {
                    description: "测距结果",
                    totalDistance: calculateTotalDistance(points) + " 米",
                },
                geometry: {
                    type: "LineString",
                    coordinates: points.map(([lat, lng]) => [lng, lat]),
                },
            },
        ],
    };

    // 将 GeoJSON 数据导出为文件
    const blob = new Blob([JSON.stringify(geoJsonData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // 创建一个虚拟的下载链接
    const a = document.createElement("a");
    a.href = url;
    a.download = "distance_measurement.geojson";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url); // 释放 URL
    alert("测距结果已导出为 GeoJSON 文件！");
}

// 辅助计算总距离（复用）
function calculateTotalDistance(points) {
    let total = 0;
    for (let i = 1; i < points.length; i++) {
        total += map.distance(points[i - 1], points[i]); // Leaflet 内置距离计算
    }
    return total.toFixed(2); // 保留两位小数
}

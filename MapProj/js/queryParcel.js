// 假设地块数据是一个数组，每个地块有id、名称、位置等属性
const parcels = [
    { id: 1, name: "地块A", type: "商业区", lat: 31.972, lng: 120.907 },
    { id: 2, name: "地块B", type: "住宅区", lat: 31.980, lng: 120.894 },
    { id: 3, name: "地块C", type: "工业区", lat: 31.965, lng: 120.909 },
    // 可以根据实际需要添加更多地块数据
];

// 查询地块的功能
function queryParcel(map) {
    const latLng = map.getCenter();  // 获取当前地图的中心位置
    let foundParcel = null;

    // 查找离地图中心最近的地块（也可以根据其他逻辑，比如点击地图获取位置）
    parcels.forEach(parcel => {
        const parcelLatLng = L.latLng(parcel.lat, parcel.lng);
        if (latLng.distanceTo(parcelLatLng) < 1000) {  // 判断地图中心与地块的距离是否小于1000米
            foundParcel = parcel;
        }
    });

    // 如果找到了地块，显示信息
    if (foundParcel) {
        alert(`查询到的地块:\n名称: ${foundParcel.name}\n类型: ${foundParcel.type}`);
    } else {
        alert("未找到附近的地块信息！");
    }
}

// 将查询地块的功能绑定到按钮
document.getElementById("queryParcelButton").onclick = function () {
    queryParcel(map);
};

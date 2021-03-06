	//谷歌行政区划
	let googleAreaLayer = new L.tileLayer(
		"http://mt0.google.cn/vt/imgtp=png32&lyrs=h@248000000,style:maps&hl=zh-CN&gl=CN&src=app&s=Galileo&x={x}&y={y}&z={z}", 
		{}
	);
	//谷歌影像图
	let googleShadowLayer = new L.tileLayer(
		"http://mt0.google.cn/vt?lyrs=s@173&hl=zh-Hans-CN&gl=CN&token=63145&x={x}&y={y}&z={z}", 
		{className:'img-control'}
	);	
	let map = new L.map('map', {
		center: new L.LatLng(39.91349,116.407945),
		layers: [googleShadowLayer,googleAreaLayer],
		zoom: 4,
		zoomControl: false,
		minZoom: 3,
		attributionControl: false,
		doubleClickZoom: false
    });

	
	getJsonMap("mapdata/china.json");
	
	function getJsonMap(jsonName){
		$.getJSON(jsonName, function(json) {
			addGeoLayer(json);
		});
	}
	
	function addGeoLayer(json){
		var jsonMap = L.geoJson(json, {
			clickable: true,
			style: {
				fillColor: "red",
				fillOpacity: 0.1,
				fill: true,
				color: "black",
				weight: 1,
				opacity: 0
			},
			
			onEachFeature: function(feature, layer) {
				var pid = feature.properties.id;
				var name = feature.properties.name;
				
				layer.on("dblclick", function() {
					console.log(name)
					if(pid.length == 4){
						pid = pid + '00';
					}else if(pid.length == 6){
						pid = 'china';
					}
					jsonMap.removeFrom(map);
					getJsonMap("mapdata/" +pid+ ".json");
				});
				layer.on("mouseover", function() {
					layer.setStyle({
						weight: 3,
						color: "red",
						opacity: 1
					})
				});
				layer.on("mouseout", function() {
					layer.setStyle({
						weight: 1,
						color: "black",
						opacity: 0
					})
				});
				layer.bindTooltip(name, {
					direction: 'top'
				});
			}
		}).addTo(map);
	}
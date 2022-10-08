
window.getDateTime = () => {
	////debugger;
	//var gis_option = {
	//	title: '',
	//	clock: true,
	//	home: { x: 100, y: 12, z: 100000 },
	//	containerID: 'MapViewer',
	//	top: 42,
	//	markable: true,
	//	Imagery: 'ESRI World Imagery',
	//	kmlLayer: true,
	//	//Terrain:'Cesium World Terrain'
	//}
	//console.log("getDateTime");
	//GIS = new ALGIS(gis_option);
	

	//GIS.addLegend({
	//	id: 'Terrain', title: 'ภูมิประเทศ', checked: false, change: function () {
	//		$('#Terrain').change(function () {
	//			GIS.viewer.baseLayerPicker.viewModel.selectedTerrain = GIS.viewer.baseLayerPicker.viewModel.terrainProviderViewModels[0];
	//			if ($(this).prop('checked')) {
	//				GIS.viewer.terrainProvider = GIS.viewer.baseLayerPicker.viewModel.terrainProviderViewModels[1].creationCommand();
	//			} else {
	//				GIS.viewer.terrainProvider = GIS.viewer.baseLayerPicker.viewModel.terrainProviderViewModels[0].creationCommand();
	//			}
	//		});
	//	}, icon: 'https://pbwatch.net/Cesium-1.81/Build/Cesium/Widgets/Images/TerrainProviders/CesiumWorldTerrain.png'
	//});
	return "dfdf";
}
function menuChange() {
	if ($('#menu_button').hasClass('open')) {
		$('#MenuButton').attr('class', 'zmdi zmdi-close');
	} else {
		$('#MenuButton').attr('class', 'zmdi zmdi-menu');
	}
	setTimeout(menuChange, 500);
}
function pageHash() {
	if (GIS) {
		GIS.hide();
	}
	if (window.location.hash) {
		var hash = window.location.hash;
		if (hash == '#map') {
			LoadMap(function (map) {
				map.show();
			});
		} else {
			if (Cesium.Fullscreen.fullscreen) {
				Cesium.Fullscreen.exitFullscreen();
			}
		}
		$.each(Modules, function () {
			$(this.href + '_table').hide();
			if (this.href == hash) {
				if (this.table) {
					openTable(this);
				} else {
					if (!this.map) {
						loadPage(this);
					}
				}
			}
		});
	} else {
		window.location.hash = '#map';
	}
}

function loadPage(m) {
	if (!$('#' + m.name + '_table')[0]) {
		$('body').append('<div id="' + m.name + '_table" style="padding:10px;width:98%;margin-top:50px;"></div>');
	}
	if (!PAGES[m.name]) {
		Require(m.script, function (mod) {
			PAGES[m.name] = mod('#' + m.name + '_table');
			PAGES[m.name].show();
		});
	} else {
		PAGES[m.name].show();
	}
}
function openTable(m) {
	var table = m.name;
	$.each(Modules, function () {
		if (window.location.hash != this.href) {
			$('#' + table + '_table').hide();
		}
	});
	if (!TABLES[table]) {
		var script = m.script;
		var h = 84;
		$('body').append('<div id="' + table + '_table" style="top:' + h + 'px;padding:0 10px;width:100%;position:relative;"><table id="' + table + '_datatables" class="table table-hover table-striped table-responsive" cellspacing="0" width="100%"></table></div>');
		TABLES[table] = true;
		if (window.location.hash == m.href) {
			$('#' + table + '_table').show();
		} else {
			$('#' + table + '_table').hide();
		}
		Require(script, function (mod) {
			// debugger;
			TABLES[table] = mod();
			if (TABLES[table]) {
				TABLES[table].Table.headerOffset = h;
				TABLES[table].Table.TableID = table + '_datatables';
				var db = TABLES[table].Table.db ? TABLES[table].Table.db : { database: 'pbwatchn_ClimateSA', table: table }
				console.log("snap");
				TABLES[table].Connect = DB.db(db).Snapshot(function (s) {
					if (!TABLES[table].dataTables) {
						TABLES[table].Snapshot = s;
						SnapData(TABLES[table]);
					} else {
						TABLES[table].newSnapshot = s;
						processItem(TABLES[table]);
					}
				});
			}
		});
	} else {
		$('#' + table + '_table').show();
		if (TABLES[table].dataTables) {
			//setTimeout(function(){
			TABLES[table].dataTables.responsive.recalc();
			TABLES[table].dataTables.reset();
			TABLES[table].dataTables.fixedHeader.headerOffset(getTop() + 6);
			$('#' + table + '_table').css('top', getTop() + 'px');
			//},200);
		}
	}
}
function updateUSER(x, y) {
	if (!x || !y) {
		if (USER.lat && USER.lng) {
			y = USER.lat;
			x = USER.lng;
		}
		if (USER.last_lat && USER.last_lng) {
			y = USER.last_lat;
			x = USER.last_lng;
		}
	}
	if (!x || !y) {
		return false;
	}
	USER.last_check = new Date().getTime();
	USER.last_lat = y;
	USER.last_lng = x;
	if (isWorkTime()) {
		DB.db({ database: 'pbwatchn_ClimateSA', table: 'eu_users' }).update({ id: USER.id, last_lat: y, last_lng: x, last_check: USER.last_check });
	}
	GIS.getAdmin({ lat: y, lng: x }, function (a) {
		if (!USER.last_sub_district || USER.last_sub_district != a.sub_district) {
			if (isWorkTime()) {
				DB.db({ database: 'pbwatchn_ClimateSA', table: 'eu_users' }).update({ id: USER.id, last_province: a.province, last_district: a.district, last_sub_district: a.sub_district });
			}
			USER.last_sub_district = a.sub_district;
			USER.last_district = a.district;
			USER.last_province = a.province;
		}
	});
}
function LoadMap(c) {
	console.log("GIS");
	//$(window).trigger('resize');
	if (GIS) {
		if (c) {
			c(GIS);
		}
		return GIS;
	}
	var gis_option = {
		title: '',
		clock: true,
		home: { x: 100, y: 12, z: 100000 },
		containerID: 'MapViewer',
		top: 42,
		markable: true,
		Imagery: 'ESRI World Imagery',
		kmlLayer: true,
		//Terrain:'Cesium World Terrain'
	}
	GIS = new ALGIS(gis_option);
	GIS.init();
	GIS.addLegend({
		id: 'Terrain', title: 'ภูมิประเทศ', checked: false, change: function () {
			$('#Terrain').change(function () {
				GIS.viewer.baseLayerPicker.viewModel.selectedTerrain = GIS.viewer.baseLayerPicker.viewModel.terrainProviderViewModels[0];
				if ($(this).prop('checked')) {
					GIS.viewer.terrainProvider = GIS.viewer.baseLayerPicker.viewModel.terrainProviderViewModels[1].creationCommand();
				} else {
					GIS.viewer.terrainProvider = GIS.viewer.baseLayerPicker.viewModel.terrainProviderViewModels[0].creationCommand();
				}
			});
		}, icon: 'https://pbwatch.net/Cesium-1.81/Build/Cesium/Widgets/Images/TerrainProviders/CesiumWorldTerrain.png'
	});
}

function getOffset(bound) {
	var b = bound ? bound : GIS.getBound();
	return parseFloat(((b.E - b.W) / GIS.viewer.container.clientWidth).toFixed(6));
}
function queryOptions(rings, offset, type) {
	var rel = type ? type : 'esriSpatialRelEnvelopeIntersects';
	return {
		geometry: JSON.stringify({ rings: rings }),
		geometryType: "esriGeometryPolygon",
		inSR: 4326,
		outSR: 4326,
		spatialRel: rel,
		outFields: "*",
		returnGeometry: true,
		maxAllowableOffset: offset,
		geometryPrecision: 5,
		f: "pjson"
	}
}
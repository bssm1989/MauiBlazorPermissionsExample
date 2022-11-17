var ALGIS = function (options) {
	var $$ = this;
	this.options = options ? options : {}
	this.titleContainer = 'titleContainer';
	this.home = {
		x: $$.options && $$.options.home && $$.options.home.x ? $$.options.home.x : 100.7,
		y: $$.options && $$.options.home && $$.options.home.y ? $$.options.home.y : 13.8,
		z: $$.options && $$.options.home && $$.options.home.z ? $$.options.home.z : 10000000
	}
	this.init = function () {
		if (!$('#MapViewer2').length > 0) {
			setTimeout(function () {
				$$.init();
			}, 1);
			return false;
		}
		if ($$.containerID) {
			return false;
		}
		//debugger;
		$$.containerID = $$.options && $$.options.containerID ? $$.options.containerID : 'ALGISContainer';
		Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmMTM3MWFjMy01YjMwLTRiOTQtOWYzMy02YjIyNjcwM2Y5YjgiLCJpZCI6MTE4NDYsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTk4MjAyMTB9.cAenIn_UCizYjN4_sRr6Q_iI3NwIJdFagOFf9qSb-_g';
		//Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmYjMxNDdiOS1jZGRlLTRmYjgtODlmZC1kMjgxMWUyZGExNzAiLCJpZCI6NDQ2MCwic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU0MDkwNDI0OX0.-46e7v4dPecRdAw5X1vySdBWDOkUGVWoNsOpyvVfzP4';
		// Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees($$.home.x-2,$$.home.y-2,$$.home.x+2,$$.home.y+2);
		// Cesium.Camera.DEFAULT_VIEW_FACTOR = 0.15;
		$$.top = $$.options && $$.options.top ? $$.options.top : 0;
		console.log("gis");

		if (!$('#' + $$.containerID)[0]) {
			$('#MapViewer2').append('<div id="' + $$.containerID + '" style="position:relative;width:100%;z-index:10;"></div>');
		}
		$$.viewer = new Cesium.Viewer($$.containerID, {
			timeline: false,
			animation: false
		});
		var provinces_list = [18, 30, 31, 32, 33, 34, 35, 37, 42, 45, 46, 47, 49, 52, 58, 65, 93, 94, 95, 96];
		function loadAdminData(Layer, bound, offset) {
			//console.log(Layer.name);
			//if (!$('#' + Layer.name).prop('checked')) {
			//	$$.removeLayer(Layer.name);
			//	return false;
			//}
			var scale = 1;
			if (Layer.Label && Layer.Label.fontSize) {
				scale = Layer.Label.fontSize / 11;
			}
			if (Layer.scale && Layer.Label.scale) {
				scale = Layer.Label.scale;
			}
			var outlineColor = Layer.outlineColor ? Layer.outlineColor : '';
			var backgroundColor = Layer.backgroundColor ? Cesium.Color.fromCssColorString(Layer.backgroundColor) : Cesium.Color.fromCssColorString('#641706');
			if (!outlineColor) {
				if ($$.getToneColor() == 'dark') {
					outlineColor = Cesium.Color.RED;
				} else {
					outlineColor = Cesium.Color.RED;
				}
			}

			var height = Layer.height ? Layer.height : 10;
			//console.log(height);
			$.ajax({
				type: 'POST',
				async: true,
				url: Layer.url,
				crossDomain: true,
				data: $.param(queryOptions(bound, offset)),
				success: function (res) {
					//console.log("view5D");
					$$.removeLayer(Layer.name);
					$$.showLayer(Layer.name);
					var data = JSON.parse(res);
					$.each(data.features, function () {
						//console.log("exthension2");
						var max = 3.0e5 * scale * 1.2;
						var fillColor = Cesium.Color.WHITE;
						var attr = this.attributes;
						var feature = this;
						var label = Layer.Label.expression ? eval(Layer.Label.expression) : '';
						var Info = Layer.Info ? eval(Layer.Info) : '';
						var description = Layer.description ? eval(Layer.description) : '';
						var x;
						var y;
						//require(["esri/geometry/Polygon"], function (esriPolygon) {
						//	var p = new esriPolygon(feature.geometry.rings);
						//	y = parseFloat(p.centroid.latitude.toFixed(4));
						//	x = parseFloat(p.centroid.longitude.toFixed(4));
						//});
						var extentDescription = '<style>a:hover {text-decoration: none;}</style>';
						if (provinces_list.includes(parseInt(attr.PROV_CODE))) {
							max = 5.0e5 * scale * 1.2;
							max = 5.0e5 * scale * 1.2;
							fillColor = Cesium.Color.YELLOW;


							if (attr.TAM_CODE) {
								extentDescription = extentDescription + '<a class="zmdi zmdi-link" style="color:#ffffff;margin-top: 4px;font-size:24px;cursor:pointer;float: right;padding:16px;" aria-hidden="true" title="รายงานศักยภาพ 5 มิติ"  href="../survey_p2/?curr=report_jun14_5&jun=' + attr.PROV_CODE + '&amp=' + attr.PROV_CODE + attr.AMP_CODE + '&tmp=' + attr.PROV_CODE + attr.AMP_CODE + attr.TAM_CODE + '"></a>';

							} else if (attr.AMP_CODE) {
								extentDescription = extentDescription + '<a class="zmdi zmdi-link" style="color:#ffffff;margin-top: 4px;font-size:24px;cursor:pointer;float: right;padding:16px;" aria-hidden="true" title="รายงานศักยภาพ 5 มิติ"  href="../survey_p2/?curr=report_jun13_5&jun=' + attr.PROV_CODE + '&amp=' + attr.PROV_CODE + attr.AMP_CODE + '"></a>';


							} else {
								outlineColor = Cesium.Color.WHITE
								outlineColor = Cesium.Color.WHITEORANGE;
								extentDescription = extentDescription + '<a class="zmdi zmdi-link" style="color:#ffffff;margin-top: 4px;font-size:24px;cursor:pointer;float: right;padding:16px;" aria-hidden="true" title="รายงานศักยภาพ 5 มิติ"  href="../survey_p2/?curr=report_jun12_5&jun=' + attr.PROV_CODE + '"></a>';
							}



							extentDescription = extentDescription + '<div style="padding: 5px;">';




							extentDescription = extentDescription + '<span id="marker_view" class="zmdi zmdi-chart" style="font-size:24px;cursor:pointer;float: right;padding:16px;" aria-hidden="true" title="รายงานศักยภาพ 5 มิติ"></span>';
							extentDescription = extentDescription + '</div>';
						}
						var outlineWidth = 4;
						if (attr.TAM_CODE) {
							outlineWidth = 4;
							outlineColor = Cesium.Color.ORANGE;

						} else if (attr.AMP_CODE) {
							outlineWidth = 10;
							outlineColor = Cesium.Color.YELLOW;

						} else {
							outlineWidth = 15;
							outlineColor = Cesium.Color.WHITE;
						}

						$.each(this.geometry.rings, function (i) {
							var degrees = [];
							var ring = this;
							$.each(ring, function () {
								degrees.push(this[0]);
								degrees.push(this[1]);
							});
							var ent = {
								name: Info,
								parent: $$.Layers[Layer.name],
								polygon: {
									hierarchy: Cesium.Cartesian3.fromDegreesArray(degrees),
									outlineColor: outlineColor,
									outlineWidth: outlineWidth,
									fill: false,
									outline: true,
									shadows: Cesium.ShadowMode.ENABLED
								},
								description: description,
								extentDescription: extentDescription,

							}
							$$.viewer.entities.add(ent);
						});
						var point = {
							name: Info,
							parent: $$.Layers[Layer.name],
							description: description,
							position: Cesium.Cartesian3.fromDegrees(x, y, height),
							height: height,
							heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
							label: {
								text: label,
								scaleByDistance: new Cesium.NearFarScalar(1.0e2, scale, max, 0.0),
								backgroundColor: backgroundColor,
								showBackground: true,
								fillColor: fillColor
							},
							extentDescription: extentDescription,
							view: function () {
								view5D(attr);
							}
						}
						//$$.viewer.entities.add(point);
					});
				}
			});
		}
		function getOffset(bound) {
			var b = bound ? bound : $$.getBound();
			return parseFloat(((b.E - b.W) / $$.viewer.container.clientWidth).toFixed(6));
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
				f: "pjson",
				token: ''
			}
		}
		function view5D(attr) {
			var title = '';
			var src = '';
			if (attr.PROV_CODE) {
				src = '../survey_p2/?curr=report_jun12_5&jun=' + attr.PROV_CODE;
				title = attr.PROV_NAMT; //attr.prov_namt
			}
			if (attr.AMP_CODE) {
				src = '../survey_p2/?curr=report_jun13_5&jun=' + attr.PROV_CODE + '&amp=' + attr.PROV_CODE + attr.AMP_CODE;
				title = attr.AMP_NAMT + ' ' + title; //attr.amp_namt
			}
			if (attr.TAM_CODE) {
				src = '../survey_p2/?curr=report_jun14_5&jun=' + attr.PROV_CODE + '&amp=' + attr.PROV_CODE + attr.AMP_CODE + '&tmp=' + attr.PROV_CODE + attr.AMP_CODE + attr.TAM_CODE;
				title = attr.TAM_NAMT + ' ' + title; //attr.tam_namt
			}
			if ($('#data_view')[0]) {
				return false;
			}
			var div = '<div class="modal"><div class="modal-dialog modal-lg" style="height: 98%;width:98%;max-width:800px;margin:4px;"><div class="modal-content" style="height: 100%;"><div class="modal-header" style="padding: 4px;"><button type="button" class="close" data-dismiss="modal">×</button></div><div class="modal-body" id="data_view" style="padding:4px;height: 96%;"></div></div></div></div>';
			setTimeout(function () {
				$(div).modal();
				_view();
			}, 100);
			function _view() {
				if (!$('#data_view')[0]) {
					setTimeout(_view, 50);
					return false;
				}
				$('#data_view').html('<iframe id="dataiframe" class="responsive-iframe" style="display: none;width:100%;height: 100%;border: none;" src="' + src + '"></iframe>');
				_hide();
			}
			function _hide() {
				if (!$('#dataiframe').contents().find('.navbar')[0] || !$('#dataiframe').contents().find('footer')[0]) {
					setTimeout(_hide, 20);
					return false;
				}
				$('#dataiframe').contents().find('body').css('font-size', '0.9em');
				$($('#dataiframe').contents().find('.row')[2]).hide();
				$($('#dataiframe').contents().find('.row')[1]).css('font-size', '1.1em').css('margin-left', 0).css('font-weight', 800).html(title);
				$($('#dataiframe').contents().find('.row')[0]).hide();
				$('#dataiframe').contents().find('.navbar').hide();
				$('#dataiframe').contents().find('form').hide();
				$('#dataiframe').contents().find('footer').html('').css('height', '40px');
				$('#dataiframe').show();
			}
		}
		var admin_server = 'https://gistdaportal.gistda.or.th/arcgis/rest/services/app/admin_poly/MapServer';
		var admin_serverT = 'https://dhds.nha.co.th/arcgis/rest/services/NHA_PRO/NHAWL_RENDERER_ADMIN/MapServer/0/query';
		var admin_serverA = 'https://dhds.nha.co.th/arcgis/rest/services/NHA_PRO/NHAWL_RENDERER_ADMIN/MapServer/1/query';
		var admin_serverJ = 'https://dhds.nha.co.th/arcgis/rest/services/NHA_PRO/NHAWL_RENDERER_ADMIN/MapServer/2/query';

		var administratives = [
			{
				name: 'Provinces',
				// url:admin_serverJ,
				url: admin_server + '/2/query',
				outlineWidth: 4,
				Label: { expression: "attr.PROV_CODE==10?attr.PROV_NAMT:'จ.'+attr.PROV_NAMT", fontSize: 20, fillColor: Cesium.Color.BLUE },
				Info: "attr.PROV_CODE==10?attr.PROV_NAMT:'จ.'+attr.PROV_NAMT",
				description: "attr.PROV_CODE==10?attr.PROV_NAMT:'จ.'+attr.PROV_NAMT+'<br>'+attr.PROV_NAME",
				minOffset: 0.15,
				title: 'ขอบเขตจังหวัด',
				check: true
			},
			{
				name: 'Districts',
				url: admin_server + '/1/query',
				// url:admin_serverA,
				outlineWidth: 2,
				Label: { expression: "attr.PROV_CODE==10?'เขต'+attr.AMP_NAMT:'อ.'+attr.AMP_NAMT", fontSize: 16, fillColor: Cesium.Color.BLUE },
				Info: "attr.PROV_CODE==10?'เขต'+attr.AMP_NAMT+' '+attr.PROV_NAMT:'อ.'+attr.AMP_NAMT+' จ.'+attr.PROV_NAMT",
				description: "attr.PROV_CODE==10?'เขต'+attr.AMP_NAMT+' '+attr.PROV_NAMT+'<br>'+attr.AMP_NAME+', '+attr.PROV_NAME:'อ.'+attr.AMP_NAMT+' จ.'+attr.PROV_NAMT+'<br>'+attr.AMP_NAME+', '+attr.PROV_NAME",
				minOffset: 0.003,
				title: 'ขอบเขตอำเภอ',
				check: true

			},
			{
				name: 'SubDistricts',
				url: admin_server + '/0/query',
				// url:admin_serverT,
				outlineWidth: 1,
				Label: { expression: "attr.PROV_CODE==10?'แขวง'+attr.TAM_NAMT:'ต.'+attr.TAM_NAMT", fontSize: 10, fillColor: Cesium.Color.BLUE },
				Info: "attr.PROV_CODE==10?'แขวง'+attr.TAM_NAMT+' เขต'+attr.AMP_NAMT+' '+attr.PROV_NAMT:'ต.'+attr.TAM_NAMT+' อ.'+attr.AMP_NAMT+' จ.'+attr.PROV_NAMT",
				description: "attr.PROV_CODE==10?'แขวง'+attr.TAM_NAMT+' เขต'+attr.AMP_NAMT+' '+attr.PROV_NAMT+'<br>'+attr.TAM_NAME+', '+attr.AMP_NAME+', '+attr.PROV_NAME:'ต.'+attr.TAM_NAMT+' อ.'+attr.AMP_NAMT+' จ.'+attr.PROV_NAMT+'<br>'+attr.TAM_NAME+', '+attr.AMP_NAME+', '+attr.PROV_NAME",
				minOffset: 0.0007,
				title: 'ขอบเขตตำบล',
				check: true
			}
		];

		//$$.viewer.scene.mode= Cesium.SceneMode.SCENE2D;
		$$.infoBox = $('.cesium-infoBox');
		$$.container = $($$.viewer.container);
		$$.setTop($$.top);
		$$.toolbar = $('.cesium-viewer-toolbar');
		$$.toolbar.css('top', '0');
		$$.toolbar.css('right', '2px');
		$('.cesium-credit-textContainer').remove();
		$('.cesium-toolbar-button').css('margin-left', '1px');
		$('.cesium-credit-expand-link').remove();
		$('.cesium-widget-credits').after('<div id="zoom_lavel" class="cesium-widget-credits" style="margin:14px;user-select: none;font-size: 12px;"></div>');
		$$.viewer.camera.setView({
			destination: Cesium.Cartesian3.fromDegrees($$.home.x, $$.home.y, $$.home.z)
		});
		$$.dynamicLabels = $$.viewer.scene.primitives.add(new Cesium.LabelCollection());
		$($$.viewer.infoBox.frame).after('<div id="descriptionBox" style="display:none;padding:8px;overflow-y: auto;"></div>');
		$$.descriptionBox = $('#descriptionBox');
		setTimeout(function () {
			if ($$.options.Terrain) {
				$$.selectTerrain($$.options.Terrain);
			}
			if (options.Imagery) {
				$$.selectImagery($$.options.Imagery);
			}
		}, 10000);
		if ($$.options.kmlLayer) {
			$$.kmlLayer();
		}

		if ($$.options.kmlUpload) {
			$$.kmlUpload = $$.options.kmlUpload;
			setTimeout(function () {
				$$.kmlUploadButton();
			}, 100);
		}
		$$.viewer.selectedEntityChanged.addEventListener(function (e) {
			if (e) {
				$$.infoBox.css('top', $$.toolbar.height() + 'px');
				if (window.innerWidth < 400) {
					$$.infoBox.css('width', '60%');
				}
				if (e.fullWidth) {
					$$.infoBox.css('width', '100%');
				}
				if (e.width) {
					var w = e.width.endsWith('%') || e.width.endsWith('px') ? e.width : e.width + 'px';
					$$.infoBox.css('width', w);
				}
				if (e.extentDescription) {
					setTimeout(function () {
						$$.descriptionBox.html(e.extentDescription).show();
					}, 100);
					setTimeout(function () {
						var top = parseInt($$.descriptionBox.offset().top);
						$$.descriptionBox.css('max-height', (window.innerHeight - top - 10) + 'px');
						if ($('#marker_edit')[0] && e.edit) {
							$('#marker_edit').on('click', function () {
								e.edit();
							});
						}
						if ($('#marker_delete')[0] && e.delete) {
							$('#marker_delete').on('click', function () {
								e.delete();
							});
						}
						if ($('#marker_move')[0] && e.move) {
							$('#marker_move').on('click', function () {
								$('#marker_move').css('color', 'yellow');
								e.move();
							});
						}
						if ($('#marker_save')[0] && e.save) {
							$('#marker_save').on('click', function () {
								e.save();
								$('#marker_undo').hide();
								$('#marker_save').hide();
								$('#marker_move').css('color', '');
							});
						} if ($('#marker_save2')[0] && e.save) {
							//debugger;
							$('#marker_save2').on('click', function () {
								e.save();
								$('#marker_undo').hide();
								$('#marker_save2').hide();
								$('#marker_move').css('color', '');
							});
						}
						if ($('#marker_remove')[0] && e.remove) {
							$('#marker_remove').on('click', function () {
								e.remove();
							});
						}
						if ($('#marker_undo')[0] && e.originalPosition) {
							$('#marker_undo').on('click', function () {
								e.position = e.originalPosition;
								$('#marker_undo').hide();
								$('#marker_save').hide();
								$('#marker_move').css('color', '');
								e.draggable = false;
							});
						}
					}, 200);
				} else {
					$$.descriptionBox.html('').hide();
				}
				//$(window).trigger('resize');
			}
		});
		$$.searchText = '';
		$('.cesium-geocoder-input').keyup(function () {
			var searchText = $$.viewer.geocoder.viewModel.searchText;
			if (!searchText || $$.searchText == searchText || searchText.length < 3 || Math.abs($$.searchText.length - searchText.length) < 1) {
				return false;
			}
			$$.searchText = $$.viewer.geocoder.viewModel.searchText;
			setTimeout(function () {
				var c = 0;
				$.each($$.viewer.entities.values, function () {
					if (c > 50) {
						return false;
					}
					if (this.search) {
						var m = false;
						var ent = this;
						if (ent.search.includes(searchText)) {
							m = true;
						} else {
							var search = searchText.split(' ');
							$.each(search, function () {
								if (ent.search.includes(this)) {
									m = true;
								} else {
									m = false;
								}
							});
						}
						if (m) {
							var inc = false;
							$.each($$.viewer.geocoder.viewModel.suggestions, function () {
								if (this.id && this.id == ent.id) {
									inc = true;
								}
							});
							if (!inc) {
								$$.viewer.geocoder.viewModel.suggestions.push({ displayName: ent.search, destination: ent.position.getValue(), id: ent.id });
								c = c + 1;
							}
						}
					}
				});
			}, 2000);
		});
		$$.viewer.geocoder.viewModel.complete.addEventListener(function () {
			var val = $$.viewer.geocoder.viewModel.searchText;
			if (val && val.length > 4) {
				$.each($$.viewer.entities.values, function () {
					if (this.search && this.search == val) {
						var ent = this;
						$$.viewer.flyTo(ent);
						ent.show = true;
						if (ent.parent) {
							ent.parent.show = true;
						}
						$$.viewer.selectedEntity = ent;
						return false;
					}
				});
			}
		});
		$$.viewer.camera.moveEnd.addEventListener(function () {
			$$.zoom = $$.getZoom();
			$$.bound = $$.getBound();
			$$.dynamicLabels.removeAll();
			var z = $$.zoom / 1000 + ' กม.';
			if ($$.zoom < 1000) {
				z = $$.zoom + ' ม.';
			}
			$('#zoom_lavel').html('ความสูงระดับสายตา ' + z);
			if ($$.kmlData) {
				$.each($$.kmlData, function () {
					if ($('#' + this.layer).prop('checked')) {
						if (this.maxZoom && $$.zoom > this.maxZoom) {
							$$.hideLayer(this.layer);
						} else {
							$$.showLayer(this.layer);
						}
					} else {
						$$.hideLayer(this.layer);
					}
				});
			}
			if ($$.zoom < 2500) {
				$.each($$.viewer.entities.values, function () {
					if (this.dynamicLabel && this.isShowing) {
						var text = this.dynamicLabel.name ? this.dynamicLabel.name : this.name;
						if (text && $$.inBound(this)) {
							var z = $$.zoom;
							var t = '';
							var txt = this.dynamicLabel.name.split(' ');
							if (z > 1500) {
								t = txt[0];
								if (txt[1] && t.length < 10) {
									t = t + ' ' + txt[1];
								}
								if (txt[2] && t.length < 10) {
									t = t + ' ' + txt[2];
								}
								if (t.length > 10) {
									t = t.substring(0, 8) + '...';
								}
							} else if (z > 1200) {
								t = txt[0];
								if (txt[1] && t.length < 16) {
									t = t + ' ' + txt[1];
								}
								if (txt[2] && t.length < 16) {
									t = t + ' ' + txt[2];
								}
								if (t.length > 18) {
									t = t.substring(0, 16) + '...';
								}
							} else if (z > 1000) {
								t = txt[0];
								if (txt[1] && t.length < 16) {
									t = t + ' ' + txt[1];
								}
								if (txt[2] && t.length < 20) {
									t = t + ' ' + txt[2];
								}
								if (t.length > 25) {
									t = t.substring(0, 23) + '...';
								}
							} else {
								t = this.dynamicLabel.name;
								if (t.length > 50) {
									t = t.substring(0, 45) + '...';
								}
							}
							t = textProcess(t);
							this.dynamicLabel.text = t;
							$$.dynamicLabels.add(this.dynamicLabel);
						}
					}
				});
			}
		});
		Cesium.knockout.getObservable($$.viewer.baseLayerPicker.viewModel, 'selectedImagery').subscribe(function () {
			$$.toneColor = $$.getToneColor();
		});
		Cesium.knockout.getObservable($$.viewer.baseLayerPicker.viewModel, 'selectedTerrain').subscribe(function () {
			$$.selectTerrain($$.viewer.baseLayerPicker.viewModel.selectedTerrain.name);
		});
		$$.viewer.canvas.addEventListener('click', function (e) {
			var p = new Cesium.Cartesian2(e.clientX, e.clientY);
			var el = $$.viewer.scene.globe.ellipsoid;
			var ct = $$.viewer.camera.pickEllipsoid(p, el);
			if (ct) {
				var cg = el.cartesianToCartographic(ct);
				e.lat = parseFloat(Cesium.Math.toDegrees(cg.latitude).toFixed(6));
				e.lng = parseFloat(Cesium.Math.toDegrees(cg.longitude).toFixed(6));
				e.latLng = { lat: e.lat, lng: e.lng }
			} else {
				e.latLng = { lat: '', lng: '' }
				e.lat = '';
				e.lng = '';
			}
			e.selectedEntity = $$.viewer.selectedEntity ? $$.viewer.selectedEntity : '';
			e.entity = e.selectedEntity;
		}, false);
		var title = '<div id="' + $$.titleContainer + '" style="float:left;margin:2px;text-align:center;border-radius: 3px;padding: 7px 2px;color: white;background: rgba(38,38,38,0.95);font-size:0.9em;"></div>';
		$$.toolbar.prepend(title);
		$.each(administratives, function () {
			var L = this;
			console.log("check administratives");
			$$.addLegend({ id: L.name, title: L.title, checked: L.check });
			if (!$$.Layers[L.name]) {
				//$$.Layers[L.name] = $$.viewer.entities.add(new Cesium.Entity());
				//$$.Layers[L.name].show = true;
			}
			setTimeout(function () {

				//console.log(L.name);
				$('#' + L.name).change(function () {
					if ($(this).prop('checked')) {
						$$.showLayer(L.name);
					} else {
						$$.removeLayer(this.name);
					}
				});
			}, 1000);
		});
		$$.viewer.camera.moveEnd.addEventListener(function () {
			var b = $$.getBound();
			console.log(b);
			if (b && b.W >= 78 && b.N <= 33.75 && b.E <= 135 && b.S >= -22.5) {
				var ring = [[[b.W, b.N], [b.E, b.N], [b.E, b.S], [b.W, b.S]]];
				var offset = getOffset(b);
				console.log(offset);
				$.each(administratives, function () {
					if (offset < this.minOffset) {
						loadAdminData(this, ring, offset);
					} else {
						$$.removeLayer(this.name);
					}
				});
			} else {
				$.each(administratives, function () {
					$$.removeLayer(this.name);
				});
			}
		});
		$$.GeoLocation = navigator.geolocation || window.navigator.geolocation;
		var ex = 0.02;
		if ($$.GeoLocation) {
			function blink(p) {
				if (p.color == 2) {
					p.color = 1;
					p.point.outlineWidth = 25;
					p.point.pixelSize = 10;
				} else {
					p.color = 2;
					p.point.outlineWidth = 20;
					p.point.pixelSize = 12;
				}
				setTimeout(function () {
					blink(p);
				}, 500);
			}
			function _success(p) {
				var x = parseFloat((p.coords.longitude).toFixed(6));
				var y = parseFloat((p.coords.latitude).toFixed(6));
				if (y == 15.870032 && x == 100.992541) {
					y = '';
					x = '';
					if (USER.lat && USER.lng) {
						x = parseFloat(USER.lng);
						y = parseFloat(USER.lat);
					}
					if (USER.last_lat && USER.last_lng) {
						x = parseFloat(USER.last_lng);
						y = parseFloat(USER.last_lat);
					}
				}
				if (!x || !y) {
					return false;
				}
				USER.last_lat = y;
				USER.last_lng = x;
				$$.setView(x, y, 100);
				updateUSER(x, y);
				Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(x - ex, y - ex, x + ex, y + ex);
				Cesium.Camera.DEFAULT_VIEW_FACTOR = 0;
				$$.Location = $$.viewer.entities.add({
					id: 'geolocation',
					position: Cesium.Cartesian3.fromDegrees(x, y),
					lat: y,
					lng: x,
					name: 'ที่อยู่ปัจจุบันของคุณ',
					info: '<p style="font-size:0.9em;">' + y + ',' + x + '</p>',
					description: {
						getValue: function () {
							if ($('#save_def_location')[0] && !$('#save_def_location').attr('action')) {
								$('#save_def_location').attr('action', 1);
								$('#save_def_location').off().on('click', function () {
									$('#save_def_location').prop('disabled', true);
									DB.db({ database: 'pbwatchn_volunteer', table: 'users' }).update({ id: USER.id, lat: $$.Location.lat, lng: $$.Location.lng }, function () {
										$$.viewer.selectedEntity = undefined;
									});
									setTimeout(function () {
										$('#save_def_location').prop('disabled', false);
									}, 3000);
								});
							}
							if ($('#mark_location')[0] && !$('#mark_location').attr('action')) {
								$('#mark_location').attr('action', 1);
								$('#mark_location').off().on('click', function () {
									setTimeout(function () {
										$$.viewer.selectedEntity = undefined;
										$$.Marking({});
										$('#mapMarking').html('<img src="' + $$.markerIcon + '" >');
										$('#mapMarking').attr('title', 'คลิกเพื่อปิดการเพิ่มพิกัดบนแผนที่');
										$$.Marking({});
										$$.mark({ lat: $$.Location.lat, lng: $$.Location.lng }, function (pin) {
											$$.getAdmin(pin.latLng, function (a) {
												if (pin.lat && pin.lng) {
													pin.info = '<p style="font-size:0.9em;">' + pin.lat + ',' + pin.lng + '</p>';
												}
												if (a) {
													pin.administrative = a;
													pin.info = pin.info + '<p style="font-size:0.9em;">ตำบล : ' + a.sub_district + '</p>' +
														'<p style="font-size:0.9em;">อำเภอ : ' + a.district + '</p>' +
														'<p style="font-size:0.9em;">จังหวัด : ' + a.province + '</p>';
												}
											});
										});
									}, 200);
								});
							}
							return $$.Location.info + '<p><a style="cursor:help;" href="https://support.google.com/maps/answer/2839911?hl=th" target="_blank">คำแนะนำเพื่อเพิ่มความแม่นยำของ GPS</a></p>';
						}
					},
					color: 1,
					point: {
						pixelSize: 10,
						color: Cesium.Color.GREEN,
						outlineColor: Cesium.Color.BLUE.withAlpha(0.2),
						outlineWidth: 25
					},
					extentDescription: '<button id="save_def_location" style="float:right;margin:6px;" class="btn btn-primary">บันทึกเป็นที่อยู่ของคุณ</button><button id="mark_location" style="float:right;margin:6px;" class="btn btn-primary">ปักหมุดตรงนี้</button>'
				});
				$$.getAdmin({ lat: y, lng: x }, function (a) {
					if (a) {
						$$.Location.info = $$.Location.info + '<p style="font-size:0.9em;">ตำบล : ' + a.sub_district + '</p><p style="font-size:0.9em;">อำเภอ : ' + a.district + '</p><p style="font-size:0.9em;">จังหวัด : ' + a.province + '</p>';
					}
				});
				blink($$.Location);
				USER.Location = $$.Location;
			}
			function _error(e) {
				if (e.code == 1) {
					//navigator.permissions.query({name:'geolocation'}).then(function(result){
					//   if(result.state == 'denied'){
					//		var c = 'คุณไม่ได้อนุญาตให้ pbwatch.net แชร์ตำแหน่งของคุณ กรุณา<a style="cursor: help;" href="https://support.google.com/chrome/answer/142065?hl=th" target="_blank">อ่านวิธีแชร์ตำแหน่ง</a>';
					//		var div = '<div class="modal"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">×</button></div><div class="modal-body">'+c+'</div></div></div></div>';
					//		setTimeout(function(){
					//			$(div).modal();
					//		},2000);
					//		if(USER.lat && USER.lng){
					//			Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(USER.lng-ex,USER.lat-ex,USER.lng+ex,USER.lat+ex);
					//		}
					//		updateUSER();
					//   }
					//});
				} else {
					$$.GeoLocation.getCurrentPosition(_success, _error);
				}
			}
			$$.GeoLocation.getCurrentPosition(_success, _error);
			$$.GeoLocation.watchPosition(function (p) {
				var x = parseFloat((p.coords.longitude).toFixed(6));
				var y = parseFloat((p.coords.latitude).toFixed(6));
				if ($$.Location) {
					if (y == 15.870032 && x == 100.992541) {
						updateUSER();
						return false;
					}
					if (!USER.last_check || new Date().getTime() - parseInt(USER.last_check) > 60000 * 2) {
						updateUSER(x, y);
					}
					if ($$.Location.lat != y || $$.Location.lng != x) {
						Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(x - ex, y - ex, x + ex, y + ex);
						$$.Location.lat = y;
						$$.Location.lng = x;
						$$.Location.position = Cesium.Cartesian3.fromDegrees(x, y);
						$$.Location.info = '<p style="font-size:0.9em;">' + y + ',' + x + '</p>';
						$$.getAdmin({ lat: y, lng: x }, function (a) {
							if (a) {
								$$.Location.info = $$.Location.info + '<p style="font-size:0.9em;">ตำบล : ' + a.sub_district + '</p><p style="font-size:0.9em;">อำเภอ : ' + a.district + '</p><p style="font-size:0.9em;">จังหวัด : ' + a.province + '</p>';
							}
						});
					}
					USER.Location = $$.Location;
				} else {
					_success(p);
				}
			});
		} else {
			if (USER.lat && USER.lng) {
				Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(USER.lng - ex, USER.lat - ex, USER.lng + ex, USER.lat + ex);
			}
			updateUSER();
		}
		if ($$.options.markable && !$('#mapMarking')[0]) {
			$$.markable = false;
			$$.markerIcon = new Cesium.PinBuilder().fromText('M', Cesium.Color.DEEPSKYBLUE, 32).toDataURL();
			$$.markerIconDisable = new Cesium.PinBuilder().fromText('M', Cesium.Color.GRAY, 32).toDataURL();
			$$.toolbar.append('<button title="คลิกเพื่อเพิ่มพิกัดบนแผนที่" style="cursor: pointer;" id="mapMarking" class="cesium-button cesium-toolbar-button"><img src="' + $$.markerIconDisable + '" ></button>');
			$('#mapMarking').off().on('click', function () {
				if ($$.markable) {
					$$.Marking(null);
					$('#mapMarking').html('<img src="' + $$.markerIconDisable + '" >');
					$('#mapMarking').attr('title', 'คลิกเพื่อเพิ่มพิกัดบนแผนที่');
				} else {
					$$.markable = true;
					$$.Marking({});
					$('#mapMarking').html('<img src="' + $$.markerIcon + '" >');
					$('#mapMarking').attr('title', 'คลิกเพื่อปิดการเพิ่มพิกัดบนแผนที่');
				}
			});
		}
		if ($$.options.title) {
			$('#' + $$.titleContainer).html($$.options.title).show();
		} else {
			$('#' + $$.titleContainer).html('').hide();
		}
		if ($$.getWidth() < 600) {
			$('#' + $$.titleContainer).css('width', $$.getWidth() - 8 + 'px');
		} else {
			$('#' + $$.titleContainer).css('width', '');
		}
		$(window).resize(function () {
			$$.setTop($$.top);
			if ($$.getWidth() < 600) {
				$('#' + $$.titleContainer).css('width', $$.getWidth() - 8 + 'px');
			} else {
				$('#' + $$.titleContainer).css('width', '');
			}
			$$.infoBox.css('top', $$.toolbar.height() + 'px');
		});
	}
	this.inBound = function (p) {
		if (!p) { return false; }
		var a;
		if (p.position) {
			a = $$.positionToLatLng(p.position);
		} else {
			if (p.lat && p.lng) {
				a = p;
			}
		}
		if (!a || !a.lat || !a.lng) {
			return false;
		}
		var b = $$.bound;
		if (b && a.lat > b.S && a.lat < b.N && a.lng < b.E && a.lng > b.W) {
			return true;
		} else {
			return false;
		}
	}
	this.selectImagery = function (name) {
		$.each($$.viewer.baseLayerPicker.viewModel.imageryProviderViewModels, function () {
			if (this.name == name) {
				$$.viewer.baseLayerPicker.viewModel.selectedImagery = this;
			}
		});
	}
	this.selectTerrain = function (name) {
		$$.viewer.baseLayerPicker.viewModel.selectedTerrain = $$.viewer.baseLayerPicker.viewModel.terrainProviderViewModels[0];
		$.each($$.viewer.baseLayerPicker.viewModel.terrainProviderViewModels, function () {
			if (this.name == name) {
				$$.viewer.terrainProvider = this.creationCommand();
			}
		});
	}
	this.getToneColor = function () {
		var name = $$.getSelectedImagery();
		var dark = ['Bing Maps Aerial', 'Bing Maps Aerial with Labels', 'Sentinel-2', 'Blue Marble', 'Earth at night', 'Mapbox Satellite', 'Mapbox Streets', 'ESRI World Imagery'];
		if (dark.includes(name)) {
			$$.toneColor = 'dark';
			return 'dark';
		} else {
			$$.toneColor = 'bright';
			return 'bright';
		}
	}
	this.getSelectedImagery = function () {
		return $$.viewer.baseLayerPicker.viewModel.selectedImagery.name;
	}
	this.setView = function (x, y, z) {
		x = parseFloat(x);
		y = parseFloat(y);
		z = parseFloat(z);
		$$.viewer.camera.setView({
			destination: Cesium.Cartesian3.fromDegrees(x, y, z)
		});
	}
	this.addLayer = function (o, c) {
		if (o && o.name) {
			if (o.legend != false) {
				$$.addLegend(o);
			}
		}
		if (c) {
			c(o);
		}
	}
	this.addLegend = function (o) {
		if (!$$.legendContainer) {
			$$.legendLayer();
		}
		if (o) {
			var container = $$.legendContainer;
			if (o.container) {
				container = o.container;
			}
			if (o.id && !$('#' + o.id)[0]) {
				var title = o.title ? o.title : o.id;
				var checked = o.checked ? ' checked' : '';
				var color = o.color ? o.color : '#efefef';

				var margin = '';
				var fz = '';
				var wh = 'width:24px;height:24px;';
				var wh1 = 'width:16px;height:16px;';
				if (o.parent) {
					margin = 'margin-left:16px;';
					fz = 'font-size:0.9em;';
					wh = 'width:20px;height:20px;';
					wh1 = 'width:13px;height:13px;';
				}
				var icon = o.icon ? '<img src="' + o.icon + '" style="' + wh + '">' : '<span class="circle" style="border:1px solid;background-color:' + color + ';' + wh1 + '"></span>';
				var l = '<div class="layer-select" style="' + margin + fz + '">' + icon + '<input id="' + o.id + '" style="margin: 8px;cursor:pointer;" type="checkbox"' + checked + '><label for="' + o.id + '">' + title + '</label></div>';
				if (o.family) {
					$('#' + o.parent + '_wrapper').append(l);
				} else {
					container.append('<div id="' + o.id + '_wrapper">' + l + '</div>');
				}
				setTimeout(function () {
					if (o.change) {
						o.change();
					}
					$('#' + o.id).change(function () {
						if ($(this).prop('checked')) {
							$$.showLayer(o.id);
						} else {
							$$.hideLayer(o.id);
						}
					});
					if (o.parent) {
						$('#' + o.parent).change(function () {
							if ($(this).prop('checked')) {
								$('#' + o.id).prop('checked', true);
							} else {
								$('#' + o.id).prop('checked', false);
							}
							$('#' + o.id).trigger('change');
						});
					}
				}, 500);
			}
		}
	}
	this.getBound = function () {
		var w = 999;
		var s = 999;
		var e = -999;
		var n = -999;
		var tiles = $$.viewer.scene.globe._surface.tileProvider._tilesToRenderByTextureCount;
		if (tiles) {
			$.each(tiles, function (i, t) {
				if (t) {
					$.each(t, function () {
						w = Math.min(w, this.rectangle.west);
						s = Math.min(s, this.rectangle.south);
						e = Math.max(e, this.rectangle.east);
						n = Math.max(n, this.rectangle.north);
					});
				}
			});
		}
		if (w < 999) {
			var W = parseFloat(Cesium.Math.toDegrees(w).toFixed(4));
			var S = parseFloat(Cesium.Math.toDegrees(s).toFixed(4));
			var E = parseFloat(Cesium.Math.toDegrees(e).toFixed(4));
			var N = parseFloat(Cesium.Math.toDegrees(n).toFixed(4));
			return { W: W, N: N, E: E, S: S }
		} else {
			return false;
		}
	}
	this.legendLayer = function () {
		var div = '<div id="legendContainer" style="border: 1px solid #888;border-radius: 5px;padding: 5px;background-color: #efefef;"></div>';
		$('.cesium-baseLayerPicker-dropDown').prepend(div);
		var title = '<div style="font-size: 16pt;text-align: left;color: #edffff;margin-bottom: 4px;">ชั้นข้อมูล</div>';
		$('.cesium-baseLayerPicker-dropDown').prepend(title);
		$$.legendContainer = $('#legendContainer');
	}
	this.removeLayer = function (l, c) {
		if ($$.Layers[l]) {
			$.each($$.Layers[l]._children, function () {
				$$.viewer.entities.remove(this);
			});
			$$.Layers[l]._children = [];
		} else {
			$.each($$.viewer.entities.values, function () {
				var _this = this;
				if (_this.layer && _this.layer == l) {
					setTimeout(function () {
						$$.viewer.entities.remove(_this);
					}, 1);
				}
			});
		}
	}
	this.Layers = {}
	this.hideLayer = function (l, c) {
		if ($$.Layers[l]) {
			$$.Layers[l].show = false;
		} else {
			var src = $$.viewer.dataSources.getByName(l);
			if (src && src.length > 0) {
				$.each(src, function () {
					this.show = false;
				});
			}
			$.each($$.viewer.entities.values, function () {
				var _this = this;
				if (_this.layer && _this.layer == l) {
					_this.show = false;
				}
			});
		}
	}
	this.showLayer = function (l, c) {
		if ($$.Layers[l]) {
			$$.Layers[l].show = true;
		} else {
			var src = $$.viewer.dataSources.getByName(l);
			if (src && src.length > 0) {
				$.each(src, function () {
					this.show = true;
					if (this.dynamic) {
						$.each(this.entities.values, function () {
							if (this.position) {
								if ($$.inBound(this)) {
									this.show = true;
								} else {
									this.show = false;
								}
							}
						});
					}
				});
			} else {
				$.each($$.viewer.entities.values, function () {
					if (this.layer && this.layer == l) {
						this.show = true;
					}
				});
			}
		}
	}
	this.addMarker = function (o, c) {
		if (!o.lat || !o.lng) {
			return false;
		}
		o.icon = o.icon ? o.icon : '';
		o.label = o.label ? o.label : '';
		var p = {
			position: $$.setPosition(o),
			layer: o.layer ? o.layer : '',
			latLng: { lat: o.lat, lng: o.lng },
			name: o.name,
			description: o.description ? o.description : '',
			type: 'point',
			properties: o.properties
		}
		if (o.id) {
			p.id = o.id;
		}
		if (o.icon) {
			p.billboard = {
				image: o.icon.image ? o.icon.image : $$.markerIcon,
				width: o.icon.width ? o.icon.width : 32,
				height: o.icon.height ? o.icon.height : 32,
				//scaleByDistance:new Cesium.NearFarScalar(1.0e2,1,Layer.maxZoom,0.0),
				verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
				horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
			}
		}
		$$.viewer.entities.add(p);
	}
	this.mark = function (o, c) {
		if (!o.lat || !o.lng) {
			return false;
		}
		o.id = 'Marker';
		if ($$.viewer.entities.getById(o.id)) {
			$$.viewer.entities.getById(o.id).billboard.scale = 1;
			return false;
		}
		o.width = o.width ? o.width : 42;
		o.height = o.height ? o.height : 42;
		o.icon = o.icon ? o.icon : $$.markerIcon;
		o.name = o.name ? o.name : 'Marker';
		var p = {
			name: o.name,
			id: o.id,
			extentDescription: '   <style>    .select {        position: relative;        display: inline-block;        margin-bottom: 15px;        width: 100%;    }    .select select {            font-family: "Arial";            display: inline-block;            width: 100%;            cursor: pointer;            padding: 10px 21px;            outline: 0;            border: 0px solid #000000;            border-radius: 0px;            background: #e6e6e6;            color: #7b7b7b;            appearance: none;            -webkit-appearance: none;            -moz-appearance: none;        }            .select select::-ms-expand {                display: none;            }            .select select:hover,            .select select:focus {                color: #000000;                background: #cccccc;            }            .select select:disabled {                opacity: 0.5;                pointer-events: none;            }    .select_arrow {        position: absolute;        top: 16px;        right: 15px;        pointer-events: none;        border-style: solid;        border-width: 8px 5px 0px 5px;        border-color: #7b7b7b transparent transparent transparent;    }    .select select:hover ~ .select_arrow,    .select select:focus ~ .select_arrow {        border-top-color: #000000;    }    .select select:disabled ~ .select_arrow {        border-top-color: #cccccc;    }</style><div class="select">    <select id="typeSelete">        <option>--ประเภท--</option>        <option  value="building">กลุ่มสถานที่</option>        <option  value="person">กลุ่มครัวเรือน</option>    </select>    <div class="select_arrow">    </div></div>' +
				'' +
				'<div style="padding: 5px;"><span id="marker_remove" class="zmdi zmdi-delete" style="font-size:24px;cursor:pointer;float: right;padding:16px;" aria-hidden="true" title="ลบ"></span>' +
				'<span id="marker_save2" class="zmdi zmdi-floppy" style="font-size:24px;cursor:pointer;float: right;padding:16px;" aria-hidden="true" title="บันทึกเป็น"></span></div>',
			billboard: {
				image: o.icon,
				width: o.width,
				height: o.height,
				verticalOrigin: Cesium.VerticalOrigin.BOTTOM
			}
		}
		p.position = $$.setPosition(o, p);
		var pin = $$.viewer.entities.add(p);
		pin.remove = function () {
			$$.viewer.entities.remove(pin);
		}
		pin.save = function () {
			if ($$.saveMarkerPerson) {
				if ($('#pin_title')[0] && $('#pin_title').val()) {
					pin.title = $('#pin_title').val();
					pin.name = $('#pin_title').val();
				}
				if ($('#pin_detail')[0] && $('#pin_detail').val()) {
					pin.detail = $('#pin_detail').val();
				}

				if ($('#typeSelete').val() == "person") {
					$$.saveMarkerPerson(pin);
				} else if ($('#typeSelete').val() == "building") {
					$$.saveMarkerBuilding(pin);
				}

			}
		}
		pin.description = {
			getValue: function () {
				return pin.info;
			}
		}
		$$.pinMoving(pin, c);
	}
	this.Marking2 = function (o) {
		o.width = 42;
		o.height = 42;
		o.icon = $$.markerIcon;
		o.name = "Marker";
		var p = {
			name: o.name,
			id: o.id,
			extentDescription:
				// '<style>    .select {        position: relative;        display: inline-block;        margin-bottom: 15px;        width: 100%;    }    .select select {            font-family: "Arial";            display: inline-block;            width: 100%;            cursor: pointer;            padding: 10px 21px;            outline: 0;            border: 0px solid #000000;            border-radius: 0px;            background: #e6e6e6;            color: #7b7b7b;            appearance: none;            -webkit-appearance: none;            -moz-appearance: none;        }            .select select::-ms-expand {                display: none;            }            .select select:hover,            .select select:focus {                color: #000000;                background: #cccccc;            }            .select select:disabled {                opacity: 0.5;                pointer-events: none;            }    .select_arrow {        position: absolute;        top: 16px;        right: 15px;        pointer-events: none;        border-style: solid;        border-width: 8px 5px 0px 5px;        border-color: #7b7b7b transparent transparent transparent;    }    .select select:hover ~ .select_arrow,    .select select:focus ~ .select_arrow {        border-top-color: #000000;    }    .select select:disabled ~ .select_arrow {        border-top-color: #cccccc;    }</style><div class="select">  '+  
				// '<select id="typeSelete">'+
				// '<option>--ประเภท--</option>'+
				// '<option  value="flood">แจ้งน้ำท่วม</option>'+
				// '<option  value="wind">แจ้งลม</option>'+
				// '<option  value="rain">แจ้งฝน</option>'+
				// '<option  value="wave">แจ้งคลื่นทะเล</option>'+
				// '</select>    <div class="select_arrow">    </div></div>' +
				// "" +
				'<div style="padding: 5px;"><span id="marker_remove" class="zmdi zmdi-delete" style="font-size:24px;cursor:pointer;float: right;padding:16px;" aria-hidden="true" title="ลบ."></span>' +
				'<span id="marker_save2" class="zmdi zmdi-floppy" style="font-size:24px;cursor:pointer;float: right;padding:16px;" aria-hidden="true" title="บันทึกเป็น"></span></div>',
			billboard: {
				image: o.icon,
				width: o.width,
				height: o.height,
				verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
			},
		};
		p.position = $$.setPosition(o, p);
		var pin = $$.viewer.entities.add(p);
		$$.pinMoving(pin, function () {
			document.getElementById("lat").value = pin.lat;
			document.getElementById("lon").value = pin.lng;
		});
	};
	this.Marking = function (o, c) {
		if (!o) {
			$$.removeEntityById('Marker');
			$$.markable = false;
		} else {
			$$.markable = true;
		}

		$$.onclick(function (e) {
			if (!o || !$$.markable) {
				return false;
			}
			if (!e.selectedEntity && !$$.dragging) {
				//if(!e.selectedEntity && !$$.dragging && $$.getZoom()<2000){
				o.lat = e.lat;
				o.lng = e.lng;
				$$.mark(o, function (pin) {
					$$.getAdmin(pin.latLng, function (a) {
						if (pin.lat && pin.lng) {
							pin.info = '<p style="font-size:0.9em;">' + pin.lat + ',' + pin.lng + '</p>';
						}
						if (a) {
							pin.administrative = a;
							pin.info = pin.info + '<p style="font-size:0.9em;">ตำบล : ' + a.sub_district + '</p>' +
								'<p style="font-size:0.9em;">อำเภอ : ' + a.district + '</p>' +
								'<p style="font-size:0.9em;">จังหวัด : ' + a.province + '</p>';
						}
						if ($$.viewer.selectedEntity && $$.viewer.selectedEntity.id == pin.id) {
							if (c) {
								c(pin);
							}
						}
					});
				});
			}
		});
	}
	this.getZoom = function () {
		var cartographic = new Cesium.Cartographic();
		var camera = $$.viewer.scene.camera;
		var ellipsoid = $$.viewer.scene.mapProjection.ellipsoid;
		ellipsoid.cartesianToCartographic(camera.positionWC, cartographic);
		return parseInt(cartographic.height);
	}
	this.pinMoving = function (pin, c) {
		if (!$$.EventHandler) {
			$$.EventHandler = new Cesium.ScreenSpaceEventHandler($$.viewer.canvas);
		}
		$$.dragging = false;
		if (!pin) {
			return false;
		}
		pin.draggable = true;
		$$.EventHandler.setInputAction(function (click) {
			var picked = $$.viewer.scene.pick(click.position);
			if (Cesium.defined(picked) && (picked.id.id == pin.id && pin.draggable)) {
				$$.dragging = pin;
				pin.billboard.scale = 1.2;
				$$.viewer.scene.screenSpaceCameraController.enableRotate = false;
			}
		}, Cesium.ScreenSpaceEventType.LEFT_DOWN);
		$$.EventHandler.setInputAction(function (click) {
			if (pin && pin.remove && pin.id == 'Marker') {
				pin.remove();
			}
		}, Cesium.ScreenSpaceEventType.RIGHT_DOWN);
		$$.EventHandler.setInputAction(function () {
			if ($$.dragging && pin) {
				pin.billboard.scale = 1;
				if (c) {
					c(pin);
				}
				$$.dragging = false;
				$$.viewer.scene.screenSpaceCameraController.enableRotate = true;
			}
		}, Cesium.ScreenSpaceEventType.LEFT_UP);
		$$.EventHandler.setInputAction(function (mvt) {
			if ($$.dragging && pin.draggable) {
				var start = $$.viewer.camera.pickEllipsoid(mvt.startPosition);
				var end = $$.viewer.camera.pickEllipsoid(mvt.endPosition);
				var sll = $$.positionToLatLng(start);
				if (Cesium.defined(end)) {
					pin.position = end;
					var ll = $$.positionToLatLng(end);
					pin.lat = ll.lat;
					pin.lng = ll.lng;
					pin.latLng = ll.latLng;
					pin.info = '';
				}
			}
		}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
	}
	this.positionToLatLng = function (p) {
		var ll = {}
		var x = p;
		if (p.getValue) {
			x = p.getValue();
		}
		var cg = $$.viewer.scene.globe.ellipsoid.cartesianToCartographic(x);
		ll.lat = parseFloat(Cesium.Math.toDegrees(cg.latitude).toFixed(6));
		ll.lng = parseFloat(Cesium.Math.toDegrees(cg.longitude).toFixed(6));
		ll.latLng = { lat: ll.lat, lng: ll.lng }
		return ll;
	}
	this.onclick = function (cb) {
		if (cb) {
			$$.viewer.canvas.addEventListener('click', function (e) {
				cb(e);
			});
		}
	}
	this.setPosition = function (ll, e, z) {
		var h = z ? z : 10;
		var lat = parseFloat(ll.lat);
		var lng = parseFloat(ll.lng);
		var p = Cesium.Cartesian3.fromDegrees(lng, lat, h);
		if (e) {
			e.position = p;
			e.latLng = { lat: lat, lng: lng };
			e.lat = lat;
			e.lng = lng;
		}
		return p;
	}
	this.markers = function () {

	}
	this.addPolygon = function (o, c) {

	}
	this.polygons = function () {

	}
	this.getEntityById = function (id) {
		return $$.viewer.entities.getById(id);
	}
	this.removeEntityById = function (id) {
		var ent = $$.viewer.entities.getById(id);
		if (ent) {
			$$.viewer.entities.remove(ent);
		}
	}
	this.removeEntity = function (ent) {
		if (ent) {
			$$.viewer.entities.remove(ent);
		}
	}
	this.addPolyline = function (o, c) {

	}
	this.polylines = function () {

	}
	this.removeItem = function (i) {

	}
	this.hideItem = function (i) {

	}
	this.addItem = function (i) {

	}
	this.showItem = function (i) {

	}
	this.getWidth = function () {
		return window.innerWidth;
	}
	this.setWidth = function (w) {
		$$.container.css('width', w + 'px');
	}
	this.getHeight = function () {
		return window.innerHeight;
	}
	this.setHeight = function (h) {
		$$.container.css('height', h + 'px');
	}
	this.setTop = function (t) {
		$$.container.css('top', t + 'px');
		var h = $$.getHeight() - t;
		$$.setHeight(h);
	}
	this.hide = function () {

		//$$.container.hide();
	}
	this.show = function () {
		//$$.container.show();
	}
	this.dynamicLabel = function (e) {

	}
	this.checkLabelText = function (txt) {

	}
	this.kmlLayer = function () {
		var div = '<div id="kmlLegendContainer" style="border: 1px solid #888;border-radius: 5px;padding: 5px;background-color: #efefef;"></div>';
		$('.cesium-baseLayerPicker-dropDown').prepend(div);
		var title = '<div style="font-size: 16pt;text-align: left;color: #edffff;margin-bottom: 4px;">ชั้นข้อมูล KML/KMZ</div>';
		$('.cesium-baseLayerPicker-dropDown').prepend(title);
		$$.kmlLegendContainer = $('#kmlLegendContainer');
	}
	this.removeKml = function (l) {
		var src = $$.viewer.dataSources.getByName(l);
	}
	this.addKml = function (url, opt, c) {
		if (!url) {
			return false;
		}
		var layer = encodeURIComponent(url).replace(/%/g, '');
		layer = layer.replace(/\//g, '');
		layer = layer.replace(/@/g, '');
		layer = layer.replace(/#/g, '');
		layer = layer.replace(/\?/g, '');
		layer = layer.replace(/\./g, '');
		$$.removeKml(layer);
		var checked = true;
		if (opt && !opt.checked) {
			checked = false;
		}
		var kml = $$.viewer.dataSources.add(Cesium.KmlDataSource.load(url));
		kml.then(function (data) {
			data.layer = layer;
			var title = data.name.replace('.kml', '');
			title = title.replace('.kmz', '');
			data.name = layer;
			data.url = url;
			$$.addLegend({ id: layer, title: title, checked: checked, container: $$.kmlLegendContainer });
			$.each(data.entities.values, function () {
				this.layer = layer;
			});
			if (opt && opt.maxZoom) {
				data.maxZoom = opt.maxZoom;
			}
			if (opt && opt.flyTo) {
				$$.viewer.flyTo(data);
			}
			if (opt && opt.id) {
				data.data_id = opt.id;
			}
			if (!$$.kmlData) {
				$$.kmlData = {};
			}
			$$.kmlData[layer] = data;
			if (c) {
				c(data);
			}
		});
	}

	this.kmlUploadButton = function (o) {
		if (!$$.kmlLegendContainer) {
			$$.kmlLayer();
		}
		if (!$('#kml_upload')[0]) {
			var input = '<div><span title="นำเข้าไฟล์ KML/KMZ" style="line-height:40px;"><input id="kml_upload" type="file" accept=".kml ,.kmz" style="opacity:0;position: absolute;font-size:40px;width:60px;z-index:1;"><img src="images/kml.png" width="32"></span><span style="font-size:0.8em;">อัปโหลดไฟล์</span></div>';
			input = input + '<div><form class="form-inline"><div class="form-group"><input id="kml_url" placeholder="หรือเพิ่ม url https://xxxx.xx/**.kml" type="url" class="form-control form-control-sm"></div><button type="submit" class="btn btn-sm btn-dark" id="kml_url_submit">เพิ่ม url</button></form></div>';
			$$.kmlLegendContainer.append(input);
			setTimeout(function () {
				$('#kml_url_submit').click(function (e) {
					if ($('#kml_url').val()) {
						$$.addKml($('#kml_url').val());
						$('#kml_url').val('');
					}
					return false;
				});
				$('#kml_upload').off().on('change', function () {
					if ($(this).val()) {
						if ($$.kmlUpload) {
							$$.kmlUpload(this.files[0]);
						}
					}
				});
			}, 1000);
		}
	}
	$$.getAdmin = function (LL, cb) {
		var query = { geometry: LL.lng + ',' + LL.lat, geometryType: "esriGeometryPoint", inSR: 4326, outSR: 4326, spatialRel: "esriSpatialRelWithin", outFields: "*", returnGeometry: false, f: "pjson" }
		$.ajax({
			type: 'POST',
			url: 'https://dhds.nha.co.th/arcgis/rest/services/NHA_PRO/NHAWL_RENDERER_ADMIN/MapServer/0/query',
			crossDomain: true,
			data: $.param(query),
			success: function (data) {
				data = JSON.parse(data);
				if (data.features && data.features.length == 1) {
					var admin = {};
					admin.province = data.features[0].attributes.PROV_NAMT;
					admin.district = data.features[0].attributes.AMP_NAMT;
					admin.sub_district = data.features[0].attributes.TAM_NAMT;
					cb(admin);
				}
			}
		});
	}
	$$.esriPolygonCentroid = function (rings, cb) {
		require(["esri/geometry/Polygon"], function (esriPolygon) {
			var c = {};
			var poly = new esriPolygon(rings);
			c.lat = parseFloat(poly.centroid.latitude.toFixed(4));
			c.lng = parseFloat(poly.centroid.longitude.toFixed(4));
			if (cb) {
				cb(c);
			}
		});
	}
	$$.getLatLngAdmin = function (opts, cb) {
		if ($$.gettingLatLng) {
			setTimeout(function () {
				$$.getLatLngAdmin(opts, cb);
			}, 5);
			return false;
		}
		if (!opts.getTempGeoCount) {
			opts.getTempGeoCount = 1;
		} else {
			if (opts.getTempGeoCount > 20) {
				return false;
			}
			opts.getTempGeoCount = opts.getTempGeoCount + 1;
		}
		var server = 'https://dhds.nha.co.th/arcgis/rest/services/NHA_PRO/NHAWL_RENDERER_ADMIN/MapServer/0/query';
		var where;
		var L;
		if (opts.province) {
			where = "PROV_NAMT='" + opts.province + "'";
			L = '2';
		}
		if (opts.district) {
			where = "AMP_NAMT='" + opts.district + "'";
			L = '1';
		}
		if (opts.sub_district) {
			where = "TAM_NAMT='" + opts.sub_district + "'";
			L = '0';
			if (opts.province && opts.district && $$.LatLngAdmin && $$.LatLngAdmin[opts.province + '-' + opts.district + '-' + opts.sub_district]) {
				opts.latLng = ranLocation($$.LatLngAdmin[opts.province + '-' + opts.district + '-' + opts.sub_district]);
				if (cb) {
					cb(opts);
				}
				return false;
			}
		}
		if (where) {
			var query = {
				outSR: 4326,
				outfields: "*",
				where: where,
				returnGeometry: true,
				geometryPrecision: 3,
				returnCentroid: true,
				f: "pjson"
			}
			$$.gettingLatLng = true;
			//	console.log("gis get prov");
			$.ajax({
				type: 'POST',
				url: server + L + '/query',
				crossDomain: true,
				data: query,
				success: function (data) {
					$$.gettingLatLng = false;
					data = JSON.parse(data);
					if (data.features) {
						if (data.features.length > 0) {
							opts.latLng = {}
							data.features.forEach(function (f) {
								if (opts.sub_district) {
									if (f.attributes.a_name_t == opts.district || f.attributes.AMP_NAMT == opts.district) {
										if (f.centroid) {
											opts.latLng = ranLocation({ lat: f.centroid.y, lng: f.centroid.x });
											if (!$$.LatLngAdmin) {
												$$.LatLngAdmin = {}
											}
											$$.LatLngAdmin[opts.province + '-' + opts.district + '-' + opts.sub_district] = opts.latLng;
											if (cb) {
												cb(opts);
											}
											return false;
										} else {
											$$.esriPolygonCentroid(f.geometry.rings, function (centroid) {
												opts.latLng = ranLocation(centroid);
												if (!$$.LatLngAdmin) {
													$$.LatLngAdmin = {}
												}
												$$.LatLngAdmin[opts.province + '-' + opts.district + '-' + opts.sub_district] = opts.latLng;
												if (cb) {
													cb(opts);
												}
												return false;
											});
										}
									}
								} else if (opts.district) {
									if (f.attributes.a_name_t == opts.district || f.attributes.AMP_NAMT == opts.district) {
										if (f.centroid) {
											opts.latLng = ranLocation({ lat: f.centroid.y, lng: f.centroid.x });
											if (cb) {
												cb(opts);
											}
											return false;
										} else {
											$$.esriPolygonCentroid(f.geometry.rings, function (centroid) {
												opts.latLng = ranLocation(centroid);
												if (cb) {
													cb(opts);
												}
												return false;
											});
										}
									}
								} else if (opts.province) {
									if (f.attributes.p_name_t == opts.province || f.attributes.PROV_NAMT == opts.province) {
										if (f.centroid) {
											opts.latLng = ranLocation({ lat: f.centroid.y, lng: f.centroid.x });
											if (cb) {
												cb(opts);
											}
											return false;
										} else {
											$$.esriPolygonCentroid(f.geometry.rings, function (centroid) {
												opts.latLng = ranLocation(centroid);
												if (cb) {
													cb(opts);
												}
												return false;
											});
										}
									}
								}
							});
						}
					} else {
						$$.getLatLngAdmin(opts, cb);
					}
				},
				error: function () {
					$$.gettingLatLng = false;
					$$.getLatLngAdmin(opts, cb);
				}
			});
		}
	}
	return this;
}
ALGIS.prototype.setZoom = function (z) {

}
ALGIS.prototype.getLayer = function (o, c) {

}
function ranLocation(loc) {
	var new_loc = Object.assign({}, loc);
	var rand = parseFloat((Math.random() * 0.005).toFixed(6));
	if (loc.lat.toString().slice(-1) % 2 == 0) {
		rand = rand - 0.0002;
	} else {
		rand = rand + 0.0002;
	}
	var rand1 = parseFloat((Math.random() * 0.005).toFixed(6));
	if (loc.lng.toString().slice(-1) % 2 == 0) {
		rand1 = rand1 + 0.0002;
	} else {
		rand1 = rand1 - 0.0002;
	}
	new_loc.lat = parseFloat((Number(loc.lat) + rand).toFixed(6));
	new_loc.lng = parseFloat((Number(loc.lng) + rand1).toFixed(6));
	return new_loc;
}
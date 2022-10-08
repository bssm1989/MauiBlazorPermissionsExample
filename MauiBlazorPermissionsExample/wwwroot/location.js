
(function () {
	var map = LoadMap();
	var PinBuilder = new Cesium.PinBuilder();
	var collection = { database: 'pbwatchn_ClimateSA', table: 'locations' };
	if (USER.level && USER.level == 'user' && USER.province) {
		collection = { database: 'pbwatchn_ClimateSA', table: 'locations', where: "province='" + USER.province + "'" };
		$('#locations_menu').html('หมุดสถานที่ (' + USER.province + ')');
	}
	var entities = map.viewer.entities;

	var locations = {
		title: 'หมุดสถานที่',
		module: 'locations',
		GIS: {
			addMarkers: function (d) {
				var t = 2000;
				var $$ = this;
				var icon = 'icons/symbol_blank.png';
				map.addLegend({ id: 'my_locations', title: 'หมุดสถานที่ของคุณ', checked: true, icon: 'icons/symbol_star.png' });
				if (USER.level && USER.level == 'user' && USER.province) {
					map.addLegend({ id: 'locations', title: 'หมุดสถานที่อื่นๆ (' + USER.province + ')', checked: true, icon: icon });
				} else {
					map.addLegend({ id: 'locations', title: 'หมุดสถานที่อื่นๆ', checked: false, icon: icon });
				}
				$.each(locations.Snapshot.data, function (i, x) {
					t = t + 5;
					setTimeout(function () {
						$$.addMarker(x);
					}, t);
				});
				$.each(_types, function (x) {
					map.addLegend({ id: 'locations_' + x, title: this.value, checked: false, icon: this.icon, parent: 'locations' });
				});
			},
			getLatLng: function (p, c) {
				var $$ = this;
				map.getLatLngAdmin(p, function (r) {
					p.lat = r.latLng.lat;
					p.lng = r.latLng.lng;
					c(p);
				});
			},
			createIcon: function (d) {
				var icon = 'icons/symbol_inter.png';
				if (d.createBy == USER.id) {
					icon = 'icons/symbol_star.png';
				}
				$.each(_types, function () {
					if (this.value == d.type && this.icon) {
						icon = this.icon;
					}
				});
				return icon;
			},
			addMarker: function (o) {
				var $$ = this;
				if (!o.lat || !o.lng) {
					$$.getLatLng(o, function (p) {
						$$.addMarker(p)
					});
					return false;
				}
				var id = 'location_' + o.id;
				map.removeEntityById(id);
				var name = o.name;
				name = textProcess(name);
				var ent;
				var extentDescription = '';
				if (o.createBy && TABLES.users && TABLES.users.Snapshot) {
					$.each(TABLES.users.Snapshot.data, function () {
						if (o.createBy == this.id) {
							extentDescription = extentDescription + '<div style="font-size:0.8em;">โดย : ' + profileRender(this, this.id, this.email) + '</div>';
						}
					});
				}
				if (o.images) {
					extentDescription = extentDescription + '<div style="display:inline-block;">';
					$.each(o.images, function () {
						extentDescription = extentDescription + '<img style="cursor:pointer;margin:2px;" src="' + this.thumb + '" onclick="viewImage(\'' + this.path + '\')">';
					});
					extentDescription = extentDescription + '</div>';
				}
				if (!o.type || o.type == 'อื่นๆ') {
					var upd = false;
					if (o.name) {
						if (o.name.startsWith('โรงพยาบาล')) {
							o.type = 'โรงพยาบาล';
						}
						if (o.name.startsWith('รพ.')) {
							o.type = 'โรงพยาบาล';
						}
						if (o.name.startsWith('โรงพยาบาลส่งเสริม')) {
							o.type = 'รพ.สต.';
						}
						if (o.name.startsWith('รพสต')) {
							o.name = o.name.replace('รพสต', 'รพ.สต.')
							o.type = 'รพ.สต.';
						}
						if (o.name.startsWith('รพ.สต.')) {
							o.type = 'รพ.สต.';
						}
						if (o.name.startsWith('สถานีตำรวจ')) {
							o.type = 'สถานีตำรวจ';
						}
						if (o.name.startsWith('โรงเรียน')) {
							o.type = 'โรงเรียน';
						}
						if (o.name.startsWith('ร.ร.')) {
							o.type = 'โรงเรียน';
						}
						if (o.name.startsWith('โรงแรม')) {
							o.type = 'โรงแรม';
						}
						if (o.name.startsWith('ศาลเจ้า')) {
							o.type = 'ศาลเจ้า';
						}
						if (o.name.startsWith('มัสยิด')) {
							o.type = 'มัสยิด';
						}
						if (o.name.startsWith('วัด')) {
							o.type = 'วัด';
						}
						if (o.name.startsWith('ที่ทำการผู้ใหญ่บ้าน')) {
							o.type = 'ที่ทำการผู้ใหญ่บ้าน';
						}
						if (o.name.startsWith('ที่ทำการกำนัน')) {
							o.type = 'ที่ทำการกำนัน';
						}
						if (o.name.startsWith('สำนักงานเทศบาล')) {
							o.type = 'สำนักงานเทศบาล';
						}
						if (o.name.startsWith('เทศบาล')) {
							o.type = 'สำนักงานเทศบาล';
						}
						if (o.name.startsWith('อบต')) {
							o.type = 'ที่ทำการ อบต.';
						}
						if (o.name.startsWith('องค์การบริหารส่วนตำบล')) {
							o.type = 'ที่ทำการ อบต.';
						}
					}
					if (o.type2) {
						if (o.type2 == 'ธนาคาร') {
							o.type = 'ธนาคาร';
							upd = true;
						}
						if (o.type2 == 'วิสาหกิจชุมชน') {
							o.type = 'วิสาหกิจชุมชน';
							upd = true;
						}
						if (o.type2 == 'ปศุสัตว์') {
							o.type = 'ปศุสัตว์';
							upd = true;
						}
						if (o.type2 == 'ปศุสัตว์') {
							o.type = 'ปศุสัตว์';
							upd = true;
						}
					}
					if (o.type && o.type != 'อื่นๆ' && upd) {
						var dd = { id: o.id, type: o.type }
						DB.db(collection).update(dd);
					}
				}
				var icon = $$.createIcon(o);
				if (o.createBy == USER.id || USER.level == 'admin') {
					extentDescription = extentDescription + '<div style="padding: 5px;">' +
						'<span id="marker_undo" class="zmdi zmdi-undo" style="font-size:24px;cursor:pointer;float: right;padding:16px;display:none;" aria-hidden="true" title="เลิกย้ายพิกัด"></span>' +
						'<span id="marker_save" class="zmdi zmdi-floppy" style="font-size:24px;cursor:pointer;float: right;padding:16px;display:none;" aria-hidden="true" title="บันทึกพิกัดใหม่"></span>' +
						'<span id="marker_edit" class="zmdi zmdi-edit" style="font-size:24px;cursor:pointer;float: right;padding:16px;" aria-hidden="true" title="แก้ไขข้อมูล"></span><span id="marker_move" class="zmdi zmdi-arrows" style="font-size:24px;cursor:pointer;float: right;padding:16px;" aria-hidden="true" title="ย้ายจุดพิกัด"></span>' +
						'<span id="marker_delete" class="zmdi zmdi-delete" style="font-size:24px;cursor:pointer;float: right;padding:16px;" aria-hidden="true" title="ลบจุดพิกัด"></span></div>';
				}
				var show = false;
				var layer = 'locations';
				$.each(_types, function (x) {
					if (o.type == this.value) {
						layer = 'locations_' + x;
					}
				});
				if ($('#locations').prop('checked')) {
					show = true;
				}
				if (o.createBy == USER.id) {
					show = true;
					layer = 'my_locations';
				}
				if (!map.Layers[layer]) {
					map.Layers[layer] = entities.add(new Cesium.Entity());
					map.Layers[layer].show = show;
				}
				var p = {
					id: id,
					parent: map.Layers[layer],
					name: name,
					search: name,
					description: {
						getValue: function () {
							var s = '';
							$.each(locations.Snapshot.data, function () {
								if (parseInt(this.id) == parseInt(o.id)) {
									s = s + '<div>ชื่อ : ' + this.name + '</div>';
									if (this.type) {
										if (this.type2 && this.type == 'อื่นๆ') {
											s = s + '<div>ประเภท : ' + this.type + '/' + this.type2 + '</div>';
										} else {
											s = s + '<div>ประเภท : ' + this.type + '</div>';
										}
									}
									s = s + '<div>ที่อยู่ : ' + addressRender(this) + '</div>' + '<div>' + this.description + '</div>';
									if (this.create_time > 0) {
										s = s + '<div>ปักหมุด : ' + new Date(this.create_time * 1000).toLocaleString('th-TH') + '</div>';
									}
									if (this.last_edit > 0) {
										s = s + '<div>แก้ไข : ' + new Date(this.last_edit * 1000).toLocaleString('th-TH') + '</div>';
									}
								}
							});
							return s;
						}
					},
					extentDescription: extentDescription,
					position: map.setPosition(o),
					originalPosition: map.setPosition(o),
					billboard: {
						image: icon,
						verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
						scaleByDistance: new Cesium.NearFarScalar(2000, 1, 2000000, 0)
					},
					dynamicLabel: {
						name: name,
						position: map.setPosition(o),
						text: '',
						scale: 0.6,
						style: Cesium.LabelStyle.FILL_AND_OUTLINE,
						horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
						outlineWidth: 2,
						verticalOrigin: Cesium.VerticalOrigin.TOP
					},
					move: function () {
						map.pinMoving(ent, function (x) {
							$('#marker_save').show();
							$('#marker_undo').show();
						});
					},
					save: function () {
						var d = { id: ent.id.replace('location_', ''), lat: ent.lat, lng: ent.lng }
						DB.db(collection).update(d, function (out) {
							$('#marker_save').hide();
							$('#marker_undo').hide();
							setTimeout(function () {
								map.viewer.selectedEntity = undefined;
								ent.draggable = false;
							}, 1000);
						});
					},
					edit: function () {
						var editor = locations.dataTables.editor();
						var id = ent.id.replace('location_', '');
						locations.dataTables.search(id).draw();
						editor.editRow(id, ent);
					},
					delete: function () {
						var editor = locations.dataTables.editor();
						var id = ent.id.replace('location_', '');
						locations.dataTables.search(id).draw();
						editor.removeRow(id, ent.name, function () {
							map.viewer.selectedEntity = undefined;
						});
					}
				}
				ent = entities.add(p);
				$('.cesium-geocoder-input').keyup(function () {
					var val = $('.cesium-geocoder-input').val();
					var suggestions = map.viewer.geocoder.viewModel.suggestions;
					if (!val) {
						suggestions = [];
					} else {
						setTimeout(function () {
							if (!map.viewer.geocoder.viewModel.isSearchInProgress && val && val.length > 3 && name.includes(val)) {
								var is = false;
								$.each(suggestions, function () {
									if (this.id && this.id == p.id) {
										is = true;
									}
								});
								if (!is) {
									suggestions.push({ displayName: name, destination: ent.position.getValue(), id: p.id });
								}
							}
						}, 1000);
					}
				});
			},
			editMarker: function (d) {
				var $$ = this;
				//map.removeEntityById('location_'+d.id);
				setTimeout(function () {
					$$.addMarker(d);
				}, 20);
			},
			layerChange: function (d, t) {
				var $$ = this;
				if (t == 'update') {
					$$.editMarker(d);
				}
				if (t == 'removed') {
					map.removeEntityById('location_' + d.id);
					map.removeEntityById('location_' + d.id + 'label');
				}
				if (t == 'create') {
					$$.addMarker(d);
				}
			}
		},
		Table: {
			title: "หมุดสถานที่",
			module: 'locations',
			db: collection,
			columns: [{ data: null }, { data: null }, { data: null }, { data: null }, { data: null }, { data: 'id', title: 'ID', visible: false }],
			columnDefs: [
				{ targets: 0, title: 'ชื่อสถานที่', width: '120px', render: function (d) { return d.name } },
				{ targets: 1, title: 'ประเภท', width: '80px', render: function (d) { if (d.type == 'อื่นๆ' && d.type2) { return d.type + '/' + d.type2 } else { return d.type } } },
				{ targets: 2, title: 'ที่อยู่', width: '140px', render: function (d) { return addressRender(d) } },
				{
					targets: 3, title: 'รายละเอียด', width: '300px',
					render: function (d) {
						var r = d.description;
						if (TABLES.users && TABLES.users.Snapshot && TABLES.users.Snapshot.data) {
							$.each(TABLES.users.Snapshot.data, function () {
								if (this.id == d.createBy) {
									r = r + '<br>โดย: ' + profileRender(this, this.id, this.email);
									return r;
								}
							});
						}
						return r;
					}
				},
				{
					targets: 4, title: 'รูป', width: '100px',
					render: function (d) {
						var r = '';
						if (d.images) {
							$.each(d.images, function () {
								if (this.thumb && this.path) {
									r = r + '<img style="margin:2px;cursor:pointer;" src="' + this.thumb + '" onclick="viewImage(\'' + this.path + '\')" width="80px"/>';
								}
							});
						}
						return r;
					}
				}
			],
			fields: [
				{ type: 'hidden', name: 'id' }, { type: 'hidden', name: 'createBy', def: USER.id }, { type: 'hidden', name: 'lat' }, { type: 'hidden', name: 'lng' },
				{ label: 'ชื่อสถานที่', name: 'name', attr: { required: true } },
				{
					label: 'ประเภท', name: 'type', type: 'select', ipOpts: _types, placeholder: 'เลือกประเภท', attr: { required: true },
					dependent: function (Editor, val) {
						if (val && val == 'อื่นๆ') {
							Editor.field('type2').show();
						} else {
							Editor.field('type2').val('');
							Editor.field('type2').hide();
						}
					}
				},
				{ label: 'ระบุประเภท', name: 'type2' }, provinceField(true), districtField(true), subDistrictField(true), { label: 'รายละเอียด', name: 'description', type: 'textarea' },
				{
					label: 'รูปกิจกรรม/สถานที่', name: "images", type: "uploadMany", uploadText: 'เลือกรูป', clearText: 'ลบรูป', noFileText: 'ยังไม่มีรูป', dragDrop: true, dragDropText: 'หรือลากรูปมาวางในกรอบนี้',
					display: function (d) {
						return '<img style="cursor:pointer;" src="' + d.thumb + '" onclick="viewImage(\'' + d.path + '\')" width="80px"/>';
					},
					noImageText: '-',
					upLoadFile: function (editor, conf, files, p, c) {
						conf.folder = 'photos';
						editor.upLoadFile(editor, conf, files, p, c);
					},
					multiple: true, folder: 'photos', attr: { accept: "image/*" }
				}
			],
			fnTable: function (t) { if (!USER.level || USER.level != 'admin') { t.hideEditorButton() } },
			canEdit: function (d) {
				if (USER.id == d.createBy || (USER.level && USER.level == 'admin')) { return true } else { return false }
			}
		}
	}
	map.saveMarker = function (p) {
		var editor = locations.dataTables.editor();
		editor.buttons([{ label: 'บันทึก', fn: function () { this.submit() } }, { label: 'ยกเลิก', fn: function () { this.close() } }]);
		editor.on('close', function (e) { setTimeout(function () { p.remove() }, 100) });
		editor.create('เพิ่มสถานที่');
		setTimeout(function () {
			editor.field('name').val(p.title);
			editor.field('description').val(p.detail);
			editor.field('lat').val(p.lat);
			editor.field('lng').val(p.lng);
			if (p.administrative && p.administrative.province) {
				editor.field('province').val(p.administrative.province);
				if (p.administrative.district) {
					setTimeout(function () {
						editor.field('district').val(p.administrative.district);
						if (p.administrative.sub_district) {
							setTimeout(function () {
								editor.field('sub_district').val(p.administrative.sub_district);
							}, 500);
						}
					}, 500);
				}
			}
		}, 100);
	}
	locations.types = _types;
	return locations;
});
(function(){
	LoadMap(function(map){
		
		function editKml(kml){
			if(kml.id){
				var database = DB.db({database:'livingon_thaipov_p2',table:'kml_files2',where:'id='+kml.id});
				database.get(function(d){
					if(d.data && d.data[0]){
						var data = d.data[0];
						var div = '<div class="modal" id="kml_editor_modal"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">×</button></div><div class="modal-body" id="kml_editor"></div></div></div></div>';
						$(div).modal();
						var checked = '';
						if(data.publish>0){
							checked=' checked';
						}
						var form = '<form id="edit_kml">'+
							'<div class="form-group">'+
								'<label for="url">URL</label>'+
								'<input type="text" readonly disabled class="form-control" id="url" value="'+data.url+'">'+
							'</div>'+
							'<div class="form-group">'+
								'<label for="title">ชื่อชั้นข้อมูล</label>'+
								'<input type="text" class="form-control" id="title" placeholder="ชื่อชั้นข้อมูล" value="'+data.title+'">'+
							'</div>'+
							'<div class="form-group">'+
								'<label for="maxZoom">ระยะแสดงผล (เมตร)</label>'+
								'<input type="number" class="form-control" id="maxZoom" placeholder="1000" value="'+data.maxZoom+'">'+
							'</div>'+
							'<div class="form-group">'+
								'<input type="checkbox" class="form-check-input" id="publish"'+checked+'>'+
								'<label class="form-check-label" for="publish" style="margin-left: 6px;">เผยแพร่</label>'+
							'</div>'+
							'<button type="submit" id="kml_editor_submit" class="btn btn-primary">ตกลง</button>'+
							'</form>';
						setTimeout(function(){
							$('#kml_editor').html(form);
							setTimeout(function(){
								$('#edit_kml').submit(function(){
									$('#edit_kml #kml_editor_submit').prop('disabled',true);
									var publish = $('#edit_kml #publish').prop('checked')?1:0;
									var maxZoom = $('#edit_kml #maxZoom').val()?$('#edit_kml #maxZoom').val():0;
									var title = $('#edit_kml #title').val()?$('#edit_kml #title').val():'';
									var dd = {id:data.id,publish:publish,title:title,maxZoom:maxZoom}
									database.update(dd,function(){
										setTimeout(function(){
											$('#kml_editor_modal').modal('hide');
										},200);
									});
									return false;
								});
							},300);
						},300);
					}
				});
			}
		}
		function preAddKml(d,check){
			if(!d.url){
				return false;
			}
			if(!d.publish && USER.level!='admin'){
				return false;
			}
			var layer = 'kml_'+d.id;
			if(!map.kmlData){
				map.kmlData = {};
			}
			if(map.kmlData[layer]){
				updateKml(d);
				return false;
			}
			var title=d.title?d.title:'ชั้นข้อมูล '+d.id;
			var checked = check?check:false;
			map.addLegend({id:layer,title:title,checked:checked,container:map.kmlLegendContainer});
			d.layer = layer;
			map.kmlData[layer] = d;
			setTimeout(function(){
				if(checked){
					addKml(d);
				}
				$('#'+layer).change(function(){
					if($('#'+layer).prop('checked')){
						addKml(d);
					}
				});
				if(USER.level == 'admin'){
					if(!$('#'+layer+'_edit')[0]){
						$('#'+layer+'_wrapper .layer-select').append('<i class="zmdi zmdi-settings" id="'+layer+'_edit" style="margin: 8px;cursor:pointer;right: 14px;position: absolute;"></i><i class="zmdi zmdi-delete" id="'+layer+'_remove" style="margin: 8px;cursor:pointer;right: 40px;position: absolute;"></i>');
					}
					setTimeout(function(){
						$('#'+layer+'_edit').off().on('click',function(){
							editKml(d);
						});
						$('#'+layer+'_remove').off().on('click',function(){
							removeKml(d);
						});
					},500);
				}
			},200);
		}
		function addKml(d){
			var layer = 'kml_'+d.id;
			var kml = map.viewer.dataSources.getByName(layer);
			if(kml && kml.length>0){
				return false;
			}
			d.layer = layer;
			map.kmlData[layer] = d;
			var src = Cesium.KmlDataSource.load(d.url,{camera: map.viewer.scene.camera,canvas: map.viewer.scene.canvas});
			var kml =map.viewer.dataSources.add(src);
			var maxZoom = '';
			if(d.maxZoom>0){
				maxZoom = d.maxZoom;
			}
			map.kmlData[layer].maxZoom = maxZoom;
			kml.then(function(data){
				data.dynamic = true;
				data.layer = layer;
				data.name = layer;
				data.url = d.url;
				data.data_id = d.id;
				$.each(data.entities.values,function(){
					this.layer = layer;
					this.maxZoom = maxZoom;
				});
				data.maxZoom = maxZoom;
				map.viewer.flyTo(data);
			});
		}
		function removeKml(d){
			var title=d.title?d.title:'ชั้นข้อมูล '+d.id;
			var div = '<div class="modal" id="kml_remove"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">×</button></div><div class="modal-body" style="text-align: center;"><div>ลบข้อมูล '+title+'?</div><button id="kml_remove_submit" class="btn btn-warning" style="margin:6px;">ยืนยัน</button><button class="btn btn-primary" style="margin:6px;" data-dismiss="modal">ยกเลิก</button></div></div></div></div>';
			$(div).modal();
			setTimeout(function(){
				$('#kml_remove_submit').off().on('click',function(){
					$('#kml_remove_submit').prop('disabled',true);
					DB.db({database:'livingon_thaipov_p2',table:'kml_files2'}).delete(d.id,function(){
						setTimeout(function(){
							$('#kml_remove').modal('hide');
							
							removeLayer(d.id);
						},500);
					});
				});
			},300);
		}
		function updateKml(d){
			var layer = 'kml_'+d.id;
			d.layer = layer;
			map.kmlData[layer] = d;
			var maxZoom = '';
			if(d.maxZoom>0){
				maxZoom = d.maxZoom;
			}
			map.kmlData[layer].maxZoom = maxZoom;
			var title = d.title?d.title:'ชั้นข้อมูล '+d.id;
			var kml = map.viewer.dataSources.getByName(layer);
			$('#'+layer+'_wrapper .layer-select label').html(title);
			$.each(kml,function(){
				$.each(this.entities.values,function(){
						this.maxZoom = maxZoom;
				});
				this.maxZoom = maxZoom;
			});
		}
		function removeLayer(id){
			var layer = 'kml_'+id;
			delete map.kmlData[layer];
			$('#'+layer+'_wrapper').remove();
			var kml = map.viewer.dataSources.getByName(layer);
			if(kml){
				$.each(kml,function(){
					this.entities.removeAll();
				});
				map.viewer.dataSources.remove(kml);
			}
		}
		if(map.options.kmlLayer){
			var db = {database:'livingon_thaipov_p2',table:'kml_files2',where:'publish=1'}
			if(USER.level=='admin'){
				db = {database:'livingon_thaipov_p2',table:'kml_files2'}
			}
			map.kmlDB = {}
			DB.db(db).Snapshot(function(s){
				if(!map.kmlDB.data){
					map.kmlDB.data = s.data;
					$.each(map.kmlDB.data,function(){
						preAddKml(this);
					});
				} else {
					map.kmlDB.newData = s;
					$.each(map.kmlDB.newData,function(){
						if(this.change_type=='removed'){
							removeLayer(this.change_id);
						} else {
							if(this.change_type=='update' && this.data.publish!=1 && USER.level!='admin'){
								removeLayer(this.change_id);
							} else {
								preAddKml(this.data);
							}
						}
					});
				}
			});
		}		
		if(USER.level=='admin' && map.options.kmlLayer){
			map.kmlUploadButton();
			map.kmlUpload = function(file){
				var data = new FormData();
				data.append('file',file);
				data.append('path','uploads/kml');
				$.ajax({
					type:'POST',
					url:'https://www.livingonnewpace.com/gis2v3/upload.php',
					contentType: false,
					processData: false,
					data:data,
					success:function(r){
						r = JSON.parse(r);
						if(r.url){
							var data = {url:r.url,createBy:USER.id,publish:0,maxZoom:0,title:''}
							DB.db({database:'livingon_thaipov_p2',table:'kml_files2'}).add(data,function(re){
								preAddKml(re.data,true);
							});
						}
					}
				});
			}
		}
	});
})();
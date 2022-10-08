(function(){
	LoadMap(function(map){
//phase1	var provinces_list = [18,32,33,35,37,46,47,49,58,94];
//phase2
		//var provinces_list = [18,32,33,35,37,46,47,49,58,94,30, 31, 34, 42, 45, 52, 65, 93, 95, 96];
		//var provinces_list = [18,30,31,32,33,34,35,37,42,45,46,47,49,52,58,65,93,94,95,96];
		//function loadAdminData(Layer,bound,offset){
		//	//console.log(Layer.name);
		//	if(!$('#'+Layer.name).prop('checked')){
		//		map.removeLayer(Layer.name);
		//		return false;
		//	}
		//	var scale = 1;
		//	if(Layer.Label && Layer.Label.fontSize){
		//		scale = Layer.Label.fontSize/11;
		//	}
		//	if(Layer.scale && Layer.Label.scale){
		//		scale = Layer.Label.scale;
		//	}
		//	var outlineColor = Layer.outlineColor?Layer.outlineColor:'';
		//	var backgroundColor = Layer.backgroundColor?Cesium.Color.fromCssColorString(Layer.backgroundColor):Cesium.Color.fromCssColorString('#641706');
		//	if(!outlineColor){
		//		if(map.getToneColor() == 'dark'){
		//			outlineColor = Cesium.Color.RED;
		//		} else {
		//			outlineColor = Cesium.Color.RED;
		//		}
		//	}
			
		//	var height = Layer.height?Layer.height:10;
		//	//console.log(height);
		//	 $.ajax({
		//		 type: 'POST',
		//		 async: true, 
		//		url:Layer.url,
		//		crossDomain: true,
		//		data:$.param(queryOptions(bound,offset)),
		//		success: function(res){
		//			//console.log("view5D");
		//			map.removeLayer(Layer.name);
		//			map.showLayer(Layer.name);
		//			var data = JSON.parse(res);
		//			$.each(data.features,function(){
		//				//console.log("exthension2");
		//				var max = 3.0e5*scale*1.2;
		//				var fillColor = Cesium.Color.WHITE;
		//				var attr = this.attributes;
		//				var feature = this;
		//				var label = Layer.Label.expression?eval(Layer.Label.expression):'';
		//				var Info = Layer.Info?eval(Layer.Info):'';
		//				var description = Layer.description?eval(Layer.description):'';
		//				var x;
		//				var y;
		//				require(["esri/geometry/Polygon"], function(esriPolygon){
		//					var p = new esriPolygon(feature.geometry.rings);
		//					y = parseFloat(p.centroid.latitude.toFixed(4));
		//					x = parseFloat(p.centroid.longitude.toFixed(4));
		//				});
		//				var extentDescription = '<style>a:hover {text-decoration: none;}</style>';
		//				if(provinces_list.includes(parseInt(attr.PROV_CODE))){
		//					max = 5.0e5*scale*1.2;
		//					fillColor = Cesium.Color.YELLOW;
							
							
		//					if(attr.TAM_CODE){
		//						extentDescription=extentDescription+'<a class="zmdi zmdi-link" style="color:#ffffff;margin-top: 4px;font-size:24px;cursor:pointer;float: right;padding:16px;" aria-hidden="true" title="รายงานศักยภาพ 5 มิติ"  href="../survey_p2/?curr=report_jun14_5&jun='+attr.PROV_CODE+'&amp='+attr.PROV_CODE+attr.AMP_CODE+'&tmp='+attr.PROV_CODE+attr.AMP_CODE+attr.TAM_CODE+'"></a>';

		//					}else if(attr.AMP_CODE){
		//						extentDescription=extentDescription+'<a class="zmdi zmdi-link" style="color:#ffffff;margin-top: 4px;font-size:24px;cursor:pointer;float: right;padding:16px;" aria-hidden="true" title="รายงานศักยภาพ 5 มิติ"  href="../survey_p2/?curr=report_jun13_5&jun='+attr.PROV_CODE+'&amp='+attr.PROV_CODE+attr.AMP_CODE+'"></a>';
							
								
		//					}else{
		//					outlineColor=Cesium.Color.WHITE
		//					outlineColor=Cesium.Color.WHITEORANGE;
		//						extentDescription=extentDescription+'<a class="zmdi zmdi-link" style="color:#ffffff;margin-top: 4px;font-size:24px;cursor:pointer;float: right;padding:16px;" aria-hidden="true" title="รายงานศักยภาพ 5 มิติ"  href="../survey_p2/?curr=report_jun12_5&jun='+attr.PROV_CODE+'"></a>';
		//					}
							
							
											
		//					extentDescription=extentDescription+'<div style="padding: 5px;">';
							
							
							
							
		//					extentDescription=extentDescription+'<span id="marker_view" class="zmdi zmdi-chart" style="font-size:24px;cursor:pointer;float: right;padding:16px;" aria-hidden="true" title="รายงานศักยภาพ 5 มิติ"></span>';
		//					extentDescription=extentDescription+'</div>';
		//				}
		//				var outlineWidth=4;
		//				if(attr.TAM_CODE){
		//				outlineWidth=4;
		//					outlineColor=Cesium.Color.ORANGE;
							
		//					}else if(attr.AMP_CODE){
		//					outlineWidth=10;
		//					outlineColor=Cesium.Color.YELLOW;
								
		//					}else{
		//					outlineWidth=15;
		//					outlineColor=Cesium.Color.WHITE;
		//				}
							
		//				$.each(this.geometry.rings,function(i){
		//					var degrees = [];
		//					var ring = this;
		//					$.each(ring,function(){
		//						degrees.push(this[0]);
		//						degrees.push(this[1]);
		//					});
		//					var ent = {
		//						name:Info,
		//						parent:map.Layers[Layer.name],
		//						polygon : {
		//							hierarchy:Cesium.Cartesian3.fromDegreesArray(degrees),
		//							outlineColor:outlineColor,
		//							outlineWidth:outlineWidth,
		//							fill:false,
		//							outline:true,
		//							shadows:Cesium.ShadowMode.ENABLED
		//						},
		//						description:description,
		//						extentDescription:extentDescription,
								
		//					}
		//					map.viewer.entities.add(ent);
		//				});
		//				var point = {
		//					name:Info,
		//					parent:map.Layers[Layer.name],
		//					description:description,
		//					position:Cesium.Cartesian3.fromDegrees(x,y,height),
		//					height:height,
		//					heightReference:Cesium.HeightReference.RELATIVE_TO_GROUND,
		//					label:{
		//						text:label,
		//						scaleByDistance:new Cesium.NearFarScalar(1.0e2,scale,max,0.0),
		//						backgroundColor:backgroundColor,
		//						showBackground:true,
		//						fillColor:fillColor
		//					},
		//					extentDescription:extentDescription,
		//					view:function(){
		//						view5D(attr);
		//					}
		//				}
		//				map.viewer.entities.add(point);
		//			});
		//		}
		//	});
		//}
		function getOffset(bound){
			var b = bound?bound:map.getBound();
			return parseFloat(((b.E-b.W)/map.viewer.container.clientWidth).toFixed(6));
		}
		function queryOptions(rings,offset,type){
			var rel = type?type:'esriSpatialRelEnvelopeIntersects';
			return {
				geometry:JSON.stringify({rings:rings}),
				geometryType:"esriGeometryPolygon",
				inSR:4326,
				outSR:4326,
				spatialRel:rel,
				outFields:"*",
				returnGeometry:true,
				maxAllowableOffset:offset,
				geometryPrecision:5,
				f:"pjson",
				token:''
			}
		}
		function view5D(attr){
			var title = '';
			var src = '';
			if(attr.PROV_CODE){
				src = '../survey_p2/?curr=report_jun12_5&jun='+attr.PROV_CODE;
				title = attr.PROV_NAMT; //attr.prov_namt
			}
			if(attr.AMP_CODE){
				src = '../survey_p2/?curr=report_jun13_5&jun='+attr.PROV_CODE+'&amp='+attr.PROV_CODE+attr.AMP_CODE;
				title = attr.AMP_NAMT+' '+title; //attr.amp_namt
			}
			if(attr.TAM_CODE){
				src = '../survey_p2/?curr=report_jun14_5&jun='+attr.PROV_CODE+'&amp='+attr.PROV_CODE+attr.AMP_CODE+'&tmp='+attr.PROV_CODE+attr.AMP_CODE+attr.TAM_CODE;
				title = attr.TAM_NAMT+' '+title; //attr.tam_namt
			}
			if($('#data_view')[0]){
				return false;
			}
			var div = '<div class="modal"><div class="modal-dialog modal-lg" style="height: 98%;width:98%;max-width:800px;margin:4px;"><div class="modal-content" style="height: 100%;"><div class="modal-header" style="padding: 4px;"><button type="button" class="close" data-dismiss="modal">×</button></div><div class="modal-body" id="data_view" style="padding:4px;height: 96%;"></div></div></div></div>';
			setTimeout(function(){
				$(div).modal();
				_view();
			},100);
			function _view(){
				if(!$('#data_view')[0]){
					setTimeout(_view,50);
					return false;
				}
				$('#data_view').html('<iframe id="dataiframe" class="responsive-iframe" style="display: none;width:100%;height: 100%;border: none;" src="'+src+'"></iframe>');
				_hide();
			}
			function _hide(){
				if(!$('#dataiframe').contents().find('.navbar')[0] || !$('#dataiframe').contents().find('footer')[0]){
					setTimeout(_hide,20);
					return false;
				}
				$('#dataiframe').contents().find('body').css('font-size','0.9em');
				$($('#dataiframe').contents().find('.row')[2]).hide();
				$($('#dataiframe').contents().find('.row')[1]).css('font-size','1.1em').css('margin-left',0).css('font-weight',800).html(title);
				$($('#dataiframe').contents().find('.row')[0]).hide();
				$('#dataiframe').contents().find('.navbar').hide();
				$('#dataiframe').contents().find('form').hide();
				$('#dataiframe').contents().find('footer').html('').css('height','40px');
				$('#dataiframe').show();
			}
		}
		//var admin_server = 'https://gistdaportal.gistda.or.th/arcgis/rest/services/app/admin_poly/MapServer';
		//var admin_serverT = 'https://dhds.nha.co.th/arcgis/rest/services/NHA_PRO/NHAWL_RENDERER_ADMIN/MapServer/0/query';
		//var admin_serverA = 'https://dhds.nha.co.th/arcgis/rest/services/NHA_PRO/NHAWL_RENDERER_ADMIN/MapServer/1/query';
		//var admin_serverJ = 'https://dhds.nha.co.th/arcgis/rest/services/NHA_PRO/NHAWL_RENDERER_ADMIN/MapServer/2/query';

		//var administratives = [
		//	{
		//		name: 'Provinces',
		//		// url:admin_serverJ,
		//		url: admin_server + '/2/query',
		//		outlineWidth: 4,
		//		Label: { expression: "attr.PROV_CODE==10?attr.PROV_NAMT:'จ.'+attr.PROV_NAMT", fontSize: 20, fillColor: Cesium.Color.BLUE },
		//		Info: "attr.PROV_CODE==10?attr.PROV_NAMT:'จ.'+attr.PROV_NAMT",
		//		description: "attr.PROV_CODE==10?attr.PROV_NAMT:'จ.'+attr.PROV_NAMT+'<br>'+attr.PROV_NAME",
		//		minOffset: 0.15,
		//		title: 'ขอบเขตจังหวัด',
		//		check: true
		//	},
		//	{
		//		name: 'Districts',
		//		url: admin_server + '/1/query',
		//		// url:admin_serverA,
		//		outlineWidth: 2,
		//		Label: { expression: "attr.PROV_CODE==10?'เขต'+attr.AMP_NAMT:'อ.'+attr.AMP_NAMT", fontSize: 16, fillColor: Cesium.Color.BLUE },
		//		Info: "attr.PROV_CODE==10?'เขต'+attr.AMP_NAMT+' '+attr.PROV_NAMT:'อ.'+attr.AMP_NAMT+' จ.'+attr.PROV_NAMT",
		//		description: "attr.PROV_CODE==10?'เขต'+attr.AMP_NAMT+' '+attr.PROV_NAMT+'<br>'+attr.AMP_NAME+', '+attr.PROV_NAME:'อ.'+attr.AMP_NAMT+' จ.'+attr.PROV_NAMT+'<br>'+attr.AMP_NAME+', '+attr.PROV_NAME",
		//		minOffset: 0.003,
		//		title: 'ขอบเขตอำเภอ',
		//		check: true

		//	},
		//	{
		//		name: 'SubDistricts',
		//		url: admin_server + '/0/query',
		//		// url:admin_serverT,
		//		outlineWidth: 1,
		//		Label: { expression: "attr.PROV_CODE==10?'แขวง'+attr.TAM_NAMT:'ต.'+attr.TAM_NAMT", fontSize: 10, fillColor: Cesium.Color.BLUE },
		//		Info: "attr.PROV_CODE==10?'แขวง'+attr.TAM_NAMT+' เขต'+attr.AMP_NAMT+' '+attr.PROV_NAMT:'ต.'+attr.TAM_NAMT+' อ.'+attr.AMP_NAMT+' จ.'+attr.PROV_NAMT",
		//		description: "attr.PROV_CODE==10?'แขวง'+attr.TAM_NAMT+' เขต'+attr.AMP_NAMT+' '+attr.PROV_NAMT+'<br>'+attr.TAM_NAME+', '+attr.AMP_NAME+', '+attr.PROV_NAME:'ต.'+attr.TAM_NAMT+' อ.'+attr.AMP_NAMT+' จ.'+attr.PROV_NAMT+'<br>'+attr.TAM_NAME+', '+attr.AMP_NAME+', '+attr.PROV_NAME",
		//		minOffset: 0.0007,
		//		title: 'ขอบเขตตำบล',
		//		check: true
		//	}
		//];	
		//$.each(administratives,function(){
		//	var L = this;
		//	console.log("check administratives");
		//	map.addLegend({id:L.name,title:L.title,checked:L.check});
		//	if(!map.Layers[L.name]){
		//		//map.Layers[L.name] = map.viewer.entities.add(new Cesium.Entity());
		//		//map.Layers[L.name].show = true;
		//	}
		//	setTimeout(function(){
				
		//		//console.log(L.name);
		//		$('#'+L.name).change(function(){
		//			if($(this).prop('checked')){
		//				 map.showLayer(L.name);
		//			} else {
		//				map.removeLayer(this.name);
		//			}
		//		});
		//	},1000);		
		//});
		//map.viewer.camera.moveEnd.addEventListener(function(){
		//	var b = map.getBound();
		//	console.log(b);
		//	if(b && b.W>=78 && b.N<=33.75 && b.E<=135 && b.S>=-22.5){
		//		var ring = [[[b.W,b.N],[b.E,b.N],[b.E,b.S],[b.W,b.S]]];
		//		var offset = getOffset(b);
		//		console.log(offset);
		//		$.each(administratives,function(){
		//			if(offset<this.minOffset){
		//				loadAdminData(this,ring,offset);
		//			} else {
		//				map.removeLayer(this.name);
		//			}
		//		});
		//	} else {
		//		$.each(administratives,function(){
		//			map.removeLayer(this.name);
		//		});
		//	}
		//});
	});
})();
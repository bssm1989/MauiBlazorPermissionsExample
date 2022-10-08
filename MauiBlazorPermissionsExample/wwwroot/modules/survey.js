(function(){
	var lastid;
	var countNum=0;
	var map =	LoadMap();
	var multiJunChoice=false;
	var collection = {table:'survey_profile'};
	var lastSearch="";
	var temp;
	// var viewer = new Cesium.Viewer('cesiumContainer');
	// var points = viewer.scene.primitives.add(new Cesium.PointPrimitiveCollection());
	// var entities = map.viewer.entities;
	var entities = map.viewer.scene.primitives.add(new Cesium.PointPrimitiveCollection());
	// var billboards = map.viewer.scene.primitives.add(new Cesium.BillboardCollection());
	// var billboards = map.viewer.scene.primitives.add(new Cesium.var extentDescription = '';
	var extentDescription = '';
	
	
	var canvas = document.createElement('canvas');
    canvas.width = 10;
    canvas.height = 10;
    var context2D = canvas.getContext('2d');
    context2D.beginPath();
    context2D.arc(5, 5, 5, 0, Cesium.Math.TWO_PI, true);
    context2D.closePath();
    context2D.fillStyle = 'rgb(255, 0, 0)';
    context2D.fill();
	
	
	entities.show=false;
	
	// var staff;
	// DB.db({table:'survey_staff'}).get(function(r){
	// staff = r.data;
	// });
	var dataTambon=[];
	var dataGroup=[];
	var dataGroup2=[];
	var dataByUserProvince=[];
	var indexDataByUserProvince=0;
	var countFun=0;
	var keepIndex;
	
	var survey_profile = {
		title:'สำรวจครัวเรือน',
		module:'survey_profile',
		GIS:{
			addMarkers:function(data){
				//console.log(data);
				//download(data, 'json.txt', 'text/plain');
				dataGroup.push(data);
				var t=2000;
				var $$ = this;
				map.addLegend({id:'survey_profile_type_year',title:'ปีสำรวจ',checked:true,icon:'icons/home-blue.png',type:'dropdown',parent:'survey_profile'});
				map.addLegend({id:'survey_profile',title:'สำรวจครัวเรือน',checked:true,icon:'icons/home-1.png'});
				map.addLegend({id:'survey_profile_a',title:'ครัวเรือนทั้งหมด',checked:false,icon:'icons/pointHome.png',parent:'survey_profile'});
				if(USER.Province && USER.Province.province_id){
					var _title = 'ครัวเรือนจังหวัดของคุณ';
					if(USER.Province.province_name_thai){
						_title = 'ครัวเรือนจังหวัด'+USER.Province.province_name_thai;
					}
					map.addLegend({id:'survey_profile_p',title:_title,checked:false,icon:'icons/pointMyJun.png',parent:'survey_profile'});
					//	map.addLegend({id:'survey_profile_p',title:_title,checked:false,icon:'icons/home-white.png',parent:'survey_profile'});
				}
				
		
				
				
				map.addLegend({id:'survey_profile_b',title:'ครัวเรือนที่คุณสำรวจ',checked:true,icon:'icons/home-blue.png',parent:'survey_profile'});
				map.addLegend({id:'survey_profile_c',title:'*ต้องแก้ไขข้อมูล',checked:true,icon:'icons/home-yellow.png',parent:'survey_profile'});
				map.addLegend({id:'survey_profile_37_jun',title:'อำนาจเจริญ',checked:false,icon:'icons/pointHome.png',parent:'survey_profile'});
				map.addLegend({id:'survey_profile_18_jun',title:'ชัยนาท',checked:false,icon:'icons/pointHome.png',parent:'survey_profile'});
				map.addLegend({id:'survey_profile_30_jun',title:'นครราชสีมา',checked:false,icon:'icons/pointHome.png',parent:'survey_profile'});
				map.addLegend({id:'survey_profile_31_jun',title:'บุรีรัมย์',checked:false,icon:'icons/pointHome.png',parent:'survey_profile'});
				map.addLegend({id:'survey_profile_32_jun',title:'สุรินทร์',checked:false,icon:'icons/pointHome.png',parent:'survey_profile'});
				map.addLegend({id:'survey_profile_33_jun',title:'ศรีสะเกษ',checked:false,icon:'icons/pointHome.png',parent:'survey_profile'});
				map.addLegend({id:'survey_profile_34_jun',title:'อุบลราชธานี',checked:false,icon:'icons/pointHome.png',parent:'survey_profile'});
				map.addLegend({id:'survey_profile_35_jun',title:'ยโสธร',checked:false,icon:'icons/pointHome.png',parent:'survey_profile'});
				map.addLegend({id:'survey_profile_42_jun',title:'เลย',checked:false,icon:'icons/pointHome.png',parent:'survey_profile'});
				map.addLegend({id:'survey_profile_45_jun',title:'ร้อยเอ็ด',checked:false,icon:'icons/pointHome.png',parent:'survey_profile'});
				map.addLegend({id:'survey_profile_46_jun',title:'กาฬสินธุ์',checked:false,icon:'icons/pointHome.png',parent:'survey_profile'});
				map.addLegend({id:'survey_profile_47_jun',title:'สกลนคร',checked:false,icon:'icons/pointHome.png',parent:'survey_profile'});
				map.addLegend({id:'survey_profile_49_jun',title:'มุกดาหาร',checked:false,icon:'icons/pointHome.png',parent:'survey_profile'});
				map.addLegend({id:'survey_profile_52_jun',title:'ลำปาง',checked:false,icon:'icons/pointHome.png',parent:'survey_profile'});
				map.addLegend({id:'survey_profile_58_jun',title:'แม่ฮ่องสอน',checked:false,icon:'icons/pointHome.png',parent:'survey_profile'});
				map.addLegend({id:'survey_profile_65_jun',title:'พิษณุโลก',checked:false,icon:'icons/pointHome.png',parent:'survey_profile'});
				map.addLegend({id:'survey_profile_93_jun',title:'พัทลุง',checked:false,icon:'icons/pointHome.png',parent:'survey_profile'});
				map.addLegend({id:'survey_profile_94_jun',title:'ปัตตานี',checked:false,icon:'icons/pointHome.png',parent:'survey_profile'});
				map.addLegend({id:'survey_profile_95_jun',title:'ยะลา',checked:false,icon:'icons/pointHome.png',parent:'survey_profile'});
				map.addLegend({id:'survey_profile_96_jun',title:'นราธิวาส',checked:false,icon:'icons/pointHome.png',parent:'survey_profile'});
				map.addLegend({id:'level',title:'เชิงคุณภาพ',checked:false,icon:'icons/home-1.png'});
				// map.addLegend({id:'fileJson',title:'fileJson',checked:false,icon:'icons/home-1.png'});
				map.addLegend({id:'level1',title:'ทุนมนุษย์',checked:true,icon:'icons/pointLevel.png',type:'radio',parent:'level'});
				map.addLegend({id:'level2',title:'ทุนกายภาพ',checked:false,icon:'icons/pointLevel.png',type:'radio',parent:'level'});
				map.addLegend({id:'level3',title:'ทุนการเงิน',checked:false,icon:'icons/pointLevel.png',type:'radio',parent:'level'});
				map.addLegend({id:'level4',title:'ทุนธรรมชาติ',checked:false,icon:'icons/pointLevel.png',type:'radio',parent:'level'});
				map.addLegend({id:'level5',title:'ทุนทางสังคม',checked:false ,icon:'icons/pointLevel.png',type:'radio',parent:'level'});
				map.addLegend({id:'level6',title:'ทุนเฉลี่ย',checked:false ,icon:'icons/pointLevel.png',type:'radio',parent:'level'});
				
				/****************************/
				
				
				
				
                
				map.addLegend({id:'level_1',title:'ตอนที่ 1 ทุนมนุษย์',checked:false,icon:'icons/home-1.png'});
			
				map.addLegend({id:'level1_1',title:'รายงานผู้ป่วยติดเตียง/ผู้พิการที่ไม่ได้รับสวัสดิการ',parent:'level_1',checked:false});
				map.addLegend({id:'level1_22',title:'การศึกษาสูงสุด',checked:false,parentSecond:true});
				map.addLegend({id:'level1_2',title:'การศึกษาสูงสุด (ไม่ได้เรียน)',type:'radio',checked:false,parent:'level1_22'});
				map.addLegend({id:'level1_3',title:'การศึกษาสูงสุด (ประถมศึกษา)',type:'radio',checked:false,parent:'level1_22'});
				map.addLegend({id:'level1_4',title:'การศึกษาสูงสุด (ต่ำกว่าประถม)',type:'radio',checked:false,parent:'level1_22'});
				map.addLegend({id:'level1_5',title:'กำลังศึกษาระดับ (ไม่ได้เรียน)',checked:false,parent:'level_1'});
				map.addLegend({id:'level1_6',title:'สถานภาพการศึกษา (ออกกลางคัน)',checked:false,parent:'level_1'});
                map.addLegend({id:'level1_77',title:'อาชีพ',checked:false,parentSecond:true});
				map.addLegend({id:'level1_7',title:'อาชีพ (ตกงานจาก COVID)',type:'radio',checked:false,parent:'level1_77'});
				map.addLegend({id:'level1_8',title:'อาชีพ (ตกงาน กลับจากต่างประเทศ)',type:'radio',checked:false,parent:'level1_77'});
				map.addLegend({id:'level1_9',title:'อาชีพ (ว่างงาน ไม่ระบุ)',type:'radio',checked:false,parent:'level1_77'});
				map.addLegend({id:'level1_10',title:'ทักษะอาชีพที่สามารถสร้างรายได้ (ไม่มีทักษะ)',checked:false,parent:'level_1'});
				
				map.addLegend({id:'level_2',title:'ตอนที่ 2 ทุนกายภาพ',checked:false,icon:'icons/home-1.png'});
			
				map.addLegend({id:'level2_1', title:'บ้านเป็นของตนเอง (อาศัยอยู่กับผู้อื่น)',checked:false,parent:'level_2'});
				map.addLegend({id:'level2_2', title:'สภาพของบ้านที่อาศัย (สภาพทรุดโทรม หรือวัสดุก่อสร้างบ้านไม่ถาวร)',checked:false,parent:'level_2'});
				map.addLegend({id:'level2_3', title:'ความเป็นระเบียบเรียบร้อย และถูกสุขลักษณะของบ้านพักอาศัย (ไม่มีการจัดเก็บสิ่งของเป็นระเบียบรกรุงรัง)',checked:false,parent:'level_2'});
                map.addLegend({id:'level2_44',title:'ครัวเรือนของท่านมีไฟฟ้าใช้หรือไม่',checked:false,parentSecond:true});
                map.addLegend({id:'level2_4', title:'(ไม่มี (เช่น เทียน ตะเกียง))',type:'radio',checked:false,parent:'level2_44'});
				map.addLegend({id:'level2_5', title:'(ต่อพ่วงไฟฟ้าจากคนอื่น (ไม่มีมิเตอร์ไฟฟ้าของตนเอง))',type:'radio',checked:false,parent:'level2_44'});
                map.addLegend({id:'level2_66',title:'ครัวเรือนของท่านมีอุปกรณ์สารสนเทศหรือไม่(โทรศัพท์บ้าน โทรศัพท์มือถือ)',checked:false,parentSecond:true});
                map.addLegend({id:'level2_6', title:' (ไม่ได้เลือก)',type:'radio',checked:false,parent:'level2_66'});
				map.addLegend({id:'level2_7', title:'(ไม่มี)',type:'radio',checked:false,parent:'level2_66'});
                map.addLegend({id:'level2_88',title:'พื้นที่ทำกินทางการเกษตร',checked:false,parentSecond:true});
                map.addLegend({id:'level2_8', title:'(ไม่มีที่ทำกินทางการเกษตร)',type:'radio',checked:false,parent:'level2_88'});
				map.addLegend({id:'level2_9', title:'(อาศัยพื้นที่ของบุคคลอื่นทำ โดยไม่มีค่าเช่า)',type:'radio',checked:false,parent:'level2_88'});
                map.addLegend({id:'level2_1010',title:'ปัญหาเกี่ยวกับพื้นที่ทำกิน',checked:false,parentSecond:true});
                map.addLegend({id:'level2_10',title:'(น้ำเข้าไม่ถึงแปลง หรือมีน้ำไม่เพียงพอตลอดทั้งปี)',type:'radio',checked:false,parent:'level2_1010'});
				map.addLegend({id:'level2_11',title:'(ดินไม่อุดมสมบูรณ์ ทำให้ผลผลิตไม่ดี)',type:'radio',checked:false,parent:'level2_1010'});
				map.addLegend({id:'level2_12',title:'(ไม่มีเอกสารสิทธิ์ในที่ดิน)',type:'radio',checked:false,parent:'level2_1010'});
				map.addLegend({id:'level2_13',title:'(ที่ดินติดจำนอง)',type:'radio',checked:false,parent:'level2_1010'});
				map.addLegend({id:'level2_14',title:'(อยู่ในพื้นที่เสี่ยงภัย)',type:'radio',checked:false,parent:'level2_1010'});
				map.addLegend({id:'level2_15',title:'(เข้าถึงยาก)',type:'radio',checked:false,parent:'level2_1010'});
				map.addLegend({id:'level2_16',title:'(อื่น ๆ)',type:'radio',checked:false,parent:'level2_1010'});
                map.addLegend({id:'level2_1717',title:'ถนน/เส้นทางสาธารณะและการเดินทางเข้าที่อยู่อาศัย',checked:false,parentSecond:true});
                map.addLegend({id:'level2_17',title:'(ไม่มีถนนเข้าถึงที่อยู่อาศัย)',type:'radio',checked:false,parent:'level2_1717'});
				map.addLegend({id:'level2_18',title:'(ไม่มีถนนเข้าถึงที่ทำกิน)',type:'radio',checked:false,parent:'level2_1717'});
				
                map.addLegend({id:'level2_19',title:'ครัวเรือนของท่านรับรู้ข้อมูลข่าวสารของหน่วยงานราชการ (ไม่ได้รับข่าวสาร)',checked:false,parent:'level_2'});
				map.addLegend({id:'level2_20',title:'รับรู้/ใช้ประโยชน์ข้อมูลข่าวสารที่เกี่ยวข้องกับการดำรงชีพและสร้างรายได้ ของหน่วยงานราชการจากแหล่งใด (ไม่ได้รับข่าวสาร)',checked:false,parent:'level_2'});
				map.addLegend({id:'level2_21',title:'ใช้เทคโนโลยีดิจิทัลในการขอรับสวัสดิการจากภาครัฐหรือไม่ (ไม่ใช้)',checked:false,parent:'level_2'});
				
				map.addLegend({id:'level_3',title:'ตอนที่ 3 ทุนการเงิน',checked:false,icon:'icons/home-1.png'});
			







				map.addLegend({id:'level3_1', title:'ครัวเรือนของท่านมีการออมหรือไม่ (ไม่มี)',checked:false,parent:'level_3'});
				map.addLegend({id:'level3_2', title:'ครัวเรือนของท่านมีหนี้สินหรือไม่ (มี)',checked:false,parent:'level_3'});
				map.addLegend({id:'level3_3', title:'ครัวเรือนของท่านมีทรัพย์สินเพื่อการประกอบอาชีพหรือไม่ (ไม่มี)',checked:false,parent:'level_3'});
				
				map.addLegend({id:'level_4',title:'ตอนที่ 4 ทุนธรรมชาติ',checked:false,icon:'icons/home-1.png'});
				map.addLegend({id:'level4_1', title:'ครัวเรือนของท่านมีบ้านพักอาศัยอยู่ในพื้นที่ภัยพิบัติหรือไม่ (อยู่)',checked:false,parent:'level_4'});
				map.addLegend({id:'level4_2', title:'ครัวเรือนของท่านมีที่ทำกิน อยู่ในพื้นที่ภัยพิบัติทางธรรมชาติหรือไม่ (อยู่)',checked:false,parent:'level_4'});
		
				
				map.addLegend({id:'level_5',title:'ตอนที่ 5 ทุนทางสังคม',checked:false,icon:'icons/home-1.png'});
				map.addLegend({id:'level5_1', title:'ครัวเรือนของท่านเข้าร่วมกลุ่มกิจกรรมของชุมชนใดบ้าง (ไม่เข้าร่วมกลุ่มกิจกรรม)',checked:false,parent:'level_5'});
				map.addLegend({id:'level5_2', title:'ครัวเรือนของท่านเข้าร่วมกิจกรรมของชุมชนอะไรบ้าง (ไม่เข้าร่วมกิจกรรม)',checked:false,parent:'level_5'});
				map.addLegend({id:'level5_3', title:'การช่วยเหลือกันเมื่อคนในชุมชน (ไม่มี)',checked:false,parent:'level_5'});
				map.addLegend({id:'level5_4', title:'การกำหนดกฎระเบียบ หรือกติกาในการอยู่ร่วมกันของชุมชน (ไม่มี)',checked:false,parent:'level_5'});
				map.addLegend({id:'level5_5', title:'การจัดการปัญหาความขัดแย้งของชุมชน (ไม่สามารถไกล่เกลี่ย)',checked:false,parent:'level_5'});
				map.addLegend({id:'level5_6', title:'ชุมชนของท่านมีผู้ที่มีความรู้ในการแก้ไขปัญหา และพัฒนาชุมชนด้านใดบ้าง (ไม่มี)',checked:false,parent:'level_5'});
				map.addLegend({id:'level5_7', title:'ครัวเรือนของท่านเคยได้ใช้ความรู้จากผู้ที่มีความรู้ ตามข้อ 7 ในการแก้ไขปัญหาหรือไม่ (ไม่เคย)',checked:false,parent:'level_5'});
				









map.addLegend({id:'level_1',title:'ตอนที่ 1 ทุนมนุษย์',checked:false,icon:'icons/home-1.png'});
			
				map.addLegend({id:'level1_1',title:'รายงานผู้ป่วยติดเตียง/ผู้พิการที่ไม่ได้รับสวัสดิการ',parent:'level_1',checked:false});
				map.addLegend({id:'level1_22',title:'การศึกษาสูงสุด',checked:false,parentSecond:true});
				map.addLegend({id:'level1_2',title:'การศึกษาสูงสุด (ไม่ได้เรียน)',type:'radio',checked:false,parent:'level1_22'});
				map.addLegend({id:'level1_3',title:'การศึกษาสูงสุด (ประถมศึกษา)',type:'radio',checked:false,parent:'level1_22'});
				map.addLegend({id:'level1_4',title:'การศึกษาสูงสุด (ต่ำกว่าประถม)',type:'radio',checked:false,parent:'level1_22'});
				map.addLegend({id:'level1_5',title:'กำลังศึกษาระดับ (ไม่ได้เรียน)',checked:false,parent:'level_1'});
				map.addLegend({id:'level1_6',title:'สถานภาพการศึกษา (ออกกลางคัน)',checked:false,parent:'level_1'});
                map.addLegend({id:'level1_77',title:'อาชีพ',checked:false,parentSecond:true});
				map.addLegend({id:'level1_7',title:'อาชีพ (ตกงานจาก COVID)',type:'radio',checked:false,parent:'level1_77'});
				map.addLegend({id:'level1_8',title:'อาชีพ (ตกงาน กลับจากต่างประเทศ)',type:'radio',checked:false,parent:'level1_77'});
				map.addLegend({id:'level1_9',title:'อาชีพ (ว่างงาน ไม่ระบุ)',type:'radio',checked:false,parent:'level1_77'});
				map.addLegend({id:'level1_10',title:'ทักษะอาชีพที่สามารถสร้างรายได้ (ไม่มีทักษะ)',checked:false,parent:'level_1'});
				
				map.addLegend({id:'level_2',title:'ตอนที่ 2 ทุนกายภาพ',checked:false,icon:'icons/home-1.png'});
			
				map.addLegend({id:'level2_1', title:'บ้านเป็นของตนเอง (อาศัยอยู่กับผู้อื่น)',checked:false,parent:'level_2'});
				map.addLegend({id:'level2_2', title:'สภาพของบ้านที่อาศัย (สภาพทรุดโทรม หรือวัสดุก่อสร้างบ้านไม่ถาวร)',checked:false,parent:'level_2'});
				map.addLegend({id:'level2_3', title:'ความเป็นระเบียบเรียบร้อย และถูกสุขลักษณะของบ้านพักอาศัย (ไม่มีการจัดเก็บสิ่งของเป็นระเบียบรกรุงรัง)',checked:false,parent:'level_2'});
                map.addLegend({id:'level2_44',title:'ครัวเรือนของท่านมีไฟฟ้าใช้หรือไม่',checked:false,parentSecond:true});
                map.addLegend({id:'level2_4', title:'(ไม่มี (เช่น เทียน ตะเกียง))',type:'radio',checked:false,parent:'level2_44'});
				map.addLegend({id:'level2_5', title:'(ต่อพ่วงไฟฟ้าจากคนอื่น (ไม่มีมิเตอร์ไฟฟ้าของตนเอง))',type:'radio',checked:false,parent:'level2_44'});
                map.addLegend({id:'level2_66',title:'ครัวเรือนของท่านมีอุปกรณ์สารสนเทศหรือไม่(โทรศัพท์บ้าน โทรศัพท์มือถือ)',checked:false,parentSecond:true});
                map.addLegend({id:'level2_6', title:' (ไม่ได้เลือก)',type:'radio',checked:false,parent:'level2_66'});
				map.addLegend({id:'level2_7', title:'(ไม่มี)',type:'radio',checked:false,parent:'level2_66'});
                map.addLegend({id:'level2_88',title:'พื้นที่ทำกินทางการเกษตร',checked:false,parentSecond:true});
                map.addLegend({id:'level2_8', title:'(ไม่มีที่ทำกินทางการเกษตร)',type:'radio',checked:false,parent:'level2_88'});
				map.addLegend({id:'level2_9', title:'(อาศัยพื้นที่ของบุคคลอื่นทำ โดยไม่มีค่าเช่า)',type:'radio',checked:false,parent:'level2_88'});
                map.addLegend({id:'level2_1010',title:'ปัญหาเกี่ยวกับพื้นที่ทำกิน',checked:false,parentSecond:true});
                map.addLegend({id:'level2_10',title:'(น้ำเข้าไม่ถึงแปลง หรือมีน้ำไม่เพียงพอตลอดทั้งปี)',type:'radio',checked:false,parent:'level2_1010'});
				map.addLegend({id:'level2_11',title:'(ดินไม่อุดมสมบูรณ์ ทำให้ผลผลิตไม่ดี)',type:'radio',checked:false,parent:'level2_1010'});
				map.addLegend({id:'level2_12',title:'(ไม่มีเอกสารสิทธิ์ในที่ดิน)',type:'radio',checked:false,parent:'level2_1010'});
				map.addLegend({id:'level2_13',title:'(ที่ดินติดจำนอง)',type:'radio',checked:false,parent:'level2_1010'});
				map.addLegend({id:'level2_14',title:'(อยู่ในพื้นที่เสี่ยงภัย)',type:'radio',checked:false,parent:'level2_1010'});
				map.addLegend({id:'level2_15',title:'(เข้าถึงยาก)',type:'radio',checked:false,parent:'level2_1010'});
				map.addLegend({id:'level2_16',title:'(อื่น ๆ)',type:'radio',checked:false,parent:'level2_1010'});
                map.addLegend({id:'level2_1717',title:'ถนน/เส้นทางสาธารณะและการเดินทางเข้าที่อยู่อาศัย',checked:false,parentSecond:true});
                map.addLegend({id:'level2_17',title:'(ไม่มีถนนเข้าถึงที่อยู่อาศัย)',type:'radio',checked:false,parent:'level2_1717'});
				map.addLegend({id:'level2_18',title:'(ไม่มีถนนเข้าถึงที่ทำกิน)',type:'radio',checked:false,parent:'level2_1717'});
				
                map.addLegend({id:'level2_19',title:'ครัวเรือนของท่านรับรู้ข้อมูลข่าวสารของหน่วยงานราชการ (ไม่ได้รับข่าวสาร)',checked:false,parent:'level_2'});
				map.addLegend({id:'level2_20',title:'รับรู้/ใช้ประโยชน์ข้อมูลข่าวสารที่เกี่ยวข้องกับการดำรงชีพและสร้างรายได้ ของหน่วยงานราชการจากแหล่งใด (ไม่ได้รับข่าวสาร)',checked:false,parent:'level_2'});
				map.addLegend({id:'level2_21',title:'ใช้เทคโนโลยีดิจิทัลในการขอรับสวัสดิการจากภาครัฐหรือไม่ (ไม่ใช้)',checked:false,parent:'level_2'});
				
				map.addLegend({id:'level_3',title:'ตอนที่ 3 ทุนการเงิน',checked:false,icon:'icons/home-1.png'});
			







				map.addLegend({id:'level3_1', title:'ครัวเรือนของท่านมีการออมหรือไม่ (ไม่มี)',checked:false,parent:'level_3'});
				map.addLegend({id:'level3_2', title:'ครัวเรือนของท่านมีหนี้สินหรือไม่ (มี)',checked:false,parent:'level_3'});
				map.addLegend({id:'level3_3', title:'ครัวเรือนของท่านมีทรัพย์สินเพื่อการประกอบอาชีพหรือไม่ (ไม่มี)',checked:false,parent:'level_3'});
				
				map.addLegend({id:'level_4',title:'ตอนที่ 4 ทุนธรรมชาติ',checked:false,icon:'icons/home-1.png'});
				map.addLegend({id:'level4_1', title:'ครัวเรือนของท่านมีบ้านพักอาศัยอยู่ในพื้นที่ภัยพิบัติหรือไม่ (อยู่)',checked:false,parent:'level_4'});
				map.addLegend({id:'level4_2', title:'ครัวเรือนของท่านมีที่ทำกิน อยู่ในพื้นที่ภัยพิบัติทางธรรมชาติหรือไม่ (อยู่)',checked:false,parent:'level_4'});
		
				
				map.addLegend({id:'level_5',title:'ตอนที่ 5 ทุนทางสังคม',checked:false,icon:'icons/home-1.png'});
				map.addLegend({id:'level5_1', title:'ครัวเรือนของท่านเข้าร่วมกลุ่มกิจกรรมของชุมชนใดบ้าง (ไม่เข้าร่วมกลุ่มกิจกรรม)',checked:false,parent:'level_5'});
				map.addLegend({id:'level5_2', title:'ครัวเรือนของท่านเข้าร่วมกิจกรรมของชุมชนอะไรบ้าง (ไม่เข้าร่วมกิจกรรม)',checked:false,parent:'level_5'});
				map.addLegend({id:'level5_3', title:'การช่วยเหลือกันเมื่อคนในชุมชน (ไม่มี)',checked:false,parent:'level_5'});
				map.addLegend({id:'level5_4', title:'การกำหนดกฎระเบียบ หรือกติกาในการอยู่ร่วมกันของชุมชน (ไม่มี)',checked:false,parent:'level_5'});
				map.addLegend({id:'level5_5', title:'การจัดการปัญหาความขัดแย้งของชุมชน (ไม่สามารถไกล่เกลี่ย)',checked:false,parent:'level_5'});
				map.addLegend({id:'level5_6', title:'ชุมชนของท่านมีผู้ที่มีความรู้ในการแก้ไขปัญหา และพัฒนาชุมชนด้านใดบ้าง (ไม่มี)',checked:false,parent:'level_5'});
				map.addLegend({id:'level5_7', title:'ครัวเรือนของท่านเคยได้ใช้ความรู้จากผู้ที่มีความรู้ ตามข้อ 7 ในการแก้ไขปัญหาหรือไม่ (ไม่เคย)',checked:false,parent:'level_5'});
				

				
				
				
/**/
				map.addLegend({id:'level_1',title:'ตอนที่ 1 ทุนมนุษย์',checked:false,icon:'icons/home-1.png'});
			
				map.addLegend({id:'level1_1',title:'รายงานผู้ป่วยติดเตียง/ผู้พิการที่ไม่ได้รับสวัสดิการ',checked:true,icon:'icons/pointLevel.png',type:'radio',parent:'level_1'});
				map.addLegend({id:'level1_2',title:'การศึกษาสูงสุด (ไม่ได้เรียน)',checked:false,icon:'icons/pointLevel.png',type:'radio',parent:'level_1'});
				map.addLegend({id:'level1_3',title:'การศึกษาสูงสุด (ประถมศึกษา)',checked:false,icon:'icons/pointLevel.png',type:'radio',parent:'level_1'});
				map.addLegend({id:'level1_4',title:'การศึกษาสูงสุด (ต่ำกว่าประถม)',checked:false,icon:'icons/pointLevel.png',type:'radio',parent:'level_1'});
				map.addLegend({id:'level1_5',title:'กำลังศึกษาระดับ (ไม่ได้เรียน)',checked:false,icon:'icons/pointLevel.png',type:'radio',parent:'level_1'});
				map.addLegend({id:'level1_6',title:'สถานภาพการศึกษา (ออกกลางคัน)',checked:false,icon:'icons/pointLevel.png',type:'radio',parent:'level_1'});
				map.addLegend({id:'level1_7',title:'อาชีพ (ตกงานจาก COVID)',checked:false,icon:'icons/pointLevel.png',type:'radio',parent:'level_1'});
				map.addLegend({id:'level1_8',title:'อาชีพ (ตกงาน กลับจากต่างประเทศ)',checked:false,icon:'icons/pointLevel.png',type:'radio',parent:'level_1'});
				map.addLegend({id:'level1_9',title:'อาชีพ (ว่างงาน ไม่ระบุ)',checked:false,icon:'icons/pointLevel.png',type:'radio',parent:'level_1'});
				map.addLegend({id:'level1_10',title:'ทักษะอาชีพที่สามารถสร้างรายได้ (ไม่มีทักษะ)',checked:false,icon:'icons/pointLevel.png',type:'radio',parent:'level_1'});
				
				map.addLegend({id:'level_2',title:'ตอนที่ 2 ทุนกายภาพ',checked:false,icon:'icons/home-1.png'});
			
				map.addLegend({id:'level2_1', title:'บ้านเป็นของตนเอง (อาศัยอยู่กับผู้อื่น)',checked:true,icon:'icons/pointLevel.png',type:'radio',parent:'level_2'});
				map.addLegend({id:'level2_2', title:'สภาพของบ้านที่อาศัย (สภาพทรุดโทรม หรือวัสดุก่อสร้างบ้านไม่ถาวร)',checked:true,icon:'icons/pointLevel.png',type:'radio',parent:'level_2'});
				map.addLegend({id:'level2_3', title:'ความเป็นระเบียบเรียบร้อย และถูกสุขลักษณะของบ้านพักอาศัย (ไม่มีการจัดเก็บสิ่งของเป็นระเบียบรกรุงรัง)',checked:true,icon:'icons/pointLevel.png',type:'radio',parent:'level_2'});
				map.addLegend({id:'level2_4', title:'ครัวเรือนของท่านมีไฟฟ้าใช้หรือไม่ (ไม่มี (เช่น เทียน ตะเกียง))',checked:true,icon:'icons/pointLevel.png',type:'radio',parent:'level_2'});
				map.addLegend({id:'level2_5', title:'ครัวเรือนของท่านมีไฟฟ้าใช้หรือไม่ (ต่อพ่วงไฟฟ้าจากคนอื่น (ไม่มีมิเตอร์ไฟฟ้าของตนเอง))',checked:true,icon:'icons/pointLevel.png',type:'radio',parent:'level_2'});
				map.addLegend({id:'level2_6', title:'ครัวเรือนของท่านมีอุปกรณ์สารสนเทศหรือไม่ (โทรศัพท์บ้าน โทรศัพท์มือถือ) (ไม่ได้เลือก)',checked:true,icon:'icons/pointLevel.png',type:'radio',parent:'level_2'});
				map.addLegend({id:'level2_7', title:'ครัวเรือนของท่านมีอุปกรณ์สารสนเทศหรือไม่ (โทรศัพท์บ้าน โทรศัพท์มือถือ) (ไม่มี)',checked:true,icon:'icons/pointLevel.png',type:'radio',parent:'level_2'});
				map.addLegend({id:'level2_8', title:'พื้นที่ทำกินทางการเกษตร (ไม่มีที่ทำกินทางการเกษตร)',checked:true,icon:'icons/pointLevel.png',type:'radio',parent:'level_2'});
				map.addLegend({id:'level2_9', title:'พื้นที่ทำกินทางการเกษตร (อาศัยพื้นที่ของบุคคลอื่นทำ โดยไม่มีค่าเช่า)',checked:true,icon:'icons/pointLevel.png',type:'radio',parent:'level_2'});
				map.addLegend({id:'level2_10',title:'ปัญหาเกี่ยวกับพื้นที่ทำกิน (น้ำเข้าไม่ถึงแปลง หรือมีน้ำไม่เพียงพอตลอดทั้งปี)',checked:true,icon:'icons/pointLevel.png',type:'radio',parent:'level_2'});
				map.addLegend({id:'level2_11',title:'ปัญหาเกี่ยวกับพื้นที่ทำกิน (ดินไม่อุดมสมบูรณ์ ทำให้ผลผลิตไม่ดี)',checked:true,icon:'icons/pointLevel.png',type:'radio',parent:'level_2'});
				map.addLegend({id:'level2_12',title:'ปัญหาเกี่ยวกับพื้นที่ทำกิน (ไม่มีเอกสารสิทธิ์ในที่ดิน)',checked:true,icon:'icons/pointLevel.png',type:'radio',parent:'level_2'});
				map.addLegend({id:'level2_13',title:'ปัญหาเกี่ยวกับพื้นที่ทำกิน (ที่ดินติดจำนอง)',checked:true,icon:'icons/pointLevel.png',type:'radio',parent:'level_2'});
				map.addLegend({id:'level2_14',title:'ปัญหาเกี่ยวกับพื้นที่ทำกิน (อยู่ในพื้นที่เสี่ยงภัย)',checked:true,icon:'icons/pointLevel.png',type:'radio',parent:'level_2'});
				map.addLegend({id:'level2_15',title:'ปัญหาเกี่ยวกับพื้นที่ทำกิน (เข้าถึงยาก)',checked:true,icon:'icons/pointLevel.png',type:'radio',parent:'level_2'});
				map.addLegend({id:'level2_16',title:'ปัญหาเกี่ยวกับพื้นที่ทำกิน (อื่น ๆ)',checked:true,icon:'icons/pointLevel.png',type:'radio',parent:'level_2'});
				map.addLegend({id:'level2_17',title:'ถนน/เส้นทางสาธารณะและการเดินทางเข้าที่อยู่อาศัย (ไม่มีถนนเข้าถึงที่อยู่อาศัย)',checked:true,icon:'icons/pointLevel.png',type:'radio',parent:'level_2'});
				map.addLegend({id:'level2_18',title:'ถนน/เส้นทางสาธารณะและการเดินทางเข้าที่ที่ทำกิน (ไม่มีถนนเข้าถึงที่ทำกิน)',checked:true,icon:'icons/pointLevel.png',type:'radio',parent:'level_2'});
				map.addLegend({id:'level2_19',title:'ครัวเรือนของท่านรับรู้ข้อมูลข่าวสารของหน่วยงานราชการ (ไม่ได้รับข่าวสาร)',checked:true,icon:'icons/pointLevel.png',type:'radio',parent:'level_2'});
				map.addLegend({id:'level2_20',title:'รับรู้/ใช้ประโยชน์ข้อมูลข่าวสารที่เกี่ยวข้องกับการดำรงชีพและสร้างรายได้ ของหน่วยงานราชการจากแหล่งใด (ไม่ได้รับข่าวสาร)',checked:true,icon:'icons/pointLevel.png',type:'radio',parent:'level_2'});
				map.addLegend({id:'level2_21',title:'ใช้เทคโนโลยีดิจิทัลในการขอรับสวัสดิการจากภาครัฐหรือไม่ (ไม่ใช้)',checked:true,icon:'icons/pointLevel.png',type:'radio',parent:'level_2'});
				
				map.addLegend({id:'level_3',title:'ตอนที่ 3 ทุนการเงิน',checked:false,icon:'icons/home-1.png'});
			







				map.addLegend({id:'level3_1', title:'ครัวเรือนของท่านมีการออมหรือไม่ (ไม่มี)',checked:true,icon:'icons/pointLevel.png',type:'radio',parent:'level_3'});
				map.addLegend({id:'level3_2', title:'ครัวเรือนของท่านมีหนี้สินหรือไม่ (มี)',checked:true,icon:'icons/pointLevel.png',type:'radio',parent:'level_3'});
				map.addLegend({id:'level3_3', title:'ครัวเรือนของท่านมีทรัพย์สินเพื่อการประกอบอาชีพหรือไม่ (ไม่มี)',checked:true,icon:'icons/pointLevel.png',type:'radio',parent:'level_3'});
				
				map.addLegend({id:'level_4',title:'ตอนที่ 4 ทุนธรรมชาติ',checked:false,icon:'icons/home-1.png'});
				map.addLegend({id:'level4_1', title:'ครัวเรือนของท่านมีบ้านพักอาศัยอยู่ในพื้นที่ภัยพิบัติหรือไม่ (อยู่)',checked:true,icon:'icons/pointLevel.png',type:'radio',parent:'level_4'});
				map.addLegend({id:'level4_2', title:'ครัวเรือนของท่านมีที่ทำกิน อยู่ในพื้นที่ภัยพิบัติทางธรรมชาติหรือไม่ (อยู่)',checked:true,icon:'icons/pointLevel.png',type:'radio',parent:'level_4'});
				
				
				map.addLegend({id:'level_5',title:'ตอนที่ 5 ทุนทางสังคม',checked:false,icon:'icons/home-1.png'});
				map.addLegend({id:'level5_1', title:'ครัวเรือนของท่านเข้าร่วมกลุ่มกิจกรรมของชุมชนใดบ้าง (ไม่เข้าร่วมกลุ่มกิจกรรม)',checked:true,icon:'icons/pointLevel.png',type:'radio',parent:'level_5'});
				map.addLegend({id:'level5_2', title:'ครัวเรือนของท่านเข้าร่วมกิจกรรมของชุมชนอะไรบ้าง (ไม่เข้าร่วมกิจกรรม)',checked:true,icon:'icons/pointLevel.png',type:'radio',parent:'level_5'});
				map.addLegend({id:'level5_3', title:'การช่วยเหลือกันเมื่อคนในชุมชน (ไม่มี)',checked:true,icon:'icons/pointLevel.png',type:'radio',parent:'level_5'});
				map.addLegend({id:'level5_4', title:'การกำหนดกฎระเบียบ หรือกติกาในการอยู่ร่วมกันของชุมชน (ไม่มี)',checked:true,icon:'icons/pointLevel.png',type:'radio',parent:'level_5'});
				map.addLegend({id:'level5_5', title:'การจัดการปัญหาความขัดแย้งของชุมชน (ไม่สามารถไกล่เกลี่ย)',checked:true,icon:'icons/pointLevel.png',type:'radio',parent:'level_5'});
				map.addLegend({id:'level5_6', title:'ชุมชนของท่านมีผู้ที่มีความรู้ในการแก้ไขปัญหา และพัฒนาชุมชนด้านใดบ้าง (ไม่มี)',checked:true,icon:'icons/pointLevel.png',type:'radio',parent:'level_5'});
				map.addLegend({id:'level5_7', title:'ครัวเรือนของท่านเคยได้ใช้ความรู้จากผู้ที่มีความรู้ ตามข้อ 7 ในการแก้ไขปัญหาหรือไม่ (ไม่เคย)',checked:true,icon:'icons/pointLevel.png',type:'radio',parent:'level_5'});
				












                // map.addLegend({id:'fileJson',title:'fileJson',checked:false,icon:'icons/home-1.png'});

                // ตอนที่ 1 ทุนมนุษย์ 2.30 | ตอนที่ 2 ทุนกายภาพ 3.10 | ตอนที่ 3 ททุนการเงิน 2.50 | ตอนที่ 4 ทุนธรรมชาติ 3.15 | ตอนที่ 5 ทุนทางสังคม 1.70 |
                var countdata = 0;
                if (data.length > 10) {
                    console.log("#############################//////////////////////////////////");
                    $.each(data, function(i) {
                        countdata++;
                        var d = this;
                        //	console.log(d);
                        // if(countdata<100){
                        /*if(i%2000 == 0){
                        	i t=t+2000;
                        }*/ //bssm

                        $$.addMarker(d);
                        // }
                        //},i+t);

                    });

                } else {

                    console.log("test.text///////////////////////////////////");
                }

                // $(($("label"))[16]).html($("label")[16]+'<input id="textJun" type="text" />');


                $(document).ready(function() {


                    var checks = document.querySelectorAll("input[type=checkbox]");

                    for (var i = 0; i < checks.length; i++) {
                        checks[i].addEventListener('change', function() {
                            if (this.checked) {
                                showChildrenChecks(this);
                            } else {
                                hideChildrenChecks(this)
                            }
                        });
                    }



                    LabelCollectionGeocoder.prototype.geocode = function(input) {


                        var url = "/gis2v3/database.php";
                        var resource = new Cesium.Resource({
                            url: url,
                            queryParameters: {
                                //    format: "json",
                                id: input,
                            },
                        });
                        //console.log(resource);
                        return resource.fetchJson().then(function(results) {
                            var bboxDegrees;
                            console.log(results);
                            if (results.data.length < 1 && $('input[type=search]').val().split(':').length == 2) {
                                if (temp) {

                                    temp.show = false;
                                    temp.outlineWidth = 0.5;
                                }
                                let hc = $('input[type=search]').val().split(':')[0];
                                $('input[type=search]').val(hc);
                                let index = dataGroup2.filter(x => x.HC == hc)[0].index;
                                // var temp=entities.get(index);
                                // temp.primitive.show=true;
                                // temp.primitive.outlineWidth=3.0;

                                // if(!entitise.get(index).show){
                                //map.viewer.scene.primitives.get(2).get( index).primitives.show=true;	
                                temp = entities.get(index);
                                temp.show = true;
                                temp.outlineWidth = 3.0;
                                temp.outlineColor = YELLOW;
                                // lastSearch=index;

                                // }
                                // entities.get(index).outlineWidth = 3.0;

                                console.log(hc);
                            }

                            return results.data.map(function(resultObject) {
                                //bboxDegrees = resultObject.boundingbox;
                                console.log(resultObject.PERSON_NAME);

                                var heightmin = 100;
                                var heightmax = 100;
                                //  if (resultObject.distanceDisplayCondition.near) {heightmin = resultObject.distanceDisplayCondition.near;}
                                // if (resultObject.distanceDisplayCondition.far){ heightmax = resultObject.distanceDisplayCondition.far;}
                                var horizdeg = Math.sqrt(0.5 * 6371000 * (heightmax + heightmin) / 2) / 111000;
                                console.log(horizdeg);
                                console.log(parseInt(resultObject.lat) + "===" + resultObject.lng);
                                var nwlat = parseFloat(resultObject.lat) + Math.PI / 180 * horizdeg / 2;
                                // if (nwlat > Math.PI/2){nwlat=(nwlat/Math.PI/2) % 1 * Math.PI/2;}
                                var nwlon = parseFloat(resultObject.lng) + Math.PI / 360 * horizdeg;
                                // if (nwlon > Math.PI){ nwlon=(nwlon/Math.PI - 1) % 1 * Math.PI;}
                                var swlat = parseFloat(resultObject.lat) - Math.PI / 180 * horizdeg / 2;
                                if (swlat < -Math.PI / 2) {
                                    swlat = (swlat / Math.PI / 2) % 1 * Math.PI / 2;
                                }
                                var swlon = parseFloat(resultObject.lng) - Math.PI / 360 * horizdeg;
                                if (swlon < -Math.PI) {
                                    swlon = (swlon / Math.PI + 1) % 1 * Math.PI;
                                }
                                var carto = [
                                    new Cesium.Cartographic(swlon, swlat, heightmin),
                                    new Cesium.Cartographic(nwlon, nwlat, heightmax)
                                ];
                                console.log(carto);
                                // var recto = Cesium.Rectangle.fromCartographicArray(carto);
                                // console.log(resultObject);
                                var textShowOnsearch = '';
                                if (resultObject.survey_year == '2563') {
                                    textShowOnsearch = resultObject.HC + ":" + resultObject.PERSON;
                                } else {

                                    textShowOnsearch = resultObject.HC + ":" + resultObject.PERSON_NAME + " " + resultObject.PERSON_SNAME;
                                }
                                return {
                                    displayName: textShowOnsearch,
                                    destination: Cesium.Rectangle.fromDegrees(swlon, swlat, nwlon, nwlat),
                                };
                            });
                        });
                    }

                    function showChildrenChecks(elm) {
                        var pN = elm.parentNode;
						var offsetTop=0;
                        var childCheks = pN.children;
						var inputLevel=["level_1","level_2","level_3","level_4","level_5"];
						for(let j=0;j<inputLevel.length;j++){
							
							if(elm.id==inputLevel[j]){
								offsetTop=$("#"+elm.id).offset().top;
								for(let jj=0;jj<inputLevel.length;jj++){
									if(elm.id!=inputLevel[jj]){
										hideChildrenChecks2($('#'+inputLevel[jj]));
									}
								}
							}
						}
                        for (var i = 0; i < childCheks.length; i++) {
                            if (hasClass(childCheks[i], 'child-check')) {
                                childCheks[i].classList.add("active");
                            }
                        }
						if(offsetTop!=$('#'+elm.id).offset().top){
							
							$(".cesium-baseLayerPicker-dropDown").animate({scrollTop: offsetTop});
							
						}

                    }

                    function hideChildrenChecks(elm) {
                        var pN = elm.parentNode;
                        var childCheks = pN.children;

                        for (var i = 0; i < childCheks.length; i++) {
                            if (hasClass(childCheks[i], 'child-check')) {
                                childCheks[i].classList.remove("active");
                            }
                        }

                    }
					 function hideChildrenChecks2(elm) {
						 console.log(elm);
                        var tempLevelInput=$($(elm).parent()).find("input");
						for(let i=1;i<tempLevelInput.length;i++){
							$(tempLevelInput[i]).parent().removeClass("active");
						}
						$(tempLevelInput[0]).prop("checked",false);
						
                    }

                    function hasClass(elem, className) {
                        return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
                    }
                    //editBssm canvas

                    var handler = new Cesium.ScreenSpaceEventHandler(map.viewer.scene.canvas);
                    handler.setInputAction(function(movement) {
                        try {
                            //console.log(movement.endPosition);
                            var pickedObject = map.viewer.scene.pick(movement.endPosition);
                            //console.log(pickedObject);
                        } catch (DeveloperError) {
                            return false;
                        }
                        if ((Cesium.defined(pickedObject)) && (pickedObject.collection == entities)) {
                            //console.log(movement.endPosition);
                            pickedObject.primitive.outlineWidth = 3.0;
                            // pickedObject.primitive.outlineColor = Cesium.Color.YELLOW;
                            //pickedObject.primitive.outlineColor = map.viewer.scene.primitives.get(l).get(lastid).outlineColor;
                            // $('#highval').text(Math.round(gvals[pickedObject.primitive._index])+' dBZ');
                            // $('#altval').text(Math.round(glls[pickedObject.primitive._index][2]/4)+' meters');


                            if (lastid) {
                                //console.log(dataGroup2[pickedObject.primitive._index-2]);
                                if (lastid != pickedObject.primitive._index) {
                                    for (var l = 0; l < map.viewer.scene.primitives.length; l++) {
                                        if (map.viewer.scene.primitives.get(l).get) {
                                            if (map.viewer.scene.primitives.get(l).get(lastid)) {
                                                map.viewer.scene.primitives.get(l).get(lastid).outlineWidth = 0.5;
                                                // if (map.viewer.scene.primitives.get(l).get(lastid).outlineColor) {
                                                // map.viewer.scene.primitives.get(l).get(lastid).outlineColor = map.viewer.scene.primitives.get(l).get(lastid).outlineColor;
                                                // }
                                            }
                                        }
                                    }
                                }
                            }
                            lastid = pickedObject.primitive._index;
                        }
                    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
                    // var viewer = new Cesium.Viewer('cesiumContainer');
                    // var viewer = new Cesium.Viewer('cesiumContainer');

                    // var ellipsoid = viewer.scene.globe.ellipsoid;
                    // viewer.screenSpaceEventHandler.setInputAction(function(e) {
                    // var cartesian = viewer.camera.pickEllipsoid(e.position, ellipsoid);
                    // if (cartesian) {
                    // var cartographic = ellipsoid.cartesianToCartographic(cartesian);
                    // var longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(2);
                    // var latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(2);

                    // console.log(longitudeString + ', ' + latitudeString);
                    // viewer.selectedEntity = new Cesium.Entity({
                    // description : longitudeString + ', ' + latitudeString
                    // });
                    // } else {
                    // viewer.selectedEntity = undefined;
                    // }
                    // }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
                    //editbssm description
                    var ellipsoid = map.viewer.scene.globe.ellipsoid;


                    handler.setInputAction(function(movement) {
                        try {

                            var pickedObject = map.viewer.scene.pick(movement.position);
                        } catch (DeveloperError) {
                            return false;
                        }
                        if ((Cesium.defined(pickedObject)) && (pickedObject.collection == entities)) {
                            // $('#highval').text(Math.round(gvals[pickedObject.primitive._index])+' dBZ');
                            // $('#altval').text(Math.round(glls[pickedObject.primitive._index][2]/4)+' meters');
                            //console.log(pickedObject.primitive);
                            keepIndex = pickedObject.primitive._id;
                            //editBssm description
                            map.viewer.selectedEntity = new Cesium.Entity({

                                id: keepIndex,
                                description: pickedObject.primitive.description,
                                extentDescription: pickedObject.primitive.extentDescription,
                                view: pickedObject.primitive.view
                            });

                            //console.log("yes");
                        }
                    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
                });
                $(".parent-check").change(function() {
                    //console.log("parent change");

                }).change();

                //editbssm checkbox
                $(".select-year").change(function() {
                    console.log("select2");
                    if ($(".select-year").val() == "year_all") {
                        indexEntityForSelectYear_start = 0;
                        indexEntityForSelectYear_end = entities.length;

                    } else if ($(".select-year").val() == "year_2563") {
                        indexEntityForSelectYear_start = 0;
                        indexEntityForSelectYear_end = 97788;

                    } else if ($(".select-year").val() == "year_2564") {
                        indexEntityForSelectYear_start = 97789;
                        indexEntityForSelectYear_end = entities.length;
                    }

                    if ($("#survey_profile_a").is(":checked")) {
						if(($("#level_5").is(":checked")||$("#level_4").is(":checked")||$("#level_3").is(":checked")||$("#level_2").is(":checked")||$("#level_1").is(":checked"))){
								for (var i = indexEntityForSelectYear_start; i <  indexEntityForSelectYear_end; i++) {
									if( entities.get(i).show )
                           entities.get(i).show  = false;

                        }
							}else
							{
                        for (let i = 0; i < entities.length; i++) {
                            entities.get(i).show = false;
                        }
                        for (var i = indexEntityForSelectYear_start; i < indexEntityForSelectYear_end; i++) {
                            entities.get(i).show = true;

                        }
							}
                    }
                    if ($("#survey_profile_p").is(":checked")) {

							
                        for (var i = 0; i < dataByUserProvince.length; i++) {
                            entities.get(dataByUserProvince[i].indexDataByUserProvince).show = true;

                        }
							

                    }

                    for (let ii = 0; ii < $("input[type=checkbox]").length; ii++) {


                        if ($("input[type=checkbox]")[ii].id.split('_')[3] == "jun") {

                            if ($("input[type=checkbox]")[ii].checked) {
                                let varJun = $("input[type=checkbox]")[ii].id.split('_')[2];
                                var dataListByJun = dataGroup2.filter(x => x.JUN == varJun);
                                for (let i = 0; i < dataListByJun.length; i++) {
                                    if (dataListByJun[i].index >= indexEntityForSelectYear_start && dataListByJun[i].index <= indexEntityForSelectYear_end) {

                                        entities.get(dataListByJun[i].index).show = true;
                                    } else {
                                        entities.get(dataListByJun[i].index).show = false;
                                    }

                                }
                            }

                        }
                    }
                });
                $("input").click(function() {
                    var indexEntityForSelectYear_start = 0;
                    var indexEntityForSelectYear_end = 0;
                    //console.log(this);
                    var toShowPoint = false;
                    if (this.checked) {
                        toShowPoint = true;
                    }

                    if (entities.length > 0) {

                        if ($(".select-year").val() == "year_all") {
                            indexEntityForSelectYear_start = 0;
                            indexEntityForSelectYear_end = entities.length;

                        } else if ($(".select-year").val() == "year_2563") {
                            indexEntityForSelectYear_start = 0;
                            indexEntityForSelectYear_end = 97788;

                        } else if ($(".select-year").val() == "year_2564") {
                            indexEntityForSelectYear_start = 97789;
                            indexEntityForSelectYear_end = entities.length;
                        }
                        if (this.id == "survey_profile_a") {

                            for (var i = indexEntityForSelectYear_start; i < indexEntityForSelectYear_end; i++) {
                                entities.get(i).show = toShowPoint;

                            }
                        } else if (this.id == "survey_profile_p") {


                            for (var i = 0; i < dataByUserProvince.length; i++) {
                                entities.get(dataByUserProvince[i].indexDataByUserProvince).show = toShowPoint;

                            }

                        } else if (this.id == 'fileJson' && $("#textJun").val()) {



                            // var dict = {"one" : [15, 4.5],
                            // "two" : [34, 3.3],
                            // "three" : [67, 5.0],
                            // "four" : [32, 4.1]};
                            // var dictstring = JSON.stringify(dataGroup2);
                            // var fs = require('fs');
                            // fs.writeFile("thing.json", dictstring, function(err, result) {
                            // if(err) console.log('error', err);
                            // });
                            var xhr = new XMLHttpRequest(),
                                // jsonArr,
                                method = "POST",
                                jsonRequestURL = "uploads/jsonFile/makeJsonFile.php";

                            // xhr.open(method, jsonRequestURL, true);
                            // xhr.onreadystatechange = function()
                            // {
                            // 	if(xhr.readyState == 4 && xhr.status == 200)
                            // 	{
                            // we convert your JSON into JavaScript object
                            //	var jsonArr = JSON.parse(xhr.responseText);

                            var jsonArr = dataGroup2;
                            var textJson = "";
                            for (var i = indexEntityForSelectYear_start; i < indexEntityForSelectYear_end; i++) {
                                if ($("#textJun").val() == dataGroup2[i].JUN) {
                                    textJson = textJson + dataGroup2[i].HC + ',';
                                    textJson = textJson + dataGroup2[i].lat + ',';
                                    textJson = textJson + dataGroup2[i].lng + ',';
                                    textJson = textJson + (dataGroup2[i].isArea ? 1 : 0) + ',';

                                    //      lv or ch
                                    textJson = textJson + parseFloat(dataGroup2[i].lv1).toFixed(2) + ',';
                                    textJson = textJson + parseFloat(dataGroup2[i].lv2).toFixed(2) + ',';
                                    textJson = textJson + parseFloat(dataGroup2[i].lv3).toFixed(2) + ',';
                                    textJson = textJson + parseFloat(dataGroup2[i].lv4).toFixed(2) + ',';
                                    textJson = textJson + parseFloat(dataGroup2[i].lv5).toFixed(2) + ',';
                                    textJson = textJson + dataGroup2[i].JUN + ',';

                                }
                            }
                            // we add new value:
                            if (textJson) {
                                console.log('jsonFile');
                                // we send with new request the updated JSON file to the server:
                                xhr.open("POST", "uploads/jsonFile/makeJsonFile.php", true);
                                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                                // if you want to handle the POST response write (in this case you do not need it):
                                // xhr.onreadystatechange = function(){  };
                                xhr.send("jsonTxt=" + textJson);
                            }
                            // but on this place you have to have a server for write updated JSON to the file
                            // 	}
                            // };
                            // xhr.send(null);

                            // var blob = new Blob(["Welcome to Websparrow.org."],
                            //          { type: "text/plain;charset=utf-8" });
                            // 									saveAs(blob, "static.txt");

                        } else {

                            if (this.id.split('_')[1] == "profile") {

                                let varJun = this.id.split('_')[2];

                                for (var i = indexEntityForSelectYear_start; i < indexEntityForSelectYear_end; i++) {
                                    //entities.get(i).color=Cesium.Color.fromBytes(0, 255, 0, 255);
                                    //id=entities.get(i).id;
                                    getVal = dataGroup2[i];
                                    if (getVal.JUN == varJun) {

                                        entities.get(i).show = toShowPoint;
                                    }
                                }
                            }


                        }
                    }
                    var keepBoolean = false;
                    for (let ii = 0; ii < $("input[type=checkbox]").length; ii++) {


                        if ($("input[type=checkbox]")[ii].id.split('_')[3] == "jun") {

                            if ($("input[type=checkbox]")[ii].checked) {
                                keepBoolean = true;
                                console.log($("input[type=checkbox]")[ii].id);

                            }
                        }

                    }
                    if (this.type == "radio" && $("#survey_profile_a").is(":checked") || keepBoolean) {
                        console.log($("#survey_profile_a"));
                        console.log(this.id);
                        if (this.id.split("_").length == 2) {
                            for (let ii = 0; ii < entities.length; ii++) {
                                entities.get(ii).show = false;
                            }
                            let txtLevelToNum = this.id.replace("level", "");
                            txtLevelToNum = txtLevelToNum.replace("_", "");
							var selectedYear=0;
							var addRemoveEntitiesByYear=0;
							var startEntitiesByYear=0;
							if ($(".select-year").val() == "year_all") {
								startEntitiesByYear=0;
								addRemoveEntitiesByYear=0;
							  selectedYear=0;

							} else if ($(".select-year").val() == "year_2563") {
							  selectedYear=1;
							  startEntitiesByYear=0;
								addRemoveEntitiesByYear=(entities.length-97788)*-1;

							} else if ($(".select-year").val() == "year_2564") {
								selectedYear=2;
								  startEntitiesByYear=97789;
								addRemoveEntitiesByYear=0;
							}

                            DB.db({
                                table: txtLevelToNum,
                                where: "",
								selectedYear:selectedYear,
                            }).getLevel(function(r) {
                                // $.each(r.data, function(i) {
                                    // let tempIndexForLevel = dataGroup2.findIndex(x => x.HC == this.HC);
                                    // console.log(tempIndexForLevel+'-->'+this.HC);
                                    // if (tempIndexForLevel > 0) {
                                      // entities .get(tempIndexForLevel).show = true;

                                    // }
                                // });
								
								
								
							let keep=0+startEntitiesByYear;
							let countQuery=0;
							let countActive=0;
							let keepBefore="";
							//let countActive=0;
							let MaxEntitiseConYear=
								 $.each(r.data, function(i) {
									//console.log(i+".-->"+this.HC);
									let countEntitise=entities.length+addRemoveEntitiesByYear;
									for(let j=keep;j<countEntitise;j++){
										//console.log(j);
										if(this.HC==entities.get(j).id){
											//console.log(j+"<=="+countActive);
											countActive++;
											keep=j;
											countEntitise=j;
											keepBefore=this.HC;
											
											entities.get(j).show=true;
										}else if(j==(countEntitise-1)){
											
											console.log("**found**");
											console.log("not found:"+this.HC+"==>"+i);
											console.log("before:"+keepBefore+"==>"+keep);
											
										}
									}
								});
								console.log("query:"+r.data.length);
								console.log("Active:"+countActive);
                            });
                        } else {
                            switch (this.id) {
                                case "level1_1":

                                    break;


                                case "level1":
                                    console.log("level1");

                                    // if(getVal){
                                    // lv1=getVal.lv3*10;
                                    // colorGreen=255/50*lv1;
                                    // colorRed=125;

                                    // console.log(colorGreen);
                                    // entities.get(i).color=Cesium.Color.fromBytes(255, colorGreen, 0, 255);
                                    // entities.get(i).outlineWidth=0; entities.get(i).outlineColor=Cesium.Color.fromBytes(0,0, 0, 0);
                                    // }
                                    if (entities.length > 0) {


                                        for (var i = 0; i < dataGroup2.length; i++) {
                                            //entities.get(i).color=Cesium.Color.fromBytes(0, 255, 0, 255);
                                            //id=entities.get(i).id;
                                            getVal = dataGroup2[i];
                                            if (getVal) {
                                                var val = getVal.lv1;
                                                if (val > 4.0) {
                                                    entities.get(i).color = Cesium.Color.BLUE;
                                                    entities.get(i).outlineWidth = 0;
                                                    entities.get(i).outlineColor = Cesium.Color.fromBytes(0, 0, 0, 0);
                                                } else if (val >= 3.25 && val <= 4.00) {
                                                    entities.get(i).color = Cesium.Color.LIME;
                                                    entities.get(i).outlineWidth = 0;
                                                    entities.get(i).outlineColor = Cesium.Color.fromBytes(0, 0, 0, 0);
                                                } else if (val >= 2.50) {
                                                    entities.get(i).color = Cesium.Color.DEEPSKYBLUE;
                                                    entities.get(i).outlineWidth = 0;
                                                    entities.get(i).outlineColor = Cesium.Color.fromBytes(0, 0, 0, 0);
                                                } else if (val >= 1.75) {
                                                    entities.get(i).color = Cesium.Color.YELLOW;
                                                    entities.get(i).outlineWidth = 0;
                                                    entities.get(i).outlineColor = Cesium.Color.fromBytes(0, 0, 0, 0);
                                                } else if (val >= 1.00) {
                                                    entities.get(i).color = Cesium.Color.RED;
                                                    entities.get(i).outlineWidth = 0;
                                                    entities.get(i).outlineColor = Cesium.Color.fromBytes(0, 0, 0, 0);
                                                } else {
                                                    entities.get(i).color = Cesium.Color.BLUE;
                                                    entities.get(i).outlineWidth = 0;
                                                    entities.get(i).outlineColor = Cesium.Color.fromBytes(0, 0, 0, 0);
                                                }

                                                //console.log(colorGreen);

                                            }
                                            // map.viewer.scene.primitives.get(i).color=Cesium.Color(0, 1, 0, 1);
                                            //entities.get(i).show=false;

                                        }
                                    }
                                    break;
                                case "level2":
                                    console.log("level2");
                                    if (entities.length > 0) {


                                        for (var i = 0; i < entities.length; i++) {
                                            //entities.get(i).color=Cesium.Color.fromBytes(0, 255, 0, 255);

                                            getVal = dataGroup2[i];
                                            if (getVal) {
                                                var val = getVal.lv2;
                                                if (val > 4.0) {
                                                    entities.get(i).color = Cesium.Color.BLUE;
                                                    entities.get(i).outlineWidth = 0;
                                                    entities.get(i).outlineColor = Cesium.Color.fromBytes(0, 0, 0, 0);
                                                } else if (val >= 3.25 && val <= 4.00) {
                                                    entities.get(i).color = Cesium.Color.LIME;
                                                    entities.get(i).outlineWidth = 0;
                                                    entities.get(i).outlineColor = Cesium.Color.fromBytes(0, 0, 0, 0);
                                                } else if (val >= 2.50) {
                                                    entities.get(i).color = Cesium.Color.DEEPSKYBLUE;
                                                    entities.get(i).outlineWidth = 0;
                                                    entities.get(i).outlineColor = Cesium.Color.fromBytes(0, 0, 0, 0);
                                                } else if (val >= 1.75) {
                                                    entities.get(i).color = Cesium.Color.YELLOW;
                                                    entities.get(i).outlineWidth = 0;
                                                    entities.get(i).outlineColor = Cesium.Color.fromBytes(0, 0, 0, 0);
                                                } else if (val >= 1.00) {
                                                    entities.get(i).color = Cesium.Color.RED;
                                                    entities.get(i).outlineWidth = 0;
                                                    entities.get(i).outlineColor = Cesium.Color.fromBytes(0, 0, 0, 0);
                                                } else {
                                                    entities.get(i).color = Cesium.Color.BLUE;
                                                    entities.get(i).outlineWidth = 0;
                                                    entities.get(i).outlineColor = Cesium.Color.fromBytes(0, 0, 0, 0);
                                                }

                                            }
                                            // map.viewer.scene.primitives.get(i).color=Cesium.Color(0, 1, 0, 1);
                                            //entities.get(i).show=false;

                                        }
                                    }
                                    break;
                                case "level3":
                                    console.log("level3");
                                    if (entities.length > 0) {


                                        for (var i = 0; i < entities.length; i++) {
                                            //entities.get(i).color=Cesium.Color.fromBytes(0, 255, 0, 255);

                                            getVal = dataGroup2[i];
                                            if (getVal) {
                                                var val = getVal.lv3;
                                                if (val > 4.0) {
                                                    entities.get(i).color = Cesium.Color.BLUE;
                                                    entities.get(i).outlineWidth = 0;
                                                    entities.get(i).outlineColor = Cesium.Color.fromBytes(0, 0, 0, 0);
                                                } else if (val >= 3.25 && val <= 4.00) {
                                                    entities.get(i).color = Cesium.Color.LIME;
                                                    entities.get(i).outlineWidth = 0;
                                                    entities.get(i).outlineColor = Cesium.Color.fromBytes(0, 0, 0, 0);
                                                } else if (val >= 2.50) {
                                                    entities.get(i).color = Cesium.Color.DEEPSKYBLUE;
                                                    entities.get(i).outlineWidth = 0;
                                                    entities.get(i).outlineColor = Cesium.Color.fromBytes(0, 0, 0, 0);
                                                } else if (val >= 1.75) {
                                                    entities.get(i).color = Cesium.Color.YELLOW;
                                                    entities.get(i).outlineWidth = 0;
                                                    entities.get(i).outlineColor = Cesium.Color.fromBytes(0, 0, 0, 0);
                                                } else if (val >= 1.00) {
                                                    entities.get(i).color = Cesium.Color.RED;
                                                    entities.get(i).outlineWidth = 0;
                                                    entities.get(i).outlineColor = Cesium.Color.fromBytes(0, 0, 0, 0);
                                                } else {
                                                    entities.get(i).color = Cesium.Color.BLUE;
                                                    entities.get(i).outlineWidth = 0;
                                                    entities.get(i).outlineColor = Cesium.Color.fromBytes(0, 0, 0, 0);
                                                }

                                            }
                                            // map.viewer.scene.primitives.get(i).color=Cesium.Color(0, 1, 0, 1);
                                            //entities.get(i).show=false;

                                        }
                                    }
                                    break;

                                case "level4":
                                    console.log("level4");
                                    if (entities.length > 0) {


                                        for (var i = 0; i < entities.length; i++) {
                                            //entities.get(i).color=Cesium.Color.fromBytes(0, 255, 0, 255);

                                            getVal = dataGroup2[i];
                                            if (getVal) {
                                                var val = getVal.lv4;
                                                if (val > 4.0) {
                                                    entities.get(i).color = Cesium.Color.BLUE;
                                                    entities.get(i).outlineWidth = 0;
                                                    entities.get(i).outlineColor = Cesium.Color.fromBytes(0, 0, 0, 0);
                                                } else if (val >= 3.25 && val <= 4.00) {
                                                    entities.get(i).color = Cesium.Color.LIME;
                                                    entities.get(i).outlineWidth = 0;
                                                    entities.get(i).outlineColor = Cesium.Color.fromBytes(0, 0, 0, 0);
                                                } else if (val >= 2.50) {
                                                    entities.get(i).color = Cesium.Color.DEEPSKYBLUE;
                                                    entities.get(i).outlineWidth = 0;
                                                    entities.get(i).outlineColor = Cesium.Color.fromBytes(0, 0, 0, 0);
                                                } else if (val >= 1.75) {
                                                    entities.get(i).color = Cesium.Color.YELLOW;
                                                    entities.get(i).outlineWidth = 0;
                                                    entities.get(i).outlineColor = Cesium.Color.fromBytes(0, 0, 0, 0);
                                                } else if (val >= 1.00) {
                                                    entities.get(i).color = Cesium.Color.RED;
                                                    entities.get(i).outlineWidth = 0;
                                                    entities.get(i).outlineColor = Cesium.Color.fromBytes(0, 0, 0, 0);
                                                } else {
                                                    entities.get(i).color = Cesium.Color.BLUE;
                                                    entities.get(i).outlineWidth = 0;
                                                    entities.get(i).outlineColor = Cesium.Color.fromBytes(0, 0, 0, 0);
                                                }

                                            }
                                            // map.viewer.scene.primitives.get(i).color=Cesium.Color(0, 1, 0, 1);
                                            //entities.get(i).show=false;

                                        }
                                    }
                                    break;
                                case "level5":
                                    console.log("level5");
                                    if (entities.length > 0) {


                                        for (var i = 0; i < entities.length; i++) {
                                            //entities.get(i).color=Cesium.Color.fromBytes(0, 255, 0, 255);
                                            //id=entities.get(i).id;
                                            getVal = dataGroup2[i];
                                            if (getVal) {
                                                var val = getVal.lv5;
                                                if (val > 4.0) {
                                                    entities.get(i).color = Cesium.Color.BLUE;
                                                    entities.get(i).outlineWidth = 0;
                                                    entities.get(i).outlineColor = Cesium.Color.fromBytes(0, 0, 0, 0);
                                                } else if (val >= 3.25 && val <= 4.00) {
                                                    entities.get(i).color = Cesium.Color.LIME;
                                                    entities.get(i).outlineWidth = 0;
                                                    entities.get(i).outlineColor = Cesium.Color.fromBytes(0, 0, 0, 0);
                                                } else if (val >= 2.50) {
                                                    entities.get(i).color = Cesium.Color.DEEPSKYBLUE;
                                                    entities.get(i).outlineWidth = 0;
                                                    entities.get(i).outlineColor = Cesium.Color.fromBytes(0, 0, 0, 0);
                                                } else if (val >= 1.75) {
                                                    entities.get(i).color = Cesium.Color.YELLOW;
                                                    entities.get(i).outlineWidth = 0;
                                                    entities.get(i).outlineColor = Cesium.Color.fromBytes(0, 0, 0, 0);
                                                } else if (val >= 1.00) {
                                                    entities.get(i).color = Cesium.Color.RED;
                                                    entities.get(i).outlineWidth = 0;
                                                    entities.get(i).outlineColor = Cesium.Color.fromBytes(0, 0, 0, 0);
                                                } else {
                                                    entities.get(i).color = Cesium.Color.BLUE;
                                                    entities.get(i).outlineWidth = 0;
                                                    entities.get(i).outlineColor = Cesium.Color.fromBytes(0, 0, 0, 0);
                                                }

                                            }
                                            // map.viewer.scene.primitives.get(i).color=Cesium.Color(0, 1, 0, 1);
                                            //entities.get(i).show=false;

                                        }
                                    }
                                    break;
                                case "level6":
                                    console.log("level6");
                                    if (entities.length > 0) {


                                        for (var i = 0; i < entities.length; i++) {
                                            //entities.get(i).color=Cesium.Color.fromBytes(0, 255, 0, 255);
                                            //id=entities.get(i).id;
                                            getVal = dataGroup2[i];
                                            if (getVal) {
                                                var val = (parseInt(getVal.lv1) + parseInt(getVal.lv2) + parseInt(getVal.lv3) + parseInt(getVal.lv4) + parseInt(getVal.lv5)) / 5;
                                                //console.log(val);
                                                if (val > 4.0) {
                                                    entities.get(i).color = Cesium.Color.BLUE;
                                                    entities.get(i).outlineWidth = 0;
                                                    entities.get(i).outlineColor = Cesium.Color.fromBytes(0, 0, 0, 0);
                                                } else if (val >= 3.25 && val <= 4.00) {
                                                    entities.get(i).color = Cesium.Color.LIME;
                                                    entities.get(i).outlineWidth = 0;
                                                    entities.get(i).outlineColor = Cesium.Color.fromBytes(0, 0, 0, 0);
                                                } else if (val >= 2.50) {
                                                    entities.get(i).color = Cesium.Color.DEEPSKYBLUE;
                                                    entities.get(i).outlineWidth = 0;
                                                    entities.get(i).outlineColor = Cesium.Color.fromBytes(0, 0, 0, 0);
                                                } else if (val >= 1.75) {
                                                    entities.get(i).color = Cesium.Color.YELLOW;
                                                    entities.get(i).outlineWidth = 0;
                                                    entities.get(i).outlineColor = Cesium.Color.fromBytes(0, 0, 0, 0);
                                                } else if (val >= 1.00) {
                                                    entities.get(i).color = Cesium.Color.RED;
                                                    entities.get(i).outlineWidth = 0;
                                                    entities.get(i).outlineColor = Cesium.Color.fromBytes(0, 0, 0, 0);
                                                } else {
                                                    entities.get(i).color = Cesium.Color.BLUE;
                                                    entities.get(i).outlineWidth = 0;
                                                    entities.get(i).outlineColor = Cesium.Color.fromBytes(0, 0, 0, 0);
                                                }

                                            }
                                            // map.viewer.scene.primitives.get(i).color=Cesium.Color(0, 1, 0, 1);
                                            //entities.get(i).show=false;

                                        }
                                    }
                                    break;
                                    // code block

                                default:
                                    // code block
                            }
                        }
                    }
                    //entities.show=false;
                    //console.log("check");
                }).change();



            },
            getLatLng: function(p, c) {
                var $$ = this;
                if (p.JUN) {
                    p.province_id = p.JUN;
                }
                if (p.AMP) {
                    p.district_id = p.AMP;
                }
                if (p.TMP) {
                    p.sub_district_id = p.TMP;
                }
                map.getLatLngAdminID(p, function(r) {
                    p.lat = r.latLng.lat;
                    p.lng = r.latLng.lng;
                    p.tempLatLng = true;
                    c(p);
                });
            },
            createIcon: function(d) {
                return 'icons/home-1.png';
            },
            addMarker: function(o) {
                var $$ = this;
                if (!o.HC) {
                    return false;
                }
                //if(!o.lat || !o.lng || o.lat<1 || o.lat>20 || o.lng<80 || o.lng>120){ //ment by bssm
                if (0) {
                    $.ajax({
                        type: 'POST',
                        url: 'database.php',
                        data: {
                            where: "HC='" + o.HC + "'",
                            table: 'survey_b'
                        },
                        success: function(r) {
                            r = JSON.parse(r);
                            if (!r.empty) {
                                $.each(r.data, function() {
                                    if (this.b1_1 && !isNaN(this.b1_1) && this.b1_2 && !isNaN(this.b1_2)) {
                                        var lat = parseFloat(parseFloat(this.b1_1).toFixed(6));
                                        var lng = parseFloat(parseFloat(this.b1_2).toFixed(6));
                                        if (lat > 1 && lat < 20 && lng > 80 && lng < 120) {
                                            o.lat = lat;
                                            o.lng = lng;
                                            //_add();
                                            //phase1	var ud = {id:o.id,lat:lat,lng:lng}
                                            var ud = {
                                                id: o.HC1,
                                                lat: lat,
                                                lng: lng
                                            }
                                            DB.db(collection).update(ud);
                                            return false;
                                        }
                                    }
                                });
                            }
                            _add();
                        }
                    });
                } else {
                    //getLatLngGis(o);//---- to check out area
                    _add(o); //--- to add marker

                } /*  */



                function download(content, fileName, contentType) {
                    var a = document.createElement("a");
                    var file = new Blob([content], {
                        type: contentType
                    });
                    a.href = URL.createObjectURL(file);
                    a.download = fileName;
                    a.click();
                }


                function getLatLngGis(o) {
                    //countFun++;
                    //console.log(countFun);
                    //////console.log("gis")
                    var server = 'https://gisportal.fisheries.go.th/arcgis/rest/services/Hosted/';
                    //var server = 'https://services8.arcgis.com/gsAq5vcFUKwSVHYm/ArcGIS/rest/services/';
                    var where;
                    var L;


                    for (var i = 0; i < dataTambon.length; i++) {
                        if (dataTambon[i].tambon_id == o.TMP) {

                            where = "";

                            //dataTambon[numIndexData]=[];
                            break;
                        } else {

                            where = "TAMBON_IDN='" + o.TMP + "'";
                        }

                    }

                    if (where || dataTambon.length == 0) {
                        where = "TAMBON_IDN='" + o.TMP + "'";
                        var dataTmp = [];
                        dataTmp['tambon_id'] = o.TMP;
                        dataTmp['geometry'] = [];
                        dataTambon.push(dataTmp);
                    }
                    ////debugger;
                    L = 'ขอบเขตตำบลWGS84';
                    L = '%E0%B8%82%E0%B8%AD%E0%B8%9A%E0%B9%80%E0%B8%82%E0%B8%95%E0%B8%95%E0%B8%B3%E0%B8%9A%E0%B8%A5WGS84';

                    if (where) {

                        var query = {
                            outSR: 4326,
                            outfields: "*",
                            where: where,
                            returnGeometry: true,
                            geometryPrecision: 3,
                            returnCentroid: true,
                            f: "pjson",
                            token: ''
                        }
                        // countFun++;
                        // console.log(countFun);


                        //-----call json geometry local file
                        //if(o.TMP!=5940902&&o.TMP!=5940910&&o.TMP!=5940903&&o.TMP!=931014){
                        $.getJSON('../tmp/gis_tambon/TH' + o.TMP + '.json', function(data2) {
                            index = dataTambon.findIndex(p => p.tambon_id == o.TMP);

                            dataTambon[index].geometry.push(data2.geometry.coordinates[0]);
                            $.each(dataGroup[0], function(i) {
                                if (this.TMP == o.TMP) {

                                    _add(this);
                                }
                            });


                        });
                        //}
                        //-----end call json geometry local file
                        //--------------- call geometry arcgis-------------
                        /*
                        	return $.ajax({
                        	type: 'POST',
                        	url: server+L+'/FeatureServer/0/query',
                        	crossDomain: true,
                        	data:query,
                        	success: function(data){
                        	//debugger;
                        	
                        	data = JSON.parse(data);
                        	index=dataTambon.findIndex(p => p.tambon_id == o.TMP);
                        	//	////console.log(index);
                        	
                        	if(index!=-1 && data.features[0]){
                        	//console.log("------------------");
                        	
                        	// console.log(query);
                        	// console.log(data);
                        	//console.log(data.features[0].attributes.tambon_idn);
                        	dataTambon[index].geometry.push(data.features[0].geometry.rings);
                        	//console.log(data.features[0].geometry.rings);
                        	}else{
                        	console.log("fail")
                        	console.log(query.where);
                        	
                        	}
                        	$.each(dataGroup[0],function(i){
                        	if(this.TMP==o.TMP){
                        	_add(this);
                        	// ////console.log(this.TMP);
                        	}
                        	});
                        	},
                        	error:function(){
                        	
                        	}
                        	});
                        */
                        //-------end call arcgis

                    } else {
                        // _add();
                    }

                }

                function IsPointInPolygon(p, polygon) {
                    // var minX = polygon[ 0 ].X;  lat lng
                    // var maxX = polygon[ 0 ].X;	X 	Y
                    // var minY = polygon[ 0 ].Y;	1	0
                    // var maxY = polygon[ 0 ].Y;
                    var minX = polygon[0][1];
                    var maxX = polygon[0][1];
                    var minY = polygon[0][0];
                    var maxY = polygon[0][0];
                    for (var i = 1; i < polygon.length; i++) {
                        var q = polygon[i];
                        minX = Math.min(q[1], minX);
                        maxX = Math.max(q[1], maxX);
                        minY = Math.min(q[0], minY);
                        maxY = Math.max(q[0], maxY);
                    }

                    if (parseFloat(p.X) < minX || parseFloat(p.X) > maxX || parseFloat(p.Y) < minY || parseFloat(p.Y) > maxY) {
                        return false;
                    }

                    //https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html
                    var inside = false;

                    var i = 0,
                        j = polygon.length - 1;
                    // for (i, j; i < polygon.length; j = i++) {
                    // if ( (polygon[i].y > p.y) != (polygon[j].y > p.y) &&
                    // p.x < (polygon[j].x - polygon[i].x) * (p.y - polygon[i].y) / (polygon[j].y - polygon[i].y) + polygon[i].x ) {
                    // isInside = !isInside;
                    // }
                    // }
                    //h;
                    for (i, j; i < polygon.length; j = i++) {
                        if ((polygon[i][0] > parseFloat(p.Y)) != (polygon[j][0] > parseFloat(p.Y)) &&
                            parseFloat(p.X) < (polygon[j][1] - polygon[i][1]) * (parseFloat(p.Y) - polygon[i][0]) / (polygon[j][0] - polygon[i][0]) + polygon[i][1]) {
                            inside = !inside;
                        }
                    }

                    return inside;
                }

                function _add(dataByHc) {


                    //console.log(countNum);
                    /*if(!dataByHc.lat || !dataByHc.lng){
                    	$$.getLatLng(o,function(p){
                    	_add();
                    	});
                    	return false;
                    }*/
                    var layer = 'survey_profile_a';
                    var icon = Cesium.Color.BLUE;
                    var iconOutline = Cesium.Color.WHITE;
                    //phase1	var id = 'survey_profile_'+dataByHc.id;
                    var id = 'survey_profile_' + dataByHc.HC1;
                    if (USER.Province && USER.Province.province_id && dataByHc.JUN && USER.Province.province_id == dataByHc.JUN) {
                        layer = 'survey_profile_p';
                        dataByHc['indexDataByUserProvince'] = entities.length;
                        //dataByHc.push({"indexDataByUserProvince=indexDataByUserProvince;

                        //dataByHc['indexDataByUserProvince']=0;
                        dataByUserProvince.push(dataByHc);
                        icon = Cesium.Color.BLANCHEDALMOND; //จังหวัด ตัวเอง
                        iconOutline = Cesium.Color.BROWN;
                        // icon = 'icons/home-white.png';
                    }

                    indexDataByUserProvince++;
                    //--- check out area---		

                    var latLng = [];
                    latLng['X'] = dataByHc.lat;
                    latLng['Y'] = dataByHc.lng;
                    index = dataTambon.findIndex(p => p.tambon_id == dataByHc.TMP);
                    /*
                    	try {
                    	//var isInArea=IsPointInPolygon(latLng,dataTambon[index].geometry[0]);
                    	
                    	}
                    	catch(err) {
                    	console.log( err.message);
                    	}
                    */
                    // if(!isInArea){
                    //console.log("true");
                    // icon = 'icons/home-brown.png';
                    // console.log(dataByHc);
                    // } 
                    // editBssm icon
                    // var colorPoint=Cesium.Color.BLUE;


                    //--- end out area




                    var search = dataByHc.HC + ' ' + dataByHc.PERSON;
                    var by = '';
                    /*if(staff && staff.length>0){
                    	$.each(staff,function(){
                    	if(this.HC==dataByHc.HC){
                    	by = this.staff;
                    	return false;
                    	}
                    	});
                    }*/ //ment by bssm
                    var mistake = [];
                    if (USER.username == by) {
                        layer = 'survey_profile_b';
                        icon = 'icons/home-blue.png';
                    }
                    if (USER.username == by || (USER.level && USER.level == 'admin')) {
                        if (map.getEntityById(id)) {
                            survey_profile.last_edit = id;
                        }
                        if (!dataByHc.JUN) {
                            mistake.push('ยังไม่ระบุจังหวัด');
                        }
                        if (!dataByHc.AMP) {
                            mistake.push('ยังไม่ระบุอำเภอ');
                        }
                        if (!dataByHc.TMP) {
                            mistake.push('ยังไม่ระบุตำบล');
                        }
                        if (dataByHc.AMP.substring(0, 2) != dataByHc.JUN) {
                            mistake.push('ระบุอำเภอผิดพลาด');
                        }
                        if (dataByHc.TMP.substring(0, 2) != dataByHc.JUN || dataByHc.TMP.substring(0, 2) != dataByHc.AMP.substring(0, 2)) {
                            mistake.push('ระบุตำบลผิดพลาด');
                        }
                        if (!dataByHc.HC) {
                            mistake.push('ยังไม่ระบุรหัสบ้าน');
                        } else {
                            if (dataByHc.HC.startsWith('0')) {
                                if (dataByHc.HC.substring(1, 3) != dataByHc.JUN) {
                                    mistake.push('ระบุจังหวัดหรือรหัสบ้านผิดพลาด');
                                }
                            } else {
                                var mis = false;
                                if (dataByHc.HC.substring(0, 2) != dataByHc.JUN) {
                                    mis = 1;

                                    //----Some Provinces exception
                                    if (dataByHc.JUN == 37 && dataByHc.HC.substring(0, 2) == 34) {
                                        mis = false;
                                    }
                                    if (mis) {
                                        mistake.push('ระบุจังหวัดหรือรหัสบ้านผิดพลาด');
                                    }
                                }
                            }
                        }
                    }
                    var search = dataByHc.HC + ' ' + dataByHc.PERSON2 + ' โดย:' + by;
                    var ent;




                    extentDescription = '';
                    if (dataByHc.photo) {
                        extentDescription = extentDescription + '<div style="display:inline-block;">';
                        $.each(dataByHc.photo, function() {
                            extentDescription = extentDescription + '<img style="cursor:pointer;margin:2px;" src="' + this.thumb + '" onclick="viewImage(\'' + this.path + '\')">';
                        });
                        extentDescription = extentDescription + '</div>';
                    }
                    if (dataByHc.tempLatLng && (USER.username == by || (USER.level && USER.level == 'admin'))) {
                        extentDescription = extentDescription + '<div style="padding: 5px;font-size: 0.8em;color: orange;">พิกัดตำแหน่งชั่วคราว (กรุณาย้ายพิกัด)</div>';
                    }
                    if (mistake && mistake.length > 0 && USER.username == by) {
                        layer = 'survey_profile_c';
                        icon = 'icons/home-yellow.png';
                        extentDescription = extentDescription + '<div style="padding: 5px;font-size: 0.9em;color: yellow;">ต้องการแก้ไขข้อมูลที่ผิดพลาด</div>';
                        $.each(mistake, function(i) {
                            extentDescription = extentDescription + '<div style="padding: 5px;font-size: 0.8em;color: yellow;">' + (i + 1) + '.' + this + '</div>';
                        });
                    }
                    extentDescription = extentDescription + '<div style="padding: 5px;">';

                    if (USER.username == by || (USER.level && USER.level == 'admin')) {
                        if (dataByHc.tempLatLng) {
                            extentDescription = extentDescription + '<div style="padding: 5px;font-size: 0.8em;color: orange;">พิกัดตำแหน่งชั่วคราว (กรุณาย้ายพิกัด)</div>';
                        }

                        extentDescription = extentDescription + '<span id="marker_undo" class="zmdi zmdi-undo" style="font-size:24px;cursor:pointer;float: right;padding:16px;display:none;" aria-hidden="true" title="เลิกย้ายพิกัด"></span>' +
                            '<span id="marker_save" class="zmdi zmdi-floppy" style="font-size:24px;cursor:pointer;float: right;padding:16px;display:none;" aria-hidden="true" title="บันทึกพิกัดใหม่"></span>' +
                            '<span id="marker_move" class="zmdi zmdi-arrows" style="font-size:24px;cursor:pointer;float: right;padding:16px;" aria-hidden="true" title="ย้ายจุดพิกัด"></span>' +
                            '<span id="marker_edit" class="zmdi zmdi-edit" style="font-size:24px;cursor:pointer;float: right;padding:16px;" aria-hidden="true" title="แก้ไขข้อมูล"></span>' +
                            '<span id="marker_delete" class="zmdi zmdi-delete" style="font-size:24px;cursor:pointer;float: right;padding:16px;" aria-hidden="true" title="ลบข้อมูลครัวเรือนและแบบสอบถาม"></span>' +
                            '<a href="/survey_p2/survey_edit.php?HC=' + dataByHc.HC + '" target="_blank" style="text-decoration:none;color:wheat;font-size:16px;cursor:pointer;float: right;padding:16px;" aria-hidden="true" title="แบบสอบถาม">แบบสอบถาม</a>';
                    }
                    extentDescription = extentDescription + '<span id="marker_view" class="zmdi zmdi-chart" style="font-size:24px;cursor:pointer;float: right;padding:16px;" aria-hidden="true" title="รายงานศักยภาพ 5 มิติ"></span>';
                    extentDescription = extentDescription + '</div>';




                    var show = false;
                    //editbssm if($('#'+layer).prop('checked')){
                    if ($('#' + layer).prop('checked')) {
                        //console.log("check");
                        entities.show = true;
                    }
                    if (!map.Layers[layer]) {
                        console.log(layer);
                        map.Layers[layer] = entities.add(new Cesium.PointPrimitiveCollection());
                        dataGroup2.push(dataByHc);
                        countNum++;
                        map.Layers[layer].show = show;
                        //ent.show=show;
                    }
                    //console.log(dataByHc.isInArea);
                    if (dataByHc.isInArea == "0") {
                        icon = Cesium.Color.RED;
                    }

                    var p = {
                        id: dataByHc.HC,
                        //parent:map.Layers[layer],
                        search: search,
                        name: dataByHc.HC,
                        //show:false,
                        description: {
                            value: '',
                            getValue: function() {

                                if (!this.value) {
                                    this.value = {
                                        hc: 'รหัสบ้าน : ' + dataByHc.HC + '<br><br>',


                                        h_no: '',
                                        v_no: '',
                                        v_name: '',
                                        sub_district: '',
                                        district: '',
                                        province: '',
                                        postcode: '',
                                        location1: '<br><br>พิกัด : ',

                                        person: '<br><br>ผู้ให้ข้อมูล : ',
                                        tel: '',
                                        member: '<br><br>สมาชิกครัวเรือน : ',
                                        by: '<br><br>ผู้สำรวจ : ',
                                        mistake: ''
                                    }
                                    var v = this.value;
                                    var databyHC;
                                    DB.db({
                                        table: 'survey_profile',
                                        where: "HC='" + dataByHc.HC + "'"
                                    }).get(function(r) {
                                        if (r.data && r.data[0]) {

                                            databyHC = r.data[0];
                                            console.log(databyHC);
                                            console.log(databyHC.photo);

                                            icon = Cesium.Color.RED;

                                            if (databyHC.MBNO) {
                                                v.h_no = databyHC.MBNO + ' ';
                                            }
                                            if (databyHC) {
                                                if (databyHC.MB) {
                                                    if (databyHC.MB > 100) {
                                                        v.v_no = 'หมู่ที่ ' + parseInt(databyHC.MB.slice(-2)) + ' ';
                                                    } else {
                                                        v.v_no = 'หมู่ที่ ' + databyHC.MB + ' ';
                                                    }
                                                }
                                                if (databyHC.MM) {
                                                    v.v_name = 'บ้าน' + databyHC.MM + ' ';
                                                }
                                                if (databyHC.PERSON) {
                                                    v.person = v.person + databyHC.PERSON;
                                                }
                                                if (databyHC.PERSON_NAME) {

                                                    v.person = v.person + databyHC.PERSON_NAME + ' ' + databyHC.PERSON_SNAME;

                                                }

                                                v.location1 = v.location1 + dataByHc.lat + ' , ' + dataByHc.lng

                                                if (databyHC.TEL && databyHC.TEL.length > 3) {
                                                    v.tel = '<br>โทร : ' + databyHC.TEL;
                                                }
                                                if (databyHC.POSTCODE && databyHC.POSTCODE.length > 3) {
                                                    v.postcode = ' ' + databyHC.POSTCODE;
                                                }
                                                if (ent.mistake) {
                                                    v.mistake = '<div style="padding: 5px 0;color: yellow;">ระบุพิกัดหรือเขตการปกครองผิดพลาด</div>';
                                                }
                                                if (databyHC.TMP) {
                                                    DB.db({
                                                        table: 'tambon',
                                                        where: "tambon_id='" + databyHC.TMP + "'"
                                                    }).get(function(r) {
                                                        if (r.data && r.data[0]) {
                                                            if (r.data[0].province_id == 10) {
                                                                v.sub_district = r.data[0].tambon_name_thai + ' ';
                                                            } else {
                                                                v.sub_district = 'ต.' + r.data[0].tambon_name_thai + ' ';
                                                            }
                                                            if (ent.mistake && ent.mistake.sub_district) {
                                                                v.mistake = v.mistake + '<div style="padding: 5px 0;font-size: 0.9em;color: yellow;">*พิกัดอยู่นอกขอบเขต ' + v.sub_district + '</div>';
                                                            }
                                                        }
                                                    });
                                                }
                                                if (databyHC.AMP) {
                                                    DB.db({
                                                        table: 'district',
                                                        where: "district_id='" + databyHC.AMP + "'"
                                                    }).get(function(r) {
                                                        if (r.data && r.data[0]) {
                                                            v.district = r.data[0].district_name_thai + ' ';
                                                            if (v.district.startsWith('อำเภอ')) {
                                                                v.district = v.district.replace('อำเภอ', 'อ.');
                                                            }
                                                            if (ent.mistake && ent.mistake.district) {
                                                                v.mistake = v.mistake + '<div style="padding: 5px 0;font-size: 0.9em;color: yellow;">*พิกัดอยู่นอกขอบเขต ' + v.district + '</div>';
                                                            }
                                                        }
                                                    });
                                                }
                                                if (databyHC.JUN) {
                                                    DB.db({
                                                        table: 'province',
                                                        where: "province_id='" + databyHC.JUN + "'"
                                                    }).get(function(r) {
                                                        if (r.data && r.data[0]) {
                                                            if (r.data[0].province_id == 10) {
                                                                v.province = r.data[0].province_name_thai;
                                                            } else {
                                                                v.province = 'จ.' + r.data[0].province_name_thai;
                                                            }
                                                            if (ent.mistake && ent.mistake.province) {
                                                                v.mistake = v.mistake + '<div style="padding: 5px 0;font-size: 0.9em;color: yellow;">*พิกัดอยู่นอกขอบเขต ' + v.province + '</div>';
                                                            }
                                                        }
                                                    });
                                                }
                                                DB.db({
                                                    table: 'survey_a',
                                                    where: "HC='" + databyHC.HC + "' AND survey_year='2564'"
                                                }).get(function(r) {
                                                    $.each(r.data, function(i) {
                                                        //	v.member = v.member+'<br>'+(i+1)+'.'+this.a2;
                                                        v.member = v.member + '<br>' + (i + 1) + '.' + (this.a2_2 ? (this.a2_2 + ' ' + this.a2_3) : this.a2);
                                                    });
                                                });
                                                DB.db({
                                                    table: 'survey_staff',
                                                    where: "HC='" + databyHC.HC + "' AND survey_year='2564'"
                                                }).get(function(s) {
                                                    if (s.data && s.data[0]) {
                                                        DB.db({
                                                            table: 'volunteer',
                                                            where: "username='" + s.data[0].staff + "'"
                                                        }).get(function(r) {
                                                            if (r.data && r.data[0]) {
                                                                v.by = v.by + r.data[0].name;
                                                            }
                                                        });
                                                    }
                                                });



                                                /*
                                                	
                                                	extentDescription = '';
                                                	if(dataByHc.photo){
                                                	extentDescription = extentDescription+'<div style="display:inline-block;">';
                                                	$.each(dataByHc.photo,function(){
                                                	extentDescription = extentDescription+'<img style="cursor:pointer;margin:2px;" src="'+this.thumb+'" onclick="viewImage(\''+this.path+'\')">';
                                                	});
                                                	extentDescription = extentDescription+'</div>';
                                                	}
                                                	if(dataByHc.tempLatLng && (USER.username == by|| (USER.level && USER.level == 'admin'))){
                                                	extentDescription=extentDescription+'<div style="padding: 5px;font-size: 0.8em;color: orange;">พิกัดตำแหน่งชั่วคราว (กรุณาย้ายพิกัด)</div>';
                                                	}
                                                	if(mistake && mistake.length>0 && USER.username == by){
                                                	layer = 'survey_profile_c';
                                                	icon = 'icons/home-yellow.png';
                                                	extentDescription=extentDescription+'<div style="padding: 5px;font-size: 0.9em;color: yellow;">ต้องการแก้ไขข้อมูลที่ผิดพลาด</div>';
                                                	$.each(mistake,function(i){
                                                	extentDescription=extentDescription+'<div style="padding: 5px;font-size: 0.8em;color: yellow;">'+(i+1)+'.'+this+'</div>';
                                                	});
                                                	}
                                                	extentDescription=extentDescription+'<div style="padding: 5px;">';
                                                	
                                                	if(USER.username == by || (USER.level && USER.level == 'admin')){
                                                	if(dataByHc.tempLatLng){
                                                	extentDescription=extentDescription+'<div style="padding: 5px;font-size: 0.8em;color: orange;">พิกัดตำแหน่งชั่วคราว (กรุณาย้ายพิกัด)</div>';
                                                	}
                                                	
                                                	extentDescription=extentDescription+'<span id="marker_undo" class="zmdi zmdi-undo" style="font-size:24px;cursor:pointer;float: right;padding:16px;display:none;" aria-hidden="true" title="เลิกย้ายพิกัด"></span>'+
                                                	'<span id="marker_save" class="zmdi zmdi-floppy" style="font-size:24px;cursor:pointer;float: right;padding:16px;display:none;" aria-hidden="true" title="บันทึกพิกัดใหม่"></span>'+
                                                	'<span id="marker_move" class="zmdi zmdi-arrows" style="font-size:24px;cursor:pointer;float: right;padding:16px;" aria-hidden="true" title="ย้ายจุดพิกัด"></span>'+
                                                	'<span id="marker_edit" class="zmdi zmdi-edit" style="font-size:24px;cursor:pointer;float: right;padding:16px;" aria-hidden="true" title="แก้ไขข้อมูล"></span>'+
                                                	'<span id="marker_delete" class="zmdi zmdi-delete" style="font-size:24px;cursor:pointer;float: right;padding:16px;" aria-hidden="true" title="ลบข้อมูลครัวเรือนและแบบสอบถาม"></span>'+
                                                	'<a href="/survey_p2/survey_edit.php?HC='+dataByHc.HC+'" target="_blank" style="text-decoration:none;color:wheat;font-size:16px;cursor:pointer;float: right;padding:16px;" aria-hidden="true" title="แบบสอบถาม">แบบสอบถาม</a>';
                                                	}
                                                	extentDescription=extentDescription+'<span id="marker_view" class="zmdi zmdi-chart" style="font-size:24px;cursor:pointer;float: right;padding:16px;" aria-hidden="true" title="รายงานศักยภาพ 5 มิติ"></span>';
                                                	extentDescription=extentDescription+'</div>';
                                                	
                                                */



                                            }
                                        }
                                    });
                                } else {
                                    var v = this.value;
                                    return v.hc + 'ที่อยู่ : ' + v.h_no + v.v_no + v.v_name + v.sub_district + v.district + v.province + v.postcode + v.location1 + v.member + v.person + v.tel + v.by + v.mistake;
                                }

                            } // getValue:function(){
                        },
                        extentDescription: extentDescription,

                        position: map.setPosition(dataByHc),
                        originalPosition: map.setPosition(dataByHc),
                        // billboard:{
                        //image:icon,  //editBssm
                        // verticalOrigin:Cesium.VerticalOrigin.BOTTOM,
                        // scaleByDistance:new Cesium.NearFarScalar(2000,1,1e7,0)
                        // },
                        // point: {
                        // color:Cesium.Color.BLUE,
                        color: icon,
                        // outlineColor:Cesium.Color.WHITE,
                        // outlineWidth:1,
                        // pixelSize: 8,
                        // },

                        // color:0,
                        // color:icon,
                        outlineColor: iconOutline,
                        outlineWidth: 0.5,
                        pixelSize: 8,
                        show: false,
                        move: function() {
                            map.pinMoving(ent, function(x) {
                                $('#marker_save').show();
                                $('#marker_undo').show();
                            });
                        },
                        view: function() {
                            if ($('#data_view')[0]) {
                                return false;
                            }
                            var div = '<div class="modal"><div class="modal-dialog modal-lg" style="height: 98%;width:98%;max-width:800px;margin:4px;"><div class="modal-content" style="height: 100%;"><div class="modal-header" style="padding: 4px;"><button type="button" class="close" data-dismiss="modal">×</button></div><div class="modal-body" id="data_view" style="padding:4px;height: 96%;"></div></div></div></div>';
                            setTimeout(function() {
                                $(div).modal();
                                _view();
                            }, 100);

                            function _view() {
                                if (!$('#data_view')[0]) {
                                    setTimeout(_view, 50);
                                    return false;
                                }
                                var width = $('#image_view').width() - 2;
                                //console.log(dataByHc.HC);
								var surveyText="survey_p2";
								if(dataGroup2.findIndex(x=>x.HC==dataByHc.HC)<97788){
									surveyText="survey";
								}
                                $('#data_view').html('<iframe id="dataiframe" class="responsive-iframe" style="display: none;width:100%;height: 100%;border: none;" src="../'+surveyText+'/?curr=show_hc6&hc=' + dataByHc.HC.replace('"', '').replace('"', '') + '"></iframe>');
                                // $('#data_view').html('<iframe id="dataiframe" class="responsive-iframe" style="display: none;width:100%;height: 100%;border: none;" src="../survey_p2/?curr=show_hc6&hc='+dataByHc.HC+'"></iframe>');
                                _hide();
                            }

                            function _hide() {
                                if (!$('#dataiframe').contents().find('.navbar')[0] || !$('#dataiframe').contents().find('footer')[0]) {
                                    setTimeout(_hide, 20);
                                    return false;
                                }
                                $('#dataiframe').contents().find('body').css('font-size', '0.9em');
                                $('#dataiframe').contents().find('.navbar').hide();
                                $('#dataiframe').contents().find('footer').html('<a href="/survey_p2/survey_edit.php?HC=' + dataByHc.HC + '">แบบสอบถาม HC:' + dataByHc.HC + '</a>').css('height', '40px');
                                $('#dataiframe').show();
                            }
                        },

                        save: function() {
                            var d = {
                                id: ent.id.replace('survey_profile_', ''),
                                lat: ent.lat,
                                lng: ent.lng
                            }
                            DB.db(collection).update(d, function(out) {
                                $('#marker_save').hide();
                                $('#marker_undo').hide();
                                survey_profile.last_edit = ent.id;
                                setTimeout(function() {
                                    map.viewer.selectedEntity = undefined;
                                    ent.draggable = false;
                                }, 1000);
                            });
                            var dd = {
                                b1_1: ent.lat,
                                b1_2: ent.lng
                            }
                            DB.db({
                                table: 'survey_b'
                            }).updateWhere(dd, "HC='" + dataByHc.HC + "'");
                        },
                        edit: function() {
                            var editor = survey_profile.dataTables.editor();
                            var id = ent.id.replace('survey_profile_', '');
                            survey_profile.dataTables.search(id).draw();
                            editor.editRow(id, ent);
                        },
                        delete: function() {
                            var editor = survey_profile.dataTables.editor();
                            var id = ent.id.replace('survey_profile_', '');
                            survey_profile.dataTables.search(id).draw();
                            editor.removeRow(id, ent.name, function() {
                                map.viewer.selectedEntity = undefined;
                            });
                        }


                    } //p
                    //dataByHc.isArea=isInArea; //keep value isInArea to make file json
                    countNum
                    dataByHc.index = countNum;
                    dataGroup2.push(dataByHc);
                    map.removeEntityById(id);
                    //editBssm ent
                    // if(p.color==Cesium.Color.BLUE)
                    // data

                    //console.log(isInArea);
                    ent = entities.add(p);

                    entities._pointPrimitives[countNum].description = p.description;
                    entities._pointPrimitives[countNum].extentDescription = p.extentDescription;
                    entities._pointPrimitives[countNum].view = p.view;
                    countNum++;
                    // entities.add({
                    // imageId : 'billboard point',
                    // image : canvas,
                    // extentDescription:extentDescription,
                    // position : Cesium.Cartesian3.fromDegrees(dataByHc.lng , dataByHc.lat)
                    // });
                    // entities.add(p);
                    // ent.show=true;
                    // ent.show=true;
                    // ent = entities.add({
                    // position: Cesium.Cartesian3.fromDegrees(dataByHc.lng , dataByHc.lat),
                    // point: {
                    // color:Cesium.Color.WHITE,
                    // pixelSize: 8,
                    // },
                    // });
                    if (!dataByHc.tempLatLng && USER.username == by) {
                        setTimeout(function() {
                            map.getAdmin(o, function(a) {
                                if (dataByHc.JUN && a.province_id != dataByHc.JUN) {
                                    if (!ent.mistake) {
                                        ent.mistake = {}
                                    }
                                    ent.mistake.province = true;
                                }
                                if (dataByHc.AMP && a.district_id != dataByHc.AMP) {
                                    if (!ent.mistake) {
                                        ent.mistake = {}
                                    }
                                    ent.mistake.district = true;
                                }
                                if (dataByHc.TMP && a.sub_district_id != dataByHc.TMP) {
                                    if (!ent.mistake) {
                                        ent.mistake = {}
                                    }
                                    ent.mistake.sub_district = true;
                                }
                                if (ent.mistake) {
                                    ent.billboard.image = 'icons/home-yellow.png';
                                    ent.parent = map.Layers['survey_profile_c'];
                                }
                            });
                            //phase1	},5000+dataByHc.id*10);
                        }, 5000 + dataByHc.HC1 * 10);
                    }

                    //---- check value out area

                    // if(isInArea){
                    // icon = 'icons/home-2.png';
                    // }

                    //---- end check value out area



                    if (survey_profile.last_edit && survey_profile.last_edit == ent.id) {
                        setTimeout(function() {
                            map.viewer.selectedEntity = ent;
                        }, 500);
                    }
                }
                // map.geocoder= new LabelCollectionGeocoder();
                // function LabelCollectionGeocoder() {
                // }
                // LabelCollectionGeocoder.prototype.geocode = function (input) {
                // console.log(input);
                // debugger;
                // }
                function createDescription() {

                    var mistake = [];
                    if (USER.username == by) {
                        layer = 'survey_profile_b';
                        icon = 'icons/home-blue.png';
                    }
                    if (USER.username == by || (USER.level && USER.level == 'admin')) {
                        if (map.getEntityById(id)) {
                            survey_profile.last_edit = id;
                        }
                        if (!dataByHc.JUN) {
                            mistake.push('ยังไม่ระบุจังหวัด');
                        }
                        if (!dataByHc.AMP) {
                            mistake.push('ยังไม่ระบุอำเภอ');
                        }
                        if (!dataByHc.TMP) {
                            mistake.push('ยังไม่ระบุตำบล');
                        }
                        if (dataByHc.AMP.substring(0, 2) != dataByHc.JUN) {
                            mistake.push('ระบุอำเภอผิดพลาด');
                        }
                        if (dataByHc.TMP.substring(0, 2) != dataByHc.JUN || dataByHc.TMP.substring(0, 2) != dataByHc.AMP.substring(0, 2)) {
                            mistake.push('ระบุตำบลผิดพลาด');
                        }
                        if (!dataByHc.HC) {
                            mistake.push('ยังไม่ระบุรหัสบ้าน');
                        } else {
                            if (dataByHc.HC.startsWith('0')) {
                                if (dataByHc.HC.substring(1, 3) != dataByHc.JUN) {
                                    mistake.push('ระบุจังหวัดหรือรหัสบ้านผิดพลาด');
                                }
                            } else {
                                var mis = false;
                                if (dataByHc.HC.substring(0, 2) != dataByHc.JUN) {
                                    mis = 1;

                                    //----Some Provinces exception
                                    if (dataByHc.JUN == 37 && dataByHc.HC.substring(0, 2) == 34) {
                                        mis = false;
                                    }
                                    if (mis) {
                                        mistake.push('ระบุจังหวัดหรือรหัสบ้านผิดพลาด');
                                    }
                                }
                            }
                        }
                    }
                    var search = dataByHc.HC + ' ' + dataByHc.PERSON + ' โดย:' + by;
                    var ent;
                    var extentDescription = '';
                    if (dataByHc.photo) {
                        extentDescription = extentDescription + '<div style="display:inline-block;">';
                        $.each(dataByHc.photo, function() {
                            extentDescription = extentDescription + '<img style="cursor:pointer;margin:2px;" src="' + this.thumb + '" onclick="viewImage(\'' + this.path + '\')">';
                        });
                        extentDescription = extentDescription + '</div>';
                    }
                    if (dataByHc.tempLatLng && (USER.username == by || (USER.level && USER.level == 'admin'))) {
                        extentDescription = extentDescription + '<div style="padding: 5px;font-size: 0.8em;color: orange;">พิกัดตำแหน่งชั่วคราว (กรุณาย้ายพิกัด)</div>';
                    }
                    if (mistake && mistake.length > 0 && USER.username == by) {
                        layer = 'survey_profile_c';
                        icon = 'icons/home-yellow.png';
                        extentDescription = extentDescription + '<div style="padding: 5px;font-size: 0.9em;color: yellow;">ต้องการแก้ไขข้อมูลที่ผิดพลาด</div>';
                        $.each(mistake, function(i) {
                            extentDescription = extentDescription + '<div style="padding: 5px;font-size: 0.8em;color: yellow;">' + (i + 1) + '.' + this + '</div>';
                        });
                    }
                    extentDescription = extentDescription + '<div style="padding: 5px;">';

                    if (USER.username == by || (USER.level && USER.level == 'admin')) {
                        if (dataByHc.tempLatLng) {
                            extentDescription = extentDescription + '<div style="padding: 5px;font-size: 0.8em;color: orange;">พิกัดตำแหน่งชั่วคราว (กรุณาย้ายพิกัด)</div>';
                        }

                        extentDescription = extentDescription + '<span id="marker_undo" class="zmdi zmdi-undo" style="font-size:24px;cursor:pointer;float: right;padding:16px;display:none;" aria-hidden="true" title="เลิกย้ายพิกัด"></span>' +
                            '<span id="marker_save" class="zmdi zmdi-floppy" style="font-size:24px;cursor:pointer;float: right;padding:16px;display:none;" aria-hidden="true" title="บันทึกพิกัดใหม่"></span>' +
                            '<span id="marker_move" class="zmdi zmdi-arrows" style="font-size:24px;cursor:pointer;float: right;padding:16px;" aria-hidden="true" title="ย้ายจุดพิกัด"></span>' +
                            '<span id="marker_edit" class="zmdi zmdi-edit" style="font-size:24px;cursor:pointer;float: right;padding:16px;" aria-hidden="true" title="แก้ไขข้อมูล"></span>' +
                            '<span id="marker_delete" class="zmdi zmdi-delete" style="font-size:24px;cursor:pointer;float: right;padding:16px;" aria-hidden="true" title="ลบข้อมูลครัวเรือนและแบบสอบถาม"></span>' +
                            '<a href="/survey_p2/survey_edit.php?HC=' + dataByHc.HC + '" target="_blank" style="text-decoration:none;color:wheat;font-size:16px;cursor:pointer;float: right;padding:16px;" aria-hidden="true" title="แบบสอบถาม">แบบสอบถาม</a>';
                    }
                    extentDescription = extentDescription + '<span id="marker_view" class="zmdi zmdi-chart" style="font-size:24px;cursor:pointer;float: right;padding:16px;" aria-hidden="true" title="รายงานศักยภาพ 5 มิติ"></span>';
                    extentDescription = extentDescription + '</div>';
                    if (!this.value) {
                        this.value = {
                            hc: 'รหัสบ้าน : ' + dataByHc.HC + '<br><br>',
                            h_no: '',
                            v_no: '',
                            v_name: '',
                            sub_district: '',
                            district: '',
                            province: '',
                            postcode: '',
                            location1: '<br><br>พิกัด : ',

                            person: '<br><br>ผู้ให้ข้อมูล : ',
                            tel: '',
                            member: '<br><br>สมาชิกครัวเรือน : ',
                            by: '<br><br>ผู้สำรวจ : ',
                            mistake: ''
                        }
                        var v = this.value;
                        if (dataByHc.MBNO) {
                            v.h_no = dataByHc.MBNO + ' ';
                        }
                        if (dataByHc.MB) {
                            if (dataByHc.MB > 100) {
                                v.v_no = 'หมู่ที่ ' + parseInt(dataByHc.MB.slice(-2)) + ' ';
                            } else {
                                v.v_no = 'หมู่ที่ ' + dataByHc.MB + ' ';
                            }
                        }
                        if (dataByHc.MM) {
                            v.v_name = 'บ้าน' + dataByHc.MM + ' ';
                        }
                        //	if(dataByHc.PERSON){
                        //		v.person = v.person+dataByHc.PERSON;
                        if (dataByHc.PERSON_NAME) {
                            v.person = v.person + dataByHc.PERSON_NAME + ' ' + dataByHc.PERSON_SNAME;
                        }

                        v.location1 = v.location1 + dataByHc.lat + ' , ' + dataByHc.lng

                        if (dataByHc.TEL && dataByHc.TEL.length > 3) {
                            v.tel = '<br>โทร : ' + dataByHc.TEL;
                        }
                        if (dataByHc.POSTCODE && dataByHc.POSTCODE.length > 3) {
                            v.postcode = ' ' + dataByHc.POSTCODE;
                        }
                        if (ent.mistake) {
                            v.mistake = '<div style="padding: 5px 0;color: yellow;">ระบุพิกัดหรือเขตการปกครองผิดพลาด</div>';
                        }
                        if (dataByHc.TMP) {
                            DB.db({
                                table: 'tambon',
                                where: "tambon_id='" + dataByHc.TMP + "'"
                            }).get(function(r) {
                                if (r.data && r.data[0]) {
                                    if (r.data[0].province_id == 10) {
                                        v.sub_district = r.data[0].tambon_name_thai + ' ';
                                    } else {
                                        v.sub_district = 'ต.' + r.data[0].tambon_name_thai + ' ';
                                    }
                                    if (ent.mistake && ent.mistake.sub_district) {
                                        v.mistake = v.mistake + '<div style="padding: 5px 0;font-size: 0.9em;color: yellow;">*พิกัดอยู่นอกขอบเขต ' + v.sub_district + '</div>';
                                    }
                                }
                            });
                        }
                        if (dataByHc.AMP) {
                            DB.db({
                                table: 'district',
                                where: "district_id='" + dataByHc.AMP + "'"
                            }).get(function(r) {
                                if (r.data && r.data[0]) {
                                    v.district = r.data[0].district_name_thai + ' ';
                                    if (v.district.startsWith('อำเภอ')) {
                                        v.district = v.district.replace('อำเภอ', 'อ.');
                                    }
                                    if (ent.mistake && ent.mistake.district) {
                                        v.mistake = v.mistake + '<div style="padding: 5px 0;font-size: 0.9em;color: yellow;">*พิกัดอยู่นอกขอบเขต ' + v.district + '</div>';
                                    }
                                }
                            });
                        }
                        if (dataByHc.JUN) {
                            DB.db({
                                table: 'province',
                                where: "province_id='" + dataByHc.JUN + "'"
                            }).get(function(r) {
                                if (r.data && r.data[0]) {
                                    if (r.data[0].province_id == 10) {
                                        v.province = r.data[0].province_name_thai;
                                    } else {
                                        v.province = 'จ.' + r.data[0].province_name_thai;
                                    }
                                    if (ent.mistake && ent.mistake.province) {
                                        v.mistake = v.mistake + '<div style="padding: 5px 0;font-size: 0.9em;color: yellow;">*พิกัดอยู่นอกขอบเขต ' + v.province + '</div>';
                                    }
                                }
                            });
                        }
                        DB.db({
                            table: 'survey_a',
                            where: "HC='" + dataByHc.HC + "' AND survey_year='2564'"
                        }).get(function(r) {
                            $.each(r.data, function(i) {
                                //	v.member = v.member+'<br>'+(i+1)+'.'+this.a2;
                                v.member = v.member + '<br>' + (i + 1) + '.' + this.a2_2 + ' ' + this.a2_3;
                            });
                        });
                        DB.db({
                            table: 'survey_staff',
                            where: "HC='" + dataByHc.HC + "' AND survey_year='2564'"
                        }).get(function(s) {
                            if (s.data && s.data[0]) {
                                DB.db({
                                    table: 'volunteer',
                                    where: "username='" + s.data[0].staff + "'"
                                }).get(function(r) {
                                    if (r.data && r.data[0]) {
                                        v.by = v.by + r.data[0].name;
                                    }
                                });
                            }
                        });
                    } else {
                        var v = this.value;
                        return v.hc + 'ที่อยู่ : ' + v.h_no + v.v_no + v.v_name + v.sub_district + v.district + v.province + v.postcode + v.location1 + v.member + v.person + v.tel + v.by + v.mistake;
                    }


                }
            },
            editMarker: function(d) {
                var $$ = this;
                setTimeout(function() {
                    $$.addMarker(d);
                }, 20);
            },
            layerChange: function(d, t) {
                var $$ = this;
                if (t == 'update') {
                    $$.editMarker(d);
                }
                if (t == 'removed') {
                    map.removeEntityById('survey_profile_' + d.id);
                }
                if (t == 'create') {
                    $$.addMarker(d);
                }
            }
        },
        Table: {
            title: 'ข้อมูลครัวเรือน',
            module: 'survey_profile',
            db: collection,
            columns: [{
                data: null
            }, {
                data: null
            }, {
                data: null
            }, {
                data: null
            }, {
                data: null
            }, {
                data: null
            }, {
                data: 'id',
                title: 'ID',
                visible: false
            }],
            columnDefs: [{
                    targets: 0,
                    title: 'รหัสบ้าน',
                    width: '80px',
                    render: function(d) {
                        return d.HC;
                    }
                },
                {
                    targets: 1,
                    title: 'บุคคล',
                    width: '140px',
                    render: function(d) {
                        return d.PERSON;
                    }
                },
                {
                    targets: 2,
                    title: 'จังหวัด',
                    width: '60px',
                    render: function(d) {
                        return getProvince(d.JUN);
                    }
                },
                {
                    targets: 3,
                    title: 'Lat,Lng',
                    width: '80px',
                    render: function(d) {
                        var r = '';
                        if (d.lat && d.lng) {
                            var id = 'survey_profile_' + d.id;
                            r = r + '<br><a style="font-size: 0.9em;text-decoration: none;cursor: pointer;" title="คลิกเพื่อดูแผนที่" onclick="panToLocation(\'' + id + '\')">' + d.lat + ',' + d.lng + '</a>';
                        }
                        return r;
                    }
                },
                {
                    targets: 4,
                    title: 'แบบสอบถาม',
                    width: '60px',
                    render: function(d) {
                        return '<a href="/survey_p2/survey_edit.php?HC=' + d.HC + '" target="_blank" style="text-decoration:none;cursor:pointer;" aria-hidden="true" title="แบบสอบถาม">แบบสอบถาม</a>';
                    }
                },
                {
                    targets: 5,
                    title: 'รูป',
                    width: '200px',
                    render: function(d) {
                        var r = '';
                        if (d.photo && d.photo.length > 0) {
                            $.each(d.photo, function() {
                                r = r + '<span style="display:none;">มีรูป</span><img width="60" style="cursor:pointer;margin:2px;" src="' + this.thumb + '" onclick="viewImage(\'' + this.path + '\')">';
                            });
                        }
                        return r;
                    }
                }
            ],
            fields: [{
                    type: 'hidden',
                    name: 'id'
                },
                {
                    label: 'รหัสบ้าน <red>*</red>',
                    name: 'HC',
                    attr: {
                        pattern: '[0-9]{4}-[0-9]{6}-[0-9]{1}',
                        placeholder: 'xxxx-xxxxxx-x'
                    },
                    required: true
                },
                provinceIdField(1, 'จังหวัด', 'JUN', 'AMP'),
                districtIdField(1, 'อำเภอ', 'AMP', 'TMP'),
                subDistrictIdField(1, 'ตำบล', 'TMP'),
                {
                    type: 'hidden',
                    name: 'PERSON'
                },
                {
                    label: 'Lat (พิกัดละติจูด องศาทศนิยม)',
                    name: 'lat',
                    placeholder: '5.600001 - 20.499999',
                    attr: {
                        type: 'number',
                        title: 'ค่าพิกัดละติจูด องศาทศนิยม 4-6 ตำแหน่ง เช่น 6.6789 หรือ 13.123456 ประเทศไทยอยู่ระหว่างละติจูดที่ 5.6(ทิศใต้) - 20.5(ทิศเหนือ))',
                        step: '0.0000000001',
                        min: 5.6001,
                        max: 20.4999
                    }
                },
                {
                    label: 'Long (พิกัดลองจิจูด องศาทศนิยม)',
                    name: 'lng',
                    placeholder: '97.300001 - 105.699999',
                    attr: {
                        type: 'number',
                        title: 'ค่าพิกัดลองจิจูด องศาทศนิยม 4-6 ตำแหน่ง เช่น 98.1234 หรือ 100.234567 ประเทศไทยอยู่ในลองจิจูดที่ 97.3(ทิศตะวันตก) - 105.7(ทิศตะวันออก)',
                        step: '0.0000000001',
                        min: 97.3001,
                        max: 105.6999
                    }
                },
                {
                    label: 'รูป',
                    name: 'photo',
                    type: 'uploadMany',
                    uploadText: 'เลือกรูป',
                    clearText: 'ลบรูป',
                    noFileText: 'ยังไม่มีรูป',
                    dragDrop: true,
                    dragDropText: 'หรือคลิกลากรูปมาวางในกรอบนี้',
                    display: function(d) {
                        return '<img style="cursor:pointer;" src="' + d.thumb + '" onclick="viewImage(\'' + d.path + '\')" width="80px"/>';
                    },
                    noImageText: '-',
                    upLoadFile: function(editor, conf, files, p, c) {
                        conf.folder = 'photos/survey';
                        editor.upLoadFile(editor, conf, files, p, c);
                    },
                    multiple: true,
                    json: true,
                    folder: 'photos/survey',
                    attr: {
                        accept: 'image/*'
                    }
                }
            ],
            fnTable: function(t) {
                if (!USER.level || USER.level != 'admin') {
                    t.hideEditorButton()
                }
            },
            fnEditor: function(editor) {
                var er;

                function _error(s) {
                    if (editor.field('HC').val() && editor.s.action == 'create' && !er) {
                        editor.field('HC').error('กำลังตรวจสอบข้อมูล');
                        DB.db({
                            table: 'survey_profile',
                            where: "HC='" + editor.field('HC').val() + "'"
                        }).get(function(r) {
                            if (r.empty) {
                                editor.field('HC').error('');
                                editor.error('');
                                if (s) {
                                    er = true;
                                    editor.submit();
                                    setTimeout(function() {
                                        er = false;
                                    }, 2000);
                                }
                                return false;
                            }
                            $.each(r.data, function() {
                                editor.field('HC').error('');
                                editor.error('');
                                if (editor.field('HC').val() == this.HC) {
                                    editor.field('HC').error('มีรหัสบ้าน "' + this.HC + '" อยู่ในระบบแล้ว');
                                    editor.error('มีรหัสบ้าน "' + this.HC + '" อยู่ในระบบแล้ว');
                                    editor.field('HC').input().focus();
                                    return false;
                                }
                            });
                        });
                    }
                }
                editor.field('HC').input().on('change', function() {
                    _error();
                });
                editor.on('preSubmit', function() {
                    _error(true);
                });
                editor.on('postSubmit', function(a, b, c) {
                    if (c.action == 'edit') {
                        $.each(b.data, function() {
                            if (this.HC) {
                                var d = {
                                    b1_1: this.lat,
                                    b1_2: this.lng
                                }
                                DB.db({
                                    table: 'survey_b'
                                }).updateWhere(d, "HC='" + this.HC + "'");
                            }
                        });
                    }
                    if (c.action == 'remove') {
                        //var tb = ['staff','a1','a2','b1','b2','b3','c1','c2','d1','d2','d3','e1','e2','e3','f1'];
                        var tb = ['staff', 'a', 'b', 'c', 'd', 'e', 'f', 'g'];
                        $.each(c.data, function() {
                            if (this.HC) {
                                var hc = this.HC;
                                $.each(tb, function(i) {
                                    DB.db({
                                        table: 'survey_' + this
                                    }).deleteWhere("HC='" + hc + "'");
                                });
                            }
                        });
                    }
                });
            }
        }



    }




    return survey_profile;
				});
(function( $, window ,undefined){
	
	
		/**
		 * @declaredClass:
		 * 		unieap.ds.MetaData
		 * @summary:
		 * 		元数据信息。
		 * @description:
		 * 		元数据封装了DataStore中列的信息，包括主键、数据类型、是否可以为空等信息。
		 * @example：
		 * |	new unieap.ds.MetaData("empno",
		 * |			{primaryKey:true,label:"员工编号",dataType:4,nullable:false,precision:4}
		 * |	)
		 */
//		/**
//		 * @summary:
//		 * 		定义属性名
//		 * @type:
//		 * 		{string}
//		 */
//		name: "",
//		/**
//		 * @summary:
//		 * 		定义显示文本
//		 * @type:
//		 * 		{string}
//		 */
//		label:"",
//		/**
//		 * @summary:
//		 * 		定义主键
//		 * @type:
//		 * 		{boolean}
//		 */
//		primaryKey : null,
//		/**
//		 * @summary:
//		 * 		定义数据类型
//		 * @type:
//		 * 		{number}
//		 */
//		dataType : null,
//		/**
//		 * @summary:
//		 * 		定义输入长度
//		 * @type:
//		 * 		{number}
//		 */
//		precision : null,
//		/**
//		 * @summary:
//		 * 		定义精确度
//		 * @type:
//		 * 		{number}
//		 */
//		scale : null,
//		/**
//		 * @summary:
//		 * 		值是否为空，默认为true
//		 * @type:
//		 * 		{boolean}
//		 */
//		nullable : null,
//		/**
//		 * @summary:
//		 * 		定义增加记录时的默认值
//		 * @type:
//		 * 		{string|number|boolean}
//		 */
//		defaultValue : null,
//		/**
//		 * @summary:
//		 * 		定义格式化信息
//		 * @type:
//		 * 		{string}
//		 * @example:
//		 * | yyyy-MM-dd hh:mm:ss
//		 * | #,###.00
//		 */
//		format : null,
//		/**
//		 * @summary:
//		 * 		小于等于指定的数值
//		 * @type:
//		 * 		{number}
//		 */
//		max : null,
//		/**
//		 * @summary:
//		 * 		大于等于指定的数值
//		 * @type:
//		 * 		{number}
//		 */
//		min : null,
//		/**
//		 * @summary:
//		 * 		规定数值范围
//		 * @type:
//		 * 		{object}
//		 * @example:
//		 * | {min:1,max:3}
//		 * | {min:1,max:Infinity} == {min:1}
//		 * | {min:-Infinity,max:3} == {max:3}
//		 */
//		range : null,
//		/**
//		 * @summary:
//		 * 		大于等于指定的时间
//		 * @type:
//		 * 		{number}
//		 * @example:
//		 * | new Date(2009,0,1).getTime()
//		 */
//		past : null,
//		/**
//		 * @summary:
//		 * 		小于等于指定的时间
//		 * @type:
//		 * 		{number}
//		  * @example:
//		 * | new Date(2010,5,3).getTime()
//		 */
//		future : null,
//		/**
//		 * @summary:
//		 * 		正则表达式定义
//		 * @type:
//		 * 		{string}
//		 */
//		pattern : null,
//		
//		/**
//		 * @summary:
//		 * 		最大长度
//		 * @type:
//		 * 		{number}
//		 */
//		maxLength:null,
		
//		/**
//		 * @summary:
//		 * 		最小长度
//		 * @type:
//		 * 		{number}
//		 */
//		minLength:null
//		/**
//		 * @summary:
//		 * 		属性提示信息
//		 * @type:
//		 * 		{object}
//		 * @example:
//		 * |{
//		 * |	nullable : "输入值不可以为空",
//		 * |	precision : "长度不能大于10",
//		 * |	scale : "精确度不能大于2",
//		 * |	max : "值能不能大于100",
//		 * |	min : "值能不能小于5",
//		 * |	range : "值介于5到100之间",
//		 * |	past : "时间需大于2010/03/21",
//		 * |	future : "时间需小于2010/05/02",
//		 * |	pattern : "值应该符合Email格式",
//		 * |	maxLength:"最大长度只能为5",
//		 * |	minLength:"最小长度为3"
//		 * |}
//		 */
//		prompts : null,
	function MetaData( name, metaData ){
		if (arguments.length == 0) 
			return;
		this.setData(metaData);
		this.setName(name);
		
	}
	
	
	MetaData.prototype = {
                 /**
		 * @summary：
		 * 		设置元数据
		 * @param:
		 * 		{object} metaData 
		 * @example:
		 * |	var metaData={primaryKey:false,label:"姓名",dataType:12,nullable:true}
		 * |	var meta = new unieap.ds.MetaData("empname",
		 * |			{primaryKey:true,label:"员工编号",dataType:4,nullable:false,precision:4});
		 * |	meta.setData(metaData);
		 * |	unieap.debug(meta);
		 */
		
		setData: function(metaData){
			$.extend(this, metaData);
		},
		
		
		/**
		 * @summary：
		 * 		取得列名
		 * @example:
		 *  |	var meta = new unieap.ds.MetaData("empname",
		 *  |			{primaryKey:true,label:"员工编号",dataType:4,nullable:false,precision:4}
		 *  |		);
		 *  |	alert(meta.getName());
		 */
		getName: function(){
			return this.name;
		},
		
		
		/**
		 * @summary:
		 * 		设置名称
		 * @example:
		 *  |	var meta = new unieap.ds.MetaData("empno",
		 *  |			{primaryKey:true,label:"员工编号",dataType:4,nullable:false,precision:4}
		 *  |	);
		 *  |	meta.setName("no");
		 *  |	unieap.debug(meta);
		 */
		setName: function(name){
			this.name = name;
			return this;
		},
		
		
		/**
		 * @summary：
		 * 	取得显示的名称label
		 * @example:
		 *  |	var meta = new unieap.ds.MetaData("empname",
		 *  |			{primaryKey:true,label:"员工编号",dataType:4,nullable:false,precision:4}
		 *  |		);
		 *  |	alert(meta.getLabel());
		 */
		getLabel: function(){
			return this.label;
		},
		
		
		/**
		 * @summary:
		 * 		设置显示名称label信息
		 * @example:
		 *  |	var meta = new unieap.ds.MetaData("empno",
		 *  |			{primaryKey:true,label:"员工编号",dataType:4,nullable:false,precision:4}
		 *  |	);
		 *  |	meta.setLabel("编号");
		 *  |	unieap.debug(meta);
		 */
		setLabel: function(label){
			this.label = label;
			return this;
		},
		
		
		/**
		 * @summary:
		 * 		取得数据类型，与java.sql.Types相对应
		 * @example:
		 *  |	var meta = new unieap.ds.MetaData("empno",
		 *  |			{primaryKey:true,label:"员工编号",dataType:4,nullable:false,precision:4}
		 *  |	);
		 *  |	alert(meta.getDataType());
		 */
		getDataType: function(){
			return this.dataType;
		},
		
		/**
		 * @summary:
		 * 		设置数据类型
		 * @example:
		 *  |	var meta = new unieap.ds.MetaData("empno",
		 *  |			{primaryKey:true,label:"员工编号",dataType:4,nullable:false,precision:4}
		 *  |	);
		 *  |	meta.setDataType(8);
		 *  |	unieap.debug(meta);
		 */
		setDataType: function(dataType){
			this.dataType = dataType;
			return this;
		},
		
		
		/**
		 * @summary:
		 * 		是否为主键
		 * @example:
		 *  |	var meta = new unieap.ds.MetaData("empno",
		 *  |			{primaryKey:true,label:"员工编号",dataType:4,nullable:false,precision:4}
		 *  |	);
		 *  |	${1}alert(meta.isPrimaryKey());
		 *  ${1}本例中设置了empno为主键，返回为true
		 */
		isPrimaryKey: function(){
			return !!this.primaryKey;
		},
		
		
		/**
		 * @summary:
		 * 		设置是否为主键
		 * @example:
		 *  |	var meta = new unieap.ds.MetaData("empno",
		 *  |			{primaryKey:true,label:"员工编号",dataType:4,nullable:false,precision:4}
		 *  |	);
		 *  |	meta.setPrimaryKey(false);
		 *  |	unieap.debug(meta);
		 */
		setPrimaryKey: function(primaryKey){
			this.primaryKey = primaryKey;
			return this;
		},
		

		/**
		 * @summary:
		 * 		如果数据类型为数字类型，设置数字长度信息
		 * @example:
		 *  |	var meta = new unieap.ds.MetaData("empno",
		 *  |			{primaryKey:true,label:"员工编号",dataType:4,nullable:false,precision:4}
		 *  |	);
		 *  |	alert(meta.getPrecision());
		 */
		getPrecision: function(){
			return this.precision;
		},
		
		
		/**
		 * @summary:
		 * 		设置数字长度
		 * @example:
		 *  |	var meta = new unieap.ds.MetaData("empno",
		 *  |			{primaryKey:true,label:"员工编号",dataType:4,nullable:false,precision:4}
		 *  |	);
		 *  |	meta.setPrecision(8);
		 *  |	unieap.debug(meta);
		 */
		setPrecision: function(precision){
			this.precision = precision;
			return this;
		},
		
		/**
		 * @summary:
		 * 		如果数据类型为数字类型，获取小数点位数信息
		 * @example:
		 *  |	var metaDatas = getWidgetById('grid').getBinding().getDataStore().getMetaData();
		 *  |       metaDatas[0].setScale(2);
		 *  |       alert(metaDatas[0].getScale());
		 */
		getScale: function(){
			return this.scale;
		},
		
		/**
		 * @summary:
		 * 		设置小数点位数
		 * @example:
		 *  |	var meta = new unieap.ds.MetaData("empno",
		 *  |			{primaryKey:true,label:"员工编号",dataType:4,nullable:false,precision:4}
		 *  |	);
		 *  |	 meta.setScale(2);
		 *  |	unieap.debug(meta);
		 */
		setScale: function(scale){
			this.scale = scale;
			return this;
		},
		
		/**
		 * @summary:
		 * 		是否可以为空
		 * @example:
		 *  |	var meta = new unieap.ds.MetaData("empno",
		 *  |				{primaryKey:true,label:"员工编号",dataType:4,nullable:false,precision:4}
		 *  |	);
		 *  |	${1}alert(meta.isNullable());
		 *  ${1}本例中设置了empno不可以为空，返回为false
		 */
		isNullable: function(){
			return this.nullable != false;
		},
		
		/**
		 * @summary:
		 * 		设置是否可以为空
		 * @example:
		 *  |	var meta = new unieap.ds.MetaData("empno",
		 *  |			{primaryKey:true,label:"员工编号",dataType:4,nullable:false,precision:4}
		 *  |	);
		 *  |	meta.setNullable(true);
		 *  |	unieap.debug(meta);
		 */
		setNullable: function(nullable){
			this.nullable = nullable;
			return this;
		},
		
		
		/**
		 * @summary:
		 * 		设置默认值
		 * @example:
		 *  |	var meta = new unieap.ds.MetaData("empno",
		 *  |			{primaryKey:true,label:"员工编号",dataType:4,nullable:false,defaultValue:111}
		 *  |	);
		 *  |	alert(meta.getDefaultValue());
		 */
		getDefaultValue: function(){
			return this.defaultValue;
		},
		
		
		/**
		 * @summary:
		 * 		设置默认值
		 * @example:
		 *  |	var meta = new unieap.ds.MetaData("empno",
		 *  |			{primaryKey:true,label:"员工编号",dataType:4,nullable:false,precision:4}
		 *  |	);
		 *  |	meta.setDefaultValue(111);
		 *  |	unieap.debug(meta);
		 *  
		 */
		setDefaultValue: function(defaultValue){
			this.defaultValue = defaultValue;
			return this;
		},
		
		
		/**
		 * @summary:
		 * 		如果数据类型为日期类型，设置日期显示格式
		 * @return:
		 * 		{string}
		 * @example:
		 *  |	var meta = new unieap.ds.MetaData("date",
		 *  |			{primaryKey:false,label:"日期",dataType:97,nullable:true,format:"yyyy-MM-dd"}
		 *  |		);
		 *  |	alert(meta.getFormat());
		 */
		getFormat: function(){
			return this.format;
		},
		
		
		/**
		 * @summary:
		 * 		设置日期类型的格式化信息
		 * @example:
		 *  |	var meta = new unieap.ds.MetaData("empno",
		 *  |			{primaryKey:false,label:"日期",dataType:97,nullable:true}
		 *  |	);
		 *  |	meta.setFormat("yyyy-MM-dd");
		 *  |	unieap.debug(meta);
		 */
		setFormat: function(format){
			this.format = format;
			return this;
		},
		
		
		/**
		 * @summary:
		 * 		获取最大值，默认为正无穷
		 * @return:
		 * 		{number} 整型数值
		 * @example:
		 * | var meta = new unieap.ds.MetaData("empno",
		 * |			{primaryKey:false,label:"编号",dataType:4,nullable:true,max:100}
		 * |	);
		 * | alert(meta.getMax());
		 */
		getMax: function(){
			return this.max;
		},
		
		
		/**
		 * @summary:
		 * 		设置最大值
		 * @param:
		 * 		{number} max 整数
		 * @example:
		 *  |	var meta = new unieap.ds.MetaData("empno",
		 *  |			{primaryKey:false,label:"编号",dataType:4}
		 *  |	);
		 *  |	meta.setMax(100);
		 *  |	unieap.debug(meta);
		 */
		setMax: function(max){
			this.max = max;
			return this;
		},
		
		
		/**
		 * @summary:
		 * 		获取最小值，默认为负无穷
		 * @return:
		 * 		{number} 整型数值
		 * @example:
		 * | var meta = new unieap.ds.MetaData("empno",
		 * |			{primaryKey:false,label:"编号",dataType:4,nullable:true,min:-1}
		 * |	);
		 * | alert(meta.getMin());
		 */
		getMin: function(){
			return this.min;
		},
		
		
		/**
		 * @summary:
		 * 		设置最小值
		 * @param:
		 * 		{number} min 整数
		 * @example:
		 *  |	var meta = new unieap.ds.MetaData("empno",
		 *  |			{primaryKey:false,label:"编号",dataType:4}
		 *  |	);
		 *  |	meta.setMin(1);
		 *  |	unieap.debug(meta);
		 */
		setMin: function(min){
			this.min = min;
			return this;
		},
		
		
		
		/**
		 * @summary:
		 * 		获取值的取值范围，默认为空
		 * @return:
		 * 		{object} 范围定义对象
		 * @example:
		 * | var meta = new unieap.ds.MetaData("empno",
		 * |			{primaryKey:false,label:"编号",dataType:4,nullable:true,range:{min:1,max:100}}
		 * |	);
		 * | alert(meta.getRange());
		 */
		getRange: function(){
			return this.range;
		},
		
		
		/**
		 * @summary:
		 * 		设置值的范围
		 * @param:
		 * 		{range} min 整数
		 * @example:
		 *  |	var meta = new unieap.ds.MetaData("empno",
		 *  |			{primaryKey:false,label:"编号",dataType:4}
		 *  |	);
		 *  |	meta.setRange({min:1,max:100});
		 *  |	unieap.debug(meta);
		 */
		setRange: function(range){
			this.range = range;
			return this;
		},
		
		
		/**
		 * @summary:
		 * 		获取最小时间整型值
		 * @return:
		 * 		{number} 时间整型数据
		 * @example:
		 * | var meta = new unieap.ds.MetaData("hirdate",
		 * |			{primaryKey:false,label:"日期",dataType:93,nullable:true,past: new Date().getTime()}
		 * |	);
		 * | alert(meta.getPast());
		 */
		getPast: function(){
			return this.past;
		},
		
		
		/**
		 * @summary:
		 * 		设置最小时间
		 * @param:
		 * 		{number} past 时间整型数值
		 * @example:
		 *  |	var meta = new unieap.ds.MetaData("hirdate",
		 *  |			{primaryKey:false,label:"日期",dataType:93}
		 *  |	);
		 *  |	meta.setPast(new Date().getTime());
		 *  |	unieap.debug(meta);
		 */
		setPast: function(past){
			this.past = past;
			return this;
		},
		
		
		/**
		 * @summary:
		 * 		获取最大时间整型值
		 * @return:
		 * 		{number} 时间整型数据
		 * @example:
		 * | var meta = new unieap.ds.MetaData("hirdate",
		 * |			{primaryKey:false,label:"日期",dataType:93,nullable:true,past: new Date(2012,1,1).getTime()}
		 * |	);
		 * | alert(meta.getPast());
		 */
		getFuture: function(){
			return this.future;
		},
		
		
		/**
		 * @summary:
		 * 		设置最大时间
		 * @param:
		 * 		{number} future 时间整型数值
		 * @example:
		 *  |	var meta = new unieap.ds.MetaData("hirdate",
		 *  |			{primaryKey:false,label:"日期",dataType:93}
		 *  |	);
		 *  |	meta.setFuture(new Date(2012,1,1).getTime());
		 *  |	unieap.debug(meta);
		 */
		setFuture: function(future){
			this.future = future;
			return this;
		},
		
		
		/**
		 * @summary:
		 * 		获取正则表达式，默认为空
		 * @return:
		 * 		{string} 表达式内容
		 * @example:
		 * | var meta = new unieap.ds.MetaData("salay",
		 * |			{primaryKey:false,label:"工资",dataType:4,nullable:true,pattern:"^\\d+$"}
		 * |	);
		 * | alert(meta.getPattern());
		 */
		getPattern: function(){
			return this.pattern;
		},
		
		
		/**
		 * @summary:
		 * 		设置校验的正则表达
		 * @param:
		 * 		{string} pattern 正则表达
		 * @example:
		 * | var meta = new unieap.ds.MetaData("salay",
		 * |			{primaryKey:false,label:"工资",dataType:4,nullable:true}
		 * |	);
		 * | meta.setPattern("^\\d+$");
		 * | unieap.debug(meta);
		 */
		setPattern: function(pattern){
			this.pattern = pattern;
			return this;
		},
		
		
		/**
		 * @summary:
		 * 		得到属性值
		 * @param:
		 * 		{string} name 属性名称
		 * @return:
		 * 		{object} 返回值，任意对象
		 * @example:
		 *  |	var meta = new unieap.ds.MetaData("empno",
		 *  |			{primaryKey:true,label:"员工编号",dataType:4,nullable:false,precision:4}
		 *  |	);
		 *  |	meta.setAttribute("attr","test");
		 *  |	alert(meta.getAttribute("attr"));
		 *  
		 */
		getAttribute: function(name){
			return this[name];
		},
		
		
		/**
		 * @summary:
		 * 		设置属性
		 * @param:
		 * 		{string} name 属性名称
		 * @param:
		 * 		{object} value 属性值
		 * @example:
		 *  |	var meta = new unieap.ds.MetaData("empno",
		 *  |			{primaryKey:true,label:"员工编号",dataType:4,nullable:false,precision:4}
		 *  |	);
		 *  |	meta.setAttribute("attr","test");
		 *  |	unieap.debug(meta);
		 */
		setAttribute: function(name, value){
			this[name] = value;
			return this;
		},
		
		/**
		 * @summary:
		 * 		获得能输入的最大长度
		 * @return:
		 * 		{number}
		 */
		getMaxLength:function(){
			return this.maxLength;
		},
		
		/**
		 * @summary:
		 * 		设置能输入的最大长度
		 * @param:
		 * 		{number} maxLength
		 */
		setMaxLength:function(maxLength){
			this.maxLength=maxLength;
			return this;
		},
		
		/**
		 * @summary:
		 * 		获得必须输入的最小长度
		 * @return:
		 * 		{number}
		 */
		getMinLength:function(){
			return this.minLength;
		},
		
		/**
		 * @summary:
		 * 		设置必须输入的最小长度
		 * @param:
		 * 		{number} minLength
		 */
		setMinLength:function(minLength){
			this.minLength=minLength;
			return this;
		},
		
		/**
		 * @summary:
		 * 		根据属性名称获取，校验提示信息，默认为空
		 * @param:
		 * 		{string} name 属性名
		 * @return:
		 * 		{string} 提示信息
		 * @example:
		 *  |	var meta = new unieap.ds.MetaData("empno",
		 *  |			{primaryKey:true,label:"员工编号",dataType:4,nullable:false,precision:4,prompts:{nullable:"编号输入值不能为空。",precision:"编号长度不能大于4"}}
		 *  |	);
		 *  |	unieap.debug(meta.getPrompt("nullable"));
		 */
		getPrompt: function(name){
			return (this.prompts || (0))[name];
		},
		
		
		/**
		 * @summary:
		 * 		设置属性提示信息
		 * @param:
		 * 		{string} name 属性名
		 * @param:
		 * 		{string} value 提示信息
		 * @example:
		 *  |	var meta = new unieap.ds.MetaData("empno",
		 *  |			{primaryKey:true,label:"员工编号",dataType:4,nullable:false,precision:4}
		 *  |	);
		 *  |	meta.setPrompt("nullable","编号输入值不能为空。");
		 *  |  unieap.debug(meta);
		 */
		setPrompt: function(name,value){
			 (this.prompts = this.prompts || {})[name] = value;
			 return this;
		},
		
		/**
		 * 批量设置提示信息。
		 *     var prompts= {
		 *	       nullable: "输入值不可以为空",
		 * 	       pattern: "值应该符合Email格式",
		 * 	       maxLength:"最大长度只能为5",
		 * 	       minLength:"最小长度为3"
		 *     }
		 *     // 定义Meta对象
		 *     var meta = new MetaData("email");
		 *     meta.setPrompts(prompts)
		 * @param {Object} prompts 提示信息
		 */
		setPrompts: function(prompts){
			this.prompts = prompt;
			return this;
		}
		
		
	}
	
	
	window.MetaData = MetaData;
	
})( jQuery, this);



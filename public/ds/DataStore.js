(function( $, window ,undefined){
	
		/**
		 * @declaredClass:
		 * 		unieap.ds.DataStore
		 * @classDescription:
		 * 		DataStore是RowSet的超集，一个DataStore中至多包含一个RowSet.
		 * 		包含数据信息,如分页大小、记录条数等。
		 * @summary:
		 * 		DataStore
		 * @example：
		 * |	${1}new unieap.ds.DataStore('store1');
		 * 		${1}创建一个空的DataStore
		 * @example：
		 * |	var ds={
		 * |		metaData:{},
		 * |		pageSize:45,
		 * |		pageNumber:1,
		 * |		recordCount:45,
		 * |		name:'store1',
		 * |		rowset:[{...},{...}]
		 * |	}
		 * |	new unieap.ds.DataStore(ds);
		 * 		根据数据结构创建一个DataStore
		 * @example：
		 * |	new unieap.ds.DataStore('store1',ds);
		 *		根据数据结构创建一个名为'store1'的dataStore
		 * @img:
		 * 		images/ds/dataStore.png
		 */
	function DataStore( name, dataStore) {
		this._initData();
		if (arguments.length == 2) {
			this.name = name;
			$.type(dataStore) ==='string' && ( dataStore = JSON.parse(dataStore) );
			this._loadData(dataStore);	
		}else if (arguments.length == 1){
			var _temp = arguments[0];
			$.type(_temp) ==='object' ? this._loadData( _temp ): ( this.name = _temp);
		}
		
		this.rowSet.setDataStore(this);
	}
	
	
	DataStore.prototype = {
		
		//初始化必要数据
		_initData : function(){
			this.name = "";
			this.pageNumber = 1;
			//Math.pow(2,31)-1
			this.pageSize = 2147483647;
			this.recordCount = 0;
			this.rowSet=new RowSet();
		},
		
		//加载数据
		_loadData: function(dataStore){
			if(dataStore instanceof Array){
				this.setRecordCount(dataStore.length);
				this.rowSet = new RowSet(dataStore);
				return;
			}
			if(dataStore.rowSet){
				this.rowSet = new RowSet(dataStore.rowSet);
				delete dataStore["rowSet"];
			}
			
			$.extend(this,dataStore);
		},
		
			
		
		/**
		 * @summary:
		 * 		设置DataStore的名称
		 * @description：
		 * 		为数据结构中的name字段的值
		 * @param 
		 * 		{string} name  
		 * 		DataStore的名称
		 * @example：
		 * |	 var ds = new unieap.ds.DataStore("test");
		 * |	${1}ds.setName('HelloStore');
		 * |	unieap.debug(ds);
		 *${1}设置ds的name为'HelloStore'	
		 */
		setName: function(name) {
			this.name = name;
			return this;
		},
				
		/**
		 * @summary:
		 * 		设置DataStore的分页大小
		 * @description:
		 * 		为数据结构中的pageSize字段的值
		 * @param 
		 * 		{number} pageSize
		 * 		 分页大小
		 * @example：
		 *  |	 var ds = new unieap.ds.DataStore("test");
		 *  |	${1}ds.setPageSize(26);
		 *  |	unieap.debug(ds);
		 * ${1}设置ds的分页大小为26 
		 */		
		setPageSize: function(pageSize) {
			this.pageSize =pageSize;
			return this;
		},
		
		/**
		 * @summary:
		 * 		设置DataStore的分页序号,为数据结构中的pageNumber字段的值
		 * @param 
		 * 		{number} pageNo 
		 * 		分页序号
		 * @example：
		 * |	 var ds = new unieap.ds.DataStore("test");
		 * |	${1}ds.setPageNumber(1);
		 * |	unieap.debug(ds);
		 * ${1}	设置当前页为第一页
		 * 
		 */		
		setPageNumber: function(pageNo) {
			this.pageNumber = pageNo;
			return this;
		},
		
			
		/**
		 * @summary:
		 * 		设置服务器端DataSet名称
		 * @param 
		 * 		{string} dataSetName 
		 * 		后端DataSet文件名称
		 * @example:
		 *  |	 var ds = new unieap.ds.DataStore("test");
		 *  |	 ${1}ds.setRowSetName("emp");
		 *  |	或
		 *  |	 ${2}ds.setRowSetName("com.neusoft.unieap.ria.Emp");
		 *  |	unieap.debug(ds);
		 *  ${1}drm实现时，参数为DataSet配置文件名称
		 *  ${2}hibernate实现时，参数为javaBean类名
		 */
		setRowSetName:function(rowSetName){
			this.rowSetName =rowSetName;
			return this;
		},
		
		/**
		 * @summary:
		 * 		设置记录数
		 * @description:
		 * 		当前DataStore的记录数,需要注意的是此记录数不实时更新。
		 * 		一般由后台构造。
		 * @param 
		 * 		{number} recordCount
		 * @example：
		 * |	 var ds = new unieap.ds.DataStore("test");
		 * |	${1}ds.setRecordCount(33);
		 * |	unieap.debug(ds);
		 * ${1}	设置记录数为33
		 */		
		setRecordCount: function(recordCount){
			this.recordCount = recordCount;
			return this;
		},
		
		/**
		 * @summary：
		 * 		设置查询的过滤条件
		 * @description：
		 * 		其形式为sql中的where条件，如"role='admin' and dept=20"
		 * 		用于发送请求,由后台进行处理。
		 * @param 
		 * 		{string} filter 
		 * 		过滤条件
		 * @example：
		 * |	var ds = new unieap.ds.DataStore("test");
		 * |	var filter = "empno = ?";
		 * |	${1}ds.setCondition(filter);
		 * |	unieap.debug(ds);
		 * ${1}	设置查询条件为"empno = ?"， 当查询条件中存在“?”时需要传入查询条件值，即调用insertConditionValue方法
		 */
		setCondition:function(filter){
			this.condition =filter;
			return this;
		},
				
		/**
		 * @summary：
		 * 		设置排序条件
		 * @description：
		 * 		其形式为sql中的排序条件,即order by后面部分，如"username desc, roleName"。
		 * 		用于服务端排序，发送请求由后台处理。
		 * @param：
		 * 		{string} order 
		 * 		排序条件
		 * @example：
		 * |	var ds = new unieap.ds.DataStore("test");
		 * |	${1}ds.setOrder("[name] asc")
		 * |	unieap.debug(ds);
		 * 		${1}指定name	列的排序方式,此处drm实现时若name为别名（前台绑定名）需要用“[]”标识。
		 * 		列名不需要，若hibernate实现也不需要
		 */
		setOrder:function(order){
			this.order =order;
			return this;
		},
		
//		/**
//		 * @summary：
//		 * 		设置分组信息
//		 * @param：
//		 * 		{string} group
//		 * @example:
//		 *  |	var ds = new unieap.ds.DataStore("test");
//		 *  |	${1}ds.setGroup("dept,hiredate");
//		 *  |	unieap.debug(ds);
//		 * 		${1}设置group信息，请求数据	
//		 */		
//		setGroup: function(group){
//			this.group = group;
//		},
		
		/*
		 * @summary：
		 * 		设置元数据描述信息
		 * @param
		 * 	 	{object} metaData 
		 * 		数据对象
		 * @example:
		 * 	|	 ds.setMetaData(metData);
		 */
		setMetaData: function(metData){
			this.metaData = metData;
			return this;
		},
		
		/**
		 * @summary:
		 * 		添加元数据描述信息
		 * @param 
		 * 		{string|unieap.ds.MetaData}  name 列名称,或者是unieap.ds.MetaData对象
		 * @param 
		 * 		{object} metaData 
		 * 		元数据对象
		 * @example:
		 *  |	var ds = new unieap.ds.DataStore("test");
		 *  |	var meta={primaryKey:true,label:"员工编号",dataType:4,nullable:false,precision:4};	
		 * 	|	ds.addMetaData("attr_empno",meta);
		 *  |	unieap.debug(ds);
		 * @example:
		 * 	|	var metaData = new unieap.ds.MetaData("attr_empno");
		 * 	|	metaData.setPrimaryKey(true);
		 * 	|	metaData.setDataType(4);
		 * 	|	metaData.setNullable(false);
		 * 	|	var ds = new unieap.ds.DataStore("test");
		 * 	|	ds.addMetaData(metaData);
		 * 	|	unieap.debug(ds);
		 */
		addMetaData: function(name,metaData){	
			var _metaData = metaData || {}, _d,_m = this.metaData;
			if(arguments.length == 1 && ( _d = arguments[0]) ){
				for(var item in _d){
					if($.type(_d[item]) !== 'function'){
						_metaData[item] = _d[item];
					}
				}
				name = _metaData["name"];
				if(name==null) return ;
			}		
			if(!this.metaData){
				this.metaData = {}; 
				_m = this.metaData["columns"] = {};
			}
			else if(this.metaData["columns"]){
				_m = this.metaData["columns"];
			}
			_m[name] = _metaData;
			
			return this;	
		},
		
		/**
		 * @summary:
		 * 		设置自定义sql的模板名称
		 * @param 
		 * 		{string} statementName 
		 * 		sql模板名称
		 * @example:
		 * |	var ds = new unieap.ds.DataStore("test");
		 * |	${1}ds.setStatementName("emp");
		 * |	unieap.debug(ds);
		 *  ${1}emp为statement配置文件名称
		 */
		setStatementName: function(statementName){
			this.statementName = statementName;
			return this;
		},
		
		/**
		 * @summary:
		 * 		添加查询值
		 * @param 
		 * 		{string} value 查询值，不能为null
		 * @param 
		 * 		{number} dataType
		 * @example:
		 * |	var ds = new unieap.ds.DataStore("test");
		 * |	${1}ds.insertConditionValue("%王",unieap.DATATYPES.VARCHAR,0);
		 * |	unieap.debug(ds);
		 *  ${1}需要和setCondition方法配合使用，对应于查询条件condition中的“?”
		 */
		insertConditionValue: function(value,dataType,index){
			this.conditionValues?this.conditionValues:(this.conditionValues = []);
			if(index !== undefined){
				this.conditionValues[index]=[value,dataType];	
			}else{
				this.conditionValues.push([value,dataType])
			}
			return this;
		},
		
		/**
		 * @summary:
		 * 		移除conditionValues变量
		 * @example:
		 * |	var ds = new unieap.ds.DataStore("test");
		 * |	ds.insertConditionValue("%王",unieap.DATATYPES.VARCHAR,0);
		 * |	ds.removeConditionValues();
		 * |	unieap.debug(ds);
		 */
		removeConditionValues: function(){
			this.conditionValues=null;
			return this;
		},
		
		/**
		 * @summary:
		 * 		 查询后条件重置。将查询条件、查询条件对应值、翻页信息等重置
		 * @example:
		 * |	var ds = new unieap.ds.DataStore("test");
		 * |	ds.setCondition("ename like ?");
		 * |	ds.insertConditionValue("%王",unieap.DATATYPES.VARCHAR,0);
		 * |	ds.setPageSize(10);
		 * |	ds.setPageNumber(3);
		 * |	${1}ds.resetCondition();
		 * |	unieap.debug(ds);
		 * ${1}查询后调用此方法，将查询条件和条件中“?”对应值清空，防止下次查询时“?"与值对应不上。
		 */
		resetCondition:function(){
			this.condition="";
			this.conditionValues=null;
			this.pageNumber=1;
			this.recordCount=0;
			return this;
		},
		/**
		 * @summary：
		 * 		添加用于自定义查询的属性名称和值
		 * @description:
		 * 		定义在使用statementName自定义查询时，替换自定义sql模板中的变量，内容可以为空。
		 * @param 
		 * 		{string} name 
		 * 		属性名
		 * @param 
		 * 		{string} value 
		 * 		属性值，不能为null
		 * @param 
		 * 		{number} dataType
		 * 		Java中的数据类型，见global.js中的unieap.DATATYPES变量
		 * @example:
		 * 
		 * 	|	${1}#set($select ="select * from up_demo_emp")		
		 *	|	#set($condition="")	
		 *	|	#set($list = [${emp},${dept}])
		 *	|	#foreach($c in $list)
		 *	|		#if(${c})
		 *	|    	   #set($condition=$condition+" and " + ${c}+"=?")
		 *	| 	 #end
		 *	|	#end
		 *	|	#if(${hiredate}) 
		 *	|		#set($condition=$condition+" and " + ${hiredate}+" = date'"+${date}+"'") 
		 *	|	#end
		 *	|	#if($condition=="") $select
		 *	|	#else $select where ${condition.substring(5)} 
		 *	|	#end
		 *  ${1}statement配置文件
		 *  @example:	
		 *  |	var ds = new unieap.ds.DataStore("test");
		 *  |	${2}ds.addAttribute("emp","EMPNO","8");
		 *  |	${3}ds.addAttribute("dept","DEPTNO","4");
		 *  |	unieap.debug(ds);
		 *  
		 * 	${2}name参数对应配置文件中的变量，value参数对应变量替换值。
		 * 		此处变量emp对应与配置文件中的“${emp}”，即将模板中的“${emp}”用EMPNO替代，数据类型为java.sql.Types.DOUBLE；
	     *  ${3}将变量comp替换成比较表达式等号“=”数据类型为java.sql.Types.VARCHAR
		 */
		addAttribute: function(name,value,dataType){
			(this.attributes?
				this.attributes:
				(this.attributes = {})
			)[name] = [value,dataType]; 
		},
		
		/**
		 * @summary:
		 * 		删除自定义属性
		 * @param 
		 * 		{string} name 
		 * 		属性名称
		 * @example:
		 * |	var ds = new unieap.ds.DataStore("test");
		 * |	ds.addAttribute("emp","EMPNO","8");
		 * |	ds.addAttribute("comp","=","12");
		 * |	ds.removeAttribute("emp");
		 * |	unieap.debug(ds);
		 */
		removeAttribute: function(name){
			this.attributes && delete this.attributes[name];
		},
		
		/**
		 * @summary:
		 * 		删除自定义属性所有内容
		 * @example:
		 * |	var ds = new unieap.ds.DataStore("test");
		 * |	ds.addAttribute("emp","EMPNO","8");
		 * |	ds.addAttribute("comp","=","12");
		 * |	ds.removeAttributes();
		 * |	unieap.debug(ds);
		 */
		removeAttributes: function(){
			delete this["attributes"];
		},
		
		/**
		 * @summary：
		 * 		设置自定义查询属性对象
		 * @param
		 * 		 {object} attributes 属性对象
		 * @example:
		 * |	var attributes={emp:["EMPNO",unieap.DATATYPES.DOUBLE],
		 * |					empname:["小白",unieap.DATATYPES.VARCHAR]};
		 * |	var ds = new unieap.ds.DataStore("test");
		 * |	ds.setAttributes(attributes);
		 * |	unieap.debug(ds);
		 */
		setAttributes: function(attributes){
			this.attributes = attributes;
		},
		/**
		 * @summary：
		 * 		取得服务器端返回的某个参数值
		 * @param 
		 * 		{string} name 
		 * 		参数名称
		 * @return
		 * 		{object} 
		 * 		如果值为数组，则取数组的第一个值
		 * @example:
		 * |	var ds = new unieap.ds.DataStore("test");
		 * |	ds.setParameter("param",11);
		 * |	ds.setParameter("param1",[10,11]);
		 * |	alert(ds.getParameter("param"));
		 * |	alert(ds.getParameter("param1"));
		 */				
		getParameter: function(name) {	
			if(!this.parameters){this.parameters={}}
			var value = this.parameters[name];
			if (value != "undefined" ) {
				if (typeof value == "array" || value instanceof Array){
					return value[0];
				}
				return value;
			} 
		}, 
		
		/**
		 * @summary:
		 * 		设置自定义参数信息，譬如查询条件的键值对
		 * @param 
		 * 		{string} name
		 *		 参数名称
		 * @param 
		 * 		{object} value
		 *		 参数值
		 * @example:
		 * |	var ds = new unieap.ds.DataStore("test");
		 * |	ds.setParameter("param",555);
		 * |	ds.setParameter("param1",[10,11]);
		 * |	unieap.debug(ds);
		 */
		setParameter : function(name, value){	
			if(!this.parameters){this.parameters={}}
			this.parameters[name] = value;
		},
		/**
		 * @summary:
		 * 		设置RowSet
		 * @param 
		 * 		{object} rowSet
		 * @example:
		 * |	var ds = new unieap.ds.DataStore("test",[
		 * |					{'key':'value','key1':'value1'},
		 * |					{'key':'value','key1':'value1'}]);
		 * |	var rowset = new unieap.ds.RowSet([
		 * |					{attr_empno:"1000",NAME:"黄蓉",attr_sal:"1001",_s:true}, 
		 * |					{attr_empno:"1002",NAME:"张韶涵",attr_sal:"9500",_t:1} 
		 * |			]);
		 * |	ds.setRowSet(rowset);
		 * |	unieap.debug(ds);
		 * |
		 */
		setRowSet: function(rowSet){
			this.rowSet = rowSet;
			this.rowSet.setDataStore(this);
			this.recordCount=this.rowSet.getTotalCount();
		},
		

		/*
		 * @summary：
		 * 		设置DataStore类型
		 * @param：
		 * 		 {string|null} 
		 * 		type enums：static、incomplete、dynamic
		 * 		static： 静态数据，数据采集时不收集该DataStore的数据
		 * 		incomplete： 部分数据，codelist取回部分数据 标示codelist数据不完整
		 * 		dynamic： 动态数据，用于数据收集
		 * 		不传type参数，默认数据可收集（一般可以不传这个参数）
		 * 
		 */
		setType: function(type){
			this.type = type;
		},
		
//		/*
//		 * @summary：
//		 * 		设置sql是否含有distinct操作
//		 * @param 
//		 * 		{boolean} distinct 
//		 * @example:
//		 * |	var ds = new unieap.ds.DataStore("test");
//		 * |	ds.setDistinct(false);
//		 * |	unieap.debug(ds);
//		 */
//		setDistinct: function(distinct){
//			this.distinct = distinct;
//		},
		
		/**
		 * @summary：
		 * 		 取得DataStore的名称
		 * @description:
		 * 		也可以通过DataStore的实例dataStore.name取得
		 * @return 
		 * 		{string} 
		 * 		DataStore的名称
		 * @example:
		 * |	var ds = new unieap.ds.DataStore("test");
		 * |	alert(ds.getName());
		 */		
		getName: function() {
			return this.name;
		},
		
		
		/**
		 * @summary：
		 * 		取得DataStore里的RowSet分页参数
		 * @description:
		 * 		也可以通过DataStore的实例dataStore.pageSize取得
		 * @return 
		 * 		{number} 
		 * 		分页大小
		 * @example:
		 * |	var ds = new unieap.ds.DataStore("test");
		 * |	ds.setPageSize(10);
		 * |	alert(ds.getPageSize());
		 */
		getPageSize: function() {
			return this.pageSize;
		},
		
	
		/**
		 * @summary：
		 * 		取得DataStore里面的总记录数信息
		 * @description：
		 * 		不实时更新
		 * @return: 
		 * 		{number} 总记录数
		 * @example:
		 * |	var ds = new unieap.ds.DataStore("test");
		 * |	alert(ds.getRecordCount());
		 */
		getRecordCount: function() {
			return this.recordCount;
		},
		
		/**
		 * @summary:
		 * 		取得DataStore里面的总记录数信息
		 * @description：
		 * 		实时更新
		 * @return：
		 * 		{number} 总记录数
		 * @example:
		 * |	var ds = new unieap.ds.DataStore("test");
		 * |	alert(ds.getRealRecordCount());
		 */
		getRealRecordCount:function(){
			var rowChangeCount=0
			if(this.rowSet){
				var r=this.rowSet.getRowCount();
				var i=this.rowSet.getInitialCount();
				//增加的行数
				rowChangeCount=r-i;
			}
			return this.recordCount + rowChangeCount;
		},	
		
			

		/**
		 * @summary：
		 * 		取得DataStore里的RowSet所在的当前分页序号
		 * @return 
		 * 		{number} 当前分页序号
		 *  @example:
		 * |	var ds = new unieap.ds.DataStore("test");
		 * |	alert(ds.getPageNumber());
		 */
		getPageNumber: function() {
			return this.pageNumber;
		},
		
		/**
		 * @summary：
		 * 		取得DataStore里的RowSet实例
		 * @description:
		 * 		也可以通过DataStore的实例dataStore.rowSet取得
		 * @return 
		 * 		{unieap.ds.RowSet} 
		 * 		当前DataStore里的RowSet对象
		 * @example:
		 * |	var ds = new unieap.ds.DataStore("test",[
		 * |				{'key':'value','key1':'value1'},
		 * |				{'key':'value','key1':'value1'}]
		 * |	);
		 * |	var rowset = ds.getRowSet();
		 * |	unieap.debug(rowset);
		 */		
		getRowSet: function() {
			return this.rowSet;
		},
		
		/**
		 * @summary：
		 * 		取得DataSet名称
		 * @return 
		 * 		{string} DataSet名称
		 * @example:
		 * |	var ds = new unieap.ds.DataStore("test");
		 * |	ds.setRowSetName("emp");
		 * |	alert(ds.getRowSetName());
		 */
		getRowSetName: function(){
			return this.rowSetName;
		},
		
//		/**
//		 * @summary：
//		 * 		取得分组信息
//		 * @return
//		 * 		 {String} 分组信息
//		 * @example:
//		 *  |	var ds = new unieap.ds.DataStore("test");
//		 *  |	ds.setGroup("dept,hiredate");
//		 *  |	alert(ds.getGroup());
//		 */
//		getGroup: function(){
//			return this.group;
//		},
//		
		
		
		/**
		 * @summary：
		 * 		取得过滤条件字符串
		 * @return 
		 * 		{string} 过滤条件
		 * @example：
		 * |	var ds = new unieap.ds.DataStore("test");
		 * |	var filter = "empno = ?";
		 * |	ds.setCondition(filter);
		 * |	alert(ds.getCondition());
		 */
		getCondition: function(){
			return this.condition || "";
		},
		
		/**
		 * @summary：
		 * 		取得排序字符串
		 * @return 
		 * 		{string} 排序条件
		 * @example：
		 * |	var ds = new unieap.ds.DataStore("test");
		 * |	ds.setOrder("[name] asc")
		 * |	alert(ds.getOrder());
		 */
		getOrder: function(){
			return this.order || "";
		},
		
		/**
		 * @summary：
		 * 		取得元数据信息对象
		 * @param 
		 * 		{string} name 
		 * 		元数据属性名称，如果为null，则返回所有元素据对象
		 * @return 
		 * 		{unieap.ds.MetaData} 元数据信息对象
		 * @example:
		 *  |	var ds = new unieap.ds.DataStore("test");
		 *  |	var meta={primaryKey:true,label:"员工编号",dataType:4,nullable:false,precision:4};	
		 * 	|	ds.addMetaData("attr_empno",meta);
		 *  |	unieap.debug(ds.getMetaData("attr_empno"));
		 */
		getMetaData: function(name){
			if(!name){ 
				if(this.metaData){
					var metaData = this.metaData;
					this.metaData["columns"] && (metaData=this.metaData["columns"]);
					var result = [];
					for(var column in metaData){
						result.push(new MetaData(column,metaData[column]));
					}
					return result;
				}
				return this.metaData;
			}
			var _item = null;
			this.metaData && ( this.metaData["columns"] && ( _item=this.metaData["columns"][name] ) || ( _item=this.metaData[name]) );
			if(_item){
				return new MetaData(name,_item);
			}
			return null;
		},
		
		/**
		 * @summary：
		 * 		获得自定义查询Sql模板name
		 * @return 
		 * 		{string} Sql模板的名称
		 * @example:
		 * |	var ds = new unieap.ds.DataStore("test");
		 * |	${1}ds.setStatementName("emp");
		 * |	alert(ds.getStatementName());
		 */
		getStatementName: function(){
			return this.statementName;
		},
			
		//得到值和数据类型的内部对象
		_getPart: function(_temp){
			return {
					getValue: function(){ 
						return _temp[0];
					},
					getDataType: function(){
						return _temp[1];
					},	
					toString: function(){
						return this.getValue();
					}			
				}
		},
		
		
		/**
		 * @summary：
		 * 		获取查询值数组对象
		 * @return 
		 * 		{array} 
		 * 		数组对象，形如：[[value,dataType],...]
		 * @example:
		 * |	var ds = new unieap.ds.DataStore("test");
		 * |	ds.insertConditionValue("%王",unieap.DATATYPES.VARCHAR,0);
		 * |	unieap.debug(ds.getConditionValues());
		 * @img:
		 * 		images/ds/dataStore/getConditionValues.png
		 */
		getConditionValues: function(){
			return this.conditionValues;
		},
		
		/**
		 * @summary：
		 * 		 获取指定位置自定义Sql属性值
		 * @param 
		 * 		{number} index 查询下标
		 * @return 
		 * 		{object} 
		 * 		值和数据类型对象，可以通过getValue()和getDataType()方法分别取得值和数据类型，
		 * 		不写方法默认调用toString返回为查询值,形如：getAttribute(1)等同于getAttribute(1).getValue()	
		 * @example:
		 * |	var attributes={emp:["EMPNO",unieap.DATATYPES.DOUBLE],
		 * |					empname:["小白",unieap.DATATYPES.VARCHAR]};
		 * |	var ds = new unieap.ds.DataStore("test");
		 * |	ds.setAttributes(attributes);
		 * |	${1}alert(ds.getAttribute("empname"));
		 * |	${2}alert(ds.getAttribute("empname").getDataType());
		 * ${1} 取得变量empname的值
		 * ${2} 取得变量empname的数据类型
		 */	
		getAttribute: function(name){
			var _temp = null;
			if(this.attributes && (_temp = this.attributes[name])){
				return this._getPart(_temp);
			}
			return null;
		},
		/**
		 * @summary：
		 * 		获取自定义Sql属性对象
		 * @return 
		 * 		{object} 属性对象，形如：{name:[value,dataType],...}
		 *  @example:
		 * |	var attributes={emp:["EMPNO",unieap.DATATYPES.DOUBLE],empname:["小白",unieap.DATATYPES.VARCHAR]};
		 * |	var ds = new unieap.ds.DataStore("test");
		 * |	ds.setAttributes(attributes);
		 * |	unieap.debug(ds.getAttributes());
		 */
		getAttributes: function(){
			return this.attributes;
		},
		
		/*
		 * @summary：
		 * 		获得DataStore的类型
		 * @return 
		 * 		{string|Null} 
		 * 		static 静态数据，数据采集时不收集该DataStore的
		 * 		incomplete 部分数据，codelist取回部分数据 
		 * 		dynamic 动态数据，用于数据收集
		 */
		getType: function(){
			return this.type;
		},
		
		/*
		 * @summary：
		 * 		获取sql是否有distinct操作
		 * @return：
		 * 		{boolean}
		 */
		isDistinct: function(){
			return this.distinct === true;
		},
		
		/*
		 * @summary：
		 * 		是否能收集数据
		 * @return 
		 * 		{boolean}
		 */
		canCollect: function(){
			return !this.getType() || this.getType() == "dynamic";
		},
		
		/**
		 * @summary：
		 * 		将DataStore对象转化为标准数据格式
		 * @return 
		 * 		{object} 
		 * 		数据对象，序列号的标准格式
	 	 *  @example:
	 	 *  |	var ds = new unieap.ds.DataStore("test");
		 *  |	var rowset = new unieap.ds.RowSet([
		 *  |			{attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",_s:true},  
		 *  |			{attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800",_t:3}, 
		 *  |			{attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500",_t:1}     
		 *  |	]);
		 *  |	ds.setRowSet(rowset);
		 *  |	unieap.debug(rowset.toData());
		 */
		toData: function() {
			var data = {} ;
			data["rowSet"] = this.rowSet.toData();
			data["name"] = this.name;
			data["pageNumber"] = this.pageNumber;
			data["pageSize"] = this.pageSize;	
			data["recordCount"] = this.recordCount;	
			this.rowSetName && (data["rowSetName"] = this.rowSetName);
			this.order && (data["order"] = this.order);
			this.conditionValues && (data["conditionValues"] = this.conditionValues);
			this.parameters && (data["parameters"] = this.parameters);			
			this.metaData &&  (data["metaData"] = this.metaData);				
			if(this.statementName && this.statementName!=""){
				data["statementName"] = this.statementName;
				this.getAttributes() && (data["attributes"] = this.attributes);
			}else{			
				this.condition && (data["condition"] = this.condition);	
				this.group && (data["group"] = this.group);	
			}			
//			this.pool && (data["pool"] = this.pool);
//			this.statistics && (data["statistics"] = this.statistics);
			this.distinct && (data["distinct"]=true);
			return data;
		},
		
		/**
		 * @summary：
		 * 		将DataStore对象转化为标准json数据格式
		 * @return 
		 * 		{string} 
		 * 		json数据对象
		 *  @example:
	 	 *  |	var ds = new unieap.ds.DataStore("test");
		 *  |	var rowset = new unieap.ds.RowSet([
		 *  |			{attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",_s:true},  
		 *  |			{attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800",_t:3}, 
		 *  |			{attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500",_t:1}     
		 *  |	]);
		 *  |	ds.setRowSet(rowset);
		 *  |	alert(ds.toJson());
		 */
		toJSON: function(){
			//直接调用原生的JSON对象，提升性能
			return JSON.stringify( this.toData() )
//			var result = [];
//			result.push("\"rowSet\":".concat(this.rowSet.toJSON()));
//			result.push("\"name\":\"".concat(this.name).concat("\""));
//			result.push("\"pageNumber\":".concat(this.pageNumber));
//			result.push("\"pageSize\":".concat(this.pageSize));
//			result.push("\"recordCount\":".concat(this.recordCount));
//			this.rowSetName && result.push("\"rowSetName\":\"".concat(this.rowSetName).concat("\""));
//			this.order && result.push("\"order\":\"".concat(this.order).concat("\""));
//			this.conditionValues && result.push("\"conditionValues\":".concat(JSON.stringify(this.conditionValues)));
//			this.parameters && result.push("\"parameters\":".concat(JSON.stringify(this.parameters)));
//			this.metaData && result.push("\"metaData\":".concat(JSON.stringify(this.metaData)));
//			if(this.statementName && this.statementName!=""){
//				this.statementName && result.push("\"statementName\":\"".concat(this.statementName).concat("\""));
//				this.attributes && result.push("\"attributes\":".concat(JSON.stringify(this.attributes)));
//			}else{		
//				this.condition && result.push("\"condition\":\"".concat(this.condition).concat("\""));	
//				this.group && result.push("\"group\":\"".concat(this.group).concat("\""));	
//			}		
//			this.pool && result.push("pool:\"".concat(this.pool).concat("\""));		
//			this.statistics && result.push("statistics:".concat(JSON.stringify(this.statistics)));
//			this.distinct && result.push("\"pool\":".concat(this.distinct));	
//			return "{".concat(result.join(",").concat("}"));
		},
		
		toJson: function(){
			//直接调用原生的JSON对象，提升性能
			return JSON.stringify( this.toData() )
//			var result = [];
//			result.push("\"rowSet\":".concat(this.rowSet.toJSON()));
//			result.push("\"name\":\"".concat(this.name).concat("\""));
//			result.push("\"pageNumber\":".concat(this.pageNumber));
//			result.push("\"pageSize\":".concat(this.pageSize));
//			result.push("\"recordCount\":".concat(this.recordCount));
//			this.rowSetName && result.push("\"rowSetName\":\"".concat(this.rowSetName).concat("\""));
//			this.order && result.push("\"order\":\"".concat(this.order).concat("\""));
//			this.conditionValues && result.push("\"conditionValues\":".concat(JSON.stringify(this.conditionValues)));
//			this.parameters && result.push("\"parameters\":".concat(JSON.stringify(this.parameters)));
//			this.metaData && result.push("\"metaData\":".concat(JSON.stringify(this.metaData)));
//			if(this.statementName && this.statementName!=""){
//				this.statementName && result.push("\"statementName\":\"".concat(this.statementName).concat("\""));
//				this.attributes && result.push("\"attributes\":".concat(JSON.stringify(this.attributes)));
//			}else{		
//				this.condition && result.push("\"condition\":\"".concat(this.condition).concat("\""));	
//				this.group && result.push("\"group\":\"".concat(this.group).concat("\""));	
//			}		
//			this.pool && result.push("pool:\"".concat(this.pool).concat("\""));		
//			this.statistics && result.push("statistics:".concat(JSON.stringify(this.statistics)));
//			this.distinct && result.push("\"pool\":".concat(this.distinct));	
//			return "{".concat(result.join(",").concat("}"));
		},
		
		/**
		 * @summary：
		 * 		收集dataStore相关信息
		 * @param 
		 * 		{string} pattern 
		 * 		收集RowSet策略
		 * @return 
		 * 		{unieap.ds.DataStore} 
		 * 		临时的DataStore对象
		 * @example:
	 	 *  |	var ds = new unieap.ds.DataStore("test");
		 *  |	var rowset = new unieap.ds.RowSet([
		 *  |			{attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",_s:true},  
		 *  |			{attr_empno:"1001",NAME:"齐衷斯",attr_sal:"8800",_t:3,_o:{attr_empno:"2003"}}, 
		 *  |			{attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500",_t:1}     
		 *  |	]);
		 *  |	ds.setRowSet(rowset);
		 *  |	${1}unieap.debug(ds.collect({metaData:false,policy:"all"}));  
		 *  |	${2}unieap.debug(ds.collect("select"));
		 *  |	${3}unieap.debug(ds.collect("insert"));
		 *  |	${4}unieap.debug(ds.collect("update"));              
		 *  |	${5}unieap.debug(ds.collect("delete")); 
		 *  |	${6}unieap.debug(ds.collect("auto"));              
		 *  |	${7}unieap.debug(ds.collect("none"));              
		 *  |	${8}unieap.debug(ds.collect("all"));  
		 *   ${1}收集除了metaData外的所有数据
		 *   ${2}收集选中数据
		 *   ${3}收集新增数据
		 *   ${4}收集修改数据
		 *   ${5}收集删除缓冲区数据
		 *   ${6}收集更改的数据，包括新增、修改、删除的数据
		 *   ${7}不收集数据
		 *   ${8}收集所有数据
		 */
		collect:function(pattern){
			var dataStore  = new DataStore();
			$.extend(dataStore,this);
			if(!(($.type(pattern) ==='object' && pattern["metaData"] ) || dataStore["statementName"]) ){
				delete dataStore["metaData"];  
			}
			if($.type(pattern) === 'object'){
				pattern = pattern["policy"]
			}	
			dataStore["rowSet"] = this["rowSet"].collect(pattern);
			dataStore["rowSet"].setDataStore(dataStore);
			return dataStore;
		},
		
		/**
		 * @summary:
		 * 		转移数据
		 * @param:
		 *		{dataStore} unieap.ds.DataStore
		 *		替换的DataStore对象
		 * @param:
		 * 		{string} coverage	
		 *		replace（替换）；
		 *		discard（抛弃，默认）；
		 *		append（追加记录）；
		 *		union（ 取记录列的并集）；
		 *		updateProps（只改变属性，用于更新统计数）。
		 * @description：
		 * 		从另一个Store的数据转移到现在的store中
		 * @example:
		 *  |	${1}var ds = new unieap.ds.DataStore("test",[
		 *  |			{attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",_s:true},  
		 *  |			{attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800",_t:3}, 
		 *  |			{attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500",_t:1}     
		 *  |	]);
		 *  |	${2}var ds1 = new unieap.ds.DataStore("test",[
		 *  |			{no:"250",name:"大白",attr_sal:"1080",attr_deptno:"10"},
		 *  |			{no:"319",name:"二白",attr_sal:"50000",attr_deptno:"10"},
		 *  |			{no:"216",name:"三白",attr_sal:"3200",attr_deptno:"40"}
		 *  |	]);
		 *  |	ds1.addStatistic("attr_sal","max");
		 *  ${1}生成ds对象，供此方法以下用例使用
		 *  ${2}生成ds1对象，供此方法以下用例使用
		 *  @example:
		 *  |	${3}ds.append(ds1,"replace")
		 *  |	unieap.debug(ds);
		 *   ${3}ds1替代ds
		 *  @img：
		 * 		images/ds/dataStore/append/replace.png
		 *   @example:
		 *  |	${4}ds.append(ds1,"discard")
		 *  |	unieap.debug(ds);
		 *  ${4}ds数据不变
		 *  @img：
		 * 		images/ds/dataStore/append/discard.png
		 *  @example:
		 *  |	${5}ds.append(ds1,"append")
		 *  |	unieap.debug(ds);
		 *  ${5}ds中追加ds1中数据
		 *  @img：
		 * 		images/ds/dataStore/append/append.png
		 *  @example:
		 *  |	${6}ds.append(ds1,"union")
		 *  |	unieap.debug(ds);
		 *  ${6}ds和ds1的列取并集，如果同名则ds被ds1中替换
		 *   @img：
		 * 		images/ds/dataStore/append/union.png
		 *   @example:
		 *  |	${7}ds.append(ds1,"updateProps")
	 	 *  |	unieap.debug(ds);
	 	 *  ${7}将ds1的属性如小计合计信息替换到ds中
	 	 *  @img：
		 * 		images/ds/dataStore/append/updateProps.png
		 */
		append: function(dataStore,coverage){
			if(!dataStore instanceof DataStore||this==dataStore || "discard" == coverage) return;
			//拷贝基本属性
			if(coverage!="union" && coverage!="append"){
				var properties = ["name","pageNumber","recordCount","pageSize","rowSetName","order","condition","conditionValues","parameters","metaData","statementName","attributes","group","pool","statistics","distinct"];
				for(var i = 0,name;(name=properties[i]);i++){
					if(dataStore[name]==null){
						delete this[name];
						continue;
					}
					this[name] = dataStore[name];
				}
				
			}
			//如果为append,需要更新record记录数
			coverage=='append'&&(this.recordCount+=dataStore.getRowSet().getRowCount());
			
			//拷贝记录
			this.rowSet.append(dataStore["rowSet"],coverage); 
			
			if(coverage !== "updateProps"){
				this.onRowSetChanged();
			}
			else{
				this.onPropsChanged();
			}
			
		},
		
		
		/**
		 * @summary:
		 * 		克隆DataStore
		 * @param:
		 *		{String} dsName
		 *		新的DataStore名字
		 * @description：
		 * 		克隆一个新的DataStore
		 * @example:
		 *  |	var oldStore = dataCenter.getDataStore("oldStore");
		 *  |	var newStore = oldStore.clone("newStore");
		 */
		clone: function(dsName){
			var returnStore = new DataStore(dsName);
			var properties = ["pageNumber","recordCount","pageSize","rowSetName","order","condition","conditionValues","parameters","metaData","statementName","attributes","group","pool","statistics","distinct"];
			for(var i = 0,name;(name=properties[i]);i++){
				returnStore[name] =this[name];
			}
			var newRowSet = this.getRowSet().clone();
			returnStore.setRowSet(newRowSet);
			return returnStore;
		},

		/**
		 * @summary：
		 * 		行记录发生变化监听事件
		 * @example:
		 *  |	var ds = new unieap.ds.DataStore("test",[
		 *  |			{attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",_s:true}
		 *  |		]);
		 *  |	dojo.connect(ds,"onRowSetChanged",function(){
		 *  |		alert("onRowSetChanged");
		 *  |	});
		 *  |	var ds1 = new unieap.ds.DataStore("test",[
		 *  |			{no:"250",name:"大白",attr_sal:"1080",attr_deptno:"10"}
		 *  |		]);
		 *  |	ds.append(ds1,"replace");
		 *  |	
		 */
		onRowSetChanged:function(){
			
		},
		/**
		 * @summary：
		 * 		当记录不变时，属性发生变化监听事件
		 *  @example:
		 *  |	var ds = new unieap.ds.DataStore("test",[
		 *  |			{attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",_s:true}
		 *  |		]);
		 *  |	dojo.connect(ds,"onPropsChanged",function(){
		 *  |		alert("onPropsChanged");
		 *  |	});
		 *  |	var ds1 = new unieap.ds.DataStore("test");
		 *  |	ds1.addStatistic("attr_sal","max");
		 *  |	ds.append(ds1,"updateProps");
		 *  |	
		 */
		onPropsChanged:function(){
			
		},
		setInitialCount: function(initialCount) {
			this.getRowSet().initialCount = initialCount;
		},
		/*
		 * @summary：
		 * 		是不是全部数据
		 * @return
		 * 		{boolean}
		 */
		isFullData: function(){
			return this.getType() != "incomplete";
		},
		
		setInitialCount: function(initialCount) {
			this.getRowSet().initialCount = initialCount;
		},
		
		/**
		 * @summary：
		 * 		取得服务器端返回的某个参数值
		 * @param 
		 * 		{string} name 
		 * 		参数名称

		 * 		{object} 
		 * 		如果值为数组，则取数组的第一个值
		 * @example:
		 * |	var ds = new unieap.ds.DataStore("test");
		 * |	ds.setParameter("param",11);
		 * |	ds.setParameter("param1",[10,11]);
		 * |	alert(ds.getParameter("param"));
		 * |	alert(ds.getParameter("param1"));
		 */				
		getParameter: function(name) {	
			if(!this.parameters){this.parameters={}}
			var value = this.parameters[name];
			if (value != "undefined" ) {
				if (typeof value == "array" || value instanceof Array){
					return value[0];
				}
				return value;
			} 
		}, 
		/*
		 * @summary:
		 * 		向DataStore中添加自定义参数信息
		 * @description:
		 * 		当存在重复键时，其值为数组形式， 否则为单值，如 {roleId:[10,11], org:"neusoft"}
		 * @param 
		 * 		{string} name
		 * 		参数名称
		 * @param 
		 * 		{object} value
		 * 		参数值
		 * @example:
		 * |	var ds = new unieap.ds.DataStore("test");
		 * |	ds.addParameter("param","param");
		 * |	ds.addParameter("param1",[10,11]);
		 * |	unieap.debug(ds);
		 */				
		addParameter:function(name, value) {	
			if(!this.parameters){this.parameters={}}
			if ( $.type( this.parameters[name] ) === "array") {
				this.parameters[name].push(value);
			}
			else{			
				this.parameters[name] = value;
			}
		},
		/**
		 * @summary:
		 * 		设置自定义参数信息，譬如查询条件的键值对
		 * @param 
		 * 		{string} name
		 *		 参数名称
		 * @param 
		 * 		{object} value
		 *		 参数值
		 * @example:
		 * |	var ds = new unieap.ds.DataStore("test");
		 * |	ds.setParameter("param",555);
		 * |	ds.setParameter("param1",[10,11]);
		 * |	unieap.debug(ds);
		 */
		setParameter: function(name, value){	
			if(!this.parameters){this.parameters={}}
			this.parameters[name] = value;
		},
		/**
		 * @summary：
		 * 		删除变量
		 * @param：
		 * 		 {string} name 键值名称
		 * @example:
		 * |	var ds = new unieap.ds.DataStore("test");
		 * |	ds.addParameter("param","param");
		 * |	ds.addParameter("param1",[10,11]);
		 * |	ds.removeParameter("param1");
		 * |	unieap.debug(ds);
		 */
		removeParameter: function(name){
			delete this.parameters[name];
		}
		
	}
	
	
	window.DataStore = DataStore;

	
})(jQuery, this);

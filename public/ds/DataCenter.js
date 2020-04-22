(function( $, window,undefined){


//	var convertArrayToMap = $.maf.util.convertArrayToMap;

	/**
	 * @declaredClass:
	 * 		unieap.ds.DataCenter
	 * @summary:
	 * 		数据中心
	 * @classDescription:
	 * 		DataCenter是客户端和服务器端交换信息的载体，即消息单元。
	 * 		1.header消息头,包含服务器端响应的状态信息,如状态码、状态标题、状态详细信息.
	 * 		2.body体的参数信息,一些键值对,譬如查询参数.
	 * 		3.body体的dataStores,包括0到n个 DataStore
	 * @example:
	 * 	|	var dcdata= {
	 * 	|		header:{
	 * 	|			code:0,
	 * 	|			message:{title:"",detail:""}
	 * 	|		},
	 * 	|		body:{
	 * 	|			parameters:{},
	 *  |			dataStores:{
	 *  |				store1:{......},
	 *  |				store2:{......}
	 *  |			}
	 *  |		}
	 *  |	}
	 *  |	dataCenter = new unieap.ds.DataCenter(dcdata);
	 *		根据一定的结构创建DataCenter。参数也可以是json格式的String对象。
	 *  @example：
	 *  |	dataCenter.getDataStore("store1");
	 *		根据DataStore的name取得相应的DataStore
	 * @img:
 	 *      images/ds/dataCenter1.png
	 */
	function DataCenter( dataCenter ) {
		this.clear();
		if ( !dataCenter || $.type(dataCenter) === 'string' && $.type(dataCenter = JSON.parse(dataCenter)) !=='object')
			 return;
		dataCenter.header && $.extend(this.header,dataCenter.header);
		dataCenter.body && ( this.parameters = dataCenter.body.parameters );
		var _d = dataCenter.body.dataStores;
		for ( _dataStore in  _d) {
			this.dataStores[_dataStore] = new DataStore(_dataStore, _d[_dataStore]);
		};
	}


	DataCenter.prototype = {

		/**
		 * @summary：
		 * 		取得服务器端返回的状态码
		 * @description：
		 * 		DataCenter的header中的code的值
		 * @return
		 * 		{number}
		 * @example:
		 * |	var dcdata = {header:{code:1,message:{title:"null",detail:"null"}},body:{parameters:{},
		 * |  		dataStores:{ empDataStore:
		 * |  			{metaData:{attr_empno:{dataType:4},NAME:{dataType:12},attr_hiredate:{dataType:93}},
	     * |			pageSize:10,pageNumber:1,recordCount:0,dataSetName:"emp",name:"empDataStore",order:"",
		 * |  			rowSet:[],
		 * |			statistics:{attr_empno:{max: '1999',min: '272'}}}
		 * |		}
         * |	}};
         * |	var dc = new unieap.ds.DataCenter(dcdata);
         * |	alert(dc.getCode());
		 */
		getCode: function() {
			return this.header.code;
		},

		/**
		 * @summary：
		 * 		取得服务器端返回的状态信息标题
		 * @return
		 * 		{string} 状态信息标题
		 * @example:
		 * |	var dcdata = {header:{code:1,message:{title:"test",detail:"This is a test!"}},body:{parameters:{},
		 * |  		dataStores:{ empDataStore:
		 * |  			{metaData:{attr_empno:{dataType:4},NAME:{dataType:12},attr_hiredate:{dataType:93}},
	     * |			pageSize:10,pageNumber:1,recordCount:0,dataSetName:"emp",name:"empDataStore",order:"",
		 * |  			rowSet:[],
		 * |			statistics:{attr_empno:{max: '1999',min: '272'}}}
		 * |		}
         * |	}};
         * |	var dc = new unieap.ds.DataCenter(dcdata);
         * |	alert(dc.getTitle());
		 */
		getTitle: function() {
			return this.header.message.title;
		},


		/**
		 * @summary：
		 * 		取得服务器端返回的状态信息的详细描述
		 * @return
		 * 		{String} 状态信息的详细描述
		 * @example:
		 * |	var dcdata = {header:{code:1,message:{title:"test",detail:"This is a test!"}},body:{parameters:{},
		 * |  		dataStores:{ empDataStore:
		 * |  			{metaData:{attr_empno:{dataType:4},NAME:{dataType:12},attr_hiredate:{dataType:93}},
	     * |			pageSize:10,pageNumber:1,recordCount:0,dataSetName:"emp",name:"empDataStore",order:"",
		 * |  			rowSet:[],
		 * |			statistics:{attr_empno:{max: '1999',min: '272'}}}
		 * |		}
         * |	}};
         * |	var dc = new unieap.ds.DataCenter(dcdata);
         * |	alert(dc.getDetail());
		 */
		getDetail: function() {
			return this.header.message.detail;
		},

		/**
		 * @summary：
		 * 		取得头部的某个属性值
		 * @param:
		 * 		{string} name
		 * 		属性名称
		 * @return:
		 * 		{object} 属性值
		 * @example:
		 * |	var dc = new unieap.ds.DataCenter();
		 * |	dc.addHeaderAttribute('age',22);
		 * |	${1}alert(dc.getHeaderAttribute('age'));
		 *	${1}取得header中的age的值。
		 */
		getHeaderAttribute : function(name){
			return this.header[name];
		},

		/**
		 * @summary：
		 * 		往头部添加属性信息
		 * @param
		 * 		{string} name
		 * 		属性名称
		 * @param
		 * 		{object} value 属性值
		 * @example:
		 * |	${1}var dc = new unieap.ds.DataCenter();
		 * |	dc.addHeaderAttribute('age',22);
		 * |	unieap.debug(dc);
		 * 	${1}增加header中的age属性，属性值为22。
		 */
		addHeaderAttribute : function(name,value){
			this.header[name] = value;
		},
		/**
		 * @summary：
		 * 		取得服务器端返回的某个参数值
		 * @description：
		 * 		从DataCenter结构中的body下的parameters中取相应的参数值
		 * @param
		 * 		{string} name
		 * 		参数名称
		 * @example：
		 * 	|	var ds= {
		 * 	|		body:{
		 * 	|			parameters:{'key1':'value1'},
		 * 	|			dataStores:{}
		 *  |		}
		 *  |	}
		 *  |	var dc=new unieap.ds.DataCenter(ds);
		 *  |	${1}alert(dc.getParameter('key1'));
		 *  ${1}取得的值为'value1'
		 * @return
		 * 		{object} 如果值为数组，则取数组的第一个值
		 */
		getParameter: function(name) {
			return this.parameters[name];
		},


		/**
		 * @summary:
		 * 		向DataCenter中添加参数信息
		 * @description:
		 * 		当值为数组形式时增加属性值。当值为普通类型时覆盖原值。
		 * @param
		 * 		{String} name
		 * 		参数名称
		 * @param :
		 * 		{object} value 参数值
		 * @example:
		 * |	dataCenter.addParameter('addps1',['neusoft1']);
		 * | 	dataCenter.addParameter('addps1','neusoft2');
		 * |	dataCenter.addParameter('addps1','neusoft3');
		 * 		重复添加三个addps1的参数值。addps1的值为数组形式。
		 */
		addParameter:function(name, value) {
			if ( $.type(this.parameters[name]) === "array") {
				this.parameters[name].push(value);
			}
			else{
				this.parameters[name] = value;
			}

			return this;
		},

		/**
		 * @summary:
		 * 		设置参数值
		 * @description：
		 * 		其值为基本类型，或基本类型的数组形式
		 * @param
		 * 		{string} name
		 * 		参数名称
		 * @param
		 * 		{object} value
		 * 		 参数值
		 * @example：
		 * |	var dc = new unieap.ds.DataCenter();
		 * |	dc.setParameter('addps1',['neusoft1']);
		 * | 	dc.setParameter('addps2','neusoft2');
		 * |	dc.setParameter('addps3',333);
		 * |	unieap.debug(dc);
		 */
		setParameter: function(name, value){
			this.parameters[name] = value;
			return this;
		},

		/**
		 * @summary：
		 * 		删除body.parameters中的某个变量
		 * @param：
		 * 		 {String} name 键值名称
		 * @example：
		 * 	|	var ds= {
		 * 	|		body:{
		 * 	|			parameters:{'key1':'value1'},
		 * 	|			dataStores:{}
		 *  |		}
		 *  |	}
		 *  |	var dc=new unieap.ds.DataCenter(ds);
		 *  |	${1}dc.removeParameter('key1');
		 *  |	unieap.debug(dc);
		 *  ${1}dataCenter中的'key1'对应的参数值被移除
		 */
		removeParameter: function(name){
			delete this.parameters[name];
			return this;
		},

		/**
		 * @summary:
		 * 		取得DataCenter中的某个DataStore
		 * @param:
		 * 		{string} name
		 * 		DataStore名称
		 * @return
		 * 		{unieap.ds.DataStore}
		 * @example:
		 * |	var dcdata = {header:{code:1,message:{title:"test",detail:"This is a test!"}},body:{
		 * |		parameters:{},
		 * |  		dataStores:{ empDataStore:
		 * |  			{metaData:{attr_empno:{dataType:4},NAME:{dataType:12},attr_hiredate:{dataType:93}},
	     * |			pageSize:10,pageNumber:1,recordCount:0,dataSetName:"emp",name:"empDataStore",order:"",
		 * |  			rowSet:[],
		 * |			statistics:{attr_empno:{max: '1999',min: '272'}}}
		 * |		}
         * |	}};
         * |	var dc = new unieap.ds.DataCenter(dcdata);
         * |	${1}unieap.debug(dc.getDataStore
			("empDataStore"));
		 * 		${1}取得name为'empDataStore'的DataStore
		 */
		getDataStore: function(name) {
			return this.dataStores[name];
		},

		/**
		 * @summary:
		 * 		取得DataCenter中的第一个DataStore
		 * @description：
		 * 		场景:在只有一个DataStore,且不知道DataStore的name的情况下使用。
		 * 		在通过DataCenter做为载体请求一个DataStore时用到。
		 * @example：
		 * |	var dcdata = {header:{code:1,message:{title:"test",detail:"This is a test!"}},body:{
		 * |		parameters:{},
		 * |  		dataStores:{ ds1:
		 * |  			{metaData:{attr_empno:{dataType:4},NAME:{dataType:12},attr_hiredate:{dataType:93}},
	     * |			pageSize:10,pageNumber:1,recordCount:0,dataSetName:"ds1",name:"ds1",order:"",condition:"",
		 * |  			rowSet:[],statistics:{attr_empno:{max: '1999',min: '272'}}}
		 * |	 		},ds2:
		 * |			{pageSize:10,pageNumber:1,recordCount:0,dataSetName:"ds2",name:"ds2",order:"",condition:"",
		 * |			rowSet:[]}
         * |	}};
         * |	var dc = new unieap.ds.DataCenter(dcdata);
         * |	${1}unieap.debug(dc.getSingleDataStore());
		 *	${1}取得dc中的第一个DataStore
		 */
		getSingleDataStore:function(){
			if(this.dataStores){
				for(var name in this.dataStores){
					return this.dataStores[name];
				}
			}
			return null;
		},

		/**
		 * @summary:
		 * 		取得所有DataStore对象
		 * @description：
		 * 		DataCenter内所有DataStore对象，为hash形式
		 * @return
		 * 		{object} hash形式
		 * @example：
		 * |	var dcdata = {header:{code:1,message:{title:"test",detail:"This is a test!"}},body:{
		 * |		parameters:{},
		 * |  		dataStores:{ ds1:
		 * |  			{metaData:{attr_empno:{dataType:4},NAME:{dataType:12},attr_hiredate:{dataType:93}},
	     * |			pageSize:10,pageNumber:1,recordCount:0,dataSetName:"ds1",name:"ds1",order:"",condition:"",
		 * |  			rowSet:[],statistics:{attr_empno:{max: '1999',min: '272'}}}
		 * |	 		},ds2:
		 * |			{pageSize:10,pageNumber:1,recordCount:0,dataSetName:"ds2",name:"ds2",order:"",condition:"",
		 * |			rowSet:[]}
         * |	}};
         * |	var dc = new unieap.ds.DataCenter(dcdata);
         * |	${1}unieap.debug(dc.getDataStores());
		 * 	${1}取得dc中stores的hash对象,key值为DataStore的name
		 */
		getDataStores: function () {
			return this.dataStores;
		},



		/**
		 * @summary:
		 * 		向DataCenter中添加DataStore
		 * @description:
		 * 		如果有同名对象，则原同名对象被覆盖掉
		 * @param
		 * 		{string} name
		 * 		添加的DataStore名称
		 * @param
		 * 		{unieap.ds.DataStore} dataStore
		 * 		被添加的DataStore对象
		 * @param
		 * 		{string|Null}
		 * 		static 静态数据，数据采集时不收集该DataStore的数据
		 * 		incomplete 部分数据，codelist取回部分数据 标示codelist数据不完整
		 * 		dynamic 动态数据，用于数据收集
		 * 		不传type参数，默认数据可收集（一般可以不传这个参数）
		 * @example：
		 * |	var dc = new unieap.ds.DataCenter();
		 * |	var ds = new unieap.ds.DataStore("test");
		 * |	${1}dc.addDataStore('store1',ds)
		 * |	unieap.debug(dc);
		 * 	${1}在dc中增加名为'store1'的DataStore
		 */
		addDataStore: function (name, dataStore,type) {
			if( arguments[0] == null ) return;
			if( $.type(arguments[0] ) === "object"){
				arguments.length == 2 && (type = arguments[1]);
				dataStore = arguments[0];
				name = dataStore.getName();
			}
			dataStore.setName(name);
			type && dataStore.setType(type);
			this.dataStores[name] = dataStore;
			return this;
		},

		/**
		 * @summary：
		 * 		删除DataCenter中某DataStore
		 * @param
		 * 		{string} name
		 * 		被删除的DataStore对象的名称
		 * @example：
		 * |	var dc = new unieap.ds.DataCenter();
		 * |	var ds = new unieap.ds.DataStore("test");
		 * |	dc.addDataStore('store1',ds)
		 * |	${1}dc.removeDataStore('store1')
		 * |	unieap.debug(dc);
		 * 		${1}在dc中移除名为'store1'的DataStore
		 */
		removeDataStore: function( name) {
			delete this.dataStores[name];
			return this;
		},

		/**
		 * @summary：
		 * 		清除DataCenter里面的所有信息
		 * @description：
		 * 		清除header，parameters，dataStores
		 * @example:
		 * |	var dcdata = {header:{code:1,message:{title:"test",detail:"This is a test!"}},body:{
		 * |		parameters:{},
		 * |  		dataStores:{ ds1:
		 * |  			{metaData:{attr_empno:{dataType:4},NAME:{dataType:12},attr_hiredate:{dataType:93}},
	     * |			pageSize:10,pageNumber:1,recordCount:0,dataSetName:"ds1",name:"ds1",order:"",condition:"",
		 * |  			rowSet:[],statistics:{attr_empno:{max: '1999',min: '272'}}}
		 * |	 		},ds2:
		 * |			{pageSize:10,pageNumber:1,recordCount:0,dataSetName:"ds2",name:"ds2",order:"",condition:"",
		 * |			rowSet:[]}
         * |	}};
         * |	var dc = new unieap.ds.DataCenter(dcdata);
         * |	dc.clear()
         * |	unieap.debug(dc);
		 */
		clear: function() {
			this.header = {
				code:0,
				message:{
					title:"",
					detail:""
				}
			};
			this.parameters = {};
			this.dataStores = {};
			return this;
		},

		/**
		 * @summary：
		 * 		收集数据中心的数据和参数
		 * @example:
		 * |	${1}var pattern={
		 * |		 ${2}parameters:"all",
		 * |		 ${3}dataStores:{...},
		 * |		 ${4}exclude:{
	 	 * |		 ${5}dataStores:['ds1','ds2'],
		 * |		 ${6}parameters:['p1','p2']
		 * |		}
		 * |	}
		 * ${1}数据收据的整体格式
		 * ${2}parameters收集方式
		 * ${3}DataStore收集的方式
		 * ${4}排除的内容
		 * ${5}指定不收集的DataStore
		 * ${6}指定不收集的parameter
		 * @example:
		 * |	var dcdata = {header:{code:1,message:{title:"test",detail:"This is a test!"}},body:{parameters:
		 * |		{parameter1:"para1",parameter2:"para2"},
		 * |  		dataStores:{ ds1:
		 * |  			{metaData:
		 * |				{attr_empno:{dataType:4},NAME:{dataType:12},attr_hiredate:{dataType:93}
		 * |			},
	     * |			pageSize:10,pageNumber:1,recordCount:0,dataSetName:"ds1",name:"ds1",order:"",condition:"",
		 * |  			rowSet:[
		 * |				{attr_empno:"250",NAME:"杨作仲",attr_job:"经理",attr_sal:"1080",attr_deptno:"10",_t:1}
		 * |			],
		 * |			statistics:{attr_empno:{max: '1999',min: '272'}}},
		 * |			ds2:
		 * |			{pageSize:10,pageNumber:1,recordCount:0,dataSetName:"ds2",name:"ds2",order:"",condition:"",
		 * |			rowSet:[
		 * |				{attr_empno:"250",NAME:"大白",attr_job:"经理",attr_sal:"1080",attr_deptno:"10"}
		 * |			]}
         * |	}}};
         * |	${1}var dc = new unieap.ds.DataCenter(dcdata);
         * 	${1}生成dc对象，为以下用例的公用数据。
         * @example:
	 	 * |	${2}var pattern=null;
		 * |	unieap.debug(dc.collect(pattern));
		 *  ${2}不收集数据
		 *  @img:
		 * 		images/ds/dataCenter/collect/null.png
		 *  @example:
		 * |	${3}pattern="all"
		 * |	unieap.debug(dc.collect(pattern));
		 *  ${3}收集所有的数据和参数
		 *  @img:
		 * 		images/ds/dataCenter/collect/all.png
		 * @example:
		 * |	${4}pattern={parameters:"",dataStores:""}
		 * |	unieap.debug(dc.collect(pattern));
		 *  ${4}不收集任何数据和参数
		 *  @img:
		 * 		images/ds/dataCenter/collect/null.png
		 * @example:
		 * |	${5}pattern={parameters:"all",dataStores:"all"};
		 * |	unieap.debug(dc.collect(pattern));
		 *  ${5}收集所有的数据和参数
		 *  @img:
		 * 		images/ds/dataCenter/collect/all.png
		 * @example:
		 * |	${6}pattern={
		 * |		parameters:"all",
		 * |		exclude:{
		 * |			parameters:['parameter2']
		 * |			}
		 * |	}
		 * |	unieap.debug(dc.collect(pattern));
		 * ${6}收集除了	exclude中的parameter2之外的所有parameters
		 * @img:
		 * 		images/ds/dataCenter/collect/exPara2.png
		 *  @example:
		 * |	var rowset =dc.getDataStore("ds1").getRowSet();
		 * |	rowset.getRow(0).setRowStatus(3);
		 * |	rowset.deleteRow(0);
		 * |	dc.getDataStore("ds1").getRowSet().deleteRow(0);
		 * |	${7}pattern={
		 * |		dataStores:"delete",
		 * |		exclude:{
		 * |			dataStores:['ds2']
		 * |		}
		 * |	}
		 * |	unieap.debug(dc.collect(pattern));
		 * ${7}收集除了 exclude中的dataStores指定的ds2之外的所有DataStore,收集方式为'delete'（即收集delete缓冲区的数据）
		 *  @img:
		 * 		images/ds/dataCenter/collect/exDs2.png
		 * @example:
		 * |	dc.getDataStore("ds2").getRowSet().deleteRow(0);
		 * |	${8}pattern={
		 * |		dataStores:{
		 * |			ds1:'auto',
		 * |			ds2:'delete'
		 * |		}
		 * |	}
		 * |	unieap.debug(dc.collect(pattern));
		 * ${8}收集dataStores指定的ds1和ds2 收集方式分别为 auto（收集修改行） delete（收集删除行）
		 * @img:
		 * 		images/ds/dataCenter/collect/autoAndDel.png
		 *  @example:
		 * |	${9}pattern={
		 * |		dataStores:['ds1','ds2']
		 * |	}
		 * |	unieap.debug(dc.collect(pattern));
		 *  ${9}收集dataStores指定的ds1和ds2 ，dataStores值为数组时收集方式为默认的auto
		 *  @img:
		 * 		images/ds/dataCenter/collect/auto.png
		 * @param {object} pattern
		 * 		数据收集模式
		 * @return
		 * 		{unieap.ds.DataCenter}
		 * 		返回收集后的DataCenter对象
		 */
		collect: function(pattern){
			var dc = new DataCenter();
			if (typeof(pattern) == "undefined" || pattern == null || pattern == "" || pattern == "none"){
				return dc;
			}else{
				if ( typeof(pattern) == "string"){
					if ( pattern == "all" || pattern == "auto" ){
						this._collectParameters(dc, pattern);
						this._collectDataStores(dc, pattern);
						return dc;
					}
					pattern = JSON.parse(pattern);
				}
				this._collectParameters(dc, pattern["parameters"], pattern["exclude"]);
				this._collectDataStores(dc, pattern["dataStores"], pattern["exclude"]);
			}
			return dc;
		},


		//收集dataStore数据
		_collectDataStores: function(dc,pattern, exclude){
			if(pattern == null || pattern == "" || pattern == "none") return;
			var _dataStores = {},
				_excludeDataStores,		//需要排除的dataStores Map
				_includeDataStores;		//指定收集的stores
			dc["dataStores"] = _dataStores;
			if(exclude && exclude['dataStores']){
				_excludeDataStores = convertArrayToMap(exclude["dataStores"]);
			}
			if(typeof(pattern) == "object"){
				if(pattern instanceof Array){
					//['store1','store2','store3'],默认auto
					_includeDataStores=convertArrayToMap(pattern,"auto");
				}else{
					//{store1:'auto',store2:'delete'}
					_includeDataStores=pattern;
				}
			}
			for (var property in this.dataStores) {
				if (_excludeDataStores && _excludeDataStores[property]) continue;
				if (_includeDataStores) {
					if (_includeDataStores[property] && this.dataStores[property].canCollect()) {
						_dataStores[property] = this.dataStores[property].collect(_includeDataStores[property]);
					}
				} else {
					_dataStores[property] = this.dataStores[property].collect(pattern);
				}
			}
		},

		//收集自定义参数
		_collectParameters: function(dc,pattern, exclude){
			if (pattern == null || pattern == "" || pattern == "none")  return;
			var _excludeParameters,//排除的parameters Map对象
				_includeParameters;//需要收集的parameters Map对象
			if(exclude&&exclude['parameters']){
				_excludeParameters = convertArrayToMap(exclude["parameters"]);
			}
			if(pattern instanceof Array){
				_includeParameters = convertArrayToMap(pattern);
			}
			for(var _t in this.parameters)	{
				if(_excludeParameters&&_excludeParameters[_t]) continue;
				if(_includeParameters){
					//指定收集范围
					if(_includeParameters[_t]){
						//在收集范围之内
						dc["parameters"][_t] = this.parameters[_t];
					}
				}else{
					//否则收集所有参数
					dc["parameters"][_t] = this.parameters[_t];
				}
			}
		},

		/**
		 * @summary：
		 * 		追加一个DataCenter
		 * @param
		 * 		{unieap.ds.DataCenter} dc DataCenter对象
		 * @param
		 * 		{String} coverage ：
		 *			replace（替换）；
		 *			discard（抛弃，默认）；
		 *			append（追加记录）；
		 *			union（取记录列的并集）；
		 *			updateProps（只改变属性，用于更新统计数）。
		 * @param
		 * 		{array|null} p
		 * 		是否保留header中的节点
		 * @example：
		 * |	var dcs={header:{code:0,message:{title:"null",detail:"null"}},body:{parameters:{},
		 * |	   	dataStores:{empDataStore:
		 * |			{ pageSize:30,pageNumber:1,recordCount:5,dataSetName:"emp",name:"empDataStore",
		 * |			rowSet:[{attr_empno:"250",NAME:"杨作仲",attr_job:"经理",attr_sal:"1080",attr_deptno:"10"},
		 * |			{attr_empno:"319",NAME:"赵斌",attr_job:"软件工程师",attr_sal:"50000",attr_deptno:"10"},
		 * |			{attr_empno:"216",NAME:"陈旭杰",attr_job:"软件工程师",attr_sal:"3200",attr_deptno:"40"},
		 * |			{attr_empno:"100",NAME:"张卫滨",attr_job:"RIA主架构师", attr_sal:"5432",attr_deptno:"30"},
		 * |			{attr_empno:"10000",NAME:"赵磊",attr_job:"产品经理", attr_sal:"2222",attr_deptno:"30"}]}
		 * |	 	  }
     	 * |	}};
		 * |	${1}var dc = new unieap.ds.DataCenter(dcs);
		 * |	var dcs1 = {header:{code:0,message:{title:"null",detail:"null"}},body:{parameters:{},
		 * |  		dataStores:{ empDataStore:
		 * |  		{pageSize:10,pageNumber:1,recordCount:10,dataSetName:"emp",name:"empDataStore",
		 * | 		rowSet:[{attr_empno:"250",ename:"大白",attr_job:"项目经理",attr_sal:"1080",attr_deptno:"10"},
		 * |			{attr_empno:"319",ename:"二白",attr_job:"软件工程师", attr_sal:"50000",attr_deptno:"10"},
		 * |			{attr_empno:"216",ename:"三白",attr_job:"软件工程师", attr_sal:"3200",attr_deptno:"40"},
		 * |			{attr_empno:"100",ename:"四白",attr_job:"RIA主架构师", attr_sal:"5432",attr_deptno:"30"},
		 * |			{attr_empno:"10000",ename:"小五",attr_job:"产品经理", attr_sal:"2222",attr_deptno:"30"}]}
		 * |  		 }
  		 * |	}};
  		 * |	${2}var dc1 = new unieap.ds.DataCenter(dcs1);
  		 * ${1}生成dc对象
  		 * ${2}生成dc1对象
  		 * @example:
  		 * | 	${3}dc.append(dc1,"discard");
		 * |	unieap.debug(dc);
		 * ${3}dc中DataStore的数据不变，不被dc1中数据替代
		 * @img:
		 * 		images/ds/dataCenter/append/discard.png
  		 * @example：
  		 * |	${4}dc.append(dc1,"append");
  		 * |	unieap.debug(dc);
  		 * ${4}在dc中追加dc1中的数据，如果dc和dc1中存在同名DataStore则在dc中的DataStore追加dc1中同名DataStore的数据。
  		 * @img:
		 * 		images/ds/dataCenter/append/append.png
		 * @example:
		 * |	${5}dc.append(dc1,"replace");
		 * |	unieap.debug(dc);
		 * ${5}如果dc和dc1中存在同名DataStore，dc中的DataStore被dc1中的DataStore替代。
		 * @img:
		 * 		images/ds/dataCenter/append/replace.png
  		 * @example：
  		 * |	${6}dc.append(dc1,"union");
  		 * |	unieap.debug(dc);
  		 * ${6}合并列。要求dc和dc1中的同名DataStore行记录数相同，如果不同不做任何操作。
  		 * @img:
		 * 		images/ds/dataCenter/append/union.png
  		 * @example：
		 * |	var dcs2 = {header:{code:0,message:{title:"test",detail:"This is a test!"},age:66},
		 * |		body:{parameters:{},
		 * |  		dataStores:{ empDataStore:
		 * |  			{metaData:{attr_empno:{dataType:4},NAME:{dataType:12},attr_hiredate:{dataType:93}},
		 * |  			pageSize:10,pageNumber:1,recordCount:0,dataSetName:"emp",name:"empDataStore",
		 * |			rowSet:[],
         * |			statistics:{attr_empno:{max: '1999',min: '272'}}}
		 * |  		}
		 * |	 }};
	 	 * | 	var dc2 = new unieap.ds.DataCenter(dcs2);
 		 * | 	dc.append(dc2,${7}"updateProps",${8}["code","age"]);
 		 * ${7}将dc2中的属性信息如小计合计信息替换到dc中。
 		 * ${8}将dc2头部header中的code、age信息替换到dc中
 		 * @img:
		 * 		images/ds/dataCenter/append/updateProps.png
		 *
		 */
		append: function(dc,coverage,p){
			if(dc==this) return ;
			!p && (p=[]);
			var h = {};
			for(var i=0;p[i];i++){
				this.header[p[i]] && (h[p[i]] = this.header[p[i]]);
			}
			$.extend(this.header,dc.header || {},h);
			var _temp = dc["parameters"];
			for(var item in _temp){
				if(!(item in this["parameters"]) || coverage){
					this["parameters"][item] = dc["parameters"][item];
				}
			}
			_temp = dc["dataStores"];
			for (var item in _temp) {
				if(item in this["dataStores"]){
					this["dataStores"][item].append(dc["dataStores"][item],coverage);
					if(coverage=="replace"){
						dc["dataStores"][item] = this["dataStores"][item];
					}
				}
				else{
					this["dataStores"][item] = dc["dataStores"][item];
				}
			}
		},

		/**
		 * @summary：
		 * 		是否包含rowSet的记录集，判断指定datastore中的rowSet是否为空
		 * @param:
		 * 		{string} name
		 * 		DataStore的名称
		 * @return:
		 * 		{boolean}
		 * @example:
		 * |	var dcdata = {header:{code:1,message:{title:"test",detail:"This is a test!"}},body:{parameters:{},
		 * |  		dataStores:{ ds1:
		 * |  			{metaData:{attr_empno:{dataType:4},NAME:{dataType:12},attr_hiredate:{dataType:93}},
	     * |			pageSize:10,pageNumber:1,recordCount:0,dataSetName:"ds1",name:"ds1",order:"",condition:"",
		 * |  			rowSet:[],statistics:{attr_empno:{max: '1999',min: '272'}}}
		 * |	 		},ds2:
		 * |			{pageSize:10,pageNumber:1,recordCount:0,dataSetName:"ds2",name:"ds2",order:"",condition:"",
		 * |			rowSet:[]}
         * |	}};
         * |	var dc = new unieap.ds.DataCenter(dcdata);
         * |	${1}alert(dc.containRowSet("ds1"));
		 * 		${1}判断dc中的name为'ds1'的DataStore是否包含记录集，本例返回false
		 */
		containRowSet : function(name){
			var dataStore = this.getDataStore(name);
			if(dataStore&&!dataStore.getRowSet().isEmpty()){
				return true;
			}
			return false;
		},
		/**
		 * @summary：
		 * 		是不是空的DataCenter对象
		 * @description：
		 * 		如果parameters和dataStores的内容为空返回true
		 * @return:
		 * 		{boolean}
		 * @example:
		 * |var dcdata = {header:{code:1,message:{title:"test",detail:"This is a test!"}},body:{parameters:{},
		 * |  		dataStores:{}
         * |}};
         * |var dc = new unieap.ds.DataCenter(dcdata);
         * |alert(dc.isEmpty()); //true
		 */
		isEmpty: function(){
			var _empty = $.maf.util.isEmpty;
			return (_empty(this.parameters) && _empty(this.dataStores));
		},

		/**
		 * 将DataCenter对象序列化为json数据
		 * 此方法为了兼容原RIA写法
		 * @return {String}
		 */
		toJson: function(){
			return this.toJSON();
		},
    toBase64Json: function(){
      return new base64InOut().base64Encodes(this.toJSON());
    },

		/**
		 * @summary：
		 *		将DataCenter对象序列化为json数据
		 * @return:
		 * 		{String}
		 * @example:
		 * |	var dcdata = {header:{code:1,message:{title:"test",detail:"This is a test!"}},body:{parameters:{},
		 * |  		dataStores:{ ds1:
		 * |  			{metaData:{attr_empno:{dataType:4},NAME:{dataType:12},attr_hiredate:{dataType:93}},
	     * |			pageSize:10,pageNumber:1,recordCount:0,dataSetName:"ds1",name:"ds1",order:"",condition:"",
		 * |  			rowSet:[],statistics:{attr_empno:{max: '1999',min: '272'}}}
		 * |	 		},ds2:
		 * |			{pageSize:10,pageNumber:1,recordCount:0,dataSetName:"ds2",name:"ds2",order:"",condition:"",
		 * |			rowSet:[]}
         * |	}};
         * |	var dc = new unieap.ds.DataCenter(dcdata);
         * |	${1}alert(dc.toJson());
		 * 		${1}返回json格式的string对象
		 */
		toJSON: function(){
			var store = [],body=[],result=[];
			result.push("{");
			result.push("\"header\":");
			result.push(JSON.stringify(this.header));
			result.push(",");
			result.push("\"body\":{");
			for(var dataStore in this.dataStores){
				store.push(("\""+dataStore+"\"").concat(":").concat(this.dataStores[dataStore].toJSON()));
			}
			body.push("\"dataStores\":{".concat(store.join(",")).concat("}"));
			body.push("\"parameters\":".concat(JSON.stringify(this.parameters)));
			result.push(body.join(","));
			result.push("}}");
			return result.join("");
		},
    getSinglePrimary:function () {
      return this.getSingleDataStore().getRowSet()["primary"][0]['result']
    },
    getSinglePrimaryList:function () {
      return this.getSingleDataStore().getRowSet()["primary"];
    }
	}


	window.DataCenter = DataCenter;

	typeof(window.dataCenter) === "undefined" && ( window.dataCenter = new DataCenter() );

})(jQuery, this);


(function($, window, undefined) {

    //rowHelper对象
    var __status = {

        NEWMODIFIED: 1,
        NOTMODIFIED: 2,
        DATAMODIFIED: 3
    };

    var __buffer = {

        PRIMARY: 0,
        FILTER: 1,
        DELETE: 2
    };

    //方法定义
    //	var isEmpty = $.maf.util.isEmpty;



    var _rf = {};


    _rf._getRowStatus = function(row) {
        return row._t || __status.NOTMODIFIED;
    }
    _rf._setRowStatus = function(row, status) {
        row._t = status;
    }
    _rf._isRowSelected = function(row) {
        return (row._s == true);
    }
    _rf._setRowSelected = function(row, selected) {
        row._s = selected;
    }

    _rf._getItemValue = function(row, name) {
        return row[name];
    }
    _rf._getItemOrigValue = function(row, name) {
        if ((row._o == null) || (typeof row._o[name] == "undefined"))
            return _rf._getItemValue(row, name);
        return row._o[name];
    }
    _rf._setItemValue = function(row, name, value, nullable) {
        var old = name in row ? row[name] : null;
        value = nullable ? value : (value === "" || value === null ? null : value);
        if (old === value)
            return;
        row[name] = value;
        if (!row._o) {
            (row._o = {})[name] = old;
        } else {
            if (!(name in row._o)) {
                row._o[name] = old;
            } else
            if (value == row._o[name]) {
                delete row._o[name];
                isEmpty(row._o) && delete row._o;
            }
        }
        if (_rf._getRowStatus(row) != __status.NEWMODIFIED) {
            if (row._o) {
                _rf._setRowStatus(row, __status.DATAMODIFIED);
            } else {
                delete row._t;
            }
        }
        return true;

    }


    //	_rf._isItemChanged = function(row, name){
    //		if (!row._o || !(name in row._o)) 
    //			return false;
    //		return (row._o[name] != row[name]);
    //	}
    //	
    //	_rf._resetUpdate = function(row){
    //		delete row._t;
    //		delete row._o;
    //	}
    //	
    /**
     * Row数据行的状态信息。
     * @property {Object} status
     * @static
     * @member Row
     * Row.status的可选值为：
     * 
     * - **Row.status.NEWMODIFIED**，返回值为1，表示Row为新增数据
     * - **Row.status.NOTMODIFIED**，返回值为2，表示Row未修改
     * - **Row.status.DATAMODIFIED**，返回值为3，表示Row被修改了
     */
    Row.status = __status;

    /** 
     * @summary:
     * 		Row的构造函数
     * @param 
     * 		{unieap.ds.RowSet} rowset 
     * 		该Row对象所在的RowSet对象
     * @param
     * 		{object} data 
     * 		Row的初始化数据
     * @param 
     * 		{number} index 
     * 		该Row在RowSet中的索引，索引从0开始
     * @example：
     * |	${1}new unieap.ds.Row(rowset,{key:'value',key2:'value2'},0)
     * ${1}创建了一条数据
     */
    function Row(rowset, data, index) {

        (this.rowset = rowset) && (this._e = (rowset.onItemChanging || rowset.onItemChanged));

        this.data = data;

        this.index = index;
    }


    Row.prototype = {

        /**
         * @summary:
         *		取得当前Row对象的状态
         * @description:
         * 		unieap.ds.Status.NEWMODIFIED=1;
         * 		unieap.ds.Status.NOTMODIFIED=2;
         * 		unieap.ds.Status.DATAMODIFIED=3;
         * @return 
         * 		{Integer} 
         * 		行状态。如果该行数据没有状态标志，则默认为"未修改"状态。
         * @example:
         * |	${1}var ds=new unieap.ds.DataStore("emp",[
         * |	                               {attr_empno:"1000",NAME:"Rose",attr_job:"xx"},
         * |	                               {attr_empno:"1076",NAME:"齐衷斯",attr_job:"技术总监"}]);
         * |	
         * |	${2}function row_getRowStatus(){
         * |	    var rowset = ds.getRowSet();
         * |	    var row = rowset.getRow(0);
         * |	${3}row.setItemValue("NAME","刘德华");
         * |	    getStatus(row);
         * |	    var notModifiedRow = rowset.getRow(1);
         * |	    getStatus(notModifiedRow);
         * |	${4}rowset.addRow({attr_empno:"1003",NAME:"张靓颖",attr_job:"歌手"}); 
         * |	${5}var newRow = rowset.getRow(2); 
         * |	    getStatus(newRow);
         * |	}
         * |	function getStatus(row){
         * |	    if(row.getRowStatus()==1){
         * |	        alert("该row的状态为：NEWMODIFIED，即新增数据!");
         * |	    }else if(row.getRowStatus()==2){
         * |	        alert("该row的状态为：NOTMODIFIED，即数据没有发生变化!")
         * |	    }else if(row.getRowStatus()==3){
         * |	        alert("该row的状态为：DATAMODIFIED，即数据已被修改!");
         * |	    }
         * |	}
         * |	${6}<input type="button" name="getRowStatus" value="getRowStatus" onclick="row_getRowStatus()" />
         * ${1}定义一个DataStore
         * ${2}定义button的onclick事件
         * ${3}修改了第一行数据“NAME”字段的值
         * ${4}往rowset中添加一条记录
         * ${5}获取新增的row
         * ${6}定义一个button
         */
        getRowStatus: function() {
            return _rf._getRowStatus(this.data);
        },

        /**
         * @summary:
         * 		设置当前Row对象的状态
         * @param
         * 		{number} status 
         * 		状态标志
         * @example:
         * |	${1}var ds=new unieap.ds.DataStore("emp",[
         * |	                               {attr_empno:"1000",NAME:"Rose",attr_job:"xx"},
         * |	                               {attr_empno:"1076",NAME:"齐衷斯",attr_job:"技术总监"}]);
         * |	
         * |	${2}function row_setRowStatus(){
         * |		var rowset = ds.getRowSet();
         * |		var row = rowset.getRow(0);
         * |		unieap.debug(row);
         * |		row.setRowStatus(3);
         * |		unieap.debug(row);
         * |	}
         * |	${3}<input type="button" name="setRowStatus" value="setRowStatus" onclick="row_setRowStatus()" />
         *  ${1}定义一个DataStore
         *  ${2}定义button的onclick事件
         *  ${3}定义一个button
         */
        setRowStatus: function(status) {
            _rf._setRowStatus(this.data, status);
            return this
        },

        /**
         * @summary:
         * 		判断当前Row对象是否是被选中状态
         * @description:
         * 		选择状态是相对于页面而言，譬如页面的checkBox元素。
         * @return: 
         * 		{boolean} 
         * 		选中则为true 
         * @example:
         * |	var ds=new unieap.ds.DataStore("emp",[
         * |	               {attr_empno:"1000",NAME:"1212",attr_job:"xx"},
         * |	               {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",_s:true},   
         * |	               ${1}{attr_empno:"1002",NAME:"张韶涵",attr_job:"歌星",_s:true}]); 
         * |	var rowset = ds.getRowSet();
         * |	var row = rowset.getRow(1);
         * |	${2}alert(row.isRowSelected()); 
         * ${1}状态位_s：true 表示该row被选中
         * ${2}判断该行是否被选中，本例返回true
         */
        isRowSelected: function() {
            return _rf._isRowSelected(this.data);
        },

        /**
         * @summary:
         * 		设置当前Row对象的选择状态
         * @param 
         * 		{boolean} 
         * 		selected=true：选择，selected=false：取消选择
         * @example:
         * |	${1}var ds=new unieap.ds.DataStore("emp",[
         * |	                               {attr_empno:"1000",NAME:"Rose",attr_job:"xx"},
         * |	                               {attr_empno:"1076",NAME:"齐衷斯",attr_job:"技术总监"}]);
         * |	
         * |	${2}function row_setRowSelected(){
         * |		var rowset = ds.getRowSet();
         * |		var row = rowset.getRow(0);
         * |		unieap.debug(row);
         * |		row.setRowSelected(true);
         * |		unieap.debug(row);
         * |	}
         * |	${3}input type="button" name="setRowSelected" value="setRowSelected" onclick="row_setRowSelected()" />
         *  ${1}定义一个DataStore
         *  ${2}定义button的onclick事件
         *  ${3}定义一个button
         */
        setRowSelected: function(selected) {
            _rf._setRowSelected(this.data, selected);
        },


        /**
         * @summary:
         * 		获取Row内所有数据
         * @description:
         * 		也可以通过Row.data获取
         * @return 
         * 		{object} 
         * 		具有键值对的数据对象
         * @example:
         * |	${1} var ds=new unieap.ds.DataStore("emp",[
         * |	                                   {attr_empno:"1000",NAME:"1212",attr_job:"xx"},
         * |	                                   {attr_empno:"1076",NAME:"齐衷斯",attr_job:"技术总监"}]);
         * |	
         * |	${2}function row_getData(){
         * |		var rowset = ds.getRowSet();
         * |		var row = rowset.getRow(0);
         * |		row.getData();
         * |	}
         * |	${3}<input type="button" name="getData" value="getData" onclick="row_getData()" />
         * 	${1} 定义一个DataStore
         *  ${2}定义button的onclick事件
         *  ${3}定义一个button
         */
        getData: function(clone) {
            return clone !== false ? $.extend({}, this.data) : this.data;
        },

        /**
         * @summary:
         * 		取得当前行所属的RowSet对象
         * @description:
         * 		也可以通过Row.rowset得到
         * @return 
         * 		{unieap.ds.RowSet} 
         * 		当前行所属的RowSet对象
         * @example:
         * |	row.getRowSet();
         */
        getRowSet: function() {
            return this.rowset;
        },

        /**
         * @summary:
         * 		取得当前行所在RowSet中的索引
         * @description:
         * 		也可以通过Row.index取得
         * @return 
         * 		{number}
         *  	当前行所在的RowSet的索引
         * @example:
         * |	var ds=new unieap.ds.DataStore("emp",[
         * |	               {attr_empno:"1000",NAME:"1212",attr_job:"xx"},
         * |	               {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",_s:true},   
         * |	               ${1}{attr_empno:"1002",NAME:"张韶涵",attr_job:"歌星",_s:true}]);  
         * |	var rowset = ds.getRowSet();
         * |	 ${2}var selectedRows = rowset.getSelectedRows();   
         * |	alert(selectedRows[0].getIndex());
         * ${1}状态位_s：true 表示该row被选中
         *  ${2} 获取rowset中被选中的row数组
         */
        getIndex: function() {
            return this.index;
        },

        /**
         * @summary:
         * 		取得当前Row对象某字段的值
         * @param:
         * 		{string} name 
         * 		字段名称
         * @return:
         * 		{object}
         * 		该字段的值,如果当前Row对象没有该对应项，则返回null
         * @example:
         * |	${1}var ds=new unieap.ds.DataStore("emp",[
         * |	                               {attr_empno:"1000",NAME:"Rose",attr_job:"演员"},
         * |                               	   {attr_empno:"1076",NAME:"齐衷斯",attr_job:"技术总监"}]);
         * |	${2}var rowset = ds.getRowSet();              
         * |	${3}var row = rowset.getRow(1);               
         * |	${4}row.getItemValue("attr_job");            
         * ${1} 定义一个DataStore
         * ${2}获取rowset
         * ${3}获取第2行
         * ${4}获取第2行的attr_job字段的值，本例返回“技术总监”
         */
        getItemValue: function(name) {
            var v = null;
            return (v = _rf._getItemValue(this.data, name)) != null ? v : null;
        },

        /**
         * @summary:
         * 		取得当前Row对象某字段的原始值
         * @description:
         * 		如果该字段没有被修改过，则返回当前值
         * @param 
         * 		{string} name
         * 		字段名称
         * @return 
         * 		{object} 该字段的原始值。 
         * @example:
         * |	${1}var ds=new unieap.ds.DataStore("emp",[
         * |	                               {attr_empno:"1000",NAME:"Rose",attr_job:"xx"},
         * |	                               {attr_empno:"1076",NAME:"齐衷斯",attr_job:"技术总监"}]);
         * |	
         * |	${2}function row_getItemOrigValue(){
         * |	    var rowset = ds.getRowSet();
         * |	    var row = rowset.getRow(0);
         * |	   ${3} row.setItemValue("NAME","刘德华");                                 
         * |	    alert("修改后的值为:"+row.getItemValue()+"\n"+ "修改前的值为:"+${4}row.getItemOrigValue("NAME")); 
         * |	}
         * |	${5}<input type="button" name="getItemOrigValue" value="getItemOrigValue" onclick="row_getItemOrigValue()"/>
         * 	${1} 定义一个DataStore
         *  ${2}定义button的onclick事件
         *  ${3}修改了第一行数据“NAME”字段的值
         *  ${4}获取“NAME”字段修改之前的原始值，本例为“Rose”
         *  ${5}定义一个button
         */
        getItemOrigValue: function(name) {
            return _rf._getItemOrigValue(this.data, name);
        },

        /**
         * @summary：
         * 		给当前Row对象中的某个字段赋值。
         * @description：
         * 		如果当前Row对象中不存在该字段，则会自动创建该字段。
         * 		在执行赋值操作前后，会被该Row所在的RowSet对象的onItemChanging和onItemChanged拦截。
         * 		执行赋值操作前，会执行该Row对应的RowSet对象的onItemChanging事件，
         * 		如果自定义的onItemChanging事件存在并且返回false，则不会给Row对象赋值,并且该setItemValue返回false，后续的onItemChanged不会被执行。
         * 		执行赋值操作后，会执行该Row对应的RowSet对象的onItemChanged事件。
         * 		如果onItemChanging和onItemChanged事件均未实现，则赋值后返回true
         * @example:
         * |	var ds=new unieap.ds.DataStore("emp",[
         * |								{attr_empno:"1000",NAME:"Rose",attr_job:"xx"},
         * |								{attr_empno:"1076",NAME:"齐衷斯",attr_job:"技术总监"}]);
         * |	var rowset = ds.getRowSet();
         * |	var row = rowset.getRow(0);
         * |	row.setItemValue("attr_job","演员"); 
         * @param: 
         * 		{string} name 
         * 		字段名称
         * @param: 
         * 		value 
         * 		被赋的值
         * @param: 
         * 		{boolean}  nullable
         * 		是否为可为空
         * @return:
         * 		 {boolean}
         * 		 设置后的状态值
         */
        setItemValue: function(name, value, nullable) {
            var old = this.data[name];
            if (old === value) return false;

            //处理RowSet的自定义onItemChanging事件，只有当onItemChanging事件存在且
            //执行返回值为false时才中断赋值
            if (this._e && (this._raiseItemEvent("onItemChanging", name, value) == false))
                return false;

            //设置该字段的值
            _rf._setItemValue(this.data, name, value, nullable);

            //处理RowSet的自定义onItemChanged事件，当onItemChanging事件存在且
            this._e && this._raiseItemEvent("onItemChanged", name, value)
                //最终执行情况

            return this;
        },

        //			/**
        //			 * @summary：
        //			 * 		判断当前Row对象中某字段是否被修改过
        //			 * @param 
        //			 * 		{string} name
        //			 * 		字段名称
        //			 * @return 
        //			 * 		{boolean}
        //			 * 		false：该字段未被修改，true：该字段被修改过
        //			 * @example:
        //			 * | 	var ds=new unieap.ds.DataStore("emp",[
        //           * |                  {attr_empno:"1000",NAME:"Rose",attr_job:"xx"},
        //            * |                  {attr_empno:"1076",NAME:"齐衷斯",attr_job:"技术总监"}]);
        //			 * |	var rowset = ds.getRowSet();
        //			 * |	var row = rowset.getRow(0);
        //			 * |	${1}row.setItemValue("NAME","刘德华"); 
        //			 * |	${2}alert(row.isItemChanged("NAME"));  
        //			 * ${1} 修改了第一行数据“NAME”字段的值
        //			 * ${2}判断第一行的“NAME”字段是否被修改过，本例返回true
        //			 */
        //		isItemChanged : function(name)
        //		{
        //			return _rf._isItemChanged(this.data, name);
        //		},

        /**
         * @summary：
         * 		判断当前Row是否修改过
         * @return
         * 		{boolean}
         * 		false：该Row未被修改，true：该字段被修改过
         * @example:
         * | 	var ds=new unieap.ds.DataStore("emp",[
         * |                  	 {attr_empno:"1000",NAME:"Rose",attr_job:"xx"},
         * |                  	 {attr_empno:"1076",NAME:"齐衷斯",attr_job:"技术总监"}]);
         * |	var rowset = ds.getRowSet();
         * |	var row = rowset.getRow(0);
         * |	${1}row.setItemValue("NAME","刘德华"); 
         * |	${2}alert(row.isModified());          
         * ${1} 修改了第一行数据“NAME”字段的值
         * ${2}判断该行是否被修改过，本例返回true
         */
        isModified: function() {
            return !isEmpty(this.data["_o"]);
        },

        //			/**
        //			 * @summary：
        //			 * 		清理当前Row对象
        //			 * 		只更新数据，不做状态更新
        //			 * 		如果需要做状态更新，使用RowSet中的resetUpdate(rowIndex) 替代（需要传入row的index）。
        //			 * @description:
        //			 * 		保留最新的状态，即删除掉所有原始值
        //			 * @example:
        //			 * |	${1}var ds=new unieap.ds.DataStore("emp",[
        //			 * |	                               {attr_empno:"1000",NAME:"Rose",attr_job:"xx"},
        //			 * |	                               {attr_empno:"1076",NAME:"齐衷斯",attr_job:"技术总监"}]);
        //			 * |	
        //			 * |	${2}function row_resetUpdate(){
        //			 * |	    var rowset = ds.getRowSet();
        //			 * |	    var row = rowset.getRow(0);
        //			 * |	${3}row.setItemValue("NAME","刘德华"); 
        //			 * |	${4}rowset.addRow({attr_empno:"1003",NAME:"张靓颖",attr_job:"歌手"}); 
        //			 * |	${5}var newRow = rowset.getRow(2);
        //			 * |		unieap.debug(rowset);
        //			 * |		row.resetUpdate();
        //			 * |		newRow.resetUpdate();
        //			 * |		unieap.debug(rowset);
        //			 * |	}
        //			 * |	${6}<input type="button" name="resetUpdate" value="resetUpdate" onclick="row_resetUpdate()" />
        //			 *  ${1} 定义一个DataStore
        //			 *  ${2}定义button的onclick事件
        //			 *  ${3}修改了第一行数据“NAME”字段的值
        //			 *  ${4}往rowset中添加一条记录
        //			 *  ${5}获取新增的row
        //			 *  ${6}定义一个button
        //			 */
        //		resetUpdate : function()
        //		{
        //			_rf._resetUpdate(this.data);
        //		},

        //			/**
        //			 * @summary：	
        //			 * 		恢复当前Row的原始值
        //			 * @description
        //			 * 		去掉编辑状态
        //			 * @example:
        //			 * |	 ${1} var ds=new unieap.ds.DataStore("emp",[
        //			 * |	                                   {attr_empno:"1000",NAME:"1212",attr_job:"xx"},
        //			 * |	                                   {attr_empno:"1076",NAME:"齐衷斯",attr_job:"技术总监"}]);
        //			 * |	
        //			 * |	${2}function row_discardUpdate(){
        //			 * |	    var rowset = ds.getRowSet();
        //			 * |	    var row = rowset.getRow(0);
        //			 * |	${3}row.setItemValue("NAME","刘德华");   
        //			 * |	    unieap.debug(row);
        //			 * |	${4}row.discardUpdate(); 
        //			 * |	    unieap.debug(row);
        //			 * |	}
        //			 * |	${5}<input type="button" name="discardUpdate" value="discardUpdate" onclick="row_discardUpdate()" />
        //			 *  ${1} 定义一个DataStore
        //			 *  ${2}定义button的onclick事件
        //			 *  ${3}修改了第一行数据“NAME”字段的值
        //			 *  ${4}恢复原始值
        //			 *  ${5}定义一个button
        //			 */
        //		discardUpdate : function(){
        //			if(this.getRowStatus()==__status.DATAMODIFIED){
        //				delete this.data._t;
        //			}
        //			var orig = this.data._o;
        //			for(var p in orig){
        //				this.data[p] = orig[p];
        //			}				
        //			delete this.data._o;
        //		},

        /**
         * @summary：
         * 		清空Row内的数据
         * @description:
         * 		保留信息：选择,状态修改,原始值。
         * @example:
         * |	${1} var ds=new unieap.ds.DataStore("emp",[
         * |	                                   {attr_empno:"1000",NAME:"1212",attr_job:"xx"},
         * |	                                   {attr_empno:"1076",NAME:"齐衷斯",attr_job:"技术总监"}]);
         * |	 ${2}function row_clear(){
         * |		var rowset = ds.getRowSet();
         * |		var row = rowset.getRow(0);
         * |		unieap.debug(row);
         * |		row.clear();
         * |		unieap.debug(row);
         * |	} 
         * |	${3}<input type="button" name="clear" value="clear" onclick="row_clear()" />
         *  ${1} 定义一个DataStore
         *  ${2}定义button的onclick事件
         *  ${3}定义一个button
         */
        clear: function() {
            var _t, _s, _o;
            (_t = this.data["_t"]) && delete this.data["_t"];
            (_s = this.data["_s"]) && delete this.data["_s"];
            (_o = (this.data["_o"] || {})) && delete this.data["_o"];
            for (var item in this.data) {
                typeof(_o[item]) != "undefined" || (_o[item] = this.data[item]);
                delete this.data[item];
            }
            _s && (this.data["_s"] = true);
            if (_t == __status.NEWMODIFIED) {
                (this.data["_t"] = __status.NEWMODIFIED) && !isEmpty(_o) && (this.data["_o"] = _o);
            } else if (!isEmpty(_o)) {
                (this.data["_t"] = __status.DATAMODIFIED) && (this.data["_o"] = _o);
            }
            return this;
        },


        _raiseItemEvent: function(eventName, itemName, value) {
            if (this.rowset.applyEvent(eventName, [this, itemName, value, this.index]) == false) {
                return false;
            }
            return true;
        },

        //			/*
        //			 * @summary：
        //			 * 		得到Row数据上的某个标识的值，如在实现分组的时候，曾经增加名为_g的标识
        //			 * @description:
        //			 * 		在实现组件功能时，会使用本功能，该方法不对最终开发人员开放
        //			 * @param
        //			 * 		name 标识的名称
        //			 * @example:
        //			 * |	row.getIdentifier("_g")
        //			 * @return
        //			 *     返回指定标识对应的值
        //			 */
        //		getIdentifier:function(name){
        //			return this.data[name];
        //		},
        //			/*
        //			 * @summary：
        //			 * 		设置Row数据上某个标识的值
        //			 * @description:
        //			 * 		在实现组件功能时，会使用本功能，该方法不对最终开发人员开放
        //			 * @example:
        //			 * |	row.setIdentifier("_g",{ep:true})
        //			 * @param
        //			 * 		name 标识名称
        //			 * @param
        //			 * 		value 标识值
        //			 * 		
        //			 */
        //		setIdentifier:function(name,value){
        //			return this.data[name] = value;
        //		},
        //			/*
        //			 * @summary：
        //			 * 		移除Row数据上某个标识
        //			 * @description:
        //			 * 		在实现组件功能时，会使用本功能，该方法不对最终开发人员开放
        //			 * @example:
        //			 * |	row.removeIdentifier("_g")
        //			 * @param
        //			 * 		name 标识名称
        //			 * 		
        //			 */
        //		removeIdentifier:function(name){
        //			this.data[name] && (delete this.data[name]);
        //		}


    }

    window.Row = Row;

})(jQuery, this);

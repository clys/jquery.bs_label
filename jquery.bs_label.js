(function (jQuery) {
    var versions = "0.1";
    var pluginName = "jQuery.bs_label";
    var methods = {};
    /* private methods ------------------------------------------------------ */
    var elemPool = {};
    var callBackPool = {};
    var disabledPool = {};
    var putDisabled = function (id, boolean) {
        disabledPool[id] = boolean;
    };
    var getDisabled = function (id) {
        return disabledPool[id];
    };
    var putElem = function (id, elem) {
        elemPool[id] = elem;
    };
    var getElem = function (id) {
        return elemPool[id];
    };
    var putCallBack = function (id, fn) {
        callBackPool[id] = fn;
    };
    var getCallBack = function (id) {
        return callBackPool[id];
    };

    var disabledLabel = function (id) {
        var boolean = getDisabled(id);
        getElem(id).find('button').attr("disabled", boolean);
    };

    var click = function (e, $ele) {
        var $that;
        if (typeof $ele === "object") {
            $that = $ele;
        } else {
            $that = $(this);
        }
        $that.blur();
        var $parent = $that.parent();
        var id = $parent.attr('id');
        var dVal = $that.data('val');
        var dName = $that.html();
        var callBack = getCallBack(id);
        if (typeof callBack !== "function") {
            $.error('元素id:"' + id + '"的回调不正确');
            return false;
        }
        callBack.apply(this, [e, dName, dVal]);
    };


    var craftingTable = function (data) {
        var html = "";
        var dVal, dName, dType, aLine;
        for (var i = 0, len = data.length; i < len; i++) {
            aLine = data[i];
            dVal = aLine['val'];
            dName = aLine['name'];
            dType = aLine['type'];
            if (typeof dVal !== "undefined" && typeof dName !== "undefined" && typeof dType !== "undefined") {
                html += '<button data-val="' + dVal + '" class="pull-left btn label label-' + dType + '" style="margin: 5px;font-size: 12px;">' + dName + '</button>';
            }
        }
        return html;
    };

    jQuery.fn.bs_label = function (method) {

        if (this.size() !== 1) {
            var err_msg = "这个插件(" + pluginName + ")一次只能对一个元素使用";
            this.html('<span style="color: red;">' + 'ERROR: ' + err_msg + '</span>');
            $.error(err_msg);
        }

        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === "object" || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error("方法 " + method + "不存在于" + pluginName);
        }

    };
    /* public methods ------------------------------------------------------- */
    methods = {
        /**
         *    $('#a').bs_label({
*        //label数据
*        "data": [
*            {"val": "a", "name": "a", "type": "default"},
*            {"val": "b", "name": "b", "type": "primary"},
*            {"val": "c", "name": "c", "type": "success"},
*            {"val": "d", "name": "d ", "type": "info"},
*            {"val": "e", "name": "e", "type": "warning"},
*            {"val": "f", "name": "f", "type": "danger"}
*        ],
*        //加载后自动点击的label的val
*        "clickVal":"a",
*        //点击后的回调
*        "callBack": function (e, dName, dVal) {
*            console.log(arguments)
*        }
*    });
         */
        init: function (options) {
            var $elem = $(this);
            var tagId = $elem.attr('id');
            if (typeof tagId === "undefined") {
                $.error('元素必须具有ID');
                return false;
            }
            var data = options.data;
            var callBack = options.callBack;
            var clickVal = options.clickVal;
            if (typeof data === "undefined") {
                $.error('没有传入data');
                return false;
            }
            if (data.length === 0) {
                $.error('data为空');
                return false;
            }
            if (typeof callBack === "undefined") {
                $.error('没有传入callBack');
                return false;
            }
            putElem(tagId, $elem);
            putCallBack(tagId, callBack);
            putDisabled(tagId, false);

            $elem.html(craftingTable(data));
            $elem.addClass("clearfix");
            $elem.unbind();
            $elem.find('button').unbind('click');
            $elem.find('button').on('click', click);
            if (typeof clickVal !== "undefined") {
                methods.checked.apply(this, [clickVal]);
            }

            return $elem;
        },
        /**
         * 选中一个tag
         * @param val tag的val
         * @returns {*}
         */
        checked: function (val) {
            var $elem = $(this);
            var id = $elem.attr('id');
            if (typeof id === "undefined") {
                $.error('元素必须具有ID');
                return false;
            }
            var $ele = getElem(id);
            if (typeof $ele !== "object") {
                $.error('Id:' + id + '并没有被' + pluginName + '接管');
                return false;
            }
            var $tag = $ele.find('[data-val="' + val + '"]');
            if ($tag.length === 0) {
                $.error('val:"' + val + '"在Id:"' + id + '"中不存在');
                return false;
            }
            click.apply(this, [pluginName + '.code.checked', $tag]);
            return $elem;
        },
        disable: function (boolean) {
            var $elem = $(this);
            var id = $elem.attr('id');
            if (typeof id === "undefined") {
                $.error('元素必须具有ID');
                return false;
            }
            var $ele = getElem(id);
            if (typeof $ele !== "object") {
                $.error('Id:' + id + '并没有被' + pluginName + '接管');
                return false;
            }
            if (typeof boolean === "boolean") {
                putDisabled(id, boolean);
            } else {
                putDisabled(id, !getDisabled(id));
            }
            disabledLabel(id);
        },
        v: function () {
            return versions;
        }
    };
})(jQuery);
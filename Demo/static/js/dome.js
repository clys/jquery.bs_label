$(function () {
    DomeWebController.init();
});


DomeWebController = {
    pool: {
        element: {}
    },
    getEle: function (k) {
        return this.pool.element[k];
    },
    setEle: function (k, v) {
        DomeWebController.pool.element[k] = v;
    },
    init: function () {
        DomeWebController.inits.element();
        DomeWebController.inits.event();

    },
    inits: {
        element: function () {
            DomeWebController.setEle("$data",$("#show_data_1"));
            $("#dome").bs_label({
                //label数据
                "data": [
                    {"val": "a", "name": "a", "type": "default"},
                    {"val": "b", "name": "b", "type": "primary"},
                    {"val": "c", "name": "c", "type": "success"},
                    {"val": "d", "name": "d ", "type": "info"},
                    {"val": "e", "name": "e", "type": "warning"},
                    {"val": "f", "name": "f", "type": "danger"}
                ],
                //加载后自动点击的label的val
                "clickVal": "a",
                //点击后的回调
                "callBack": function (e, dName, dVal) {
                    console.log(arguments);
                    DomeWebController.getEle("$data").html("e:"+ e+"<br/>name:"+dName+"<br/>val:"+dVal);
                }
            });
        },
        event: function () {

        }

    }
};
```
使用方法:unamused:

初始化:
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
    }
});
选择一个标签
$("#dome").bs_label("checked","f")
切换禁用
$("#dome").bs_label("disable"[,true/false])
```
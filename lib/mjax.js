var mjax = {
    version: '1.0.0',
    url: "inc/",
    mjxfnc: '',
    datas: [],
    init: function (config) {
        this.datas = [];
        this.mjxfnc = config.mjxfnc;
        if (typeof config.params == 'object') {
            this.paramsAdd(config);
        }
        this.f();
    },
    paramsAdd: function (config) {
        var obj = $.parseJSON('[' + JSON.stringify(config.params) + ']')[0];

        if (obj[0] != undefined) {
            var self = this;
            $(obj).each(function (k, v) {
                let key = v.name;
                let val = v.value;
                self.datas.push({name: key, value: val});
            });
        } else {

            Object.entries(obj).forEach(entry => {
                let key = entry[0];
                let val = entry[1];

                if (typeof val == 'object' && val != null) {
                    if (val[0] == undefined) {
                        Object.entries(val).forEach(e => {
                            let k = e[0];
                            let v = e[1];
                            this.datas.push({name: k, value: v});
                        });
                    } else {
                        var self = this;
                        if (typeof val[0] == 'object') {
                            $(val).each(function (k, v) {
                                let key = v.name;
                                let val = v.value;
                                self.datas.push({name: key, value: val});
                            });
                        } else {
                            var ItemArray = [];

                            $(val).each(function (k, v) {
                                ItemArray.push(k + '=>' + v);
                            });

                            self.datas.push({
                                name: key,
                                value: [ItemArray]
                            });
                        }
                    }
                } else {
                    this.datas.push({name: key, value: val});
                }
            });
        }
    },
    f: function () {
        if (this.url) {
            $.ajax(this.url, {
                type: "POST",
                dataType: "json",
                data: this.getData(),
                beforeSend: this.bs.bind(this),
                error: this.err.bind(this),
                success: this.succ.bind(this),
                statusCode: {
                    404: this.sc.bind(this)
                }
            });
        }
    },
    getformData: function (FormID) {
        return $('#' + FormID).serializeArray();
    },
    getData: function () {
        this.datas.push({name: 'mjxfnc', value: this.mjxfnc});
        return this.datas;
    },
    bs: function (data) {
        /*console.log("bs", data);*/
    },
    err: function (data) {
        /*console.log("err", data);*/
    },
    succ: function (data) {
        this.cb(data);
    },
    sc: function (data) {
        /*console.log("sc", data);*/
    },
    cb: function (data) {
        var dt = [], d = 0;
        $(data.data.confirm).each(function (k, v) {
            var r = confirm(v.mess);
            if (r == true) {
                dt.push({name: 'ConfirmOnay', value: 1});
                d = 1;
            }
        });
        if (d == 1) {
            this.datas.push(dt[0]);
            mjax.f();
        }
        $(data.data.alert).each(function (k, v) {
            alert(v.toString());
        });
        $(data.data.script).each(function (k, v) {
            eval(v.toString());
        });
        $(data.data.assign).each(function (k, v) {
            if (v.action == 'css') {

            }
            eval("$('" + v.selector + "')." + v.action + "(" + (v.action == 'css' ? "" + v.data + "" : "`" + v.data + "`") + ");");
        });
        $(data.data.redirect).each(function (k, v) {
            window.location.href = v;
            return;
        });
    },
}

function mjx(fnc, params) {
    mjax.init({
        params: params,
        mjxfnc: fnc,
    });
}

/* auto selector */
(function ($) {

    /* Auto Submit Form click Selector*/
    $('body').on('click', '[mjx-fnc]', function () {
        var fnc = $(this).attr("mjx-fnc");
        var frmdata = $(this).parents().find('form').serializeArray();
        mjx(fnc, frmdata);
    });


})(jQuery);

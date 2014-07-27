SheetyNotifications = (function(){

    SheetyNotifications = {};
    SheetyNotifications.funcs = [];
    SheetyNotifications.min_col = 1;
    

    SheetyNotifications.setup = function(sheetyfs){
        this.fs = sheetyfs;
    };

    SheetyNotifications.register = function(f){
        this.funcs.push(f);
    }

    SheetyNotifications.start = function(timeout){
        var that = this;
        that.start_inner(that);
        setInterval(function(){that.start_inner(that)}, timeout);
    }

    SheetyNotifications.start_inner = function(that){
        row_str = that.fs.getRow(that.min_col);    
        console.log(row_str);
        rows = [];
        for (i = 0; i < row_str.length; i++){
            rows.push(JSON.parse(row_str[i]));
        }
        for (i = 0; i < that.funcs.length; i++){
            that.funcs[i](rows);
        }
        that.min_col = that.min_col + rows.length;

    };

    return SheetyNotifications;

})();

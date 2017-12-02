$((function () {
    var $doc = $(document),
        $oUl = $("#list").find("ul"),
        $alert=$("#alert"),
        length = 125,
        roX = 0,
        roY = 0,
        trZ = -1500;
    addLi();
    setTimeout(Table,200);//延迟执行Grid,避免覆盖transform，失去过渡效果

    //document注册事件
    $doc.on("selectstart dragstart",false);
    $doc.mousewheel(function (e,d) {
       trZ+=d*80;
        $oUl.css("transform","translateZ("+trZ+"px) rotateX("+roX+"deg) rotateY("+roY+"deg)");
    });
    $doc.mousedown(function (e) {
        var dX=e.clientX,
             dY=e.clientY,
             rX=roX,
             rY=roY;
        $doc.mousemove(function (e) {
                rX = roX + (e.clientX-dX)*0.1;//鼠标X方向移动，Y轴转动
                rY = roY - (e.clientY-dY)*0.1;//鼠标Y方向移动，X轴转动
                $oUl.css("transform","translateZ("+trZ+"px) rotateX("+rY+"deg) rotateY("+rX+"deg)");
        })
        $doc.mouseup(function () {
            roX = rX;
            roY = rY;
            $doc.off("mousemove mouseup");
        })
    })
    //注册左下角btn事件
    $("#btn>ul").on("click","li",function () {
        switch ($(this).html()){
            case "Grid":Grid();
                break;
            case "Helix":Helix();
                break;
            case "Sphere":Sphere();
                break;
            case "Table":Table();
            default:break;
        }
    })
    //注册list的事件
    $oUl.on("click","li",function (e) {
        $alert.show();
    })
    //注册弹窗close事件
    $alert.find(".close").click(function () {
            $alert.hide();
    })

    function addLi() {
        for (var i = 0; i < length; i++) {
            var $oLi = $("<li></li>"),
                 x = i % 5,
                 y = Math.floor(i % 25 / 5),
                 z = Math.floor(i / 25);
            $oLi.html("x:" + x + " y:" + y + " z:" + z);

            var tX = Math.random() * 6000 - 3000,
                tY = Math.random() * 6000 - 3000,
                tZ = Math.random() * 6000 - 3000;

            $oLi.css("transform", "translate3D(" + tX + "px," + tY + "px," + tZ + "px)");
            $oUl.append($oLi);
        }
    }
    //Grid 叠层式布局
    function Grid() {
        $alert.hide();
        var disX = 350,//每个li 水平（x）方向的间距
             disY = 350,//每个li 垂直（y）方向的间距
             disZ = 500;//每个li 纵深（z）方向的间距
        $oUl.children().each(function (index) {
            var x = ( index % 5 - 2) * disX,
                y = ( Math.floor(index % 25/5) - 2) * disY,
                z = ( Math.floor(index / 25) -2)* disZ;
            $(this).css("transform","translate3D("+x+"px,"+y+"px,"+z+"px)");
        })
    }
    function Helix() {
        $alert.hide();
            var h = 3.7,//环数
                tY = 7,//每个li上下位移相差
                num = Math.round(length/h),//每环个数
                deg = 360 / num,//每个li Y旋转相差
                mid = length/2 - 0.5;//找准中间点
            $oUl.children().each(function (index){
                $(this).css("transform","rotateY("+index*deg+"deg) translateY("+(index-mid)*tY+"px) translateZ(800px)");
            })
    }
    //Sphere 球状布局
    function Sphere() {
        $alert.hide();
            var arr = [1,3,7,9,11,14,21,16,12,10,9,7,4,1],
                arrLength = arr.length,
                xDeg = 180 / (arrLength-1);

            $oUl.children().each(function (index){
                //求出当前 index 处于arr的第几层 第几个
                var numC = 0 , numG = 0;
                var arrSum = 0;
                for (var j = 0; j < arrLength; j++) {
                    arrSum += arr[j];
                    if ( arrSum > index ){
                        numC = j;
                        numG = arr[j] - (arrSum - index);
                        break;
                    }
                }
                var yDeg = 360 / arr[numC];
                $(this).css("transform","rotateY("+(numG+1.3)*yDeg+"deg) rotateX("+(90-numC*xDeg)+"deg) translateZ(800px)")
            })
    }
    //Table 元素周期表布局
    function Table() {
        $alert.hide();
            var n = Math.ceil(length / 18) + 2;
            var midY = n / 2 - 0.5;
            var midX = 18 / 2 - 0.5;
            var disX = 170;
            var disY = 210;

            var arr = [
                {x : 0, y : 0},
                {x : 17, y : 0},
                {x : 0, y : 1},
                {x : 1, y : 1},
                {x : 12, y : 1},
                {x : 13, y : 1},
                {x : 14, y : 1},
                {x : 15, y : 1},
                {x : 16, y : 1},
                {x : 17, y : 1},
                {x : 0, y : 2},
                {x : 1, y : 2},
                {x : 12, y : 2},
                {x : 13, y : 2},
                {x : 14, y : 2},
                {x : 15, y : 2},
                {x : 16, y : 2},
                {x : 17, y : 2}
            ];

            $oUl.children().each(function (index) {
                var x,y;
                if ( index < 18 ){
                    x = arr[index].x;
                    y = arr[index].y;
                }else{
                    x = index%18;
                    y = Math.floor(index/18)+2;
                }
               $(this).css("transform","translate3D("+(x-midX)*disX+"px,"+(y-midY)*disY+"px,0px)")
            })
        }
})())
$(function () {
    var pages = $('.page');
    var winWidth = window.innerWidth;
    var winHeight = window.innerHeight;
    if (winWidth/winHeight > 0.62) {
        pages.css({
            height: winWidth / 0.62 + 'px'
        });
    }

    //预加载===============================================================
    // var car = $('.loading_car');
    // var loadingArr = ['loading_bg.png', 'loading_car.png'];
    // var loaded = 0;
    // var toload = loadingArr.length;
    // for (var i = 0; i < loadingArr.length; i++) {
    //     var img = new Image();
    //     img.onload = function () {
    //         loaded++;
    //         car.css({
    //             left: loaded / toload * 100 + '%'
    //         });
    //         if (loaded == toload) {
    //             pages.eq(0).hide();
    //             pages.eq(1).show();
    //         }
    //     };
    //     img.src = 'img/' + loadingArr[i];
    // }



    //开始页面===============================================================
    var startBtn = $('.facePage4');
    startBtn.on('click', function () {
        pages.eq(1).hide();
        pages.eq(2).show();
    })


    //答题页面===============================================================

    var titleImg = $('.carpool figure img');    //获取答题的图
    var btns = $('.txt li').children();    //获取下边8个按钮
    var popup = $('.popup');

    var pass = 1;       //定义当前关卡是第一关

    var arr1 = [5, 8];      //第一关正确下标数组
    var arr2 = [2, 1, 8];      //第二关正确下标数组
    var allArray = [arr1, arr2];
    // console.log(allArray[pass-1].toString());
    // console.log(allArray[0]);

    function game(pass) {

        //清空题，输出的文字，下边 8 个按钮上的字
        titleImg.attr('src', '');
        $('.tenges ul').html('');
        btns.attr('src', '');

        //创建答题图标
        titleImg.attr('src', 'img/carpoolPage_matter_'+pass+'.png');

        //创建答题要显示的文字框
        for (var i = 0; i < allArray[pass-1].length; i++) {
            var li = $('<li><img src="" alt="" /></li>');
            li.appendTo($('.tenges ul'));
        }

        //创建下边 8 个按钮的字
        for (var i = 1; i <= btns.length; i++) {
            btns[i-1].src = 'img/carpool_text_'+pass+'_'+i+'.png';
        }


        var tenges = $('.tenges li').children();   //获取田字格中的图
        var tengesLength = tenges.length;   //田字格的个数



        var oldSub = null;      //上一次点的下标
        var num = -1;   //在第几个方格里输出内容
        var indexArr = [];      //下标数组，以方便判断

        var timeoutTimer1 = null;
        var timeoutTimer2 = null;

        btns.on('click', function () {
            var btnsIndex = $(this).parent().index();
            //上一次和本次点击的不是一个按钮才执行
            if (oldSub != btnsIndex) {
                oldSub = btnsIndex;
                num++;
                var index = btnsIndex + 1;
                indexArr.push(index);
                //判断是否超出田字格的个数
                if (num < tengesLength) {
                    tenges.get(num).src = 'img/carpool_answer_'+pass+'_'+index+'.png';
                    tenges.eq(num).css({
                        width: '3.5rem'
                    });
                }
                //每个方格里都有内容了，开始判断
                if (num == tengesLength - 1) {
                    // 开始进行判断
                    console.log(allArray[pass-1].toString());
                    console.log(indexArr.toString());
                    if (allArray[pass-1].toString() == indexArr.toString()) {
                        //相等
                        timeoutTimer1 = setTimeout(function () {
                            $('.popup').show().css({
                                'background-image': 'url(img/true_'+pass+'.png)',
                                'background-size': '100% 100%'
                            });
                            timeoutTimer2 = setTimeout(function () {
                                popup.hide();
                                pass++;
                                game(pass);
                            }, 2000);
                        }, 1000);
                    } else {
                        //不相等
                        $('.picture').get(0).src = 'img/carpoolPage_error_1.png';
                        timeoutTimer1 = setTimeout(function () {
                            popup.show().css({
                                'background-image': 'url(img/false_'+pass+'.png)',
                                'background-size': '100% 100%'
                            });
                            timeoutTimer2 = setTimeout(function () {
                                popup.hide();
                                pass++;
                                game(pass);
                            }, 2000);
                        }, 1000);
                    }
                }
            }
        })
    };
    game(pass);






})

//手机端屏幕
// //重要！禁止移动端滑动的默认事件
// document.body.addEventListener('touchmove', function (event) {
//     event = event ? event : window.event;
//     if (event.preventDefault) {
//         event.preventDefault()
//     } else {
//         event.returnValue = false
//     }
// }, false)
var pages = function (obj) {
    var box = document.getElementById(obj.wrap);
    var box2 = document.getElementById(obj.wrap2);
    var len = obj.len;
    var n = obj.n;
    var startY, moveY, cliH;
    //获取屏幕高度
    var getH = function () {
        cliH = document.body.clientHeight
    };
    getH();
    window.addEventListener('resize', getH, false);
    //touchStart
    var touchstart = function (event) {
        if (!event.touches.length) {
            return;
        }
        startY = event.touches[0].pageY;
        moveY = 0;
    };
    //touchMove
    var touchmove = function (event) {
        if (!event.touches.length) {
            return;
        }
        moveY = event.touches[0].pageY - startY;
        box2.style.transform = 'translateY(' + (-n * cliH + moveY) + 'px)'; //根据手指的位置移动页面
    };
    //touchEnd
    var touchend = function (event) {
        //位移小于+-50的不翻页
        if (moveY < -50) n++;
        if (moveY > 50) n--;
        //最后&最前页控制
        if (n < 0) n = 0;
        if (n > len - 1) n = len - 1;
        //重定位
        box2.style.transform = 'translateY(' + (-n * 10) + '%)'; //根据百分比位置移动页面
        console.log(n)
    };
    //touch事件绑定
    box.addEventListener("touchstart", function (event) {
        touchstart(event)
    }, false);
    box.addEventListener("touchmove", function (event) {
        touchmove(event)
    }, false);
    box.addEventListener("touchend", function (event) {
        touchend(event)
    }, false);
};
pages({
    wrap: 'wrap', //.wrap的id
    wrap2: 'wrap2', //.wrap2的id
    len: 11, //一共有几页
    n: 0 //页面一打开默认在第几页？第一页就是0，第二页就是1
});

//在一起时间
//动态时间显示
setInterval(function () {
    var time = new Date();
    var year = time.getFullYear()-2018;  //获取年份
    var month = time.getMonth() + 1-6;  //获取月份
    var day = time.getDate()-8;   //获取日期
    var hour = checkTime(time.getHours());   //获取时
    var minite = checkTime(time.getMinutes());  //获取分
    var second = checkTime(time.getSeconds());  //获取秒
    //检查天数或者月份是否为负数
    if (day < 0) {
        month = month - 1;
        if (month == 1 || month== 3 || month==5 || month==7 || month==8 || month==10 || month==12)
            day = 31 + day;
        else if (month == 2)
            day = 29 + day;
        else
            day = 30 + day;
    }
    if (month <0) {
        year = year -1;
        month = 12 + month;
    }
    /****当时、分、秒、小于10时，则添加0****/
    function checkTime(i) {
        if (i < 10) return "0" + i;
        return i;
    }
    //宝贝多大了
    var time1 = new Date();
    var year1 = time1.getFullYear()-2000;  //获取年份
    var month1 = time1.getMonth() + 1-6;  //获取月份
    var day1 = time1.getDate()-29;   //获取日期
    //检查天数或者月份是否为负数
    if (day1 < 0) {
        month1 = month1 - 1;
        if (month1 == 1 || month1== 3 || month1==5 || month1==7 || month1==8 || month1==10 || month1==12)
            day1 = 31 + day1;
        else if (month1 == 2)
            day1 = 29 + day1;
        else
            day1 = 30 + day1;
    }
    if (month1 <0) {
        year1 = year1 -1;
        month1 = 12 + month1;
    }
    /****当时、分、秒、小于10时，则添加0****/
    function checkTime(i) {
        if (i < 10) return "0" + i;
        return i;
    }
    var box = document.getElementById("time");
    //var x = document.getElementById("myAudio").autoplay;
    box.innerHTML = '我们在一起'+year + "年" + month + "个月" + "零"+day + "天" + hour + "小时" + minite + "分钟" + second+"秒啦"
        +"<br/>"+"你已经"+year1+"岁"+month + "个月" + "零" +day + "天了哦宝贝" +"👇";
}, 1000);     //setInterval(fn,i) 定时器，每隔i秒执行fn

// xuankuziti
const signs = document.querySelectorAll('x-sign')
const randomIn = (min, max) => (
    Math.floor(Math.random() * (max - min + 1) + min)
)

const mixupInterval = el => {
    const ms = randomIn(2000, 4000)
    el.style.setProperty('--interval', `${ms}ms`)
}

signs.forEach(el => {
    mixupInterval(el)
    el.addEventListener('webkitAnimationIteration', () => {
        mixupInterval(el)
    })
})

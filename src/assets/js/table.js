import jquery from 'jquery';
$("dl dt").click(function () {

    //点击一级菜单，显示当前下面的二级菜单，再次点击隐藏当前下面的二级菜单
    $(this).nextUntil("dt").slideToggle();

    //需求： 点击一级菜单，隐藏其他的二级菜单
    $(this).siblings("dt").nextUntil("dt").slideUp();

    //需求： 点击一级菜单，对应的图标进行切换

        //获取当前对象下面的图标
        let val = $("span",this).html();
        //判断图标
        if(val === "+"){
            //展开：图标为-
            $("span",this).html("-");
        }else{
            //关闭：图标为+
            $("span",this).html("+");
        }

        //其他菜单下面的图标变为+
        $(this).siblings("dt").find("span").html("+")


});
$(function(){
    // $(".lists").on('click','.duigou',function(){
    //     $('.tanchuang').addClass("tanchuang1");
    //     })
    // $('.tanchuang').on('click',function(){
    //     $('.tanchuang').removeClass("tanchuang1");
    // })
    //1.
    var todos=[];
    if(localStorage.todo_data){
        todos=JSON.parse(localStorage.todo_data);
        render();
    }else{
        localStorage.todo_data=JSON.stringify(todos);
    }
    function render() {
        $('.lists').empty();
        $.each(todos,function(i,v){
            $("<li class='lis'><div class='shang'><div class='books iconfont icon-zhizhang5'></div><div class='neirong'>"+v.title+"</div><input type='text' class='inputs'><div class='duigou iconfont icon-xuanzhong'></div></div><div class='xia'> <div class='more iconfont icon-more1170511easyiconnet'></div><div class='tanchu'><ul><li class='li1'></li ><li class='li2'></li><li class='li3'></li><li class='li4'></li></ul></div></div></li>")
                .addClass(function(){
                    if(v.status==0){
                        return 'done';
                    }
                })
                .appendTo(".lists")
        })
    }
    function add(a){
        todos.push({title:a,status:1,iDEL:0})
        localStorage.todo_data=JSON.stringify(todos);
        render();
    }
    var s=0;
    $('.tianjia').on('touchend',function(){
        // $('.lists').empty();
        s+=1;
        $('.bian').text(s);
        var a=$("input").val();
        add(a);
        $('input').val('');
        // var neirong=$('.neirong').val();
        // todos.push({title:"a",status:1,iDEL:0})
        // localStorage.todo_data=JSON.stringify(todos);
        // render();
    })

    var left=null;
    $('.lists').on("touchstart" , '.lis',function (e) {
        left=e.originalEvent.changedTouches[0].pageX;
    })
    $('.lists').on("touchend" , '.lis',function (e) {
        $(this).css("transition","transform 1s ease");
        $(this).css("transform","translate3d(0,0,0)");
        $(this).delay(800).queue(function(){
            $(this).css('transition','none').dequeue();
        });
        var n=e.originalEvent.changedTouches[0].pageX;
        if((n>left)&&(n-left)>40){
            $(this).addClass('done');
            var i=$(this).index();
            todos[i].status=0;
            localStorage.todo_data=JSON.stringify(todos);
        }
    })
    $('.lists').on("touchmove" , '.lis',function (e) {
        var n=e.originalEvent.changedTouches[0].pageX;
        var x=n-left;
        // console.log(x)
        $(this).css("transform","translate3d("+x+"px,0px,0px)");
    })
    //删除
    $('.lists').on('touchstart','.duigou',function(){
        s-=1;
        $('.bian').text(s);
        var i=$(this).closest('li').index();
        todos.splice(i,1);
        localStorage.todo_data=JSON.stringify(todos);
        $(this).closest('li').addClass('feichu');
        $(this).closest('li').delay(500).queue(function(){
            $(this).remove().dequeue();
        })
    })
    //修改
    $('.lists').on('click',".lis .neirong",function(){
        console.log(this);
        $(this).parent().find('.inputs').css('display','block');
        $(this).parent().find('.inputs').val($(this).text());
        $(this).text('');
        $(this).parent().find('.inputs').blur(function(){
            todos[$(this).closest('li').index()].title=$(this).val();
            $(this).parent().find('.neirong').text($(this).val());
            $(this).css('display','none');
            localStorage.todo_data=JSON.stringify(todos);
        })
    })

    $('.top').on('click',".icon",function(){
       $('.cebian').addClass('cebian1')
    })
    $('.content').on('click',function(){
        $('.cebian').removeClass('cebian1')
    })
    $('.shezhi').on('click',function(){
        $('.cebian').removeClass('cebian1')
    })
    $('.geren').on('click',function(){
        $('.cebian').removeClass('cebian1')
    })
    $('.chengzhang').on('click',function(){
        $('.cebian').removeClass('cebian1')
    })
    $('.guidang').on('click',function(){
        $('.cebian').removeClass('cebian1')
    })
    $('.tuichu').on('click',function(){
        $('.cebian').removeClass('cebian1')
    })
    $('.search').on('click',function(){
        $('.cebian').removeClass('cebian1')
    })

    $('.left2').on('click',function(){
        $('.gerengongzuo').addClass('gerengongzuo1');
    })
    $('.content').on('click',function(){
        $('.gerengongzuo').removeClass('gerengongzuo1')
    })

    $('.gong').on('click',function(){
        $('.gerengongzuo').removeClass('gerengongzuo1');
        $('.left2 .geren').text('工作');
        $('this').css({background:'blue'});
        $('ge').removeClass('.ge1')
    })
    $('.ge').on('click',function(){
        $('.gerengongzuo').removeClass('gerengongzuo1');
        $('.left2 .geren').text('个人');
    })
    $('.gerengongzuo').on('click',function(){
        $('.gerengongzuo').removeClass('gerengongzuo1');
    })
    $('.richen').on('click',function(){
        $(this).css({background:'#ccc'},
            {color:'black'});
        $(".bianqian").css({background:'#fff'},{color:'#ccc'});
        // $('.bot').css({display:'block'})
        $('.bot').removeClass('bott')
    })
    $('.bianqian').on('click',function(){
        $(this).css({background:'#ccc'},
            {color:'black'});
        $(".richen").css({background:'#fff'},{color:'#ccc'});
        // $('.bot').css({display:'none'})
        $('.bot').addClass('bott')
    })
    $('.left3').on('click',function () {
        $('.search').css({display:'none'})
        $('.top').css({display:'none'});
        $('.content .fanhui').css({display:'block'});
        $('.content span').css({opacity:"0"});
         $('.content').css({height:'20rem'})
    })
    $('.fanhui').on('click',function(){
        $('.search').css({display:'block'})
        $('.top').css({display:'block'});
        $('.content .fanhui').css({display:'none'});
        $('.content span').css({opacity:"1"});
    })
    $('.lists').on('click','.more',function () {
        $(this).parent().find('.tanchu').addClass('tanchu1');
    })
    $('.lists').on('click','.tanchu',function () {
        // $(this).removeClass('tanchu1');
        $(this).parent().find('.tanchu').removeClass('tanchu1');
    })
})

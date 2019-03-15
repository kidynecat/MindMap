
import * as $ from 'jquery'

 class SysMethod {

    public IsNeedReflash:boolean = false
    constructor(){

    }
    public reflashCanvas(){


        if(this.IsNeedReflash)
        {
            
            document.getElementById("canvas1").setAttribute("width",document.body.scrollWidth.toString())
            document.getElementById("canvas1").setAttribute("height",$('#canvasContent').height().toString())

            // this.drawline(50,250,100,100)
            // this.drawline(50,250,100,200)
            

            //alert($('#labelroot').next().children.length)
            this.loopdrawline($('#labelroot'))

            this.IsNeedReflash = false
            console.log('has reflashed')
        }
    }



    //递归画（使用jquery方式做） todo：改为angular方式子组件递归
    loopdrawline( je:JQuery<HTMLElement> = $('#labelroot')){
        //获取自己的坐标
        let jtop = je.offset().top
        let jleft = je.offset().left
        let jwidth = je.outerWidth()
        let jheight = je.outerHeight()

        let sx = jleft + jwidth
        let sy = jtop + jheight/2

        let mthis = this


        //console.log(je.children())
        //循环自己的子元素
        $.each(je.next().children(),function(i,n){
            let ctop = $(n).children().first().children().first().offset().top
            let cleft = $(n).children().first().children().first().offset().left
            let cheight = $(n).children().first().children().first().outerHeight()

            let ex = cleft
            let ey = ctop + cheight/2

            mthis.drawline(sx,sy,ex,ey)
            mthis.loopdrawline($(n).children().first().children().first())
        })
    }


    drawline(sx:number,sy:number,ex:number,ey:number){
        let c = document.getElementById("canvas1")  as HTMLCanvasElement;
        let ctx = c.getContext("2d");
    
        ctx.beginPath();
        ctx.moveTo(sx,sy);
        ctx.bezierCurveTo(sx+30,sy,ex-30,ey,ex,ey);
        ctx.stroke();
    }
}

export default new SysMethod()
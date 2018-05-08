let socket=io();
$(function()
{
    let color='#000000';
    let Eraser_on=false;
    let Drawing_square=false;
    let Drawing_Shape_X=-1;
    let Drawing_Shape_Y=-1;
    let Drawing_circle=false;
    let Drawing_Line=false;
    /**used by fillRect**/
    let Drawing_width=5;
    let Drawing_height=5;
    let ArrX=[];
    let ArrY=[];
    /** ---- --  ***/
    let canvas=document.getElementById('Drawing_container');
    $canvas=$('#Drawing_container');
  let ctx=canvas.getContext('2d');
  /**the adjustments**/
    let DomRect=canvas.getBoundingClientRect();
    /** --- **/
  console.log(ctx);

  let MousePressed=false;

  canvas.onmousedown=function(e)
  {
      MousePressed=true;
      console.log("Mouse Down = "+e.clientX+" "+e.clientY);
      if(Drawing_square||Drawing_circle||Drawing_Line)
      {
          ctx.moveTo(e.clientX-DomRect.left,e.clientY-DomRect.top);
          Drawing_Shape_X=e.clientX-DomRect.left;
          Drawing_Shape_Y=e.clientY-DomRect.top;
          ArrX.push(Drawing_Shape_X);
          ArrY.push(Drawing_Shape_Y);
      }
  };

  canvas.onmouseup=function(e)
  {
    MousePressed=false;
      let Current_X=e.clientX-DomRect.left;
      let Current_Y=e.clientY-DomRect.top;
    console.log("Mouse Up = "+e.clientX+" "+e.clientY);
    if(Drawing_square)
    {
        ctx.fillStyle=color;
        ctx.fillRect(Drawing_Shape_X,Drawing_Shape_Y,Math.abs(Drawing_Shape_X-Current_X),Math.abs(Drawing_Shape_Y-Current_Y));
        ArrX=[];
        ArrY=[];
    }
    if(Drawing_circle)
    {
        ctx.fillStyle=color;
        ctx.beginPath();
        ctx.arc(Drawing_Shape_X,Drawing_Shape_Y,Math.abs(Drawing_Shape_X-Current_X),0,2*Math.PI);
        ctx.fill();
        ctx.closePath();
        ArrX=[];
        ArrY=[];
    }
    if(Drawing_Line)
    {
        ctx.strokeStyle=color;
        ctx.beginPath();
        ctx.moveTo(Drawing_Shape_X,Drawing_Shape_Y);
        ctx.lineTo(Current_X,Current_Y);
        ctx.stroke();
        ArrX=[];
        ArrY=[];
        ctx.closePath();
    }
    // if(Drawing_circle)
    // {
    //     ctx.fillStyle=color;
    //     let Current_X=e.clientX-DomRect.left;
    //     let Current_Y=e.clientY-DomRect.top;
    //
    //     let X_diff=Math.abs(Drawing_Shape_X-Current_X);
    //     let Y_diff=Math.abs(Drawing_Shape_Y-Current_Y);
    //     let ellipse_center_x=-1;
    //     let ellipse_center_y=-1;
    //     if(Current_X>Drawing_Shape_X)
    //     {
    //         ellipse_center_x=Drawing_Shape_X+(X_diff/2);
    //     }
    //     else
    //     {
    //         ellipse_center_x=Drawing_Shape_X-(X_diff/2);
    //     }
    //
    //     if(Current_Y>Drawing_Shape_Y)
    //     {
    //         ellipse_center_y=Drawing_Shape_Y+(Y_diff)/2;
    //     }
    //     else
    //     {
    //         ellipse_center_y=Drawing_Shape_Y-(Y_diff)/2;
    //     }
    //
    //     ctx.ellipse(ellipse_center_x,ellipse_center_y,X_diff/2,Y_diff/2,0,0,2*Math.PI,false);
    //     ctx.fill();
    //     ArrX=[];
    //     ArrY=[];
    // }
  };

    function ClearCircle(Context,x,y,radius,color)
    {
        Context.beginPath();
        Context.clearRect(x-radius-1,y-radius-1,radius*2+2,radius*2+2);
        Context.closePath();

    }
    canvas.onmousemove=function(e)
  {
     if(MousePressed!=false&&Drawing_square==false&&Drawing_circle==false&&Drawing_Line==false)
    {
        console.log("Mouse Over = "+e.clientX+" "+e.clientY);
        ctx.fillStyle=color;
        let i=10;
        while(i>0)
        {
            ctx.fillRect(e.clientX-DomRect.left,e.clientY-DomRect.top,Drawing_height,Drawing_width);
            i--;
        }
    }
   if(MousePressed&&Drawing_square)
   {
       ctx.fillStyle=color;
       let Current_X=e.clientX-DomRect.left;
       let Current_Y=e.clientY-DomRect.top;

       let popped_x=ArrX.pop();
       let popped_y=ArrY.pop();

       if(popped_x!=Current_X||popped_y!=Current_Y)
       {
           ctx.clearRect(Drawing_Shape_X,Drawing_Shape_Y,Math.abs(Drawing_Shape_X-popped_x),Math.abs(Drawing_Shape_Y-popped_y));
           ctx.fillRect(Drawing_Shape_X,Drawing_Shape_Y,Math.abs(Drawing_Shape_X-Current_X),Math.abs(Drawing_Shape_Y-Current_Y));
           ArrX.push(popped_x,Current_X);
           ArrY.push(popped_y,Current_Y);
       }
   }
   if(MousePressed&&Drawing_circle) {

         ctx.fillStyle=color;
         let Current_X=e.clientX-DomRect.left;
         let Current_Y=e.clientY-DomRect.top;

         let popped_x=ArrX.pop();
         let popped_y=ArrY.pop();

         if(Current_X!=popped_x||popped_y!=Current_Y)
         {
            //  ctx.arc(Drawing_Shape_X,Drawing_Shape_Y,Math.abs(Drawing_Shape_X-popped_x),0,2*Math.PI);
            //  ctx.stroke();
            //  // let save=ctx.save();
            //  let area=ctx.clip();
            //   // let ctx=save.restore();
            // // ctx.globalCompositeOperation='destination-out';
            //
             ClearCircle(ctx,Drawing_Shape_X,Drawing_Shape_Y,Math.abs(Drawing_Shape_X-popped_x),color);

             ctx.beginPath();
             ctx.arc(Drawing_Shape_X,Drawing_Shape_Y,Math.abs(Drawing_Shape_X-Current_X),0,2*Math.PI);
             ctx.fill();
             ctx.closePath();
         }
         ArrX.push(popped_x,Current_X);
         ArrY.push(popped_y,Current_Y);

   }
   // if(MousePressed&&Drawing_circle)
   // {
   //     // ctx.ellipse(e.clientX-DomRect.left,e.clientY-DomRect.top,20,20,5,0,2*Math.PI,false);
   //     // ctx.fill();
   //
   //     ctx.fillStyle=color;
   //     let Current_X=e.clientX-DomRect.left;
   //     let Current_Y=e.clientY-DomRect.top;
   //
   //     let popped_x=ArrX.pop();
   //     let popped_y=ArrY.pop();
   //
   //     let popped_x_diff=Math.abs(Drawing_Shape_X-popped_x);
   //     let popped_y_diff=Math.abs(Drawing_Shape_Y-popped_y);
   //
   //    if(popped_x!=Current_X||popped_y!=Current_Y)
   //    {
   //        // ctx.clearRect(Drawing_Shape_X,Drawing_Shape_Y,popped_x_diff/2,popped_y_diff/2);
   //        // ctx.clearRect(Drawing_Shape_X-popped_x_diff/2,Drawing_Shape_Y-popped_y_diff/2,popped_x_diff,popped_y_diff);
   //        let X_diff=Math.abs(Drawing_Shape_X-Current_X);
   //        let Y_diff=Math.abs(Drawing_Shape_Y-Current_Y);
   //        let ellipse_center_x=-1;
   //        let ellipse_center_y=-1;
   //        if(Current_X>Drawing_Shape_X)
   //        {
   //            ellipse_center_x=Drawing_Shape_X+(X_diff/2);
   //        }
   //        else
   //        {
   //            ellipse_center_x=Drawing_Shape_X-(X_diff/2);
   //        }
   //
   //        if(Current_Y>Drawing_Shape_Y)
   //        {
   //            ellipse_center_y=Drawing_Shape_Y+(Y_diff)/2;
   //        }
   //        else
   //        {
   //            ellipse_center_y=Drawing_Shape_Y-(Y_diff)/2;
   //        }
   //
   //        ctx.ellipse(ellipse_center_x,ellipse_center_y,X_diff/2,Y_diff/2,0,0,2*Math.PI,false);
   //
   //        ctx.fill();
   //        ArrX.push(popped_x,Current_X);
   //        ArrY.push(popped_y,Current_Y);
   //    }
  };


   $('.color_col').click(function (e) {
      if(Eraser_on==false)
      {
          let id=$(this).attr('id');
          $color_col=$('#'+id);
          color=$color_col.css('background-color');
          console.log(color);
      }
   });

    $('#refresh_btn').click(function () {
        ctx.clearRect(0,0,canvas.width,canvas.height);
    });

    function Pencilin()
    {
            $(this).css('cursor','url(cursors/Pencil.cur),auto');
    }
    function Pencilout()
    {
        $(this).css('cursor','pointer');
    }

    function EraserIn()
    {
        $(this).css('cursor','url(cursors/Eraser.cur),auto');
    }
    function EraserOut()
    {
        $(this).css('cursor','pointer');
    }
    function PaintBrushIn()
    {
        $(this).css('cursor','url(cursors/Paintbrush.cur),auto');
    }
    function PaintBrushOut()
    {
        $(this).css('cursor','pointer');
    }

    function CrossHairIn()
    {
        $(this).css('cursor','crosshair');
    }
    function CrossHairOut()
    {
        $(this).css('cursor','pointer');
    }



    $pencil=$('#pencil');
    $eraser=$('#eraser');
    $PaintBrush=$('#PaintBrush');
    $square=$('#square');
    $circle=$('#circle');
    $straight_line=$('#straight_line');

    $pencil.click(function () {
       $canvas.hover(Pencilin,Pencilout);
       Eraser_on=false;
       Drawing_square=false;
       Drawing_circle=false;
       Drawing_height=5;
       Drawing_width=5;
       Drawing_Line=false;
    });
    $eraser.click(function () {
        $canvas.hover(EraserIn,EraserOut);
        color='white';
        Eraser_on=true;
        Drawing_square=false;
        Drawing_circle=false;
        Drawing_Line=false;
    });

    $PaintBrush.click(function () {
       $canvas.hover(PaintBrushIn,PaintBrushOut);
       Eraser_on=false;
       Drawing_square=false;
       Drawing_circle=false;
       Drawing_height=10;
       Drawing_width=10;
       Drawing_Line=false;
    });

    /**crosshair is for drawing shapes**/

    $square.click(function () {
        $canvas.hover(CrossHairIn,CrossHairOut);
        Eraser_on=false;
        Drawing_square=true;
        Drawing_height=5;
        Drawing_width=5;
        Drawing_circle=false;
        Drawing_Line=false;
    });

    $circle.click(function () {
        $canvas.hover(CrossHairIn,CrossHairOut);
        Eraser_on=false;
        Drawing_square=false;
        Drawing_circle=true;
        Drawing_Line=false;
    });

    $straight_line.click(function () {
        $canvas.hover(CrossHairIn,CrossHairOut);
        Eraser_on=false;
        Drawing_square=false;
        Drawing_circle=false;
        Drawing_Line=true;
    })

});

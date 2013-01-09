$(function(){


animation = [];

for (var i = 1; i < 13; i++) {
var img = new Image();   // Create new img element
img.src = './images/animation/'+i+'.png'; // Set source path
animation.push(img);
};

// audio
var fireOne = new Audio("./images/animation/audio/fire1.mp3"); // buffers automatically when created
var fireTwo = new Audio("./images/animation/audio/fire2.mp3"); // buffers automatically when created
var crumple = new Audio("./images/animation/audio/crumple.mp3"); // buffers automatically when created

play_animation = function(ctx,animation,speed){
  var frame = 0;
  fireOne.play();

  (function animate(frame){
        ctx.clearRect ( 0 , 0 , ctx.canvas.width , ctx.canvas.height );
        ctx.drawImage(animation[frame],0,0,ctx.canvas.width,ctx.canvas.height);
          console.log(frame)
        frame++;

        if(frame < animation.length ){
          setTimeout(function(){
            animate(frame);
          },speed);
        }else{
          setTimeout(function(){
          fireOne.pause();
          fireOne.currentTime = 0;
          },2000);
        }
  })(frame)
}


console.log('change');

var canvas = $('.middle canvas').get(0);
   context = canvas.getContext('2d');


      KEYBOARD.on('enter.change',function(){
        if($("#change input").is(":focus")){
                document.activeElement.blur();
                    $("input").blur();
            $('#change input').focusout();
        }
      });

  // on input play animation
  $('#change input').focusout(function(){
    console.log('change');
      var txt = this.value;
      this.value = "";
      console.log('txt');
      if(txt != ""){
        crumple.play();
        setTimeout(function(){
          crumple.pause();
          crumple.currentTime = 0;
          play_animation(context,animation,50)
        }, 200);

      }

  });

  setTimeout(function(){
    $('#change').click(function(){console.log('!')})
  },0)

    //Hooks.emit('change','loaded')
});



Orientation.on('change',function(e,o){
 // alert(o)
        $('canvas').attr('height', 0);
        $('canvas').attr('width', 0);

        var h = $('#change .middle').height();
        var w = $('#change .middle').width();
        var s = ( h >= w)?'h':'w';

        if(s =='h'){
          $('canvas').attr('height', w);
          $('canvas').attr('width', w);
        }else{
          $('canvas').attr('height', h);
          $('canvas').attr('width', h);
        }

        $('canvas').css({
          'margin-left':($('#change .middle').width() - $('canvas').width()) / 2
        });
});



Hooks.on('change',function(e,event){
  switch(event){
    //case 'loaded':
    //  console.log('change loaded');
    //break;
    case 'in':

      console.log('change in');
          $('canvas').attr('height', 0);
          $('canvas').attr('width', 0);
        setTimeout(function(){ 
        
        var h = $('#change .middle').height();
        var w = $('#change .middle').width();
        var s = ( h >= w)?'h':'w';

        if(s =='h'){
          $('canvas').attr('height', w);
          $('canvas').attr('width', w);
        }else{
          $('canvas').attr('height', h);
          $('canvas').attr('width', h);
        }

        $('canvas').css({
          'margin-left':($('#change .middle').width() - $('canvas').width()) / 2
        });

            context.drawImage(animation[11],0,0,context.canvas.width,context.canvas.height);

      },0);

    break;
    case 'out':
        KEYBOARD.off('.change')
        //  $('canvas').attr('height', 0);
        //  $('canvas').attr('width', 0);
      console.log('change out');
    break;
  }

});


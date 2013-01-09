var splash  = false;


Hooks = new Emitter();

_NODE = [];

Hooks.on('REGISTER',function(location){
_NODE.push(location);

});








// here


KEYBOARD = new Emitter();




if( !Stub ){
  RDY = false;
  // notification recieved
  RAN = false;
  document.addEventListener('deviceready', function() {
    RDY=true;
          document.addEventListener("resume", function(){
          console.log('back from pause')
            // notification processed
            if(RAN){
            console.log('||||()()||||')
            RAN=false;
              $(function(){
                notify();
              });
            }
          window.plugins.badges.clear()
          }, false);

          document.addEventListener("pause", function(){
            console.log('paused')
          }, false);

          document.addEventListener("online", function(){
            console.log('online')
          }, false);

          document.addEventListener("offline", function(){
            console.log('online')
          }, false);

          document.addEventListener("backbutton", function(){
              console.log('back button')
          }, false);


          backgroundNotification = function(id){
            console.log("I was in the background but i'm back now! ID="+id);
            RAN = true;         

          }

          foregroundNotification = function(id){
            console.log("I am currently foregroundNotification, what should I do? ID="+id);
            notify();
          }



  }, false);

}else{
  
  $(window).on('resize',_.debounce(function(){
      var land = $(window).width() > $(window).height();
        var temp = (land)? 'landscape':'portrait';

        if(temp != Orientation.orientation ){
                var o = [temp,0]

                var key = parallax.current.key || '()(*#&YIREWERQ)!'

                Orientation.orientation = o[0]
                Orientation.emit('*',o);
                Orientation.emit(key,o);
        }
      },500));

}




Orientation = new Emitter();

window.addEventListener('orientationchange', function() {
    var o =[];
            switch(window.orientation) {
                case 0:
                    console.log( 'Portrait' );
                    o=['portrait',0];
                    break;

                case -90:
                    console.log('Landscape (right, screen turned clockwise)');
                    o=['landscape',0];
                    break;

                case 90:
                    console.log('Landscape (left, screen turned counterclockwise)');
                    o=['landscape',1];
                    break;

                case 180:
                    console.log('Portrait (upside-down portrait)');
                    o=['portrait',1];
                    break;
            }

      var key = parallax.current.key || '()(*#&YIREWERQ)!'

      Orientation.orientation = o[0]
      Orientation.emit('*',o);
      Orientation.emit(key,o);
});



$(function(){
  var land = $(window).width() > $(window).height();
  Orientation.orientation = (land)? 'landscape':'portrait';
});





    notify = function(){
         console.log('notification')
//         location.replace('index.html#change')
//         location.reload()    
         
         get_positive(function(data){
            console.log('-0-0-0-');

            if(data.data.length){
            var rand = Math.ceil( Math.random() * data.data.length ) - 1
            var key =  data.data[rand].charAt(0).toUpperCase() + data.data[rand].slice(1); 
            var rand_rand =  Math.ceil( Math.random() * positive_padded[key].length ) - 1
             msg = positive_padded[key][rand_rand]
            }else{
                var obj = positive_padded;
                var ret;
                var c = 0;
                for (var key in obj)
                if (Math.random() < 1 / ++c) ret = key;
                 key = ret
                 msg = obj[ret][Math.floor(Math.random(obj[ret].length))];
            }


            template = [
            '<h1>'+ key +'</h1>',
            '<p>' + msg +'</p>',
            '<button class="btn btn-success" >close</button>'
            ].join('');

                smoke.alert(template,{classname:'pos'},function(){
                  console.log('notify close')
                },function(){
                  // attach any  handlers
                  $(this).find('.btn-success').click(function(){
                    smoke.close();
                  })
                },false)

         });
     }




execute_functions = function(array,t,args){
    if(arguments.length < 3){
      args = t;
      t = this;
    }else{
      t = t || this;
      args = [];
    }

    if( array instanceof Array){
      for(var x = 0; x< array.length ; x++){
        if( typeof array[x] == 'function'){
          array[x].apply(t,args);
        }
      }
    }
}





hash = function(){
  var hash = window.location.hash;
      return hash.slice(1, hash.length);
}



$.fn.textWidth = function(text){
  var org = $(this)
  var html = $('<span style="postion:absolute;width:auto;left:-9999px">' + (text || org.html()) + '</span>');
  if (!text) {
    html.css("font-family", org.css("font-family"));
    html.css("font-size", org.css("font-size"));
  }
  $('body').append(html);
  var width = html.width();
  html.remove();
  return width;
}

largest_width = function(element){
  var w = 0;
  $(element).children().each(function(i,elem){
    if($(elem).textWidth() > w ) w = $(elem).textWidth() 
    console.log();
  });
    return w
}


debug = function(msg,c,t){

  if( arguments.length == 2){
    t = c;
    c = null
  }


  if(msg === 'clear'){
    $('#DEBUG').animate({'opacity':0,height:0},1200)
    $('#DEBUG').empty(); 
    return
  }


  if(msg === 'delete'){
    $('#DEBUG').animate( {
        height:$('#DEBUG').height() - $('#DEBUG').children().last().outerHeight(),
        width:largest_width($('#DEBUG'))
      },1200);
    $('#DEBUG').children().last().animate({opacity:0},1200,function(){
      if( $('#DEBUG').children().length == 0) {
        $('#DEBUG').animate({'opacity':0,height:0},1200)
      }
        this.remove();
    })
    return
  }

  $('#DEBUG').css({display:'block'});
  $('#DEBUG').animate({'opacity':1},2400);

  c = c || "white"
   $('#DEBUG').prepend('<p style="margin:4; opacity:0; color:'+ c +';">' + msg+ ' </p>' )
    .animate( {
      height:$('#DEBUG').height() + $('#DEBUG').children().first().outerHeight()+8,
      width:largest_width($('#DEBUG'))
      },1200)
    .children()
    .first()
    .animate({opacity:1},2200);


  if(t){
    setTimeout(function(){
        $('#DEBUG').animate( {height:$('#DEBUG').height() - $('#DEBUG').children().last().outerHeight()},1200);
        $('#DEBUG').children().first().animate({opacity:0},1200,function(){
          if( $('#DEBUG').children().length == 0) {
            $('#DEBUG').animate({'opacity':0,height:0},1200)
          }
        this.remove();
        })
    },t);

  }

}




/*
window.onpopstate = function(event){  
  console.log('pop!'); 

}
*/

/*///////////////////////////////////////////////////////////////////////////////*/
$(function(){

$(window).bind('hashchange', function() {
    //debugger; good place to send stuff



});


// click speeds
$(function(){
$('button').each(function(){
    var elem = $(this);
    $(elem).on('vclick',function(){
        var d = new Date();
        console.log('vclick '+d.getTime());
    })

    $(elem).on('click',function(){
        var d = new Date();
        console.log('click '+d.getTime());
    })

    $(elem).on('touchstart',function(){
        var d = new Date();
        console.log('touchstart '+d.getTime());
    })
});
});


document.ontouchmove = function(e){
    e.preventDefault();
    console.log('blarg');
}


$("textarea").focus(function(){
    $(document).scrollTop(currentScrollPosition);
  console.log('spo');
});



// set parallax background options
parallax.background = $('html')

/*
parallax.scaling = 0.4; //background moves 40% with the pages
parallax.speed = 1200; //In milliseconds of course!
parallax.easing = 'linear';
*/
parallax.updateUrl= true;



// fire hooks for pages
parallax.preload = function(data){
  // THIS IS bad //ges
  smoke.close();

  // this is to prevent the buttons from locking user will experience a missed click but application will not fail
  setTimeout(function(){
    parallax.sliding = false
  
  },parallax.speed+50)


  if(this.current){
  Hooks.emit(this.current.key,'out')
  }
  Hooks.emit(data,'in')
}

parallax.onload = function(){
  //Hooks.emit(this.current.key,'in')
}

// register the different pages of the application with parallax
 for (var x = 0; x < $('.page').length; x++) {
         parallax._add($($('.page')[x]));
         //parallax.add($($('.page')[x]));
 };
 
// length to show splash
var splash_time = 3000;


// show splash screen and run after splash hook | skip the splash and just run the hook
  if( splash ){

    parallax.splash.show();  

    setTimeout(function(){
    splash = false;    
    parallax.main.left();
    //post_hook()
    Hooks.emit('splash');
    },splash_time);

  }else{
        var page = hash();
        if(parallax.isPage(page)){
          parallax.preload(page);
          parallax[page].show();
        }else{
          parallax.main.show();
        }
        ///post_hook()
        Hooks.emit('splash');
  }


// EMIT EVENT HERE

// key listener
$('html').keydown(function (e) {

  var keyCode = e.keyCode || e.which,
      arrow = {left: 37, up: 38, right: 39, down: 40};
      key = { p:80,enter:13 }

      console.log(keyCode);

  switch (keyCode) {
    case key.left:
      //smoke.alert('<-');
    break;
    case key.up:
      //smoke.alert('up');
    break;
    case key.right:
      //smoke.alert('->');
    break;
    case key.down:
      //smoke.alert('down');
    break;
    case key.enter:
    KEYBOARD.emit('enter')
    break;
    default:
        console.log(keyCode+' not registered');
    break;

  }
});




});








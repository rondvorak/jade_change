smoke.close = function(){
  $('.smoke [id^="alert"]').trigger('click');
}


// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

/*
execute_functions = function(array,t,args){
    if(arguments.length < 3){
      args = t;
      t = this;
    }else{
      t = t || this;
      args = [];
    }
   
    //debugger

    if( array instanceof Array){
      for(var x = 0; x< array.length ; x++){
        if( typeof array[0] == 'function'){
          array[x].apply(t,args);
        }
      }
    }
}
*/

/*
var t = [
function(){console.log('1');},
function(){console.log('2');},
function(){console.log('3');},
function(){console.log('4');},
function(){console.log('5');}
]; execute_functions(t);
*/





Emitter = function(){}
jQuery.extend( Emitter.prototype , jQuery.eventEmitter );


Vision = new Emitter();


$(function(){
  console.log('vision');


  

  $('#vision .middle .well').on('double',function(event){
    //console.log('double');
    //console.log(event);
  });
 


  $('#vision .middle .well').hammer()
    .on('hold',function(){
      console.log('vision board touch hold');

      var options = [
      //'<button>Share</button>',
      //'<br>',
      '<button class="clear btn btn-danger" >Clear Board</button>',
      '<br>',
      '<button class="close-container btn btn-success" >Close</button>'
      ].join('');

      smoke.alert(options,{classname:'close-container'},function(){
        console.log('closed');
      },function(){
        console.log('rendered');
          $(this).find('.clear').click(function(event){
          console.log('clearing vision board');
            $('#vision .middle .well').empty();
            store.nuke()
            smoke.close();
          });

          $(this).find('.close-container .btn-success').click(function(event){
              console.log('cliker')
              smoke.close();
          });
      });
    });



  $('#vision .middle .well').on('click.vision',function(event,fake){
      fake = fake || [];
      var position = [];


   
      var offset = $(this).offset();
  
     position.push(fake[0] |  (event.clientX)? event.clientX - offset.left : false  |  100  );
     position.push(fake[1] |  (event.clientY)? event.clientY - offset.top  : false  |  100  );




      console.log('vision board clicked');
      if(Stub){
          $.getJSON('/list/images/vision',
            function(result){
              console.log(result)
              var template = [];
                template.push('<ul id="visionstub">');
                  for(var x = 0; x < result.length ; x++ ){
                    template.push('<li><img src="'+result[x]+'"></a></li>');
                  }
                template.push('</ul><button class="btn btn-success">close</button>');



                smoke.alert(template.join(''),{classname:'choice'},function(){
                  console.log('close')
                },function(){
 
                $($(this).find('button')[0]).click(function(){
                   smoke.close();
                })
              


                $('#visionstub  img').click(function(){
                   var img = $(this).attr('src');

                   console.log('img src '+img);   
                    smoke.close();
                    Vision.emit( 'placed', [ img, position ] );
                 
                })

                },false);
            })
            .error(function(){console.log('fail Sauce No VISIONs found')})

      }else{
  
  
                var template = [];
                  template.push('<p>vision</p>')
                  template.push('<button class="btn btn-success">Camera Roll</button>');
                  template.push('<br>');
                  template.push('<button class="btn btn-success">Take Picture</button>');
                  template.push('<br>');
                  template.push('<button class="btn btn-success">close</button>');

                smoke.alert(template.join(''),{classname:'choice'},function(){
                  console.log('close')
                },function(){

                $($(this).find('button')[0]).click(function(){
                   get_photo();
                   smoke.close();
                })
                $($(this).find('button')[1]).click(function(){
                  take_photo();
                   smoke.close();
                })
                $($(this).find('button')[2]).click(function(){
                   smoke.close();
                })
               
                },false);

           function get_photo(){
             var popover = new CameraPopoverOptions(300,300,100,100,Camera.PopoverArrowDirection.ARROW_ANY);
             var options = { quality: 50, destinationType: Camera.DestinationType.FILE_URI,sourceType:0, popoverOptions : popover };

             navigator.camera.getPicture(onSuccess, onFail, options);

             function onSuccess(imageURI) {
                console.log('img src '+imageURI);   
                Vision.emit( 'placed', [ imageURI, position ] );
            }

            function onFail(message) {
                alert('Failed because: ' + message);
            }
             
           }


           function take_photo(){
           //var img = $(this).attr('src');
            navigator.camera.getPicture(onSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.FILE_URI }); 
            function onSuccess(imageURI) {
              console.log('img src '+imageURI);   
              Vision.emit( 'placed', [ imageURI, position ] );
            }

            function onFail(message) {
              alert('Failed because: ' + message);
            }

            //smoke.close();
           }
            
      }
  })

trim = function(str) {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}


  // HERE
  Vision.on('DATASAVED',function(d){
    console.log('Vision data saved')
    console.log('salt');
    console.log(d.salt);
    console.log('key');
    console.log(data.key)
      // find the element with the salt
      // update it with the key


  });




  Vision.on('placed',function( event , file , position, id ){
        var is_new = true
        if(id) is_new = false

        if(!DATABASERDY){
        // bug out
          console.log('narrrr!!!');
          asdkdjlasdlkja();
        }

      //debugger
      var date = new Date();
      var salt = 'point:'+date.getTime();

      //salt x y file
      var point_data = [salt, position[0], position[1], file ];


     //debugger

     console.log(file+' has been placed @ x:' +position[0] + ' y:' +position[1]  +'waiting for id...');
      /*var*/ point = [
      '<div class="point">',
      '<img src="'+ file +'">',
      '</img>',
      '</div>'
      ].join('');
   
      point = $('#vision .middle .well').append(point).children().last();
      //debugger
      point.data('salt',point_data[0]);

      //debugger
      if(is_new){
        store.save_point(point_data,function(id,data){
          console.log('STOP')
          //debugger
          $('.point').each(function(){
              if( $(this).data('salt') == data.data[0] ){
                //debugger
                console.log('attaching id to point: '+salt)   
                $(this).attr('id',id) 
              }
          });
        })
      }else{
          //debugger
         // if(!salt) this_is_not_salt()
         $(point).attr('id',id) 
      }


          $($(point).children('img')).load(function(){
                
              $(this).parent()//.hammer()
                .on('click',function(e){
                
                e.stopPropagation();
                if($(this).data('hammered')){
                    $(this).data('hammered',false)
                    return
                }

                var caption = $(this).data('caption') ||''

                var options = [
                '<img src="'+file+'"></img>',
                '<p>Caption</p>',
                '<textarea>'+caption+'</textarea>',
                '<br>', 
                '<button class="btn btn-danger delete">Delete</button>',
                '<button class="btn btn-success enter">Close</button>'
                ].join('');
  
                 smoke.alert(options,{ok:'Close',classname:'options'},function(){
                    $('#vision .middle .well').data('hammered', false)
                      console.log('image option menu closed');

                  },(function(self){

                      //this is a differnt window
                      return function(){
                      console.log('image option menu rendered')
                      // check screen width; fix interface;
                      if(  $('body').width() < 480  ){
                      console.log('sasdasd')
                        $('.dialog.smoke.options').css('width','100%')
                        $('.dialog.smoke.options').css('height','100%')
                        $('.dialog.smoke.options img').css('max-height','30px')
                        $('.dialog.smoke.options img').css('padding','10px')
                        $('.dialog.smoke.options img').css('display','inline')
                        $('.dialog.smoke.options p').css('display','inline')
                        $('.dialog.smoke.options textarea').css('height','50px').blur(function(){
                          setTimeout(function(){
                            // RAPTORS
                            smoke.close()
                          },3000)
                        });
                        // ThIS IS a NeAt hack
                        $('.dialog.smoke.options').css('left','0')
                        $('.dialog.smoke.options').css('top','0')
                      }


                      // DATADATADATADATADATADATADATADATADATADATADATADATADATADATADATADATADATADATADATADATA>>>
                      SmokeAlarm.once('destroy',
                      (function(self){
                        return function(e,element,id){
                            console.log('----------')
                            // parent element is where state is saved
                            if($(self).parent().length){
                                $(self).parent().data('caption', trim($(element).find('textarea').val()) )
                      //this is where you update the remote db

                      //         //debugger
                            }
                        }
                      })(self) )
                      // DATADATADATADATADATADATADATADATADATADATADATADATADATADATADATADATADATADATADATADATA>>>


  
                      // hack to hide keyboard
                      $(this).find('textarea').focus(function(){
                          setTimeout(function(){
                            $('.smoke-base').one('click',function(){
                            });
                          },100);
                      }).blur(function(){
                          window.scrollTo(0,0)
                      }).focus()

                      $(this).find('.options .enter').on('click',function(e){ 
                        e.stopPropagation();
                        smoke.close();
                        return false;
                      });


                      $(this).find('.options .delete').on('click',(function(self){ 
                          ////debugger;
                          return function(e){

                          //debugger
                          store.delete_point($(self).parent().attr('id'))                          

                          e.stopPropagation();
                          ////debugger;
                          $(self).parent().remove();
                          smoke.close();
                          console.log('delete')
                          return false
                          }})(self) );
                        }
                      })($(this).children().last()),false);
// this is back



                })

              dd = point.draggable({containment:'parent'});

              dd.on('mousedown',function(e){
                    $('#vision .middle .well').data('hammered', true)
              })
                          
              dd.draggable({
                start:function(e){
                    console.log('drag start ---------------------');
                    $('#vision .middle .well').data('hammered', true)
                    $(this).data('hammered',true)
                },
                stop:function(e){
                    console.log('drag stop  ---------------------');
                    $('#vision .middle .well').data('hammered', false)
                    // key salt x y path
                    var key = $(this).attr('id')
                    var salt = $(this).data('salt')
                    var x = $(this).offset().left
                    var y = $(this).offset().top
                    var path = $(this).find('img').attr('src')

                    //debugger
                    store.save( {key:key,data:[ salt,x,y,path ] } ,function(d){
                      console.log('point updated')
                      console.log(d)
                    })

                }
              });
              

              position[0] = position[0] - ( $(this).width()  / 2 );
              position[1] = position[1] - ( $(this).height() / 2 );

              point.css({ left:position[0], top:position[1] })
         
              point.click(function(event){
              event.stopPropagation();
              console.log('click on point div stopped');
              });
          });
      


     

  })


  Hooks.emit('vision','loaded');
});


  Orientation.on('vision',function(e,orientation){
      if(orientation == 'landscape'){
      parallax.go('board','right');
      }
  })



  Hooks.on('vision',function(e,event){
    if(event == 'loaded'){
      // board ready rendered 
      console.log('vision loaded')
    }

    if(event == 'in'){
        console.log('vision in ');
        console.log('vision comes into view')
          if(Orientation.orientation =='landscape' ){
          parallax.go('board','bottom');
          }

      //debugger
      setTimeout(function(){
      store.get_point_keys(function(keys){
          var need_rendering = []
          console.log('keys exist checking if render needed')
          console.log(keys);
          var exists = $('.point')
          //debugger
          for(var y=0 ; y < exists.length ; y++ ){
            for(var x = 0; x < keys.length ; x++){
              //debugger
              if($($(exists)[y]).attr('id') == keys[x] ){
                keys.remove(x)
              }
            }
          }
            console.log('keys need updating')
            console.log(keys)

          for(var x=0; x<keys.length ;x ++){

            store.get_point(keys[x],function(data,key){
              //debugger
              // img position fale salt
              Vision.emit('placed',[ data[3], [data[1], data[2]],key,data[0] ] )
            });
          }
      })
     },0)


     }


    if(event =='out'){
      console.log('eyes fade off');

    }

  });

  



/*
  post_functions.push(function(){
    
      setTimeout(function(){
      $('#vision .middle .well').trigger('click')
      },3000);
  });
*/

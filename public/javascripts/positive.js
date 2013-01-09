// event emitter for positive board 
Positive_emitter = function(){} 
jQuery.extend( Positive_emitter.prototype , jQuery.eventEmitter ); 
positive_emitter = new Positive_emitter(); 
 
$(function(){

// no i dont know if this is rdy ; yes this comment is for you
// Thank your for visiting.PLZ! come again; 


  get_time = function(cb){
    var key = 'time';
      store.exists(key,function(result){
        if(result){
          store.get(key,function(result){
            cb(result)
          })
        }else{
          cb({key:key})
        }
      });
  }

  set_time = function(data,cb){
    cb = cb || function(result){ console.log(result) }
    var key = 'time';
      store.save({key:key,data:data},function(data){
          if(DATA.PLATFORM == 'ipad'){
            notification.clear();
            if(data.data.length){
              notification.local_timed(data.data[0],data.data[1]);
            }
          }     
        cb(data);
      });
  }
 
 
  clear_time = function(cb){
    cb = cb || function(d){console.log(d)}
    set_time([],function(q){
      cb(q)
    })
  }

  get_time_human = function(cb){
     cb = cb || function(result){console.log(result) }
     get_time(function(d){
        //debugger
        if( typeof d.data != 'object' ||  d.data.length == 0){
          console.log('no time registered');
          return
        }
        var am_pm = 'AM';
        var hours = d.data[0];
        var minutes = d.data[1]+'';
        if( hours > 12){
          am_pm = 'PM'
          hours = hours - 12
        }
        if( minutes.length == 1 ){
          minutes = '0'+minutes;
        }
        var time = hours+':'+minutes+' '+am_pm
        cb(time);
     });
  }

  
  get_positive = function(cb){
    var key = 'positive';
      store.exists(key,function(result){
        if(result){
          store.get(key,function(result){
            cb(result)
          })
        }else{
          cb({key:key})
        }
      });
  }

  set_positive = function(data,cb){
    cb = cb || function(result){ console.log(result) }
    var key = 'positive';

      store.save({key:key,data:data},cb);
  }
 
  clear_positive = function(cb){  
          cb=cb || function(q){
            console.log('clear_positive');
            console.log(q)}
          set_positive([],function(data){
            cb(cb);
            console.log('positive clear')
          });
  }

  check_certain_boxes = function(element,list){
    $(element).each(function(){ 
          this.checked=false 
          if( !(list instanceof Array) ) return
          for(var x=0;x<list.length;x++){
            if(this.value == list[x]){    
              this.checked=true
            }
          }

    })
  }


  update_time_display = function(){
    get_time_human(function(data){
      $('#inputTime').val(data)
    })
  }


  positive_emitter.on('loaded',function(e,_positive){

    get_positive(function(data){
      console.log('*')
      console.log(data.data)
      check_certain_boxes('#positives input',data.data)
    })

    for (var key in _positive){
      var temp = [
        '<li>',
        '<label class="checkbox">',
        '<input type="checkbox" class="positivevalue"  value="'+key.toLowerCase()+'"><span>'+key+'</span>',
        '</label>',
        '</li>'
      ].join('');

      $('#positives').append(temp);
    }


    $('#positives li input').click(function(e){

      var data = [];
      $('#positives :checked').each(function(){
         data.push( $(this).val() )
      });

        set_positive(data,function(){
            console.log('positive data');
        });
    });

    $('#positive .not-positive').click(function(){
        console.log('|--><--|')
        clear_positive(function(){
            check_certain_boxes('#positives input',[]);
        });
        clear_time(function(){
            $('#inputTime').val('')
        });

    })


  });


  positive_emitter.emit('loaded',positive_padded)

  update_time_display();


  $('#positive input').focus(function(){
    setTimeout(function(){
      $('#positive').one('click',function(){
        console.log('poof');
      });
    },0);
  });


  $("#inputTime").ptTimeSelect({
    onClose:function(input){
      jQuery.ptTimeSelect.setTime()
      var time = input.val();
      console.log(time);

        var hours = time.slice(0,time.indexOf(':'));
          hours = parseInt( ( time.slice(-2) == 'PM')? parseInt(hours) + 12 : hours );
          minutes = parseInt( time.slice(time.indexOf(':')+1,-2 ) )

      set_time([hours,minutes],function(data){
        console.log('time set')
        console.log(data);
      })

    },
    onBeforeShow:function(){
 //     debugger
        console.log('b4 show time picker')
    }

  });


  $('#positive .middle button').click(function(){
    notifications.clear();  
  });

  Hooks.emit('positive','loaded');
});


Hooks.on('positive',function(e,event){
  switch(event){
    case 'loaded':
      console.log('positive loaded');
    break;
    case 'in':
      console.log('positive in');
    break;
    case 'out':
      console.log('positive out');

    $('#ptTimeSelectCloseCntr a').eq(0).trigger('click')

    break;
  }

});



// event emitter for affirmation board
Affirmation_emitter = function(){}
jQuery.extend( Affirmation_emitter.prototype , jQuery.eventEmitter );
affirmation_emitter = new Affirmation_emitter();

    magic_slide = function(size,left){
      this.size = size;
      this.left = left;
      this.id  = null;
      this.initial = false;
    }

    magic_slide.prototype.move_left = function(change){
          change = change || 1;
          if(this.left[0] < -1* this.size){
              this.left[0] = this.size ;
          }
          if(this.left[1] < -1* this.size){
              this.left[1] = this.size ;
          }
                this.left[0] = this.left[0] - change;
                this.left[1] = this.left[1] - change;
              $('#affirmations .spo').css('left',this.left[0])
              $('#affirmations .clones').css('left',this.left[1])
    }

    magic_slide.prototype.start = function(){
        if(this.id) return
        this.id = setInterval((function(self) {
            return function() {self.move_left(); } } )(this),
        50); 

    }

    magic_slide.prototype.stop = function(){
        clearInterval(this.id);
        this.id = null;
    }


    magic_slide = new magic_slide();







$(function(){

  var affirmations;
  var keys;


  affirmation_emitter.on('loaded',function(e , _affirmations){
 


      //some test
      affirmations = _affirmations

      var number_of_keys = 0;
          keys = [];
      for( var key in affirmations ){
        number_of_keys ++;
        keys.push(key);
      }


       var category = keys[Math.floor( Math.random()*number_of_keys )];
       var messages = affirmations[category]; 
       var message  = messages[ Math.floor(Math.random()* messages.length) ]

        console.log(keys); 
  
      $('.bottom.well blockquote p').text(message)
      $('.bottom.well blockquote small').text(category)


      // test data integrity here
      ready = true;
      affirmation_emitter.emit('ready');

  })



affirmation_emitter.emit('loaded',affirmations_padded);

/*
$.getJSON('./documents/affirmations.json',function(affirmations){
  affirmation_emitter.emit('loaded',affirmations);
// *
});
*/

  var clones =[];
    clones.push('<div class="clones">')
      $('#affirmations .bottom a ').each(function(){
        clones.push(this.outerHTML);
      });
    clones.push('</div>')

    $('.affirmation_category .wrapper').append(clones.join(''));

  var messages
  var prev_category
  var counter = 0;

  var lock = 0;



  Rotate = function(element,change){
    this.element = element;
    this.id = null;
    this.change = change || 1;
    this.degree = 0;

    this.stopping = null;
  }

  Rotate.prototype.start = function(){
      if( this.id) return
      this.id = setInterval(
      (function(self){
          return function(){
          self.degree = self.degree + self.change;
          self.element.css({ WebkitTransform: 'rotate(' + self.degree + 'deg)'});
          self.element.css({ '-moz-transform': 'rotate(' + self.degree + 'deg)'});
      }})(this),50);
  }

  Rotate.prototype.stop = function(){
      if( !this.id) return
      clearInterval(this.id)
      this.id = null
  }
  
  flower_rotate = new Rotate($('#affirmations .pin-img'))
  flower_rotate.start();

$('#affirmations .pin-img').click(function(){
    magic_slide.start();
    flower_rotate.start();
});




$('[data-category]').on('click',function(e){
  var category =  $(this).attr('data-category') ;
  e.preventDefault();
  if(!affirmations){
    console.log('affirmations ERROR not ready');
    return 
  }


  if( !(category in affirmations) ){
    console.log('affirmations ERROR category not found');
    return 
  }
  

  if(lock){
    console.log('locked for animations');
    return
  }

  magic_slide.stop();
  flower_rotate.stop();

  if( prev_category != category ){
    messages  = _.shuffle(affirmations[category]);
    counter = 0;
 
    lock++;
    $('.cat').animate({opacity:0},function(){
      $(this).text(category).animate({opacity:1},function(){
        lock--;
      });
    })
  }

 
  console.log(messages[counter]);


  lock++
  $('.mess').animate({opacity:0},function(){
      $(this).text(messages[counter]).animate({opacity:1},function(){
        lock--;
      });
  })


  prev_category = category;
  counter++;
  counter = (counter <= messages.length-1)?counter:0;

});


  Hooks.emit('affirmations','loaded')

});

  var initial =false;

Orientation.on('*',function(orientation){

      console.log('affirmations Orientation change')
      var width = $('#affirmations .bottom').width();
      var height = $('#affirmations .bottom').height();
      var total_width = 0;
      $('.affirmation_category .spo img').each(function(){
        var h = height - 20;
        total_width = total_width + h + 20
        $(this).height(h);
        $(this).width(h);
      });
      $('#affirmations .spo').width(total_width);
          total_width = 0;
      $('.affirmation_category .clones img').each(function(){
        var h = height - 20;
        total_width = total_width + h + 20
        $(this).height(h);
        $(this).width(h);
      });

      $('#affirmations .clones').width(total_width);
      $('#affirmations .wrapper').width( 10+(total_width*2) ).height(height);

      $('#affirmations .spo').css('left',0);
      $('#affirmations .clones').css('left',total_width);

      var size = $('#affirmations .spo').width();
      var left = [$('#affirmations .spo').position().left ,$('#affirmations .clones').position().left];
      
      magic_slide.size = size;
      magic_slide.left = left;

});


Hooks.on('affirmations',function(e,event){


  switch(event){
    case 'loaded':
      console.log('affirmations loaded');
    break;
    case 'in':
      setTimeout(function(){
      console.log('affirmations in');

      var width = $('#affirmations .bottom').width();
      var height = $('#affirmations .bottom').height();
      var total_width = 0;
      $('.affirmation_category .spo img').each(function(){
        var h = height - 20;
        total_width = total_width + h + 20
        $(this).height(h);
      });
      $('#affirmations .spo').width(total_width);
          total_width = 0;
      $('.affirmation_category .clones img').each(function(){
        var h = height - 20;
        total_width = total_width + h + 20
        $(this).height(h);
      });
      $('#affirmations .clones').width(total_width);
      $('#affirmations .wrapper').width( 10+(total_width*2) ).height(height);

      if(!magic_slide.initial){
      $('#affirmations .clones').css('left',total_width);
      magic_slide.initial=true;
      }

      var size = $('#affirmations .spo').width();
      var left = [$('#affirmations .spo').position().left ,$('#affirmations .clones').position().left];
      
      magic_slide.size = size;
      magic_slide.left = left;

      magic_slide.start();
      flower_rotate.start();
      //debugger
      },0);
    break;
    case 'out':
      setTimeout(function(){
      magic_slide.stop();
      flower_rotate.stop();
      },35);

      console.log('affirmations out');
    break;
  }

});

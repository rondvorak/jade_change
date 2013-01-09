/* parallax wrapper improves add function provides a previous and next function */


  parallax._add = (function(){

    parallax.pages = [];

    parallax.pageNumber = function(){
        for(var x = 0 ; x < parallax.pages.length ; x++ ){
              if(parallax.pages[x] == parallax.current.key) return x
        }
    }

    parallax.page = function(){
        return $('#'+parallax.pages[parallax.pageNumber()]);
    }

    parallax.isPage = function(test){
      for(var x = 0; x < parallax.pages.length ; x++){
          if(test == parallax.pages[x]){
            return true
          }
      }
        return false;
    }


  



    parallax.next = function(){

      var page = parallax.pageNumber()+1;
        //console.log(page);
      if( page  >= $('.page').length ) page = 0;
        //console.log(page);
        parallax[parallax.pages[page]].left();
//        window.location.hash='_'+parallax.pages[page];
    }

    parallax.previous = function(){
      var page = parallax.pageNumber()-1;
        //console.log(page)
      if( page  < 0 ) page = $('.page').length-1;
        //console.log(page)
        parallax[parallax.pages[page]].right();
//        window.location.hash='_'+parallax.pages[page];
     }

    return function(element){
        parallax.pages.push(element.attr('id'));
        // can add a lock here that does not clear untill pages emit loaded
        parallax.add(element);
    }
  })()




  // parallax data-api
  $(function(){
    var previous;
    parallax.lock = false;

    parallax.go = function(target,transition){
      if( ! target ){
        console.log('parallax.go no target!');
        return
      }

      if(parallax.lock ) {
        console.log('parallax locked');
      }

      //debugger
      console.log('->*<-');

      transition = transition || 'left';
      parallax[target][transition](function(){
          console.log('parallax transition cb')
          console.log('parallax unlocked')
          parallax.lock = false;
          parallax.sliding = false;

          console.log('bark');
          previous = target;
      });

    }
  

    if(DATA.PLATFORM == 'browser'){
      $('body').on('click.parallax.data-api', '[data-parallax]', function( e ){
        var target = $(this).data('target');
        var transition = $(this).data('parallax');
          
        console.log('browser click');

        if( previous && target=='main' ){
            console.log('best of luck');
        }

        parallax.go(target,transition);
      });
    }
    

    if(DATA.PLATFORM == 'ipad'){
      $('body').on('touchstart.parallax.data-api', '[data-parallax]', function( e ){
        var target = $(this).data('target');
        var transition = $(this).data('parallax');
          
        console.log('ipad touchstart');

        if( previous && target=='main' ){
            console.log('best of luck');
        }
        
        parallax.go(target,transition);
      });
    }

  })


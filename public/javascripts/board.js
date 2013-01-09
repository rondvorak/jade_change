// register the page
Hooks.emit('REGISTER','board')

$(function(){
    //Hooks.emit('board','loaded')
});



Orientation.on('*',function(e,orientation){
    // [1] bit is upside down && counterclockwise
    //if(Orientation[0] == 'portrait' )
    //if(Orientation[0] == 'landscape' )


});


Orientation.on('board',function(e,orientation){
    // [1] bit is upside down && counterclockwise
    //if(Orientation[0] == 'portrait' )
    //if(Orientation[0] == 'landscape' )
    if(orientation == 'portrait'){
    parallax.go('vision','left');
    }



});




Hooks.on('board',function(e,event){
  switch(event){
    case 'loaded':
    //  console.log('board loaded');
    break;
    case 'in':
      console.log('board in');
      //if (window.orientation ) 
      if(Orientation.orientation =='portrait' ){
        parallax.go('vision','left');

      }



    break;
    case 'out':
      console.log('board out');

    break;
  }

});


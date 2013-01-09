// register the page
Hooks.emit('REGISTER','board')

$(function(){
    //Hooks.emit('board','loaded')
});



Orientation.on('*',function(e,orientation){
    alert('!');
    // [1] bit is upside down && counterclockwise
    //if(Orientation[0] == 'portrait' )
    //if(Orientation[0] == 'landscape' )


});


Orientation.on('board',function(e,orientation){
    alert('!');
    // [1] bit is upside down && counterclockwise
    //if(Orientation[0] == 'portrait' )
    //if(Orientation[0] == 'landscape' )

});




Hooks.on('board',function(e,event){
  switch(event){
    case 'loaded':
    //  console.log('board loaded');
    break;
    case 'in':
      console.log('board in');

    break;
    case 'out':
      console.log('board out');

    break;
  }

});


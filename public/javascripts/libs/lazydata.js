$(function(){
// lazy to the max
DATA={};

// lazy passed data from server application
var temp = $('#DATA').children();
for (var x = 0; x < temp.length; x++) {
      DATA[ $(temp[x]).attr('id') ] = $(temp[x]).text();
};


// look ma no hands
if( DATA.RELOAD == 'true' ){
var socket = io.connect('http://'+ DATA.ADDRESS +':9000');

      if( typeof socket.on == 'function'){
        console.log('hazah');
        socket.on('update', function (data) {
        console.log(data)
        location.reload();
        });
      }
}


});

var i = require('eyes').inspector({});
var _ = require('underscore');
var file = require('fs').readFileSync('./positive.txt' ,'utf-8');




var list ={};




data = file.split('\n')




var category;

for(var x = 0; x < data.length; x++){
  var line = data[x];
  if(line == '') continue


  if(line.split(' ').length == 1 &&  ( data[x-1]=='' || (typeof data[x-1] == 'undefined') ) ){
    category = line;
    i(category,'category');
    list[category] = [];
    continue
  }


  if(data[x+1] != '' ){
    list[category].push([line]);
  }else{
    //list[category][list[category].length-1].push(line);
  }

}

i(list)


  require('fs').writeFileSync('positive.json',JSON.stringify(list),'utf-8')
  require('fs').writeFileSync('positive.json.js',"positive_padded ="+ JSON.stringify(list,null,'\t'),'utf-8')

    //i(list);
  //:%!tr -cd '[:print:]\n' 



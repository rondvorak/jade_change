var i = require('eyes').inspector({});
var _ = require('underscore');
var file = require('fs').readFileSync('./affirmations.txt' ,'utf-8');


var list ={};
data = _.filter(file.split('\n'),function(line){ return line !== ''})



i(data)
var category;


data.forEach(function(line){

  if(line.split(' ').length == 1){
    console.log(line);
    category = line
    list[category] = [];
    return
  }

  if(category){
    console.log(line)
    //list[category].push(line)
  }
})


  require('fs').writeFileSync('affirmations.json',JSON.stringify(list),'utf-8')
  require('fs').writeFileSync('affirmations.json.js',"affirmations_padded ="+ JSON.stringify(list),'utf-8')
    //i(list);

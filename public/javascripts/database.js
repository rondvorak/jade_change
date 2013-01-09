DATABASERDY = false;

store = new Lawnchair({name:'default'}, function(store) {
    // real global
    DATABASERDY = true;

    store.say = function(key,cb){
        cb = cb || function(d){console.log(d)}
        store.get(key,cb);
    }

    var date = new Date();
    var index = {key:'index',value:date.getTime()};
    store.save(index,function(index){
        console.log('created index');
    });

    // access it later... yes even after a page refresh!
    store.get('index', function(me) {
        console.log('DATABASERDY');
        console.log(me);
    });


    /*
    store.save({key:'points',keys:[]},function(d){
      console.log('points initialized');
    })
    */


    store.new_point_key = function(salt,cb){
        if(!salt){console.log('new_point_key(salt,cb)');salt();}
        if(!cb){console.log('new_point_key(salt,cb)');cb();}

        //point;
        // salt, file, position[0], position[1]
        var create_key = function(){
          //debugger
        var date = new Date();
        var test_key = salt+':'+date.getTime();
              store.exists(test_key,function(exists){
                if(exists){
                    create_key(salt,cb);
                }else{
                  
                  store.get('points',function(d){
                    // this is a mistake if two writes happen to closly together there can be two ds
                    // Not ATOMIC!
                    d = d || {key:'points',keys:[]}
                    //debugger
                    console.log('updating points')
                    console.log(d)
                    d.keys.push(test_key);
                    cb(test_key)
                    //debugger
                    store.save(d,function(d){
                    /*
                      var point = [salt,,,]//; point.length = 4
                      store.save({key:test_key,data:point},function(d){
                        console.log('points keys now');
                        console.log(d);
                        //cb(d); def not 
                      })
                    */
                    });
                  });

                }
           });
        }
            create_key(salt,cb);
      }

      store.get_point_keys = function(cb){
        cb = cb || function(d){ console.log(d); }
        store.get('points',function(d){
           //debugger
           //console.log('points')
           //console.log(d.keys);
           d = d || {keys:[]};
           cb(d.keys || [] );
        });
      }


      store.get_points = function(cb){
        cb = cb || function(q){console.log(q)}
        console.log('get points');
        store.get_point_keys(function(points){
            console.log('points keys');
            console.log(points);
            for(var x= 0;x<points.length;x++){
              var key = points[x];
              var lock = points[x].length;
              console.log('collecting')
              var collection = [];
                store.get(function(d){
                  collection.push(d);
                  console.log('-' +lock )
                  lock--;
                  if(!lock){
                      console.log('collected!');
                      cb(collection);
                  }
                });
            }
        });
      }


    store.get_point = function(key,cb){
        cb = cb || function(q){console.log(q);}
        if(!key) key()
        store.get(key,function(point){
            cb(point.data,point.key);
        })
    }
//debugger
    store.save_point = function(data,cb){
      cb = cb || function(q,qq){console.log('114');console.log(q);console.log(qq)}
      if(!data)data()
      if( typeof data[0] != 'string' ) not_a_string() // tell me 
      //debugger

      store.new_point_key(data[0],function(new_key){
        console.log('-|*|-');
            //debugger; // new_key data should exist
            store.save({key:new_key,data:data},function(data){
                      //debugger
            console.log('saved');
            console.log('key: '+ new_key);
            console.log('data: '+data);

            cb(new_key,data)
            })
      console.log('wtf')
      })
    }


    store.delete_point = function(id,cb){
        console.log('deleting key: '+id)
        store.get_point_keys(function(keys){
          console.log('searching keys to delete')
            for(var x = 0 ; x < keys.length ;x++){
              var delete_me = keys[x]
              if(delete_me == id){
                keys.remove(x)
                store.save({key:'points',keys:keys},function(data){
                  store.remove(delete_me,function(){
                    console.log('deleted: '+delete_me);
                  })
                })
              }
            }
        });
    }
});




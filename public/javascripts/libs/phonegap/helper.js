/*
fs = function(){
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs){

          debugger;
        }, function(err){
          console.log(err);
        });
}


readFile = function(){

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

    function gotFS(fileSystem) {
        fileSystem.root.getFile("readme.txt", null, gotFileEntry, fail);
    }

    function gotFileEntry(fileEntry) {
        fileEntry.file(gotFile, fail);
    }

    function gotFile(file){
        readAsText(file);
    }

    function readAsText(file) {
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            console.log("Read as text");
            console.log(evt.target.result);
        };
        reader.readAsText(file);
    }

    function fail(evt) {
        console.log(evt)
        //console.log(evt.target.error.code);
    }
}



readDir = function(dir){
  dir.createReader().readEntries(function(data){ debugger},function(err){
    console.log(err);
  })
}


writeFile = function(data){

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
    function gotFS(fileSystem) {
        fileSystem.root.getFile("readme.txt", {create: true, exclusive: false}, gotFileEntry, fail);
    }
    function gotFileEntry(fileEntry) {
        fileEntry.createWriter(gotFileWriter, fail);
    }
    function gotFileWriter(writer) {
        writer.onwriteend = function(evt) {
          console.log('written');
        
        };
        writer.write(data);
    }
    function fail(error) {
        console.log(error.code);
    }
}

*/ 

var process = require('child_process');

var timeout = 2 * 1000;

function check(proces, src, dest, callback){
    return function(){
        if (!proces.stdout._readableState.ended){
            proces.kill("SIGKILL");
            backup(src, dest, callback);
        }
        else callback.good();
    }
}

function check2(proces, callback){
    return function(){
        if (!proces.stdout._readableState.ended){
            callback.bad();
            proces.kill("SIGKILL");
        }
        else callback.good();
    }
}

function backup(src, dest){
    console.log("backup activated"); 
    proces = process.spawn('proces', [src, dest+'bk']);
    setTimeout(check2(proces), timeout);
}

exports.move = function(src, dest, callback){
    proces = process.spawn('mv', [src, dest]);
    setTimeout(check(proces, src, dest, callback), timeout);
}

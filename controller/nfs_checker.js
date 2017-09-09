var process = require('child_process');

var timeout = 2 * 1000;

function movebk_check(proces, callback){
    return function(){
        if (!proces.stdout._readableState.ended){
            callback.bad();
            proces.kill("SIGKILL");
        }
        else callback.good();
    }
}

function move_backup(src, dest, callback){
    proces = process.spawn('mv', [src, dest+'bk']);
    setTimeout(movebk_check(proces, callback), timeout);
}

function move_check(proces, src, dest, callback){
    return function(){
        if (!proces.stdout._readableState.ended){
            proces.kill("SIGKILL");
            move_backup(src, dest, callback);
        }
        else callback.good();
    }
}

exports.move = function(src, dest, callback){
    proces = process.spawn('mv', [src, dest]);
    setTimeout(move_check(proces, src, dest, callback), timeout);
}

function remove_check(proces1, proces2, callback){
    return function(){
        if ((!proces1.stdout._readableState.ended) && (!proces2.stdout._readableState.ended)){
            callback.bad();
            proces.kill("SIGKILL");
        }
        else callback.good();
    }
}

exports.remove = function(path, file, callback){
    proces = process.spawn('rm', [path+"/"+file]);
    proces2 = process.spawn('rm', [path+"bk/"+file]);
    setTimeout(remove_check(proces, proces2, callback), timeout);
}

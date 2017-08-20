var private_btn = document.getElementById('img_private');
var public_btn = document.getElementById('img_public');

function radar_handler(btn){
    if (btn == "private"){
        private_btn.checked = true;
        public_btn.checked = false;
    }
    else if (btn == "public"){
        private_btn.checked = false;
        public_btn.checked = true;
    }
}

var private_btn2 = document.getElementById('img_private2');
var public_btn2 = document.getElementById('img_public2');

function radar_handler2(btn){
    if (btn == "private"){
        private_btn2.checked = true;
        public_btn2.checked = false;
    }
    else if (btn == "public"){
        private_btn2.checked = false;
        public_btn2.checked = true;
    }
}

var new_name = document.forms["update_form"]["img_new_name"];

function validate_update_form(){
    var name = new_name.value != "";
    var btn = private_btn2.checked || public_btn2.checked;

    if (name || btn) return true;
    
    alert("Nothing to modify");
    return false;
}

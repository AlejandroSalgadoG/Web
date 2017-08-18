function validate_pass_update(){
    var pass1 = document.forms["update_pass_form"]["new_password"].value;
    var pass2 = document.forms["update_pass_form"]["new_password2"].value;

    if (pass1 == pass2) return true;
    
    alert("Passwords don't match");
    return false;
}

function validate_regist_form(){
    var pass1 = document.forms["regist_form"]["rpassword"].value;
    var pass2 = document.forms["regist_form"]["rpassword2"].value;

    if (pass1 == pass2) return true;
    
    alert("Passwords don't match");
    return false;
}

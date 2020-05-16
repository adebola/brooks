function Validate() {
  var password = document.getElementById("txtPassword").value;
  var confirmPassword = document.getElementById("txtConfirmPassword").value;

  if (password != confirmPassword) {
    showMessage("Passwords do not Match!!!", "error");
    console.log("False");
    return false;
  }

  return true;
}

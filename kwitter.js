function add_user(){

    user_name=document.getElementById("add_user").value;
localStorage.setItem("user_name", user_name);
window.location="kwitter_room.html"
}
//ADD YOUR FIREBASE LINKS HERE

var firebaseConfig = {
      apiKey: "AIzaSyBJWIAsJI9pAYEEeGqFH7ZmixP0J_U8cXo",
      authDomain: "kwitter-422ef.firebaseapp.com",
      databaseURL: "https://kwitter-422ef-default-rtdb.firebaseio.com",
      projectId: "kwitter-422ef",
      storageBucket: "kwitter-422ef.appspot.com",
      messagingSenderId: "745983432162",
      appId: "1:745983432162:web:1047e8918331f3cd7955bb"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
document.getElementById("display_name").innerHTML = "Welcome " + user_name + "!";

function addRoom() {
      room_name = document.getElementById("room_name").value;
      localStorage.setItem("room_name", room_name);
      firebase.database().ref("/").child(room_name).update({
            purpose: "adding room name"
      });

      window.location="kwitter_page.html"


}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  row = "<div class='room_name' id =" + Room_names + " onclick='redirectToRoom(this.id)'>#" + Room_names + "</div> <hr>";
                  document.getElementById("output").innerHTML += row;



                  //End code
            });
      });


}

getData();

function redirectToRoom(name) {
      localStorage.setItem("room_name", name);
      window.location = "kwitter_page.html";
}

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}
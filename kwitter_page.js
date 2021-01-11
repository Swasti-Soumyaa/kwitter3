//YOUR FIREBASE LINKS
var firebaseConfig = {
      apiKey: "AIzaSyBJWIAsJI9pAYEEeGqFH7ZmixP0J_U8cXo",
      authDomain: "kwitter-422ef.firebaseapp.com",
      databaseURL: "https://kwitter-422ef-default-rtdb.firebaseio.com",
      projectId: "kwitter-422ef",
      storageBucket: "kwitter-422ef.appspot.com",
      messagingSenderId: "745983432162",
      appId: "1:745983432162:web:1047e8918331f3cd7955bb"
};
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send() {

      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like: 0
      });
      document.getElementById("msg").value = ""
}

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        name = message_data['name'];
                        msg = message_data['message'];
                        like = message_data['like'];

                        name_tag = "<h4> " + name + "<img src='tick.png' class='user_tick'></h4>";

                        msg_tag = "<h4 class='message_h4'>" + msg + "</h4>";

                        button_tag = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='update_like(this.id)'>";

                        span_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like : " + like + "</span></button><hr>"

                        row = name_tag + msg_tag + button_tag + span_tag;
                        document.getElementById("output").innerHTML += row;



                        //End code
                  }
            });
      });
}

function update_like(message_id) {
      like = document.getElementById(message_id).value;
      updated_like = Number(like) + 1;
      firebase.database().ref(room_name).child(message_id).update({
            like: updated_like
      });

}

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}
getData();
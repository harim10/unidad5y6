var firebaseConfig = {
    apiKey: "AIzaSyDE3h34kmteYyil6BUnZtptEw3zw7xiUk8",
    authDomain: "unidad4bd.firebaseapp.com",
    projectId: "unidad4bd",
    storageBucket: "unidad4bd.appspot.com",
    messagingSenderId: "1053983328731",
    appId: "1:1053983328731:web:e81ae0be2e8e4c35abfffe"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //obtener datos del html

  
  var txtUsuario = document.getElementById("usuario");
  var txtMensaje = document.getElementById("mensaje");
  var btnEnviar = document.getElementById("btnenviar");
  var chatlista = document.getElementById("chatlista");
  var fechahora = new Date();
  var fecha = fechahora.toString();
  fecha = fecha.substring(0,24);

  //Ejecutar accion en el boton
  btnEnviar.addEventListener("click",function(){
    var usuario = txtUsuario.value;
    var mensaje = txtMensaje.value;
    var html = "<li>"+usuario+" DICE: "+mensaje+" "+fecha+"</li>";

    chatlista.innerHTML += html;

    firebase.database().ref('chat').push({
        user: usuario,
        message: mensaje,
        datetime: fecha
    })
});

    /*Mostrar datos*/
  firebase.database().ref('chat').on('value', (snapshot) => {
    var html1 = '';
    //console.log(snapshot.val());
    snapshot.forEach(function (e){
      var elemento = e.val();
      var usuario1 = elemento.user;
      var mensaje1 = elemento.message;
      var fecha1 = elemento.datetime;
      html1 += "<li>"+usuario1+" DICE: "+mensaje1+" "+fecha1+"</li>";
    });
    chatlista.innerHTML = html1;
  })
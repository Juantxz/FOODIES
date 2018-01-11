$(document).ready(function() {
  //ANIMAMOS LOGIN
  $(".man").click(function(event) {
    /* Act on the event */
    $(".texto").show(500);
    $(".crear").hide(1000);
    $(".back").show(500);
    $(".boss").hide(1000);
  });
  $(".back").click(function(event) {
    /* Act on the event */
    $(".guest").show(1000);
    $(".texto").hide(1000);
    $(".back").hide(500);
    $(".boss").show(1000);
    $(".crear").show(1000);

  });
  $(".boss").click(function(event) {
    /* Act on the event */
    sessionStorage.setItem('sesion_id', 'invitado');
    alert("Bienvenido Invitado");
    window.location.href = './Principal.html';


  });



  //Recibimos JSON y validamos
  $(".button").click(function(event) {
    localStorage.setItem('usuario', $("#usuario").val());
    localStorage.setItem('password', $("#pass").val());
    $.getJSON('./Json/usuario.json?nocache=123ff', function(data) {
      for (var i = 0; i < data.length; i++) {
        console.log(data);
        if (localStorage.getItem("usuario") == data[i].username && localStorage.getItem("password") == data[i].password) {
          alert("Bienvenido " + data[i].username);
          sessionStorage.setItem('sesion_id', data[i].username);
          sessionStorage.setItem('ubicacion', data[i].direccion);
          window.location.href = './Principal.html';
          break;
        } else {
          $("#usuario").val("");
          $("#pass").val("");
        }


      }


    });

  });

});

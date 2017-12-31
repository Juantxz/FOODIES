$(document).ready(function() {
  //El back de registrar.
  $("#imagen_regresarR").click(function(event) {
    /* Act on the event */
  window.location.href = '../HTML/Login.html';
  });
  $("#b_recuperar").click(function(event) {
  $.getJSON('../Json/usuario.json', function(data) {
    for (var i = 0; i < data.length; i++) {
        if ($("#reg_Recuperar_Preg").val()==data[i].pregunta && $("#reg_RecuperarMail").val()==data[i].email) {
          alert("Tu contraseña es "+ data[i].password);
        }



    }

  });
  });
  });

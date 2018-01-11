$(document).ready(function() {
  alert("La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. NO puede tener otros símbolos.");
  //El back de registrar.
  $("#imagen_regresar").click(function(event) {
    /* Act on the event */
    window.location.href = './Login.html';
  });

  $("#b_registrar").click(function(event) {

    var x = $("#reg_mail").val();
    var vm = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(x);
    if (vm == false) {
      alert("ese correo no es valido perro");
      $("#reg_mail").val("");
    } else {
      var y = $("#reg_clave").val();
      var vc = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(y);
      if (vc == false) {
        alert("ese contraseña no es valido perro");
        $("#reg_clave").val("");
        $("#reg_clave_conf").val("");
      } else {
        z = $("#reg_clave_conf").val();
        if (y == z) {
          alert("Usuario casi creado");
          var ue = 0;
          $.getJSON('../Json/usuario.json', function(base) {
            for (var i = 0; i < base.length; i++) {
              if (x == base[i].email) {
                ue = 1;
                alert("Lo sentimos el usuario ya existe.");
                //sessionStorage.setItem('sesion_id',data[i].username);
                $("#reg_mail").val("");
                break;
              }


            }

            if (ue == 0) {
              base.push({
                "username": $("#reg_usuario").val(),
                "email": $("#reg_mail").val(),
                "password": $("#reg_clave").val(),
                "direccion": $("#reg_casa").val(),
                "pregunta": $("#reg_preg").val(),
                "imagen": $("#reg_usuario").val()
              });
              var parametros = {
                "test": base
              };
              $.ajax({
                data: parametros,
                url: './Scripts/escribir_json.php',
                type: 'post',
                beforeSend: function() {
                  alert("Procesando, espere por favor...");
                },
                success: function(response) {
                  window.location.href = './Login.html';
                },
                error: function(error, xhr, status) {
                  alert(error)
                  alert(xhr)
                  alert(status)

                }
              });


              //window.location.href = 'Login.html';
            }

          });



        } else {
          alert("Las contraseñas no coinciden :(")

        }
      }
    }

  });

});

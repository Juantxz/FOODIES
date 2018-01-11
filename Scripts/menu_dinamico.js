$(document).ready(function() {
  if (sessionStorage.getItem('sesion_id') == null) {
    setInterval(function() {
      alert("Detectamos que no has iniciado sesión. Bye");
      window.location.href = 'Login.html';
    }, 2000);
  } else {
    console.log(sessionStorage.getItem('sesion_id'));

  }
  if (sessionStorage.getItem('sesion_id') == 'invitado') {
    $("#Cuenta").empty();
    $(".compras").empty();
  }
  //Comienza Manejo de Carrito
  //Inicializamos Json:
  var carrito = {
    ordenes: []
  }
  //Variable que controla el total a pagar (se usa mas adelante)
  var total = 0;
  var evento_mex = 0;
  var evento_asiatica = 0;
  var evento_gourmet = 0;
  var evento_exotica = 0;
  var evento_cambio_seccion=0;
  var evento_quita_prestaña=0;




  //Evento del boton que esta en el div del carrito
  $(".pagar_boton").click(function(event) {
    if(total==0){
      alert("Tu carrito esta vacio. Elige lo que gustes!");
    }
    else{
    var confirmar = confirm("Total a pagar : $" + total + "\n ¿Continuar?");
    if (confirmar) {

      alert("Se te ha hecho el cargo, espera tu comida\n Lugar de Entrega :" + sessionStorage.getItem('ubicacion'));
      total = 0;
      //Vaciamos div y vaciamos json de ordenes
      $("#mostrar_carrito p").empty();
      carrito.ordenes.length = 0;
    } else {
      alert("No se te hará ningún cargo");
    }
  }
  });

  $(".compras").click(function(event) {
    $("#mostrar_carrito").append('<p id="total_pagar"></ p>');
    for (var i = 0; i < carrito.ordenes.length; i++) {
      console.log(carrito.ordenes[i].precio);
      $("#mostrar_carrito").append('<p id="total' + i + '"></ p>');

      $("#total" + i).text(carrito.ordenes[i].producto + "     $" + carrito.ordenes[i].precio);
      $("#total" + i).append('<img class="img_menos"  id="img_quitar' + i + '" src="./Imagenes_Pagina/eliminar.png"></img>');
    }
    $("#total_pagar").text("Total : $" + total);
    $("#mostrar_carrito").toggle(1000);

    //Aqui empieza el desmadre de quitar del carrito.
      $(".img_menos").click(function(event) {
      var id_quitarr = event.target.id.match(/\d+$/)[0];
      var confirmar = confirm("Desea quitar:" + carrito.ordenes[id_quitarr].producto + "\n ¿Continuar?");
      if(confirmar){
        total = total - parseInt(carrito.ordenes[id_quitarr].precio);
        $("#total" + id_quitarr).hide();
        $("img_quitar"+id_quitarr).hide();
      }


        });
  });

  //Aqui acaba lo del despliegue del carrito



  $("#Platillos").click(function(event) {
    /* Act on the event */
    $("#Opciones").toggle(500);
    if(evento_quita_prestaña==0){
    $("#Mexicana").click(function(event) {
      //AQUI APARECEN PLATILLOS DE COMIDA MEXICANA

      if (evento_mex == 0||evento_cambio_seccion==1) {
      $(".Prods").empty();
        $.getJSON('./Json/Comida_Mexican.json?nocache=123', function(data) {
          for (var i = 0; i < data.length; i++) {
            $("#comida img").attr('src', "");
            $('.Prods').append('<div id="mex' + i + '"></ div>');
            $('#mex' + i).append('<img id="mex_img' + i + '"></ img>');
            $('#mex' + i).append('<p id="mex_precio' + i + '"></ p>');
            if (sessionStorage.getItem('sesion_id') != 'invitado') {
              $('#mex' + i).append('<button id="mex_boton' + i + '">Pedir</ button>');
            }
            $('#mex_precio' + i).text("$" + data[i].precio);
            $('#mex_img' + i).attr('src', './Imagenes_Productos/Mexicana/' + data[i].imagen);
          }
          $(".Prods button").click(function(event) {
            //AQUI COMIENZA EL PINCHE CARRITO
            var id = event.target.id.match(/\d+$/)[0];
            $(".alert").fadeIn(1000);

            $(".alert").text("Se ha agregado a tu carrito! :D");
            $(".alert").fadeOut(1000);

            carrito.ordenes.push({
              "producto": data[id].nombre,
              "precio": data[id].precio
            });
            total = total + parseInt(data[id].precio);

          });

        });

        $("#comida").remove();
        evento_mex = 1;
      }


      else{
          $(".Prods").show();
          $.getJSON('./Json/Comida_Mexican.json?nocache=123', function(data) {
            $(".Prods button").click(function(event) {
              //AQUI COMIENZA EL PINCHE CARRITO
              var id = event.target.id.match(/\d+$/)[0];
              $(".alert").fadeIn(1000);

              $(".alert").text("Se ha agregado a tu carrito! :D");
              $(".alert").fadeOut(1000);


              carrito.ordenes.push({
                "producto": data[id].nombre,
                "precio": data[id].precio
              });
              total = total + parseInt(data[id].precio);

            });

          });
      }
      evento_cambio_seccion=1;
    });
    $("#Asiatica").click(function(event) {
      //AQUI APARECEN PLATILLOS DE COMIDA ASIATICA
      if (evento_asiatica == 0||evento_cambio_seccion==1) {
        $(".Prods").empty();
        $.getJSON('./Json/Comida_Asiatica.json?nocache=123', function(data) {
          for (var i = 0; i < data.length; i++) {
            $("#comida img").attr('src', "");
            $('.Prods').append('<div id="mex' + i + '"></ div>');
            $('#mex' + i).append('<img id="mex_img' + i + '"></ img>');
            $('#mex' + i).append('<p id="mex_precio' + i + '"></ p>');
            if (sessionStorage.getItem('sesion_id') != 'invitado') {
              $('#mex' + i).append('<button id="asn_boton' + i + '">Pedir</ button>');
            }
            $('#mex_precio' + i).text("$" + data[i].precio);
            $('#mex_img' + i).attr('src', './Imagenes_Productos/Asiatica/' + data[i].imagen);
          }

          $(".Prods button").click(function(event) {
            //AQUI COMIENZA EL PINCHE CARRITO
            var id = event.target.id.match(/\d+$/)[0];
            $(".alert").fadeIn(1000);

            $(".alert").text("Se ha agregado a tu carrito! :D");
            $(".alert").fadeOut(1000);

            carrito.ordenes.push({
              "producto": data[id].nombre,
              "precio": data[id].precio
            });
            total = total + parseInt(data[id].precio);

          });

        });

        $("#comida").remove();
        evento_asiatica = 1;
      }
      else{
          $(".Prods").show();
          $.getJSON('./Json/Comida_Asiatica.json?nocache=123', function(data) {
            $(".Prods button").click(function(event) {
              //AQUI COMIENZA EL PINCHE CARRITO
              var id = event.target.id.match(/\d+$/)[0];
              $(".alert").fadeIn(1000);

              $(".alert").text("Se ha agregado a tu carrito! :D");
              $(".alert").fadeOut(1000);

              carrito.ordenes.push({
                "producto": data[id].nombre,
                "precio": data[id].precio
              });
              total = total + parseInt(data[id].precio);

            });

          });
      }

      evento_cambio_seccion=1;
    });
    $("#Exotica").click(function(event) {
      //AQUI APARECEN PLATILLOS DE COMIDA EXOTICA

      if (evento_exotica == 0||evento_cambio_seccion==1) {
        $(".Prods").empty();
        $.getJSON('./Json/Comida_Exotica.json?nocache=123', function(data) {
          for (var i = 0; i < data.length; i++) {
            $("#comida img").attr('src', "");
            $('.Prods').append('<div id="mex' + i + '"></ div>');
            $('#mex' + i).append('<img id="mex_img' + i + '"></ img>');
            $('#mex' + i).append('<p id="mex_precio' + i + '"></ p>');
            if (sessionStorage.getItem('sesion_id') != 'invitado') {
              $('#mex' + i).append('<button id="asn_boton' + i + '">Pedir</ button>');
            }
            $('#mex_precio' + i).text("$" + data[i].precio);
            $('#mex_img' + i).attr('src', './Imagenes_Productos/Exotica/' + data[i].imagen);
          }

          $(".Prods button").click(function(event) {
            //AQUI COMIENZA EL PINCHE CARRITO
            var id = event.target.id.match(/\d+$/)[0];
            $(".alert").fadeIn(1000);

            $(".alert").text("Se ha agregado a tu carrito! :D");
            $(".alert").fadeOut(1000);

            carrito.ordenes.push({
              "producto": data[id].nombre,
              "precio": data[id].precio
            });
            total = total + parseInt(data[id].precio);

          });

        });

        $("#comida").remove();
        evento_exotica = 1;
      }
      else{
          $(".Prods").show();
          $.getJSON('./Json/Comida_Exotica.json?nocache=123', function(data) {
            $(".Prods button").click(function(event) {
              //AQUI COMIENZA EL PINCHE CARRITO
              var id = event.target.id.match(/\d+$/)[0];
              $(".alert").fadeIn(1000);

              $(".alert").text("Se ha agregado a tu carrito! :D");
              $(".alert").fadeOut(1000);
              carrito.ordenes.push({
                "producto": data[id].nombre,
                "precio": data[id].precio
              });
              total = total + parseInt(data[id].precio);

            });

          });
      }

evento_cambio_seccion=1;
    });
    $("#Gourmet").click(function(event) {
      //AQUI APARECEN PLATILLOS DE COMIDA GOURMET
      if (evento_gourmet == 0||evento_cambio_seccion==1) {
        $(".Prods").empty();
        $.getJSON('./Json/Comida_Gourmet.json?nocache=123', function(data) {
          for (var i = 0; i < data.length; i++) {
            $("#comida img").attr('src', "");
            $('.Prods').append('<div id="mex' + i + '"></ div>');
            $('#mex' + i).append('<img id="mex_img' + i + '"></ img>');
            $('#mex' + i).append('<p id="mex_precio' + i + '"></ p>');
            if (sessionStorage.getItem('sesion_id') != 'invitado') {
              $('#mex' + i).append('<button id="asn_boton' + i + '">Pedir</ button>');
            }
            $('#mex_precio' + i).text("$" + data[i].precio);
            $('#mex_img' + i).attr('src', './Imagenes_Productos/Gourmet/' + data[i].imagen);
          }

          $(".Prods button").click(function(event) {
            //AQUI COMIENZA EL PINCHE CARRITO
            var id = event.target.id.match(/\d+$/)[0];
            $(".alert").fadeIn(1000);

            $(".alert").text("Se ha agregado a tu carrito! :D");
            $(".alert").fadeOut(1000);

            carrito.ordenes.push({
              "producto": data[id].nombre,
              "precio": data[id].precio
            });
            total = total + parseInt(data[id].precio);

          });

        });

        $("#comida").remove();
        evento_gourmet = 1;
      }
      else{
          $(".Prods").show();
          $.getJSON('./Json/Comida_Exotica.json?nocache=123', function(data) {
            $(".Prods button").click(function(event) {
              //AQUI COMIENZA EL PINCHE CARRITO
              var id = event.target.id.match(/\d+$/)[0];
              $(".alert").fadeIn(1000);

              $(".alert").text("Se ha agregado a tu carrito! :D");
              $(".alert").fadeOut(1000);

              carrito.ordenes.push({
                "producto": data[id].nombre,
                "precio": data[id].precio
              });
              total = total + parseInt(data[id].precio);

            });

          });
      }

evento_cambio_seccion=1;

    });
}
evento_quita_prestaña=1;
  });
  $("#Socios").click(function(event) {
    /* Act on the event */
    $("#Opciones").hide();
    $("#Socios").attr("href", "./Nuestro_Socios.html");
  });
  $("#Pedir").click(function(event) {
    /* Act on the event */
    $("#Opciones").hide();
    $("#Pedir").attr("href", "./Pasos_Pedir.html");

  });
  $("#Cuenta").click(function(event) {
    /* Act on the event */

    $("#Opciones").hide();
    $("#miCuenta").toggle(500);
    $("#nombre").text("Nombre : " + localStorage.getItem("usuario"));
    $.getJSON('./Json/usuario.json?nocache=123', function(data) {
      for (var i = 0; i < data.length; i++) {
        if (localStorage.getItem("usuario") == data[i].username) {
          $("#imagen_perfil").attr('src', './Imagenes_Usuarios/' + data[i].imagen);

          $("#direccion").text("Direccion : " + data[i].direccion);

          break;
        }

      }



    });

  });




  $("#salir").click(function(event) {
    sessionStorage.clear();

  });



});

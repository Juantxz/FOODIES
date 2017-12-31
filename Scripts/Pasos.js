$(document).ready(function() {

setTimeout(function() {
       $("#divpaso2").fadeIn(1500);
   },3000);

   setTimeout(function() {
          $("#divpaso3").fadeIn(1500);
      },6000);

      setTimeout(function() {
             $("#divpaso4").fadeIn(1500);
         },9000);

         setTimeout(function() {
                $("#divpaso5").fadeIn(1500);
            },12000);

            setTimeout(function() {
                   $("#flecha_regresar").fadeIn(1500);
               },15000);

               $("#imagen_regresarR").click(function(event) {
                 /* Act on the event */
               window.location.href = '../HTML/Principal.html';
               });

//$("#textopaso1").attr("href","Registrar_Usuario.html");
//$("#textopaso2").attr("href","Login.html");
});

$(document).ready(function() {
  var jsonURL = "../Json/productos.json";
  var imgList = [];

  $.getJSON(jsonURL, function(json) {
    for (var i = 0; i < json.length; i++) {
      imgList[i] = json[i].imagen;
    }

    var cnt = imgList.length;
    console.log(imgList);
    $(function() {
      setInterval(Slider, 10000);
    });

    function Slider() {
      $('#comida').fadeOut(5000, function() {
        $(this).attr('src', '../Imagenes_Productos/'+imgList[(imgList.length++) % cnt]).fadeIn(5000);
      });
    };

}).fail(function(d,Status,error){
        console.error(" status: " + Status + ", error: "+error)
});

});

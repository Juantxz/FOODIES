<?php

  $json = json_encode($_POST['test'],JSON_PRETTY_PRINT);
      $fp = fopen('./Json/usuario.json', 'w');
      fwrite($fp, $json);
      fclose($fp);
 ?>

<?php
$ruta = "./"; // Indicar ruta
 $filehandle = opendir($ruta); // Abrir archivos
  while ($file = readdir($filehandle)) {
   if ($file != "." && $file != "..") {
    $tamanyo = GetImageSize($ruta . $file);
            ?>
     <img src="<?php echo $ruta.$file ?>" width="30px">Img Uno<br>    
            <?php
   } 
  } 
closedir($filehandle); // Fin lectura archivos
?>
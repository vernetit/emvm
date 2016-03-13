<html lang="es">
<html>
<head>
	 <meta charset="UTF-8">
	<title>s</title>
</head>
<body>

<?php
$handle = @fopen("simbolos", "r");
if ($handle) {
	$i = 0;
    while (($buffer = fgets($handle, 4096)) !== false) {
    	$txt =  $buffer; #split(" ", $buffer);
        echo "window.simbolos[\"$i\"] = \"".trim($txt)."\"<br>";
        $i++;
    }
    if (!feof($handle)) {
        echo "Error: unexpected fgets() fail\n";
    }
    fclose($handle);
}

?>
</body>
</html>

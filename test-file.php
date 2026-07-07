<?php
header('Content-Type: text/plain');

$paths = [
    'silvera-electricidad/img/07_retrato_electricista.png',
    'electricista-milton-sardella/img/tablero_moderno.jpg',
    'web-trujillo/assets/logo-trujillo.png'
];

foreach ($paths as $path) {
    if (file_exists($path)) {
        echo "$path -> Size: " . filesize($path) . " bytes\n";
    } else {
        echo "$path -> DOES NOT EXIST\n";
    }
}
?>

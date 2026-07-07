<?php
header('Content-Type: text/plain');

$projects = [
    'silvera-electricidad',
    'electricista-milton-sardella',
    'electricidad-ocean-park-electricista-facundo-azcurra',
    'noguera-electricista-autorizado-por-ute',
    'barcelo-instalaciones-electricas',
    'prolighting',
    'juan-carlos-martinez-electricidad',
    'alejandro-severo-electricista-autorizado-x-ute'
];

foreach ($projects as $proj) {
    echo "=== PROJECT: $proj ===\n";
    $imgDir = "$proj/img";
    if (file_exists($imgDir) && is_dir($imgDir)) {
        $files = scandir($imgDir);
        foreach ($files as $file) {
            if ($file !== '.' && $file !== '..') {
                $filePath = "$imgDir/$file";
                echo "  - $file (" . filesize($filePath) . " bytes)\n";
            }
        }
    } else {
        echo "  [ERROR] img/ directory does not exist or is not a directory.\n";
    }
    echo "\n";
}
?>

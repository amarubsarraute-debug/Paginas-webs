<?php
header('Content-Type: text/plain');

echo "Current Working Directory: " . getcwd() . "\n\n";

$dir = 'silvera-electricidad';
if (file_exists($dir) && is_dir($dir)) {
    echo "Contents of $dir:\n";
    $files = scandir($dir);
    foreach ($files as $file) {
        if ($file !== '.' && $file !== '..') {
            $path = "$dir/$file";
            echo "  - $file (" . (is_dir($path) ? 'Dir' : 'File') . ")\n";
            if (is_dir($path)) {
                $subFiles = scandir($path);
                foreach ($subFiles as $sub) {
                    if ($sub !== '.' && $sub !== '..') {
                        echo "    |- $sub\n";
                    }
                }
            }
        }
    }
} else {
    echo "Directory $dir does not exist.\n";
}
?>

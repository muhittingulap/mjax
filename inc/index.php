<?php
require_once("../lib/mjax.php");

$ajax_folder = array(
    "test",
);

if (count($ajax_folder) > 0) {
    foreach ($ajax_folder as $k => $v) {
        if ($v) require_once("ajax/" . $v . ".php");
    }
}

if ($_REQUEST[mjxfnc]) \mjax::runMjax();

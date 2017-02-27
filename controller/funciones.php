<?php
include '../model/database.php';

$obj = new MySQl();

$operacion = $_REQUEST["operacion"];

if (strcmp($operacion, 'listar')==0) {
	$sql="SELECT * FROM users";
	$resulset = $obj->consulta($sql);
	$dat = $obj->respondeData($resulset);
	echo json_encode($dat);
}

if (strcmp($operacion, 'update')==0) {
	extract($_REQUEST);
	$sql="UPDATE users SET nombre = '".$nombre."',apellido = '".$apellido."', direccion = '".$direccion."', telefono = '".$telefono."' WHERE id = '".$id."'";
	$obj->ejecutar($sql);
	$sql = "SELECT * FROM users WHERE id = '".$id."'";
	$resulset = $obj->consulta($sql);
	$dat = $obj->respondeData($resulset);
	echo json_encode($dat);
}

if (strcmp($operacion, 'insert')==0) {
	extract($_REQUEST);
	$sql="INSERT INTO users VALUES('','".$nombre."','".$apellido."','".$direccion."','".$telefono."')";
	$obj->ejecutar($sql);
	$sql = "SELECT * FROM users order by id DESC";
	$resulset = $obj->consulta($sql);
	$dat = $obj->respondeData($resulset);
	echo json_encode($dat);
}

if (strcmp($operacion, 'delete')==0) {
	extract($_REQUEST);
	$sql="DELETE FROM users WHERE id = '".$id."'";
	$obj->ejecutar($sql);
	$sql = "SELECT * FROM users";
	$resulset = $obj->consulta($sql);
	$dat = $obj->respondeData($resulset);
	echo json_encode($dat);
}
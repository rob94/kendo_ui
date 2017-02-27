<?php
//conexion a base de datos
class MySQL{
	private $conexion;

	public function MySQL(){
		
		if(!isset($this->conexion)){
			$this->conexion = (mysql_connect("localhost","root","")) or die (mysql_error());
			mysql_select_db("kendoui",$this->conexion) or die(mysql_error());
			
		}

		mysql_query("SET NAMES 'utf8'");
		mysql_query("SET lc_time_names = 'es_ES'");
	}

	public function consulta($consulta){

		$resultado = mysql_query($consulta,$this->conexion);

		if($this->getError()){
			return $this->getDebugError();
		}

		return $resultado;
	}

	public function ejecutar($sql){
		mysql_query($sql);
	}

	public function fetch_assoc($data){
		return mysql_fetch_assoc($data);
	}

	public function respondeData($data){
		$rows=array();
		while ($fila=$this->fetch_assoc($data)){
			$rows[]=$fila;
		}
		return $rows;
	}

	function getError(){
		$error = mysql_error($this->conexion);
		return $error;
	}

	function getDebugError(){
		$delimitar = "Cannot delete or update a parent row: a foreign key constraint fails";
		$array = explode('(', $this->getError());
		$error = trim($array[0]);
		$cadena="";
		if ($error == $delimitar) {
			$cadena='No se puede borrar/actualizar este registro porque esta relacionado con otros gastos';
		}else{
			echo $cadena = $this->getError();
		}
		if (!empty($cadena)) {
			throw new Exception($cadena);
		}
	}
}
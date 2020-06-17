<?php
	class DBClass {

		private $host = "localhost";
		private $username = "konecta";
		private $password = "123456";
		private $database = "inventory";

		public $connection;

		// get the database connection
		public function dbConnection(){

			$this->connection = null;

			try{
				$this->connection = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->database, $this->username, $this->password);
				$this->connection->exec("set names utf8");
			}catch(PDOException $exception){
				echo "Error: " . $exception->getMessage();
			}

			return $this->connection;
		}
	}
?>
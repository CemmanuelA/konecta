<?php
class Product{

    // Connection instance
    private $connection;

    // table name
    private $table_name = "product";

    // table columns
    public $id;
    public $name;
    public $ref;
    public $price;
    public $weight;
    public $category;
    public $stock;
    public $create_at;
    public $last_sale;

    public function __construct($connection){
        $this->connection = $connection;
    }

    //C
    public function create(){
    }
    //R
    public function read(){
        $query = "SELECT * FROM" . $this->table_name;

        $stmt = $this->connection->prepare($query);

        $stmt->execute();

        return $stmt;
    }
    //U
    public function update(){}
    //D
    public function delete(){}
}
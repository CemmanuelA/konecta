<?php
// SET HEADER
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// INCLUDING DATABASE AND MAKING OBJECT
require '../config/dbclass.php';
$db_connection = new DBClass();
$conn = $db_connection->dbConnection();

// GET DATA FORM REQUEST
$data = json_decode(file_get_contents("php://input"));

//CREATE MESSAGE ARRAY AND SET EMPTY
$msg['message'] = '';

// CHECK IF RECEIVED DATA FROM THE REQUEST
if(isset($data->name) && isset($data->ref) && isset($data->price) & isset($data->weight) & isset($data->category) & isset($data->stock)) { 
    // CHECK DATA VALUE IS EMPTY OR NOT
    if(!empty($data->name) && !empty($data->ref) && !empty($data->price) & !empty($data->weight) & !empty($data->category) & !empty($data->stock)){
        
        $insert_query = "INSERT INTO `product`(name,ref,price,weight,category,stock) VALUES(:name,:ref,:price,:weight,:category,:stock)";
        
        $insert_stmt = $conn->prepare($insert_query);
        // DATA BINDING
        $insert_stmt->bindValue(':name', htmlspecialchars(strip_tags($data->name)),PDO::PARAM_STR);
        $insert_stmt->bindValue(':ref', htmlspecialchars(strip_tags($data->ref)),PDO::PARAM_STR);
        $insert_stmt->bindValue(':price', htmlspecialchars(strip_tags($data->price)),PDO::PARAM_STR);
        $insert_stmt->bindValue(':weight', htmlspecialchars(strip_tags($data->weight)),PDO::PARAM_STR);
        $insert_stmt->bindValue(':category', htmlspecialchars(strip_tags($data->category)),PDO::PARAM_STR);
        $insert_stmt->bindValue(':stock', htmlspecialchars(strip_tags($data->stock)),PDO::PARAM_STR);
        
        if($insert_stmt->execute()){
            $msg['message'] = 'Data Inserted Successfully';
        }else{
            $msg['message'] = 'Data not Inserted';
        } 
        
    }else{
        $msg['message'] = 'Oops! empty field detected. Please fill all the fields';
    }
}
else{
    $msg['message'] = 'Please fill all the fields';
}
//ECHO DATA IN JSON FORMAT
echo  json_encode($msg);
?>
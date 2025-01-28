<?php
$serverName = ".\SQLEXPRESS"; // نام سرور
$connectionOptions = array(
    "Database" => "user_group_management",
    "Uid" => "sa",
    "PWD" => "Power12#$",
    "CharacterSet" => "UTF-8"
);

// ایجاد اتصال به پایگاه داده
$conn = sqlsrv_connect($serverName, $connectionOptions);

// بررسی اتصال
if ($conn === false) {
    die(print_r(sqlsrv_errors(), true));
}

// دریافت اطلاعات فرم
session_start();
$user_id = $_SESSION['user_id'];
$field_id = $_POST['field_id'];
$subfield_id = $_POST['subfield_id'];
$specialization = $_POST['specialization'];

// افزودن اطلاعات به جدول specializations
$sql = "INSERT INTO specializations (user_id, field_id, subfield_id, specialization) VALUES (?, ?, ?, ?)";
$params = array($user_id, $field_id, $subfield_id, $specialization);
$stmt = sqlsrv_query($conn, $sql, $params);

if ($stmt === false) {
    die(print_r(sqlsrv_errors(), true));
}

echo "اطلاعات با موفقیت ثبت شد!";
sqlsrv_close($conn);
?>

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
$country = $_POST['country'];
$province = $_POST['province'];
$county = $_POST['county'];
$section = $_POST['section'];
$district = $_POST['district'];
$village = $_POST['village'];
$neighborhood = $_POST['neighborhood'];
$street = $_POST['street'];
$alley = $_POST['alley'];

// دریافت شناسه کاربر از session
session_start();
$user_id = $_SESSION['user_id'];

// افزودن اطلاعات لوکیشن به جدول locations
$sql = "INSERT INTO locations (user_id, country, province, county, section, district, village, neighborhood, street, alley) VALUES (?, N?, N?, N?, N?, N?, N?, N?, N?, N?)";
$params = array($user_id, $country, $province, $county, $section, $district, $village, $neighborhood, $street, $alley);
$stmt = sqlsrv_query($conn, $sql, $params);

if ($stmt === false) {
    die(print_r(sqlsrv_errors(), true));
}

echo "لوکیشن با موفقیت ثبت شد!";
header("Location: success.html");
exit();

sqlsrv_close($conn);
?>

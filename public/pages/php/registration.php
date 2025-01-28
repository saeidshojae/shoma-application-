<?php
$serverName = ".\SQLEXPRESS"; 
$connectionOptions = array(
    "Database" => "user_group_management",
    "Uid" => "sa",
    "PWD" => "Power12#$",
    "CharacterSet" => "UTF-8"
);
$conn = sqlsrv_connect($serverName, $connectionOptions);

if ($conn === false) {
    die("اتصال به پایگاه داده ناموفق بود: " . print_r(sqlsrv_errors(), true));
}
?>

<!DOCTYPE html>
<html lang="fa">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>فرم ثبت‌نام - احراز هویت</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/rastikerdar/shabnam-font@v3.0.1/dist/font-face.css">
    <style>
        body {
            font-family: 'Shabnam', sans-serif;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            min-height: 100vh;
            margin: 0;
            overflow-y: auto;
        }
        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 90%;
            max-width: 400px;
            box-sizing: border-box;
            text-align: right;
            direction: rtl;
        }
        .container h2 {
            margin-bottom: 20px;
            text-align: center;
            color: #4CAF50;
        }
        .form-group {
            margin-bottom: 15px;
            position: relative;
        }
        .form-group label {
            display: block;
            margin-bottom: 5px;
            color: #333;
        }
        .form-group input, .form-group select {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
            font-family: 'Shabnam', sans-serif;
            direction: rtl;
        }
        .form-group input[type="submit"] {
            background-color: #4CAF50;
            color: white;
            border: none;
            cursor: pointer;
            text-align: center;
            transition: background-color 0.3s ease;
        }
        .form-group input[type="submit"]:hover {
            background-color: #45a049;
        }
        .error-message {
            color: red;
            font-size: 12px;
            display: none;
        }
        .hint {
            font-size: 12px;
            color: #888;
        }
        .form-group input:invalid {
            border-color: red;
        }
        .form-group input:invalid + .error-message {
            display: block.
        }
        @media (min-width: 600px) {
            .container {
                width: 400px.
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>فرم احراز هویت</h2>
        <form id="registrationForm" action="registration.php" method="POST">
            <div class="form-group">
                <label for="firstName">نام:</label>
                <input type="text" id="firstName" name="firstName" pattern="[آ-ی ]+" title="فقط حروف فارسی مجاز است" required>
                <div class="hint">فقط حروف فارسی مجاز است.</div>
            </div>
            <div class="form-group">
                <label for="lastName">نام خانوادگی:</label>
                <input type="text" id="lastName" name="lastName" pattern="[آ-ی ]+" title="فقط حروف فارسی مجاز است" required>
                <div class="hint">فقط حروف فارسی مجاز است.</div>
            </div>
            <div class="form-group">
                <label for="birthdate">تاریخ تولد:</label>
                <input type="text" id="birthdate" name="birthdate" placeholder="۱۳۰۰/۰۱/۰۱" required>
                <div class="hint">فرمت تاریخ: ۱۳۰۰/۰۱/۰۱</div>
            </div>
            <div class="form-group">
                <label for="gendertypeid">جنسیت:</label>
                <select id="gendertypeid" name="gendertypeid" required>
                    <option value="" disabled selected>انتخاب کنید</option>
                    <?php
                    $sql = "SELECT GenderID, GenderName FROM gendertypes";
                    $stmt = sqlsrv_query($conn, $sql);

                    if ($stmt !== false) {
                        while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
                            echo '<option value="' . htmlspecialchars($row['GenderID']) . '">' . htmlspecialchars($row['GenderName']) . '</option>';
                        }
                    } else {
                        echo '<option value="">خطا در دریافت داده‌ها</option>';
                    }
                    ?>
                </select>
            </div>
            <div class="form-group">
                <label for="nationalID">شماره ملی:</label>
                <input type="text" id="nationalID" name="nationalID" pattern="\d{10}" title="شماره ملی باید ۱۰ رقمی باشد" required>
                <div class="hint">شماره ملی باید ۱۰ رقمی باشد.</div>
            </div>
            <div class="form-group">
                <label for="phone">شماره تلفن:</label>
                <div style="display: flex;">
                    <select id="countryCode" name="countryCode" style="width: 30%; order: 2;">
                        <?php
                        $sql = "SELECT CountryCode, CountryName, PhoneCode FROM Countries";
                        $stmt = sqlsrv_query($conn, $sql);

                        if ($stmt !== false) {
                            while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
                                echo '<option value="' . htmlspecialchars($row['PhoneCode']) . '">' . htmlspecialchars($row['PhoneCode']) . ' ' . htmlspecialchars($row['CountryName']) . '</option>';
                            }
                        } else {
                            echo '<option value="">خطا در دریافت داده‌ها</option>';
                        }
                        ?>
                    </select>
                    <input type="text" id="phone" name="phone" pattern="9\d{9}" title="شماره تلفن باید با ۹ شروع شود و ۱۰ رقم داشته باشد" required style="width: 70%; order: 1;">
                </div>
                <div class="hint">شماره تلفن باید با ۹ شروع شود و حداقل ۱۰ رقم باشد.</div>
            </div>
            <div class="form-group">
                <label for="email">ایمیل:</label>
                <input type="email" id="email" name="email" title="ایمیل معتبر وارد کنید" required>
                <div class="hint">لطفاً یک ایمیل معتبر وارد کنید.</div>
            </div>
            <div class="form-group">
                <input type="submit" value="احراز هویت">
            </div>
        </form>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        $(document).ready(function(){
            $('#registrationForm').on('submit', function(event) {
                event.preventDefault();
                var valid = true;

                // اعتبارسنجی نام
                if (!$('#firstName').val().match(/[آ-ی ]+/)) {
                    $('#firstNameError').show();
                    valid = false;
                } else {
                    $('#firstNameError').hide();
                }

                // اعتبارسنجی نام خانوادگی
                if (!$('#lastName').val().match(/[آ-ی ]+/)) {
                    $('#lastNameError').show();
                    valid = false;
                } else {
                    $('#lastNameError').hide();
                }

                // اعتبارسنجی تاریخ تولد
                if (!$('#birthdate').val().match(/^[1-4]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/)) {
                    $('#birthdateError').show();
                    valid = false;
                } else {
                    $('#birthdateError').hide();
                }

                // اعتبارسنجی جنسیت
                if (!$('#gendertypeid').val()) {
                    $('#gendertypeidError').show();
                    valid = false;
                } else {
                    $('#gendertypeidError').hide();
                }

                // اعتبارسنجی شماره ملی
                if (!$('#nationalID').val().match(/^\d{10}$/)) {
                    $('#nationalIDError').show();
                    valid = false;
                } else {
                    $('#nationalIDError').hide();
                }

                // اعتبارسنجی شماره تلفن
                if (!$('#phone').val().match(/^9\d{9}$/)) {
                    $('#phoneError').show();
                    valid = false;
                } else {
                    $('#phoneError').hide();
                }

                // اعتبارسنجی ایمیل
                if (!$('#email').val().match(/^\S+@\S+\.\S+$/)) {
                    $('#emailError').show();
                    valid = false;
                } else {
                    $('#emailError').hide();
                }

                if (valid) {
                    alert("احراز هویت با موفقیت انجام شد!");
                    this.submit();
                }
            });

            // تبدیل اعداد فارسی و عربی به اعداد انگلیسی
            $('#nationalID, #phone, #birthdate').on('input', function() {
                $(this).val($(this).val().replace(/[۰-۹]/g, function(d) {
                    return String.fromCharCode(d.charCodeAt(0) - 1728);
                }).replace(/[٠-٩]/g, function(d) {
                    return String.fromCharCode(d.charCodeAt(0) - 1584);
                }));
            });
        });
    </script>
</body>
</html>

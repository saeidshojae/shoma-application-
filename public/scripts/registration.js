document.addEventListener('DOMContentLoaded', function() {
    var registrationForm = document.getElementById('registrationForm');
    if (!registrationForm) {
        console.error("عنصر registrationForm یافت نشد.");
        return; // جلوگیری از اجرای کد در صورت عدم وجود عنصر
    }

    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();
        var isValid = true;

        // اعتبارسنجی نام
        var firstName = document.getElementById('firstName').value;
        var firstNameError = document.getElementById('firstNameError');
        if (!/^[\u0600-\u06FF\s]+$/.test(firstName)) {
            firstNameError.style.display = 'block';
            isValid = false;
        } else {
            firstNameError.style.display = 'none';
        }

        // اعتبارسنجی نام خانوادگی
        var lastName = document.getElementById('lastName').value;
        var lastNameError = document.getElementById('lastNameError');
        if (!/^[\u0600-\u06FF\s]+$/.test(lastName)) {
            lastNameError.style.display = 'block';
            isValid = false;
        } else {
            lastNameError.style.display = 'none';
        }

        // اعتبارسنجی شماره ملی
        var nationalID = document.getElementById('nationalID').value;
        var nationalIDError = document.getElementById('nationalIDError');
        if (nationalID.length !== 10 || !/^\d{10}$/.test(nationalID)) {
            nationalIDError.style.display = 'block';
            isValid = false;
        } else {
            nationalIDError.style.display = 'none';
        }

        // اعتبارسنجی شماره تلفن
        var phoneNumber = document.getElementById('phoneNumber').value;
        var phoneNumberError = document.getElementById('phoneNumberError');
        if (phoneNumber.charAt(0) === '0') {
            phoneNumber = phoneNumber.substring(1);
        }
        if (phoneNumber.length < 10 || phoneNumber.charAt(0) !== '9') {
            phoneNumberError.style.display = 'block';
            isValid = false;
        } else {
            phoneNumberError.style.display = 'none';
        }
        document.getElementById('phoneNumber').value = phoneNumber;

        if (isValid) {
            alert('احراز هویت با موفقیت انجام شد');
            // دریافت اطلاعات کاربر
            var newUser = {
                id: new Date().getTime(),
                firstName: firstName,
                lastName: lastName,
                nationalID: nationalID,
                phoneNumber: phoneNumber,
                city: "تهران", // این مقادیر را بعداً براساس داده‌های واقعی تنظیم کنید
                specialty: "مهندسی" // این مقادیر را بعداً براساس داده‌های واقعی تنظیم کنید
            };

            console.log("کاربر جدید: ", newUser);

            // ارسال درخواست AJAX به سرور برای ذخیره اطلاعات
            $.ajax({
                url: 'http://localhost:3001/save_user',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(newUser),
                success: function(response) {
                    console.log('کاربر با موفقیت ذخیره شد!', response);
                    // هدایت به صفحه بعدی پس از دریافت پاسخ موفقیت‌آمیز
                    window.location.href = "../pages/location.html"; // این خط را از حالت کامنت خارج کنید
                },
                error: function(xhr, status, error) {
                    console.error('خطا در ذخیره کاربر:', error);
                }
            });

            // اضافه کردن کاربر به گروه
            addUserToGroup(newUser);
        }
    });

    function addUserToGroup(user) {
        const users = [
            { id: 1, city: 'تهران', specialty: 'مهندسی' },
            { id: 2, city: 'اصفهان', specialty: 'پزشکی' },
            { id: 3, city: 'مشهد', specialty: 'حقوق' },
            { id: 4, city: 'شیراز', specialty: 'فناوری' }
        ];

        users.push(user);
        console.log("لیست کاربران: ", users);
        const userGroups = categorizeUsers(users);
        console.log("گروه‌های کاربران: ", userGroups);
    }

    function categorizeUsers(users) {
        const groups = {};

        users.forEach(user => {
            const groupKey = `${user.city}_${user.specialty}`;
            if (!groups[groupKey]) {
                groups[groupKey] = [];
            }
            groups[groupKey].push(user);
        });

        return groups;
    }
});


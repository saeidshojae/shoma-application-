const users = [];

// افزودن کاربر به گروه
function addUserToGroup(user) {
    users.push(user);
    const userGroups = categorizeUsers(users);
    console.log(userGroups);

    // ارسال درخواست AJAX به سرور برای ذخیره گروه‌بندی کاربران
    $.ajax({
        url: 'http://localhost:3001/save_groups',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(userGroups),
        success: function(response) {
            console.log('گروه‌ها با موفقیت ذخیره شدند!', response);
        },
        error: function(xhr, status, error) {
            console.error('خطا در ذخیره گروه‌ها:', error);
        }
    });
}

// الگوریتم دسته‌بندی کاربران
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

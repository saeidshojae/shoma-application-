document.addEventListener('DOMContentLoaded', function() {
    var specialtyForm = document.getElementById('specialtyForm');
    if (specialtyForm) {
        specialtyForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // اعتبارسنجی فیلدها
            var specialty = document.getElementById('specialty').value;
            var field = document.getElementById('field').value;

            // اگر اعتبارسنجی خاصی نیاز دارید، اینجا اضافه کنید
            if (!specialty || !field) {
                alert("لطفاً تمامی فیلدها را پر کنید.");
                return;
            }

            // ارسال درخواست AJAX به سرور
            $.ajax({
                url: 'http://localhost:3001/save_specialties',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ specialties: [specialty], fields: [field] }),
                success: function(response) {
                    alert('تخصص با موفقیت ثبت شد');
                    console.log('Specialties saved successfully!', response);
                },
                error: function(xhr, status, error) {
                    alert('خطا در ثبت تخصص');
                    console.error('Error saving specialties:', error);
                }
            });
        });
    } else {
        console.error("عنصر specialtyForm یافت نشد.");
    }
});


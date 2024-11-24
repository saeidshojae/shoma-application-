document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Validate National ID
    const nationalID = document.getElementById('nationalID').value;
    if (nationalID.length < 10) {
        alert('کد ملی باید حداقل ۱۰ رقم باشد.');
        return;
    }
    
    // Validate Phone Number
    const phoneNumber = document.getElementById('phoneNumber').value;
    if (!/^09\d{9}$/.test(phoneNumber)) {
        alert('شماره تلفن باید با ۰۹ شروع شود و ۱۱ رقم باشد.');
        return;
    }
    
    // Display Welcome Message
    document.getElementById('welcomeMessage').classList.remove('hidden');
});

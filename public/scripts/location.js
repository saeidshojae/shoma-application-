// مدیریت مکان‌یابی و نمایش نقشه
let map, marker;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 35.6892, lng: 51.3890 }, // Default to Tehran
        zoom: 8,
    });

    marker = new google.maps.Marker({
        position: { lat: 35.6892, lng: 51.3890 },
        map: map,
    });

    map.addListener('click', function(event) {
        placeMarker(event.latLng);
    });
}

function placeMarker(location) {
    marker.setPosition(location);
    updateLocationDisplay(location);
}

function updateLocationDisplay(location) {
    const locationDisplay = `مکان انتخاب شده: ${location.lat()}, ${location.lng()}`;
    document.getElementById('locationDisplay').value = locationDisplay;
}

document.getElementById('detectLocation').addEventListener('click', function() {
    const loadingMessage = document.createElement('div');
    loadingMessage.id = 'loadingMessage';
    loadingMessage.textContent = 'در حال تشخیص موقعیت...';
    document.body.appendChild(loadingMessage);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };

            marker.setPosition(pos);
            map.setCenter(pos);
            updateLocationDisplay(pos);
            document.body.removeChild(loadingMessage);
        }, function(error) {
            handleLocationError(true, error);
            document.body.removeChild(loadingMessage);
        });
    } else {
        handleLocationError(false, null);
        document.body.removeChild(loadingMessage);
    }
});

function handleLocationError(browserHasGeolocation, error) {
    let errorMessage = 'خطا در دسترسی به موقعیت مکانی شما.';
    if (error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                errorMessage = 'دسترسی به موقعیت مکانی شما رد شد. لطفاً دسترسی به موقعیت مکانی را فعال کنید.';
                break;
            case error.POSITION_UNAVAILABLE:
                errorMessage = 'اطلاعات موقعیت مکانی در دسترس نیست.';
                break;
            case error.TIMEOUT:
                errorMessage = 'درخواست موقعیت مکانی زمان برد.';
                break;
            case error.UNKNOWN_ERROR:
                errorMessage = 'یک خطای ناشناخته رخ داد.';
                break;
        }
    } else {
        errorMessage = 'مرورگر شما از قابلیت مکان‌یابی پشتیبانی نمی‌کند.';
    }
    alert(errorMessage);
}

document.getElementById('locationForm').addEventListener('submit', function(event) {
    const locationParts = document.getElementById('locationDisplay').value.split(' / ');
    if (locationParts.length < 7 || locationParts.some(part => part.trim() === '')) {
        event.preventDefault();
        alert('لطفاً تمام اطلاعات لازم برای لوکیشن خود را وارد کنید.');
    }
});

document.getElementById('locationDisplay').addEventListener('click', function() {
    var locationParts = this.value.split(' / ');
    if (locationParts.length === 2) {
        this.value = locationParts[0];
        document.getElementById('iranProvinces').style.display = 'block';
        resetDropdowns(['tehranCounties', 'countySections', 'districts', 'villages', 'areas']);
    } else if (locationParts.length === 3) {
        this.value = locationParts.slice(0, 2).join(' / ');
        document.getElementById('tehranCounties').style.display = 'block';
        resetDropdowns(['countySections', 'districts', 'villages', 'areas']);
    } else if (locationParts.length === 4) {
        this.value = locationParts.slice(0, 3).join(' / ');
        document.getElementById('countySections').style.display = 'block';
        resetDropdowns(['districts', 'villages', 'areas']);
    } else if (locationParts.length === 5) {
        this.value = locationParts.slice(0, 4).join(' / ');
        document.getElementById('districts').style.display = 'block';
        resetDropdowns(['villages', 'areas']);
    } else if (locationParts.length === 6) {
        this.value = locationParts.slice(0, 5).join(' / ');
        document.getElementById('villages').style.display = 'block';
        resetDropdowns(['areas']);
    } else if (locationParts.length === 7) {
        this.value = locationParts.slice(0, 6).join(' / ');
        document.getElementById('areas').style.display = 'block';
    } else {
        resetDropdowns(['iranProvinces', 'tehranCounties', 'countySections', 'districts', 'villages', 'areas']);
    }
});

function resetDropdowns(dropdownIds) {
    dropdownIds.forEach(function(id) {
        document.getElementById(id).style.display = 'none';
    });
}

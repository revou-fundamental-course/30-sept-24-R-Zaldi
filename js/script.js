// Mengambil elemen yang dibutuhkan
const inputSuhu = document.getElementById('input-suhu');
const hasilSuhu = document.getElementById('hasil-suhu');
const konversiBtn = document.querySelector('.konversi');
const resetBtn = document.querySelector('.reset');
const reverseBtn = document.querySelector('.reverse');
const caraKalkulasi = document.getElementById('how-to-suhu'); // Textarea cara kalkulasi
const conversionInfo = document.querySelector('section article'); // Bagian artikel konversi
const headerInfo = document.querySelector('section header h2'); // Elemen h2 header

let isCelsiusToFahrenheit = true; // Mengatur arah konversi awal

// Fungsi untuk mengonversi dari Celsius ke Fahrenheit
function convertToFahrenheit(celsius) {
    return Math.round((celsius * 9/5) + 32); // Mengembalikan hasil sebagai bilangan bulat
}

// Fungsi untuk mengonversi dari Fahrenheit ke Celsius
function convertToCelsius(fahrenheit) {
    return Math.round((fahrenheit - 32) * 5/9); // Mengembalikan hasil sebagai bilangan bulat
}

// Fungsi untuk memperbarui konten artikel dan header konversi sesuai arah konversi
function updateConversionInfo() {
    if (isCelsiusToFahrenheit) {
        // Mengubah konten artikel menjadi konversi Celcius ke Fahrenheit
        conversionInfo.innerHTML = `
            <p>Suhu <span class="suhu-style">S</span> dalam derajat fahrenheit (&deg;F) sama dengan suhu <span
                class="suhu-style">S</span> dalam derajat Celcius (&deg;C) kali 9/5 tambah 32</p>
            <p><span class="suhu-style">S</span> (&deg;F) = (<span class="suhu-style">S</span> (&deg;C) &times; 9/5) + 32</p>
            <p>atau</p>
            <p><span class="suhu-style">S</span> (&deg;F) = (<span class="suhu-style">S</span> (&deg;C) &times; 1.8) + 32</p>
        `;
        // Mengubah header menjadi "Cara Konversi Celcius ke Fahrenheit"
        headerInfo.innerHTML = "Cara Konversi Celcius (&deg;C) ke Fahrenheit (&deg;F)";
    } else {
        // Mengubah konten artikel menjadi konversi Fahrenheit ke Celcius
        conversionInfo.innerHTML = `
            <p>Suhu <span class="suhu-style">S</span> dalam derajat Celcius (&deg;C) sama dengan suhu <span
                class="suhu-style">S</span> dalam derajat Fahrenheit (&deg;F) dikurangi 32 lalu kali 5/9</p>
            <p><span class="suhu-style">S</span> (&deg;C) = (<span class="suhu-style">S</span> (&deg;F) - 32) &times; 5/9</p>
        `;
        // Mengubah header menjadi "Cara Konversi Fahrenheit ke Celcius"
        headerInfo.innerHTML = "Cara Konversi Fahrenheit (&deg;F) ke Celcius (&deg;C)";
    }
}

// Fungsi untuk menangani logika konversi
function handleConversion() {
    let input = parseFloat(inputSuhu.value); // Mendapatkan nilai input dari pengguna
    let result;

    if (isNaN(input)) { // Validasi apakah input berupa angka
        alert("Masukkan suhu yang valid.");
        return;
    }

    // Cek apakah konversi saat ini dari Celsius ke Fahrenheit atau sebaliknya
    if (isCelsiusToFahrenheit) {
        result = convertToFahrenheit(input); // Konversi dari Celsius ke Fahrenheit
        hasilSuhu.value = result; // Tampilkan hasil dalam Fahrenheit
        caraKalkulasi.value = `${input}°C * 9/5 + 32 = ${result}°F`; // Tampilkan cara kalkulasi
    } else {
        result = convertToCelsius(input); // Konversi dari Fahrenheit ke Celsius
        hasilSuhu.value = result; // Tampilkan hasil dalam Celsius
        caraKalkulasi.value = `(${input}°F - 32) * 5/9 = ${result}°C`; // Tampilkan cara kalkulasi
    }
}

// Fungsi untuk mereset form dan hasil
function handleReset() {
    inputSuhu.value = ''; // Kosongkan input suhu
    hasilSuhu.value = ''; // Kosongkan hasil suhu
    caraKalkulasi.value = ''; // Kosongkan cara kalkulasi
}

// Fungsi untuk menukar input (Celsius <--> Fahrenheit)
function handleReverse() {
    // Berpindah antara input Celsius dan Fahrenheit
    isCelsiusToFahrenheit = !isCelsiusToFahrenheit;

    // Ubah label berdasarkan arah konversi saat ini
    if (isCelsiusToFahrenheit) {
        document.querySelector('label[for="input-suhu"]').innerHTML = "<strong>Celcius</strong>(&deg;C)";
        document.querySelector('label[for="hasil-suhu"]').innerHTML = "<strong>Fahrenheit</strong>(&deg;F)";
    } else {
        document.querySelector('label[for="input-suhu"]').innerHTML = "<strong>Fahrenheit</strong>(&deg;F)";
        document.querySelector('label[for="hasil-suhu"]').innerHTML = "<strong>Celcius</strong>(&deg;C)";
    }

    // Kosongkan input dan hasil saat menukar
    handleReset();

    // Perbarui artikel konversi dan header
    updateConversionInfo();
}

// Menambahkan event listener untuk tombol
konversiBtn.addEventListener('click', handleConversion); // Jalankan konversi saat tombol "Konversi" diklik
resetBtn.addEventListener('click', handleReset);         // Reset input dan hasil saat tombol "Reset" diklik
reverseBtn.addEventListener('click', handleReverse);     // Tukar posisi input saat tombol "Reverse" diklik

// Set artikel konversi dan header saat halaman pertama kali dimuat
updateConversionInfo();

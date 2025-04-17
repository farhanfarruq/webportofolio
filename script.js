// Anda bisa menambahkan interaktivitas di sini, seperti animasi atau efek scroll.
document.addEventListener('DOMContentLoaded', function () {
    console.log('Portofolio siap!');


    // Fungsi untuk menambahkan animasi scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

// Ambil semua elemen dengan class 'hidden'
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// Efek perubahan background header saat scroll
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = '#ffffff';
        header.style.boxShadow = 'none';
    }
});

});
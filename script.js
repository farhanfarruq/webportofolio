// Tambahkan kode ini ke script.js Anda
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portofolio siap dengan fitur interaktif!');

    // Animasi scroll dengan IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    // Amati elemen dengan class 'hidden'
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // Efek perubahan background header saat scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 4px 20px rgba(0, 123, 255, 0.15)';
        } else {
            header.style.backgroundColor = '#ffffff';
            header.style.boxShadow = 'none';
        }
    });

    // Smooth scrolling untuk navigasi
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });

    // Efek cursor khusus
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Animasi dot dengan delay
        setTimeout(() => {
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        }, 100);
    });

    // Efek hover khusus untuk elemen yang dapat diklik
    const clickables = document.querySelectorAll('a, button, .project-item');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorDot.classList.add('dot-hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorDot.classList.remove('dot-hover');
        });
    });

    // Background animasi gelombang
    const waveCanvas = document.createElement('canvas');
    waveCanvas.id = 'wave-background';
    document.body.prepend(waveCanvas);
    
    const ctx = waveCanvas.getContext('2d');
    let width = (waveCanvas.width = window.innerWidth);
    let height = (waveCanvas.height = window.innerHeight);
    
    // Resize canvas saat window diubah ukurannya
    window.addEventListener('resize', () => {
        width = waveCanvas.width = window.innerWidth;
        height = waveCanvas.height = window.innerHeight;
    });
    
    // Variabel animasi gelombang
    const waves = [
        { y: height * 0.25, length: 0.01, amplitude: 50, speed: 0.003, color: 'rgba(135, 206, 250, 0.2)' },
        { y: height * 0.35, length: 0.02, amplitude: 30, speed: 0.002, color: 'rgba(100, 149, 237, 0.15)' },
        { y: height * 0.45, length: 0.015, amplitude: 40, speed: 0.001, color: 'rgba(65, 105, 225, 0.1)' }
    ];
    
    let angle = 0;
    
    function drawWaves() {
        ctx.clearRect(0, 0, width, height);
        
        waves.forEach(wave => {
            ctx.beginPath();
            ctx.moveTo(0, wave.y);
            
            for (let i = 0; i < width; i++) {
                ctx.lineTo(
                    i, 
                    wave.y + Math.sin(i * wave.length + angle) * wave.amplitude
                );
            }
            
            ctx.lineTo(width, height);
            ctx.lineTo(0, height);
            ctx.closePath();
            ctx.fillStyle = wave.color;
            ctx.fill();
            
            angle += wave.speed;
        });
        
        requestAnimationFrame(drawWaves);
    }
    
    drawWaves();

    // Efek hover 3D untuk project cards
    document.querySelectorAll('.project-item').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleY = (x - centerX) / 20;
            const angleX = (centerY - y) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.05, 1.05, 1.05)`;
            card.style.boxShadow = `${-angleY}px ${angleX}px 20px rgba(0, 123, 255, 0.3)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            card.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        });
    });

    // Efek highlight saat scroll untuk section
    document.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('nav a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });
});
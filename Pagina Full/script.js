// Animaciones al hacer scroll (fade-in suave)
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target); // Dejar de observar una vez que se ha animado
        }
    });
}, { threshold: 0.1 }); // Activar cuando el 10% del elemento sea visible

document.querySelectorAll('.download-section, .support, .support-form, .footer').forEach(sec => {
    observer.observe(sec);
});

// Guardar nombre al enviar formulario
document.getElementById('supportForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = this.name.value;
    localStorage.setItem('userName', name);
    document.getElementById('confirmationMessage').style.display = 'block';

    // Toast
    showToast(`Gracias por tu mensaje, ${name}. ¡Te contactaremos pronto!`);

    this.reset(); // Limpiar form
});

// Toast Notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.innerText = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.padding = '15px 20px';
    toast.style.background = '#333';
    toast.style.color = '#ffcc00';
    toast.style.borderRadius = '10px';
    toast.style.boxShadow = '0 4px 10px rgba(0,0,0,0.3)';
    toast.style.zIndex = 9999;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Botón para subir al top
const btnScrollTop = document.createElement('button');
btnScrollTop.innerHTML = '⬆️';
btnScrollTop.style.position = 'fixed';
btnScrollTop.style.bottom = '30px';
btnScrollTop.style.left = '30px';
btnScrollTop.style.padding = '10px';
btnScrollTop.style.borderRadius = '50%';
btnScrollTop.style.background = '#ffcc00';
btnScrollTop.style.border = 'none';
btnScrollTop.style.fontSize = '1.5rem';
btnScrollTop.style.cursor = 'pointer';
btnScrollTop.style.display = 'none';
btnScrollTop.style.zIndex = 9999;
btnScrollTop.style.boxShadow = '0 4px 10px rgba(0,0,0,0.3)';
document.body.appendChild(btnScrollTop);

btnScrollTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Optimizar el botón para subir al top con debounce
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            if (window.scrollY > 300) {
                btnScrollTop.style.display = 'block';
            } else {
                btnScrollTop.style.display = 'none';
            }
            scrollTimeout = null;
        }, 100); // Reducir la frecuencia de ejecución
    }
});

// Reducir la carga de animaciones durante el desplazamiento
let isScrolling;
window.addEventListener('scroll', () => {
    clearTimeout(isScrolling);
    document.body.classList.add('disable-animations');
    isScrolling = setTimeout(() => {
        document.body.classList.remove('disable-animations');
    }, 100); // Reducir el tiempo para que las animaciones vuelvan rápidamente
});

// Optimize scroll observer by throttling
window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            document.querySelectorAll('.download-section, .support, .support-form, .footer').forEach(sec => {
                if (sec.getBoundingClientRect().top < window.innerHeight) {
                    sec.classList.add('fade-in');
                }
            });
            scrollTimeout = null;
        }, 200); // Increase throttle delay for smoother scrolling
    }
});

// Disable animations during scrolling
window.addEventListener('scroll', () => {
    clearTimeout(isScrolling);
    document.body.classList.add('disable-animations');
    isScrolling = setTimeout(() => {
        document.body.classList.remove('disable-animations');
    }, 300); // Re-enable animations after scrolling stops
});

// Remove rainbow text effect for performance
// Rainbow text effect
const style = document.createElement('style');
style.textContent = `
@keyframes slideIn {
    from { opacity: 0; transform: translateX(100px); }
    to { opacity: 1; transform: translateX(0); }
}

@keyframes slideOut {
    from { opacity: 1; transform: translateX(0); }
    to { opacity: 0; transform: translateX(100px); }
}

.particle {
    position: fixed;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: radial-gradient(circle, #ffcc00, transparent);
    animation: float 10s linear infinite;
    z-index: 1;
}

@keyframes float {
    0% { transform: translateY(0) scale(1); opacity: 1; }
    50% { transform: translateY(-100vh) scale(1.5); opacity: 0.7; }
    100% { transform: translateY(0) scale(1); opacity: 1; }
}`;
document.head.appendChild(style);
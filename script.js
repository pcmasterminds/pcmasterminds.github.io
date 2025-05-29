const precioInput = document.getElementById('precio');
const descuentoInput = document.getElementById('descuento');
const calcularBtn = document.getElementById('calcular');
const valorDescuentoElement = document.getElementById('valorDescuento');
const precioFinalElement = document.getElementById('precioFinal');
const themeToggle = document.getElementById('themeToggle');
const calculator = document.querySelector('.calculator');

const formatearMoneda = (valor) => {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 2
    }).format(valor);
};

const validarEntrada = (input) => {
    let valor = input.value;
    valor = valor.replace(',', '.');
    valor = valor.replace(/[^\d.]/g, '');

    const partes = valor.split('.');
    if (partes.length > 2) {
        valor = partes[0] + '.' + partes.slice(1).join('');
    }

    if (valor === '' || valor === '.') {
        input.value = '';
        return false;
    }

    const numero = parseFloat(valor);
    if (isNaN(numero) || numero < 0) {
        input.value = '';
        return false;
    }

    input.value = valor;
    return true;
};

const animarNumero = (elemento, valorInicial, valorFinal, duracion = 1000) => {
    const inicio = performance.now();
    const diferencia = valorFinal - valorInicial;

    const animar = (tiempoActual) => {
        const tiempoTranscurrido = tiempoActual - inicio;
        const progreso = Math.min(tiempoTranscurrido / duracion, 1);
        const easeOutQuart = 1 - Math.pow(1 - progreso, 4);
        const valorActual = valorInicial + (diferencia * easeOutQuart);

        elemento.textContent = formatearMoneda(valorActual);

        if (progreso < 1) {
            requestAnimationFrame(animar);
        }
    };

    requestAnimationFrame(animar);
};

const crearParticulas = (x, y) => {
    const particulas = document.createElement('div');
    particulas.className = 'particula';
    document.body.appendChild(particulas);

    const size = Math.random() * 10 + 5;
    const destinationX = (Math.random() - 0.5) * 200;
    const destinationY = (Math.random() - 0.5) * 200;

    particulas.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        background: var(--gradient-1);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
    `;

    const animacion = particulas.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${destinationX}px, ${destinationY}px) scale(0)`, opacity: 0 }
    ], {
        duration: 1000,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    });

    animacion.onfinish = () => particulas.remove();
};

const calcularDescuento = (event) => {
    if (!validarEntrada(precioInput) || !validarEntrada(descuentoInput)) {
        return;
    }

    const precio = parseFloat(precioInput.value);
    const descuento = parseFloat(descuentoInput.value);

    if (descuento > 100) {
        descuentoInput.value = '100';
        return;
    }

    const valorDescuento = (precio * descuento) / 100;
    const precioFinal = precio - valorDescuento;

    if (event) {
        const rect = event.target.getBoundingClientRect();
        for (let i = 0; i < 10; i++) {
            crearParticulas(
                rect.left + rect.width / 2,
                rect.top + rect.height / 2
            );
        }
    }

    calculator.style.transform = 'scale(1.05)';
    setTimeout(() => {
        calculator.style.transform = 'scale(1)';
    }, 300);

    animarNumero(valorDescuentoElement, 0, valorDescuento);
    setTimeout(() => {
        animarNumero(precioFinalElement, 0, precioFinal);
    }, 500);

    const resultados = document.getElementById('resultados');
    resultados.style.animation = 'none';
    resultados.offsetHeight;
    resultados.style.animation = 'fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
};

const toggleTheme = () => {
    const body = document.body;
    const isDark = body.getAttribute('data-theme') === 'dark';

    body.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';

    if (isDark) {
        body.removeAttribute('data-theme');
        themeToggle.textContent = '🌙';
        themeToggle.style.transform = 'rotate(0deg)';
    } else {
        body.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
        themeToggle.style.transform = 'rotate(180deg)';
    }

    const rect = themeToggle.getBoundingClientRect();
    for (let i = 0; i < 8; i++) {
        crearParticulas(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2
        );
    }
};

calcularBtn.addEventListener('click', calcularDescuento);
themeToggle.addEventListener('click', toggleTheme);

[precioInput, descuentoInput].forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            calcularDescuento();
        }
    });

    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'translateY(-2px)';
    });

    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'translateY(0)';
    });
});

[precioInput, descuentoInput].forEach(input => {
    input.addEventListener('input', () => {
        validarEntrada(input);
    });
});

const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
if (prefersDarkScheme.matches) {
    document.body.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️';
}

document.querySelectorAll('.result-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateX(5px) scale(1.02)';
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateX(0) scale(1)';
    });
});

// Registrar service worker (PWA)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(() => console.log('✔️ Service Worker registrado'))
        .catch(err => console.error('❌ Error SW', err));
}

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    console.log('Nav toggle:', navToggle);
    console.log('Nav menu:', navMenu);

    // Toggle mobile menu
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Toggle clicked');
            
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
                console.log('Menu opened');
            } else {
                document.body.style.overflow = '';
                console.log('Menu closed');
            }
        });

        // Also handle touch events for mobile
        navToggle.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && navToggle && 
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target) && 
            navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(26, 26, 46, 0.98)';
            } else {
                navbar.style.background = 'rgba(26, 26, 46, 0.95)';
            }
        }
    });

    // FAQ functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // Contact form functionality
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone') || 'No proporcionado';
            const country = formData.get('country') || 'No especificado';
            const tour = formData.get('tour') || 'No especificado';
            const dates = formData.get('dates') || 'Flexibles';
            const people = formData.get('people') || 'No especificado';
            const message = formData.get('message');
            
            // Create WhatsApp message
            const whatsappMessage = `Hola! Mi nombre es ${name}.

📧 Email: ${email}
📱 Teléfono: ${phone}
🌍 País: ${country}
🎯 Tour de interés: ${tour}
📅 Fechas preferidas: ${dates}
👥 Número de personas: ${people}

💬 Mensaje: ${message}

¡Espero su respuesta!`;
            
            const whatsappUrl = `https://wa.me/50684163256?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappUrl, '_blank');
            
            // Reset form
            this.reset();
            alert('¡Gracias por tu mensaje! Te redirigiremos a WhatsApp para completar tu consulta.');
        });
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loading');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.tour-card, .testimonial-card, .gallery-item, .feature-card, .accommodation-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Modal functionality
    const modal = document.getElementById('tour-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.close');

    if (closeModal && modal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });

        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Add stars animation
    createStars();
});

// Tour modal functionality
function openTourModal(tourId) {
    const modal = document.getElementById('tour-modal');
    const modalBody = document.getElementById('modal-body');
    
    if (!modal || !modalBody) return;
    
    const tourData = getTourData(tourId);
    
    modalBody.innerHTML = `
        <div class="tour-modal-content">
            <img src="${tourData.image}" alt="${tourData.name}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 10px; margin-bottom: 20px;">
            <h2 style="color: var(--primary-color); margin-bottom: 15px;">${tourData.name}</h2>
            <p style="margin-bottom: 20px; line-height: 1.6;">${tourData.description}</p>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px;">
                <div>
                    <h4 style="color: var(--secondary-color); margin-bottom: 10px;">📅 Duración</h4>
                    <p>${tourData.duration}</p>
                </div>
                <div>
                    <h4 style="color: var(--secondary-color); margin-bottom: 10px;">💰 Precio</h4>
                    <p>${tourData.price}</p>
                </div>
                <div>
                    <h4 style="color: var(--secondary-color); margin-bottom: 10px;">👥 Grupo</h4>
                    <p>${tourData.groupSize}</p>
                </div>
                <div>
                    <h4 style="color: var(--secondary-color); margin-bottom: 10px;">📍 Dificultad</h4>
                    <p>${tourData.difficulty}</p>
                </div>
            </div>
            
            <div style="margin-bottom: 30px;">
                <h4 style="color: var(--secondary-color); margin-bottom: 15px;">✅ Incluye</h4>
                <ul style="list-style: none; padding: 0;">
                    ${tourData.includes.map(item => `<li style="margin-bottom: 8px; padding-left: 20px; position: relative;">
                        <span style="position: absolute; left: 0; color: var(--accent-color);">✓</span>
                        ${item}
                    </li>`).join('')}
                </ul>
            </div>
            
            <div style="margin-bottom: 30px;">
                <h4 style="color: var(--secondary-color); margin-bottom: 15px;">📋 Itinerario</h4>
                <div>${tourData.itinerary}</div>
            </div>
            
            <div style="margin-bottom: 30px;">
                <h4 style="color: var(--secondary-color); margin-bottom: 15px;">⚠️ Requisitos</h4>
                <p>${tourData.requirements}</p>
            </div>
            
            <div style="text-align: center;">
                <a href="${tourData.whatsappLink}" target="_blank" class="btn btn-primary" style="margin-right: 15px;">
                    💬 Consultar por WhatsApp
                </a>
                <a href="${tourData.formLink}" target="_blank" class="btn btn-secondary">
                    📝 Llenar Formulario
                </a>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Tour data
function getTourData(tourId) {
    const tours = {
        chirripo: {
            name: 'Parque Nacional Chirripó',
            image: '/assets/chirripo_letrero.jpg',
            description: 'Vive la experiencia única de ascender al punto más alto de Costa Rica. El Cerro Chirripó, con sus 3,819 metros de altura, ofrece paisajes únicos, desde bosques nubosos hasta páramos de alta montaña. Una aventura espiritual que conecta tu alma con la naturaleza.',
            duration: '2 días / 1 noche',
            price: 'Desde $180 por persona',
            groupSize: '4-12 personas',
            difficulty: 'Moderada-Alta',
            includes: [
                'Guía especializado certificado',
                'Transporte desde San José',
                'Hospedaje en refugio de montaña',
                'Todas las comidas durante el tour',
                'Equipo de seguridad básico',
                'Seguro de accidentes',
                'Entrada al parque nacional'
            ],
            itinerary: `
                <p><strong>Día 1:</strong> Salida temprano desde San José (5:00 AM), llegada a San Gerardo de Rivas, desayuno, inicio del ascenso (8:00 AM), llegada al refugio Base Crestones, almuerzo, descanso y preparación para el ascenso nocturno.</p>
                <p><strong>Día 2:</strong> Ascenso nocturno a la cima (2:00 AM), amanecer en el punto más alto de Costa Rica, descenso al refugio, desayuno, descenso completo, almuerzo en San Gerardo, regreso a San José.</p>
            `,
            requirements: 'Condición física moderada-buena, experiencia previa en senderismo recomendada, edad mínima 16 años, examen médico reciente.',
            whatsappLink: 'https://wa.me/50684163256?text=Hola,%20me%20interesa%20el%20tour%20al%20Cerro%20Chirripó.%20¿Podrían%20darme%20más%20información?',
            formLink: 'https://docs.google.com/forms/d/e/1FAIpQLSeWZPCgNZPMRyzohK0sSaemadpIi2tQIhHkZZDHBQc7lWEDaA/viewform'
        },
        corcovado: {
            name: 'Parque Nacional Corcovado',
            image: '/assets/parque_nacional_corcovado.jpg',
            description: 'Explora el lugar con mayor biodiversidad de Costa Rica. Corcovado alberga el 2.5% de la biodiversidad mundial en menos del 0.001% de la superficie terrestre. Una experiencia única para los amantes de la naturaleza.',
            duration: '3 días / 2 noches',
            price: 'Desde $320 por persona',
            groupSize: '4-10 personas',
            difficulty: 'Moderada',
            includes: [
                'Guía naturalista especializado',
                'Transporte terrestre y marítimo',
                'Hospedaje en lodge ecológico',
                'Todas las comidas',
                'Equipo de snorkel',
                'Botas de hule',
                'Entrada al parque'
            ],
            itinerary: `
                <p><strong>Día 1:</strong> Traslado a Drake Bay, almuerzo, caminata por senderos del parque, observación de fauna.</p>
                <p><strong>Día 2:</strong> Caminata completa por Corcovado, playa San Pedrillo, snorkel, observación de ballenas (temporada).</p>
                <p><strong>Día 3:</strong> Caminata matutina, regreso a San José.</p>
            `,
            requirements: 'Condición física básica, saber nadar (recomendado), ropa cómoda para caminar.',
            whatsappLink: 'https://wa.me/50684163256?text=Hola,%20me%20interesa%20el%20tour%20al%20Parque%20Nacional%20Corcovado.%20¿Podrían%20darme%20más%20información?',
            formLink: 'https://docs.google.com/forms/d/e/1FAIpQLSeWZPCgNZPMRyzohK0sSaemadpIi2tQIhHkZZDHBQc7lWEDaA/viewform'
        },
        irazu: {
            name: 'Volcán Irazú',
            image: '/assets/volcan_irazu.jpg',
            description: 'Visita el volcán más alto de Costa Rica y contempla sus impresionantes cráteres. En días despejados, puedes ver ambos océanos desde su cima.',
            duration: '1 día',
            price: 'Desde $85 por persona',
            groupSize: '4-15 personas',
            difficulty: 'Fácil',
            includes: [
                'Transporte desde San José',
                'Guía especializado',
                'Almuerzo típico',
                'Entrada al parque',
                'Visita a Cartago'
            ],
            itinerary: `
                <p><strong>Mañana:</strong> Salida desde San José, visita a la Basílica de los Ángeles en Cartago, ascenso al volcán.</p>
                <p><strong>Tarde:</strong> Exploración de los cráteres, almuerzo, regreso a San José.</p>
            `,
            requirements: 'Ropa abrigada, zapatos cómodos, cámara fotográfica.',
            whatsappLink: 'https://wa.me/50684163256?text=Hola,%20me%20interesa%20el%20tour%20al%20Volcán%20Irazú.%20¿Podrían%20darme%20más%20información?',
            formLink: 'https://docs.google.com/forms/d/e/1FAIpQLSeWZPCgNZPMRyzohK0sSaemadpIi2tQIhHkZZDHBQc7lWEDaA/viewform'
        },
        cloudbridge: {
            name: 'Reserva Natural CloudBridge',
            image: '/assets/reserva_natural_cloudbridge.jpg',
            description: 'Camina entre las nubes en esta reserva privada dedicada a la conservación. Senderos místicos y vistas espectaculares te esperan.',
            duration: '1 día',
            price: 'Desde $95 por persona',
            groupSize: '4-12 personas',
            difficulty: 'Moderada',
            includes: [
                'Transporte',
                'Guía naturalista',
                'Almuerzo orgánico',
                'Entrada a la reserva',
                'Charla de conservación'
            ],
            itinerary: `
                <p><strong>Mañana:</strong> Salida temprana, llegada a la reserva, caminata por senderos del bosque nuboso.</p>
                <p><strong>Tarde:</strong> Almuerzo orgánico, observación de aves, regreso.</p>
            `,
            requirements: 'Ropa impermeable, botas de montaña, binoculares (opcional).',
            whatsappLink: 'https://wa.me/50684163256?text=Hola,%20me%20interesa%20el%20tour%20a%20la%20Reserva%20Natural%20CloudBridge.%20¿Podrían%20darme%20más%20información?',
            formLink: 'https://docs.google.com/forms/d/e/1FAIpQLSeWZPCgNZPMRyzohK0sSaemadpIi2tQIhHkZZDHBQc7lWEDaA/viewform'
        },
        talamanca: {
            name: 'Reserva Natural Talamanca',
            image: '/assets/reserva_talamanca.png',
            description: 'Aventura en una de las reservas más vírgenes de Costa Rica. Naturaleza en estado puro y conexión total con el ambiente.',
            duration: '2 días / 1 noche',
            price: 'Desde $220 por persona',
            groupSize: '4-10 personas',
            difficulty: 'Moderada-Alta',
            includes: [
                'Transporte 4x4',
                'Guía especializado',
                'Hospedaje rústico',
                'Todas las comidas',
                'Actividades de aventura'
            ],
            itinerary: `
                <p><strong>Día 1:</strong> Traslado en 4x4, caminatas exploratorias, hospedaje en la reserva.</p>
                <p><strong>Día 2:</strong> Caminata de aventura, observación de fauna, regreso.</p>
            `,
            requirements: 'Buena condición física, espíritu aventurero, ropa adecuada para montaña.',
            whatsappLink: 'https://wa.me/50684163256?text=Hola,%20me%20interesa%20el%20tour%20a%20la%20Reserva%20Natural%20Talamanca.%20¿Podrían%20darme%20más%20información?',
            formLink: 'https://docs.google.com/forms/d/e/1FAIpQLSeWZPCgNZPMRyzohK0sSaemadpIi2tQIhHkZZDHBQc7lWEDaA/viewform'
        },
        'baru-3d': {
            name: 'Volcán Barú Panamá - 3 Días / 2 Noches',
            image: '/images/volcan_baru.jpg',
            description: 'Conquista el punto más alto de Panamá. Una aventura internacional que te llevará a los 3,475 metros de altura del Volcán Barú.',
            duration: '3 días / 2 noches',
            price: 'Desde $380 por persona',
            groupSize: '4-12 personas',
            difficulty: 'Alta',
            includes: [
                'Transporte internacional',
                'Guía panameño certificado',
                'Hospedaje en Boquete',
                'Todas las comidas',
                'Permisos y documentación',
                'Seguro internacional'
            ],
            itinerary: `
                <p><strong>Día 1:</strong> Salida desde Costa Rica, llegada a Boquete, Panamá, acomodación y preparativos.</p>
                <p><strong>Día 2:</strong> Ascenso nocturno al Volcán Barú, amanecer en la cima, descenso.</p>
                <p><strong>Día 3:</strong> Descanso, tour por Boquete, regreso a Costa Rica.</p>
            `,
            requirements: 'Pasaporte vigente, excelente condición física, experiencia en montañismo.',
            whatsappLink: 'https://wa.me/50684163256?text=Hola,%20me%20interesa%20el%20tour%20al%20Volcán%20Barú%20Panamá%203D/2N.%20¿Podrían%20darme%20más%20información?',
            formLink: 'https://docs.google.com/forms/d/e/1FAIpQLSeWZPCgNZPMRyzohK0sSaemadpIi2tQIhHkZZDHBQc7lWEDaA/viewform'
        },
        'baru-4d': {
            name: 'Volcán Barú Panamá - 4 Días / 3 Noches',
            image: '/images/volcan_baru_2.jpg',
            description: 'Experiencia completa en Panamá incluyendo el ascenso al Volcán Barú y exploración de la región de Chiriquí.',
            duration: '4 días / 3 noches',
            price: 'Desde $480 por persona',
            groupSize: '4-12 personas',
            difficulty: 'Alta',
            includes: [
                'Transporte internacional',
                'Guía especializado',
                'Hospedaje premium en Boquete',
                'Todas las comidas',
                'Tours adicionales en Chiriquí',
                'Seguro completo'
            ],
            itinerary: `
                <p><strong>Día 1:</strong> Traslado a Panamá, llegada a Boquete, tour por la ciudad.</p>
                <p><strong>Día 2:</strong> Preparación y ascenso al Volcán Barú.</p>
                <p><strong>Día 3:</strong> Descanso, tour por plantaciones de café, aguas termales.</p>
                <p><strong>Día 4:</strong> Actividades opcionales, regreso a Costa Rica.</p>
            `,
            requirements: 'Pasaporte vigente, excelente condición física, seguro de viaje.',
            whatsappLink: 'https://wa.me/50684163256?text=Hola,%20me%20interesa%20el%20tour%20al%20Volcán%20Barú%20Panamá%204D/3N.%20¿Podrían%20darme%20más%20información?',
            formLink: 'https://docs.google.com/forms/d/e/1FAIpQLSeWZPCgNZPMRyzohK0sSaemadpIi2tQIhHkZZDHBQc7lWEDaA/viewform'
        },
        'baru-4x4': {
            name: 'Volcán Barú Tour 4x4',
            image: '/images/volcan_baru_4x4.jpg',
            description: 'Accede cómodamente al Volcán Barú en vehículo 4x4. Perfecto para quienes quieren disfrutar de las vistas sin el esfuerzo físico extremo.',
            duration: '2 días / 1 noche',
            price: 'Desde $280 por persona',
            groupSize: '4-8 personas',
            difficulty: 'Fácil-Moderada',
            includes: [
                'Transporte 4x4 especializado',
                'Guía conductor',
                'Hospedaje en Boquete',
                'Comidas incluidas',
                'Permisos de acceso'
            ],
            itinerary: `
                <p><strong>Día 1:</strong> Traslado a Panamá, llegada a Boquete, ascenso en 4x4 al volcán.</p>
                <p><strong>Día 2:</strong> Amanecer en el volcán, descenso, regreso a Costa Rica.</p>
            `,
            requirements: 'Pasaporte vigente, ropa abrigada, cámara fotográfica.',
            whatsappLink: 'https://wa.me/50684163256?text=Hola,%20me%20interesa%20el%20Volcán%20Barú%20Tour%204x4.%20¿Podrían%20darme%20más%20información?',
            formLink: 'https://docs.google.com/forms/d/e/1FAIpQLSeWZPCgNZPMRyzohK0sSaemadpIi2tQIhHkZZDHBQc7lWEDaA/viewform'
        },
        'guatemala-volcanes': {
            name: 'Guatemala Tierra de Volcanes',
            image: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg',
            description: 'Explora los volcanes más impresionantes de Guatemala en una aventura única que combina naturaleza, cultura y espiritualidad maya.',
            duration: '5 días / 4 noches',
            price: 'Desde $650 por persona',
            groupSize: '4-12 personas',
            difficulty: 'Moderada-Alta',
            includes: [
                'Vuelos internacionales',
                'Guía guatemalteco especializado',
                'Hospedaje en hoteles seleccionados',
                'Todas las comidas',
                'Transporte terrestre',
                'Entradas a parques'
            ],
            itinerary: `
                <p><strong>Día 1:</strong> Llegada a Guatemala, traslado a Antigua.</p>
                <p><strong>Día 2:</strong> Ascenso al Volcán Pacaya.</p>
                <p><strong>Día 3:</strong> Volcán Acatenango y vista del Fuego.</p>
                <p><strong>Día 4:</strong> Lago Atitlán y volcanes circundantes.</p>
                <p><strong>Día 5:</strong> Regreso a Costa Rica.</p>
            `,
            requirements: 'Pasaporte vigente, buena condición física, seguro de viaje internacional.',
            whatsappLink: 'https://wa.me/50684163256?text=Hola,%20me%20interesa%20el%20tour%20Guatemala%20Tierra%20de%20Volcanes.%20¿Podrían%20darme%20más%20información?',
            formLink: 'https://docs.google.com/forms/d/e/1FAIpQLSeWZPCgNZPMRyzohK0sSaemadpIi2tQIhHkZZDHBQc7lWEDaA/viewform'
        },
        'guatemala-7d': {
            name: 'Guatemala Tour 7 Días / 6 Noches',
            image: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg',
            description: 'Experiencia completa en Guatemala: volcanes, cultura maya, sitios arqueológicos y paisajes únicos en Centroamérica.',
            duration: '7 días / 6 noches',
            price: 'Desde $850 por persona',
            groupSize: '4-15 personas',
            difficulty: 'Moderada',
            includes: [
                'Vuelos internacionales',
                'Guía especializado',
                'Hospedaje premium',
                'Todas las comidas',
                'Transporte privado',
                'Entradas a sitios arqueológicos'
            ],
            itinerary: `
                <p><strong>Día 1:</strong> Llegada, Antigua Guatemala.</p>
                <p><strong>Día 2:</strong> Volcán Pacaya.</p>
                <p><strong>Día 3-4:</strong> Lago Atitlán, pueblos mayas.</p>
                <p><strong>Día 5-6:</strong> Tikal, selva del Petén.</p>
                <p><strong>Día 7:</strong> Regreso a Costa Rica.</p>
            `,
            requirements: 'Pasaporte vigente, vacunas recomendadas, seguro internacional.',
            whatsappLink: 'https://wa.me/50684163256?text=Hola,%20me%20interesa%20el%20Guatemala%20Tour%207D/6N.%20¿Podrían%20darme%20más%20información?',
            formLink: 'https://docs.google.com/forms/d/e/1FAIpQLSeWZPCgNZPMRyzohK0sSaemadpIi2tQIhHkZZDHBQc7lWEDaA/viewform'
        },
        'guatemala-historico': {
            name: 'Guatemala Histórico 4 Días / 3 Noches',
            image: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg',
            description: 'Sumérgete en la rica historia y cultura maya de Guatemala. Un viaje a través del tiempo en los sitios más emblemáticos.',
            duration: '4 días / 3 noches',
            price: 'Desde $520 por persona',
            groupSize: '4-12 personas',
            difficulty: 'Fácil-Moderada',
            includes: [
                'Vuelos internacionales',
                'Guía historiador',
                'Hospedaje histórico',
                'Comidas tradicionales',
                'Transporte',
                'Entradas a museos'
            ],
            itinerary: `
                <p><strong>Día 1:</strong> Llegada, tour por Antigua Guatemala.</p>
                <p><strong>Día 2:</strong> Ciudad de Guatemala, museos.</p>
                <p><strong>Día 3:</strong> Chichicastenango, mercado maya.</p>
                <p><strong>Día 4:</strong> Regreso a Costa Rica.</p>
            `,
            requirements: 'Pasaporte vigente, interés en historia y cultura.',
            whatsappLink: 'https://wa.me/50684163256?text=Hola,%20me%20interesa%20el%20Guatemala%20Histórico%204D/3N.%20¿Podrían%20darme%20más%20información?',
            formLink: 'https://docs.google.com/forms/d/e/1FAIpQLSeWZPCgNZPMRyzohK0sSaemadpIi2tQIhHkZZDHBQc7lWEDaA/viewform'
        }
    };
    
    return tours[tourId] || tours.chirripo;
}

// Create animated stars
function createStars() {
    const starsContainer = document.querySelector('.stars');
    if (!starsContainer) return;
    
    const numberOfStars = 50;
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: white;
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: twinkle ${2 + Math.random() * 3}s infinite alternate;
            animation-delay: ${Math.random() * 2}s;
        `;
        starsContainer.appendChild(star);
    }
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-background');
    
    if (hero && heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
});

// Add loading animation to elements
function addLoadingAnimation() {
    const elements = document.querySelectorAll('.tour-card, .testimonial-card, .feature-card, .accommodation-card');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Initialize animations when page loads
window.addEventListener('load', addLoadingAnimation);

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Form validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            field.style.borderColor = '#e0e0e0';
        }
    });
    
    return isValid;
}

// Email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation
function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Initialize page-specific functionality
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Page-specific initializations
    switch(currentPage) {
        case 'index.html':
        case '':
            // Home page specific code
            break;
        case 'tours-nacionales.html':
            // National tours page specific code
            break;
        case 'tours-internacionales.html':
            // International tours page specific code
            break;
        case 'cabana.html':
            // Cabin page specific code
            break;
        case 'contacto.html':
            // Contact page specific code
            break;
        case 'terminos.html':
            // Terms page specific code
            break;
    }
});
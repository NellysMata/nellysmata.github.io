

// Datos de horóscopos
const horoscopes = {
    aries: {
        amor: "Venus ilumina tu vida romántica. Si estás en pareja, es momento de reavivar la pasión con gestos espontáneos. Los solteros podrían encontrar a alguien especial en un lugar inesperado.",
        trabajo: "Tu energía y determinación te destacan en el trabajo. Es un buen momento para proponer nuevas ideas o tomar la iniciativa en proyectos importantes.",
        salud: "Mantén un equilibrio entre actividad y descanso. El ejercicio te ayudará a canalizar tu energía de forma positiva."
    },
    tauro: {
        amor: "La estabilidad que buscas está cerca. Dedica tiempo de calidad a tu pareja. Si estás soltero, la paciencia será tu mejor aliada para encontrar el amor verdadero.",
        trabajo: "Tu perseverancia dará frutos. Es momento de consolidar tus proyectos y no temer a los cambios necesarios para crecer profesionalmente.",
        salud: "Cuida tu alimentación y encuentra momentos para relajarte. Un masaje o un baño relajante te vendrían muy bien."
    },
    geminis: {
        amor: "La comunicación es clave en tus relaciones. Expresa tus sentimientos sin miedo. Podrías conocer personas interesantes en eventos sociales.",
        trabajo: "Tu versatilidad y creatividad brillan. Aprovecha para explorar nuevas oportunidades o aprender habilidades diferentes.",
        salud: "Tu mente necesita descanso. Practica la meditación o actividades que te ayuden a desconectar y recargar energías."
    },
    cancer: {
        amor: "Tu sensibilidad atrae a las personas correctas. En pareja, profundiza la conexión emocional. Los solteros encontrarán el amor donde menos lo esperan.",
        trabajo: "Confía en tu intuición para tomar decisiones importantes. Tu capacidad para trabajar en equipo será muy valorada.",
        salud: "Cuida tu bienestar emocional. Rodéate de personas que te hagan sentir bien y no descuides tus necesidades personales."
    },
    leo: {
        amor: "Tu carisma está en su punto máximo. Disfruta de la atención pero recuerda ser generoso con tu pareja. Los solteros brillarán en eventos sociales.",
        trabajo: "Es tu momento para liderar y destacar. Tus ideas serán bien recibidas y podrías recibir el reconocimiento que mereces.",
        salud: "Mantén tu vitalidad con actividades que disfrutes. No olvides descansar adecuadamente para recargar tu energía natural."
    },
    virgo: {
        amor: "Analizar demasiado puede bloquear tus emociones. Permítete sentir sin juzgar. El amor verdadero no necesita ser perfecto.",
        trabajo: "Tu atención al detalle y eficiencia son tus mejores armas. Es buen momento para organizar y optimizar procesos.",
        salud: "No seas tan exigente contigo mismo. Encuentra un equilibrio entre tus responsabilidades y el autocuidado."
    },
    libra: {
        amor: "La armonía reina en tus relaciones. Es momento perfecto para fortalecer vínculos y resolver conflictos pendientes con diplomacia.",
        trabajo: "Tu habilidad para mediar y crear consenso será muy valorada. Podrías ser el puente entre diferentes puntos de vista.",
        salud: "Busca el equilibrio en todos los aspectos de tu vida. El yoga o actividades que combinen cuerpo y mente te beneficiarán."
    },
    escorpio: {
        amor: "Tu intensidad emocional puede ser abrumadora. Aprende a mostrar vulnerabilidad. La pasión está en su punto más alto.",
        trabajo: "Tu determinación y capacidad investigativa te llevarán lejos. No temas profundizar en proyectos complejos.",
        salud: "Libera tensiones acumuladas. Actividades físicas intensas o terapias emocionales te ayudarán a mantener el equilibrio."
    },
    sagitario: {
        amor: "Tu espíritu aventurero atrae admiradores. Si estás en pareja, planea una escapada juntos. Los solteros encontrarán conexiones en lugares exóticos.",
        trabajo: "Tu optimismo y visión de futuro inspiran a otros. Es momento de expandir horizontes y buscar nuevas oportunidades.",
        salud: "Mantén tu espíritu activo pero no descuides el descanso. Los deportes al aire libre te recargarán de energía."
    },
    capricornio: {
        amor: "Tu dedicación en las relaciones dará frutos. Muestra tu lado más cálido y permítete ser más expresivo con tus sentimientos.",
        trabajo: "Tu disciplina y ambición te acercan a tus metas. Es tiempo de recoger lo que has sembrado con tanto esfuerzo.",
        salud: "No descuides tu bienestar por el trabajo. Establece límites claros y dedica tiempo para ti mismo."
    },
    acuario: {
        amor: "Tu originalidad es magnética. Las relaciones necesitan libertad pero también compromiso. Encuentra ese balance perfecto.",
        trabajo: "Tu pensamiento innovador puede revolucionar proyectos. No temas proponer ideas poco convencionales.",
        salud: "Cuida tu sistema nervioso. Actividades que estimulen tu mente creativamente te ayudarán a mantener el equilibrio."
    },
    piscis: {
        amor: "Tu romanticismo está en su máxima expresión. Deja que tu corazón guíe pero mantén los pies en la tierra. El amor verdadero está cerca.",
        trabajo: "Tu creatividad e intuición son tus mayores fortalezas. Confía en tu instinto para tomar decisiones importantes.",
        salud: "Protege tu energía de influencias negativas. La meditación y actividades cerca del agua te ayudarán a recargarte."
    }
};

// Crear pétalos flotantes
function createPetals() {
    for (let i = 0; i < 15; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (Math.random() * 10 + 10) + 's';
        petal.style.animationDelay = Math.random() * 5 + 's';
        document.body.appendChild(petal);
    }
}

// Selección de signos
const zodiacCards = document.querySelectorAll('.zodiac-card');
const horoscopeDisplay = document.getElementById('horoscopeDisplay');
const zodiacSelection = document.getElementById('zodiacSelection');

zodiacCards.forEach(card => {
    card.addEventListener('click', function () {
        const sign = this.getAttribute('data-sign');
        const signName = this.querySelector('.zodiac-name').textContent;
        const signImg = this.getAttribute('data-img');

        showHoroscope(sign, signName, signImg);
    });
});

function showHoroscope(sign, name, img) {
    const data = horoscopes[sign];

    horoscopeDisplay.innerHTML = `
                <div class="horoscope-title">
                    <div class="horoscope-title-icon">
                        <img src="img/${img}" alt="${name}">
                    </div>
                    <span>${name}</span>
                    <div class="horoscope-title-icon">
                        <img src="img/${img}" alt="${name}">
                    </div>
                </div>
                <div class="horoscope-content">
                    <div class="horoscope-section">
                        <h3>💖 Amor</h3>
                        <p>${data.amor}</p>
                    </div>
                    <div class="horoscope-section">
                        <h3>💼 Trabajo</h3>
                        <p>${data.trabajo}</p>
                    </div>
                    <div class="horoscope-section">
                        <h3>🌟 Salud</h3>
                        <p>${data.salud}</p>
                    </div>
                </div>
                <button class="back-btn" onclick="backToSelection()">← Volver a los signos</button>
            `;

    zodiacSelection.style.display = 'none';
    horoscopeDisplay.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function backToSelection() {
    zodiacSelection.style.display = 'block';
    horoscopeDisplay.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Inicializar pétalos
createPetals();

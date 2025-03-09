// Containers & Cards
const cards = document.getElementsByClassName('card');
const home = document.getElementById('home');
const card = document.getElementById('card-expanded');

// Buttons
const backBtn = document.getElementById('back');
const homeBtn = document.getElementById('home');
const aboutBtn = document.getElementById('about');
const contributeBtn = document.getElementById('contribute');
const contactBtn = document.getElementById('contact');

// Event Listeners
backBtn.addEventListener('click', () => {
    card.classList.remove('visible-card');
    card.classList.add('hidden');
    home.classList.remove('hidden');
});

const text = {
    'Insomnia': 'Insomnia is a sleep disorder characterized by persistent difficulty with sleep initiation, maintenance, or early morning awakenings, despite adequate opportunity for sleep. It is associated with daytime impairment, including fatigue, cognitive dysfunction, mood disturbances, and decreased performance. Etiologies include psychological stress, anxiety disorders, circadian rhythm disruptions, and underlying medical conditions. Management involves cognitive behavioral therapy for insomnia (CBT-I), sleep hygiene modifications, and pharmacological interventions when necessary.',
    'Sleep Apnea': 'Sleep apnea is a sleep disorder causing repeated breathing interruptions during sleep. It occurs in two main types: obstructive sleep apnea (OSA), due to airway blockage, and central sleep apnea (CSA), caused by brain signal dysfunction. Symptoms include loud snoring, gasping for air, and daytime sleepiness. Risk factors include obesity, age, and anatomical abnormalities. Treatment includes CPAP therapy, lifestyle changes, and, in severe cases, surgery. '
};

const vidUrl = {
    'Insomnia': `sources\\insomnia_animation.gif`,
    'Sleep Apnea': `sources\\sleep_apnea_animation.gif`
};

let title;

for (const card of cards) {
    card.addEventListener('click', () => expand(card.querySelector('h1').innerText, text, vidUrl));
}

// Functions
function expand(title, text, vidUrl) {
    card.getElementsByClassName('page-title')[0].innerText = title;
    document.getElementById('content-text').innerText = text[title];

    const vid = document.getElementById('illustration');
    vid.src = vidUrl[title];
    vid.alt = title;

    card.classList.remove('hidden');
    home.classList.add('hidden');
    card.classList.add('visible-card');
}
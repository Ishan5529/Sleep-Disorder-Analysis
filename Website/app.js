// Variables
let timer = 0;
let title;
let flag = false;

// Constants
const pageStack = [];
const page1 = document.getElementById('aboutPage1');
const text = {
    'Insomnia': 'Insomnia is a sleep disorder characterized by persistent difficulty with sleep initiation, maintenance, or early morning awakenings, despite adequate opportunity for sleep. It is associated with daytime impairment, including fatigue, cognitive dysfunction, mood disturbances, and decreased performance. Etiologies include psychological stress, anxiety disorders, circadian rhythm disruptions, and underlying medical conditions. Management involves cognitive behavioral therapy for insomnia (CBT-I), sleep hygiene modifications, and pharmacological interventions when necessary.',
    'Sleep Apnea': 'Sleep apnea is a sleep disorder causing repeated breathing interruptions during sleep. It occurs in two main types: obstructive sleep apnea (OSA), due to airway blockage, and central sleep apnea (CSA), caused by brain signal dysfunction. Symptoms include loud snoring, gasping for air, and daytime sleepiness. Risk factors include obesity, age, and anatomical abnormalities. Treatment includes CPAP therapy, lifestyle changes, and, in severe cases, surgery. '
};

const vidUrl = {
    'Insomnia': `sources\\insomnia_animation.gif`,
    'Sleep Apnea': `sources\\sleep_apnea_animation.gif`
};

// Containers & Cards
const cards = document.getElementsByClassName('card');
const home = document.getElementById('home');
const about = document.getElementById('about');
const contribute = document.getElementById('contribute');
const contact = document.getElementById('contact');
const test = document.getElementById('test');
const card = document.getElementById('card-expanded');
const loader = document.getElementById('loading');
const aboutPages = document.getElementsByClassName('aboutPage');
const contributePages = document.getElementsByClassName('contributePage');
const contactPages = document.getElementsByClassName('contactPage');

// Buttons
const backBtn = document.getElementById('back');
const topBtns = document.getElementsByClassName('top');
const homeBtns = document.getElementsByClassName('home');
const aboutBtns = document.getElementsByClassName('about');
const contributeBtns = document.getElementsByClassName('contribute');
const contactBtns = document.getElementsByClassName('contact');
const testBtns = document.getElementsByClassName('test-btn');

// Event Listeners
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        if (card.classList.contains('visible-card')) {
            backBtn.click();
        }
    }
    if (event.key === 'Tab') {
        event.preventDefault();
    }
});
window.onload = () => {
    hideLoader();
};

backBtn.addEventListener('click', () => {
    card.classList.remove('visible-card');
    card.classList.add('hidden');
    home.classList.remove('hidden');
});

for (let btn of testBtns) {
    btn.addEventListener('click', () => {
        let localTimer = (pageStack.length * 500) + tabTime();
        if (card.classList.contains('visible-card')) {
            backBtn.click();
            localTimer = 500;
        }
        else {
            reset();
        }
        setTimeout(() => {
            test.classList.remove('hidden');
            home.classList.add('hidden');
            test.classList.add('visible-main-card');}, localTimer);
    });
}

function tabTime() {
    let superLocalTimer = 0;
    if (about.classList.contains('visible-main-card'))
        superLocalTimer += 500;
    if (contribute.classList.contains('visible-main-card'))
        superLocalTimer += 500;
    if (contact.classList.contains('visible-main-card'))
        superLocalTimer += 500;
    console.log(superLocalTimer);
    return superLocalTimer;
}

function reset() {
    let localTimer = pageStack.length * 500;
    topBtns[0].click();
    setTimeout(() => homeBtns[0].click(), localTimer);
}

for (const card of cards) {
    card.addEventListener('click', () => expand(card.querySelector('h1').innerText, text, vidUrl));
}

for (let btn of homeBtns) {
    btn.addEventListener('click', () => {
        if (test.classList.contains('visible-main-card'))
            test.classList.remove('visible-main-card');
        if (contact.classList.contains('visible-main-card'))
            timer = 500;
        contact.classList.remove('visible-main-card');
        if (contribute.classList.contains('visible-main-card'))
            timer = timer + 500;
        setTimeout(()=>contribute.classList.remove('visible-main-card'), timer - 500);
        setTimeout(()=>about.classList.remove('visible-main-card'), timer);
        timer = 0;
        test.classList.add('hidden');
        contribute.classList.add('hidden');
        about.classList.add('hidden');
        contact.classList.add('hidden');
        home.classList.remove('hidden');
    });
}

for (let btn of aboutBtns) {
    btn.addEventListener('click', () => {
        let localTimer = 0;
        if (test.classList.contains('visible-main-card')) {
            test.classList.remove('visible-main-card');
            localTimer = 500;
        }
        setTimeout(() => {
            about.classList.remove('hidden');
            home.classList.add('hidden');
            contribute.classList.add('hidden');
            contact.classList.add('hidden');
            test.classList.add('hidden');
            if (contact.classList.contains('visible-main-card'))
                timer = 500;
            contact.classList.remove('visible-main-card');
            if (contribute.classList.contains('visible-main-card'))
                timer = timer + 500;
            setTimeout(() => contribute.classList.remove('visible-main-card'), timer - 500);
            setTimeout(() => about.classList.add('visible-main-card'), timer);
            timer = 0;
        }, localTimer);
    });
}

for (let btn of contributeBtns) {
    btn.addEventListener('click', () => {
        let localTimer = 0;
        if (test.classList.contains('visible-main-card')) {
            test.classList.remove('visible-main-card');
            localTimer = 500;
        }
        setTimeout(() => {
            contribute.classList.remove('hidden');
            home.classList.add('hidden');
            about.classList.add('hidden');
            contact.classList.add('hidden');
            test.classList.add('hidden');
            if (contact.classList.contains('visible-main-card'))
                timer = 500;
            contact.classList.remove('visible-main-card');
            setTimeout(() => contribute.classList.add('visible-main-card'), timer);
            timer = 0;
        }, localTimer);
    });
}

for (let btn of contactBtns) {
    btn.addEventListener('click', () => {
        let localTimer = 0;
        if (test.classList.contains('visible-main-card')) {
            test.classList.remove('visible-main-card');
            localTimer = 500;
        }
        setTimeout(() => {
            contact.classList.remove('hidden');
            home.classList.add('hidden');
            about.classList.add('hidden');
            contribute.classList.add('hidden');
            contact.classList.add('visible-main-card');
        }, localTimer);
    });
}

scrollAnimation(aboutPages, about, pageStack);
scrollAnimation(contributePages, contribute, pageStack);
scrollAnimation(contactPages, contact, pageStack);

for (let btn of topBtns) {
    btn.addEventListener('click', () => {
        timer = 500 * pageStack.length - 500;
        while (pageStack.length > 0) {
            let removed = pageStack.shift();
            setTimeout(() => removed.classList.remove('visible-card'), timer);
            timer -= 500;
        }
    });
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

function push(stack, element) {
    stack.push(element);
}

function pop(stack) {
    return stack.pop();
}

function peek(stack) {
    return stack[stack.length - 1];
}

function scrollAnimation(pages, container, stack) {
    for (let page = 0; page < pages.length; page++) {
        pages[page].addEventListener('wheel', (event) => {
            if (event.deltaY > 0) { // Scrolling down
                if (pages[page + 1] && !stack.includes(pages[page + 1])) {
                    push(stack, pages[page + 1]);
                    pages[page + 1].classList.add('visible-card');
                    pages[page + 1].classList.add('ultra-index');
                    pages[page].classList.remove('ultra-index');
                }
            } else if (event.deltaY < 0) { // Scrolling up
                if (pages[page] && stack.includes(pages[page])) {
                    let removed = pop(stack);
                    removed.classList.remove('visible-card');
                }
            }
        });
    }
    
    let page1 = pages[0];
    container.addEventListener('wheel', (event) => {
        if (event.deltaY > 0) { // Scrolling down
            if (!stack.includes(page1)) {
                push(stack, page1);
                page1.classList.add('visible-card');
            }
        }
    });
}

function hideLoader() {
    setTimeout(() => {
        loader.style.cssText = "opacity: 0; transition: opacity 0.7s ease-in-out;";
        setTimeout(() => {
            loader.style.cssText = "display: none;";
        }, 700);
    }, 7500);

}

document.addEventListener('DOMContentLoaded', function() {
    function updateRangeValue(inputId,valueId){
        const input = document.getElementById(inputId);
        const display = document.getElementById(valueId);
        if(input && display){
            display.textContent = input.value;
            input.addEventListener('input', function(){
                display.textContent = this.value;
            });
    }
}
updateRangeValue('sleepQuality','sleepQualityValue');
updateRangeValue('physicalActivity','physicalActivityValue');
updateRangeValue('stressLevel','stressLevelValue');
});
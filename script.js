// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Neural Network Background
function drawNeuralNetwork() {
    const canvas = document.getElementById('neural-network-bg');
    if (!canvas.getContext) {
        console.error('Canvas not supported');
        return;
    }
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const nodes = [];
    const numNodes = 25;
    for (let i = 0; i < numNodes; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'rgba(20, 184, 166, 0.6)';
        ctx.fillStyle = 'rgba(147, 51, 234, 0.9)';

        nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;

            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

            ctx.beginPath();
            ctx.arc(node.x, node.y, 6, 0, Math.PI * 2);
            ctx.fill();

            nodes.forEach(other => {
                const dist = Math.hypot(node.x - other.x, node.y - other.y);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(other.x, other.y);
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animate);
    }
    animate();
}
let skillChartInstance = null;
let accuracyChartInstance = null;

function drawSkillProficiencyChart() {
    const canvas = document.getElementById('skillProficiencyChart');
    if (!canvas.getContext) return;
    const ctx = canvas.getContext('2d');
    // Create a vertical gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#06b6d4'); // cyan-500
    gradient.addColorStop(1, '#6366f1'); // indigo-500

    if (skillChartInstance) skillChartInstance.destroy();
    skillChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Python', 'AWS', 'Azure', 'GCP', 'NLP', 'LightGBM', 'XGBoost'],
            datasets: [{
                label: 'Proficiency (%)',
                data: [95, 90, 85, 80, 88, 85, 83],
                backgroundColor: gradient,
                borderColor: '#0ea5e9',
                borderWidth: 2,
                borderRadius: 12,
                barThickness: 32,
                hoverBackgroundColor: '#22d3ee',
                hoverBorderColor: '#6366f1'
            }]
        },
        options: {
            responsive: true,
            animation: { duration: 1200, easing: 'easeOutElastic' },
            plugins: {
                legend: { display: false },
                tooltip: {
                    enabled: true,
                    backgroundColor: '#0ea5e9',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#6366f1',
                    borderWidth: 1
                },
                title: {
                    display: true,
                    text: 'Skill Proficiency',
                    color: '#38bdf8',
                    font: { size: 20, weight: 'bold' }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: { display: true, text: 'Proficiency (%)', color: '#e5e7eb' },
                    ticks: { color: '#e5e7eb', font: { weight: 'bold' } },
                    grid: { color: '#334155' }
                },
                x: {
                    ticks: { color: '#e5e7eb', font: { weight: 'bold' } },
                    grid: { display: false }
                }
            }
        }
    });
}

function drawAccuracyChart() {
    const canvas = document.getElementById('modelAccuracyChart');
    if (!canvas.getContext) return;
    const ctx = canvas.getContext('2d');
    // Create a horizontal gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, '#facc15'); // yellow-400
    gradient.addColorStop(1, '#34d399'); // teal-400

    if (accuracyChartInstance) accuracyChartInstance.destroy();
    accuracyChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Centene (LightGBM)', 'AT&T (XGBoost)', 'Egen (CatBoost)', 'Movate (CTR)'],
            datasets: [{
                label: 'Model Accuracy (%)',
                data: [84, 87, 90, 80],
                backgroundColor: gradient,
                borderColor: '#facc15',
                borderWidth: 2,
                borderRadius: 12,
                barThickness: 32,
                hoverBackgroundColor: '#fbbf24',
                hoverBorderColor: '#34d399'
            }]
        },
        options: {
            responsive: true,
            animation: { duration: 1200, easing: 'easeOutElastic' },
            plugins: {
                legend: { display: false },
                tooltip: {
                    enabled: true,
                    backgroundColor: '#facc15',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#34d399',
                    borderWidth: 1
                },
                title: {
                    display: true,
                    text: 'Model Accuracy',
                    color: '#facc15',
                    font: { size: 20, weight: 'bold' }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: { display: true, text: 'Accuracy (%)', color: '#e5e7eb' },
                    ticks: { color: '#e5e7eb', font: { weight: 'bold' } },
                    grid: { color: '#334155' }
                },
                x: {
                    ticks: { color: '#e5e7eb', font: { weight: 'bold' } },
                    grid: { display: false }
                }
            }
        }
    });
}



// Sentiment Analysis Demo
function analyzeSentiment() {
    const input = document.getElementById('sentimentInput');
    const result = document.getElementById('sentimentResult');
    if (!input || !result) return;

    const text = input.value.trim().toLowerCase();
    if (!text) {
        result.textContent = 'Please enter a sentence.';
        result.style.color = '#9ca3af';
        input.style.borderColor = '#9ca3af';
        return;
    }

    try {
        let score = 0;
        const positiveWords = [
            'love', 'like', 'enjoy', 'happy', 'great', 'good', 'awesome', 'amazing',
            'fantastic', 'excellent', 'wonderful', 'best', 'positive', 'delight', 
            'brilliant', 'incredible', 'beautiful', 'cool', 'super', 'nice', 'pleased',
            'satisfied', 'terrific', 'outstanding', 'fabulous', 'splendid', 'marvelous',
            'admirable', 'glad', 'cheerful', 'joy', 'hopeful', 'optimistic', 'inspiring',
            'grateful', 'blessed', 'supportive', 'generous', 'impressive', 'charming',
            'peaceful', 'friendly', 'thrilled', 'energetic', 'creative', 'loyal',
            'motivated', 'passionate', 'encouraging', 'confident', 'playful', 'fun'
        ];
        const negativeWords = [
            'hate', 'dislike', 'sad', 'bad', 'terrible', 'awful', 'worst', 'poor',
            'angry', 'upset', 'negative', 'disappointed', 'horrible', 'disgusting',
            'lame', 'gross', 'unhappy', 'frustrated', 'annoyed', 'pathetic', 'dreadful',
            'miserable', 'unpleasant', 'atrocious', 'nasty', 'unacceptable', 'regret',
            'resent', 'hostile', 'depressed', 'hopeless', 'insecure', 'jealous', 'lazy',
            'rude', 'selfish', 'mean', 'spiteful', 'toxic', 'vulgar', 'bitter',
            'cowardly', 'weak', 'careless', 'ignorant', 'manipulative', 'stubborn',
            'fearful', 'gloomy', 'irritated', 'vindictive', 'dishonest', 'cruel' , 'ugly'
        ];

        positiveWords.forEach(word => {
            if (text.includes(word)) score += 1;
        });
        negativeWords.forEach(word => {
            if (text.includes(word)) score -= 1;
        });

        if (score > 0) {
            result.textContent = 'Positive sentiment detected!';
            result.style.color = '#34d399';
            input.style.borderColor = '#34d399';
        } else if (score < 0) {
            result.textContent = 'Negative sentiment detected.';
            result.style.color = '#f87171';
            input.style.borderColor = '#f87171';
        } else {
            result.textContent = 'Neutral sentiment.';
            result.style.color = '#9ca3af';
            input.style.borderColor = '#9ca3af';
        }

        input.classList.add('animate-pulse');
        setTimeout(() => input.classList.remove('animate-pulse'), 1000);

    } catch (e) {
        console.error('Sentiment analysis error:', e);
        result.textContent = 'Error processing sentiment.';
        result.style.color = '#f87171';
    }
}

// Call these functions on page load
window.onload = function() {
    drawNeuralNetwork && drawNeuralNetwork();
    drawSkillProficiencyChart();
    drawAccuracyChart();
};
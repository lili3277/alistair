// ===== 1. 背景粒子（Canvas） =====
(function initParticles() {
    const container = document.getElementById('particles');
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];

    // 粒子类
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.6 + 0.2;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(180, 120, 255, ${this.opacity})`;
            ctx.fill();
        }
    }

    function initParticleSystem(count = 120) {
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }
    initParticleSystem();

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        // 绘制连线
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(150, 100, 255, ${0.12 * (1 - dist/150)})`;
                    ctx.lineWidth = 0.8;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // 窗口调整
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles = [];
        initParticleSystem();
    });
})();

// ===== 2. 按钮交互 =====
const resultBox = document.getElementById('resultBox');
const detectBtn = document.getElementById('detectBtn');
const chaosBtn = document.getElementById('chaosBtn');
const escapeBtn = document.getElementById('escapeBtn');

// 随机评语库
const detectMessages = [
    '🧬 检测结果：您的非正常指数高达 98.7% — 属于“极度危险”级别！',
    '🤖 脑电波扫描完成：您的大脑有 70% 被猫占领，建议立即撸猫。',
    '⚡ 非正常评级：S级 — 您已被列入“宇宙摸鱼名人堂”。',
    '🌌 检测到您来自M78星云，地球文明对您表示敬意。',
    '🎮 您的游戏水平为“黑洞级”，建议远离竞技游戏。',
    '☕ 咖啡因代谢异常，您可能是一只披着人皮的咖啡机。',
];

const chaosMessages = [
    '🌀 混沌释放成功！您周围 5 米内的代码开始自发重构...',
    '🔥 混沌能量爆发：所有 Bug 变异为彩色的蝴蝶。',
    '💥 空间扭曲！您的屏幕现在可以显示 4D 图形（但您看不到）。',
    '🌪️ 混沌之风吹过，您的浏览器开始倒立显示。',
    '✨ 混沌粒子激活：您的光标现在会随机跳舞。',
];

const escapeMessages = [
    '🏃 您已经逃跑了 0 次，但每次都被我抓回来。',
    '😈 别想跑！我已经锁定了您的 IP 和 灵魂。',
    '🔒 逃跑失败，您被永久困在这个页面里。',
    '🚫 您点击了“别点我”，现在您的鼠标会自己移动。',
];

function getRandomMessage(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// 添加文字闪动效果
function flashResult(text, color = '#6bffb8') {
    resultBox.style.transition = 'none';
    resultBox.style.color = '#fff';
    resultBox.style.textShadow = `0 0 20px ${color}`;
    resultBox.innerHTML = text;
    setTimeout(() => {
        resultBox.style.transition = 'all 0.4s ease';
        resultBox.style.color = '#b8c8f0';
        resultBox.style.textShadow = 'none';
    }, 300);
}

detectBtn.addEventListener('click', () => {
    const msg = getRandomMessage(detectMessages);
    flashResult('🔬 ' + msg, '#ff6ec7');
});

chaosBtn.addEventListener('click', () => {
    const msg = getRandomMessage(chaosMessages);
    flashResult('🌀 ' + msg, '#ffb86b');
    // 额外搞怪：让页面轻微抖动
    document.querySelector('.profile-card').style.animation = 'shake 0.5s ease';
    setTimeout(() => {
        document.querySelector('.profile-card').style.animation = 'cardFloat 6s ease-in-out infinite';
    }, 500);
});

escapeBtn.addEventListener('click', () => {
    const msg = getRandomMessage(escapeMessages);
    flashResult('🏃 ' + msg, '#ff6ec7');
    // 让按钮随机移动
    const btn = escapeBtn;
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    btn.style.transform = `translate(${x}px, ${y}px)`;
    setTimeout(() => {
        btn.style.transform = 'translate(0, 0)';
    }, 1000);
});

// 额外：鼠标悬停时随机改变结果框颜色（只是好玩）
resultBox.addEventListener('mouseenter', () => {
    const hue = Math.floor(Math.random() * 360);
    resultBox.style.borderLeftColor = `hsl(${hue}, 80%, 60%)`;
});
let score = 0;
function updateScore(points) {
    score += points;
    document.getElementById('score').textContent = score;
}

// Esercizio 1: Click
const clickTargets = document.getElementById('click-targets');
for (let i = 1; i <= 5; i++) {
    const target = document.createElement('div');
    target.className = 'target';
    target.textContent = 'Target ' + i;
    target.onclick = function() {
        if (!this.classList.contains('clicked')) {
            this.classList.add('clicked');
            updateScore(10);
        }
    };
    clickTargets.appendChild(target);
}

// Esercizio 2: Trascinamento
const dragArea = document.getElementById('drag-area');
for (let i = 1; i <= 5; i++) {
    const item = document.createElement('div');
    item.className = 'item';
    item.draggable = true;
    item.textContent = 'Item ' + i;
    item.id = 'item-' + i;

    const dropZone = document.createElement('div');
    dropZone.className = 'drop-zone';
    dropZone.id = 'drop-' + i;

    dragArea.appendChild(item);
    dragArea.appendChild(dropZone);
}

// Setup drag and drop
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', e.target.id);
    });
});

document.querySelectorAll('.drop-zone').forEach(zone => {
    zone.addEventListener('dragover', e => {
        e.preventDefault();
        if (!zone.classList.contains('filled')) {
            zone.style.backgroundColor = '#ecf0f1';
        }
    });

    zone.addEventListener('dragleave', e => {
        if (!zone.classList.contains('filled')) {
            zone.style.backgroundColor = 'transparent';
        }
    });

    zone.addEventListener('drop', e => {
        e.preventDefault();
        const id = e.dataTransfer.getData('text/plain');
        const draggable = document.getElementById(id);
        
        if (!zone.classList.contains('filled')) {
            zone.appendChild(draggable);
            draggable.classList.add('dropped');
            zone.classList.add('filled');
            zone.style.backgroundColor = '';
            updateScore(20);
        }
    });
});

// Esercizio 3: Precisione
const precisionArea = document.getElementById('precision-area');
let currentTarget = 5;

for (let i = 5; i >= 1; i--) {
    const target = document.createElement('div');
    target.className = 'precision-target';
    target.style.width = (30 + i * 10) + 'px';
    target.style.height = (30 + i * 10) + 'px';
    target.style.left = Math.random() * (precisionArea.offsetWidth - 80) + 'px';
    target.style.top = Math.random() * (precisionArea.offsetHeight - 80) + 'px';
    target.textContent = i;
    target.dataset.value = i;
    
    target.onclick = function() {
        if (parseInt(this.dataset.value) === currentTarget) {
            this.classList.add('hit');
            updateScore(30);
            currentTarget--;
        }
    };
    
    precisionArea.appendChild(target);
}

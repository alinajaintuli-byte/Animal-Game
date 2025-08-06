class AnimalForestRun {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        
        // Game state
        this.score = 0;
        this.level = 1;
        this.size = 1;
        this.gameOver = false;
        this.paused = false;
        
        // Player (animal)
        this.player = {
            x: this.width / 2,
            y: this.height / 2,
            size: 20,
            speed: 3,
            animalType: 'mouse',
            color: '#8B4513',
            stomach: 0,
            maxStomach: 3,
            needsToPoop: false,
            poopTimer: 0,
            canSwim: false,
            swimTime: 0,
            isWaterAnimal: false,
            isSwimming: false,
            swimTimer: 0,
            isFlying: false,
            flyTimer: 0,
            canFly: false
        };
        
        // Animal evolution stages
        this.animalStages = [
            { type: 'mouse', size: 20, color: '#8B4513', emoji: '🐭', speed: 3, maxStomach: 3, canSwim: false, swimTime: 0, isWaterAnimal: false },
            { type: 'rabbit', size: 25, color: '#DEB887', emoji: '🐰', speed: 4, maxStomach: 5, canSwim: false, swimTime: 0, isWaterAnimal: false },
            { type: 'fox', size: 30, color: '#FF8C00', emoji: '🦊', speed: 5, maxStomach: 7, canSwim: false, swimTime: 0, isWaterAnimal: false },
            { type: 'deer', size: 35, color: '#8B7355', emoji: '🦌', speed: 4, maxStomach: 9, canSwim: false, swimTime: 0, isWaterAnimal: false },
            { type: 'bear', size: 40, color: '#8B4513', emoji: '🐻', speed: 3, maxStomach: 12, canSwim: true, swimTime: 120, isWaterAnimal: false },
            { type: 'elephant', size: 50, color: '#696969', emoji: '🐘', speed: 2, maxStomach: 15, canSwim: true, swimTime: 180, isWaterAnimal: false },
            { type: 'duck', size: 25, color: '#FFD700', emoji: '🦆', speed: 4, maxStomach: 6, canSwim: true, swimTime: 300, isWaterAnimal: true },
            { type: 'otter', size: 30, color: '#8B4513', emoji: '🦦', speed: 5, maxStomach: 8, canSwim: true, swimTime: 600, isWaterAnimal: true },
            { type: 'beaver', size: 35, color: '#8B7355', emoji: '🦫', speed: 3, maxStomach: 10, canSwim: true, swimTime: 900, isWaterAnimal: true }
        ];
        
        // Food types
        this.foodTypes = [
            { type: 'berry', emoji: '🫐', points: 10, color: '#8A2BE2', size: 8 },
            { type: 'apple', emoji: '🍎', points: 15, color: '#FF0000', size: 10 },
            { type: 'carrot', emoji: '🥕', points: 20, color: '#FFA500', size: 12 },
            { type: 'mushroom', emoji: '🍄', points: 25, color: '#FF69B4', size: 14 },
            { type: 'acorn', emoji: '🌰', points: 30, color: '#8B4513', size: 16 },
            { type: 'honey', emoji: '🍯', points: 40, color: '#FFD700', size: 18 }
        ];
        
        // Powerup types
        this.powerupTypes = [
            { type: 'fart', emoji: '💨', points: 50, color: '#8B4513', size: 15, effect: 'fly' },
            { type: 'bubble', emoji: '🫧', points: 30, color: '#87CEEB', size: 12, effect: 'swim' }
        ];
        
        // Game objects
        this.foods = [];
        this.powerups = [];
        this.obstacles = [];
        this.particles = [];
        this.waterAreas = [];
        
        // Input handling
        this.keys = {};
        this.setupInput();
        
        // Start game
        this.spawnFood();
        this.spawnPowerups();
        this.spawnObstacles();
        this.createWaterAreas();
        this.gameLoop();
    }
    
    setupInput() {
        document.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
            
            // Restart game
            if (e.key === 'r' || e.key === 'R') {
                this.restart();
            }
        });
        
        document.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });
        
        // Restart button
        document.getElementById('restartBtn').addEventListener('click', () => {
            this.restart();
        });
    }
    
    updatePlayer() {
        // Check if in water
        const inWater = this.isInWater(this.player.x, this.player.y);
        
        // Handle swimming
        if (inWater) {
            if (!this.player.isSwimming && this.player.canSwim) {
                this.player.isSwimming = true;
                this.player.swimTimer = this.player.swimTime;
            }
        } else {
            this.player.isSwimming = false;
        }
        
        // Update swim timer
        if (this.player.isSwimming) {
            this.player.swimTimer--;
            if (this.player.swimTimer <= 0) {
                this.player.isSwimming = false;
                // Move player out of water if not water animal
                if (!this.player.isWaterAnimal) {
                    this.player.x = Math.max(50, Math.min(this.width - 50, this.player.x));
                    this.player.y = Math.max(50, Math.min(this.height - 50, this.player.y));
                }
            }
        }
        
        // Update fly timer
        if (this.player.isFlying) {
            this.player.flyTimer--;
            if (this.player.flyTimer <= 0) {
                this.player.isFlying = false;
            }
        }
        
        // Handle movement
        let speed = this.player.speed;
        if (this.player.isFlying) {
            speed *= 1.5; // Flying is faster
        }
        if (this.player.isSwimming) {
            speed *= 0.7; // Swimming is slower
        }
        
        if (this.keys['w'] || this.keys['arrowup']) {
            this.player.y -= speed;
        }
        if (this.keys['s'] || this.keys['arrowdown']) {
            this.player.y += speed;
        }
        if (this.keys['a'] || this.keys['arrowleft']) {
            this.player.x -= speed;
        }
        if (this.keys['d'] || this.keys['arrowright']) {
            this.player.x += speed;
        }
        
        // Handle pooping with spacebar
        if ((this.keys[' '] || this.keys['space']) && this.player.needsToPoop) {
            this.poop();
        }
        
        // Keep player in bounds
        this.player.x = Math.max(this.player.size, Math.min(this.width - this.player.size, this.player.x));
        this.player.y = Math.max(this.player.size, Math.min(this.height - this.player.size, this.player.y));
        
        // Update poop timer
        if (this.player.needsToPoop) {
            this.player.poopTimer--;
            if (this.player.poopTimer <= 0) {
                this.poop(); // Auto poop if timer runs out
            }
        }
    }
    
    checkCollisions() {
        // Check food collisions
        for (let i = this.foods.length - 1; i >= 0; i--) {
            const food = this.foods[i];
            const distance = Math.sqrt(
                Math.pow(this.player.x - food.x, 2) + 
                Math.pow(this.player.y - food.y, 2)
            );
            
            if (distance < this.player.size + food.size) {
                this.eatFood(food, i);
            }
        }
        
        // Check powerup collisions
        for (let i = this.powerups.length - 1; i >= 0; i--) {
            const powerup = this.powerups[i];
            const distance = Math.sqrt(
                Math.pow(this.player.x - powerup.x, 2) + 
                Math.pow(this.player.y - powerup.y, 2)
            );
            
            if (distance < this.player.size + powerup.size) {
                this.collectPowerup(powerup, i);
            }
        }
        
        // Check obstacle collisions
        for (let obstacle of this.obstacles) {
            const distance = Math.sqrt(
                Math.pow(this.player.x - obstacle.x, 2) + 
                Math.pow(this.player.y - obstacle.y, 2)
            );
            
            if (distance < this.player.size + obstacle.size) {
                this.gameOver = true;
                this.showGameOver();
            }
        }
    }
    
    eatFood(food, index) {
        // Check if stomach is full
        if (this.player.stomach >= this.player.maxStomach) {
            return; // Can't eat more food
        }
        
        this.score += food.points;
        this.size += 1;
        this.player.stomach += 1;
        
        // Remove food
        this.foods.splice(index, 1);
        
        // Create particle effect
        this.createParticles(food.x, food.y, food.color);
        
        // Check if stomach is getting full
        if (this.player.stomach >= this.player.maxStomach * 0.8) {
            this.player.needsToPoop = true;
            this.player.poopTimer = 180; // 3 seconds at 60fps
        }
        
        // Check for evolution
        this.checkEvolution();
        
        // Spawn new food
        if (this.foods.length < 5) {
            this.spawnFood();
        }
        
        // Spawn powerups occasionally
        if (Math.random() < 0.1 && this.powerups.length < 2) {
            this.spawnPowerups();
        }
        
        // Update level
        this.level = Math.floor(this.score / 100) + 1;
        
        // Update UI
        this.updateUI();
    }
    
    checkEvolution() {
        const currentStage = this.animalStages.find(stage => stage.type === this.player.animalType);
        const currentIndex = this.animalStages.indexOf(currentStage);
        
        if (this.size >= (currentIndex + 1) * 20 && currentIndex < this.animalStages.length - 1) {
            const nextStage = this.animalStages[currentIndex + 1];
            this.player.animalType = nextStage.type;
            this.player.size = nextStage.size;
            this.player.speed = nextStage.speed;
            this.player.color = nextStage.color;
            this.player.maxStomach = nextStage.maxStomach;
            this.player.canSwim = nextStage.canSwim;
            this.player.swimTime = nextStage.swimTime;
            this.player.isWaterAnimal = nextStage.isWaterAnimal;
            
            // Evolution effect
            this.createEvolutionEffect();
        }
    }
    
    collectPowerup(powerup, index) {
        this.score += powerup.points;
        
        // Apply powerup effect
        if (powerup.effect === 'fly') {
            this.player.isFlying = true;
            this.player.flyTimer = 300; // 5 seconds at 60fps
            this.player.canFly = true;
        } else if (powerup.effect === 'swim') {
            this.player.swimTime += 120; // Add 2 seconds of swim time
        }
        
        // Remove powerup
        this.powerups.splice(index, 1);
        
        // Create particle effect
        this.createParticles(powerup.x, powerup.y, powerup.color);
        
        // Update UI
        this.updateUI();
    }
    
    createParticles(x, y, color) {
        for (let i = 0; i < 8; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                life: 30,
                color: color,
                size: Math.random() * 3 + 2
            });
        }
    }
    
    createEvolutionEffect() {
        for (let i = 0; i < 20; i++) {
            this.particles.push({
                x: this.player.x,
                y: this.player.y,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6,
                life: 60,
                color: '#FFD700',
                size: Math.random() * 4 + 3
            });
        }
    }
    
    createWaterAreas() {
        // Create water areas
        this.waterAreas = [
            { x: 100, y: 200, width: 200, height: 150 },
            { x: 500, y: 300, width: 150, height: 200 },
            { x: 300, y: 450, width: 250, height: 100 }
        ];
    }
    
    isInWater(x, y) {
        for (let water of this.waterAreas) {
            if (x >= water.x && x <= water.x + water.width &&
                y >= water.y && y <= water.y + water.height) {
                return true;
            }
        }
        return false;
    }
    
    poop() {
        // Create poop particles
        for (let i = 0; i < 15; i++) {
            this.particles.push({
                x: this.player.x + (Math.random() - 0.5) * 20,
                y: this.player.y + (Math.random() - 0.5) * 20,
                vx: (Math.random() - 0.5) * 3,
                vy: (Math.random() - 0.5) * 3,
                life: 45,
                color: '#8B4513',
                size: Math.random() * 4 + 2
            });
        }
        
        // Reset stomach
        this.player.stomach = 0;
        this.player.needsToPoop = false;
        this.player.poopTimer = 0;
        
        // Add some points for pooping (relief bonus)
        this.score += 5;
        this.updateUI();
    }
    
    spawnFood() {
        const foodType = this.foodTypes[Math.floor(Math.random() * this.foodTypes.length)];
        const food = {
            x: Math.random() * (this.width - 40) + 20,
            y: Math.random() * (this.height - 40) + 20,
            type: foodType.type,
            emoji: foodType.emoji,
            points: foodType.points,
            color: foodType.color,
            size: foodType.size
        };
        this.foods.push(food);
    }
    
    spawnPowerups() {
        const powerupType = this.powerupTypes[Math.floor(Math.random() * this.powerupTypes.length)];
        const powerup = {
            x: Math.random() * (this.width - 40) + 20,
            y: Math.random() * (this.height - 40) + 20,
            type: powerupType.type,
            emoji: powerupType.emoji,
            points: powerupType.points,
            color: powerupType.color,
            size: powerupType.size,
            effect: powerupType.effect
        };
        this.powerups.push(powerup);
    }
    
    spawnObstacles() {
        for (let i = 0; i < 3; i++) {
            const obstacle = {
                x: Math.random() * (this.width - 60) + 30,
                y: Math.random() * (this.height - 60) + 30,
                size: 15,
                color: '#654321'
            };
            this.obstacles.push(obstacle);
        }
    }
    
    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life--;
            
            if (particle.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }
    
    drawBackground() {
        // Sky gradient
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(1, '#98FB98');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Draw water areas
        this.ctx.fillStyle = 'rgba(135, 206, 235, 0.6)';
        for (let water of this.waterAreas) {
            this.ctx.fillRect(water.x, water.y, water.width, water.height);
            
            // Add water ripples
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(water.x + water.width/2, water.y + water.height/2, 20 + Math.sin(Date.now() * 0.001) * 5, 0, Math.PI * 2);
            this.ctx.stroke();
        }
        
        // Draw some trees in background
        this.ctx.fillStyle = '#228B22';
        for (let i = 0; i < 5; i++) {
            const x = (i * 150) % this.width;
            const y = this.height - 50;
            this.drawTree(x, y);
        }
    }
    
    drawTree(x, y) {
        // Tree trunk
        this.ctx.fillStyle = '#8B4513';
        this.ctx.fillRect(x - 5, y, 10, 40);
        
        // Tree leaves
        this.ctx.fillStyle = '#228B22';
        this.ctx.beginPath();
        this.ctx.arc(x, y - 20, 25, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    drawPlayer() {
        const currentStage = this.animalStages.find(stage => stage.type === this.player.animalType);
        
        // Draw animal shadow
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.beginPath();
        this.ctx.arc(this.player.x + 2, this.player.y + 2, this.player.size, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Draw animal body
        this.ctx.fillStyle = this.player.color;
        this.ctx.beginPath();
        this.ctx.arc(this.player.x, this.player.y, this.player.size, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Draw animal emoji
        this.ctx.font = `${this.player.size}px Arial`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(currentStage.emoji, this.player.x, this.player.y);
        
        // Draw red eyes when needs to poop
        if (this.player.needsToPoop) {
            const eyeSize = this.player.size * 0.15;
            const eyeOffset = this.player.size * 0.3;
            
            // Left eye
            this.ctx.fillStyle = '#FF0000';
            this.ctx.beginPath();
            this.ctx.arc(this.player.x - eyeOffset, this.player.y - eyeOffset, eyeSize, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Right eye
            this.ctx.beginPath();
            this.ctx.arc(this.player.x + eyeOffset, this.player.y - eyeOffset, eyeSize, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Add glow effect
            this.ctx.shadowColor = '#FF0000';
            this.ctx.shadowBlur = 10;
            this.ctx.beginPath();
            this.ctx.arc(this.player.x - eyeOffset, this.player.y - eyeOffset, eyeSize, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.beginPath();
            this.ctx.arc(this.player.x + eyeOffset, this.player.y - eyeOffset, eyeSize, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        }
        
        // Draw flying effect
        if (this.player.isFlying) {
            this.ctx.fillStyle = 'rgba(255, 255, 0, 0.3)';
            this.ctx.beginPath();
            this.ctx.arc(this.player.x, this.player.y, this.player.size + 10, 0, Math.PI * 2);
            this.ctx.fill();
        }
        
        // Draw swimming effect
        if (this.player.isSwimming) {
            this.ctx.fillStyle = 'rgba(135, 206, 235, 0.3)';
            this.ctx.beginPath();
            this.ctx.arc(this.player.x, this.player.y, this.player.size + 5, 0, Math.PI * 2);
            this.ctx.fill();
        }
        
        // Draw stomach indicator
        if (this.player.stomach > 0) {
            const stomachWidth = (this.player.stomach / this.player.maxStomach) * (this.player.size * 2);
            const stomachHeight = 4;
            const stomachY = this.player.y + this.player.size + 5;
            
            // Background
            this.ctx.fillStyle = '#333';
            this.ctx.fillRect(this.player.x - this.player.size, stomachY, this.player.size * 2, stomachHeight);
            
            // Fill
            this.ctx.fillStyle = this.player.needsToPoop ? '#FF4444' : '#4CAF50';
            this.ctx.fillRect(this.player.x - this.player.size, stomachY, stomachWidth, stomachHeight);
        }
    }
    
    drawFood() {
        for (let food of this.foods) {
            // Food shadow
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.beginPath();
            this.ctx.arc(food.x + 1, food.y + 1, food.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Food body
            this.ctx.fillStyle = food.color;
            this.ctx.beginPath();
            this.ctx.arc(food.x, food.y, food.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Food emoji
            this.ctx.font = `${food.size}px Arial`;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(food.emoji, food.x, food.y);
        }
    }
    
    drawPowerups() {
        for (let powerup of this.powerups) {
            // Powerup shadow
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.beginPath();
            this.ctx.arc(powerup.x + 1, powerup.y + 1, powerup.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Powerup body with glow
            this.ctx.shadowColor = powerup.color;
            this.ctx.shadowBlur = 10;
            this.ctx.fillStyle = powerup.color;
            this.ctx.beginPath();
            this.ctx.arc(powerup.x, powerup.y, powerup.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
            
            // Powerup emoji
            this.ctx.font = `${powerup.size}px Arial`;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(powerup.emoji, powerup.x, powerup.y);
        }
    }
    
    drawObstacles() {
        for (let obstacle of this.obstacles) {
            this.ctx.fillStyle = obstacle.color;
            this.ctx.beginPath();
            this.ctx.arc(obstacle.x, obstacle.y, obstacle.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Draw rock texture
            this.ctx.fillStyle = '#8B7355';
            this.ctx.beginPath();
            this.ctx.arc(obstacle.x - 3, obstacle.y - 3, 3, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }
    
    drawParticles() {
        for (let particle of this.particles) {
            this.ctx.globalAlpha = particle.life / 60;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        }
        this.ctx.globalAlpha = 1;
    }
    
    updateUI() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('level').textContent = this.level;
        document.getElementById('size').textContent = this.size;
        document.getElementById('stomach').textContent = `${this.player.stomach}/${this.player.maxStomach}`;
    }
    
    showGameOver() {
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('gameOver').style.display = 'block';
    }
    
    restart() {
        this.score = 0;
        this.level = 1;
        this.size = 1;
        this.gameOver = false;
        
        this.player = {
            x: this.width / 2,
            y: this.height / 2,
            size: 20,
            speed: 3,
            animalType: 'mouse',
            color: '#8B4513',
            stomach: 0,
            maxStomach: 3,
            needsToPoop: false,
            poopTimer: 0,
            canSwim: false,
            swimTime: 0,
            isWaterAnimal: false,
            isSwimming: false,
            swimTimer: 0,
            isFlying: false,
            flyTimer: 0,
            canFly: false
        };
        
        this.foods = [];
        this.powerups = [];
        this.obstacles = [];
        this.particles = [];
        this.waterAreas = [];
        
        this.spawnFood();
        this.spawnPowerups();
        this.spawnObstacles();
        this.createWaterAreas();
        this.updateUI();
        
        document.getElementById('gameOver').style.display = 'none';
    }
    
    gameLoop() {
        if (!this.gameOver) {
            this.updatePlayer();
            this.checkCollisions();
            this.updateParticles();
            
            // Spawn new food occasionally
            if (Math.random() < 0.01) {
                this.spawnFood();
            }
        }
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Draw everything
        this.drawBackground();
        this.drawObstacles();
        this.drawFood();
        this.drawPowerups();
        this.drawPlayer();
        this.drawParticles();
        
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Start the game when page loads
window.addEventListener('load', () => {
    new AnimalForestRun();
}); 
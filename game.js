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
        this.gameStarted = false;
        
        // Player (animal)
        this.player = {
            x: 100,  // Start on the trail
            y: 300,  // Start on the trail
            size: 20,
            speed: 4,
            animalType: 'mouse',
            color: '#8B4513',
            stomach: 0,
            maxStomach: 2,
            needsToPoop: false,
            poopTimer: 0,
            canSwim: false,
            swimTime: 0,
            isWaterAnimal: false,
            isSwimming: false,
            swimTimer: 0,
            isFlying: false,
            flyTimer: 0,
            canFly: false,
            energy: 100,
            maxEnergy: 100,
            sleepTime: 0,
            isNocturnal: true,
            isSleeping: false,
            isHungry: false,
            hunger: 0,
            maxHunger: 100,
            thirst: 0,
            maxThirst: 100,
            temperature: 20,
            preferredTemperature: 20,
            lastAte: 0,
            lastDrank: 0,
            lastSlept: 0,
            age: 0,
            health: 100,
            maxHealth: 100,
            coins: 0,
            isShopping: false,
            powerups: 0
        };
        
        // Animal evolution stages with realistic behaviors
        this.animalStages = [
            { type: 'mouse', size: 20, color: '#8B4513', emoji: '🐭', speed: 4, maxStomach: 2, canSwim: false, swimTime: 0, isWaterAnimal: false, energy: 100, maxEnergy: 100, sleepTime: 0, isNocturnal: true, preferredFood: ['berry', 'strawberry', 'acorn'] },
            { type: 'rabbit', size: 25, color: '#DEB887', emoji: '🐰', speed: 6, maxStomach: 4, canSwim: false, swimTime: 0, isWaterAnimal: false, energy: 120, maxEnergy: 120, sleepTime: 0, isNocturnal: false, preferredFood: ['carrot', 'apple', 'banana'] },
            { type: 'fox', size: 30, color: '#FF8C00', emoji: '🦊', speed: 7, maxStomach: 6, canSwim: false, swimTime: 0, isWaterAnimal: false, energy: 150, maxEnergy: 150, sleepTime: 0, isNocturnal: true, preferredFood: ['mushroom', 'honey', 'orange'] },
            { type: 'deer', size: 35, color: '#8B7355', emoji: '🦌', speed: 5, maxStomach: 8, canSwim: true, swimTime: 60, isWaterAnimal: false, energy: 200, maxEnergy: 200, sleepTime: 0, isNocturnal: false, preferredFood: ['apple', 'orange', 'acorn'] },
            { type: 'bear', size: 40, color: '#8B4513', emoji: '🐻', speed: 3, maxStomach: 15, canSwim: true, swimTime: 180, isWaterAnimal: false, energy: 300, maxEnergy: 300, sleepTime: 0, isNocturnal: false, preferredFood: ['honey', 'mushroom', 'banana'] },
            { type: 'elephant', size: 50, color: '#696969', emoji: '🐘', speed: 2, maxStomach: 20, canSwim: true, swimTime: 300, isWaterAnimal: false, energy: 500, maxEnergy: 500, sleepTime: 0, isNocturnal: false, preferredFood: ['apple', 'orange', 'carrot'] },
            { type: 'duck', size: 25, color: '#FFD700', emoji: '🦆', speed: 5, maxStomach: 5, canSwim: true, swimTime: 600, isWaterAnimal: true, energy: 100, maxEnergy: 100, sleepTime: 0, isNocturnal: false, preferredFood: ['berry', 'strawberry', 'acorn'] },
            { type: 'otter', size: 30, color: '#8B4513', emoji: '🦦', speed: 6, maxStomach: 7, canSwim: true, swimTime: 900, isWaterAnimal: true, energy: 150, maxEnergy: 150, sleepTime: 0, isNocturnal: false, preferredFood: ['mushroom', 'honey', 'banana'] },
            { type: 'beaver', size: 35, color: '#8B7355', emoji: '🦫', speed: 4, maxStomach: 9, canSwim: true, swimTime: 1200, isWaterAnimal: true, energy: 200, maxEnergy: 200, sleepTime: 0, isNocturnal: false, preferredFood: ['acorn', 'apple', 'orange'] }
        ];
        
        // Food types with realistic nutrition
        this.foodTypes = [
            { type: 'berry', emoji: '🫐', points: 10, color: '#8A2BE2', size: 8, nutrition: 15, energy: 20, water: 5, temperature: 0, healthBonus: 8 },
            { type: 'apple', emoji: '🍎', points: 15, color: '#FF0000', size: 10, nutrition: 25, energy: 30, water: 15, temperature: 0, healthBonus: 15 },
            { type: 'orange', emoji: '🍊', points: 18, color: '#FFA500', size: 11, nutrition: 22, energy: 25, water: 20, temperature: 0, healthBonus: 12 },
            { type: 'banana', emoji: '🍌', points: 12, color: '#FFD700', size: 9, nutrition: 18, energy: 22, water: 8, temperature: 0, healthBonus: 10 },
            { type: 'strawberry', emoji: '🍓', points: 8, color: '#FF69B4', size: 7, nutrition: 12, energy: 15, water: 12, temperature: 0, healthBonus: 6 },
            { type: 'carrot', emoji: '🥕', points: 20, color: '#FFA500', size: 12, nutrition: 30, energy: 25, water: 10, temperature: 0, healthBonus: 5 },
            { type: 'mushroom', emoji: '🍄', points: 25, color: '#FF69B4', size: 14, nutrition: 20, energy: 15, water: 8, temperature: 0, healthBonus: 3 },
            { type: 'acorn', emoji: '🌰', points: 30, color: '#8B4513', size: 16, nutrition: 40, energy: 35, water: 5, temperature: 0, healthBonus: 2 },
            { type: 'honey', emoji: '🍯', points: 40, color: '#FFD700', size: 18, nutrition: 50, energy: 60, water: 2, temperature: 0, healthBonus: 4 }
        ];
        
        // Powerup types
        this.powerupTypes = [
            { type: 'fart', emoji: '💨', points: 50, color: '#8B4513', size: 15, effect: 'fly' },
            { type: 'bubble', emoji: '🫧', points: 30, color: '#87CEEB', size: 12, effect: 'swim' }
        ];
        
        // Other animal types
        this.otherAnimalTypes = [
            { type: 'squirrel', emoji: '🐿️', size: 18, speed: 5, isFriendly: true, behavior: 'collector', color: '#8B4513' },
            { type: 'bird', emoji: '🐦', size: 15, speed: 6, isFriendly: true, behavior: 'flyer', color: '#87CEEB' },
            { type: 'rabbit', emoji: '🐰', size: 20, speed: 7, isFriendly: true, behavior: 'hopper', color: '#DEB887' },
            { type: 'wolf', emoji: '🐺', size: 25, speed: 8, isFriendly: false, behavior: 'hunter', color: '#696969' },
            { type: 'snake', emoji: '🐍', size: 22, speed: 4, isFriendly: false, behavior: 'ambusher', color: '#228B22' },
            { type: 'owl', emoji: '🦉', size: 20, speed: 5, isFriendly: true, behavior: 'nocturnal', color: '#8B7355' },
            { type: 'merchant', emoji: '🦝', size: 22, speed: 3, isFriendly: true, behavior: 'trader', color: '#8B7355' }
        ];
        
        // People types
        this.peopleTypes = [
            { type: 'hiker', emoji: '🧑‍🦯', size: 25, behavior: 'wanderer', isFriendly: true, color: '#4169E1' },
            { type: 'farmer', emoji: '👨‍🌾', size: 28, behavior: 'worker', isFriendly: true, color: '#8B4513' },
            { type: 'hunter', emoji: '🏹', size: 30, behavior: 'dangerous', isFriendly: false, color: '#8B0000' },
            { type: 'trader', emoji: '🛒', size: 30, behavior: 'trader', isFriendly: true, color: '#FFD700' }
        ];
        
        // Game objects
        this.foods = [];
        this.powerups = [];
        this.obstacles = [];
        this.particles = [];
        this.waterAreas = [];
        this.coins = [];
        this.otherAnimals = [];
        this.people = [];
        this.projectiles = [];
        this.projectiles = [];
        this.weather = {
            temperature: 20,
            humidity: 50,
            timeOfDay: 12, // 0-24 hour cycle
            isRaining: false,
            windSpeed: 0
        };
        this.environment = {
            dayNightCycle: true,
            temperatureVariation: true,
            weatherEffects: true
        };
        this.shop = {
            items: [
                { name: 'Energy Boost', cost: 10, effect: 'energy', value: 50 },
                { name: 'Health Potion', cost: 15, effect: 'health', value: 30 },
                { name: 'Swim Upgrade', cost: 20, effect: 'swim', value: 60 },
                { name: 'Speed Boost', cost: 25, effect: 'speed', value: 2 },
                { name: 'Stomach Upgrade', cost: 30, effect: 'stomach', value: 2 },
                { name: 'Flying Upgrade', cost: 40, effect: 'fly', value: 120 },
                { name: 'Temperature Resistance', cost: 35, effect: 'temperature', value: 10 },
                { name: 'Hunger Resistance', cost: 25, effect: 'hunger', value: 20 },
                { name: 'Giant Growth', cost: 100, effect: 'size', value: 10 }
            ]
        };
        
        // Trading system
        this.isTrading = false;
        this.currentTrader = null;
        
        // Input handling
        this.keys = {};
        this.setupInput();
        
        // Setup start button
        this.setupStartButton();
        
        // Start game loop (but don't start gameplay yet)
        this.gameLoop();
    }
    
    setupStartButton() {
        const startButton = document.getElementById('startButton');
        const startScreen = document.getElementById('startScreen');
        const instructions = document.querySelector('.instructions');
        
        startButton.addEventListener('click', () => {
            this.startGame();
            startScreen.style.display = 'none';
            instructions.style.display = 'none';
        });
    }
    
    startGame() {
        this.gameStarted = true;
        this.createTrail();
        this.spawnFood();
        this.spawnPowerups();
        this.spawnObstacles();
        this.spawnCoins();
        this.spawnOtherAnimals();
        this.spawnPeople();
        this.createWaterAreas();
        this.spawnTrailTraders();
        this.spawnOffTrailDangers();
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
        // Update environmental effects
        this.updateEnvironment();
        
        // Check if in water
        const inWater = this.isInWater(this.player.x, this.player.y);
        
        // Handle swimming
        if (inWater) {
            if (!this.player.isSwimming && this.player.canSwim) {
                this.player.isSwimming = true;
                this.player.swimTimer = this.player.swimTime;
            }
            // Drinking water
            if (this.player.thirst > 0) {
                this.player.thirst = Math.max(0, this.player.thirst - 0.5);
                this.player.lastDrank = 0;
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
        
        // Handle movement with realistic physics
        let speed = this.player.speed;
        
        // Energy affects speed
        if (this.player.energy < this.player.maxEnergy * 0.3) {
            speed *= 0.5; // Slow when tired
        }
        
        // Temperature affects speed
        const tempDiff = Math.abs(this.player.temperature - this.player.preferredTemperature);
        if (tempDiff > 10) {
            speed *= 0.7; // Slow in extreme temperatures
        }
        
        // Nocturnal animals are slower during day
        if (this.player.isNocturnal && this.weather.timeOfDay > 6 && this.weather.timeOfDay < 18) {
            speed *= 0.6;
        }
        
        // Diurnal animals are slower at night
        if (!this.player.isNocturnal && (this.weather.timeOfDay < 6 || this.weather.timeOfDay > 18)) {
            speed *= 0.6;
        }
        
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
        
        // Handle pooping with P key
        if ((this.keys['p'] || this.keys['P']) && this.player.needsToPoop) {
            this.poop();
        }
        
        // Handle sleeping with S key
        if ((this.keys['s'] || this.keys['S']) && !this.player.isSwimming && !this.player.isFlying) {
            this.sleep();
        }
        
        // Handle flying with F key
        if ((this.keys['f'] || this.keys['F']) && !this.player.isFlying && this.player.energy > 20) {
            this.startFlying();
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
        
        // Update realistic needs
        this.updateAnimalNeeds();
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
        
        // Check coin collisions
        for (let i = this.coins.length - 1; i >= 0; i--) {
            const coin = this.coins[i];
            const distance = Math.sqrt(
                Math.pow(this.player.x - coin.x, 2) + 
                Math.pow(this.player.y - coin.y, 2)
            );
            
            if (distance < this.player.size + coin.size) {
                this.collectCoin(coin, i);
            }
        }
        
        // Check other animal interactions
        for (let animal of this.otherAnimals) {
            const distance = Math.sqrt(
                Math.pow(this.player.x - animal.x, 2) + 
                Math.pow(this.player.y - animal.y, 2)
            );
            
            if (distance < this.player.size + animal.size) {
                // Add cooldown to prevent constant damage
                if (!animal.lastDamageTime || Date.now() - animal.lastDamageTime > 1000) {
                    this.interactWithAnimal(animal);
                    animal.lastDamageTime = Date.now();
                }
            }
        }
        
        // Check people interactions
        for (let person of this.people) {
            const distance = Math.sqrt(
                Math.pow(this.player.x - person.x, 2) + 
                Math.pow(this.player.y - person.y, 2)
            );
            
            if (distance < this.player.size + person.size) {
                // Add cooldown to prevent constant damage
                if (!person.lastDamageTime || Date.now() - person.lastDamageTime > 1000) {
                    this.interactWithPerson(person);
                    person.lastDamageTime = Date.now();
                }
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
        
        // Check if animal prefers this food
        const currentStage = this.animalStages.find(stage => stage.type === this.player.animalType);
        const isPreferredFood = currentStage.preferredFood.includes(food.type);
        const nutritionBonus = isPreferredFood ? 1.5 : 1.0;
        
        this.score += food.points * nutritionBonus;
        
        // Growth benefits from fruits - only if at full health
        if (this.player.health >= this.player.maxHealth) {
            if (food.healthBonus > 5) {
                // Fruits provide extra growth
                this.size += 2;
                this.player.stomach += 1;
            } else {
                // Other foods provide normal growth
                this.size += 1;
                this.player.stomach += 1;
            }
        } else {
            // Can't grow if not at full health - only nutrition benefits
            this.player.stomach += 1;
        }
        
        // Apply realistic nutrition effects
        this.player.energy = Math.min(this.player.maxEnergy, this.player.energy + food.energy);
        this.player.hunger = Math.max(0, this.player.hunger - food.nutrition);
        this.player.thirst = Math.max(0, this.player.thirst - food.water);
        
        // Apply health bonus from fruits and other foods
        const healthGain = food.healthBonus || (food.nutrition * 0.1);
        this.player.health = Math.min(this.player.maxHealth, this.player.health + healthGain);
        
        this.player.lastAte = 0;
        
        // Temperature effects from food
        this.player.temperature += food.temperature;
        
        // Remove food
        this.foods.splice(index, 1);
        
        // Create particle effect
        this.createParticles(food.x, food.y, food.color);
        
        // Create special healing and growth effects for fruits
        if (food.healthBonus > 5) {
            this.createHealingEffect(food.x, food.y);
            if (this.player.health >= this.player.maxHealth) {
                this.createFruitGrowthEffect(food.x, food.y);
            } else {
                this.createHealthBlockedEffect(food.x, food.y);
            }
        }
        
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
        this.player.powerups++;
        
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
    
    collectCoin(coin, index) {
        this.player.coins += coin.value;
        this.score += 5;
        
        // Remove coin
        this.coins.splice(index, 1);
        
        // Create particle effect
        this.createParticles(coin.x, coin.y, '#FFD700');
        
        // Spawn new coin
        if (Math.random() < 0.3) {
            this.spawnCoins();
        }
        
        this.updateUI();
    }
    
    interactWithAnimal(animal) {
        if (animal.behavior === 'trader') {
            // Start trading with merchant
            this.startTrading(animal);
        } else if (animal.isFriendly) {
            // Friendly interaction
            this.score += 10;
            this.player.energy = Math.min(this.player.maxEnergy, this.player.energy + 10);
            
            // Create friendly particle effect
            this.createParticles(animal.x, animal.y, '#4CAF50');
        } else {
            // Hostile interaction - shrink player and deal direct damage
            let shrinkAmount = 2;
            let healthDamage = 15; // Direct health damage
            
            if (!this.isOnTrail(this.player.x, this.player.y)) {
                shrinkAmount = 4; // More shrinking when off trail
                healthDamage = 25; // More health damage when off trail
            }
            
            // Deal direct health damage
            this.player.health = Math.max(0, this.player.health - healthDamage);
            
            // Check for game over from health damage
            if (this.player.health <= 0) {
                this.gameOver = true;
                this.showGameOver();
                return;
            }
            
            this.shrinkPlayer(shrinkAmount);
            this.score -= 5;
            
            // Create hostile particle effect
            this.createParticles(animal.x, animal.y, '#FF4444');
        }
        
        this.updateUI();
    }
    
    interactWithPerson(person) {
        if (person.behavior === 'trader') {
            // Start trading with trader
            this.startTrading(person);
        } else if (person.isFriendly) {
            // Friendly person interaction
            this.score += 15;
            this.player.coins += 2;
            
            // Create friendly particle effect
            this.createParticles(person.x, person.y, '#4CAF50');
        } else {
            // Dangerous person interaction - shrink player and deal direct damage
            let shrinkAmount = 3;
            let healthDamage = 20; // Direct health damage from hunters
            
            if (!this.isOnTrail(this.player.x, this.player.y)) {
                shrinkAmount = 6; // More shrinking when off trail
                healthDamage = 35; // More health damage when off trail
            }
            
            // Deal direct health damage
            this.player.health = Math.max(0, this.player.health - healthDamage);
            
            // Check for game over from health damage
            if (this.player.health <= 0) {
                this.gameOver = true;
                this.showGameOver();
                return;
            }
            
            this.shrinkPlayer(shrinkAmount);
            this.score -= 10;
            
            // Create dangerous particle effect
            this.createParticles(person.x, person.y, '#FF0000');
        }
        
        this.updateUI();
    }
    
    buyShopItem(item) {
        if (this.player.coins >= item.cost) {
            this.player.coins -= item.cost;
            
            // Apply item effect
            switch(item.effect) {
                case 'energy':
                    this.player.energy = Math.min(this.player.maxEnergy, this.player.energy + item.value);
                    break;
                case 'health':
                    this.player.health = Math.min(this.player.maxHealth, this.player.health + item.value);
                    break;
                case 'swim':
                    this.player.swimTime += item.value;
                    break;
                case 'speed':
                    this.player.speed += item.value;
                    break;
                case 'stomach':
                    this.player.maxStomach += item.value;
                    break;
            }
            
            this.updateUI();
        }
    }
    
    startTrading(trader) {
        this.isTrading = true;
        this.currentTrader = trader;
        this.showTradingUI();
    }
    
    showTradingUI() {
        // Remove existing trading UI if any
        const existingUI = document.getElementById('tradingUI');
        if (existingUI) {
            existingUI.remove();
        }
        
        // Create trading UI overlay
        const tradingDiv = document.createElement('div');
        tradingDiv.id = 'tradingUI';
        tradingDiv.className = 'trading-ui';
        tradingDiv.innerHTML = `
            <div class="trading-panel">
                <h3>🛒 ${this.currentTrader.type} Trader</h3>
                <p>Your Coins: ${this.player.coins}</p>
                <div class="shop-items">
                    ${this.shop.items.map(item => `
                        <div class="shop-item">
                            <span>${item.name}</span>
                            <span>${item.cost} 🪙</span>
                            <button onclick="game.buyFromTrader('${item.name}')" 
                                    ${this.player.coins >= item.cost ? '' : 'disabled'}>
                                Buy
                            </button>
                        </div>
                    `).join('')}
                </div>
                <button onclick="game.closeTrading()" class="close-btn">Close</button>
            </div>
        `;
        document.body.appendChild(tradingDiv);
    }
    
    buyFromTrader(itemName) {
        const item = this.shop.items.find(i => i.name === itemName);
        if (item && this.player.coins >= item.cost) {
            this.player.coins -= item.cost;
            
            // Apply item effect
            switch(item.effect) {
                case 'energy':
                    this.player.energy = Math.min(this.player.maxEnergy, this.player.energy + item.value);
                    break;
                case 'health':
                    this.player.health = Math.min(this.player.maxHealth, this.player.health + item.value);
                    break;
                case 'swim':
                    this.player.swimTime += item.value;
                    break;
                case 'speed':
                    this.player.speed += item.value;
                    break;
                case 'stomach':
                    this.player.maxStomach += item.value;
                    break;
                case 'fly':
                    this.player.flyTimer += item.value;
                    break;
                case 'temperature':
                    this.player.preferredTemperature += item.value;
                    break;
                case 'hunger':
                    this.player.maxHunger += item.value;
                    break;
                case 'size':
                    this.player.size *= item.value;
                    this.size = Math.floor(this.player.size / 20); // Update level display
                    break;
            }
            
            // Create purchase particle effect
            this.createParticles(this.player.x, this.player.y, '#FFD700');
            
            // Special effect for Giant Growth
            if (item.effect === 'size') {
                this.createGiantGrowthEffect();
            }
            
            // Update trading UI
            this.showTradingUI();
            this.updateUI();
        }
    }
    
    closeTrading() {
        this.isTrading = false;
        this.currentTrader = null;
        const tradingUI = document.getElementById('tradingUI');
        if (tradingUI) {
            tradingUI.remove();
        }
    }
    
    updateEnvironment() {
        // Day/night cycle
        this.weather.timeOfDay += 0.01;
        if (this.weather.timeOfDay >= 24) {
            this.weather.timeOfDay = 0;
        }
        
        // Temperature variation
        this.weather.temperature = 15 + 10 * Math.sin(this.weather.timeOfDay * Math.PI / 12);
        
        // Affect player temperature
        this.player.temperature = this.weather.temperature;
        
        // Random weather changes
        if (Math.random() < 0.001) {
            this.weather.isRaining = !this.weather.isRaining;
        }
        
        // Wind effects
        this.weather.windSpeed = 2 + Math.sin(Date.now() * 0.0001) * 3;
    }
    
    updateAnimalNeeds() {
        // Energy decreases over time
        this.player.energy = Math.max(0, this.player.energy - 0.1);
        
        // Hunger increases over time
        this.player.hunger = Math.min(this.player.maxHunger, this.player.hunger + 0.3);
        
        // Thirst increases over time
        this.player.thirst = Math.min(this.player.maxThirst, this.player.thirst + 0.2);
        
        // Check if hungry (green eyes)
        if (this.player.hunger > 70) {
            this.player.isHungry = true;
        } else {
            this.player.isHungry = false;
        }
        
        // Health decreases if needs aren't met
        if (this.player.energy < 20 || this.player.thirst > 80 || this.player.hunger > 90) {
            this.player.health = Math.max(0, this.player.health - 0.05);
        }
        
        // Age increases slowly
        this.player.age += 0.001;
        
        // Last ate/drank/slept timers
        this.player.lastAte++;
        this.player.lastDrank++;
        this.player.lastSlept++;
        
        // Auto-sleep when very tired
        if (this.player.energy < 10 && !this.player.isSleeping) {
            this.sleep();
        }
    }
    
    sleep() {
        if (!this.player.isSleeping) {
            this.player.isSleeping = true;
            this.player.sleepTime = 180; // 3 seconds
        }
    }
    
    updateSleep() {
        if (this.player.isSleeping) {
            this.player.sleepTime--;
            this.player.energy = Math.min(this.player.maxEnergy, this.player.energy + 2);
            
            // Regenerate health while sleeping
            this.player.health = Math.min(this.player.maxHealth, this.player.health + 0.5);
            
            if (this.player.sleepTime <= 0) {
                this.player.isSleeping = false;
            }
        }
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
    
    createGiantGrowthEffect() {
        // Create massive growth particles
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: this.player.x + (Math.random() - 0.5) * 100,
                y: this.player.y + (Math.random() - 0.5) * 100,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                life: 120,
                color: '#FF6B35',
                size: Math.random() * 12 + 6
            });
        }
        
        // Create expanding ring effect
        for (let i = 0; i < 20; i++) {
            this.particles.push({
                x: this.player.x,
                y: this.player.y,
                vx: Math.cos(i * Math.PI / 10) * 3,
                vy: Math.sin(i * Math.PI / 10) * 3,
                life: 60,
                color: '#FFD700',
                size: Math.random() * 10 + 5
            });
        }
    }
    
    createHealingEffect(x, y) {
        // Create green healing particles
        for (let i = 0; i < 15; i++) {
            this.particles.push({
                x: x + (Math.random() - 0.5) * 30,
                y: y + (Math.random() - 0.5) * 30,
                vx: (Math.random() - 0.5) * 3,
                vy: (Math.random() - 0.5) * 3,
                life: 90,
                color: '#00FF00',
                size: Math.random() * 4 + 2
            });
        }
        
        // Create upward floating healing symbols
        for (let i = 0; i < 8; i++) {
            this.particles.push({
                x: x + (Math.random() - 0.5) * 20,
                y: y + (Math.random() - 0.5) * 20,
                vx: (Math.random() - 0.5) * 1,
                vy: -2 - Math.random() * 2, // Float upward
                life: 120,
                color: '#32CD32',
                size: Math.random() * 3 + 2
            });
        }
    }
    
    createFruitGrowthEffect(x, y) {
        // Create golden growth particles
        for (let i = 0; i < 12; i++) {
            this.particles.push({
                x: x + (Math.random() - 0.5) * 25,
                y: y + (Math.random() - 0.5) * 25,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                life: 100,
                color: '#FFD700',
                size: Math.random() * 5 + 3
            });
        }
        
        // Create expanding growth rings
        for (let i = 0; i < 6; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(i * Math.PI / 3) * 2,
                vy: Math.sin(i * Math.PI / 3) * 2,
                life: 80,
                color: '#FFA500',
                size: Math.random() * 4 + 2
            });
        }
        
        // Create upward growth sparkles
        for (let i = 0; i < 10; i++) {
            this.particles.push({
                x: x + (Math.random() - 0.5) * 15,
                y: y + (Math.random() - 0.5) * 15,
                vx: (Math.random() - 0.5) * 2,
                vy: -3 - Math.random() * 3, // Float upward faster
                life: 150,
                color: '#FFD700',
                size: Math.random() * 3 + 1
            });
        }
    }
    
    createHealthBlockedEffect(x, y) {
        // Create red warning particles
        for (let i = 0; i < 8; i++) {
            this.particles.push({
                x: x + (Math.random() - 0.5) * 20,
                y: y + (Math.random() - 0.5) * 20,
                vx: (Math.random() - 0.5) * 3,
                vy: (Math.random() - 0.5) * 3,
                life: 60,
                color: '#FF0000',
                size: Math.random() * 3 + 2
            });
        }
        
        // Create downward falling blocked symbols
        for (let i = 0; i < 6; i++) {
            this.particles.push({
                x: x + (Math.random() - 0.5) * 15,
                y: y + (Math.random() - 0.5) * 15,
                vx: (Math.random() - 0.5) * 1,
                vy: 2 + Math.random() * 2, // Fall downward
                life: 80,
                color: '#FF4444',
                size: Math.random() * 2 + 1
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
    
    createTrail() {
        // Create a windy dirt trail through the forest
        this.trail = [
            { x: 50, y: 300, width: 100, height: 20 },   // Start of trail
            { x: 150, y: 280, width: 80, height: 20 },   // First curve
            { x: 230, y: 260, width: 100, height: 20 },  // Straight section
            { x: 330, y: 240, width: 80, height: 20 },   // Curve
            { x: 410, y: 220, width: 120, height: 20 },  // Long straight
            { x: 530, y: 200, width: 80, height: 20 },   // Final curve
            { x: 610, y: 180, width: 100, height: 20 },  // End of trail
            { x: 710, y: 160, width: 80, height: 20 }    // Trail continues
        ];
        
        // Define finish line position
        this.finishLine = {
            x: 750,
            y: 160,
            width: 50,
            height: 20
        };
        
        // Game completion tracking
        this.gameStartTime = Date.now();
        this.hasFinished = false;
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
    
    isOnTrail(x, y) {
        if (!this.trail) return false;
        
        for (let segment of this.trail) {
            if (x >= segment.x && x <= segment.x + segment.width &&
                y >= segment.y && y <= segment.y + segment.height) {
                return true;
            }
        }
        return false;
    }
    
    checkFinishLine() {
        if (this.hasFinished || !this.finishLine) return;
        
        const playerX = this.player.x;
        const playerY = this.player.y;
        const finish = this.finishLine;
        
        if (playerX >= finish.x && playerX <= finish.x + finish.width &&
            playerY >= finish.y && playerY <= finish.y + finish.height) {
            this.completeGame();
        }
    }
    
    completeGame() {
        this.hasFinished = true;
        const finishTime = Date.now();
        const timeElapsed = (finishTime - this.gameStartTime) / 1000; // Convert to seconds
        
        // Calculate coin reward based on time
        let coinReward = 0;
        let timeBonus = '';
        
        if (timeElapsed < 30) {
            coinReward = 100;
            timeBonus = '🏆 SPEED DEMON!';
        } else if (timeElapsed < 60) {
            coinReward = 75;
            timeBonus = '⚡ FAST RUNNER!';
        } else if (timeElapsed < 120) {
            coinReward = 50;
            timeBonus = '🏃 GOOD PACE!';
        } else if (timeElapsed < 300) {
            coinReward = 25;
            timeBonus = '🚶 STEADY PACE!';
        } else {
            coinReward = 10;
            timeBonus = '🐌 TOOK YOUR TIME!';
        }
        
        this.player.coins += coinReward;
        this.score += coinReward * 2;
        
        // Create celebration particles
        this.createFinishLineEffect();
        
        // Show completion message
        this.showCompletionMessage(timeElapsed, coinReward, timeBonus);
        
        this.updateUI();
    }
    
    createFinishLineEffect() {
        // Create celebration particles
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: this.finishLine.x + this.finishLine.width/2 + (Math.random() - 0.5) * 100,
                y: this.finishLine.y + this.finishLine.height/2 + (Math.random() - 0.5) * 100,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                life: 120,
                color: '#FFD700',
                size: Math.random() * 8 + 4
            });
        }
        
        // Create rainbow particles
        const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'];
        for (let i = 0; i < 30; i++) {
            this.particles.push({
                x: this.finishLine.x + this.finishLine.width/2 + (Math.random() - 0.5) * 80,
                y: this.finishLine.y + this.finishLine.height/2 + (Math.random() - 0.5) * 80,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                life: 90,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 6 + 3
            });
        }
    }
    
    showCompletionMessage(timeElapsed, coinReward, timeBonus) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'completion-message';
        messageDiv.innerHTML = `
            <div class="completion-panel">
                <h2>🎉 TRAIL COMPLETED!</h2>
                <p>${timeBonus}</p>
                <p>Time: ${timeElapsed.toFixed(1)} seconds</p>
                <p>Coins earned: ${coinReward} 🪙</p>
                <p>Total score: ${this.score}</p>
                <button onclick="this.parentElement.parentElement.remove()">Continue Playing</button>
            </div>
        `;
        document.body.appendChild(messageDiv);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentElement) {
                messageDiv.remove();
            }
        }, 5000);
    }
    
    updateHuntersAndWolves() {
        // Update wolf pack behavior
        for (let animal of this.otherAnimals) {
            if (animal.type === 'wolf') {
                this.updateWolfPackBehavior(animal);
            }
        }
        
        // Update hunter behavior
        for (let person of this.people) {
            if (person.behavior === 'dangerous') {
                this.updateHunterBehavior(person);
            }
        }
    }
    
    updateHunterBehavior(hunter) {
        // Keep hunters and wolves off the trail
        if (this.isOnTrail(hunter.x, hunter.y)) {
            // Move them away from trail
            const trailCenter = { x: 400, y: 250 };
            const dx = hunter.x - trailCenter.x;
            const dy = hunter.y - trailCenter.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > 0) {
                hunter.x += (dx / distance) * hunter.speed;
                hunter.y += (dy / distance) * hunter.speed;
            }
        }
        
        // Hunters shoot at player if they can see them
        if (hunter.type === 'hunter' && !this.isOnTrail(this.player.x, this.player.y)) {
            const distanceToPlayer = Math.sqrt(
                Math.pow(hunter.x - this.player.x, 2) + 
                Math.pow(hunter.y - this.player.y, 2)
            );
            
            if (distanceToPlayer < 200 && hunter.lastShot > 120) { // Shoot every 2 seconds
                this.hunterShoot(hunter);
                hunter.lastShot = 0;
            }
        }
        
        hunter.lastShot++;
        hunter.lastMove++;
    }
    
    updateWolfPackBehavior(wolf) {
        // Keep wolves off the trail
        if (this.isOnTrail(wolf.x, wolf.y)) {
            const trailCenter = { x: 400, y: 250 };
            const dx = wolf.x - trailCenter.x;
            const dy = wolf.y - trailCenter.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > 0) {
                wolf.x += (dx / distance) * wolf.speed;
                wolf.y += (dy / distance) * wolf.speed;
            }
        }
        
        // Pack behavior
        if (wolf.packId) {
            // Find other wolves in the same pack
            const packMembers = this.otherAnimals.filter(animal => 
                animal.packId === wolf.packId && animal.type === 'wolf'
            );
            
            if (packMembers.length > 1) {
                // Calculate pack center
                const packCenterX = packMembers.reduce((sum, member) => sum + member.x, 0) / packMembers.length;
                const packCenterY = packMembers.reduce((sum, member) => sum + member.y, 0) / packMembers.length;
                
                // Update pack target
                wolf.targetX = packCenterX;
                wolf.targetY = packCenterY;
                
                // Move towards pack center with some randomness
                const dx = wolf.targetX - wolf.x;
                const dy = wolf.targetY - wolf.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance > 40) { // Stay within pack formation
                    wolf.x += (dx / distance) * wolf.speed * 0.5;
                    wolf.y += (dy / distance) * wolf.speed * 0.5;
                } else {
                    // Add some random movement within the pack
                    wolf.x += (Math.random() - 0.5) * wolf.speed * 0.3;
                    wolf.y += (Math.random() - 0.5) * wolf.speed * 0.3;
                }
                
                // Pack hunting behavior - if any wolf sees player, all wolves move towards player
                const playerDistance = Math.sqrt(
                    Math.pow(wolf.x - this.player.x, 2) + 
                    Math.pow(wolf.y - this.player.y, 2)
                );
                
                if (playerDistance < 150 && !this.isOnTrail(this.player.x, this.player.y)) {
                    // Pack hunting mode - all wolves move towards player
                    const dxToPlayer = this.player.x - wolf.x;
                    const dyToPlayer = this.player.y - wolf.y;
                    const distanceToPlayer = Math.sqrt(dxToPlayer * dxToPlayer + dyToPlayer * dyToPlayer);
                    
                    if (distanceToPlayer > 0) {
                        wolf.x += (dxToPlayer / distanceToPlayer) * wolf.speed * 0.8;
                        wolf.y += (dyToPlayer / distanceToPlayer) * wolf.speed * 0.8;
                    }
                    
                    // Create pack hunting particles
                    if (Math.random() < 0.1) {
                        this.createParticles(wolf.x, wolf.y, '#8B0000');
                    }
                }
            }
        }
        
        wolf.lastMove++;
    }
    
    hunterShoot(hunter) {
        // Calculate direction to player
        const dx = this.player.x - hunter.x;
        const dy = this.player.y - hunter.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0) {
            const projectile = {
                x: hunter.x,
                y: hunter.y,
                vx: (dx / distance) * 4,
                vy: (dy / distance) * 4,
                size: 6,
                color: '#FF0000',
                life: 120,
                damage: 15
            };
            
            this.projectiles.push(projectile);
            
            // Create shooting effect
            this.createParticles(hunter.x, hunter.y, '#FF0000');
        }
    }
    
    updateProjectiles() {
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const projectile = this.projectiles[i];
            
            // Move projectile
            projectile.x += projectile.vx;
            projectile.y += projectile.vy;
            projectile.life--;
            
            // Check collision with player
            const distance = Math.sqrt(
                Math.pow(projectile.x - this.player.x, 2) + 
                Math.pow(projectile.y - this.player.y, 2)
            );
            
            if (distance < this.player.size + projectile.size) {
                // Hit player - shrink them
                this.shrinkPlayer(2);
                this.score -= 5;
                
                // Create hit effect
                this.createParticles(this.player.x, this.player.y, '#FF0000');
                
                // Remove projectile
                this.projectiles.splice(i, 1);
                continue;
            }
            
            // Remove projectile if it's off screen or life expired
            if (projectile.life <= 0 || 
                projectile.x < 0 || projectile.x > this.width ||
                projectile.y < 0 || projectile.y > this.height) {
                this.projectiles.splice(i, 1);
            }
        }
    }
    
    drawProjectiles() {
        for (let projectile of this.projectiles) {
            // Draw projectile with glow effect
            this.ctx.shadowColor = projectile.color;
            this.ctx.shadowBlur = 8;
            this.ctx.fillStyle = projectile.color;
            this.ctx.beginPath();
            this.ctx.arc(projectile.x, projectile.y, projectile.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
            
            // Draw trail
            this.ctx.strokeStyle = projectile.color;
            this.ctx.lineWidth = 2;
            this.ctx.globalAlpha = 0.6;
            this.ctx.beginPath();
            this.ctx.moveTo(projectile.x, projectile.y);
            this.ctx.lineTo(projectile.x - projectile.vx * 3, projectile.y - projectile.vy * 3);
            this.ctx.stroke();
            this.ctx.globalAlpha = 1;
        }
    }
    
    shrinkPlayer(amount) {
        // Shrink the player
        this.player.size = Math.max(10, this.player.size - amount);
        
        // Damage health
        this.player.health = Math.max(0, this.player.health - (amount * 5));
        
        // Check for game over
        if (this.player.health <= 0) {
            this.gameOver = true;
            this.showGameOver();
            return;
        }
        
        // Update level based on size
        this.size = Math.floor(this.player.size / 20);
        
        // Check if player needs to devolve to smaller animal
        this.checkDevolution();
        
        // Create shrinking effect particles
        for (let i = 0; i < 15; i++) {
            this.particles.push({
                x: this.player.x + (Math.random() - 0.5) * 30,
                y: this.player.y + (Math.random() - 0.5) * 30,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                life: 60,
                color: '#FF6B35',
                size: Math.random() * 4 + 2
            });
        }
        
        this.updateUI();
    }
    
    checkDevolution() {
        // Find current animal stage based on size
        const currentStage = this.animalStages.find(stage => {
            return this.player.size <= stage.size + 5;
        });
        
        if (currentStage && currentStage.type !== this.player.animalType) {
            // Devolve to smaller animal
            this.player.animalType = currentStage.type;
            this.player.color = currentStage.color;
            this.player.maxStomach = currentStage.maxStomach;
            this.player.canSwim = currentStage.canSwim;
            this.player.swimTime = currentStage.swimTime;
            this.player.isWaterAnimal = currentStage.isWaterAnimal;
            this.player.energy = currentStage.energy;
            this.player.maxEnergy = currentStage.maxEnergy;
            this.player.isNocturnal = currentStage.isNocturnal;
            this.player.preferredFood = currentStage.preferredFood;
            
            // Create devolution effect
            this.createDevolutionEffect();
        }
    }
    
    createDevolutionEffect() {
        // Create shrinking devolution particles
        for (let i = 0; i < 25; i++) {
            this.particles.push({
                x: this.player.x + (Math.random() - 0.5) * 40,
                y: this.player.y + (Math.random() - 0.5) * 40,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6,
                life: 90,
                color: '#FF6B35',
                size: Math.random() * 6 + 3
            });
        }
        
        // Add some red warning particles
        for (let i = 0; i < 10; i++) {
            this.particles.push({
                x: this.player.x + (Math.random() - 0.5) * 30,
                y: this.player.y + (Math.random() - 0.5) * 30,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                life: 60,
                color: '#FF0000',
                size: Math.random() * 4 + 2
            });
        }
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
    
    startFlying() {
        // Create flying particles
        for (let i = 0; i < 20; i++) {
            this.particles.push({
                x: this.player.x + (Math.random() - 0.5) * 30,
                y: this.player.y + (Math.random() - 0.5) * 30,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                life: 60,
                color: '#FFD700',
                size: Math.random() * 5 + 3
            });
        }
        
        // Start flying
        this.player.isFlying = true;
        this.player.flyTimer = 300; // 5 seconds at 60fps
        
        // Consume energy
        this.player.energy = Math.max(0, this.player.energy - 20);
        
        // Add some points for flying
        this.score += 10;
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
    
    spawnCoins() {
        const coin = {
            x: Math.random() * (this.width - 40) + 20,
            y: Math.random() * (this.height - 40) + 20,
            emoji: '🪙',
            size: 12,
            color: '#FFD700',
            value: 1
        };
        this.coins.push(coin);
    }
    
    spawnOtherAnimals() {
        const animalType = this.otherAnimalTypes[Math.floor(Math.random() * this.otherAnimalTypes.length)];
        const animal = {
            x: Math.random() * (this.width - 40) + 20,
            y: Math.random() * (this.height - 40) + 20,
            type: animalType.type,
            emoji: animalType.emoji,
            size: animalType.size,
            speed: animalType.speed,
            isFriendly: animalType.isFriendly,
            behavior: animalType.behavior,
            color: animalType.color,
            direction: Math.random() * Math.PI * 2,
            lastMove: 0
        };
        this.otherAnimals.push(animal);
    }
    
    spawnPeople() {
        const personType = this.peopleTypes[Math.floor(Math.random() * this.peopleTypes.length)];
        const person = {
            x: Math.random() * (this.width - 40) + 20,
            y: Math.random() * (this.height - 40) + 20,
            type: personType.type,
            emoji: personType.emoji,
            size: personType.size,
            behavior: personType.behavior,
            isFriendly: personType.isFriendly,
            color: personType.color,
            direction: Math.random() * Math.PI * 2,
            lastMove: 0
        };
        this.people.push(person);
    }
    
    spawnTrailTraders() {
        // Spawn traders along the trail
        const trailPositions = [
            { x: 100, y: 300 },  // Start of trail
            { x: 280, y: 260 },  // Middle section
            { x: 460, y: 220 },  // Long straight section
            { x: 640, y: 180 }   // End of trail
        ];
        
        trailPositions.forEach((pos, index) => {
            // Spawn a merchant animal
            const merchant = {
                x: pos.x + (Math.random() - 0.5) * 40,
                y: pos.y + (Math.random() - 0.5) * 40,
                type: 'merchant',
                emoji: '🦝',
                size: 22,
                speed: 3,
                isFriendly: true,
                behavior: 'trader',
                color: '#8B7355',
                direction: Math.random() * Math.PI * 2,
                lastMove: 0
            };
            this.otherAnimals.push(merchant);
            
            // Spawn a trader person
            const trader = {
                x: pos.x + (Math.random() - 0.5) * 40,
                y: pos.y + (Math.random() - 0.5) * 40,
                type: 'trader',
                emoji: '🛒',
                size: 30,
                behavior: 'trader',
                isFriendly: true,
                color: '#FFD700',
                direction: Math.random() * Math.PI * 2,
                lastMove: 0
            };
            this.people.push(trader);
        });
    }
    
    spawnOffTrailDangers() {
        // Spawn dangerous animals and hunters off the trail
        const offTrailAreas = [
            { x: 50, y: 150, width: 200, height: 100 },   // Top-left area
            { x: 400, y: 50, width: 200, height: 150 },   // Top area
            { x: 600, y: 300, width: 150, height: 200 },  // Bottom-right area
            { x: 200, y: 400, width: 250, height: 150 }   // Bottom area
        ];
        
        offTrailAreas.forEach((area, packIndex) => {
            // Spawn wolf packs of 4-6 wolves in each off-trail area
            const packSize = Math.floor(Math.random() * 3) + 4; // 4-6 wolves per pack
            const packId = `pack_${packIndex}`;
            const packCenterX = area.x + area.width / 2;
            const packCenterY = area.y + area.height / 2;
            
            for (let i = 0; i < packSize; i++) {
                const wolf = {
                    x: packCenterX + (Math.random() - 0.5) * 80, // Spread wolves around pack center
                    y: packCenterY + (Math.random() - 0.5) * 80,
                    type: 'wolf',
                    emoji: '🐺',
                    size: 25,
                    speed: 8,
                    isFriendly: false,
                    behavior: 'hunter',
                    color: '#696969',
                    direction: Math.random() * Math.PI * 2,
                    lastMove: 0,
                    lastShot: 0,
                    packId: packId,
                    packIndex: i,
                    packSize: packSize,
                    targetX: packCenterX,
                    targetY: packCenterY,
                    isPackLeader: i === 0 // First wolf is pack leader
                };
                this.otherAnimals.push(wolf);
            }
            
            // Spawn 1-2 hunters in each off-trail area
            for (let i = 0; i < 1 + Math.floor(Math.random() * 2); i++) {
                const hunter = {
                    x: area.x + Math.random() * area.width,
                    y: area.y + Math.random() * area.height,
                    type: 'hunter',
                    emoji: '🏹',
                    size: 30,
                    behavior: 'dangerous',
                    isFriendly: false,
                    color: '#8B0000',
                    direction: Math.random() * Math.PI * 2,
                    lastMove: 0,
                    lastShot: 0
                };
                this.people.push(hunter);
            }
        });
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
        // Sky view - top-down perspective
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        
        // Day/night sky gradient
        let skyColor1, skyColor2;
        if (this.weather.timeOfDay > 6 && this.weather.timeOfDay < 18) {
            // Day
            skyColor1 = '#87CEEB';
            skyColor2 = '#98FB98';
        } else if (this.weather.timeOfDay > 18 || this.weather.timeOfDay < 6) {
            // Night
            skyColor1 = '#191970';
            skyColor2 = '#2F4F4F';
        } else {
            // Dawn/Dusk
            skyColor1 = '#FFB6C1';
            skyColor2 = '#FFA07A';
        }
        
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, skyColor1);
        gradient.addColorStop(1, skyColor2);
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Draw stars at night
        if (this.weather.timeOfDay > 20 || this.weather.timeOfDay < 6) {
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            for (let i = 0; i < 50; i++) {
                const x = (i * 37) % this.width;
                const y = (i * 23) % (this.height / 2);
                this.ctx.beginPath();
                this.ctx.arc(x, y, 1, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
        
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
        
        // Draw rain
        if (this.weather.isRaining) {
            this.ctx.strokeStyle = 'rgba(135, 206, 235, 0.6)';
            this.ctx.lineWidth = 1;
            for (let i = 0; i < 100; i++) {
                const x = (i * 13) % this.width;
                const y = (i * 7 + Date.now() * 0.1) % this.height;
                this.ctx.beginPath();
                this.ctx.moveTo(x, y);
                this.ctx.lineTo(x, y + 10);
                this.ctx.stroke();
            }
        }
        
        // Draw the dirt trail
        if (this.trail) {
            this.ctx.fillStyle = '#8B4513';
            for (let segment of this.trail) {
                this.ctx.fillRect(segment.x, segment.y, segment.width, segment.height);
                
                // Add some texture to the trail
                this.ctx.fillStyle = '#A0522D';
                for (let i = 0; i < 3; i++) {
                    const x = segment.x + Math.random() * segment.width;
                    const y = segment.y + Math.random() * segment.height;
                    this.ctx.fillRect(x, y, 2, 2);
                }
                this.ctx.fillStyle = '#8B4513';
            }
        }
        
        // Draw finish line
        if (this.finishLine && !this.hasFinished) {
            // Draw finish line with checkered pattern
            const finish = this.finishLine;
            const checkSize = 5;
            
            for (let x = 0; x < finish.width; x += checkSize * 2) {
                for (let y = 0; y < finish.height; y += checkSize * 2) {
                    // Black squares
                    this.ctx.fillStyle = '#000000';
                    this.ctx.fillRect(finish.x + x, finish.y + y, checkSize, checkSize);
                    
                    // White squares
                    this.ctx.fillStyle = '#FFFFFF';
                    this.ctx.fillRect(finish.x + x + checkSize, finish.y + y, checkSize, checkSize);
                    this.ctx.fillRect(finish.x + x, finish.y + y + checkSize, checkSize, checkSize);
                    this.ctx.fillRect(finish.x + x + checkSize, finish.y + y + checkSize, checkSize, checkSize);
                }
            }
            
            // Add finish line text
            this.ctx.fillStyle = '#FF0000';
            this.ctx.font = 'bold 16px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('FINISH', finish.x + finish.width/2, finish.y - 10);
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
    
    drawTreeFromPerspective(x, y, distance) {
        const size = Math.max(10, 50 - distance * 0.2);
        const alpha = Math.max(0.3, 1 - distance * 0.003);
        
        // Tree trunk
        this.ctx.fillStyle = `rgba(139, 69, 19, ${alpha})`;
        this.ctx.fillRect(x - size/4, y, size/2, size);
        
        // Tree leaves
        this.ctx.fillStyle = `rgba(34, 139, 34, ${alpha})`;
        this.ctx.beginPath();
        this.ctx.arc(x, y - size/2, size, 0, Math.PI * 2);
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
        
        // Draw green eyes when hungry
        if (this.player.isHungry) {
            const eyeSize = this.player.size * 0.15;
            const eyeOffset = this.player.size * 0.3;
            
            // Left eye
            this.ctx.fillStyle = '#00FF00';
            this.ctx.beginPath();
            this.ctx.arc(this.player.x - eyeOffset, this.player.y - eyeOffset, eyeSize, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Right eye
            this.ctx.beginPath();
            this.ctx.arc(this.player.x + eyeOffset, this.player.y - eyeOffset, eyeSize, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Add glow effect
            this.ctx.shadowColor = '#00FF00';
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
        
        // Draw off-trail warning effect
        if (!this.isOnTrail(this.player.x, this.player.y)) {
            this.ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
            this.ctx.beginPath();
            this.ctx.arc(this.player.x, this.player.y, this.player.size + 15, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Add warning text
            this.ctx.fillStyle = '#FF0000';
            this.ctx.font = '14px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('DANGER ZONE', this.player.x, this.player.y - this.player.size - 10);
        }
        
        // Draw status indicators
        const indicatorY = this.player.y + this.player.size + 5;
        const indicatorHeight = 3;
        const indicatorWidth = this.player.size * 2;
        
        // Stomach indicator
        if (this.player.stomach > 0) {
            const stomachWidth = (this.player.stomach / this.player.maxStomach) * indicatorWidth;
            
            // Background
            this.ctx.fillStyle = '#333';
            this.ctx.fillRect(this.player.x - this.player.size, indicatorY, indicatorWidth, indicatorHeight);
            
            // Fill
            this.ctx.fillStyle = this.player.needsToPoop ? '#FF4444' : '#4CAF50';
            this.ctx.fillRect(this.player.x - this.player.size, indicatorY, stomachWidth, indicatorHeight);
        }
        
        // Energy indicator
        const energyWidth = (this.player.energy / this.player.maxEnergy) * indicatorWidth;
        this.ctx.fillStyle = '#333';
        this.ctx.fillRect(this.player.x - this.player.size, indicatorY + 5, indicatorWidth, indicatorHeight);
        this.ctx.fillStyle = this.player.energy < 30 ? '#FF4444' : '#FFD700';
        this.ctx.fillRect(this.player.x - this.player.size, indicatorY + 5, energyWidth, indicatorHeight);
        
        // Thirst indicator
        const thirstWidth = (this.player.thirst / this.player.maxThirst) * indicatorWidth;
        this.ctx.fillStyle = '#333';
        this.ctx.fillRect(this.player.x - this.player.size, indicatorY + 10, indicatorWidth, indicatorHeight);
        this.ctx.fillStyle = this.player.thirst > 70 ? '#FF4444' : '#87CEEB';
        this.ctx.fillRect(this.player.x - this.player.size, indicatorY + 10, thirstWidth, indicatorHeight);
        
        // Health indicator
        const healthWidth = (this.player.health / this.player.maxHealth) * indicatorWidth;
        this.ctx.fillStyle = '#333';
        this.ctx.fillRect(this.player.x - this.player.size, indicatorY + 15, indicatorWidth, indicatorHeight);
        this.ctx.fillStyle = this.player.health < 50 ? '#FF4444' : '#4CAF50';
        this.ctx.fillRect(this.player.x - this.player.size, indicatorY + 15, healthWidth, indicatorHeight);
        
        // Sleeping effect
        if (this.player.isSleeping) {
            this.ctx.fillStyle = 'rgba(0, 0, 255, 0.3)';
            this.ctx.beginPath();
            this.ctx.arc(this.player.x, this.player.y, this.player.size + 15, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Z's for sleeping
            this.ctx.fillStyle = '#0000FF';
            this.ctx.font = '20px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('Z', this.player.x + 20, this.player.y - 20);
            this.ctx.fillText('Z', this.player.x + 25, this.player.y - 35);
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
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        
        for (let obstacle of this.obstacles) {
            const obstacleDistance = Math.sqrt(Math.pow(obstacle.x - this.player.x, 2) + Math.pow(obstacle.y - this.player.y, 2));
            
            if (obstacleDistance < 400) { // Only show obstacles within view distance
                const obstacleSize = Math.max(10, 30 - obstacleDistance * 0.05);
                const obstacleX = centerX + (obstacle.x - this.player.x) * 0.8;
                const obstacleY = centerY + (obstacle.y - this.player.y) * 0.8;
                const alpha = Math.max(0.5, 1 - obstacleDistance * 0.002);
                
                // Obstacle body
                this.ctx.fillStyle = `rgba(101, 67, 33, ${alpha})`;
                this.ctx.beginPath();
                this.ctx.arc(obstacleX, obstacleY, obstacleSize, 0, Math.PI * 2);
                this.ctx.fill();
                
                // Draw rock texture
                this.ctx.fillStyle = `rgba(139, 115, 85, ${alpha})`;
                this.ctx.beginPath();
                this.ctx.arc(obstacleX - obstacleSize/3, obstacleY - obstacleSize/3, obstacleSize/3, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
    }
    
    drawCoins() {
        for (let coin of this.coins) {
            // Coin glow effect
            this.ctx.shadowColor = '#FFD700';
            this.ctx.shadowBlur = 8;
            this.ctx.fillStyle = coin.color;
            this.ctx.beginPath();
            this.ctx.arc(coin.x, coin.y, coin.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
            
            // Coin emoji
            this.ctx.font = `${coin.size}px Arial`;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(coin.emoji, coin.x, coin.y);
        }
    }
    
    drawOtherAnimals() {
        for (let animal of this.otherAnimals) {
            // Animal shadow
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.beginPath();
            this.ctx.arc(animal.x + 1, animal.y + 1, animal.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Animal body
            this.ctx.fillStyle = animal.color;
            this.ctx.beginPath();
            this.ctx.arc(animal.x, animal.y, animal.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Animal emoji
            this.ctx.font = `${animal.size}px Arial`;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(animal.emoji, animal.x, animal.y);
            
            // Friendly/hostile indicator
            const indicatorColor = animal.isFriendly ? '#4CAF50' : '#FF4444';
            this.ctx.fillStyle = indicatorColor;
            this.ctx.beginPath();
            this.ctx.arc(animal.x, animal.y - animal.size - 5, 3, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }
    
    drawPeople() {
        for (let person of this.people) {
            // Person shadow
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.beginPath();
            this.ctx.arc(person.x + 1, person.y + 1, person.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Person body
            this.ctx.fillStyle = person.color;
            this.ctx.beginPath();
            this.ctx.arc(person.x, person.y, person.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Person emoji
            this.ctx.font = `${person.size}px Arial`;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(person.emoji, person.x, person.y);
            
            // Friendly/dangerous indicator
            const indicatorColor = person.isFriendly ? '#4CAF50' : '#FF0000';
            this.ctx.fillStyle = indicatorColor;
            this.ctx.beginPath();
            this.ctx.arc(person.x, person.y - person.size - 5, 4, 0, Math.PI * 2);
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
        document.getElementById('coins').textContent = this.player.coins;
        
        // Update status bar
        document.getElementById('levelDisplay').textContent = this.level;
        document.getElementById('coinsDisplay').textContent = this.player.coins;
        document.getElementById('powerupsDisplay').textContent = this.player.powerups;
        document.getElementById('sizeDisplay').textContent = this.size;
        
        // Update health display with color coding
        const healthDisplay = document.getElementById('healthDisplay');
        const healthValue = Math.floor(this.player.health);
        healthDisplay.textContent = healthValue;
        
        // Remove existing color classes
        healthDisplay.classList.remove('healthy', 'warning', 'danger');
        
        // Add appropriate color class based on health
        if (healthValue > 70) {
            healthDisplay.classList.add('healthy');
        } else if (healthValue > 30) {
            healthDisplay.classList.add('warning');
        } else {
            healthDisplay.classList.add('danger');
        }
        
        // Update health bar
        const healthBarFill = document.getElementById('healthBarFill');
        const healthPercentage = (this.player.health / this.player.maxHealth) * 100;
        healthBarFill.style.width = healthPercentage + '%';
        
        // Update health bar color
        healthBarFill.classList.remove('warning', 'danger');
        if (healthValue <= 30) {
            healthBarFill.classList.add('danger');
        } else if (healthValue <= 70) {
            healthBarFill.classList.add('warning');
        }
    }
    
    showGameOver() {
        const gameOverScreen = document.getElementById('gameOver');
        const finalScoreElement = document.getElementById('finalScore');
        
        if (this.player.health <= 0) {
            // Health-based game over - you get nothing
            finalScoreElement.innerHTML = `
                <h2>💀 GAME OVER - YOU DIED!</h2>
                <p>Your health reached 0% and you died!</p>
                <p><strong>You get nothing!</strong></p>
                <p>Final Score: ${this.score}</p>
                <p>Press R to restart</p>
            `;
        } else {
            // Normal game over
            finalScoreElement.innerHTML = `
                <h2>🎮 GAME OVER</h2>
                <p>Final Score: ${this.score}</p>
                <p>Level: ${this.level}</p>
                <p>Size: ${this.size}</p>
                <p>Coins: ${this.player.coins}</p>
                <p>Press R to restart</p>
            `;
        }
        
        gameOverScreen.style.display = 'block';
    }
    
    restart() {
        this.score = 0;
        this.level = 1;
        this.size = 1;
        this.gameOver = false;
        this.gameStarted = false;
        this.isTrading = false;
        this.currentTrader = null;
        this.hasFinished = false;
        
        this.player = {
            x: 100,  // Start on the trail
            y: 300,  // Start on the trail
            size: 20,
            speed: 4,
            animalType: 'mouse',
            color: '#8B4513',
            stomach: 0,
            maxStomach: 2,
            needsToPoop: false,
            poopTimer: 0,
            canSwim: false,
            swimTime: 0,
            isWaterAnimal: false,
            isSwimming: false,
            swimTimer: 0,
            isFlying: false,
            flyTimer: 0,
            canFly: false,
            energy: 100,
            maxEnergy: 100,
            sleepTime: 0,
            isNocturnal: true,
            isSleeping: false,
            isHungry: false,
            thirst: 0,
            maxThirst: 100,
            temperature: 20,
            preferredTemperature: 20,
            lastAte: 0,
            lastDrank: 0,
            lastSlept: 0,
            age: 0,
            health: 100,
            maxHealth: 100,
            powerups: 0
        };
        
        this.foods = [];
        this.powerups = [];
        this.obstacles = [];
        this.particles = [];
        this.waterAreas = [];
        this.coins = [];
        this.otherAnimals = [];
        this.people = [];
        
        this.updateUI();
        
        // Show start screen and instructions again
        document.getElementById('startScreen').style.display = 'block';
        document.querySelector('.instructions').style.display = 'block';
        document.getElementById('gameOver').style.display = 'none';
        
        // Close any open trading UI
        const tradingUI = document.getElementById('tradingUI');
        if (tradingUI) {
            tradingUI.remove();
        }
    }
    
    gameLoop() {
        if (!this.gameOver) {
            // Only update game logic if game has started
            if (this.gameStarted) {
                this.updatePlayer();
                this.updateSleep();
                this.updateHuntersAndWolves();
                this.updateProjectiles();
                this.checkCollisions();
                this.updateParticles();
                
                // Spawn new food occasionally
                if (Math.random() < 0.01) {
                    this.spawnFood();
                }
                
                // Spawn coins occasionally
                if (Math.random() < 0.005) {
                    this.spawnCoins();
                }
                
                // Spawn other animals occasionally
                if (Math.random() < 0.003) {
                    this.spawnOtherAnimals();
                }
                
                // Spawn people occasionally
                if (Math.random() < 0.002) {
                    this.spawnPeople();
                }
                
                // Game over if health reaches 0
                if (this.player.health <= 0) {
                    this.gameOver = true;
                    this.showGameOver();
                }
                
                // Check if player reached finish line
                this.checkFinishLine();
            }
        }
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Draw everything
        this.drawBackground();
        if (this.gameStarted) {
            this.drawObstacles();
            this.drawFood();
            this.drawPowerups();
            this.drawCoins();
            this.drawOtherAnimals();
            this.drawPeople();
            this.drawProjectiles();
            this.drawPlayer();
            this.drawParticles();
        }
        
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Start the game when page loads
window.addEventListener('load', () => {
    window.game = new AnimalForestRun();
}); 
class AnimalForestRun3D {
    constructor() {
        this.container = document.getElementById('gameContainer');
        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;
        
        // Game state
        this.score = 0;
        this.level = 1;
        this.size = 1;
        this.gameOver = false;
        this.paused = false;
        this.gameStarted = false;
        this.gameLoopRunning = false;
        
        // Player (animal)
        this.player = {
            x: 0,
            y: 0,
            z: 0,
            rotation: 0,
            size: 1,
            speed: 0.1,
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
            powerups: 0,
            // Weapon system
            currentSword: null,
            currentBow: null,
            arrows: 0,
            arrowDamage: 0,
            // Health regeneration
            healthRegenTimer: 0
        };
        
        // Animal evolution stages with realistic behaviors
        this.animalStages = [
            { type: 'mouse', size: 1, color: '#8B4513', emoji: '🐭', speed: 0.1, maxStomach: 2, canSwim: false, swimTime: 0, isWaterAnimal: false, energy: 100, maxEnergy: 100, sleepTime: 0, isNocturnal: true, preferredFood: ['berry', 'strawberry', 'acorn'] },
            { type: 'rabbit', size: 1.2, color: '#DEB887', emoji: '🐰', speed: 0.15, maxStomach: 4, canSwim: false, swimTime: 0, isWaterAnimal: false, energy: 120, maxEnergy: 120, sleepTime: 0, isNocturnal: false, preferredFood: ['carrot', 'apple', 'banana'] },
            { type: 'fox', size: 1.5, color: '#FF8C00', emoji: '🦊', speed: 0.18, maxStomach: 6, canSwim: false, swimTime: 0, isWaterAnimal: false, energy: 150, maxEnergy: 150, sleepTime: 0, isNocturnal: true, preferredFood: ['mushroom', 'honey', 'orange'] },
            { type: 'deer', size: 2, color: '#8B7355', emoji: '🦌', speed: 0.12, maxStomach: 8, canSwim: true, swimTime: 60, isWaterAnimal: false, energy: 200, maxEnergy: 200, sleepTime: 0, isNocturnal: false, preferredFood: ['apple', 'orange', 'acorn'] },
            { type: 'bear', size: 3, color: '#8B4513', emoji: '🐻', speed: 0.08, maxStomach: 15, canSwim: true, swimTime: 180, isWaterAnimal: false, energy: 300, maxEnergy: 300, sleepTime: 0, isNocturnal: false, preferredFood: ['honey', 'mushroom', 'banana'] },
            { type: 'elephant', size: 4, color: '#696969', emoji: '🐘', speed: 0.05, maxStomach: 20, canSwim: true, swimTime: 300, isWaterAnimal: false, energy: 500, maxEnergy: 500, sleepTime: 0, isNocturnal: false, preferredFood: ['apple', 'orange', 'carrot'] },
            { type: 'duck', size: 1.2, color: '#FFD700', emoji: '🦆', speed: 0.12, maxStomach: 5, canSwim: true, swimTime: 600, isWaterAnimal: true, energy: 100, maxEnergy: 100, sleepTime: 0, isNocturnal: false, preferredFood: ['berry', 'strawberry', 'acorn'] },
            { type: 'otter', size: 1.5, color: '#8B4513', emoji: '🦦', speed: 0.15, maxStomach: 7, canSwim: true, swimTime: 900, isWaterAnimal: true, energy: 150, maxEnergy: 150, sleepTime: 0, isNocturnal: false, preferredFood: ['mushroom', 'honey', 'banana'] },
            { type: 'beaver', size: 2, color: '#8B7355', emoji: '🦫', speed: 0.1, maxStomach: 9, canSwim: true, swimTime: 1200, isWaterAnimal: true, energy: 200, maxEnergy: 200, sleepTime: 0, isNocturnal: false, preferredFood: ['acorn', 'apple', 'orange'] }
        ];
        
        // Food types with realistic nutrition
        this.foodTypes = [
            { type: 'berry', emoji: '🫐', points: 10, color: '#8A2BE2', size: 0.3, nutrition: 15, energy: 20, water: 5, temperature: 0, healthBonus: 8 },
            { type: 'apple', emoji: '🍎', points: 15, color: '#FF0000', size: 0.4, nutrition: 25, energy: 30, water: 15, temperature: 0, healthBonus: 15 },
            { type: 'orange', emoji: '🍊', points: 18, color: '#FFA500', size: 0.45, nutrition: 22, energy: 25, water: 20, temperature: 0, healthBonus: 12 },
            { type: 'banana', emoji: '🍌', points: 12, color: '#FFD700', size: 0.35, nutrition: 18, energy: 22, water: 8, temperature: 0, healthBonus: 10 },
            { type: 'strawberry', emoji: '🍓', points: 8, color: '#FF69B4', size: 0.25, nutrition: 12, energy: 15, water: 12, temperature: 0, healthBonus: 6 },
            { type: 'carrot', emoji: '🥕', points: 20, color: '#FFA500', size: 0.5, nutrition: 30, energy: 25, water: 10, temperature: 0, healthBonus: 5 },
            { type: 'mushroom', emoji: '🍄', points: 25, color: '#FF69B4', size: 0.6, nutrition: 20, energy: 15, water: 8, temperature: 0, healthBonus: 3 },
            { type: 'acorn', emoji: '🌰', points: 30, color: '#8B4513', size: 0.7, nutrition: 40, energy: 35, water: 5, temperature: 0, healthBonus: 2 },
            { type: 'honey', emoji: '🍯', points: 40, color: '#FFD700', size: 0.8, nutrition: 50, energy: 60, water: 2, temperature: 0, healthBonus: 4 }
        ];
        
        // Powerup types
        this.powerupTypes = [
            { type: 'fart', emoji: '💨', points: 50, color: '#8B4513', size: 0.6, effect: 'fly' },
            { type: 'bubble', emoji: '🫧', points: 30, color: '#87CEEB', size: 0.5, effect: 'swim' }
        ];
        
        // Other animal types
        this.otherAnimalTypes = [
            { type: 'squirrel', emoji: '🐿️', size: 0.8, speed: 0.12, isFriendly: true, behavior: 'collector', color: '#8B4513' },
            { type: 'bird', emoji: '🐦', size: 0.6, speed: 0.15, isFriendly: true, behavior: 'flyer', color: '#87CEEB' },
            { type: 'rabbit', emoji: '🐰', size: 1, speed: 0.18, isFriendly: true, behavior: 'hopper', color: '#DEB887' },
            { type: 'wolf', emoji: '🐺', size: 1.2, speed: 0.2, isFriendly: false, behavior: 'hunter', color: '#696969' },
            { type: 'snake', emoji: '🐍', size: 1.1, speed: 0.1, isFriendly: false, behavior: 'ambusher', color: '#228B22' },
            { type: 'owl', emoji: '🦉', size: 1, speed: 0.12, isFriendly: true, behavior: 'nocturnal', color: '#8B7355' },
            { type: 'merchant', emoji: '🦝', size: 1.1, speed: 0.08, isFriendly: true, behavior: 'trader', color: '#8B7355' }
        ];
        
        // People types
        this.peopleTypes = [
            { type: 'hiker', emoji: '🧑‍🦯', size: 1.2, behavior: 'wanderer', isFriendly: true, color: '#4169E1' },
            { type: 'farmer', emoji: '👨‍🌾', size: 1.4, behavior: 'worker', isFriendly: true, color: '#8B4513' },
            { type: 'hunter', emoji: '🏹', size: 1.5, behavior: 'dangerous', isFriendly: false, color: '#8B0000' },
            { type: 'trader', emoji: '🛒', size: 1.5, behavior: 'trader', isFriendly: true, color: '#FFD700' }
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
            ],
            weapons: [
                { name: 'Oak Sword', cost: 20, type: 'sword', damage: 10, emoji: '🗡️' },
                { name: 'Stone Sword', cost: 70, type: 'sword', damage: 20, emoji: '⚔️' },
                { name: 'Steel Sword', cost: 200, type: 'sword', damage: 50, emoji: '🔪' },
                { name: 'Diamond Sword', cost: 400, type: 'sword', damage: 100, emoji: '💎' },
                { name: 'Wooden Bow', cost: 30, type: 'bow', damage: 15, emoji: '🏹' },
                { name: 'Iron Bow', cost: 80, type: 'bow', damage: 25, emoji: '🎯' },
                { name: 'Steel Bow', cost: 150, type: 'bow', damage: 40, emoji: '🏹' },
                { name: 'Diamond Bow', cost: 300, type: 'bow', damage: 80, emoji: '🎯' },
                { name: 'Basic Arrows', cost: 5, type: 'arrows', damage: 5, emoji: '➡️', quantity: 10 },
                { name: 'Iron Arrows', cost: 15, type: 'arrows', damage: 10, emoji: '➡️', quantity: 10 },
                { name: 'Steel Arrows', cost: 25, type: 'arrows', damage: 15, emoji: '➡️', quantity: 10 },
                { name: 'Diamond Arrows', cost: 50, type: 'arrows', damage: 25, emoji: '➡️', quantity: 10 }
            ],
            powerups: [
                { name: 'Fart Powerup', cost: 15, type: 'powerup', effect: 'fly', emoji: '💨', duration: 900 },
                { name: 'Bubble Powerup', cost: 10, type: 'powerup', effect: 'swim', emoji: '🫧', duration: 120 },
                { name: 'Speed Powerup', cost: 20, type: 'powerup', effect: 'speed', emoji: '⚡', duration: 180 },
                { name: 'Health Powerup', cost: 25, type: 'powerup', effect: 'health', emoji: '❤️', duration: 0 }
            ]
        };
        
        // Trading system
        this.isTrading = false;
        this.currentTrader = null;
        
        // 3D Scene setup
        this.setup3DScene();
        
        // Input handling
        this.keys = {};
        this.mouse = { x: 0, y: 0 };
        this.setupInput();
        
        // Setup start button
        this.setupStartButton();
        
        // Don't start game loop until start button is clicked
        // this.gameLoop();
    }
    
    setup3DScene() {
        // Create scene with realistic fog
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x87CEEB, 50, 200);
        
        // Create camera with realistic settings
        this.camera = new THREE.PerspectiveCamera(60, this.width / this.height, 0.1, 1000);
        this.camera.position.set(0, 8, 15);
        this.camera.lookAt(0, 0, 0);
        
        // Create renderer with photorealistic settings
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
        });
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.0;
        this.renderer.toneMappingWhitePoint = 1.0;
        
        this.container.appendChild(this.renderer.domElement);
        
        // Add photorealistic lighting
        this.setupPhotorealisticLighting();
        
        // Create realistic ground
        this.createRealisticGround();
        
        // Create realistic sky
        this.createRealisticSky();
        
        // Create realistic player
        this.createRealisticPlayer();
        
        // Create realistic trail
        this.createRealisticTrail();
        
        // Create realistic water areas
        this.createRealisticWaterAreas();
        
        // Create realistic trees
        this.createRealisticTrees();
        
        // Add atmospheric effects
        this.createAtmosphericEffects();
    }
    
    setupPhotorealisticLighting() {
        // Realistic ambient light with color temperature
        this.ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        this.scene.add(this.ambientLight);
        
        // Realistic sun light with proper color temperature
        this.directionalLight = new THREE.DirectionalLight(0xfffaf0, 1.2);
        this.directionalLight.position.set(100, 100, 50);
        this.directionalLight.castShadow = true;
        this.directionalLight.shadow.mapSize.width = 4096;
        this.directionalLight.shadow.mapSize.height = 4096;
        this.directionalLight.shadow.camera.near = 0.5;
        this.directionalLight.shadow.camera.far = 500;
        this.directionalLight.shadow.camera.left = -150;
        this.directionalLight.shadow.camera.right = 150;
        this.directionalLight.shadow.camera.top = 150;
        this.directionalLight.shadow.camera.bottom = -150;
        this.directionalLight.shadow.bias = -0.0001;
        this.directionalLight.shadow.normalBias = 0.02;
        this.scene.add(this.directionalLight);
        
        // Realistic moonlight for night
        this.moonLight = new THREE.DirectionalLight(0x7b68ee, 0.3);
        this.moonLight.position.set(-50, 100, -50);
        this.moonLight.castShadow = true;
        this.moonLight.shadow.mapSize.width = 2048;
        this.moonLight.shadow.mapSize.height = 2048;
        this.scene.add(this.moonLight);
        
        // Realistic point lights for atmosphere
        this.pointLight = new THREE.PointLight(0x4444ff, 0.3, 150);
        this.pointLight.position.set(0, 30, 0);
        this.scene.add(this.pointLight);
        
        // Add volumetric lighting effect
        this.createVolumetricLighting();
    }
    
    createRealisticGround() {
        // Create realistic grass texture
        const grassTexture = this.createGrassTexture();
        const grassMaterial = new THREE.MeshLambertMaterial({ 
            map: grassTexture,
            bumpMap: grassTexture,
            bumpScale: 0.1
        });
        
        const groundGeometry = new THREE.PlaneGeometry(400, 400, 100, 100);
        // Add realistic terrain displacement
        const vertices = groundGeometry.attributes.position.array;
        for (let i = 0; i < vertices.length; i += 3) {
            vertices[i + 1] = Math.sin(vertices[i] * 0.1) * Math.cos(vertices[i + 2] * 0.1) * 0.5;
        }
        groundGeometry.attributes.position.needsUpdate = true;
        groundGeometry.computeVertexNormals();
        
        this.ground = new THREE.Mesh(groundGeometry, grassMaterial);
        this.ground.rotation.x = -Math.PI / 2;
        this.ground.receiveShadow = true;
        this.scene.add(this.ground);
        
        // Add realistic grass patches
        this.createGrassPatches();
    }
    
    createGrassTexture() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 512;
        canvas.height = 512;
        
        // Create realistic grass pattern
        ctx.fillStyle = '#2d5a27';
        ctx.fillRect(0, 0, 512, 512);
        
        // Add grass detail
        for (let i = 0; i < 10000; i++) {
            const x = Math.random() * 512;
            const y = Math.random() * 512;
            const length = Math.random() * 3 + 1;
            const angle = Math.random() * Math.PI * 2;
            
            ctx.strokeStyle = `hsl(${90 + Math.random() * 20}, 60%, ${30 + Math.random() * 20}%)`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
            ctx.stroke();
        }
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(20, 20);
        return texture;
    }
    
    createGrassPatches() {
        const grassGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.3, 4);
        const grassMaterial = new THREE.MeshLambertMaterial({ color: 0x4a7c59 });
        
        for (let i = 0; i < 500; i++) {
            const grass = new THREE.Mesh(grassGeometry, grassMaterial);
            grass.position.set(
                (Math.random() - 0.5) * 400,
                0.15,
                (Math.random() - 0.5) * 400
            );
            grass.rotation.x = Math.random() * 0.2 - 0.1;
            grass.rotation.z = Math.random() * 0.2 - 0.1;
            grass.castShadow = true;
            this.scene.add(grass);
        }
    }
    
    createRealisticSky() {
        // Create realistic skybox with gradient
        const skyGeometry = new THREE.SphereGeometry(500, 64, 64);
        
        // Create realistic sky gradient
        const skyTexture = this.createSkyGradient();
        const skyMaterial = new THREE.MeshBasicMaterial({
            map: skyTexture,
            side: THREE.BackSide
        });
        
        this.sky = new THREE.Mesh(skyGeometry, skyMaterial);
        this.scene.add(this.sky);
        
        // Add realistic clouds
        this.createRealisticClouds();
    }
    
    createSkyGradient() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 1024;
        canvas.height = 512;
        
        // Create realistic sky gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#87CEEB');  // Sky blue at top
        gradient.addColorStop(0.5, '#98FB98'); // Light green in middle
        gradient.addColorStop(1, '#F0E68C');   // Khaki at horizon
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add some atmospheric scattering
        for (let i = 0; i < 100; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height * 0.3;
            const radius = Math.random() * 50 + 10;
            
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.1})`;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }
        
        const texture = new THREE.CanvasTexture(canvas);
        return texture;
    }
    
    createRealisticClouds() {
        const cloudGeometry = new THREE.SphereGeometry(20, 8, 8);
        const cloudMaterial = new THREE.MeshLambertMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.8
        });
        
        for (let i = 0; i < 20; i++) {
            const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
            cloud.position.set(
                (Math.random() - 0.5) * 800,
                100 + Math.random() * 50,
                (Math.random() - 0.5) * 800
            );
            cloud.scale.set(
                Math.random() * 2 + 1,
                Math.random() * 0.5 + 0.5,
                Math.random() * 2 + 1
            );
            this.scene.add(cloud);
        }
    }
    
    createRealisticPlayer() {
        const currentStage = this.animalStages.find(stage => stage.type === this.player.animalType);
        
        // Create realistic animal body with proper proportions
        const bodyGeometry = new THREE.SphereGeometry(this.player.size, 32, 32);
        const bodyMaterial = new THREE.MeshLambertMaterial({ 
            color: currentStage.color,
            roughness: 0.8,
            metalness: 0.1
        });
        
        this.playerMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
        this.playerMesh.position.set(this.player.x, this.player.y, this.player.z);
        this.playerMesh.castShadow = true;
        this.playerMesh.receiveShadow = true;
        this.scene.add(this.playerMesh);
        
        // Create realistic animal head
        const headGeometry = new THREE.SphereGeometry(this.player.size * 0.6, 16, 16);
        const headMaterial = new THREE.MeshLambertMaterial({ 
            color: currentStage.color,
            roughness: 0.7,
            metalness: 0.1
        });
        
        this.playerHead = new THREE.Mesh(headGeometry, headMaterial);
        this.playerHead.position.set(0, this.player.size * 0.8, this.player.size * 0.8);
        this.playerHead.castShadow = true;
        this.playerMesh.add(this.playerHead);
        
        // Create realistic eyes
        this.createRealisticEyes();
        
        // Create realistic ears
        this.createRealisticEars();
        
        // Create realistic tail
        this.createRealisticTail();
        
        // Create realistic fur texture
        this.createRealisticFur();
    }
    
    createRealisticEyes() {
        const eyeGeometry = new THREE.SphereGeometry(0.1, 8, 8);
        const eyeMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });
        
        // Left eye
        this.leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        this.leftEye.position.set(-0.2, 0.1, 0.3);
        this.playerHead.add(this.leftEye);
        
        // Right eye
        this.rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        this.rightEye.position.set(0.2, 0.1, 0.3);
        this.playerHead.add(this.rightEye);
        
        // Eye highlights
        const highlightGeometry = new THREE.SphereGeometry(0.03, 4, 4);
        const highlightMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
        
        this.leftHighlight = new THREE.Mesh(highlightGeometry, highlightMaterial);
        this.leftHighlight.position.set(-0.22, 0.12, 0.32);
        this.playerHead.add(this.leftHighlight);
        
        this.rightHighlight = new THREE.Mesh(highlightGeometry, highlightMaterial);
        this.rightHighlight.position.set(0.18, 0.12, 0.32);
        this.playerHead.add(this.rightHighlight);
    }
    
    createRealisticEars() {
        const earGeometry = new THREE.ConeGeometry(0.1, 0.3, 8);
        const earMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
        
        // Left ear
        this.leftEar = new THREE.Mesh(earGeometry, earMaterial);
        this.leftEar.position.set(-0.15, 0.4, 0.2);
        this.leftEar.rotation.x = -0.3;
        this.leftEar.rotation.z = -0.2;
        this.playerHead.add(this.leftEar);
        
        // Right ear
        this.rightEar = new THREE.Mesh(earGeometry, earMaterial);
        this.rightEar.position.set(0.15, 0.4, 0.2);
        this.rightEar.rotation.x = -0.3;
        this.rightEar.rotation.z = 0.2;
        this.playerHead.add(this.rightEar);
    }
    
    createRealisticTail() {
        const tailGeometry = new THREE.CylinderGeometry(0.05, 0.02, 0.8, 8);
        const tailMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
        
        this.playerTail = new THREE.Mesh(tailGeometry, tailMaterial);
        this.playerTail.position.set(0, 0, -this.player.size * 0.8);
        this.playerTail.rotation.x = Math.PI / 2;
        this.playerTail.castShadow = true;
        this.playerMesh.add(this.playerTail);
    }
    
    createRealisticFur() {
        // Create fur effect with small cylinders
        const furGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.1, 4);
        const furMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
        
        for (let i = 0; i < 100; i++) {
            const fur = new THREE.Mesh(furGeometry, furMaterial);
            fur.position.set(
                (Math.random() - 0.5) * this.player.size * 2,
                (Math.random() - 0.5) * this.player.size * 2,
                (Math.random() - 0.5) * this.player.size * 2
            );
            fur.rotation.x = Math.random() * Math.PI;
            fur.rotation.z = Math.random() * Math.PI;
            this.playerMesh.add(fur);
        }
    }
    
    createPlayerText(emoji) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 64;
        canvas.height = 64;
        
        context.fillStyle = 'white';
        context.font = '48px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(emoji, 32, 32);
        
        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
        this.playerSprite = new THREE.Sprite(spriteMaterial);
        this.playerSprite.scale.set(2, 2, 2);
        this.playerMesh.add(this.playerSprite);
    }
    
    createTrail() {
        this.trail = [];
        const trailGeometry = new THREE.PlaneGeometry(3, 200);
        const trailMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
        
        for (let i = 0; i < 10; i++) {
            const trailSegment = new THREE.Mesh(trailGeometry, trailMaterial);
            trailSegment.rotation.x = -Math.PI / 2;
            trailSegment.position.set(0, 0.01, -i * 20);
            this.scene.add(trailSegment);
            this.trail.push(trailSegment);
        }
    }
    
    createWaterAreas() {
        this.waterAreas = [];
        const waterGeometry = new THREE.PlaneGeometry(20, 15);
        const waterMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x4682B4,
            transparent: true,
            opacity: 0.6
        });
        
        const waterPositions = [
            { x: -30, z: -20 },
            { x: 30, z: -40 },
            { x: 0, z: -60 }
        ];
        
        waterPositions.forEach(pos => {
            const water = new THREE.Mesh(waterGeometry, waterMaterial);
            water.rotation.x = -Math.PI / 2;
            water.position.set(pos.x, 0.02, pos.z);
            this.scene.add(water);
            this.waterAreas.push(water);
        });
    }
    
    createRealisticTrees() {
        this.trees = [];
        
        for (let i = 0; i < 50; i++) {
            const tree = this.createRealisticTree();
            tree.position.set(
                (Math.random() - 0.5) * 300,
                0,
                (Math.random() - 0.5) * 300
            );
            tree.scale.set(
                Math.random() * 0.5 + 0.8,
                Math.random() * 0.5 + 0.8,
                Math.random() * 0.5 + 0.8
            );
            this.scene.add(tree);
            this.trees.push(tree);
        }
    }
    
    createRealisticTree() {
        const treeGroup = new THREE.Group();
        
        // Create realistic trunk with bark texture
        const trunkGeometry = new THREE.CylinderGeometry(0.8, 1.2, 12, 12);
        const barkTexture = this.createBarkTexture();
        const trunkMaterial = new THREE.MeshLambertMaterial({ 
            map: barkTexture,
            bumpMap: barkTexture,
            bumpScale: 0.2
        });
        
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.castShadow = true;
        trunk.receiveShadow = true;
        treeGroup.add(trunk);
        
        // Create realistic leaves with multiple layers
        const leafTexture = this.createLeafTexture();
        const leafMaterial = new THREE.MeshLambertMaterial({ 
            map: leafTexture,
            transparent: true,
            opacity: 0.9
        });
        
        // Create multiple leaf layers for realistic foliage
        for (let layer = 0; layer < 5; layer++) {
            const leafGeometry = new THREE.SphereGeometry(3 + layer * 0.5, 16, 16);
            const leaves = new THREE.Mesh(leafGeometry, leafMaterial);
            leaves.position.y = 8 + layer * 1.5;
            leaves.castShadow = true;
            treeGroup.add(leaves);
        }
        
        // Add some branches
        for (let i = 0; i < 8; i++) {
            const branchGeometry = new THREE.CylinderGeometry(0.1, 0.05, 2, 8);
            const branchMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
            const branch = new THREE.Mesh(branchGeometry, branchMaterial);
            
            branch.position.y = 2 + i * 1.2;
            branch.rotation.z = Math.random() * Math.PI * 2;
            branch.rotation.x = Math.PI / 2;
            branch.castShadow = true;
            treeGroup.add(branch);
        }
        
        return treeGroup;
    }
    
    createBarkTexture() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 256;
        canvas.height = 256;
        
        // Create realistic bark pattern
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(0, 0, 256, 256);
        
        // Add bark detail
        for (let i = 0; i < 1000; i++) {
            const x = Math.random() * 256;
            const y = Math.random() * 256;
            const length = Math.random() * 20 + 5;
            const width = Math.random() * 2 + 1;
            
            ctx.strokeStyle = `hsl(${20 + Math.random() * 10}, 40%, ${20 + Math.random() * 20}%)`;
            ctx.lineWidth = width;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + Math.random() * 10 - 5, y + length);
            ctx.stroke();
        }
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(4, 4);
        return texture;
    }
    
    createLeafTexture() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 256;
        canvas.height = 256;
        
        // Create realistic leaf pattern
        ctx.fillStyle = '#228B22';
        ctx.fillRect(0, 0, 256, 256);
        
        // Add leaf detail
        for (let i = 0; i < 500; i++) {
            const x = Math.random() * 256;
            const y = Math.random() * 256;
            const size = Math.random() * 10 + 5;
            
            ctx.fillStyle = `hsl(${90 + Math.random() * 30}, 60%, ${30 + Math.random() * 20}%)`;
            ctx.beginPath();
            ctx.ellipse(x, y, size, size * 0.6, Math.random() * Math.PI, 0, Math.PI * 2);
            ctx.fill();
        }
        
        const texture = new THREE.CanvasTexture(canvas);
        return texture;
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
        
        // Hide start screen and mechanics display
        document.getElementById('startScreen').style.display = 'none';
        document.querySelector('.instructions').style.display = 'none';
        
        this.spawnFood();
        this.spawnObstacles();
        this.spawnCoins();
        this.spawnTraders(); // Spawn traders instead of random animals
        this.spawnPeople();
        
        // Ensure game loop is running
        if (!this.gameLoopRunning) {
            this.gameLoopRunning = true;
            this.gameLoop();
        }
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
        
        // Mouse controls
        this.renderer.domElement.addEventListener('mousemove', (e) => {
            this.mouse.x = (e.clientX / this.width) * 2 - 1;
            this.mouse.y = -(e.clientY / this.height) * 2 + 1;
        });
        
        // Restart button
        document.getElementById('restartBtn').addEventListener('click', () => {
            this.restart();
        });
    }
    
    updatePlayer() {
        // Update environmental effects
        this.updateEnvironment();
        
        // Calculate speed based on health - lower health = slower speed
        let baseSpeed = this.player.speed;
        let healthMultiplier = this.player.health / this.player.maxHealth;
        
        // Speed decreases linearly with health: 100% health = full speed, 0% health = 20% speed
        let speed = baseSpeed * (0.2 + (healthMultiplier * 0.8));
        
        if (this.keys['w'] || this.keys['arrowup']) {
            this.player.z -= speed * Math.cos(this.player.rotation);
            this.player.x -= speed * Math.sin(this.player.rotation);
        }
        if (this.keys['s'] || this.keys['arrowdown']) {
            this.player.z += speed * Math.cos(this.player.rotation);
            this.player.x += speed * Math.sin(this.player.rotation);
        }
        if (this.keys['a'] || this.keys['arrowleft']) {
            this.player.rotation += 0.05;
        }
        if (this.keys['d'] || this.keys['arrowright']) {
            this.player.rotation -= 0.05;
        }
        
        // Update player mesh position and rotation
        this.playerMesh.position.set(this.player.x, this.player.y, this.player.z);
        this.playerMesh.rotation.y = this.player.rotation;
        
        // Chase camera - follows behind and slightly above the player
        const cameraDistance = 8;
        const cameraHeight = 3;
        const lookAheadDistance = 5;
        
        // Calculate camera position behind the player
        this.camera.position.x = this.player.x - Math.sin(this.player.rotation) * cameraDistance;
        this.camera.position.z = this.player.z - Math.cos(this.player.rotation) * cameraDistance;
        this.camera.position.y = this.player.y + cameraHeight;
        
        // Look ahead of the player for better visibility
        const lookAheadX = this.player.x - Math.sin(this.player.rotation) * lookAheadDistance;
        const lookAheadZ = this.player.z - Math.cos(this.player.rotation) * lookAheadDistance;
        
        this.camera.lookAt(lookAheadX, this.player.y + 2, lookAheadZ);
        
        // Update realistic needs
        this.updateAnimalNeeds();
    }
    
    updateEnvironment() {
        // Fast day/night cycle: 30 seconds night, 60 seconds day
        this.weather.timeOfDay += 0.04; // Faster cycle
        if (this.weather.timeOfDay >= 24) {
            this.weather.timeOfDay = 0;
        }
        
        // Update realistic lighting based on time of day
        if (this.weather.timeOfDay > 6 && this.weather.timeOfDay < 18) {
            // Day - realistic sunlight
            const sunAngle = (this.weather.timeOfDay - 6) / 12 * Math.PI;
            this.directionalLight.position.set(
                100 * Math.cos(sunAngle),
                100 * Math.sin(sunAngle) + 50,
                50
            );
            this.ambientLight.intensity = 0.4;
            this.directionalLight.intensity = 1.2;
            this.moonLight.intensity = 0;
            this.pointLight.intensity = 0;
            
            // Update sky color realistically
            this.updateSkyColor();
        } else {
            // Night - realistic moonlight
            const moonAngle = (this.weather.timeOfDay - 18) / 6 * Math.PI;
            this.moonLight.position.set(
                -50 * Math.cos(moonAngle),
                100 * Math.sin(moonAngle) + 50,
                -50
            );
            this.ambientLight.intensity = 0.1;
            this.directionalLight.intensity = 0.05;
            this.moonLight.intensity = 0.3;
            this.pointLight.intensity = 0.3;
            
            // Update sky color for night
            this.updateNightSkyColor();
        }
        
        // Realistic temperature variation
        this.weather.temperature = 15 + 10 * Math.sin(this.weather.timeOfDay * Math.PI / 12);
        this.player.temperature = this.weather.temperature;
        
        // Update atmospheric effects
        this.updateAtmosphericEffects();
    }
    
    updateSkyColor() {
        // Realistic sky color based on time
        const timeProgress = (this.weather.timeOfDay - 6) / 12;
        let skyColor;
        
        if (timeProgress < 0.2) {
            // Dawn
            skyColor = new THREE.Color(0xffb6c1);
        } else if (timeProgress < 0.8) {
            // Day
            skyColor = new THREE.Color(0x87ceeb);
        } else {
            // Dusk
            skyColor = new THREE.Color(0xffa07a);
        }
        
        this.sky.material.color.copy(skyColor);
    }
    
    updateNightSkyColor() {
        // Realistic night sky
        this.sky.material.color.setHex(0x191970);
    }
    
    updateAtmosphericEffects() {
        // Update fog based on time and weather
        if (this.weather.timeOfDay > 6 && this.weather.timeOfDay < 18) {
            this.scene.fog.near = 50;
            this.scene.fog.far = 200;
        } else {
            this.scene.fog.near = 30;
            this.scene.fog.far = 150;
        }
    }
    
    createVolumetricLighting() {
        // Create volumetric light rays
        const rayGeometry = new THREE.CylinderGeometry(0.1, 0.1, 50, 8);
        const rayMaterial = new THREE.MeshLambertMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.1
        });
        
        for (let i = 0; i < 20; i++) {
            const ray = new THREE.Mesh(rayGeometry, rayMaterial);
            ray.position.set(
                (Math.random() - 0.5) * 200,
                25,
                (Math.random() - 0.5) * 200
            );
            ray.rotation.x = Math.PI / 2;
            this.scene.add(ray);
        }
    }
    
    createAtmosphericEffects() {
        // Add dust particles in the air
        const dustGeometry = new THREE.SphereGeometry(0.01, 4, 4);
        const dustMaterial = new THREE.MeshLambertMaterial({
            color: 0xcccccc,
            transparent: true,
            opacity: 0.3
        });
        
        for (let i = 0; i < 100; i++) {
            const dust = new THREE.Mesh(dustGeometry, dustMaterial);
            dust.position.set(
                (Math.random() - 0.5) * 400,
                Math.random() * 20,
                (Math.random() - 0.5) * 400
            );
            this.scene.add(dust);
        }
    }
    
    updateAnimalNeeds() {
        // Energy decreases over time
        this.player.energy = Math.max(0, this.player.energy - 0.1);
        
        // Hunger increases over time
        this.player.hunger = Math.min(this.player.maxHunger, this.player.hunger + 0.3);
        
        // Thirst increases over time
        this.player.thirst = Math.min(this.player.maxThirst, this.player.thirst + 0.2);
        
        // Check if hungry
        if (this.player.hunger > 70) {
            this.player.isHungry = true;
        } else {
            this.player.isHungry = false;
        }
        
        // Health decreases if needs aren't met
        if (this.player.energy < 20 || this.player.thirst > 80 || this.player.hunger > 90) {
            this.player.health = Math.max(0, this.player.health - 0.05);
        }
        
        // Passive health regeneration: 8% every 10 seconds
        if (!this.player.healthRegenTimer) {
            this.player.healthRegenTimer = 0;
        }
        this.player.healthRegenTimer++;
        
        if (this.player.healthRegenTimer >= 600) { // 10 seconds at 60fps
            const healthGain = Math.floor(this.player.maxHealth * 0.08);
            this.player.health = Math.min(this.player.maxHealth, this.player.health + healthGain);
            this.player.healthRegenTimer = 0;
            
            // Show regeneration message occasionally
            if (this.player.health < this.player.maxHealth) {
                this.showMessage(`❤️ Regenerated ${healthGain} health!`, "success");
            }
        }
        
        // Age increases slowly
        this.player.age += 0.001;
        
        // Last ate/drank/slept timers
        this.player.lastAte++;
        this.player.lastDrank++;
        this.player.lastSlept++;
        
        // Update sleep timer if sleeping
        if (this.player.isSleeping) {
            this.player.sleepTime++;
        }
    }
    
    sleep() {
        // Check if it's night time (between 18:00 and 6:00)
        // With new cycle: night is 18:00-6:00 (12 hours = 30 seconds)
        const isNight = this.weather.timeOfDay < 6 || this.weather.timeOfDay > 18;
        
        if (!isNight) {
            // Show message that you can only sleep at night
            this.showMessage("🌅 You can only sleep at night! Wait until sunset.", "warning");
            return;
        }
        
        if (this.player.isSleeping) {
            // If already sleeping, wake up
            this.wakeUp();
            return;
        }
        
        // Start sleeping
        this.player.isSleeping = true;
        this.player.sleepTime = 0;
        this.showMessage("💤 Sleeping... Press S again to wake up", "info");
    }
    
    wakeUp() {
        if (!this.player.isSleeping) {
            return;
        }
        
        // Calculate energy restored based on sleep time
        const energyRestored = Math.min(50, this.player.sleepTime * 2);
        this.player.energy = Math.min(this.player.maxEnergy, this.player.energy + energyRestored);
        
        // Stop sleeping
        this.player.isSleeping = false;
        this.player.lastSlept = this.weather.timeOfDay;
        
        this.showMessage(`💤 Woke up! Restored ${energyRestored} energy`, "success");
    }
    
    showMessage(message, type = "info") {
        // Create or update message display
        let messageDiv = document.getElementById('gameMessage');
        if (!messageDiv) {
            messageDiv = document.createElement('div');
            messageDiv.id = 'gameMessage';
            messageDiv.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 15px 25px;
                border-radius: 10px;
                font-size: 16px;
                font-weight: bold;
                z-index: 1000;
                text-align: center;
                max-width: 300px;
            `;
            document.body.appendChild(messageDiv);
        }
        
        // Set color based on message type
        switch(type) {
            case "warning":
                messageDiv.style.color = "#FFD700";
                break;
            case "success":
                messageDiv.style.color = "#4CAF50";
                break;
            case "error":
                messageDiv.style.color = "#F44336";
                break;
            default:
                messageDiv.style.color = "white";
        }
        
        messageDiv.textContent = message;
        
        // Remove message after 3 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 3000);
    }
    
    poop() {
        if (!this.player.needsToPoop) {
            this.showMessage("💩 You don't need to poop right now!", "info");
            return;
        }
        
        // Reset stomach and poop timer
        this.player.stomach = 0;
        this.player.needsToPoop = false;
        this.player.poopTimer = 0;
        
        this.showMessage("💩 Pooped! Your stomach is empty now.", "success");
    }
    
    fly() {
        if (!this.player.canFly) {
            this.showMessage("🦅 You can't fly yet! Buy flying upgrades from traders.", "warning");
            return;
        }
        
        if (this.player.energy < 20) {
            this.showMessage("⚡ Not enough energy to fly!", "warning");
            return;
        }
        
        // Start flying
        this.player.isFlying = true;
        this.player.flyTimer = 900; // 15 seconds at 60fps
        this.player.energy -= 20;
        
        this.showMessage("🦅 Flying! Press F again to land", "info");
    }
    
    spawnFood() {
        const foodType = this.foodTypes[Math.floor(Math.random() * this.foodTypes.length)];
        const food = {
            x: (Math.random() - 0.5) * 100,
            y: 0.5,
            z: (Math.random() - 0.5) * 100,
            type: foodType.type,
            emoji: foodType.emoji,
            points: foodType.points,
            color: foodType.color,
            size: foodType.size
        };
        
        // Create 3D food object
        const foodGeometry = new THREE.SphereGeometry(food.size, 8, 8);
        const foodMaterial = new THREE.MeshLambertMaterial({ color: foodType.color });
        const foodMesh = new THREE.Mesh(foodGeometry, foodMaterial);
        foodMesh.position.set(food.x, food.y, food.z);
        foodMesh.castShadow = true;
        this.scene.add(foodMesh);
        
        food.mesh = foodMesh;
        this.foods.push(food);
    }
    
    // Powerups are now only available from traders
    // spawnPowerups() function removed - all powerups must be purchased
    
    spawnCoins() {
        const coin = {
            x: (Math.random() - 0.5) * 100,
            y: 0.5,
            z: (Math.random() - 0.5) * 100,
            emoji: '🪙',
            size: 0.3,
            color: '#FFD700',
            value: 1
        };
        
        // Create 3D coin object
        const coinGeometry = new THREE.CylinderGeometry(coin.size, coin.size, 0.1, 8);
        const coinMaterial = new THREE.MeshLambertMaterial({ color: 0xFFD700 });
        const coinMesh = new THREE.Mesh(coinGeometry, coinMaterial);
        coinMesh.rotation.x = Math.PI / 2;
        coinMesh.position.set(coin.x, coin.y, coin.z);
        coinMesh.castShadow = true;
        this.scene.add(coinMesh);
        
        coin.mesh = coinMesh;
        this.coins.push(coin);
    }
    
    spawnOtherAnimals() {
        const animalType = this.otherAnimalTypes[Math.floor(Math.random() * this.otherAnimalTypes.length)];
        const animal = {
            x: (Math.random() - 0.5) * 100,
            y: animalType.size,
            z: (Math.random() - 0.5) * 100,
            type: animalType.type,
            emoji: animalType.emoji,
            size: animalType.size,
            speed: animalType.speed,
            isFriendly: animalType.isFriendly,
            behavior: animalType.behavior,
            color: animalType.color
        };
        
        // Create 3D animal object
        const animalGeometry = new THREE.SphereGeometry(animal.size, 8, 8);
        const animalMaterial = new THREE.MeshLambertMaterial({ color: animalType.color });
        const animalMesh = new THREE.Mesh(animalGeometry, animalMaterial);
        animalMesh.position.set(animal.x, animal.y, animal.z);
        animalMesh.castShadow = true;
        this.scene.add(animalMesh);
        
        animal.mesh = animalMesh;
        this.otherAnimals.push(animal);
    }
    
    spawnTraders() {
        // Spawn traders at fixed locations
        const traderPositions = [
            { x: -50, z: -50, type: 'merchant', emoji: '🦝' },
            { x: 50, z: -50, type: 'trader', emoji: '🛒' },
            { x: -50, z: 50, type: 'merchant', emoji: '🦝' },
            { x: 50, z: 50, type: 'trader', emoji: '🛒' }
        ];
        
        traderPositions.forEach((pos, index) => {
            const trader = {
                x: pos.x,
                y: 1.5,
                z: pos.z,
                type: pos.type,
                emoji: pos.emoji,
                size: 1.5,
                speed: 0,
                isFriendly: true,
                behavior: 'trader',
                color: '#FFD700'
            };
            
            // Create 3D trader object
            const traderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 3, 8);
            const traderMaterial = new THREE.MeshLambertMaterial({ color: 0xFFD700 });
            const traderMesh = new THREE.Mesh(traderGeometry, traderMaterial);
            traderMesh.position.set(trader.x, trader.y, trader.z);
            traderMesh.castShadow = true;
            this.scene.add(traderMesh);
            
            trader.mesh = traderMesh;
            this.otherAnimals.push(trader);
        });
    }
    
    spawnPeople() {
        const personType = this.peopleTypes[Math.floor(Math.random() * this.peopleTypes.length)];
        const person = {
            x: (Math.random() - 0.5) * 100,
            y: personType.size,
            z: (Math.random() - 0.5) * 100,
            type: personType.type,
            emoji: personType.emoji,
            size: personType.size,
            behavior: personType.behavior,
            isFriendly: personType.isFriendly,
            color: personType.color
        };
        
        // Create 3D person object
        const personGeometry = new THREE.CylinderGeometry(person.size * 0.3, person.size * 0.3, person.size, 8);
        const personMaterial = new THREE.MeshLambertMaterial({ color: personType.color });
        const personMesh = new THREE.Mesh(personGeometry, personMaterial);
        personMesh.position.set(person.x, person.y, person.z);
        personMesh.castShadow = true;
        this.scene.add(personMesh);
        
        person.mesh = personMesh;
        this.people.push(person);
    }
    
    spawnObstacles() {
        for (let i = 0; i < 5; i++) {
            const obstacle = {
                x: (Math.random() - 0.5) * 100,
                y: 1,
                z: (Math.random() - 0.5) * 100,
                size: 1,
                color: '#654321'
            };
            
            // Create 3D obstacle object
            const obstacleGeometry = new THREE.BoxGeometry(obstacle.size, obstacle.size * 2, obstacle.size);
            const obstacleMaterial = new THREE.MeshLambertMaterial({ color: 0x654321 });
            const obstacleMesh = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
            obstacleMesh.position.set(obstacle.x, obstacle.y, obstacle.z);
            obstacleMesh.castShadow = true;
            this.scene.add(obstacleMesh);
            
            obstacle.mesh = obstacleMesh;
            this.obstacles.push(obstacle);
        }
    }
    
    checkCollisions() {
        // Check food collisions
        for (let i = this.foods.length - 1; i >= 0; i--) {
            const food = this.foods[i];
            const distance = Math.sqrt(
                Math.pow(this.player.x - food.x, 2) + 
                Math.pow(this.player.z - food.z, 2)
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
                Math.pow(this.player.z - powerup.z, 2)
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
                Math.pow(this.player.z - coin.z, 2)
            );
            
            if (distance < this.player.size + coin.size) {
                this.collectCoin(coin, i);
            }
        }
        
        // Check animal interactions with weapons
        for (let animal of this.otherAnimals) {
            const distance = Math.sqrt(
                Math.pow(this.player.x - animal.x, 2) + 
                Math.pow(this.player.z - animal.z, 2)
            );
            
            if (distance < this.player.size + animal.size) {
                this.handleAnimalInteraction(animal);
            }
        }
        
        // Check people interactions with weapons
        for (let person of this.people) {
            const distance = Math.sqrt(
                Math.pow(this.player.x - person.x, 2) + 
                Math.pow(this.player.z - person.z, 2)
            );
            
            if (distance < this.player.size + person.size) {
                this.handlePersonInteraction(person);
            }
        }
    }
    
    handleAnimalInteraction(animal) {
        if (animal.behavior === 'trader') {
            this.startTrading(animal);
        } else if (animal.isFriendly) {
            this.score += 10;
            this.player.energy = Math.min(this.player.maxEnergy, this.player.energy + 10);
        } else {
            // Combat with hostile animals
            if (this.player.currentSword) {
                // Player has a sword - deal damage to animal
                this.score += this.player.currentSword.damage;
                this.createCombatEffect(animal.x, animal.z, '#FF6B35');
                
                // Remove the animal (defeated)
                this.scene.remove(animal.mesh);
                const index = this.otherAnimals.indexOf(animal);
                if (index > -1) {
                    this.otherAnimals.splice(index, 1);
                }
            } else {
                // Player takes damage
                this.player.health = Math.max(0, this.player.health - 15);
                this.createCombatEffect(this.player.x, this.player.z, '#FF0000');
            }
        }
        
        this.updateUI();
    }
    
    handlePersonInteraction(person) {
        if (person.behavior === 'trader') {
            this.startTrading(person);
        } else if (person.isFriendly) {
            this.score += 15;
            this.player.coins += 2;
        } else {
            // Combat with hostile people
            if (this.player.currentSword) {
                // Player has a sword - deal damage to person
                this.score += this.player.currentSword.damage;
                this.createCombatEffect(person.x, person.z, '#FF6B35');
                
                // Remove the person (defeated)
                this.scene.remove(person.mesh);
                const index = this.people.indexOf(person);
                if (index > -1) {
                    this.people.splice(index, 1);
                }
            } else {
                // Player takes damage
                this.player.health = Math.max(0, this.player.health - 20);
                this.createCombatEffect(this.player.x, this.player.z, '#FF0000');
            }
        }
        
        this.updateUI();
    }
    
    createCombatEffect(x, z, color) {
        // Create combat particle effect
        for (let i = 0; i < 20; i++) {
            this.particles.push({
                x: x + (Math.random() - 0.5) * 20,
                y: Math.random() * 10,
                z: z + (Math.random() - 0.5) * 20,
                vx: (Math.random() - 0.5) * 6,
                vy: Math.random() * 4,
                vz: (Math.random() - 0.5) * 6,
                life: 60,
                color: color,
                size: Math.random() * 4 + 2
            });
        }
    }
    
    eatFood(food, index) {
        if (this.player.stomach >= this.player.maxStomach) {
            return;
        }
        
        const currentStage = this.animalStages.find(stage => stage.type === this.player.animalType);
        const isPreferredFood = currentStage.preferredFood.includes(food.type);
        const nutritionBonus = isPreferredFood ? 1.5 : 1.0;
        
        this.score += food.points * nutritionBonus;
        this.player.stomach += 1;
        this.player.energy = Math.min(this.player.maxEnergy, this.player.energy + food.energy);
        this.player.hunger = Math.max(0, this.player.hunger - food.nutrition);
        this.player.thirst = Math.max(0, this.player.thirst - food.water);
        
        const healthGain = food.healthBonus || (food.nutrition * 0.1);
        this.player.health = Math.min(this.player.maxHealth, this.player.health + healthGain);
        this.player.lastAte = 0;
        
        // Remove food from scene
        this.scene.remove(food.mesh);
        this.foods.splice(index, 1);
        
        // Check for evolution
        this.checkEvolution();
        
        // Spawn new food
        if (this.foods.length < 5) {
            this.spawnFood();
        }
        
        this.updateUI();
    }
    
    collectPowerup(powerup, index) {
        this.score += powerup.points;
        this.player.powerups++;
        
        if (powerup.effect === 'fly') {
            this.player.isFlying = true;
            this.player.flyTimer = 300;
            this.player.canFly = true;
        } else if (powerup.effect === 'swim') {
            this.player.swimTime += 120;
        }
        
        // Remove powerup from scene
        this.scene.remove(powerup.mesh);
        this.powerups.splice(index, 1);
        
        this.updateUI();
    }
    
    collectCoin(coin, index) {
        this.player.coins += coin.value;
        this.score += 5;
        
        // Remove coin from scene
        this.scene.remove(coin.mesh);
        this.coins.splice(index, 1);
        
        if (Math.random() < 0.3) {
            this.spawnCoins();
        }
        
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
            
            // Update player mesh
            this.playerMesh.geometry.dispose();
            this.playerMesh.geometry = new THREE.SphereGeometry(this.player.size, 16, 16);
            this.playerMesh.material.color.setHex(parseInt(nextStage.color.replace('#', '0x')));
            
            // Update player text
            this.playerMesh.remove(this.playerSprite);
            this.createPlayerText(nextStage.emoji);
        }
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
        
        // Update health display
        const healthDisplay = document.getElementById('healthDisplay');
        const healthValue = Math.floor(this.player.health);
        healthDisplay.textContent = healthValue;
        
        healthDisplay.classList.remove('healthy', 'warning', 'danger');
        
        if (healthValue > 70) {
            healthDisplay.classList.add('healthy');
        } else if (healthValue > 30) {
            healthDisplay.classList.add('warning');
        } else {
            healthDisplay.classList.add('danger');
        }
        
        // Calculate current speed based on health
        let baseSpeed = this.player.speed;
        let healthMultiplier = this.player.health / this.player.maxHealth;
        let currentSpeed = baseSpeed * (0.2 + (healthMultiplier * 0.8));
        let speedPercentage = Math.floor((currentSpeed / baseSpeed) * 100);
        
        // Update speed display if it exists
        const speedDisplay = document.getElementById('speedDisplay');
        if (speedDisplay) {
            speedDisplay.textContent = `${speedPercentage}%`;
            
            // Update speed display color based on health
            speedDisplay.classList.remove('healthy', 'warning', 'danger');
            if (speedPercentage > 80) {
                speedDisplay.classList.add('healthy');
            } else if (speedPercentage > 50) {
                speedDisplay.classList.add('warning');
            } else {
                speedDisplay.classList.add('danger');
            }
        }
        
        // Update health bar
        const healthBarFill = document.getElementById('healthBarFill');
        const healthPercentage = (this.player.health / this.player.maxHealth) * 100;
        healthBarFill.style.width = healthPercentage + '%';
        
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
            finalScoreElement.innerHTML = `
                <h2>💀 GAME OVER - YOU DIED!</h2>
                <p>Your health reached 0% and you died!</p>
                <p><strong>You get nothing!</strong></p>
                <p>Final Score: ${this.score}</p>
                <p>Press R to restart</p>
            `;
        } else {
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
        
        this.player = {
            x: 0,
            y: 0,
            z: 0,
            size: 1,
            speed: 0.1,
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
            powerups: 0,
            healthRegenTimer: 0
        };
        
        // Clear all game objects
        this.foods.forEach(food => this.scene.remove(food.mesh));
        this.powerups.forEach(powerup => this.scene.remove(powerup.mesh));
        this.coins.forEach(coin => this.scene.remove(coin.mesh));
        this.otherAnimals.forEach(animal => this.scene.remove(animal.mesh));
        this.people.forEach(person => this.scene.remove(person.mesh));
        this.obstacles.forEach(obstacle => this.scene.remove(obstacle.mesh));
        
        this.foods = [];
        this.powerups = [];
        this.obstacles = [];
        this.particles = [];
        this.waterAreas = [];
        this.coins = [];
        this.otherAnimals = [];
        this.people = [];
        
        // Reset player mesh
        this.playerMesh.position.set(0, 0, 0);
        this.playerMesh.geometry.dispose();
        this.playerMesh.geometry = new THREE.SphereGeometry(1, 16, 16);
        this.playerMesh.material.color.setHex(0x8B4513);
        
        this.updateUI();
        
        // Show start screen, mechanics display, and instructions again
        document.getElementById('startScreen').style.display = 'block';
        document.querySelector('.instructions').style.display = 'block';
        document.getElementById('gameOver').style.display = 'none';
    }
    
    gameLoop() {
        if (!this.gameOver) {
            if (this.gameStarted) {
                this.updatePlayer();
                this.checkCollisions();
                
                // Spawn new objects occasionally
                if (Math.random() < 0.01) {
                    this.spawnFood();
                }
                if (Math.random() < 0.005) {
                    this.spawnCoins();
                }
                if (Math.random() < 0.002) {
                    this.spawnPeople();
                }
                
                // Game over if health reaches 0
                if (this.player.health <= 0) {
                    this.gameOver = true;
                    this.showGameOver();
                }
            }
        }
        
        // Render the scene
        this.renderer.render(this.scene, this.camera);
        
        requestAnimationFrame(() => this.gameLoop());
    }
    
    // Weapon system functions
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
                    this.size = Math.floor(this.player.size / 20);
                    break;
            }
            
            this.updateUI();
        }
    }
    
    buyWeaponFromTrader(weaponName) {
        const weapon = this.shop.weapons.find(w => w.name === weaponName);
        if (weapon && this.player.coins >= weapon.cost) {
            this.player.coins -= weapon.cost;
            
            // Apply weapon effect
            switch(weapon.type) {
                case 'sword':
                    this.player.currentSword = weapon;
                    break;
                case 'bow':
                    this.player.currentBow = weapon;
                    break;
                case 'arrows':
                    this.player.arrows += weapon.quantity;
                    this.player.arrowDamage = weapon.damage;
                    break;
            }
            
            this.updateUI();
        }
    }
    
    buyPowerupFromTrader(powerupName) {
        const powerup = this.shop.powerups.find(p => p.name === powerupName);
        if (powerup && this.player.coins >= powerup.cost) {
            this.player.coins -= powerup.cost;
            this.player.powerups++;
            
            // Apply powerup effect
            switch(powerup.effect) {
                case 'fly':
                    this.player.isFlying = true;
                    this.player.flyTimer = powerup.duration;
                    this.player.canFly = true;
                    break;
                case 'swim':
                    this.player.swimTime += powerup.duration;
                    break;
                case 'speed':
                    this.player.speed *= 1.5;
                    setTimeout(() => {
                        this.player.speed /= 1.5;
                    }, powerup.duration * 16); // Convert to milliseconds
                    break;
                case 'health':
                    this.player.health = Math.min(this.player.maxHealth, this.player.health + 50);
                    break;
            }
            
            this.updateUI();
        }
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
                <button onclick="game.closeTrading()" class="close-x">✕</button>
                <h3>🛒 ${this.currentTrader.type} Trader</h3>
                <p>Your Coins: ${this.player.coins}</p>
                
                <h4>⚔️ Weapons & Combat</h4>
                <div class="shop-items">
                    ${this.shop.weapons.map(weapon => `
                        <div class="shop-item">
                            <span>${weapon.emoji} ${weapon.name} (${weapon.damage} damage)</span>
                            <span>${weapon.cost} 🪙</span>
                            <button onclick="game.buyWeaponFromTrader('${weapon.name}')" 
                                    ${this.player.coins >= weapon.cost ? '' : 'disabled'}>
                                Buy
                            </button>
                        </div>
                    `).join('')}
                </div>
                
                <h4>⚡ Powerups & Effects</h4>
                <div class="shop-items">
                    ${this.shop.powerups.map(powerup => `
                        <div class="shop-item">
                            <span>${powerup.emoji} ${powerup.name}</span>
                            <span>${powerup.cost} 🪙</span>
                            <button onclick="game.buyPowerupFromTrader('${powerup.name}')" 
                                    ${this.player.coins >= powerup.cost ? '' : 'disabled'}>
                                Buy
                            </button>
                        </div>
                    `).join('')}
                </div>
                
                <h4>🛡️ Items & Upgrades</h4>
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
                
                <div class="player-equipment">
                    <h4>🎒 Your Equipment</h4>
                    <p>🗡️ Sword: ${this.player.currentSword ? this.player.currentSword.name : 'None'}</p>
                    <p>🏹 Bow: ${this.player.currentBow ? this.player.currentBow.name : 'None'}</p>
                    <p>➡️ Arrows: ${this.player.arrows} (${this.player.arrowDamage} damage each)</p>
                    <p>⚡ Powerups: ${this.player.powerups}</p>
                </div>
            </div>
        `;
        
        // Add click event listener to close trading when clicking outside the panel
        tradingDiv.addEventListener('click', (e) => {
            if (e.target === tradingDiv) {
                this.closeTrading();
            }
        });
        
        document.body.appendChild(tradingDiv);
    }
    
    closeTrading() {
        this.isTrading = false;
        this.currentTrader = null;
        const tradingUI = document.getElementById('tradingUI');
        if (tradingUI) {
            tradingUI.remove();
        }
    }
    
    startTrading(trader) {
        this.isTrading = true;
        this.currentTrader = trader;
        this.showTradingUI();
    }
}

// Start the game when page loads
window.addEventListener('load', () => {
    window.game = new AnimalForestRun3D();
}); 
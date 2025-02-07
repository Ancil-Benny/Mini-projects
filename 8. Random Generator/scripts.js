
// Initialize Three.js scene for background particles
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 5000;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 5;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    color: 0x00ffff
});
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

camera.position.z = 2;

// GSAP animations
gsap.from(".container", {
    duration: 1,
    y: 100,
    opacity: 0,
    ease: "power4.out"
});

gsap.from(".input-group input", {
    duration: 0.8,
    scale: 0.8,
    opacity: 0,
    ease: "back.out(1.7)",
    delay: 0.2,
    stagger: 0.2
});

gsap.from(".generate-btn", {
    duration: 0.8,
    scale: 0.8,
    opacity: 0,
    ease: "back.out(1.7)",
    delay: 0.4
});

// Generate random number
function generateNumber() {
    const min = parseInt(document.getElementById('min').value) || 0;
    const max = parseInt(document.getElementById('max').value) || 100;
    
    if(min >= max) {
        alert('Min must be less than Max');
        return;
    }

    const result = Math.floor(Math.random() * (max - min + 1)) + min;
    
    gsap.to(".result", {
        duration: 0.5,
        scale: 1.2,
        text: result,
        ease: "bounce.out"
    });

    // particle effect
    const tempGeometry = new THREE.BufferGeometry();
    const tempPosArray = new Float32Array(100 * 3);
    
    for(let i = 0; i < 100 * 3; i++) {
        tempPosArray[i] = (Math.random() - 0.5) * 5;
    }
    
    tempGeometry.setAttribute('position', new THREE.BufferAttribute(tempPosArray, 3));
    const tempMaterial = new THREE.PointsMaterial({
        size: 0.01,
        color: 0x00ffff,
        transparent: true,
        opacity: 0.5
    });
    const tempMesh = new THREE.Points(tempGeometry, tempMaterial);
    scene.add(tempMesh);

    gsap.to(tempMesh, {
        duration: 1,
        scale: 2,
        opacity: 0,
        onComplete: () => scene.remove(tempMesh)
    });
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    particlesMesh.rotation.x += 0.001;
    particlesMesh.rotation.y += 0.001;
    renderer.render(scene, camera);
}
animate();

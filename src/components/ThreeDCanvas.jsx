import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './ThreeDCanvas.css';

const ThreeDCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    // Reduced fog density to keep cards crisp & bright across depth
    scene.fog = new THREE.FogExp2(0x04060c, 0.012);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 35);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Scene lights for a bright, clean presentation
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00f3ff, 1.4, 120);
    pointLight1.position.set(20, 20, 20);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xb026ff, 1.4, 120);
    pointLight2.position.set(-20, -20, -10);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x00ff88, 1.1, 90);
    pointLight3.position.set(0, 30, -20);
    scene.add(pointLight3);

    // Generator for Code Keyword Cards
    const createKeywordCardTexture = (cardInfo) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 200;
      const ctx = canvas.getContext('2d');

      ctx.clearRect(0, 0, 512, 200);

      const color = cardInfo.color || '#00f3ff';

      // Crisp dark glass card background with vivid border
      ctx.fillStyle = 'rgba(8, 14, 26, 0.85)';
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;

      ctx.beginPath();
      ctx.roundRect(8, 8, 496, 184, 16);
      ctx.fill();
      ctx.stroke();

      // Card Header Pill
      ctx.fillStyle = 'rgba(18, 26, 44, 0.95)';
      ctx.beginPath();
      ctx.roundRect(8, 8, 496, 42, [16, 16, 0, 0]);
      ctx.fill();

      // Three bright window control dots
      ctx.fillStyle = '#ff5f56';
      ctx.beginPath(); ctx.arc(28, 29, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#ffbd2e';
      ctx.beginPath(); ctx.arc(46, 29, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#27c93f';
      ctx.beginPath(); ctx.arc(64, 29, 6, 0, Math.PI * 2); ctx.fill();

      // Top Badge Label Tag
      ctx.fillStyle = color;
      ctx.font = 'bold 13px "Fira Code", monospace';
      ctx.textAlign = 'right';
      ctx.fillText(cardInfo.badge, 484, 33);

      // Main Code Keyword / Symbol Text
      ctx.font = 'bold 29px "Fira Code", "JetBrains Mono", monospace';
      ctx.shadowColor = color;
      ctx.shadowBlur = 14;
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(cardInfo.keyword, 256, 112);

      // Language Subtext Pill
      if (cardInfo.type) {
        ctx.shadowBlur = 0;
        ctx.font = 'bold 12px "Fira Code", monospace';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
        ctx.textAlign = 'right';
        ctx.fillText(`// ${cardInfo.type}`, 484, 172);
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    const floatingObjects = [];

    // Dataset of Code Keywords, Functions & Symbols
    const keywordCardsData = [
      { keyword: 'console.log()', badge: 'METHOD', type: 'JAVASCRIPT', color: '#00f3ff' },
      { keyword: 'print()', badge: 'FUNCTION', type: 'PYTHON', color: '#00ff88' },
      { keyword: '{ ... }', badge: 'SYNTAX', type: 'JSX / OBJECT', color: '#b026ff' },
      { keyword: 'const / let', badge: 'KEYWORD', type: 'JAVASCRIPT', color: '#38bdf8' },
      { keyword: 'def main():', badge: 'KEYWORD', type: 'PYTHON', color: '#ff007f' },
      { keyword: '=>', badge: 'OPERATOR', type: 'ARROW FUNC', color: '#00f3ff' },
      { keyword: '<Component />', badge: 'ELEMENT', type: 'REACT JSX', color: '#00ff88' },
      { keyword: 'import / export', badge: 'MODULE', type: 'ES6 MODULE', color: '#b026ff' },
      { keyword: 'async / await', badge: 'CONTROL', type: 'ASYNC PROMISE', color: '#38bdf8' },
      { keyword: 'useState()', badge: 'HOOK', type: 'REACT STATE', color: '#ff007f' },
      { keyword: 'useEffect()', badge: 'HOOK', type: 'REACT EFFECT', color: '#00f3ff' },
      { keyword: 'return ( ... )', badge: 'KEYWORD', type: 'FUNCTION RETURN', color: '#00ff88' },
      { keyword: '[ ...array ]', badge: 'SYNTAX', type: 'SPREAD ARRAY', color: '#b026ff' },
      { keyword: 'try { } catch', badge: 'CONTROL', type: 'ERROR HANDLING', color: '#38bdf8' },
      { keyword: 'if ( ... ) else', badge: 'LOGIC', type: 'CONDITIONAL', color: '#ff007f' },
      { keyword: 'npm run dev', badge: 'COMMAND', type: 'NODE CLI', color: '#00f3ff' },
      { keyword: 'git commit -m', badge: 'COMMAND', type: 'GIT VCS', color: '#00ff88' },
      { keyword: 'map() / filter()', badge: 'METHOD', type: 'ARRAY HELPER', color: '#b026ff' },
      { keyword: 'class / extends', badge: 'KEYWORD', type: 'OOP CLASS', color: '#38bdf8' },
      { keyword: 'Promise.all()', badge: 'ASYNC', type: 'PROMISE UTIL', color: '#ff007f' },
      { keyword: 'typeof / instanceof', badge: 'OPERATOR', type: 'TYPE CHECK', color: '#00f3ff' },
      { keyword: 'JSON.stringify()', badge: 'API', type: 'DATA FORMAT', color: '#00ff88' },
      { keyword: 'fetch("/api")', badge: 'NETWORK', type: 'HTTP REQUEST', color: '#b026ff' },
      { keyword: 'sensor.read()', badge: 'IOT', type: 'HARDWARE TELEMETRY', color: '#38bdf8' },
    ];

    // Total 32 cards evenly distributed across height & 4 distinct horizontal columns (no overlapping!)
    const cardGeo = new THREE.PlaneGeometry(6.5, 2.6);
    const totalCards = 32;
    const ySpan = 280; // Full height span across all sections
    const columnsX = [-30, -10, 10, 30]; // 4 distinct X columns

    for (let i = 0; i < totalCards; i++) {
      const cardInfo = keywordCardsData[i % keywordCardsData.length];
      const texture = createKeywordCardTexture(cardInfo);

      const mat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.72,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(cardGeo, mat);
      
      // Systematic non-overlapping distribution:
      // Y is evenly spaced down the scroll height
      const initialY = 40 - (i / totalCards) * ySpan;
      // X cycles through 4 columns with minor offset so cards don't stack vertically
      const colX = columnsX[i % 4] + ((i * 3.7) % 7 - 3.5);
      // Z varies slightly to give multi-layer depth without collision
      const colZ = ((i % 3) - 1) * 8 - 5;

      mesh.position.set(colX, initialY, colZ);
      mesh.rotation.set(
        ((i % 5) - 2) * 0.04,
        ((i % 7) - 3) * 0.05,
        ((i % 3) - 1) * 0.03
      );

      const scale = 0.95 + (i % 3) * 0.1;
      mesh.scale.set(scale, scale, scale);

      scene.add(mesh);
      floatingObjects.push({
        mesh,
        rotSpeedX: ((i % 4) - 2) * 0.0008,
        rotSpeedY: ((i % 5) - 2) * 0.0008,
        floatSpeed: 0.0008 + (i % 3) * 0.0003,
        floatAmp: 0.25 + (i % 3) * 0.1,
        initialY: mesh.position.y,
        timeOffset: i * 0.6,
      });
    }

    // 16 Wireframe Nodes distributed cleanly
    const wireframeGeometries = [
      new THREE.IcosahedronGeometry(1.8, 0),
      new THREE.OctahedronGeometry(2, 0),
      new THREE.TorusGeometry(1.8, 0.3, 8, 20),
    ];

    for (let i = 0; i < 16; i++) {
      const baseGeo = wireframeGeometries[i % wireframeGeometries.length];
      const wireGeo = new THREE.WireframeGeometry(baseGeo);
      const colorHex = i % 2 === 0 ? 0x00f3ff : 0xb026ff;
      const mat = new THREE.LineBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: 0.18,
      });

      const wireMesh = new THREE.LineSegments(wireGeo, mat);
      const wireY = 35 - (i / 16) * ySpan;
      const wireX = columnsX[(i + 2) % 4] * 1.1;
      wireMesh.position.set(wireX, wireY, -15);

      scene.add(wireMesh);
      floatingObjects.push({
        mesh: wireMesh,
        rotSpeedX: 0.002,
        rotSpeedY: 0.003,
        floatSpeed: 0.0008,
        floatAmp: 0.2,
        initialY: wireMesh.position.y,
        timeOffset: i * 0.8,
      });
    }

    // 600 Background Particles
    const particleCount = 600;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(0x00f3ff);
    const purpleColor = new THREE.Color(0xb026ff);
    const greenColor = new THREE.Color(0x00ff88);

    for (let i = 0; i < particleCount; i++) {
      posArray[i * 3] = (Math.random() - 0.5) * 100;
      posArray[i * 3 + 1] = 50 - Math.random() * (ySpan + 30);
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 70 - 10;

      const mix = Math.random();
      const pColor = mix < 0.4 ? cyanColor : mix < 0.8 ? purpleColor : greenColor;
      colorArray[i * 3] = pColor.r;
      colorArray[i * 3 + 1] = pColor.g;
      colorArray[i * 3 + 2] = pColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.45,
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Parallax & Mouse Interactivity
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let scrollY = 0;
    let targetScrollY = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth Lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      scrollY += (targetScrollY - scrollY) * 0.05;

      // Camera Parallax
      camera.position.x = mouseX * 4;
      camera.position.y = -scrollY * 0.035 - mouseY * 3;
      camera.rotation.y = mouseX * 0.04;
      camera.rotation.x = -mouseY * 0.04;

      const camY = camera.position.y;

      // Animate Lights following scroll
      pointLight1.position.x = Math.sin(elapsedTime * 0.6) * 35;
      pointLight1.position.y = camY + Math.cos(elapsedTime * 0.4) * 35;
      pointLight2.position.x = -Math.sin(elapsedTime * 0.5) * 35;
      pointLight2.position.y = camY - Math.cos(elapsedTime * 0.7) * 35;

      // Animate Floating Keyword Cards with Infinite Vertical Wrapping
      floatingObjects.forEach((obj) => {
        obj.mesh.rotation.x += obj.rotSpeedX;
        obj.mesh.rotation.y += obj.rotSpeedY;

        let yPos = obj.initialY + Math.sin(elapsedTime * 1.2 + obj.timeOffset) * obj.floatAmp;

        // Infinite Wrap around Camera Y so cards NEVER run out as user scrolls
        if (yPos - camY > 50) {
          obj.initialY -= ySpan;
          yPos -= ySpan;
        } else if (yPos - camY < -50) {
          obj.initialY += ySpan;
          yPos += ySpan;
        }

        obj.mesh.position.y = yPos;
      });

      // Animate Particle Drift
      const positions = particleSystem.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += 0.025;
        if (positions[i * 3 + 1] - camY > 55) {
          positions[i * 3 + 1] = camY - 55;
        }
      }
      particleSystem.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="threed-canvas-container" ref={mountRef}>
      <div className="threed-vignette" />
    </div>
  );
};

export default ThreeDCanvas;






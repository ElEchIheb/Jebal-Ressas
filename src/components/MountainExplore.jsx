import { useEffect, useMemo, useRef, useState } from "react";

function createSkyTexture(THREE) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const context = canvas.getContext("2d");
  const gradient = context.createLinearGradient(0, 0, 0, canvas.height);

  gradient.addColorStop(0, "#b7d6e7");
  gradient.addColorStop(0.42, "#e9f1f5");
  gradient.addColorStop(0.8, "#efe7d6");
  gradient.addColorStop(1, "#d8c5ab");

  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createTerrainTexture(THREE) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const context = canvas.getContext("2d");

  for (let y = 0; y < canvas.height; y += 1) {
    for (let x = 0; x < canvas.width; x += 1) {
      const base = 118 + Math.sin(x * 0.045) * 12 + Math.cos(y * 0.052) * 10;
      const grain = Math.sin((x + y) * 0.14) * 8 + Math.cos((x - y) * 0.09) * 6;
      const light = Math.max(74, Math.min(178, base + grain));
      const red = Math.round(light + 18);
      const green = Math.round(light + 4);
      const blue = Math.round(light - 18);

      context.fillStyle = `rgb(${red}, ${green}, ${blue})`;
      context.fillRect(x, y, 1, 1);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createMistTexture(THREE) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const context = canvas.getContext("2d");
  const gradient = context.createRadialGradient(256, 256, 24, 256, 256, 220);

  gradient.addColorStop(0, "rgba(255,255,255,0.7)");
  gradient.addColorStop(0.55, "rgba(255,255,255,0.22)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function disposeMaterial(material) {
  if (Array.isArray(material)) {
    material.forEach(disposeMaterial);
    return;
  }

  if (!material) {
    return;
  }

  Object.values(material).forEach((value) => {
    if (value?.isTexture) {
      value.dispose();
    }
  });

  material.dispose?.();
}

export function MountainExplore({ copy }) {
  const frameRef = useRef(null);
  const canvasHostRef = useRef(null);
  const hotspotRefs = useRef([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [activePointId, setActivePointId] = useState(copy.points[0]?.id ?? null);

  const activePoint = useMemo(
    () => copy.points.find((point) => point.id === activePointId) ?? copy.points[0],
    [activePointId, copy.points]
  );

  useEffect(() => {
    setActivePointId(copy.points[0]?.id ?? null);
  }, [copy.points]);

  useEffect(() => {
    const element = frameRef.current;

    if (!element) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.22 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !frameRef.current || !canvasHostRef.current) {
      return undefined;
    }

    let cancelled = false;
    let frameId = 0;
    let renderer;
    let teardown = () => {};

    setIsReady(false);

    const setup = async () => {
      const THREE = await import("three");
      const { OrbitControls } = await import("three/examples/jsm/controls/OrbitControls.js");

      if (cancelled || !frameRef.current || !canvasHostRef.current) {
        return;
      }

      const stage = frameRef.current;
      const canvasHost = canvasHostRef.current;
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0xdfe7e4, 0.05);

      const camera = new THREE.PerspectiveCamera(
        40,
        stage.clientWidth / stage.clientHeight,
        0.1,
        60
      );
      camera.position.set(6.4, 4.1, 7.2);

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
      });
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
      renderer.setSize(stage.clientWidth, stage.clientHeight, false);
      canvasHost.appendChild(renderer.domElement);

      const sky = new THREE.Mesh(
        new THREE.SphereGeometry(34, 48, 48),
        new THREE.MeshBasicMaterial({
          map: createSkyTexture(THREE),
          side: THREE.BackSide,
          fog: false
        })
      );
      scene.add(sky);

      scene.add(new THREE.HemisphereLight(0xf5f0e8, 0x5f674f, 1.35));
      scene.add(new THREE.AmbientLight(0xffffff, 0.38));

      const sun = new THREE.DirectionalLight(0xfff1d1, 2.25);
      sun.position.set(7, 8, 3.5);
      sun.castShadow = true;
      sun.shadow.mapSize.set(1024, 1024);
      sun.shadow.camera.near = 0.5;
      sun.shadow.camera.far = 26;
      sun.shadow.camera.left = -8;
      sun.shadow.camera.right = 8;
      sun.shadow.camera.top = 8;
      sun.shadow.camera.bottom = -8;
      scene.add(sun);

      const rim = new THREE.DirectionalLight(0xc7d9ea, 0.62);
      rim.position.set(-5, 4, -6);
      scene.add(rim);

      const terrainGeometry = new THREE.PlaneGeometry(8, 8, 180, 180);
      const positions = terrainGeometry.attributes.position;

      for (let index = 0; index < positions.count; index += 1) {
        const x = positions.getX(index);
        const y = positions.getY(index);
        const distance = Math.sqrt(x * x + y * y);
        const ridge = Math.max(0, 1 - distance / 4.25);
        const summit = Math.exp(-((x * x) * 0.18 + (y * y) * 0.3)) * 2.2;
        const eastRidge =
          Math.exp(-(((x - 1.1) * (x - 1.1)) * 0.9 + ((y + 0.4) * (y + 0.4)) * 1.4)) * 1.05;
        const westShelf =
          Math.exp(-(((x + 1.45) * (x + 1.45)) * 1.2 + ((y - 0.5) * (y - 0.5)) * 1.6)) * 0.82;
        const textureNoise =
          Math.sin(x * 2.2) * Math.cos(y * 1.7) * 0.14 +
          Math.sin((x + y) * 4.3) * 0.08 +
          Math.cos((x - y) * 3.4) * 0.05;
        const height = Math.max(0, ridge * 0.95 + summit + eastRidge + westShelf + textureNoise);

        positions.setZ(index, height);
      }

      terrainGeometry.rotateX(-Math.PI / 2);
      terrainGeometry.computeVertexNormals();

      const terrainTexture = createTerrainTexture(THREE);
      terrainTexture.wrapS = THREE.RepeatWrapping;
      terrainTexture.wrapT = THREE.RepeatWrapping;
      terrainTexture.repeat.set(2.6, 2.6);

      const terrain = new THREE.Mesh(
        terrainGeometry,
        new THREE.MeshStandardMaterial({
          color: 0xffffff,
          map: terrainTexture,
          roughness: 0.95,
          metalness: 0.02
        })
      );
      terrain.castShadow = true;
      terrain.receiveShadow = true;
      scene.add(terrain);

      const ground = new THREE.Mesh(
        new THREE.CircleGeometry(9, 64),
        new THREE.MeshStandardMaterial({
          color: 0x74805f,
          roughness: 1,
          metalness: 0
        })
      );
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -0.03;
      ground.receiveShadow = true;
      scene.add(ground);

      const mistTexture = createMistTexture(THREE);
      const mistConfigs = [
        { x: -0.8, y: 0.85, z: 1.2, w: 5.3, h: 3.2, speed: 0.16 },
        { x: 1.1, y: 1.15, z: -0.5, w: 4.8, h: 2.8, speed: 0.12 }
      ];
      const mistPlanes = mistConfigs.map((config) => {
        const mist = new THREE.Mesh(
          new THREE.PlaneGeometry(config.w, config.h),
          new THREE.MeshBasicMaterial({
            map: mistTexture,
            transparent: true,
            opacity: 0.22,
            depthWrite: false,
            color: 0xffffff
          })
        );

        mist.rotation.x = -Math.PI / 2;
        mist.position.set(config.x, config.y, config.z);
        scene.add(mist);
        return { mesh: mist, config };
      });

      const hotspotMarkers = copy.points.map((point, index) => {
        const marker = new THREE.Mesh(
          new THREE.SphereGeometry(0.07, 18, 18),
          new THREE.MeshStandardMaterial({
            color: index === 0 ? 0xf3ead7 : index === 1 ? 0xc9d4c0 : 0xe8d4c1,
            emissive: index === 0 ? 0xb4976a : index === 1 ? 0x7b8b70 : 0xb88d74,
            emissiveIntensity: 0.85,
            roughness: 0.3,
            metalness: 0
          })
        );

        marker.position.set(...point.position);
        scene.add(marker);
        return marker;
      });

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.06;
      controls.enablePan = false;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.32;
      controls.minDistance = 4.6;
      controls.maxDistance = 10.4;
      controls.minPolarAngle = 0.7;
      controls.maxPolarAngle = 1.34;
      controls.target.set(0, 1.4, 0);

      const hotspotVectors = copy.points.map((point) => new THREE.Vector3(...point.position));

      const updateHotspots = () => {
        const width = stage.clientWidth;
        const height = stage.clientHeight;

        hotspotVectors.forEach((position, index) => {
          const hotspot = hotspotRefs.current[index];

          if (!hotspot) {
            return;
          }

          const vector = position.clone().project(camera);
          const x = (vector.x * 0.5 + 0.5) * width;
          const y = (-vector.y * 0.5 + 0.5) * height;
          const visible =
            vector.z > -1 &&
            vector.z < 1 &&
            x > -48 &&
            x < width + 48 &&
            y > -48 &&
            y < height + 48;

          hotspot.style.opacity = visible ? "1" : "0";
          hotspot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        });
      };

      const handleResize = () => {
        camera.aspect = stage.clientWidth / stage.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(stage.clientWidth, stage.clientHeight, false);
        updateHotspots();
      };

      window.addEventListener("resize", handleResize);

      const clock = new THREE.Clock();
      setIsReady(true);

      const renderFrame = () => {
        if (cancelled) {
          return;
        }

        const elapsed = clock.getElapsedTime();

        sun.position.x = 7 + Math.sin(elapsed * 0.12) * 0.5;
        mistPlanes.forEach(({ mesh, config }, index) => {
          mesh.position.x = config.x + Math.sin(elapsed * config.speed + index) * 0.18;
          mesh.position.z = config.z + Math.cos(elapsed * (config.speed + 0.08) + index) * 0.16;
          mesh.material.opacity = 0.17 + (Math.sin(elapsed * 0.28 + index) + 1) * 0.045;
        });

        hotspotMarkers.forEach((marker, index) => {
          const scale = 1 + Math.sin(elapsed * 1.1 + index) * 0.08;
          marker.scale.setScalar(scale);
        });

        controls.update();
        updateHotspots();
        renderer.render(scene, camera);
        frameId = window.requestAnimationFrame(renderFrame);
      };

      handleResize();
      renderFrame();

      teardown = () => {
        window.cancelAnimationFrame(frameId);
        window.removeEventListener("resize", handleResize);
        controls.dispose();
        scene.traverse((child) => {
          child.geometry?.dispose?.();
          disposeMaterial(child.material);
        });
        renderer.dispose();

        if (canvasHost.contains(renderer.domElement)) {
          canvasHost.removeChild(renderer.domElement);
        }
      };
    };

    setup();

    return () => {
      cancelled = true;
      setIsReady(false);
      teardown();
    };
  }, [copy.points, isVisible]);

  return (
    <div className="relief-layout">
      <div className="scene-panel glass-panel" data-reveal>
        <div className="scene-stage" ref={frameRef}>
          <div className="scene-canvas" ref={canvasHostRef} />

          {!isReady ? <div className="scene-status">{copy.loading}</div> : null}

          <div className="scene-hint glass-panel">{copy.hint}</div>

          {copy.points.map((point, index) => (
            <button
              key={point.id}
              ref={(node) => {
                hotspotRefs.current[index] = node;
              }}
              className={`scene-hotspot ${activePoint?.id === point.id ? "is-active" : ""}`}
              type="button"
              aria-label={point.title}
              onMouseEnter={() => setActivePointId(point.id)}
              onFocus={() => setActivePointId(point.id)}
              onClick={() => setActivePointId(point.id)}
            >
              <span className="scene-hotspot__dot" aria-hidden="true" />
              <span className="scene-hotspot__label">{point.shortLabel}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="scene-aside">
        <article className="quote-card glass-panel" data-reveal>
          <span className="insight-card__eyebrow">{copy.leadLabel}</span>
          <h3>{copy.leadTitle}</h3>
          <p>{copy.leadText}</p>
        </article>

        <article className="scene-note glass-panel" data-reveal>
          <span className="insight-card__eyebrow">{copy.activeLabel}</span>
          <h3>{activePoint?.title}</h3>
          <p>{activePoint?.text}</p>
        </article>

        <div className="scene-card-list">
          {copy.points.map((point) => (
            <button
              key={point.id}
              className={`detail-card relief-card glass-panel ${activePoint?.id === point.id ? "is-active" : ""}`}
              type="button"
              data-reveal
              onMouseEnter={() => setActivePointId(point.id)}
              onFocus={() => setActivePointId(point.id)}
              onClick={() => setActivePointId(point.id)}
            >
              <span className="insight-card__eyebrow">{point.shortLabel}</span>
              <h3>{point.title}</h3>
              <p>{point.text}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

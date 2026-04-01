import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "../lib/useInView";

function createCanvasTexture(THREE, painter) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const context = canvas.getContext("2d");
  painter(context, canvas);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;
  return texture;
}

function paintTerrain(context, canvas) {
  const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#a9b59f");
  gradient.addColorStop(0.42, "#7d8768");
  gradient.addColorStop(0.68, "#8c735b");
  gradient.addColorStop(1, "#58473b");
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  for (let index = 0; index < 2400; index += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const alpha = 0.03 + Math.random() * 0.08;
    const size = 1 + Math.random() * 5;

    context.fillStyle = `rgba(255,255,255,${alpha})`;
    context.beginPath();
    context.arc(x, y, size, 0, Math.PI * 2);
    context.fill();
  }

  context.strokeStyle = "rgba(41, 30, 22, 0.14)";
  context.lineWidth = 1.1;

  for (let index = 0; index < 42; index += 1) {
    context.beginPath();
    context.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
    context.bezierCurveTo(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      Math.random() * canvas.width,
      Math.random() * canvas.height
    );
    context.stroke();
  }
}

function paintRoughness(context, canvas) {
  context.fillStyle = "#9c9c9c";
  context.fillRect(0, 0, canvas.width, canvas.height);

  for (let index = 0; index < 3000; index += 1) {
    const tone = Math.floor(65 + Math.random() * 170);
    context.fillStyle = `rgb(${tone}, ${tone}, ${tone})`;
    context.fillRect(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      2 + Math.random() * 6,
      2 + Math.random() * 6
    );
  }
}

function paintSky(context, canvas) {
  const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#6d98be");
  gradient.addColorStop(0.45, "#a8c7dd");
  gradient.addColorStop(0.7, "#e7ddc6");
  gradient.addColorStop(1, "#f3e7d3");
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  for (let index = 0; index < 8; index += 1) {
    context.fillStyle = `rgba(255,255,255,${0.035 + Math.random() * 0.04})`;
    context.beginPath();
    context.ellipse(
      Math.random() * canvas.width,
      80 + Math.random() * 180,
      90 + Math.random() * 120,
      24 + Math.random() * 30,
      Math.random() * Math.PI,
      0,
      Math.PI * 2
    );
    context.fill();
  }
}

function paintCloud(context, canvas) {
  const gradient = context.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    18,
    canvas.width / 2,
    canvas.height / 2,
    canvas.width / 2
  );
  gradient.addColorStop(0, "rgba(255,255,255,0.48)");
  gradient.addColorStop(0.5, "rgba(255,255,255,0.2)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function getTerrainHeight(x, z) {
  const core = Math.exp(-(((x + 0.25) * (x + 0.25)) / 5.5 + ((z + 0.15) * (z + 0.15)) / 1.8)) * 3.4;
  const ridge = Math.exp(-(((x - 1.6) * (x - 1.6)) / 1.2 + ((z + 0.3) * (z + 0.3)) / 0.75)) * 1.5;
  const shoulder = Math.exp(-(((x + 1.6) * (x + 1.6)) / 2 + ((z - 0.7) * (z - 0.7)) / 1.4)) * 0.8;
  const ripples = Math.sin(x * 2.3) * 0.14 + Math.cos(z * 2.7) * 0.12;
  const cliff = Math.max(0, 1.7 - Math.abs(x - 0.9)) * Math.exp(-((z + 0.4) * (z + 0.4)) / 1.2) * 0.52;
  return Math.max(0, core + ridge + shoulder + ripples + cliff) - 1.18;
}

export function ThreeScene({ copy }) {
  const shellRef = useRef(null);
  const stageRef = useRef(null);
  const hotspotRefs = useRef([]);
  const activePointRef = useRef(copy.labels[0]?.title ?? "");
  const inView = useInView(shellRef, { rootMargin: "220px" });
  const [isReady, setIsReady] = useState(false);
  const [activePoint, setActivePoint] = useState(copy.labels[0]?.title ?? "");
  const activeLabel = useMemo(
    () => copy.labels.find((label) => label.title === activePoint) ?? copy.labels[0],
    [activePoint, copy.labels]
  );

  useEffect(() => {
    activePointRef.current = activePoint;
  }, [activePoint]);

  useEffect(() => {
    const nextTitle = copy.labels[0]?.title ?? "";
    activePointRef.current = nextTitle;
    setActivePoint(nextTitle);
  }, [copy.labels]);

  useEffect(() => {
    if (!inView || !stageRef.current) {
      return undefined;
    }

    let cancelled = false;
    let frameId = 0;
    let renderer;
    let controls;
    let cleanupPointer = () => {};
    let cleanupResize = () => {};
    const disposables = [];
    const preferReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const loadScene = async () => {
      const THREE = await import("three");
      const { OrbitControls } = await import("three/examples/jsm/controls/OrbitControls.js");

      if (cancelled || !stageRef.current) {
        return;
      }

      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0xd9e7ec, 8, 24);

      const camera = new THREE.PerspectiveCamera(
        42,
        stageRef.current.clientWidth / stageRef.current.clientHeight,
        0.1,
        100
      );
      camera.position.set(6.4, 4.4, 7.2);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
      renderer.setSize(stageRef.current.clientWidth, stageRef.current.clientHeight);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      stageRef.current.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.enablePan = false;
      controls.minDistance = 4;
      controls.maxDistance = 10;
      controls.maxPolarAngle = Math.PI / 2.03;
      controls.target.set(0.25, 1.35, 0);
      controls.autoRotate = !preferReducedMotion;
      controls.autoRotateSpeed = 0.35;
      controls.addEventListener("start", () => {
        controls.autoRotate = false;
      });

      const terrainTexture = createCanvasTexture(THREE, paintTerrain);
      terrainTexture.repeat.set(2.6, 2.2);
      const roughnessTexture = createCanvasTexture(THREE, paintRoughness);
      roughnessTexture.repeat.set(3, 3);
      const skyTexture = createCanvasTexture(THREE, paintSky);
      const cloudTexture = createCanvasTexture(THREE, paintCloud);

      disposables.push(terrainTexture, roughnessTexture, skyTexture, cloudTexture);

      const skyDome = new THREE.Mesh(
        new THREE.SphereGeometry(34, 48, 48),
        new THREE.MeshBasicMaterial({
          map: skyTexture,
          side: THREE.BackSide
        })
      );
      scene.add(skyDome);

      const hemiLight = new THREE.HemisphereLight(0xe6f4ff, 0x3a2c23, 1.18);
      const keyLight = new THREE.DirectionalLight(0xfff2cf, 2.1);
      const fillLight = new THREE.DirectionalLight(0x93b4ba, 0.72);
      const rimLight = new THREE.DirectionalLight(0xf1c089, 0.5);

      keyLight.position.set(6, 10, 6);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(2048, 2048);
      keyLight.shadow.camera.near = 1;
      keyLight.shadow.camera.far = 30;
      keyLight.shadow.camera.left = -8;
      keyLight.shadow.camera.right = 8;
      keyLight.shadow.camera.top = 8;
      keyLight.shadow.camera.bottom = -8;

      fillLight.position.set(-5, 4, -3);
      rimLight.position.set(-2, 2.5, 7);

      scene.add(hemiLight, keyLight, fillLight, rimLight);

      const terrainGeometry = new THREE.PlaneGeometry(10.8, 8.8, 180, 180);
      const terrainVertices = terrainGeometry.attributes.position;

      for (let index = 0; index < terrainVertices.count; index += 1) {
        const x = terrainVertices.getX(index);
        const z = terrainVertices.getY(index);
        terrainVertices.setZ(index, getTerrainHeight(x, z));
      }

      terrainGeometry.rotateX(-Math.PI / 2);
      terrainGeometry.computeVertexNormals();

      const terrain = new THREE.Mesh(
        terrainGeometry,
        new THREE.MeshStandardMaterial({
          color: 0xb2bea5,
          map: terrainTexture,
          bumpMap: roughnessTexture,
          bumpScale: 0.12,
          roughnessMap: roughnessTexture,
          roughness: 0.96,
          metalness: 0.04
        })
      );
      terrain.castShadow = true;
      terrain.receiveShadow = true;
      scene.add(terrain);

      disposables.push(terrainGeometry, terrain.material);

      const plateau = new THREE.Mesh(
        new THREE.CylinderGeometry(6.6, 7.6, 0.48, 48),
        new THREE.MeshStandardMaterial({
          color: 0x243128,
          roughness: 1
        })
      );
      plateau.position.y = -1.45;
      plateau.receiveShadow = true;
      scene.add(plateau);
      disposables.push(plateau.geometry, plateau.material);

      const outcrop = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.84, 3),
        new THREE.MeshStandardMaterial({
          color: 0x8b7059,
          roughness: 1,
          metalness: 0.02
        })
      );
      outcrop.position.set(1.9, 1.12, 0.72);
      outcrop.scale.set(1.15, 1.85, 0.75);
      outcrop.rotation.set(0.15, 0.45, -0.18);
      outcrop.castShadow = true;
      scene.add(outcrop);
      disposables.push(outcrop.geometry, outcrop.material);

      const mistRing = new THREE.Mesh(
        new THREE.RingGeometry(2.9, 4.75, 64),
        new THREE.MeshBasicMaterial({
          color: 0xf7f4ed,
          opacity: 0.12,
          transparent: true,
          side: THREE.DoubleSide
        })
      );
      mistRing.rotation.x = -Math.PI / 2;
      mistRing.position.y = -1.06;
      scene.add(mistRing);
      disposables.push(mistRing.geometry, mistRing.material);

      const cloudGroup = new THREE.Group();

      for (let index = 0; index < 4; index += 1) {
        const cloud = new THREE.Sprite(
          new THREE.SpriteMaterial({
            map: cloudTexture,
            color: 0xffffff,
            transparent: true,
            opacity: 0.28
          })
        );
        cloud.position.set(-3 + index * 2.1, 3.4 + Math.random() * 0.5, -2.8 + Math.random() * 1.8);
        cloud.scale.set(3.3 + Math.random() * 1.4, 1.4 + Math.random() * 0.6, 1);
        cloudGroup.add(cloud);
        disposables.push(cloud.material);
      }

      scene.add(cloudGroup);

      const markerGroup = new THREE.Group();
      const markerMeshes = copy.labels.map((label) => {
        const marker = new THREE.Mesh(
          new THREE.SphereGeometry(0.11, 20, 20),
          new THREE.MeshStandardMaterial({
            color: 0xf4efe0,
            emissive: 0x7f8f69,
            emissiveIntensity: 0.62,
            roughness: 0.4,
            metalness: 0.1
          })
        );
        marker.position.set(...label.position);
        marker.castShadow = true;
        marker.userData = { label };
        markerGroup.add(marker);
        disposables.push(marker.geometry, marker.material);
        return marker;
      });

      scene.add(markerGroup);

      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2(5, 5);
      let currentHover = "";

      const updateHover = (nextTitle) => {
        if (currentHover !== nextTitle) {
          currentHover = nextTitle;
          setActivePoint(nextTitle || copy.labels[0]?.title || "");
        }
      };

      const handlePointerMove = (event) => {
        if (!renderer || !renderer.domElement) {
          return;
        }

        const bounds = renderer.domElement.getBoundingClientRect();
        pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
        pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
      };

      const handlePointerLeave = () => {
        pointer.x = 5;
        pointer.y = 5;
        updateHover("");
        if (renderer?.domElement) {
          renderer.domElement.style.cursor = "grab";
        }
      };

      renderer.domElement.addEventListener("pointermove", handlePointerMove);
      renderer.domElement.addEventListener("pointerleave", handlePointerLeave);

      cleanupPointer = () => {
        renderer?.domElement?.removeEventListener("pointermove", handlePointerMove);
        renderer?.domElement?.removeEventListener("pointerleave", handlePointerLeave);
      };

      const projected = new THREE.Vector3();

      const updateHotspots = () => {
        const width = stageRef.current?.clientWidth ?? 0;
        const height = stageRef.current?.clientHeight ?? 0;

        markerMeshes.forEach((marker, index) => {
          const node = hotspotRefs.current[index];

          if (!node) {
            return;
          }

          marker.getWorldPosition(projected);
          projected.project(camera);

          const x = (projected.x * 0.5 + 0.5) * width;
          const y = (-projected.y * 0.5 + 0.5) * height;
          const hidden = projected.z > 1 || projected.z < -1;

          node.style.opacity = hidden ? "0" : "1";
          node.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        });
      };

      const resize = () => {
        if (!stageRef.current || !renderer) {
          return;
        }

        const { clientWidth, clientHeight } = stageRef.current;
        camera.aspect = clientWidth / clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(clientWidth, clientHeight);
        updateHotspots();
      };

      window.addEventListener("resize", resize);
      cleanupResize = () => window.removeEventListener("resize", resize);
      resize();
      setIsReady(true);

      const animate = () => {
        if (cancelled) {
          return;
        }

        raycaster.setFromCamera(pointer, camera);
        const hit = raycaster.intersectObjects(markerMeshes, false)[0];
        const hitTitle = hit?.object?.userData?.label?.title ?? "";

        updateHover(hitTitle);

        markerMeshes.forEach((marker, index) => {
          const isActive = copy.labels[index].title === (hitTitle || activePointRef.current);
          marker.scale.setScalar(isActive ? 1.45 : 1);
        });

        if (renderer?.domElement) {
          renderer.domElement.style.cursor = hitTitle ? "pointer" : "grab";
        }

        if (!preferReducedMotion) {
          cloudGroup.rotation.y += 0.00045;
          mistRing.rotation.z += 0.0012;
          markerGroup.children.forEach((marker, index) => {
            marker.position.y = copy.labels[index].position[1] + Math.sin(Date.now() * 0.0018 + index) * 0.03;
          });
        }

        controls.update();
        renderer.render(scene, camera);
        updateHotspots();
        frameId = window.requestAnimationFrame(animate);
      };

      animate();
    };

    loadScene();

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frameId);
      cleanupPointer();
      cleanupResize();
      controls?.dispose();
      disposables.forEach((item) => item.dispose?.());

      if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
      }
    };
  }, [copy, inView]);

  return (
    <section className="scene-panel glass-panel" ref={shellRef} data-reveal>
      <div className="scene-stage" ref={stageRef}>
        {!isReady ? <div className="panel-status">{copy.loading}</div> : null}

        {copy.labels.map((label, index) => (
          <button
            className={`scene-hotspot ${activePoint === label.title ? "is-active" : ""}`}
            key={label.title}
            type="button"
            ref={(node) => {
              hotspotRefs.current[index] = node;
            }}
            onMouseEnter={() => setActivePoint(label.title)}
          >
            <span className="scene-hotspot__dot" />
            <span className="scene-hotspot__content">
              <strong>{label.title}</strong>
              <small>{label.text}</small>
            </span>
          </button>
        ))}
      </div>

      <div className="scene-meta">
        <span className="scene-meta__label">{copy.hoverTitle}</span>
        <strong>{activeLabel?.title}</strong>
        <p>{activeLabel?.text}</p>
      </div>
    </section>
  );
}

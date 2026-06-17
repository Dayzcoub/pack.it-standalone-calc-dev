import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { createRenderAssetPlan } from "../assets/rendererAssetPolicy";
import { resolveConnectionPortWorld } from "../scene/connectionPorts";
import type { SceneModel, SceneObject } from "../scene/contracts";

type SceneViewportProps = {
  sceneModel: SceneModel;
  onSelectObject: (objectId?: string) => void;
  onMoveObject: (objectId: string, delta: { x: number; y: number; z: number }) => void;
};

const setObjectId = (object: THREE.Object3D, objectId: string) => {
  object.userData.objectId = objectId;
  object.traverse((child) => {
    child.userData.objectId = objectId;
  });
};

const disposeSceneObject = (object: THREE.Object3D) => {
  object.traverse((child) => {
    const mesh = child as THREE.Mesh;
    if (mesh.geometry) {
      mesh.geometry.dispose();
    }
    const material = mesh.material as THREE.Material | THREE.Material[] | undefined;
    if (Array.isArray(material)) {
      material.forEach((item) => item.dispose());
    } else {
      material?.dispose();
    }
  });
};

const makeBox = (
  size: { width: number; height: number; depth: number },
  color: number,
  materialOptions: Partial<THREE.MeshStandardMaterialParameters> = {}
) => {
  const geometry = new THREE.BoxGeometry(size.width, size.height, size.depth);
  const material = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.68,
    metalness: 0.08,
    ...materialOptions
  });
  return new THREE.Mesh(geometry, material);
};

const addOutline = (mesh: THREE.Mesh, color = 0xe0f2fe) => {
  const outline = new THREE.LineSegments(
    new THREE.EdgesGeometry(mesh.geometry),
    new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.72 })
  );
  mesh.add(outline);
};

const createLine = (points: THREE.Vector3[], color: number) => {
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.58 });
  return new THREE.Line(geometry, material);
};

const createSelectionMarker = () => {
  const geometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-0.5, 0, -0.5),
    new THREE.Vector3(0.5, 0, -0.5),
    new THREE.Vector3(0.5, 0, 0.5),
    new THREE.Vector3(-0.5, 0, 0.5),
    new THREE.Vector3(-0.5, 0, -0.5)
  ]);
  const material = new THREE.LineBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.95 });
  const marker = new THREE.LineLoop(geometry, material);
  marker.visible = false;
  return marker;
};

const clearGroup = (group: THREE.Group) => {
  [...group.children].forEach((child) => {
    group.remove(child);
    disposeSceneObject(child);
  });
};

const createPortMarker = (object: SceneObject, portId: string) => {
  const port = resolveConnectionPortWorld(object, portId);
  if (!port) {
    return undefined;
  }

  const color = port.role === "support" || port.role === "floor" ? 0x22c55e : port.role === "corner-face" ? 0xf97316 : 0x38bdf8;
  const group = new THREE.Group();
  const marker = new THREE.Mesh(
    new THREE.SphereGeometry(0.065, 12, 8),
    new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.95 })
  );
  const directionEnd = new THREE.Vector3(
    port.worldPosition.x + port.worldNormal.x * 0.28,
    port.worldPosition.y + port.worldNormal.y * 0.28,
    port.worldPosition.z + port.worldNormal.z * 0.28
  );
  const normal = createLine(
    [new THREE.Vector3(port.worldPosition.x, port.worldPosition.y, port.worldPosition.z), directionEnd],
    color
  );

  marker.position.set(port.worldPosition.x, port.worldPosition.y, port.worldPosition.z);
  group.add(marker);
  group.add(normal);
  return group;
};

const axisForDimensions = (object: SceneObject): "x" | "y" | "z" => {
  const dimensions = object.dimensions ?? { width: 1, height: 1, depth: 1 };
  const maxDimension = Math.max(dimensions.width, dimensions.height, dimensions.depth);
  if (maxDimension === dimensions.height) {
    return "y";
  }
  if (maxDimension === dimensions.depth) {
    return "z";
  }
  return "x";
};

const localPoint = (axis: "x" | "y" | "z", along: number, sideA: number, sideB: number) => {
  if (axis === "x") {
    return new THREE.Vector3(along, sideA, sideB);
  }
  if (axis === "y") {
    return new THREE.Vector3(sideA, along, sideB);
  }
  return new THREE.Vector3(sideA, sideB, along);
};

const createStraightTrussVisual = (object: SceneObject) => {
  const dimensions = object.dimensions ?? { width: 1, height: 0.29, depth: 0.29 };
  const axis = axisForDimensions(object);
  const length = axis === "x" ? dimensions.width : axis === "y" ? dimensions.height : dimensions.depth;
  const profile = 0.29;
  const chord = 0.055;
  const offset = profile / 2 - chord / 2;
  const group = new THREE.Group();
  const color = 0x8b5cf6;
  const lineColor = 0xc4b5fd;

  const chordSize =
    axis === "x"
      ? { width: length, height: chord, depth: chord }
      : axis === "y"
        ? { width: chord, height: length, depth: chord }
        : { width: chord, height: chord, depth: length };

  [
    [offset, offset],
    [offset, -offset],
    [-offset, offset],
    [-offset, -offset]
  ].forEach(([sideA, sideB]) => {
    const mesh = makeBox(chordSize, color);
    mesh.position.copy(localPoint(axis, 0, sideA, sideB));
    group.add(mesh);
  });

  const half = length / 2;
  const step = Math.min(1, Math.max(length / 2, 0.5));
  for (let cursor = -half; cursor < half - 0.001; cursor += step) {
    const next = Math.min(cursor + step, half);
    group.add(createLine([localPoint(axis, cursor, offset, offset), localPoint(axis, next, -offset, offset)], lineColor));
    group.add(createLine([localPoint(axis, cursor, -offset, offset), localPoint(axis, next, offset, offset)], lineColor));
  }

  return group;
};

const createObjectVisual = (object: SceneObject) => {
  const dimensions = object.dimensions ?? { width: 1, height: 1, depth: 1 };
  const renderPlan = createRenderAssetPlan(object);
  const placeholderColor =
    renderPlan.strategy === "future-glb-placeholder"
      ? 0xa78bfa
      : renderPlan.strategy === "procedural-placeholder"
        ? object.type === "generic3d"
          ? 0x38bdf8
          : 0xa78bfa
        : 0xf59e0b;

  if (object.type === "truss" && object.meta?.partRole === "straight") {
    const visual = createStraightTrussVisual(object);
    visual.userData.renderAssetPlan = renderPlan;
    return visual;
  }
  if (object.type === "truss" && object.meta?.partRole === "base") {
    const visual = makeBox(dimensions, placeholderColor, { metalness: 0.18 });
    addOutline(visual, 0xddd6fe);
    visual.userData.renderAssetPlan = renderPlan;
    return visual;
  }
  if (object.type === "truss" && object.meta?.partRole === "corner") {
    const visual = makeBox({ width: 0.34, height: 0.34, depth: 0.34 }, placeholderColor, { metalness: 0.12 });
    addOutline(visual, 0xddd6fe);
    visual.userData.renderAssetPlan = renderPlan;
    return visual;
  }
  const visual = makeBox(dimensions, placeholderColor, {
    emissive: new THREE.Color(placeholderColor),
    emissiveIntensity: object.type === "generic3d" ? 0.18 : 0.08
  });
  addOutline(visual);
  visual.userData.renderAssetPlan = renderPlan;
  return visual;
};

const createSceneGuides = () => {
  const guides = new THREE.Group();
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(12, 12),
    new THREE.MeshBasicMaterial({ color: 0x162033, transparent: true, opacity: 0.46, side: THREE.DoubleSide })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.002;
  guides.add(floor);

  guides.add(createLine([new THREE.Vector3(-6, 0.012, 0), new THREE.Vector3(6, 0.012, 0)], 0x38bdf8));
  guides.add(createLine([new THREE.Vector3(0, 0.012, -6), new THREE.Vector3(0, 0.012, 6)], 0xf97316));

  return guides;
};

export const SceneViewport = ({ sceneModel, onSelectObject, onMoveObject }: SceneViewportProps) => {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const threeRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    controls: OrbitControls;
    objects: Map<string, THREE.Object3D>;
    selectionMarker: THREE.LineLoop;
    portMarkers: THREE.Group;
    raycaster: THREE.Raycaster;
    pointer: THREE.Vector2;
  } | null>(null);
  const onSelectObjectRef = useRef(onSelectObject);
  const onMoveObjectRef = useRef(onMoveObject);
  const sceneModelRef = useRef(sceneModel);

  useEffect(() => {
    onSelectObjectRef.current = onSelectObject;
  }, [onSelectObject]);

  useEffect(() => {
    onMoveObjectRef.current = onMoveObject;
  }, [onMoveObject]);

  useEffect(() => {
    sceneModelRef.current = sceneModel;
  }, [sceneModel]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) {
      return undefined;
    }

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.touchAction = "none";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111827);

    const camera = new THREE.PerspectiveCamera(48, host.clientWidth / host.clientHeight, 0.1, 200);
    camera.position.set(4, 4, 5);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableRotate = true;
    controls.enablePan = true;
    controls.enableZoom = true;
    controls.mouseButtons = {
      LEFT: THREE.MOUSE.ROTATE,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.PAN
    };
    controls.touches = {
      ONE: THREE.TOUCH.ROTATE,
      TWO: THREE.TOUCH.DOLLY_PAN
    };
    controls.target.set(0, 0, 0);
    controls.update();

    scene.add(createSceneGuides());

    const grid = new THREE.GridHelper(12, 24, 0x64748b, 0x334155);
    scene.add(grid);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x1f2937, 2.5);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(3, 7, 4);
    scene.add(keyLight);

    const selectionMarker = createSelectionMarker();
    scene.add(selectionMarker);
    const portMarkers = new THREE.Group();
    scene.add(portMarkers);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    threeRef.current = {
      renderer,
      scene,
      camera,
      controls,
      objects: new Map(),
      selectionMarker,
      portMarkers,
      raycaster,
      pointer
    };

    const resizeObserver = new ResizeObserver(() => {
      const width = Math.max(host.clientWidth, 1);
      const height = Math.max(host.clientHeight, 1);
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });
    resizeObserver.observe(host);

    let animationFrame = 0;
    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    let pointerStart: { x: number; y: number } | undefined;
    let dragState:
      | {
          objectId: string;
          affectedObjectIds: string[];
          lastPoint: THREE.Vector3;
          totalDelta: THREE.Vector3;
          plane: THREE.Plane;
          moved: boolean;
        }
      | undefined;

    const updatePointer = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
    };

    const intersectPointerPlane = (event: PointerEvent, plane: THREE.Plane) => {
      updatePointer(event);
      const point = new THREE.Vector3();
      return raycaster.ray.intersectPlane(plane, point);
    };

    const pickObject = (event: PointerEvent) => {
      updatePointer(event);
      const intersections = raycaster.intersectObjects([...threeRef.current!.objects.values()], true);
      const selected = intersections[0]?.object.userData.objectId as string | undefined;
      onSelectObjectRef.current(selected);
      return selected;
    };

    const handlePointerDown = (event: PointerEvent) => {
      pointerStart = { x: event.clientX, y: event.clientY };
      updatePointer(event);

      const intersections = raycaster.intersectObjects([...threeRef.current!.objects.values()], true);
      const objectId = intersections[0]?.object.userData.objectId as string | undefined;
      const object = sceneModelRef.current.objects.find((sceneObject) => sceneObject.id === objectId);
      const objectLayer = sceneModelRef.current.layers.find((layer) => objectId && layer.objectIds.includes(objectId));

      if (!object || object.capabilities.transformRules?.canMove !== true || objectLayer?.locked) {
        return;
      }

      const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -object.transform.position.y);
      const point = intersectPointerPlane(event, plane);
      if (!point) {
        return;
      }

      const group = sceneModelRef.current.groups.find((sceneGroup) => sceneGroup.objectIds.includes(object.id));

      renderer.domElement.setPointerCapture(event.pointerId);
      controls.enabled = false;
      onSelectObjectRef.current(object.id);
      dragState = {
        objectId: object.id,
        affectedObjectIds: group?.objectIds ?? [object.id],
        lastPoint: point.clone(),
        totalDelta: new THREE.Vector3(0, 0, 0),
        plane,
        moved: false
      };
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!dragState) {
        return;
      }

      const nextPoint = intersectPointerPlane(event, dragState.plane);
      if (!nextPoint) {
        return;
      }

      const delta = nextPoint.clone().sub(dragState.lastPoint);
      if (Math.abs(delta.x) < 0.001 && Math.abs(delta.z) < 0.001) {
        return;
      }

      dragState.lastPoint = nextPoint.clone();
      dragState.totalDelta.add(delta);
      dragState.moved = true;
      dragState.affectedObjectIds.forEach((objectId) => {
        const renderObject = threeRef.current?.objects.get(objectId);
        renderObject?.position.add(new THREE.Vector3(delta.x, 0, delta.z));
      });
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (dragState) {
        const endedDrag = dragState;
        const wasDrag = endedDrag.moved;
        dragState = undefined;
        controls.enabled = true;
        if (renderer.domElement.hasPointerCapture(event.pointerId)) {
          renderer.domElement.releasePointerCapture(event.pointerId);
        }
        if (wasDrag) {
          onMoveObjectRef.current(endedDrag.objectId, {
            x: endedDrag.totalDelta.x,
            y: 0,
            z: endedDrag.totalDelta.z
          });
          pointerStart = undefined;
          return;
        }
      }

      if (!pointerStart) {
        return;
      }

      const distance = Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y);
      pointerStart = undefined;

      if (distance <= 6) {
        pickObject(event);
      }
    };

    renderer.domElement.addEventListener("pointerdown", handlePointerDown);
    renderer.domElement.addEventListener("pointermove", handlePointerMove);
    renderer.domElement.addEventListener("pointerup", handlePointerUp);
    renderer.domElement.addEventListener("pointercancel", handlePointerUp);

    return () => {
      renderer.domElement.removeEventListener("pointerdown", handlePointerDown);
      renderer.domElement.removeEventListener("pointermove", handlePointerMove);
      renderer.domElement.removeEventListener("pointerup", handlePointerUp);
      renderer.domElement.removeEventListener("pointercancel", handlePointerUp);
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      controls.dispose();
      selectionMarker.geometry.dispose();
      if (Array.isArray(selectionMarker.material)) {
        selectionMarker.material.forEach((material) => material.dispose());
      } else {
        selectionMarker.material.dispose();
      }
      clearGroup(portMarkers);
      threeRef.current?.objects.forEach(disposeSceneObject);
      renderer.dispose();
      host.removeChild(renderer.domElement);
      threeRef.current = null;
    };
  }, []);

  useEffect(() => {
    const three = threeRef.current;
    if (!three) {
      return;
    }

    three.camera.position.set(sceneModel.camera.position.x, sceneModel.camera.position.y, sceneModel.camera.position.z);
    three.camera.zoom = sceneModel.camera.zoom;
    three.camera.updateProjectionMatrix();
    three.controls.target.set(sceneModel.camera.target.x, sceneModel.camera.target.y, sceneModel.camera.target.z);
    three.controls.update();
  }, [sceneModel.camera]);

  useEffect(() => {
    const three = threeRef.current;
    if (!three) {
      return;
    }

    const objectIds = new Set(sceneModel.objects.map((object) => object.id));
    const visibleObjectIds = new Set(
      sceneModel.layers.flatMap((layer) => (layer.visible ? layer.objectIds : []))
    );

    three.objects.forEach((renderObject, objectId) => {
      if (!objectIds.has(objectId)) {
        three.scene.remove(renderObject);
        disposeSceneObject(renderObject);
        three.objects.delete(objectId);
      }
    });

    sceneModel.objects.forEach((object) => {
      let renderObject = three.objects.get(object.id);
      if (!renderObject) {
        renderObject = createObjectVisual(object);
        setObjectId(renderObject, object.id);
        three.objects.set(object.id, renderObject);
        three.scene.add(renderObject);
      }

      renderObject.position.set(
        object.transform.position.x,
        object.transform.position.y,
        object.transform.position.z
      );
      renderObject.rotation.set(
        object.transform.rotation.x,
        object.transform.rotation.y,
        object.transform.rotation.z
      );
      renderObject.scale.set(object.transform.scale.x, object.transform.scale.y, object.transform.scale.z);
      renderObject.visible = visibleObjectIds.has(object.id);
    });

    const selectedObjects = sceneModel.objects.filter((object) =>
      sceneModel.selection.selectedObjectIds.includes(object.id) && visibleObjectIds.has(object.id)
    );
    clearGroup(three.portMarkers);
    if (selectedObjects.length > 0) {
      const bounds = selectedObjects.reduce(
        (accumulator, object) => {
          const halfWidth = (object.dimensions?.width ?? 1) / 2;
          const halfDepth = (object.dimensions?.depth ?? 1) / 2;
          return {
            minX: Math.min(accumulator.minX, object.transform.position.x - halfWidth),
            maxX: Math.max(accumulator.maxX, object.transform.position.x + halfWidth),
            minZ: Math.min(accumulator.minZ, object.transform.position.z - halfDepth),
            maxZ: Math.max(accumulator.maxZ, object.transform.position.z + halfDepth)
          };
        },
        {
          minX: Number.POSITIVE_INFINITY,
          maxX: Number.NEGATIVE_INFINITY,
          minZ: Number.POSITIVE_INFINITY,
          maxZ: Number.NEGATIVE_INFINITY
        }
      );
      const width = Math.max(bounds.maxX - bounds.minX, 1);
      const depth = Math.max(bounds.maxZ - bounds.minZ, 1);
      three.selectionMarker.visible = true;
      three.selectionMarker.position.set(
        (bounds.minX + bounds.maxX) / 2,
        0.02,
        (bounds.minZ + bounds.maxZ) / 2
      );
      three.selectionMarker.scale.set(width + 0.35, 1, depth + 0.35);
      if (sceneModel.environment.connectionPortsVisible !== false) {
        selectedObjects.forEach((object) => {
          object.connectionPorts?.forEach((port) => {
            const marker = createPortMarker(object, port.id);
            if (marker) {
              three.portMarkers.add(marker);
            }
          });
        });
      }
    } else {
      three.selectionMarker.visible = false;
      three.selectionMarker.scale.set(1, 1, 1);
    }
  }, [sceneModel]);

  return (
    <div className="sceneViewport" ref={hostRef} aria-label="3D scene viewport">
      <div className="viewportBadge">Drag empty space to orbit · drag objects or groups to move</div>
    </div>
  );
};

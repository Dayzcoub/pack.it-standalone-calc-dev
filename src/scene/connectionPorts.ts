import type { ConnectionPort, SceneObject, Transform3D, Vec3 } from "./contracts";

export type WorldConnectionPort = ConnectionPort & {
  objectId: string;
  worldPosition: Vec3;
  worldNormal: Vec3;
};

export type ConnectionAlignmentDelta = {
  positionDelta: Vec3;
  normalDot: number;
  compatible: boolean;
};

export type ConnectionSnapCandidate = {
  movingPort: WorldConnectionPort;
  targetPort: WorldConnectionPort;
  targetObject: SceneObject;
  distance: number;
  normalDot: number;
};

const add = (left: Vec3, right: Vec3): Vec3 => ({
  x: left.x + right.x,
  y: left.y + right.y,
  z: left.z + right.z
});

const subtract = (left: Vec3, right: Vec3): Vec3 => ({
  x: left.x - right.x,
  y: left.y - right.y,
  z: left.z - right.z
});

const multiply = (value: Vec3, scale: Vec3): Vec3 => ({
  x: value.x * scale.x,
  y: value.y * scale.y,
  z: value.z * scale.z
});

const dot = (left: Vec3, right: Vec3) => left.x * right.x + left.y * right.y + left.z * right.z;

const distanceBetween = (left: Vec3, right: Vec3) =>
  Math.hypot(left.x - right.x, left.y - right.y, left.z - right.z);

const normalize = (value: Vec3): Vec3 => {
  const length = Math.hypot(value.x, value.y, value.z);
  if (length < 0.000001) {
    return { x: 0, y: 0, z: 0 };
  }
  return {
    x: value.x / length,
    y: value.y / length,
    z: value.z / length
  };
};

const rotateX = (value: Vec3, angle: number): Vec3 => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: value.x,
    y: value.y * cos - value.z * sin,
    z: value.y * sin + value.z * cos
  };
};

const rotateY = (value: Vec3, angle: number): Vec3 => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: value.x * cos + value.z * sin,
    y: value.y,
    z: -value.x * sin + value.z * cos
  };
};

const rotateZ = (value: Vec3, angle: number): Vec3 => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: value.x * cos - value.y * sin,
    y: value.x * sin + value.y * cos,
    z: value.z
  };
};

const rotateVec3 = (value: Vec3, rotation: Vec3): Vec3 => rotateZ(rotateY(rotateX(value, rotation.x), rotation.y), rotation.z);

export const transformLocalPoint = (point: Vec3, transform: Transform3D): Vec3 =>
  add(rotateVec3(multiply(point, transform.scale), transform.rotation), transform.position);

export const transformLocalDirection = (direction: Vec3, transform: Transform3D): Vec3 =>
  normalize(rotateVec3(direction, transform.rotation));

export const resolveConnectionPortWorld = (object: SceneObject, portId: string): WorldConnectionPort | undefined => {
  const port = object.connectionPorts?.find((candidate) => candidate.id === portId);
  if (!port) {
    return undefined;
  }

  return {
    ...port,
    objectId: object.id,
    worldPosition: transformLocalPoint(port.localPosition, object.transform),
    worldNormal: transformLocalDirection(port.localNormal, object.transform)
  };
};

export const portsAreCompatible = (source: ConnectionPort, target: ConnectionPort) =>
  source.compatibleTags.some((tag) => target.compatibleTags.includes(tag));

export const createConnectionAlignmentDelta = (
  movingObject: SceneObject,
  movingPortId: string,
  targetObject: SceneObject,
  targetPortId: string
): ConnectionAlignmentDelta | undefined => {
  const movingPort = resolveConnectionPortWorld(movingObject, movingPortId);
  const targetPort = resolveConnectionPortWorld(targetObject, targetPortId);
  if (!movingPort || !targetPort) {
    return undefined;
  }

  return {
    positionDelta: subtract(targetPort.worldPosition, movingPort.worldPosition),
    normalDot: dot(movingPort.worldNormal, targetPort.worldNormal),
    compatible: portsAreCompatible(movingPort, targetPort)
  };
};

export const findNearestCompatibleConnectionPort = (
  movingObject: SceneObject,
  sceneObjects: SceneObject[],
  options: {
    maxDistanceM: number;
    maxNormalDot?: number;
  }
): ConnectionSnapCandidate | undefined => {
  const maxNormalDot = options.maxNormalDot ?? -0.35;
  const candidates: ConnectionSnapCandidate[] = [];

  movingObject.connectionPorts?.forEach((movingPort) => {
    const movingWorldPort = resolveConnectionPortWorld(movingObject, movingPort.id);
    if (!movingWorldPort) {
      return;
    }

    sceneObjects.forEach((targetObject) => {
      if (targetObject.id === movingObject.id) {
        return;
      }

      targetObject.connectionPorts?.forEach((targetPort) => {
        if (!portsAreCompatible(movingPort, targetPort)) {
          return;
        }

        const targetWorldPort = resolveConnectionPortWorld(targetObject, targetPort.id);
        if (!targetWorldPort) {
          return;
        }

        const distance = distanceBetween(movingWorldPort.worldPosition, targetWorldPort.worldPosition);
        const normalDot = dot(movingWorldPort.worldNormal, targetWorldPort.worldNormal);

        if (distance <= options.maxDistanceM && normalDot <= maxNormalDot) {
          candidates.push({
            movingPort: movingWorldPort,
            targetPort: targetWorldPort,
            targetObject,
            distance,
            normalDot
          });
        }
      });
    });
  });

  return candidates.sort((left, right) => left.distance - right.distance)[0];
};

import { Boxes, Box, ClipboardList, Construction, FolderOpen, Layers3, ListTree, Plus, Redo2, Save, Trash2, Undo2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createInitialProject, createTestSceneObject } from "./app/createInitialProject";
import { createBomSummary } from "./bom/createBomSummary";
import { createSceneObjectFromCatalogItem } from "./catalog/createSceneObjectFromCatalogItem";
import { useProjectController } from "./app/useProjectController";
import { createLedGroup, defaultLedBuilderInput, type LedBuilderInput } from "./builders/led/createLedGroup";
import { createStageGroup, defaultStageBuilderInput, type StageBuilderInput } from "./builders/stage/createStageGroup";
import { createTrussGroup, defaultTrussBuilderInput, type TrussBuilderInput } from "./builders/truss/createTrussGroup";
import { t } from "./i18n";
import { SceneViewport } from "./renderer/SceneViewport";
import type { ProjectListItem, ProjectModel } from "./project/contracts";
import { collectProjectDiagnostics } from "./project/projectDiagnostics";
import { LocalStorageAdapter } from "./storage/localStorageAdapter";
import { SceneRepository } from "./storage/sceneRepository";
import { AppShell } from "./ui/AppShell";
import { AssetLibrarySheet } from "./ui/AssetLibrarySheet";
import { BomSummarySheet } from "./ui/BomSummarySheet";
import { BuilderSheet } from "./ui/BuilderSheet";
import { CameraPresetRail } from "./ui/CameraPresetRail";
import { LayerSheet } from "./ui/LayerSheet";
import { ObjectInspector } from "./ui/ObjectInspector";
import { ProjectHealthSheet } from "./ui/ProjectHealthSheet";
import type { SceneGroup, SceneObject, Vec3 } from "./scene/contracts";

type AppRoute =
  | {
      name: "home";
    }
  | {
      name: "scene";
      project: ProjectModel;
    };

const repository = new SceneRepository(new LocalStorageAdapter());

type BuilderType = "stage" | "truss" | "led";

type BuilderRequest =
  | {
      type: BuilderType;
      mode: "create";
    }
  | {
      type: BuilderType;
      mode: "edit";
      groupId: string;
    };

const numberParam = (parameters: Record<string, unknown>, key: string, fallback: number) => {
  const value = parameters[key];
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
};

const booleanParam = (parameters: Record<string, unknown>, key: string, fallback: boolean) => {
  const value = parameters[key];
  return typeof value === "boolean" ? value : fallback;
};

const stageInputFromParameters = (parameters: Record<string, unknown>): StageBuilderInput => {
  const defaults = defaultStageBuilderInput();
  const system = parameters.system;
  const deckType = parameters.deckType;

  return {
    system: system === "imlight-copy" || system === "pkc-ship-paz" || system === "pkc-paz-paz" ? system : defaults.system,
    widthM: numberParam(parameters, "requestedWidthM", numberParam(parameters, "widthM", defaults.widthM)),
    depthM: numberParam(parameters, "requestedDepthM", numberParam(parameters, "depthM", defaults.depthM)),
    heightM: numberParam(parameters, "requestedHeightM", numberParam(parameters, "heightM", defaults.heightM)),
    deckType: deckType === "generic-deck" ? deckType : defaults.deckType,
    stairsEnabled: booleanParam(parameters, "stairsEnabled", defaults.stairsEnabled),
    closureEnabled: booleanParam(parameters, "closureEnabled", defaults.closureEnabled)
  };
};

const trussInputFromParameters = (parameters: Record<string, unknown>): TrussBuilderInput => {
  const defaults = defaultTrussBuilderInput();
  const mode = parameters.mode;
  const system = parameters.system;

  return {
    mode: mode === "portal" || mode === "frame" || mode === "stool" ? mode : defaults.mode,
    widthM: numberParam(parameters, "requestedWidthM", numberParam(parameters, "widthM", defaults.widthM)),
    heightM: numberParam(parameters, "requestedHeightM", numberParam(parameters, "heightM", defaults.heightM)),
    depthM: numberParam(parameters, "requestedDepthM", numberParam(parameters, "depthM", defaults.depthM)),
    system: system === "mdm-tq29-c2" ? system : defaults.system
  };
};

const ledInputFromParameters = (parameters: Record<string, unknown>): LedBuilderInput => {
  const defaults = defaultLedBuilderInput();
  const cabinetId = parameters.cabinetId;
  const legType = parameters.legType;

  return {
    cabinetId: cabinetId === "generic-640" ? cabinetId : defaults.cabinetId,
    widthM: numberParam(parameters, "requestedWidthM", numberParam(parameters, "widthM", defaults.widthM)),
    heightM: numberParam(parameters, "requestedHeightM", numberParam(parameters, "heightM", defaults.heightM)),
    hangingEnabled: booleanParam(parameters, "hangingEnabled", defaults.hangingEnabled),
    standingEnabled: booleanParam(parameters, "standingEnabled", defaults.standingEnabled),
    floorClearanceM: numberParam(parameters, "floorClearanceM", defaults.floorClearanceM),
    legCount: numberParam(parameters, "legCount", defaults.legCount),
    legType: legType === "3m" || legType === "2_5m" || legType === "2m" ? legType : defaults.legType
  };
};

const generatedNameForBuilderGroup = (group: SceneGroup) => {
  const parameters = group.builderRef?.parameters;
  if (!parameters) {
    return undefined;
  }

  if (group.builderRef?.builderType === "stage") {
    return createStageGroup(stageInputFromParameters(parameters)).group.name;
  }
  if (group.builderRef?.builderType === "truss") {
    return createTrussGroup(trussInputFromParameters(parameters)).group.name;
  }
  if (group.builderRef?.builderType === "led") {
    return createLedGroup(ledInputFromParameters(parameters)).group.name;
  }

  return undefined;
};

const centerOfObjects = (objects: SceneObject[]): Vec3 => {
  if (objects.length === 0) {
    return { x: 0, y: 0, z: 0 };
  }

  return objects.reduce(
    (accumulator, object) => ({
      x: accumulator.x + object.transform.position.x / objects.length,
      y: accumulator.y + object.transform.position.y / objects.length,
      z: accumulator.z + object.transform.position.z / objects.length
    }),
    { x: 0, y: 0, z: 0 }
  );
};

const translateObjectsToCenter = (objects: SceneObject[], targetCenter: Vec3) => {
  const sourceCenter = centerOfObjects(objects);
  const delta = {
    x: targetCenter.x - sourceCenter.x,
    y: 0,
    z: targetCenter.z - sourceCenter.z
  };

  return objects.map((object) => ({
    ...object,
    transform: {
      ...object.transform,
      position: {
        x: object.transform.position.x + delta.x,
        y: object.transform.position.y + delta.y,
        z: object.transform.position.z + delta.z
      }
    }
  }));
};

const formatSavedAt = (value?: string) => {
  if (!value) {
    return "Not saved";
  }

  return new Date(value).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const SceneScreen = ({ initialProject, onBack }: { initialProject: ProjectModel; onBack: () => void }) => {
  const controller = useProjectController(initialProject, repository);
  const [builderRequest, setBuilderRequest] = useState<BuilderRequest | undefined>();
  const [assetLibraryOpen, setAssetLibraryOpen] = useState(false);
  const [healthOpen, setHealthOpen] = useState(false);
  const [layersOpen, setLayersOpen] = useState(false);
  const [bomOpen, setBomOpen] = useState(false);
  const [inspectorCollapsed, setInspectorCollapsed] = useState(true);

  const selectedObject = controller.project.scene.objects.find(
    (object) => object.id === controller.project.scene.selection.selectedObjectIds[0]
  );
  const selectedGroup = controller.project.scene.selection.selectedGroupId
    ? controller.project.scene.groups.find((group) => group.id === controller.project.scene.selection.selectedGroupId)
    : undefined;
  const selectedGroupObjects = selectedGroup
    ? controller.project.scene.objects.filter((object) => selectedGroup.objectIds.includes(object.id))
    : [];
  const lockedObjectIds = controller.project.scene.layers
    .filter((layer) => layer.locked)
    .flatMap((layer) => layer.objectIds);
  const projectHealth = useMemo(() => collectProjectDiagnostics(controller.project), [controller.project]);
  const bomSummary = useMemo(() => createBomSummary(controller.project.scene), [controller.project.scene]);
  const modalSheetOpen = Boolean(builderRequest) || assetLibraryOpen || healthOpen || layersOpen || bomOpen;
  const sceneShellClassName = [
    "sceneShell",
    modalSheetOpen ? "sceneShell-sheetOpen" : undefined,
    !modalSheetOpen && !inspectorCollapsed ? "sceneShell-inspectorExpanded" : undefined
  ]
    .filter(Boolean)
    .join(" ");
  const sceneScreenClassName = [
    "sceneScreen",
    modalSheetOpen ? "sceneScreen-sheetOpen" : undefined,
    !modalSheetOpen && !inspectorCollapsed ? "sceneScreen-inspectorExpanded" : undefined
  ]
    .filter(Boolean)
    .join(" ");
  const copy = (key: Parameters<typeof t>[1]) => t(controller.project.settings.locale.locale, key);

  const groupIdForObject = (objectId?: string) => {
    if (!objectId) {
      return undefined;
    }

    return controller.project.scene.groups.find((group) => group.objectIds.includes(objectId))?.id;
  };

  const openBuilder = (nextBuilder: BuilderType) => {
    controller.dispatch({ type: "scene/openBuilder", builderType: nextBuilder });
    setAssetLibraryOpen(false);
    setHealthOpen(false);
    setLayersOpen(false);
    setBomOpen(false);
    setBuilderRequest({ type: nextBuilder, mode: "create" });
  };
  const editBuilderInput = useMemo(() => {
    if (builderRequest?.mode !== "edit") {
      return {};
    }

    const group = controller.project.scene.groups.find((sceneGroup) => sceneGroup.id === builderRequest.groupId);
    const parameters = group?.builderRef?.parameters;

    if (!group?.builderRef || !parameters) {
      return {};
    }

    if (group.builderRef.builderType === "stage") {
      return { groupName: group.name, stage: stageInputFromParameters(parameters) };
    }
    if (group.builderRef.builderType === "truss") {
      return { groupName: group.name, truss: trussInputFromParameters(parameters) };
    }
    if (group.builderRef.builderType === "led") {
      return { groupName: group.name, led: ledInputFromParameters(parameters) };
    }

    return {};
  }, [builderRequest, controller.project.scene.groups]);

  const applyGroupName = <T extends { group: SceneGroup }>(output: T, name?: string): T => ({
    ...output,
    group: {
      ...output.group,
      name: name?.trim() || output.group.name
    }
  });

  const replaceSelectedBuilderGroup = (groupId: string, output: { group: SceneGroup; objects: SceneObject[] }, name?: string) => {
    const sourceGroup = controller.project.scene.groups.find((group) => group.id === groupId);
    if (!sourceGroup || !output.group) {
      return;
    }

    const sourceObjects = controller.project.scene.objects.filter((object) => sourceGroup.objectIds.includes(object.id));
    const translatedObjects = translateObjectsToCenter(output.objects, centerOfObjects(sourceObjects));
    const currentGeneratedName = generatedNameForBuilderGroup(sourceGroup);
    const replacementName =
      name?.trim() ||
      (currentGeneratedName && sourceGroup.name !== currentGeneratedName ? sourceGroup.name : output.group.name);

    controller.dispatch({
      type: "scene/replaceGroup",
      groupId,
      group: {
        ...output.group,
        name: replacementName
      },
      objects: translatedObjects
    });
  };

  return (
    <AppShell
      className={sceneShellClassName}
      title={controller.project.title}
      subtitle="Project Scene First alpha shell"
      actions={
        <div className="topActionGroup">
          <span className={`saveStatus saveStatus-${controller.saveStatus}`} aria-label="Save status">
            {controller.saveStatus === "saving"
              ? "Saving..."
              : controller.isDirty
                ? "Unsaved"
                : controller.lastSavedAt
                  ? `Saved ${formatSavedAt(controller.lastSavedAt)}`
                  : "Saved"}
          </span>
          <button className="mobileSaveButton iconButton" type="button" aria-label="Save project" onClick={controller.save}>
            <Save size={18} />
          </button>
          <button
            className="iconButton"
            type="button"
            aria-label="Undo"
            disabled={!controller.project.history.canUndo}
            onClick={controller.undo}
          >
            <Undo2 size={18} />
          </button>
          <button
            className="iconButton"
            type="button"
            aria-label="Redo"
            disabled={!controller.project.history.canRedo}
            onClick={controller.redo}
          >
            <Redo2 size={18} />
          </button>
          <button className="projectsButton ghostButton" type="button" aria-label="Projects" onClick={onBack}>
            <FolderOpen size={18} />
            <span>Projects</span>
          </button>
        </div>
      }
    >
      <section className={sceneScreenClassName}>
        <SceneViewport
          sceneModel={controller.project.scene}
          onSelectObject={(objectId) => {
            const groupId = groupIdForObject(objectId);
            controller.dispatch(groupId ? { type: "scene/selectGroup", groupId } : { type: "scene/selectObject", objectId });
          }}
          onMoveObject={(objectId, delta) => {
            const groupId = groupIdForObject(objectId);
            controller.dispatch(
              groupId
                ? {
                    type: "scene/moveGroup",
                    groupId,
                    delta
                  }
                : {
                    type: "scene/moveObject",
                    objectId,
                    delta
                  }
            );
          }}
        />

        <CameraPresetRail
          activeMode={controller.project.scene.camera.mode}
          onSelectPreset={(presetId) =>
            controller.dispatch({
              type: "scene/applyCameraPreset",
              presetId
            })
          }
        />

        <div className="actionRail" aria-label="Scene actions">
          <button type="button" onClick={() => openBuilder("stage")}>
            <Box size={18} />
            {copy("action.addStage")}
          </button>
          <button type="button" onClick={() => openBuilder("truss")}>
            <Construction size={18} />
            {copy("action.addTruss")}
          </button>
          <button type="button" onClick={() => openBuilder("led")}>
            <Layers3 size={18} />
            {copy("action.addLed")}
          </button>
          <button
            type="button"
            onClick={() => {
              setBuilderRequest(undefined);
              setHealthOpen(false);
              setLayersOpen(false);
              setBomOpen(false);
              setAssetLibraryOpen(true);
            }}
          >
            <Boxes size={18} />
            {copy("action.assetLibrary")}
          </button>
          <button
            type="button"
            onClick={() => {
              setBuilderRequest(undefined);
              setAssetLibraryOpen(false);
              setHealthOpen(false);
              setBomOpen(false);
              setLayersOpen(true);
            }}
          >
            <ListTree size={18} />
            Layers
          </button>
          <button
            type="button"
            onClick={() => {
              setBuilderRequest(undefined);
              setAssetLibraryOpen(false);
              setHealthOpen(false);
              setLayersOpen(false);
              setBomOpen(true);
            }}
          >
            <ClipboardList size={18} />
            BOM
          </button>
        </div>

        <button
          className="healthBadge"
          type="button"
          aria-label="Open project health"
          onClick={() => {
            setBuilderRequest(undefined);
            setAssetLibraryOpen(false);
            setLayersOpen(false);
            setBomOpen(false);
            setHealthOpen(true);
          }}
        >
          <strong>Health</strong>
          <span>{projectHealth.errorCount}E</span>
          <span>{projectHealth.warningCount}W</span>
          <span>{projectHealth.infoCount}I</span>
        </button>

        {!modalSheetOpen ? (
          <ObjectInspector
            object={selectedObject}
            group={selectedGroup}
            groupObjects={selectedGroupObjects}
            lockedObjectIds={lockedObjectIds}
            connectionPortsVisible={controller.project.scene.environment.connectionPortsVisible !== false}
            locale={controller.project.settings.locale}
            units={controller.project.settings.units}
            onAction={controller.dispatch}
            onEditTemplate={(group) => {
              const builderType = group.builderRef?.builderType;
              if (builderType !== "stage" && builderType !== "truss" && builderType !== "led") {
                return;
              }

              setAssetLibraryOpen(false);
              setHealthOpen(false);
              setLayersOpen(false);
              setBomOpen(false);
              setBuilderRequest({ type: builderType, mode: "edit", groupId: group.id });
            }}
            onSave={controller.save}
            collapsed={inspectorCollapsed}
            onToggleCollapsed={() => setInspectorCollapsed((current) => !current)}
          />
        ) : null}
        <BuilderSheet
          builder={builderRequest?.type}
          mode={builderRequest?.mode}
          initialGroupName={editBuilderInput.groupName}
          initialStageInput={editBuilderInput.stage}
          initialTrussInput={editBuilderInput.truss}
          initialLedInput={editBuilderInput.led}
          onClose={() => setBuilderRequest(undefined)}
          onCreateStage={(input, name) => {
            const stageOutput = createStageGroup(input);
            if (builderRequest?.mode === "edit") {
              replaceSelectedBuilderGroup(builderRequest.groupId, stageOutput, name);
            } else {
              const namedOutput = applyGroupName(stageOutput, name);
              controller.dispatch({
                type: "scene/addGroup",
                group: namedOutput.group,
                objects: namedOutput.objects
              });
            }
          }}
          onCreateTruss={(input, name) => {
            const trussOutput = createTrussGroup(input);
            if (builderRequest?.mode === "edit") {
              replaceSelectedBuilderGroup(builderRequest.groupId, trussOutput, name);
            } else {
              const namedOutput = applyGroupName(trussOutput, name);
              controller.dispatch({
                type: "scene/addGroup",
                group: namedOutput.group,
                objects: namedOutput.objects
              });
            }
          }}
          onCreateLed={(input, name) => {
            const ledOutput = createLedGroup(input);
            if (builderRequest?.mode === "edit") {
              replaceSelectedBuilderGroup(builderRequest.groupId, ledOutput, name);
            } else {
              const namedOutput = applyGroupName(ledOutput, name);
              controller.dispatch({
                type: "scene/addGroup",
                group: namedOutput.group,
                objects: namedOutput.objects
              });
            }
          }}
        />
        <AssetLibrarySheet
          open={assetLibraryOpen}
          catalogItems={controller.project.catalog.items}
          onClose={() => setAssetLibraryOpen(false)}
          onAddTestCube={() => {
            controller.dispatch({
              type: "scene/addObject",
              object: createTestSceneObject(controller.project.scene.objects.length + 1)
            });
            setAssetLibraryOpen(false);
          }}
          onAddCatalogItem={(item) => {
            controller.dispatch({
              type: "scene/addObject",
              object: createSceneObjectFromCatalogItem(item, controller.project.scene.objects.length + 1)
            });
            setAssetLibraryOpen(false);
          }}
        />
        <ProjectHealthSheet open={healthOpen} summary={projectHealth} onClose={() => setHealthOpen(false)} />
        <LayerSheet
          open={layersOpen}
          layers={controller.project.scene.layers}
          onClose={() => setLayersOpen(false)}
          onAction={controller.dispatch}
        />
        <BomSummarySheet open={bomOpen} summary={bomSummary} onClose={() => setBomOpen(false)} />

        {controller.diagnostics.length > 0 ? (
          <div className="toast" role="status">
            {controller.diagnostics[0]}
          </div>
        ) : null}
      </section>
    </AppShell>
  );
};

export const App = () => {
  const [route, setRoute] = useState<AppRoute>({ name: "home" });
  const [recentProjects, setRecentProjects] = useState<ProjectListItem[]>([]);
  const [status, setStatus] = useState("Offline local workspace");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [projectTitleDraft, setProjectTitleDraft] = useState("PACK.IT Scene Shell");
  const [projectCreatePending, setProjectCreatePending] = useState(false);
  const didBootstrapProject = useRef(false);

  const refreshProjects = useCallback(async () => {
    const projects = await repository.listProjects();
    setRecentProjects(projects);
  }, []);

  const openCreateProjectDialog = useCallback(() => {
    setProjectTitleDraft("PACK.IT Scene Shell");
    setCreateDialogOpen(true);
  }, []);

  const createProject = useCallback(async () => {
    const title = projectTitleDraft.trim();

    if (!title || projectCreatePending) {
      return;
    }

    setProjectCreatePending(true);
    try {
      const project = createInitialProject(title);
      await repository.saveProject(project);
      await refreshProjects();
      setCreateDialogOpen(false);
      setRoute({ name: "scene", project });
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not create project");
    } finally {
      setProjectCreatePending(false);
    }
  }, [projectCreatePending, projectTitleDraft, refreshProjects]);

  useEffect(() => {
    if (didBootstrapProject.current) {
      return;
    }

    didBootstrapProject.current = true;

    const bootstrapProject = async () => {
      const projects = await repository.listProjects();
      setRecentProjects(projects);

      if (projects.length === 0) {
        setStatus("Create a local project to start");
        return;
      }

      const project = await repository.getProject(projects[0].id);
      if (!project) {
        setStatus("Saved project was not found");
        return;
      }

      setRoute({ name: "scene", project });
    };

    void bootstrapProject();
  }, []);

  const openProject = useCallback(
    async (projectId: string) => {
      const project = await repository.getProject(projectId);
      if (!project) {
        setStatus("Saved project was not found");
        return;
      }
      setRoute({ name: "scene", project });
    },
    []
  );

  const deleteProject = useCallback(
    async (project: ProjectListItem) => {
      const confirmed = window.confirm(`Delete project "${project.title}"? This cannot be undone.`);

      if (!confirmed) {
        return;
      }

      await repository.deleteProject(project.id);
      await refreshProjects();
      setStatus(`Deleted ${project.title}`);
    },
    [refreshProjects]
  );

  const homeActions = useMemo(
    () => (
      <button className="primaryButton" type="button" onClick={openCreateProjectDialog}>
        <Plus size={18} />
        New
      </button>
    ),
    [openCreateProjectDialog]
  );

  if (route.name === "scene") {
    return (
      <SceneScreen
        initialProject={route.project}
        onBack={() => {
          void refreshProjects();
          setRoute({ name: "home" });
        }}
      />
    );
  }

  return (
    <AppShell className="homeShell" title="Technical package constructor" subtitle={status} actions={homeActions}>
      <section className="homeScreen">
        <button className="bigCreateButton" type="button" onClick={openCreateProjectDialog}>
          <Plus size={22} />
          Create project
        </button>

        <div className="sectionHeader">
          <h2>Saved projects</h2>
          <button className="ghostButton" type="button" onClick={refreshProjects}>
            Reload
          </button>
        </div>

        <div className="projectList">
          {recentProjects.length > 0 ? (
            recentProjects.map((project) => (
              <article className="projectRow" key={project.id}>
                <button className="projectOpenButton" type="button" onClick={() => void openProject(project.id)}>
                  <span>
                    <strong>{project.title}</strong>
                    <small>{new Date(project.updatedAt).toLocaleString()}</small>
                  </span>
                  <Save size={17} />
                </button>
                <button
                  className="projectDeleteButton"
                  type="button"
                  aria-label={`Delete ${project.title}`}
                  onClick={() => void deleteProject(project)}
                >
                  <Trash2 size={17} />
                </button>
              </article>
            ))
          ) : (
            <div className="emptyState">Create a local project to start the Scene Shell.</div>
          )}
        </div>
        {createDialogOpen ? (
          <div className="projectNameDialog" role="dialog" aria-modal="true" aria-label="Create project">
            <form
              className="projectNamePanel"
              onSubmit={(event) => {
                event.preventDefault();
                void createProject();
              }}
            >
              <label className="fieldStack">
                <span className="metaLabel">Project name</span>
                <input
                  autoFocus
                  enterKeyHint="done"
                  value={projectTitleDraft}
                  onChange={(event) => setProjectTitleDraft(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      void createProject();
                    }
                  }}
                />
              </label>
              <div className="inlineActions">
                <button className="ghostButton" type="button" onClick={() => setCreateDialogOpen(false)}>
                  Cancel
                </button>
                <button
                  className="primaryButton"
                  type="submit"
                  disabled={!projectTitleDraft.trim() || projectCreatePending}
                  onPointerDown={(event) => {
                    if (!projectTitleDraft.trim() || projectCreatePending) {
                      return;
                    }

                    event.preventDefault();
                    void createProject();
                  }}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        ) : null}
      </section>
    </AppShell>
  );
};

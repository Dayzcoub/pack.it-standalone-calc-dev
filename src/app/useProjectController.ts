import { useCallback, useMemo, useState } from "react";
import { applyProjectAction, type ProjectAction } from "../actions/actionSystem";
import type { ProjectModel } from "../project/contracts";
import { SceneRepository } from "../storage/sceneRepository";

export type ProjectController = {
  project: ProjectModel;
  diagnostics: string[];
  isDirty: boolean;
  lastSavedAt?: string;
  saveStatus: "saved" | "unsaved" | "saving";
  dispatch: (action: ProjectAction) => void;
  undo: () => void;
  redo: () => void;
  save: () => Promise<void>;
};

type ProjectControllerState = {
  project: ProjectModel;
  undoStack: ProjectModel[];
  redoStack: ProjectModel[];
  lastSavedSnapshot: string;
  lastSavedAt?: string;
  saveStatus: "saved" | "unsaved" | "saving";
};

const serializeProject = (project: ProjectModel) => JSON.stringify(project);

const withHistoryFlags = (project: ProjectModel, canUndo: boolean, canRedo: boolean): ProjectModel => ({
  ...project,
  history: {
    ...project.history,
    canUndo,
    canRedo
  }
});

export const useProjectController = (
  initialProject: ProjectModel,
  repository: SceneRepository
): ProjectController => {
  const [state, setState] = useState<ProjectControllerState>({
    project: initialProject,
    undoStack: [],
    redoStack: [],
    lastSavedSnapshot: serializeProject(initialProject),
    saveStatus: "saved"
  });
  const [diagnostics, setDiagnostics] = useState<string[]>([]);

  const dispatch = useCallback((action: ProjectAction) => {
    setState((currentState) => {
      const result = applyProjectAction(currentState.project, action);
      const isUndoable =
        result.project.history.pastActionIds.length > currentState.project.history.pastActionIds.length;
      const nextUndoStack = isUndoable ? [...currentState.undoStack, currentState.project] : currentState.undoStack;

      setDiagnostics(result.diagnostics);

      return {
        project: withHistoryFlags(result.project, nextUndoStack.length > 0, isUndoable ? false : currentState.redoStack.length > 0),
        undoStack: nextUndoStack,
        redoStack: isUndoable ? [] : currentState.redoStack,
        lastSavedSnapshot: currentState.lastSavedSnapshot,
        lastSavedAt: currentState.lastSavedAt,
        saveStatus: serializeProject(result.project) === currentState.lastSavedSnapshot ? "saved" : "unsaved"
      };
    });
  }, []);

  const undo = useCallback(() => {
    setState((currentState) => {
      const previousProject = currentState.undoStack.at(-1);
      if (!previousProject) {
        setDiagnostics(["Nothing to undo"]);
        return currentState;
      }

      const undoStack = currentState.undoStack.slice(0, -1);
      const redoStack = [currentState.project, ...currentState.redoStack];
      setDiagnostics(["Undo"]);

      return {
        project: withHistoryFlags(previousProject, undoStack.length > 0, true),
        undoStack,
        redoStack,
        lastSavedSnapshot: currentState.lastSavedSnapshot,
        lastSavedAt: currentState.lastSavedAt,
        saveStatus: serializeProject(previousProject) === currentState.lastSavedSnapshot ? "saved" : "unsaved"
      };
    });
  }, []);

  const redo = useCallback(() => {
    setState((currentState) => {
      const nextProject = currentState.redoStack[0];
      if (!nextProject) {
        setDiagnostics(["Nothing to redo"]);
        return currentState;
      }

      const redoStack = currentState.redoStack.slice(1);
      const undoStack = [...currentState.undoStack, currentState.project];
      setDiagnostics(["Redo"]);

      return {
        project: withHistoryFlags(nextProject, true, redoStack.length > 0),
        undoStack,
        redoStack,
        lastSavedSnapshot: currentState.lastSavedSnapshot,
        lastSavedAt: currentState.lastSavedAt,
        saveStatus: serializeProject(nextProject) === currentState.lastSavedSnapshot ? "saved" : "unsaved"
      };
    });
  }, []);

  const save = useCallback(async () => {
    setState((currentState) => ({
      ...currentState,
      saveStatus: "saving"
    }));
    await repository.saveProject(state.project);
    await repository.saveRecoveryDraft(state.project, "manual-checkpoint");
    const savedAt = new Date().toISOString();
    setState((currentState) => ({
      ...currentState,
      lastSavedSnapshot: serializeProject(currentState.project),
      lastSavedAt: savedAt,
      saveStatus: "saved"
    }));
    setDiagnostics(["Project saved locally"]);
  }, [repository, state.project]);

  const isDirty = serializeProject(state.project) !== state.lastSavedSnapshot;

  return useMemo(
    () => ({
      project: state.project,
      diagnostics,
      isDirty,
      lastSavedAt: state.lastSavedAt,
      saveStatus: state.saveStatus,
      dispatch,
      undo,
      redo,
      save
    }),
    [diagnostics, dispatch, isDirty, redo, save, state.lastSavedAt, state.project, state.saveStatus, undo]
  );
};

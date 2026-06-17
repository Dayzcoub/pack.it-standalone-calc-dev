import { PROJECT_SCHEMA_VERSION, STORAGE_NAMESPACE } from "../app/constants";
import type { ProjectFileEnvelope, ProjectListItem, ProjectModel, RecoveryDraftEnvelope } from "../project/contracts";
import {
  assertProjectFileEnvelope,
  createProjectFileEnvelope,
  createRecoveryDraftEnvelope
} from "../project/projectFileEnvelope";
import type { StorageAdapter } from "./storageAdapter";

const keyForProject = (projectId: string) => `${STORAGE_NAMESPACE}.project.${projectId}`;
const recoveryDraftKey = `${STORAGE_NAMESPACE}.recovery-draft`;
const projectIndexKey = `${STORAGE_NAMESPACE}.project-index`;

const assertSchemaVersion = (schemaVersion: string) => {
  if (schemaVersion !== PROJECT_SCHEMA_VERSION) {
    throw new Error(`Unsupported schema version ${schemaVersion}`);
  }
};

export class SceneRepository {
  constructor(private readonly storage: StorageAdapter) {}

  async saveProject(project: ProjectModel): Promise<void> {
    const envelope = createProjectFileEnvelope(project);
    await this.storage.setItem(keyForProject(project.id), JSON.stringify(envelope));
    await this.addProjectToIndex(project.id);
  }

  async getProject(projectId: string): Promise<ProjectModel | null> {
    const raw = await this.storage.getItem(keyForProject(projectId));

    if (!raw) {
      return null;
    }

    const envelope = assertProjectFileEnvelope(raw);
    return envelope.project;
  }

  async deleteProject(projectId: string): Promise<void> {
    await this.storage.removeItem(keyForProject(projectId));
    await this.removeProjectFromIndex(projectId);
  }

  async saveRecoveryDraft(project: ProjectModel, reason: RecoveryDraftEnvelope["reason"]): Promise<void> {
    const envelope = createRecoveryDraftEnvelope(project, reason);
    await this.storage.setItem(recoveryDraftKey, JSON.stringify(envelope));
  }

  async getRecoveryDraft(): Promise<RecoveryDraftEnvelope | null> {
    const raw = await this.storage.getItem(recoveryDraftKey);

    if (!raw) {
      return null;
    }

    const envelope = JSON.parse(raw) as RecoveryDraftEnvelope;

    if (envelope.kind !== "packit.recovery-draft") {
      throw new Error("Unsupported recovery draft kind");
    }

    assertSchemaVersion(envelope.schemaVersion);

    return envelope;
  }

  async clearRecoveryDraft(): Promise<void> {
    await this.storage.removeItem(recoveryDraftKey);
  }

  async listProjects(): Promise<ProjectListItem[]> {
    const indexedProjectIds = await this.getProjectIndex();
    const scannedProjectIds = await this.scanProjectIds();
    const projectIds = [...new Set([...indexedProjectIds, ...scannedProjectIds])];

    if (scannedProjectIds.some((projectId) => !indexedProjectIds.includes(projectId))) {
      await this.saveProjectIndex(projectIds);
    }

    const projects = await Promise.all(
      projectIds.map(async (projectId) => {
        const raw = await this.storage.getItem(keyForProject(projectId));
        if (!raw) {
          return null;
        }
        const envelope = JSON.parse(raw) as ProjectFileEnvelope;
        return {
          id: envelope.project.id,
          title: envelope.project.title,
          updatedAt: envelope.project.updatedAt,
          schemaVersion: envelope.project.schemaVersion
        } satisfies ProjectListItem;
      })
    );

    return projects
      .filter((project): project is ProjectListItem => Boolean(project))
      .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
  }

  private async getProjectIndex(): Promise<string[]> {
    const raw = await this.storage.getItem(projectIndexKey);

    if (!raw) {
      return [];
    }

    try {
      const parsed = JSON.parse(raw) as unknown;

      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed.filter((value): value is string => typeof value === "string");
    } catch {
      return [];
    }
  }

  private async saveProjectIndex(projectIds: string[]): Promise<void> {
    await this.storage.setItem(projectIndexKey, JSON.stringify([...new Set(projectIds)]));
  }

  private async addProjectToIndex(projectId: string): Promise<void> {
    const currentIndex = await this.getProjectIndex();
    await this.saveProjectIndex([projectId, ...currentIndex.filter((id) => id !== projectId)]);
  }

  private async removeProjectFromIndex(projectId: string): Promise<void> {
    const currentIndex = await this.getProjectIndex();
    await this.saveProjectIndex(currentIndex.filter((id) => id !== projectId));
  }

  private async scanProjectIds(): Promise<string[]> {
    const prefix = `${STORAGE_NAMESPACE}.project.`;
    const keys = await this.storage.listKeys(prefix);

    return keys.map((key) => key.slice(prefix.length)).filter(Boolean);
  }
}

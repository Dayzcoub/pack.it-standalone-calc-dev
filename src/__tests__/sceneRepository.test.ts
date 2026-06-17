import { describe, expect, it } from "vitest";
import { createInitialProject } from "../app/createInitialProject";
import { SceneRepository } from "../storage/sceneRepository";
import type { StorageAdapter } from "../storage/storageAdapter";

class MemoryStorageAdapter implements StorageAdapter {
  protected readonly values = new Map<string, string>();

  async getItem(key: string): Promise<string | null> {
    return this.values.get(key) ?? null;
  }

  async setItem(key: string, value: string): Promise<void> {
    this.values.set(key, value);
  }

  async removeItem(key: string): Promise<void> {
    this.values.delete(key);
  }

  async listKeys(prefix: string): Promise<string[]> {
    return [...this.values.keys()].filter((key) => key.startsWith(prefix));
  }
}

class NonEnumerableMemoryStorageAdapter extends MemoryStorageAdapter {
  async listKeys(): Promise<string[]> {
    return [];
  }
}

describe("SceneRepository", () => {
  it("saves and reopens a versioned project envelope", async () => {
    const repository = new SceneRepository(new MemoryStorageAdapter());
    const project = createInitialProject("Saved Task 001 project");

    await repository.saveProject(project);

    const savedProjects = await repository.listProjects();
    const reopenedProject = await repository.getProject(project.id);

    expect(savedProjects).toHaveLength(1);
    expect(savedProjects[0].title).toBe("Saved Task 001 project");
    expect(reopenedProject?.id).toBe(project.id);
    expect(reopenedProject?.scene.objects[0].name).toBe("Test scene cube");
    expect(reopenedProject?.schemaVersion).toBe(project.schemaVersion);
  });

  it("lists saved projects through the explicit project index when key scanning is unavailable", async () => {
    const repository = new SceneRepository(new NonEnumerableMemoryStorageAdapter());
    const project = createInitialProject("Indexed mobile project");

    await repository.saveProject(project);

    const savedProjects = await repository.listProjects();

    expect(savedProjects).toEqual([
      expect.objectContaining({
        id: project.id,
        title: "Indexed mobile project"
      })
    ]);
    await expect(repository.getProject(project.id)).resolves.toMatchObject({
      id: project.id
    });
  });

  it("stores and clears a local recovery draft envelope", async () => {
    const repository = new SceneRepository(new MemoryStorageAdapter());
    const project = createInitialProject("Draft recovery project");

    await repository.saveRecoveryDraft(project, "manual-checkpoint");

    const draft = await repository.getRecoveryDraft();
    expect(draft?.kind).toBe("packit.recovery-draft");
    expect(draft?.reason).toBe("manual-checkpoint");
    expect(draft?.project.id).toBe(project.id);
    expect(draft?.schemaVersion).toBe(project.schemaVersion);

    await repository.clearRecoveryDraft();

    await expect(repository.getRecoveryDraft()).resolves.toBeNull();
  });

  it("deletes a saved project envelope", async () => {
    const repository = new SceneRepository(new MemoryStorageAdapter());
    const firstProject = createInitialProject("First project");
    const secondProject = createInitialProject("Second project");

    await repository.saveProject(firstProject);
    await repository.saveProject(secondProject);
    await repository.deleteProject(firstProject.id);

    await expect(repository.getProject(firstProject.id)).resolves.toBeNull();
    await expect(repository.getProject(secondProject.id)).resolves.not.toBeNull();
    await expect(repository.listProjects()).resolves.toEqual([
      expect.objectContaining({
        id: secondProject.id,
        title: "Second project"
      })
    ]);
  });

  it("removes deleted projects from the explicit project index", async () => {
    const repository = new SceneRepository(new NonEnumerableMemoryStorageAdapter());
    const project = createInitialProject("Temporary mobile project");

    await repository.saveProject(project);
    await repository.deleteProject(project.id);

    await expect(repository.listProjects()).resolves.toEqual([]);
  });
});

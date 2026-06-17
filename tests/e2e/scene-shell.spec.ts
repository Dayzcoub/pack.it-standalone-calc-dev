import { expect, test } from "@playwright/test";
import { PNG } from "pngjs";

test("opens directly into the placeholder project scene", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.includes("webkit"), "Full 3D interaction smoke test is covered in Chromium; WebKit has a focused project flow test.");

  page.on("dialog", (dialog) => {
    void dialog.accept();
  });

  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Saved projects" })).toBeVisible();
  await page.getByRole("button", { name: "Create project" }).click();
  const createProjectDialog = page.getByRole("dialog", { name: "Create project" });
  await expect(createProjectDialog).toBeVisible();
  await createProjectDialog.getByLabel("Project name").fill("PACK.IT Scene Shell");
  await createProjectDialog.getByRole("button", { name: "Create" }).click();

  await expect(page.getByRole("heading", { name: "PACK.IT Scene Shell" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Stage" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Truss" })).toBeVisible();
  await expect(page.getByRole("button", { name: "LED" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Assets" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Save project" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Undo" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "Redo" })).toBeDisabled();
  await expect(page.getByLabel("Save status")).toContainText("Saved");
  await expect(page.locator("input").first()).toHaveValue("Test scene cube");

  await page.getByRole("button", { name: "Stage" }).click();
  const stageBuilder = page.getByRole("region", { name: "Add Stage" });
  await expect(stageBuilder).toBeVisible();
  await expect(stageBuilder.getByRole("img", { name: "Stage scheme preview" })).toBeVisible();
  await expect(stageBuilder.getByLabel("Stage calculation preview")).toContainText("Modules");
  await expect(stageBuilder.getByLabel("Stage BOM preview")).toContainText("Imlight Copy deck");
  await stageBuilder.getByRole("button", { name: "Close" }).click();

  await page.getByRole("button", { name: "LED" }).click();
  const ledBuilder = page.getByRole("region", { name: "Add LED" });
  await expect(ledBuilder).toBeVisible();
  await expect(ledBuilder.getByRole("img", { name: "LED scheme preview" })).toBeVisible();
  await expect(ledBuilder.getByLabel("LED calculation preview")).toContainText("Cabinets");
  await expect(ledBuilder.getByLabel("LED BOM preview")).toContainText("LED cabinet 640 x 640 mm");
  await ledBuilder.getByRole("button", { name: "Create LedGroup" }).click();
  await expect(page.locator("input").first()).toHaveValue("LED 5.12 x 2.56 m");

  await page.getByRole("button", { name: "Projects" }).click();
  await expect(page.getByRole("heading", { name: "Saved projects" })).toBeVisible();
  await page.getByRole("button", { name: "New" }).click();
  const secondProjectDialog = page.getByRole("dialog", { name: "Create project" });
  await secondProjectDialog.getByLabel("Project name").fill("Second Project");
  await secondProjectDialog.getByRole("button", { name: "Create" }).click();
  await expect(page.getByRole("heading", { name: "Second Project" })).toBeVisible();
  await page.getByRole("button", { name: "Projects" }).click();

  await expect(page.getByText("Second Project")).toBeVisible();
  await page.getByRole("button", { name: "Delete Second Project" }).click();
  await expect(page.getByRole("button", { name: "Delete Second Project" })).toBeHidden();
  await page.locator(".projectOpenButton").first().click();

  const canvas = page.locator("canvas");
  await expect(canvas).toBeVisible();

  const canvasBox = await canvas.boundingBox();
  expect(canvasBox?.width).toBeGreaterThan(300);
  expect(canvasBox?.height).toBeGreaterThan(300);

  const screenshot = await canvas.screenshot();
  const png = PNG.sync.read(screenshot);
  const colors = new Set<string>();

  for (let y = 0; y < png.height; y += Math.max(1, Math.floor(png.height / 24))) {
    for (let x = 0; x < png.width; x += Math.max(1, Math.floor(png.width / 24))) {
      const index = (png.width * y + x) * 4;
      colors.add(`${png.data[index]},${png.data[index + 1]},${png.data[index + 2]}`);
    }
  }

  expect(colors.size).toBeGreaterThan(8);

  if (testInfo.project.name === "desktop-chromium") {
    const dragBox = await canvas.boundingBox();
    expect(dragBox).not.toBeNull();

    await page.mouse.move(dragBox!.x + dragBox!.width / 2, dragBox!.y + dragBox!.height / 2);
    await page.mouse.down();
    await page.mouse.move(dragBox!.x + dragBox!.width / 2 + 110, dragBox!.y + dragBox!.height / 2 + 60, {
      steps: 8
    });
    await page.mouse.up();

    await expect(page.getByRole("button", { name: "Undo" })).toBeEnabled();
    await page.getByRole("button", { name: "Undo" }).click();
    await expect(page.getByRole("button", { name: "Undo" })).toBeDisabled();
    await expect(page.getByRole("button", { name: "Redo" })).toBeEnabled();
  }

  await page.getByRole("button", { name: "Assets" }).click();
  await expect(page.getByRole("region", { name: "Asset Library" })).toBeVisible();
  await expect(page.getByText("catalog objects")).toBeVisible();
  await expect(page.getByLabel("Search catalog assets")).toBeVisible();

  await page.getByRole("button", { name: "Corners" }).click();
  await expect(page.getByRole("button", { name: /CD29U003FCXV90GRAD/ })).toBeVisible();

  await page.getByLabel("Search catalog assets").fill("ob380");
  await expect(page.getByText("No matching catalog objects.")).toBeVisible();

  await page.getByRole("button", { name: "All" }).click();
  await expect(page.getByRole("button", { name: /Ploschadka opornaya B-29x29-OB380/ })).toBeVisible();
  await page.getByLabel("Search catalog assets").clear();

  const firstCatalogItem = page.getByRole("button", { name: /TQ29x29V050CXV/ });
  await expect(firstCatalogItem).toBeVisible();
  await firstCatalogItem.click();
  await expect(page.locator("input").first()).toHaveValue("TQ29x29V050CXV");

  await page.getByRole("button", { name: "BOM" }).click();
  const bomRegion = page.getByRole("region", { name: "BOM" });
  await expect(bomRegion).toBeVisible();
  await expect(bomRegion.getByText("TQ29x29V050CXV", { exact: true })).toBeVisible();
  await expect(bomRegion.getByText("MDM_TQ29X29V050CXV")).toBeVisible();
  await bomRegion.getByRole("button", { name: "Close" }).click();

  await page.getByRole("button", { name: "Layers" }).click();
  const layersRegion = page.getByRole("region", { name: "Layers" });
  await expect(layersRegion).toBeVisible();
  const trussLayer = layersRegion.getByRole("button", { name: /Truss 1 objects/ });
  await expect(trussLayer).toHaveAttribute("aria-pressed", "true");
  const lockTrussLayer = layersRegion.getByRole("button", { name: "Lock Truss layer" });
  await expect(lockTrussLayer).toHaveAttribute("aria-pressed", "false");
  await lockTrussLayer.click();
  await expect(layersRegion.getByRole("button", { name: "Unlock Truss layer" })).toHaveAttribute("aria-pressed", "true");
  await trussLayer.click();
  await expect(trussLayer).toHaveAttribute("aria-pressed", "false");
  await page.getByRole("button", { name: "Undo" }).click();
  await expect(trussLayer).toHaveAttribute("aria-pressed", "true");

  await expect(page.getByLabel("Save status")).toContainText("Unsaved");
  await expect(page.getByRole("button", { name: "Undo" })).toBeEnabled();
  await expect(page.getByRole("button", { name: "Redo" })).toBeEnabled();

  await page.getByRole("button", { name: "Undo" }).click();
  await expect(layersRegion.getByRole("button", { name: "Lock Truss layer" })).toHaveAttribute("aria-pressed", "false");
  await layersRegion.getByRole("button", { name: "Close" }).click();

  await page.getByRole("button", { name: "Undo" }).click();
  await expect(page.locator("input").first()).toHaveValue("Test scene cube");
  await expect(page.getByRole("button", { name: "Redo" })).toBeEnabled();

  await page.getByRole("button", { name: "Redo" }).click();
  await page.getByRole("button", { name: "Redo" }).click();
  await expect(page.locator("input").first()).toHaveValue("TQ29x29V050CXV");

  await page.getByRole("button", { name: "Save project" }).click();
  await expect(page.getByLabel("Save status")).toContainText("Saved");
});

test("creates, lists, and reopens a project", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Saved projects" })).toBeVisible();
  await page.getByRole("button", { name: "Create project" }).click();

  const createProjectDialog = page.getByRole("dialog", { name: "Create project" });
  await expect(createProjectDialog).toBeVisible();
  await createProjectDialog.getByLabel("Project name").fill("Mobile Open Check");
  await createProjectDialog.getByRole("button", { name: "Create" }).click();

  await expect(page.getByRole("heading", { name: "Mobile Open Check" })).toBeVisible();
  await page.getByRole("button", { name: "Projects" }).click();
  await expect(page.getByRole("heading", { name: "Saved projects" })).toBeVisible();
  await expect(page.getByText("Mobile Open Check")).toBeVisible();

  await page.locator(".projectOpenButton").filter({ hasText: "Mobile Open Check" }).click();

  await expect(page.getByRole("heading", { name: "Mobile Open Check" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Stage" })).toBeVisible();
});

test("creates a project when randomUUID is unavailable", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window.crypto, "randomUUID", {
      configurable: true,
      value: undefined
    });
  });

  await page.goto("/");
  await page.getByRole("button", { name: "Create project" }).click();

  const createProjectDialog = page.getByRole("dialog", { name: "Create project" });
  await createProjectDialog.getByLabel("Project name").fill("LAN HTTP Project");
  await createProjectDialog.getByRole("button", { name: "Create" }).click();

  await expect(page.getByRole("heading", { name: "LAN HTTP Project" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Stage" })).toBeVisible();
});

import { createRenderAssetPlan } from "../assets/rendererAssetPolicy";
import type { ProjectModel } from "./contracts";
import type { ValidationIssue } from "../scene/contracts";

export type ProjectHealthSummary = {
  issues: ValidationIssue[];
  errorCount: number;
  warningCount: number;
  infoCount: number;
};

const issue = (
  severity: ValidationIssue["severity"],
  source: string,
  message: string,
  index: number
): ValidationIssue => ({
  id: `project-health-${source}-${index}`,
  severity,
  source,
  message
});

export const collectProjectDiagnostics = (project: ProjectModel): ProjectHealthSummary => {
  const issues: ValidationIssue[] = [];

  if (!project.settings.featureFlags.runtimeGlbLoading) {
    issues.push(issue("info", "assets", "Runtime GLB loading is disabled by feature flag.", issues.length));
  }

  project.catalog.items.forEach((item) => {
    if (item.source.sourceStatus !== "verified") {
      issues.push(
        issue("warning", "catalog", `${item.displayName} source status is ${item.source.sourceStatus}.`, issues.length)
      );
    }
  });

  project.scene.objects.forEach((object) => {
    object.warnings.forEach((warning) => issues.push(warning));

    const renderPlan = createRenderAssetPlan(object);
    if (renderPlan.expectedLoadStatus === "disabled-by-scope") {
      issues.push(issue("info", "assets", `${object.name} uses placeholder geometry until GLB loading is enabled.`, issues.length));
    }
    if (renderPlan.expectedLoadStatus === "blocked" || renderPlan.expectedLoadStatus === "unsupported") {
      issues.push(issue("warning", "assets", `${object.name}: ${renderPlan.reason}`, issues.length));
    }

    if (object.connectionPorts?.some((port) => port.status === "placeholder")) {
      issues.push(issue("info", "snap", `${object.name} uses placeholder connection ports.`, issues.length));
    }
  });

  return {
    issues,
    errorCount: issues.filter((item) => item.severity === "error").length,
    warningCount: issues.filter((item) => item.severity === "warning").length,
    infoCount: issues.filter((item) => item.severity === "info").length
  };
};

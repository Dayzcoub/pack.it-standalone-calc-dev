import type { ProjectHealthSummary } from "../project/projectDiagnostics";
import type { ValidationIssue } from "../scene/contracts";
import { BottomSheet } from "./BottomSheet";

type ProjectHealthSheetProps = {
  open: boolean;
  summary: ProjectHealthSummary;
  onClose: () => void;
};

type HealthIssueGroup = {
  id: string;
  severity: ValidationIssue["severity"];
  source: string;
  title: string;
  count: number;
  examples: string[];
};

const severityRank: Record<ValidationIssue["severity"], number> = {
  error: 0,
  warning: 1,
  info: 2
};

const groupIssue = (issue: ValidationIssue) => {
  if (issue.source === "catalog" && issue.message.includes("source status is")) {
    return {
      key: "catalog-source-status",
      title: "Catalog items need source verification"
    };
  }

  if (issue.source === "assets" && issue.message.includes("placeholder geometry")) {
    return {
      key: "assets-placeholder-geometry",
      title: "Objects are rendered as procedural placeholders"
    };
  }

  if (issue.source === "snap" && issue.message.includes("placeholder connection ports")) {
    return {
      key: "snap-placeholder-ports",
      title: "Connection ports are placeholder data"
    };
  }

  return {
    key: `${issue.severity}-${issue.source}-${issue.message}`,
    title: issue.message
  };
};

const createIssueGroups = (issues: ValidationIssue[]): HealthIssueGroup[] => {
  const groups = new Map<string, HealthIssueGroup>();

  issues.forEach((issue) => {
    const group = groupIssue(issue);
    const id = `${issue.severity}-${issue.source}-${group.key}`;
    const existing = groups.get(id);

    if (existing) {
      existing.count += 1;
      if (existing.examples.length < 4) {
        existing.examples.push(issue.message);
      }
      return;
    }

    groups.set(id, {
      id,
      severity: issue.severity,
      source: issue.source,
      title: group.title,
      count: 1,
      examples: [issue.message]
    });
  });

  return Array.from(groups.values()).sort((left, right) => {
    const severityDelta = severityRank[left.severity] - severityRank[right.severity];
    return severityDelta || right.count - left.count;
  });
};

export const ProjectHealthSheet = ({ open, summary, onClose }: ProjectHealthSheetProps) => (
  <BottomSheet title="Project Health" open={open} onClose={onClose}>
    <div className="healthPanel">
      <div className="healthSummaryGrid" aria-label="Project health summary">
        <span>
          <strong>{summary.errorCount}</strong>
          Errors
        </span>
        <span>
          <strong>{summary.warningCount}</strong>
          Warnings
        </span>
        <span>
          <strong>{summary.infoCount}</strong>
          Info
        </span>
      </div>

      {summary.issues.length > 0 ? (
        <div className="healthIssueList">
          {createIssueGroups(summary.issues).map((group) => (
            <article className={`healthIssue healthIssue-${group.severity}`} key={group.id}>
              <div>
                <strong>{group.source}</strong>
                <span>{group.title}</span>
                <em>
                  {group.examples[0]}
                  {group.count > 1 ? ` +${group.count - 1} more` : ""}
                </em>
              </div>
              <small>{group.severity}</small>
            </article>
          ))}
        </div>
      ) : (
        <div className="emptyInspector">
          <p>No project health issues detected.</p>
        </div>
      )}
    </div>
  </BottomSheet>
);

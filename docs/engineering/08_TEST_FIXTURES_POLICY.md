# 08. Test Fixtures Policy

## 1. Purpose

Old FEG project had a critical issue where test fixtures could load in production. PACK.IT must prevent this by policy and checks.

## 2. Rule

Test/demo fixtures must never be included in production bundle.

## 3. Allowed in dev

- sample calculations;
- mock catalogs;
- debug data;
- visual test examples.

## 4. Forbidden in production

- TestFixtures imports;
- demo data scripts;
- debug routes;
- mock API;
- fake saved calculations;
- hidden fixture toggles.

## 5. Checks

Production check should fail if it finds:

```text
TestFixtures
mockData
demoData
fixture import in src app runtime
```

Exceptions may be allowed only under `tests/`.

## 6. Acceptance

Accepted when:

- fixtures are isolated under test/dev paths;
- production build excludes them;
- automated check exists before release.

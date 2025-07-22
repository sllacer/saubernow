# Implement Requirements

Implement any completed requirement specification and create a PR.

## Usage:

```
/implement-requirements [requirement-folder-name]
```

## Examples:

```
/implement-requirements 2025-07-23-0057-remove-document-upload
/implement-requirements 2025-07-23-1245-add-user-profile
```

## Full Workflow:

### Phase 1: Validation and Setup

1. Validate requirement folder exists in requirements/[folder-name]
2. Read metadata.json and verify phase is "complete"
3. Load 06-requirements-spec.md for implementation details
4. Extract requirement ID and create feature branch: feature/[requirement-id]
5. Display requirement summary and ask for confirmation

### Phase 2: Parse Requirements Specification

6. Read technical requirements section (TR1, TR2, etc.)
7. Parse functional requirements (FR1, FR2, etc.)
8. Extract file modification instructions with specific line numbers
9. Identify acceptance criteria checklist
10. Parse any code patterns, imports, and UI changes needed

### Phase 3: Implementation Execution

11. For each file modification in technical requirements:
    - Read current file content
    - Apply specified changes (removals, additions, replacements)
    - Follow exact patterns and conventions documented
    - Update imports, state management, UI components as specified
12. Add any new localization strings to i18n files
13. Remove deprecated code and clean up unused imports
14. Apply UI/UX changes following existing patterns

### Phase 4: Quality Assurance

15. Run linting: `npm run lint` and fix any issues automatically where possible
16. Run type checking: `npm run type-check` and resolve TypeScript errors
17. Verify all acceptance criteria from requirements spec are met
18. Test critical user flows mentioned in requirements
19. Validate no broken imports or missing dependencies

### Phase 5: Git Operations and PR Creation

20. Stage all relevant files mentioned in requirements
21. Create descriptive commit message based on requirement summary
22. Push feature branch to remote with -u flag
23. Create pull request using gh cli with:
    - Title derived from requirement summary
    - Body including acceptance criteria as checkboxes
    - Link to requirements specification folder

### Phase 6: Verification and Completion

24. Confirm PR created successfully and return URL
25. Mark requirement as implemented in metadata
26. Provide summary of changes made
27. List any manual testing recommendations

## Implementation Strategy:

### File Parsing Logic

- Read 06-requirements-spec.md for complete implementation plan
- Extract specific file paths and line numbers for modifications
- Parse code blocks for exact replacements and additions
- Follow TR (Technical Requirements) and FR (Functional Requirements) sections

### Code Change Patterns

- Use Edit tool for single file modifications
- Use MultiEdit tool for complex multi-change files
- Follow existing code conventions and patterns
- Maintain consistent indentation and styling
- Preserve existing imports unless specifically removing

### Error Handling

- Validate requirement folder exists before starting
- Check phase completion before implementation
- Verify git branch creation success
- Handle linting/type-check failures gracefully
- Rollback changes if critical errors occur

### PR Template Structure

```markdown
## Summary

[Requirement summary from 00-initial-request.md]

## Changes Made

[Auto-generated list based on files modified]

## Technical Implementation

- [List of technical requirements fulfilled]
- [File modifications made]
- [New features added/removed]

## Acceptance Criteria

[Checklist from 06-requirements-spec.md]
```

## Safety Checks:

- Only implement requirements with phase: "complete"
- Confirm destructive changes with user before execution
- Create backup branch before major modifications
- Validate all file paths exist before modification
- Ensure no malicious code in requirement specifications

## Output Format:

```
🔍 Loading requirement: [folder-name]
📋 Requirement: [title]
⏱️  Created: [timestamp]
🎯 Phase: Complete ✅

📄 Summary:
[Brief description from 00-initial-request.md]

🛠️  Implementation Plan:
- [X] File modifications: [count] files
- [X] New features: [list]
- [X] Removals: [list]
- [X] Quality checks: lint, type-check

Proceed with implementation? (y/n)

[After confirmation]
🚀 Starting implementation...
[Progress updates]
✅ Implementation complete!
🔗 PR created: [URL]
```

## Error Scenarios:

- Requirement folder not found → List available requirements
- Phase not complete → Show current phase and suggest completing
- Git conflicts → Provide resolution guidance
- Lint/type errors → Show errors and attempt auto-fix
- Missing files → Validate file paths and suggest corrections

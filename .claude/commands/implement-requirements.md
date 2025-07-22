# Implement Requirements Command

Execute implementation for any completed requirement specification.

## Arguments:
$ARGUMENTS = requirement folder name (e.g., "2025-07-23-0057-remove-document-upload")

## Execution Flow:

### Step 1: Load and Validate Requirement
```bash
REQUIREMENT_FOLDER="$ARGUMENTS"
REQ_PATH="requirements/$REQUIREMENT_FOLDER"

# Validate folder exists
if [ ! -d "$REQ_PATH" ]; then
  echo "❌ Requirement folder not found: $REQ_PATH"
  echo "Available requirements:"
  ls requirements/ | grep -E '^[0-9]{4}-[0-9]{2}-[0-9]{2}'
  exit 1
fi

# Validate completion
PHASE=$(jq -r '.phase' "$REQ_PATH/metadata.json")
if [ "$PHASE" != "complete" ]; then
  echo "❌ Requirement not complete. Current phase: $PHASE"
  echo "Run /requirements-status to continue gathering requirements"
  exit 1
fi
```

### Step 2: Display Requirement Summary
Read and display:
- Initial request from 00-initial-request.md
- Key answers from 02-discovery-answers.md and 05-detail-answers.md
- Implementation overview from 06-requirements-spec.md
- Files to be modified and acceptance criteria

### Step 3: Create Feature Branch
```bash
REQUIREMENT_ID=$(jq -r '.id' "$REQ_PATH/metadata.json")
BRANCH_NAME="feature/$REQUIREMENT_ID"

# Create and checkout feature branch
git checkout -b "$BRANCH_NAME"
echo "✅ Created feature branch: $BRANCH_NAME"
```

### Step 4: Parse Implementation Requirements

**Extract from 06-requirements-spec.md:**
- Technical Requirements (TR1, TR2, etc.) with specific file paths and changes
- Functional Requirements (FR1, FR2, etc.) for validation
- Code patterns and examples to follow
- Acceptance criteria checklist

**File Modification Instructions:**
- Parse specific line numbers and code blocks
- Identify imports to add/remove
- Extract UI component changes
- Locate state management updates
- Find localization string additions

### Step 5: Execute File Modifications

**For each Technical Requirement:**

1. **Read target file** using Read tool
2. **Apply changes** using Edit or MultiEdit based on complexity:
   - Line-specific replacements
   - Code block insertions
   - Function removals
   - Import updates
   - State property changes
3. **Validate syntax** after each change
4. **Follow patterns** specified in requirements

**Example Implementation Pattern:**
```typescript
// TR1: Remove handleFileUpload function (lines 156-164)
// Use Edit tool to remove specific function

// TR2: Update imports (add Phone, remove Upload)
// Use Edit tool to modify import statement

// TR3: Replace Step 4 content (lines 597-667)
// Use Edit tool to replace entire step content with new verification UI

// TR4: Update submit button validation
// Use Edit tool to change disabled condition
```

### Step 6: Add Internationalization

**Parse localization requirements:**
- Extract German strings for de.json
- Extract English strings for en.json
- Add to appropriate sections (cleaner, common, etc.)
- Follow existing key naming patterns

**Example:**
```json
// Add to src/locales/de.json under "cleaner" section
{
  "verification_title": "Verifizierung",
  "verification_subtitle": "Vertrauen ist die Basis unserer Plattform",
  // ... more strings from requirements
}
```

### Step 7: Quality Assurance

**Run checks in parallel:**
```bash
npm run lint
npm run type-check
```

**Fix common issues automatically:**
- Missing imports
- Unused variables
- Formatting inconsistencies

**Validate acceptance criteria:**
- Check each AC item from requirements spec
- Verify UI changes render correctly
- Confirm functionality works as specified

### Step 8: Git Operations

**Stage relevant files:**
```bash
# Stage all files mentioned in technical requirements
git add src/app/[locale]/become-cleaner/page.tsx
git add src/locales/de.json
git add src/locales/en.json
# ... other files as specified
```

**Create descriptive commit:**
```bash
COMMIT_MSG=$(cat <<EOF
$(grep -A 1 "## Problem Statement" "$REQ_PATH/06-requirements-spec.md" | tail -n 1)

$(grep -A 10 "## Solution Overview" "$REQ_PATH/06-requirements-spec.md" | tail -n +2)

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)

git commit -m "$COMMIT_MSG"
```

### Step 9: Create Pull Request

**Generate PR body from requirements:**
```bash
PR_TITLE=$(grep "^# " "$REQ_PATH/06-requirements-spec.md" | head -1 | sed 's/# //')

PR_BODY=$(cat <<EOF
## Summary
$(grep -A 5 "## Problem Statement" "$REQ_PATH/06-requirements-spec.md" | tail -n +2)

## Solution
$(grep -A 5 "## Solution Overview" "$REQ_PATH/06-requirements-spec.md" | tail -n +2)

## Changes Made
$(git diff --name-only main..HEAD | sed 's/^/- /')

## Acceptance Criteria
$(grep -A 20 "## Acceptance Criteria" "$REQ_PATH/06-requirements-spec.md" | tail -n +2 | sed 's/- \[ \]/- [ ]/')

## Requirements Specification
See: requirements/$REQUIREMENT_FOLDER/06-requirements-spec.md

🤖 Generated with [Claude Code](https://claude.ai/code)
EOF
)

# Push and create PR
git push -u origin "$BRANCH_NAME"
gh pr create --title "$PR_TITLE" --body "$PR_BODY"
```

### Step 10: Complete and Report

**Update metadata:**
```json
{
  "implemented": true,
  "implementedAt": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "branch": "$BRANCH_NAME",
  "pr": "$PR_URL"
}
```

**Display results:**
```
✅ Implementation Complete!

📋 Requirement: [title]
🌿 Branch: [branch-name]
🔗 PR: [pr-url]
📁 Files Modified: [count]

✅ Quality Checks Passed:
- Linting: ✅
- Type Checking: ✅
- Acceptance Criteria: ✅

🧪 Manual Testing Recommended:
[List from requirements spec]
```

## Error Handling:

- **Missing requirement folder** → List available requirements
- **Incomplete requirements** → Show current phase and next steps
- **Git conflicts** → Provide resolution steps
- **Lint failures** → Show errors and attempt auto-fix
- **Type errors** → Display errors with file locations
- **Missing files** → Validate paths and suggest corrections

## Safety Measures:

- Confirm destructive changes before execution
- Validate all file paths exist before modification
- Create backup of critical files if needed
- Rollback changes if implementation fails
- Never modify files outside of requirements specification
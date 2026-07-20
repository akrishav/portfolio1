# Walkthrough: Recruiter Portal Onboarding Layout Updates

This walkthrough documents the clean layout state where the candidate listing table and detailed inspector panel are formatted to support glanceable stuck step indicators without exposing internal SLA target timers.

---

## 🛠️ Implementation Details

### 1. Recruiter Candidates Grid Table (Simplified & Clean)
*   **Unified status**: Replaced the separate onboarding and SLA status indicators with a single, clean column displaying status using the custom formatting:
    *   **Completed**: `Employee Created` (green)
    *   **Terminated**: `OB Terminated` (grey)
    *   **Stuck/Breached**: `Stuck at Step X: [Step Name] — Y days` (red)
    *   **Active/On-track**: `Step X: [Step Name] — Y days` (blue)
*   **Reduced Cognitive Load**: Removed the Action (eye icon) column, inline warning alert count badges, and expandable nested timeline rows. The grid remains completely clean, so a recruiter scanning the table instantly knows where action is required.
*   **Inspector Launch**: Clicking any row selects the candidate and opens the detailed inspector panel.

### 2. Candidate Details inspector (Glanceable Warning Banner & Detail Isolation)
*   **Glanceable Warning Banner**: Added a high-contrast warning banner at the top of the **Onboarding SLA Milestones Timeline** that displays the active step blockage and duration:
  * `Stuck at Step 9: W-4 Withholding — 3 days` (calculated dynamically using the simulated clock).
*   **Detail Isolation**: Kept all checklist details, anomalies, logs, comments, and target settings inside the details inspector panel, keeping the main grid scanning-friendly.
*   **Header Badge Integration**: Synced the candidate summary badge in the inspector header with the human-readable status text.

### 3. Core Role & Configuration Controls
*   **Premium White-Border Role Dropdown in Header**: Replaced the previous colored button variants with a unified, premium white-and-slate bordered button selector. The selector blends perfectly with the dashboard's design system, using:
    *   A glowing indicator dot reflecting the active view (purple for Recruiter, green for OB Owner, blue for Auditor).
    *   A high-fidelity dropdown popup (`rounded-2xl`, border slate-200, backdrop-blur-md) with custom descriptions and checkmarks for each perspective.
    *   A smooth CSS fade-and-slide transition animation (`animate-dropdown-slide`).
    *   Role labels are updated: **Recruiter view** -> **Recruiter**, **Onboarding Rep** -> **OB Owner**, and **Compliance Auditor** -> **Auditor**.
*   **Non-Clipping Escalation Target Dropdown**: Upgraded the Escalation Target multi-select checklist to open downward (`top-full mt-1`) with a high z-index overlay (`z-40`). Removed the `overflow-hidden` constraints on the card and table container to guarantee it renders fully visible on all rows, preventing clipping. Options label has been cleaned: **OB Owner (OB Rep)** -> **OB Owner**.
*   **Grouped Simulated Time Widget**: Replaced the long block with a cohesive control displaying `Simulate: +X Days` alongside dedicated `-1d` and `+1d` buttons grouped inside a border container.
    *   **Info Icon Explainer**: Restored the `Info` icon next to the widget text. Hovering over it displays a clean, absolute tooltip explaining what the simulation clock does.
    *   **Two-Step Confirmation**: Clicking `-1d` or `+1d` switches the button controls inline to show a verification prompt with simple `✓` and `✗` controls, preventing accidental one-click changes.

---

## 🧪 Build Validation
*   **Status**: Next.js production build completed successfully with zero compile errors.

---
title: "Launching the Application"
---

## Launching the Application

Once WATCHOUT is installed, you are ready to launch the software. How you launch it depends on whether you are working on the Production Computer (designing) or a Display Computer (playback).

### On the Production Computer

Launch **WATCHOUT 7** from the Start Menu or your desktop shortcut.

#### The Welcome Screen
Upon first launch, you are greeted by the Welcome Screen, which serves as your project hub:

*   **New Project:** Creates a blank canvas. You will be asked to save your new `.watch` project file immediately.
*   **Open Project:** Browse your file system for an existing show file.
*   **Recent Projects:** A list of your most recently accessed files for quick entry.

#### Workspace Modes
WATCHOUT 7 offers different workspace layouts. On startup, you might be prompted to choose or confirm your layout preference:
*   **Default:** Balanced layout for general editing.
*   **Timeline Focused:** Maximizes the timeline area for intricate sequencing.
*   **Compositing:** Prioritizes the Stage and Properties windows for visual design.

### On Display Computers

On your media servers, you do not launch the main WATCHOUT interface. Instead, you launch the **Display Software**.

1.  Look for the **WATCHOUT Display** icon on the desktop or Start Menu.
2.  Launch the application.
3.  A console window or a logo screen will appear, indicating the system is ready and listening for commands.
4.  **Important:** The display software must be running *before* you try to connect from the Production computer.

#### Configuring Auto-Launch

For permanent installations, it is critical that the Display software starts automatically when the computer boots. This ensures the system recovers automatically after a power cycle.

**Step-by-Step Guide:**

1.  **Locate the Shortcut:** Find the **WATCHOUT Display** shortcut on your desktop or in the Start menu. Right-click it and select **Copy**.
2.  **Open Startup Folder:**
    *   Press `Windows Key + R` on your keyboard to open the Run dialog.
    *   Type `shell:startup` and press **Enter**.
    *   This opens the Windows Startup folder for the current user.
3.  **Paste Shortcut:** Right-click inside the Startup folder and select **Paste** (or press `Ctrl + V`).
4.  **Verify:** Restart the computer to confirm that the Display software launches automatically upon login.

:::tip
**Auto-Login:** Ensure your Windows user account is configured to log in automatically without a password prompt. This can be configured using the `netplwiz` Windows utility.
:::

### Troubleshooting Launch Issues

If the application fails to launch:

*   **License Error:** Check that your License Key is plugged in and the light is on. Open CodeMeter Control Center to verify it is detected.
*   **DirectX Error:** Ensure your GPU drivers are up to date.
*   **Firewall Prompt:** If Windows asks to allow the application access to the network, check **both** "Private" and "Public" networks and click **Allow Access**.

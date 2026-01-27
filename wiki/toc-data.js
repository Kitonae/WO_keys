// WATCHOUT User Guide - Table of Contents Data
// Extracted from Dataton_WATCHOUT_Users_Guide.pdf

// SVG Icons (Lucide-style)
const icons = {
    book: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`,
    settings: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,
    layout: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>`,
    list: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>`,
    monitor: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`,
    film: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>`,
    target: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>`,
    layers: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`,
    sparkles: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path><path d="M5 3v4"></path><path d="M19 17v4"></path><path d="M3 5h4"></path><path d="M17 19h4"></path></svg>`,
    plug: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22v-5"></path><path d="M9 8V2"></path><path d="M15 8V2"></path><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"></path></svg>`,
    code: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
    cpu: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>`,
    music: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>`,
    radio: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"></path><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"></path><circle cx="12" cy="12" r="2"></circle><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"></path><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"></path></svg>`,
    terminal: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>`,
    crosshair: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line></svg>`,
    keyboard: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><path d="M6 8h.001"></path><path d="M10 8h.001"></path><path d="M14 8h.001"></path><path d="M18 8h.001"></path><path d="M8 12h.001"></path><path d="M12 12h.001"></path><path d="M16 12h.001"></path><path d="M7 16h10"></path></svg>`,
    fileText: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
    link: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`,
    play: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`
};

const tocData = [
    {
        "level": 1,
        "title": "1. Introduction",
        "page": 4,
        "icon": "book"
    },
    {
        "level": 2,
        "title": "System Overview",
        "page": 4
    },
    {
        "level": 2,
        "title": "Software Overview",
        "page": 8
    },
    {
        "level": 1,
        "title": "2. Installation",
        "page": 10,
        "icon": "settings"
    },
    {
        "level": 2,
        "title": "Software",
        "page": 10
    },
    {
        "level": 2,
        "title": "Network",
        "page": 10
    },
    {
        "level": 2,
        "title": "License Keys",
        "page": 11
    },
    {
        "level": 2,
        "title": "Display Devices",
        "page": 11
    },
    {
        "level": 2,
        "title": "Sound",
        "page": 12
    },
    {
        "level": 2,
        "title": "Live Video Input",
        "page": 13
    },
    {
        "level": 2,
        "title": "MIDI and DMX-512",
        "page": 14
    },
    {
        "level": 2,
        "title": "VNC Server Software",
        "page": 15
    },
    {
        "level": 2,
        "title": "Manual Addressing",
        "page": 16
    },
    {
        "level": 2,
        "title": "Firewall Settings",
        "page": 18
    },
    {
        "level": 2,
        "title": "Display Computer Settings",
        "page": 19
    },
    {
        "level": 2,
        "title": "Display Computer Optimizations",
        "page": 23
    },
    {
        "level": 2,
        "title": "Hardware Synchronization",
        "page": 25
    },
    {
        "level": 2,
        "title": "General Performance",
        "page": 25
    },
    {
        "level": 2,
        "title": "Other Issues",
        "page": 28
    },
    {
        "level": 2,
        "title": "Cloning a Computer",
        "page": 28
    },
    {
        "level": 1,
        "title": "3. Windows",
        "page": 30,
        "icon": "layout"
    },
    {
        "level": 2,
        "title": "Stage Window",
        "page": 31
    },
    {
        "level": 2,
        "title": "Main Timeline Window",
        "page": 34
    },
    {
        "level": 2,
        "title": "Auxiliary Timeline Window",
        "page": 37
    },
    {
        "level": 2,
        "title": "Composition Window",
        "page": 38
    },
    {
        "level": 2,
        "title": "Media Window",
        "page": 38
    },
    {
        "level": 2,
        "title": "Input Window",
        "page": 40
    },
    {
        "level": 2,
        "title": "Output Window",
        "page": 41
    },
    {
        "level": 2,
        "title": "Task Window",
        "page": 41
    },
    {
        "level": 2,
        "title": "Status Window",
        "page": 42
    },
    {
        "level": 2,
        "title": "Message Window",
        "page": 43
    },
    {
        "level": 2,
        "title": "Network Window",
        "page": 43
    },
    {
        "level": 2,
        "title": "License Manager Window",
        "page": 44
    },
    {
        "level": 1,
        "title": "4. Commands",
        "page": 46,
        "icon": "list"
    },
    {
        "level": 2,
        "title": "File Menu",
        "page": 46
    },
    {
        "level": 2,
        "title": "Edit Menu",
        "page": 55
    },
    {
        "level": 2,
        "title": "Stage Menu",
        "page": 58
    },
    {
        "level": 2,
        "title": "Preview Menu",
        "page": 63
    },
    {
        "level": 2,
        "title": "Media Menu",
        "page": 65
    },
    {
        "level": 2,
        "title": "Timeline Menu",
        "page": 77
    },
    {
        "level": 2,
        "title": "Tween Menu",
        "page": 81
    },
    {
        "level": 2,
        "title": "Window Menu",
        "page": 81
    },
    {
        "level": 2,
        "title": "Help Menu",
        "page": 81
    },
    {
        "level": 1,
        "title": "5. Displays and Projectors",
        "page": 82,
        "icon": "monitor"
    },
    {
        "level": 2,
        "title": "2D Display/Projector",
        "page": 83
    },
    {
        "level": 2,
        "title": "3D Mapping Projector",
        "page": 86
    },
    {
        "level": 2,
        "title": "Virtual Display",
        "page": 91
    },
    {
        "level": 2,
        "title": "Geometry Correction",
        "page": 95
    },
    {
        "level": 2,
        "title": "Masking",
        "page": 100
    },
    {
        "level": 2,
        "title": "Advanced",
        "page": 102
    },
    {
        "level": 2,
        "title": "Using Multiple Display Outputs",
        "page": 104
    },
    {
        "level": 2,
        "title": "Display Setup",
        "page": 106
    },
    {
        "level": 1,
        "title": "6. Media",
        "page": 109,
        "icon": "film"
    },
    {
        "level": 2,
        "title": "Still Images",
        "page": 109
    },
    {
        "level": 2,
        "title": "Video",
        "page": 111
    },
    {
        "level": 2,
        "title": "Image Sequences",
        "page": 115
    },
    {
        "level": 2,
        "title": "Audio",
        "page": 115
    },
    {
        "level": 2,
        "title": "Live Video",
        "page": 116
    },
    {
        "level": 2,
        "title": "Computer Screen",
        "page": 116
    },
    {
        "level": 2,
        "title": "Network Video",
        "page": 117
    },
    {
        "level": 2,
        "title": "NDI video",
        "page": 119
    },
    {
        "level": 2,
        "title": "Dynamic Images",
        "page": 121
    },
    {
        "level": 2,
        "title": "3D Models",
        "page": 121
    },
    {
        "level": 2,
        "title": "Solid",
        "page": 126
    },
    {
        "level": 2,
        "title": "Text",
        "page": 126
    },
    {
        "level": 2,
        "title": "DMX-512 Recording",
        "page": 129
    },
    {
        "level": 1,
        "title": "7. Cues",
        "page": 131,
        "icon": "target"
    },
    {
        "level": 2,
        "title": "Cue Specifications",
        "page": 133
    },
    {
        "level": 2,
        "title": "Sound Cue Specifications",
        "page": 140
    },
    {
        "level": 2,
        "title": "Tween Tracks",
        "page": 141
    },
    {
        "level": 2,
        "title": "Control Cue",
        "page": 149
    },
    {
        "level": 1,
        "title": "8. Compositions",
        "page": 151,
        "icon": "layers"
    },
    {
        "level": 2,
        "title": "Creating a Composition",
        "page": 151
    },
    {
        "level": 2,
        "title": "Adding Cues",
        "page": 152
    },
    {
        "level": 2,
        "title": "Using the Composition",
        "page": 152
    },
    {
        "level": 2,
        "title": "Nesting Compositions",
        "page": 153
    },
    {
        "level": 1,
        "title": "9. Dynamic Images",
        "page": 154,
        "icon": "sparkles"
    },
    {
        "level": 2,
        "title": "Serving Still Images",
        "page": 154
    },
    {
        "level": 2,
        "title": "Serving HTML Content",
        "page": 155
    },
    {
        "level": 2,
        "title": "Serving SWF Files",
        "page": 155
    },
    {
        "level": 2,
        "title": "Dynamic Image Parameters",
        "page": 157
    },
    {
        "level": 1,
        "title": "10. Inputs and Outputs",
        "page": 159,
        "icon": "plug"
    },
    {
        "level": 2,
        "title": "Inputs",
        "page": 159
    },
    {
        "level": 2,
        "title": "Outputs",
        "page": 164
    },
    {
        "level": 1,
        "title": "11. Tasks and Expressions",
        "page": 167,
        "icon": "code"
    },
    {
        "level": 2,
        "title": "Auxiliary Timeline",
        "page": 167
    },
    {
        "level": 2,
        "title": "Expression",
        "page": 169
    },
    {
        "level": 1,
        "title": "A. System Requirements",
        "page": 172,
        "icon": "cpu"
    },
    {
        "level": 1,
        "title": "B. MIDI Show Control",
        "page": 173,
        "icon": "music"
    },
    {
        "level": 1,
        "title": "C. Control Protocol",
        "page": 175,
        "icon": "radio"
    },
    {
        "level": 2,
        "title": "Controlling the Production Software",
        "page": 176
    },
    {
        "level": 2,
        "title": "Controlling the Display Software",
        "page": 176
    },
    {
        "level": 2,
        "title": "List of Commands",
        "page": 178
    },
    {
        "level": 2,
        "title": "Command ID Tagging",
        "page": 187
    },
    {
        "level": 1,
        "title": "D. Command Line Options",
        "page": 188,
        "icon": "terminal"
    },
    {
        "level": 2,
        "title": "Display Software",
        "page": 189
    },
    {
        "level": 2,
        "title": "Production Software",
        "page": 191
    },
    {
        "level": 2,
        "title": "Dynamic Image Server",
        "page": 191
    },
    {
        "level": 1,
        "title": "E. Tracking Input",
        "page": 193,
        "icon": "crosshair"
    },
    {
        "level": 2,
        "title": "Control Media",
        "page": 193
    },
    {
        "level": 2,
        "title": "Control 3D Models",
        "page": 193
    },
    {
        "level": 2,
        "title": "Realtime Tracking Preferences",
        "page": 194
    },
    {
        "level": 1,
        "title": "F. Keyboard Shortcuts",
        "page": 195,
        "icon": "keyboard"
    },
    {
        "level": 2,
        "title": "General",
        "page": 195
    },
    {
        "level": 2,
        "title": "Edit",
        "page": 195
    },
    {
        "level": 2,
        "title": "Stage & Preview",
        "page": 196
    },
    {
        "level": 2,
        "title": "Tween",
        "page": 198
    },
    {
        "level": 2,
        "title": "Audio Tween Track",
        "page": 198
    }
];

// Get icon SVG by name
function getIcon(iconName) {
    return icons[iconName] || icons.fileText;
}

// Process TOC data into hierarchical structure
function processHierarchy() {
    const chapters = [];
    let currentChapter = null;

    tocData.forEach((item) => {
        if (item.level === 1) {
            currentChapter = {
                ...item,
                subsections: []
            };
            chapters.push(currentChapter);
        } else if (item.level === 2 && currentChapter) {
            currentChapter.subsections.push(item);
        }
    });

    return chapters;
}

const chaptersData = processHierarchy();

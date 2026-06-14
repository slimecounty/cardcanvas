const card_sizes = {
  expanded: { width: 344, height: 520 },
  compact: { width: 344, height: 178 }
};

const card_defaults = {
  color: "#ffffff",
  lineColor: "#000000",
  gridSize: 24,
  projectName: "Untitled",
  autoSaveInterval: 300000,
  namingPrefix: "Scene",
  namingSequence: "number"
};

const PROJECT_TARGET_ID = "project_title";
const TITLE_CARD_TYPE = "title";

const SLUG_PREFIXES = ["INT.", "EXT.", "INT./EXT.", "EXT./INT."];
const SLUG_TIMES = ["DAY", "NIGHT", "CONTINUOUS", "LATER", "MOMENTS LATER", "DAWN", "DUSK"];

const card_type_flags = {
  title: {
    story: false,
    media: true,
    sceneFields: false,
    characters: false,
    dialogueInsert: false,
    singleIncoming: false,
    singleOutgoing: false,
    defaultColor: "#000000",
    arrowColor: "#000000",
    defaultPrefix: "Title"
  },
  scene: {
    story: true,
    media: true,
    sceneFields: true,
    characters: true,
    dialogueInsert: false,
    singleIncoming: true,
    singleOutgoing: true,
    defaultColor: null,
    arrowColor: null,
    defaultPrefix: "Scene"
  },
  note: {
    story: false,
    media: false,
    sceneFields: false,
    characters: false,
    dialogueInsert: false,
    singleIncoming: false,
    singleOutgoing: true,
    defaultColor: "#f0f7ff",
    arrowColor: "#000000",
    defaultPrefix: "Note"
  },
  dialog: {
    story: true,
    media: false,
    sceneFields: false,
    characters: true,
    dialogueInsert: true,
    singleIncoming: true,
    singleOutgoing: true,
    defaultColor: "#fff7d6",
    arrowColor: null,
    defaultPrefix: "Dialog"
  },
  character: {
    story: false,
    media: true,
    sceneFields: false,
    characters: false,
    dialogueInsert: false,
    singleIncoming: true,
    singleOutgoing: true,
    defaultColor: "#eef4ed",
    arrowColor: null,
    defaultPrefix: "Character"
  }
};

const card_icons = {
  close: materialIcon("close"),
  delete: materialIcon("delete"),
  edit: materialIcon("edit"),
  save: materialIcon("check"),
  expand: materialIcon("open_in_full"),
  link: materialIcon("link"),
  image: materialIcon("image"),
  palette: materialIcon("palette"),
  copy: materialIcon("content_copy"),
  personAdd: materialIcon("person_add")
};

// Returns Material Symbols icon markup.
function materialIcon(name, extraClass = "") {
  const className = ["material-symbols-outlined", extraClass].filter(Boolean).join(" ");
  return `<span class="${className}" aria-hidden="true">${name}</span>`;
}

const card_state = {
  projectName: "",
  projectHasSavedFile: false,
  cards: [],
  lines: [],
  preferences: {
    defaultCardColor: card_defaults.color,
    cardMedPref: "text",
    newCardAxis: "x",
    gridSize: card_defaults.gridSize,
    hideBranding: false,
    autoSaveEnabled: true,
    autoSaveInterval: card_defaults.autoSaveInterval,
    namingPrefix: card_defaults.namingPrefix,
    namingSequence: card_defaults.namingSequence
  },
  characters: [],
  fileHandle: null,
  savedProjectName: "",
  autoSaveTimer: null,
  autoSaveNoticeShown: false,
  gridDialogStartSize: card_defaults.gridSize,
  undoStack: [],
  redoStack: [],
  restoringHistory: false,
  storylineTitles: {},
  pan: { x: 84, y: 72 },
  zoom: 1,
  nextCard: 1,
  nextLine: 1,
  nextCardCreation: 1,
  nextLineCreation: 1,
  selectedCardId: null,
  selectedCardIds: [],
  raisedCardId: null,
  selectionTool: "grab",
  shiftLassoActive: false,
  lastCardDoubleClick: null,
  pendingDeleteId: null,
  pointer: null,
  paneResize: null,
  lastTouchTap: null,
  lastCardPress: null,
  storyPress: null,
  touchPoints: new Map(),
  inspirations: [],
  mobileActiveView: "cards",
  textPopoutWindow: null,
  textPopoutUrl: "",
  prePopoutGridTemplate: "",
  textPopoutWatch: null,
  characterEditOriginal: ""
};

const dom = {};

document.addEventListener("DOMContentLoaded", () => {
  cacheDom();
  bindEvents();
  loadInspirations();
  ensureTitleCard({ skipDirty: true, select: true });
  renderAll();
});

// Caches static DOM nodes used by the app.
function cacheDom() {
  dom.windowMain = document.getElementById("window_main");
  dom.windowCards = document.getElementById("window_cards");
  dom.windowText = document.getElementById("window_text");
  dom.paneResizer = document.getElementById("paneResizer");
  dom.canvasViewport = document.getElementById("canvasViewport");
  dom.canvasWorld = document.getElementById("canvasWorld");
  dom.lineLayer = document.getElementById("lineLayer");
  dom.cardsLayer = document.getElementById("cardsLayer");
  dom.lassoRect = document.getElementById("lassoRect");
  dom.storyOutput = document.getElementById("storyOutput");
  dom.storyCount = document.getElementById("storyCount");
  dom.cardCount = document.getElementById("cardCount");
  dom.zoomReadout = document.getElementById("zoomReadout");
  dom.fileMenuButton = document.getElementById("fileMenuButton");
  dom.fileMenuPanel = document.getElementById("fileMenuPanel");
  dom.windowMenuButton = document.getElementById("windowMenuButton");
  dom.windowMenuPanel = document.getElementById("windowMenuPanel");
  dom.settingsMenuButton = document.getElementById("settingsMenuButton");
  dom.settingsMenuPanel = document.getElementById("settingsMenuPanel");
  dom.prefCardColorButton = document.getElementById("prefCardColorButton");
  dom.openGridSize = document.getElementById("openGridSize");
  dom.expandAllCards = document.getElementById("expandAllCards");
  dom.compactAllCards = document.getElementById("compactAllCards");
  dom.newProject = document.getElementById("newProject");
  dom.saveProject = document.getElementById("saveProject");
  dom.saveAsProject = document.getElementById("saveAsProject");
  dom.loadProject = document.getElementById("loadProject");
  dom.exportHtml = document.getElementById("exportHtml");
  dom.exportText = document.getElementById("exportText");
  dom.exportCharacterReport = document.getElementById("exportCharacterReport");
  dom.projectFileInput = document.getElementById("projectFileInput");
  dom.projectNameInput = document.getElementById("projectNameInput");
  dom.mobileStoryProjectTitle = document.getElementById("mobileStoryProjectTitle");
  dom.mobileTabs = document.getElementById("mobileTabs");
  dom.mobileCardsTab = document.getElementById("mobileCardsTab");
  dom.mobileTextTab = document.getElementById("mobileTextTab");
  dom.mobileAddCard = document.getElementById("mobileAddCard");
  dom.noteAddCard = document.getElementById("noteAddCard");
  dom.dialogAddCard = document.getElementById("dialogAddCard");
  dom.bulkSelectMode = document.getElementById("bulkSelectMode");
  dom.undoAction = document.getElementById("undoAction");
  dom.redoAction = document.getElementById("redoAction");
  dom.mediaFileInput = document.getElementById("mediaFileInput");
  dom.prefGridSize = document.getElementById("prefGridSize");
  dom.gridDialog = document.getElementById("gridDialog");
  dom.openNamingScheme = document.getElementById("openNamingScheme");
  dom.namingDialog = document.getElementById("namingDialog");
  dom.namingPrefixInput = document.getElementById("namingPrefixInput");
  dom.colorDialog = document.getElementById("colorDialog");
  dom.centerColorInput = document.getElementById("centerColorInput");
  dom.applyColor = document.getElementById("applyColor");
  dom.jumpToStart = document.getElementById("jumpToStart");
  dom.jumpToEnd = document.getElementById("jumpToEnd");
  dom.alignTimelineCards = document.getElementById("alignTimelineCards");
  dom.toggleBranding = document.getElementById("toggleBranding");
  dom.autoSaveToggle = document.getElementById("autoSaveToggle");
  dom.assetsMenuButton = document.getElementById("assetsMenuButton");
  dom.assetsMenuPanel = document.getElementById("assetsMenuPanel");
  dom.openCharactersDialog = document.getElementById("openCharactersDialog");
  dom.charactersDialog = document.getElementById("charactersDialog");
  dom.characterNameInput = document.getElementById("characterNameInput");
  dom.characterList = document.getElementById("characterList");
  dom.addCharacter = document.getElementById("addCharacter");
  dom.copyCharacter = document.getElementById("copyCharacter");
  dom.deleteCharacter = document.getElementById("deleteCharacter");
  dom.mediaDialog = document.getElementById("mediaDialog");
  dom.newProjectDialog = document.getElementById("newProjectDialog");
  dom.discardNewProject = document.getElementById("discardNewProject");
  dom.saveNewProject = document.getElementById("saveNewProject");
  dom.deleteMedia = document.getElementById("deleteMedia");
  dom.replaceMedia = document.getElementById("replaceMedia");
  dom.deleteDialog = document.getElementById("deleteDialog");
  dom.confirmDelete = document.getElementById("confirmDelete");
  dom.zoomIn = document.getElementById("zoomIn");
  dom.zoomOut = document.getElementById("zoomOut");
  dom.textPopout = document.getElementById("textPopout");
  dom.windowPopout = document.getElementById("windowPopout");
  dom.windowPopin = document.getElementById("windowPopin");
}

// Attaches all UI, pointer, file, and dialog event handlers.
function bindEvents() {
  dom.windowCards.addEventListener("pointerdown", () => setActivePane("cards"));
  dom.windowCards.addEventListener("focusin", () => setActivePane("cards"));
  dom.windowText.addEventListener("pointerdown", () => {
    setActivePane("text");
  });
  dom.windowText.addEventListener("focusin", () => setActivePane("text"));

  dom.fileMenuButton.addEventListener("click", (event) => toggleMenu(event, "file"));
  dom.windowMenuButton.addEventListener("click", (event) => toggleMenu(event, "window"));
  dom.settingsMenuButton.addEventListener("click", (event) => toggleMenu(event, "settings"));
  document.addEventListener("pointerdown", closeMenusFromOutside);
  document.addEventListener("pointerdown", handleDocumentPointerDown);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenus();
      clearPointer();
    }
  });
  document.addEventListener("keydown", handleGlobalKeyDown);
  document.addEventListener("keyup", handleGlobalKeyUp);

  dom.settingsMenuPanel.addEventListener("click", handleSettingsMenuClick);
  dom.fileMenuPanel.addEventListener("click", handleFileMenuClick);
  dom.prefGridSize.addEventListener("input", handleGridSizeInput);
  dom.openGridSize.addEventListener("click", () => {
    closeMenus();
    openGridSizeDialog();
  });
  dom.prefCardColorButton.addEventListener("click", () => {
    closeMenus();
    openCenteredColorPicker("default-card", card_state.preferences.defaultCardColor);
  });
  dom.expandAllCards.addEventListener("click", () => {
    closeMenus();
    expandAllCards();
  });
  dom.compactAllCards.addEventListener("click", () => {
    closeMenus();
    compactAllCards();
  });
  dom.newProject.addEventListener("click", () => {
    closeMenus();
    requestNewProject();
  });
  dom.saveProject.addEventListener("click", () => {
    closeMenus();
    saveProjectJson();
  });
  dom.saveAsProject.addEventListener("click", () => {
    closeMenus();
    saveProjectJson({ saveAs: true });
  });
  dom.loadProject.addEventListener("click", () => {
    closeMenus();
    loadProjectRequested();
  });
  dom.exportHtml.addEventListener("click", () => {
    closeMenus();
    exportWindowTextHtml();
  });
  dom.exportText.addEventListener("click", () => {
    closeMenus();
    exportWindowTextPlain();
  });
  dom.exportCharacterReport.addEventListener("click", () => {
    closeMenus();
    exportCharacterReport();
  });
  dom.projectFileInput.addEventListener("change", loadProjectFromFile);
  dom.mediaFileInput.addEventListener("change", handleMediaFileSelected);
  dom.gridDialog.addEventListener("close", handleGridDialogClose);
  dom.autoSaveToggle.addEventListener("change", handleAutoSaveToggle);
  dom.windowMenuPanel.addEventListener("click", handleWindowMenuClick);
  dom.assetsMenuButton.addEventListener("click", (event) => toggleMenu(event, "assets"));
  dom.openCharactersDialog.addEventListener("click", () => {
    closeMenus();
    openCharactersDialog();
  });
  dom.addCharacter.addEventListener("click", addCharacterFromDialog);
  dom.copyCharacter.addEventListener("click", copySelectedCharacter);
  dom.deleteCharacter.addEventListener("click", deleteSelectedCharacter);
  dom.characterList.addEventListener("change", syncCharacterDialogSelection);
  dom.characterList.addEventListener("input", syncCharacterDialogSelection);
  dom.characterNameInput.addEventListener("keydown", handleCharacterNameKeydown);
  dom.charactersDialog.addEventListener("close", () => commitCharacterNameEdit());

  dom.confirmDelete.addEventListener("click", (event) => {
    event.preventDefault();
    deletePendingCard();
    dom.deleteDialog.close();
  });
  dom.deleteMedia.addEventListener("click", deleteSelectedMedia);
  dom.replaceMedia.addEventListener("click", replaceSelectedMedia);
  dom.discardNewProject.addEventListener("click", () => {
    dom.newProjectDialog.close();
    resetProject();
  });
  dom.saveNewProject.addEventListener("click", async () => {
    const saved = await saveProjectJson();
    if (!saved) return;
    dom.newProjectDialog.close();
    resetProject();
  });

  dom.zoomIn.addEventListener("click", () => zoomCanvasBy(1.14));
  dom.zoomOut.addEventListener("click", () => zoomCanvasBy(1 / 1.14));
  dom.textPopout.addEventListener("click", popOutTextPane);
  dom.windowPopout.addEventListener("click", () => {
    closeMenus();
    popOutTextPane();
  });
  dom.windowPopin.addEventListener("click", () => {
    closeMenus();
    popInTextPane(true);
  });
  dom.jumpToStart.addEventListener("click", () => {
    closeMenus();
    jumpToCreatedCard("start");
  });
  dom.jumpToEnd.addEventListener("click", () => {
    closeMenus();
    jumpToCreatedCard("end");
  });
  dom.alignTimelineCards.addEventListener("click", () => {
    closeMenus();
    alignTimelineCards();
  });
  dom.mobileCardsTab.addEventListener("click", () => setMobileView("cards"));
  dom.mobileTextTab.addEventListener("click", () => setMobileView("text"));
  dom.mobileAddCard.addEventListener("click", () => createConnectedCardFromButton("scene"));
  dom.noteAddCard.addEventListener("click", () => createConnectedCardFromButton("note"));
  dom.dialogAddCard.addEventListener("click", () => createConnectedCardFromButton("dialog"));
  dom.bulkSelectMode.addEventListener("click", toggleSelectionTool);
  dom.undoAction.addEventListener("click", undoAction);
  dom.redoAction.addEventListener("click", redoAction);
  dom.openNamingScheme.addEventListener("click", () => {
    closeMenus();
    openNamingSchemeDialog();
  });
  dom.namingPrefixInput.addEventListener("input", handleNamingPrefixInput);
  document.querySelectorAll('input[name="namingSequence"]').forEach((radio) => {
    radio.addEventListener("change", handleNamingSequenceChange);
  });
  window.addEventListener("resize", handleViewportModeChange);

  dom.canvasViewport.addEventListener("pointerdown", handleCanvasPointerDown);
  dom.canvasViewport.addEventListener("dblclick", handleCanvasDoubleClick);
  dom.canvasViewport.addEventListener("wheel", handleCanvasWheel, { passive: false });

  dom.cardsLayer.addEventListener("pointerdown", handleCardPointerDown);
  dom.cardsLayer.addEventListener("click", handleCardClick);
  dom.cardsLayer.addEventListener("input", handleCardInput);
  dom.cardsLayer.addEventListener("change", handleCardChange);
  dom.cardsLayer.addEventListener("dblclick", handleCardDoubleClick);
  dom.storyOutput.addEventListener("dblclick", handleStoryDoubleClick);
  dom.storyOutput.addEventListener("pointerdown", handleStoryPointerDown);
  dom.storyOutput.addEventListener("pointermove", handleStoryPointerMove);
  dom.storyOutput.addEventListener("pointerup", handleStoryPointerUp);
  dom.storyOutput.addEventListener("pointercancel", handleStoryPointerUp);
  dom.storyOutput.addEventListener("keydown", handleStoryEditorKeydown);
  dom.storyOutput.addEventListener("blur", handleStoryEditorBlur, true);
  dom.storyOutput.addEventListener("click", handleStoryClick);

  dom.applyColor.addEventListener("click", applyCenteredColor);

  dom.paneResizer.addEventListener("pointerdown", startPaneResize);
  dom.paneResizer.addEventListener("dblclick", resetPaneResize);
  dom.paneResizer.addEventListener("keydown", handlePaneResizeKeydown);

  document.querySelectorAll("[data-story-field]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      renderStory();
      closeMenus();
    });
  });

  window.cardPopInText = () => popInTextPane(true);
  window.cardSetStoryField = (field, checked) => {
    const checkbox = document.querySelector(`[data-story-field="${CSS.escape(field)}"]`);
    if (!checkbox) return;
    checkbox.checked = Boolean(checked);
    renderStory();
  };
  setMobileView(card_state.mobileActiveView);
  updateSelectionToolUi();
  handleViewportModeChange();
}

// Loads optional body-text placeholder phrases when served over HTTP.
async function loadInspirations() {
  if (window.location.protocol === "file:") return;
  try {
    const response = await fetch("inspiration.txt", { cache: "no-store" });
    if (!response.ok) return;
    const text = await response.text();
    card_state.inspirations = text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => line.replace(/^["']|["']$/g, ""));
  } catch {
    card_state.inspirations = [];
  }
}

// Handles global key presses for temporary lasso mode.
function handleGlobalKeyDown(event) {
  if (event.key !== "Shift" || isTypingTarget(event.target)) return;
  card_state.shiftLassoActive = true;
  updateSelectionToolUi();
}

// Handles global key releases for temporary lasso mode.
function handleGlobalKeyUp(event) {
  if (event.key !== "Shift") return;
  card_state.shiftLassoActive = false;
  updateSelectionToolUi();
}

// Toggles the persistent card selection tool between grid panning and lasso selection.
function toggleSelectionTool() {
  card_state.selectionTool = card_state.selectionTool === "lasso" ? "grab" : "lasso";
  updateSelectionToolUi();
}

// Returns whether lasso selection is currently active.
function isLassoMode() {
  return card_state.shiftLassoActive || card_state.selectionTool === "lasso";
}

// Updates lasso button labels, icon state, and canvas cursor state.
function updateSelectionToolUi() {
  if (!dom.bulkSelectMode || !dom.canvasViewport) return;
  const effectiveLasso = isLassoMode();
  const persistentLasso = card_state.selectionTool === "lasso";
  dom.bulkSelectMode.classList.toggle("is-lasso-effective", effectiveLasso);
  dom.bulkSelectMode.setAttribute("aria-pressed", String(persistentLasso));
  dom.bulkSelectMode.title = effectiveLasso ? "Switch to grab mode" : "Switch to lasso mode";
  dom.bulkSelectMode.setAttribute("aria-label", dom.bulkSelectMode.title);
  dom.canvasViewport.classList.toggle("is-lasso-mode", effectiveLasso);
}

// Returns whether a keyboard event started inside an editable text control.
function isTypingTarget(target) {
  const element = target instanceof Element ? target : null;
  if (!element) return false;
  return Boolean(element.closest("input, textarea, select, [contenteditable='true']"));
}

// Marks the card or story pane as the active focused pane.
function setActivePane(pane) {
  dom.windowCards.classList.toggle("is-focused", pane === "cards");
  dom.windowText.classList.toggle("is-focused", pane === "text");
}

// Opens one top-level dropdown menu and closes the others.
function toggleMenu(event, menu) {
  event.stopPropagation();
  const menus = {
    file: [dom.fileMenuButton, dom.fileMenuPanel],
    window: [dom.windowMenuButton, dom.windowMenuPanel],
    settings: [dom.settingsMenuButton, dom.settingsMenuPanel],
    assets: [dom.assetsMenuButton, dom.assetsMenuPanel]
  };
  const [button, panel] = menus[menu];
  const willOpen = panel.hidden;
  Object.entries(menus).forEach(([key, [itemButton, itemPanel]]) => {
    if (key === menu) return;
    itemPanel.hidden = true;
    itemButton.setAttribute("aria-expanded", "false");
  });
  panel.hidden = !willOpen;
  button.setAttribute("aria-expanded", String(willOpen));
  if (willOpen && menu === "settings") syncSettingsMenuState();
  if (willOpen && menu === "window") syncWindowMenuState();
}

// Closes dropdown menus when pointer input lands outside menu controls.
function closeMenusFromOutside(event) {
  if (!event.target.closest(".file-menu")) closeMenus();
}

// Closes all top-level dropdown menus and resets their expanded state.
function closeMenus() {
  dom.fileMenuPanel.hidden = true;
  dom.windowMenuPanel.hidden = true;
  dom.settingsMenuPanel.hidden = true;
  dom.assetsMenuPanel.hidden = true;
  dom.fileMenuButton.setAttribute("aria-expanded", "false");
  dom.windowMenuButton.setAttribute("aria-expanded", "false");
  dom.settingsMenuButton.setAttribute("aria-expanded", "false");
  dom.assetsMenuButton.setAttribute("aria-expanded", "false");
}

// Handles document-level click-off behavior for project name and character dropdowns.
function handleDocumentPointerDown(event) {
  if (!event.target.closest(".character-field")) closeCharacterPickers();
}

// Sets mobile view.
function setMobileView(view) {
  card_state.mobileActiveView = view === "text" ? "text" : "cards";
  dom.windowMain.classList.toggle("mobile-show-text", card_state.mobileActiveView === "text");
  dom.windowMain.classList.toggle("mobile-show-cards", card_state.mobileActiveView !== "text");
  dom.mobileCardsTab.classList.toggle("is-active", card_state.mobileActiveView !== "text");
  dom.mobileTextTab.classList.toggle("is-active", card_state.mobileActiveView === "text");
  dom.mobileCardsTab.setAttribute("aria-selected", String(card_state.mobileActiveView !== "text"));
  dom.mobileTextTab.setAttribute("aria-selected", String(card_state.mobileActiveView === "text"));
}

// Returns whether mobile mode.
function isMobileMode() {
  return window.matchMedia("(max-width: 820px)").matches;
}

// Handles viewport mode change events and updates related state.
function handleViewportModeChange() {
  if (isMobileMode()) {
    popInTextPane(true);
    dom.windowMain.style.gridTemplateColumns = "";
  }
  updateMenuState();
}

// Synchronizes settings menu state UI state from preferences or selection.
function syncSettingsMenuState() {
  dom.settingsMenuPanel.querySelectorAll("[data-setting-card-med]").forEach((button) => {
    button.setAttribute("aria-checked", String(button.dataset.settingCardMed === card_state.preferences.cardMedPref));
  });
  dom.settingsMenuPanel.querySelectorAll("[data-setting-axis]").forEach((button) => {
    button.setAttribute("aria-checked", String(button.dataset.settingAxis === getNewCardAxis()));
  });
  dom.settingsMenuPanel.querySelectorAll("[data-auto-save-interval]").forEach((button) => {
    button.setAttribute("aria-checked", String(Number(button.dataset.autoSaveInterval) === card_state.preferences.autoSaveInterval));
  });
  dom.autoSaveToggle.checked = Boolean(card_state.preferences.autoSaveEnabled);
  syncNamingDialog();
}

// Synchronizes window menu state UI state from preferences or selection.
function syncWindowMenuState() {
  dom.toggleBranding.setAttribute("aria-checked", String(Boolean(card_state.preferences.hideBranding)));
}

// Handles settings menu click events and updates related state.
function handleSettingsMenuClick(event) {
  const mediaButton = event.target.closest("[data-setting-card-med]");
  if (mediaButton) {
    recordHistory();
    card_state.preferences.cardMedPref = mediaButton.dataset.settingCardMed === "image" ? "image" : "text";
    syncSettingsMenuState();
    markDirty();
    renderAll();
    closeMenus();
    return;
  }

  const axisButton = event.target.closest("[data-setting-axis]");
  if (axisButton) {
    recordHistory();
    card_state.preferences.newCardAxis = axisButton.dataset.settingAxis === "y" ? "y" : "x";
    syncSettingsMenuState();
    markDirty();
    renderStory();
    closeMenus();
    return;
  }

  const autoSaveIntervalButton = event.target.closest("[data-auto-save-interval]");
  if (autoSaveIntervalButton) {
    recordHistory();
    card_state.preferences.autoSaveInterval = Number(autoSaveIntervalButton.dataset.autoSaveInterval) || card_defaults.autoSaveInterval;
    syncSettingsMenuState();
    markDirty();
    closeMenus();
    return;
  }
}

// Handles file menu click events and updates related state.
function handleFileMenuClick(event) {
  const sceneReportButton = event.target.closest("[data-scene-report]");
  if (!sceneReportButton) return;
  closeMenus();
  exportSceneReport(sceneReportButton.dataset.sceneReport);
}

// Handles window menu click events and updates related state.
function handleWindowMenuClick(event) {
  if (event.target.closest("#toggleBranding")) {
    recordHistory();
    card_state.preferences.hideBranding = !card_state.preferences.hideBranding;
    applyBrandingPreference();
    syncWindowMenuState();
    markDirty();
    closeMenus();
  }
}

// Handles auto save toggle events and updates related state.
function handleAutoSaveToggle() {
  recordHistory();
  card_state.preferences.autoSaveEnabled = dom.autoSaveToggle.checked;
  syncSettingsMenuState();
  if (!card_state.preferences.autoSaveEnabled) clearAutoSaveTimer();
  else scheduleAutoSave();
  markDirty();
  closeMenus();
}

// Opens naming scheme dialog.
function openNamingSchemeDialog() {
  syncNamingDialog();
  dom.namingDialog.showModal();
  requestAnimationFrame(() => dom.namingPrefixInput.focus());
}

// Synchronizes naming dialog UI state from preferences or selection.
function syncNamingDialog() {
  if (!dom.namingPrefixInput) return;
  dom.namingPrefixInput.value = getNamingPrefix();
  document.querySelectorAll('input[name="namingSequence"]').forEach((radio) => {
    radio.checked = radio.value === getNamingSequence();
  });
}

// Handles naming prefix input events and updates related state.
function handleNamingPrefixInput(event) {
  recordHistory();
  const prefix = normalizeNamingPrefix(event.target.value);
  card_state.preferences.namingPrefix = prefix;
  if (event.target.value !== prefix) event.target.value = prefix;
  markDirty();
}

// Handles naming sequence change events and updates related state.
function handleNamingSequenceChange(event) {
  if (!event.target.checked) return;
  recordHistory();
  card_state.preferences.namingSequence = event.target.value === "letter" ? "letter" : "number";
  markDirty();
}

// Opens grid size dialog.
function openGridSizeDialog() {
  card_state.gridDialogStartSize = card_state.preferences.gridSize;
  dom.prefGridSize.value = card_state.preferences.gridSize;
  dom.gridDialog.showModal();
  requestAnimationFrame(() => dom.prefGridSize.focus());
}

// Handles grid size input events and updates related state.
function handleGridSizeInput(event) {
  if (document.activeElement !== dom.prefGridSize) return;
  recordHistory();
  const gridSize = clamp(Number(event.target.value) || card_defaults.gridSize, 8, 96);
  card_state.preferences.gridSize = gridSize;
  snapAllCardsToGrid();
  markDirty();
  renderAll();
}

// Handles grid dialog close events and updates related state.
function handleGridDialogClose() {
  if (dom.gridDialog.returnValue !== "cancel") return;
  card_state.preferences.gridSize = card_state.gridDialogStartSize;
  dom.prefGridSize.value = card_state.gridDialogStartSize;
  snapAllCardsToGrid();
  markDirty();
  renderAll();
}

// Applies branding preference.
function applyBrandingPreference() {
  document.body.classList.toggle("hide-branding", Boolean(card_state.preferences.hideBranding));
}

// Supports jump to created card.
function jumpToCreatedCard(position) {
  if (!card_state.cards.length) return;
  const sortedCards = [...card_state.cards].sort((a, b) => a.creationIndex - b.creationIndex);
  const timelineCards = getTimelineStoryCards();
  const card = timelineCards.length
    ? (position === "end" ? timelineCards[timelineCards.length - 1] : timelineCards[0])
    : (position === "end" ? sortedCards[sortedCards.length - 1] : getTitleCard() || sortedCards[0]);
  selectCard(card.id);
  card_state.raisedCardId = card.id;
  centerCanvasOnCard(card);
  renderCards();
}

// Supports center canvas on card.
function centerCanvasOnCard(card) {
  const rect = dom.canvasViewport.getBoundingClientRect();
  const center = getCardCenter(card);
  card_state.zoom = 1;
  card_state.pan.x = rect.width / 2 - center.x;
  card_state.pan.y = rect.height / 2 - center.y;
  renderCanvasTransform();
  renderLines();
}

// Renders canvas transform, cards, lines, story output, and menu state.
function renderAll() {
  ensureTitleCard({ skipDirty: true });
  refreshConnectionFlags();
  renderCanvasTransform();
  renderCards();
  renderLines();
  renderStory();
  updateMenuState();
  dom.cardCount.value = String(card_state.cards.length);
}

// Mirrors the project title into the mobile-only story pane header.
function updateMobileStoryProjectTitle() {
  if (dom.mobileStoryProjectTitle) dom.mobileStoryProjectTitle.value = getProjectName();
}

// Mirrors the project name into the read-only header display.
function updateProjectNameDisplay() {
  if (dom.projectNameInput) dom.projectNameInput.value = getProjectName();
  updateMobileStoryProjectTitle();
}

// Supports mark dirty.
function markDirty() {
  card_state.projectHasSavedFile = false;
  scheduleAutoSave();
  updateMenuState();
}

// Supports mark saved.
function markSaved() {
  card_state.projectHasSavedFile = true;
  card_state.autoSaveNoticeShown = false;
  clearAutoSaveTimer();
  updateMenuState();
}

// Supports update menu state.
function updateMenuState() {
  if (dom.undoAction) dom.undoAction.disabled = !card_state.undoStack.length;
  if (dom.redoAction) dom.redoAction.disabled = !card_state.redoStack.length;
  const popoutUnavailable = isMobileMode() || window.location.protocol === "file:";
  if (dom.windowPopout) dom.windowPopout.disabled = popoutUnavailable;
  if (dom.textPopout) dom.textPopout.disabled = popoutUnavailable;
  if (dom.windowPopin) dom.windowPopin.disabled = popoutUnavailable || !(card_state.textPopoutWindow && !card_state.textPopoutWindow.closed);
  if (dom.jumpToStart) dom.jumpToStart.disabled = !card_state.cards.length;
  if (dom.jumpToEnd) dom.jumpToEnd.disabled = !card_state.cards.length;
  updateSelectionToolUi();
}

// Stores a bounded undo snapshot when the project state changes.
function recordHistory() {
  if (card_state.restoringHistory) return;
  const snapshot = captureHistorySnapshot();
  const previous = card_state.undoStack[card_state.undoStack.length - 1];
  if (previous && JSON.stringify(previous) === JSON.stringify(snapshot)) return;
  card_state.undoStack.push(snapshot);
  if (card_state.undoStack.length > 10) card_state.undoStack.shift();
  card_state.redoStack = [];
  updateMenuState();
}

// Creates a serializable snapshot for undo and redo.
function captureHistorySnapshot() {
  return {
    projectName: card_state.projectName,
    cards: card_state.cards.map(cloneCardForHistory),
    lines: card_state.lines.map((line) => ({ ...line })),
    preferences: { ...card_state.preferences },
    storylineTitles: { ...card_state.storylineTitles },
    characters: [...card_state.characters],
    pan: { ...card_state.pan },
    zoom: card_state.zoom,
    nextCard: card_state.nextCard,
    nextLine: card_state.nextLine,
    nextCardCreation: card_state.nextCardCreation,
    nextLineCreation: card_state.nextLineCreation,
    selectedCardId: card_state.selectedCardId,
    selectedCardIds: [...card_state.selectedCardIds],
    raisedCardId: card_state.raisedCardId
  };
}

// Clones card state for undo/redo without losing temporary media object URLs.
function cloneCardForHistory(card) {
  const fields = {};
  Object.entries(card.fields || {}).forEach(([key, value]) => {
    fields[key] = Array.isArray(value) ? [...value] : value;
  });
  return {
    ...card,
    size: { ...card.size },
    fields
  };
}

// Restores a previous project snapshot for undo or redo.
function restoreHistorySnapshot(snapshot) {
  card_state.restoringHistory = true;
  const restoredUrls = new Set(snapshot.cards.map((card) => card.localMediaUrl).filter(Boolean));
  card_state.cards.forEach((card) => {
    if (card.localMediaUrl && !restoredUrls.has(card.localMediaUrl)) revokeLocalMediaUrl(card);
  });
  card_state.projectName = snapshot.projectName || "";
  updateProjectNameDisplay();
  card_state.cards = snapshot.cards.map(cloneCardForHistory);
  card_state.lines = snapshot.lines.map((line) => ({ ...line }));
  card_state.preferences = { ...snapshot.preferences };
  card_state.storylineTitles = { ...snapshot.storylineTitles };
  card_state.characters = [...(snapshot.characters || [])];
  card_state.pan = { ...snapshot.pan };
  card_state.zoom = snapshot.zoom;
  card_state.nextCard = snapshot.nextCard;
  card_state.nextLine = snapshot.nextLine;
  card_state.nextCardCreation = snapshot.nextCardCreation;
  card_state.nextLineCreation = snapshot.nextLineCreation;
  card_state.selectedCardId = snapshot.selectedCardId;
  card_state.selectedCardIds = [...(snapshot.selectedCardIds || [])];
  card_state.raisedCardId = snapshot.raisedCardId;
  card_state.projectHasSavedFile = false;
  card_state.restoringHistory = false;
  if (dom.characterList) renderCharacterList();
  renderAll();
  scheduleAutoSave();
}

// Supports undo action.
function undoAction() {
  if (!card_state.undoStack.length) return;
  const current = captureHistorySnapshot();
  const previous = card_state.undoStack.pop();
  card_state.redoStack.push(current);
  restoreHistorySnapshot(previous);
}

// Supports redo action.
function redoAction() {
  if (!card_state.redoStack.length) return;
  const current = captureHistorySnapshot();
  const next = card_state.redoStack.pop();
  card_state.undoStack.push(current);
  if (card_state.undoStack.length > 10) card_state.undoStack.shift();
  restoreHistorySnapshot(next);
}

// Renders canvas transform UI markup or state.
function renderCanvasTransform() {
  const gridPx = card_state.preferences.gridSize * card_state.zoom;
  dom.canvasWorld.style.transform = `translate(${card_state.pan.x}px, ${card_state.pan.y}px) scale(${card_state.zoom})`;
  dom.canvasViewport.style.setProperty("--grid-size", `${gridPx}px`);
  dom.canvasViewport.style.setProperty("--grid-x", `${card_state.pan.x}px`);
  dom.canvasViewport.style.setProperty("--grid-y", `${card_state.pan.y}px`);
  dom.zoomReadout.value = `${Math.round(card_state.zoom * 100)}%`;
  applyBrandingPreference();
}

// Renders cards UI markup or state.
function renderCards() {
  dom.cardsLayer.innerHTML = card_state.cards.map(renderCard).join("");
  dom.cardCount.value = String(card_state.cards.length);
}

// Builds the HTML for one card from its current state and type.
function renderCard(card) {
  const expanded = isCardExpanded(card);
  const size = getCardSize(card);
  const selected = isCardSelected(card.id) ? " is-selected" : "";
  const raised = card.id === card_state.raisedCardId ? " is-raised" : "";
  const compact = expanded ? "" : " is-compact";
  const typeClass = ` is-${getCardType(card)}-card`;
  const color = safeHex(card.color, card_state.preferences.defaultCardColor);
  const lineColor = getCardLineColor(card);
  const contrastColor = getContrastTextColor(color);
  return `
    <article id="${card.id}" class="card-item${selected}${raised}${compact}${typeClass}" data-card-id="${card.id}" data-card-type="${escapeAttr(getCardType(card))}"
      style="left:${card.x}px;top:${card.y}px;--card-w:${size.width}px;--card-h:${size.height}px;--card-color:${color};--card-contrast:${contrastColor};--line-color:${lineColor};">
      ${expanded ? renderExpandedCard(card) : renderCompactCard(card)}
    </article>
  `;
}

// Renders card top UI markup or state.
function renderCardTop(card, expanded) {
  const controlAction = expanded ? "collapse" : "expand";
  const controlTitle = expanded ? "Collapse" : "Expand";
  const controlIcon = expanded ? card_icons.close : card_icons.expand;
  const disabled = card.editable ? "" : " disabled";
  const linkControl = isTitleCard(card) || isTimelineCard(card)
    ? '<span class="card-link-spacer" aria-hidden="true"></span>'
    : `<button class="icon-button card-link" type="button" data-action="connect" title="Drag to connect" aria-label="Drag to connect from this card">
        ${card_icons.link}
      </button>`;
  return `
    <header class="card-top">
      ${linkControl}
      ${expanded ? `<input class="card-title-input" name="${escapeAttr(card.id)}_title" aria-label="Title" data-field="header" value="${escapeAttr(card.fields.header)}" placeholder="${escapeAttr(getCardTitlePlaceholder(card))}"${disabled}>` : '<span class="card-title-spacer" aria-hidden="true"></span>'}
      <button class="icon-button card-control" type="button" data-action="${controlAction}" title="${controlTitle}" aria-label="${controlTitle} card">
        ${controlIcon}
      </button>
    </header>
  `;
}

// Builds the editable expanded card layout.
function renderExpandedCard(card) {
  const disabled = card.editable ? "" : " disabled";
  const actionIcon = card.editable ? card_icons.save : card_icons.edit;
  const actionTitle = card.editable ? "Save" : "Edit";
  const mediaPath = getMediaPreviewSource(card);
  const showMedia = Boolean(card.showMediaPicker) && cardSupportsMedia(card);
  const statusText = card.editable ? "Edit Mode" : "";
  const sceneFields = cardUsesSceneFields(card);
  const characterField = cardUsesCharacters(card);
  const canAddCharacters = cardCanAddCharacters(card);
  const titleFields = isTitleCard(card);
  const bodyOnly = !sceneFields && !characterField && !titleFields;
  return `
    ${renderCardTop(card, true)}
    <div class="card-body${showMedia ? " has-media" : ""}">
      ${showMedia ? `
        <div class="material-media media-picker${mediaPath ? " has-image" : ""}" aria-label="Selected image">
          ${mediaPath ? `<img src="${escapeAttr(mediaPath)}" alt="">` : card_icons.image}
        </div>
      ` : ""}
      <div class="material-content${bodyOnly ? " note-content" : ""}${titleFields ? " title-content" : ""}">
        ${sceneFields ? `<div class="material-field slug-field" aria-label="Slug line">
          <input class="slug-visibility" name="${escapeAttr(card.id)}_slug_visible" aria-label="Show slug line in output" data-field="slugVisible" type="checkbox"${card.fields.slugVisible === true ? " checked" : ""}${disabled}>
          <select name="${escapeAttr(card.id)}_slug_prefix" aria-label="Interior or exterior" data-field="slugPrefix"${disabled}>
            ${SLUG_PREFIXES.map((value) => `<option value="${escapeAttr(value)}"${getSceneSlugPrefix(card) === value ? " selected" : ""}>${escapeHtml(value)}</option>`).join("")}
          </select>
          <input name="${escapeAttr(card.id)}_location" aria-label="Location" data-field="location" value="${escapeAttr(card.fields.location)}" placeholder="LOCATION"${disabled}>
          <select name="${escapeAttr(card.id)}_slug_time" aria-label="Time designation" data-field="slugTime"${disabled}>
            ${SLUG_TIMES.map((value) => `<option value="${escapeAttr(value)}"${getSceneSlugTime(card) === value ? " selected" : ""}>${escapeHtml(value)}</option>`).join("")}
          </select>
        </div>` : ""}
        ${characterField ? `<div class="material-field character-field">
          ${canAddCharacters ? `<button class="icon-button card-control character-add-button" type="button" data-action="toggle-character-picker" title="Add character" aria-label="Add character"${disabled}>
            ${card_icons.personAdd}
          </button>` : '<span class="character-add-spacer" aria-hidden="true"></span>'}
          ${renderCharacterChips(card, disabled)}
          ${card.showCharacterPicker && canAddCharacters ? renderCharacterPicker(card) : ""}
        </div>` : ""}
        ${sceneFields ? `<div class="material-field">
          <input name="${escapeAttr(card.id)}_notes" aria-label="Notes" data-field="notes" value="${escapeAttr(card.fields.notes)}" placeholder="Notes"${disabled}>
        </div>` : ""}
        ${titleFields ? `<div class="material-field">
          <input name="${escapeAttr(card.id)}_author" aria-label="Author" data-field="author" value="${escapeAttr(card.fields.author)}" placeholder="Author"${disabled}>
        </div>
        <div class="material-field">
          <input name="${escapeAttr(card.id)}_date" aria-label="Date" data-field="date" value="${escapeAttr(card.fields.date)}" placeholder="Date"${disabled}>
        </div>
        <div class="material-field">
          <input name="${escapeAttr(card.id)}_tagline" aria-label="Tagline" data-field="tagline" value="${escapeAttr(card.fields.tagline)}" placeholder="Tagline"${disabled}>
        </div>` : `<div class="material-field material-field-supporting">
          <textarea name="${escapeAttr(card.id)}_body" aria-label="Body" data-field="supporting" placeholder="${escapeAttr(getSupportingPlaceholder(card))}"${disabled}>${escapeHtml(card.fields.supporting)}</textarea>
        </div>`}
      </div>
    </div>
    <footer class="card-bottom">
      ${card.editable && !titleFields ? `<button class="icon-button card-control" type="button" data-action="delete" title="Delete" aria-label="Delete card">
        ${card_icons.delete}
      </button>` : ""}
      <span class="card-status">${statusText}</span>
      ${card.editable && !titleFields ? `<button class="icon-button card-control card-color-button" type="button" data-action="color" title="Card color" aria-label="Change card color">${card_icons.palette}</button>` : ""}
      ${card.editable && !titleFields ? `<button class="icon-button card-control card-copy-button" type="button" data-action="copy-card" title="Copy card" aria-label="Copy card">${card_icons.copy}</button>` : ""}
      ${card.editable && cardSupportsMedia(card) ? `<button class="icon-button card-control card-media-toggle" type="button" data-action="toggle-media" title="Image" aria-label="Show image picker">${card_icons.image}</button>` : ""}
      <button class="icon-button card-control card-save-toggle" type="button" data-action="toggle-edit" title="${actionTitle}" aria-label="${actionTitle} card">
        ${actionIcon}
      </button>
    </footer>
  `;
}

// Builds the character list shown inside scene and dialog cards.
function renderCharacterChips(card, disabled) {
  const names = getCardCharacters(card);
  if (isDialogCard(card)) {
    if (!names.length) return `<div class="dialog-character-list is-empty">Characters</div>`;
    return `
      <div class="dialog-character-list" aria-label="Dialog characters">
        ${names.map((name) => `<button class="dialog-character-name" type="button" data-character-name="${escapeAttr(name)}" data-action="insert-character-dialogue" title="Double-click to insert dialogue name"${disabled}>${escapeHtml(name)}</button>`).join("")}
      </div>
    `;
  }
  if (!names.length) return `<div class="character-chips is-empty">Characters</div>`;
  return `
    <div class="character-chips" aria-label="Scene characters">
      ${names.map((name) => {
        const action = cardAllowsDialogueInsert(card)
          ? ' data-action="insert-character-dialogue" title="Double-click to insert dialogue name"'
          : isSceneCard(card)
            ? ' data-action="remove-character-from-card" title="Double-click to remove character"'
            : "";
        return `<button class="character-chip" type="button" data-character-name="${escapeAttr(name)}"${action}${disabled}>${escapeHtml(name)}</button>`;
      }).join("")}
    </div>
  `;
}

// Renders character picker UI markup or state.
function renderCharacterPicker(card) {
  const availableCharacters = getAvailableCharactersForCard(card);
  const inheritOption = '<button class="character-picker-inherit" type="button" data-action="inherit-characters">INHERIT</button>';
  const options = availableCharacters.length
    ? availableCharacters.map((name) => `<button type="button" data-action="add-character-to-card" data-character-name="${escapeAttr(name)}">${escapeHtml(name)}</button>`).join("")
    : '<div class="character-picker-empty">No characters yet</div>';
  return `<div class="character-picker">${inheritOption}${options}</div>`;
}

// Renders compact card UI markup or state.
function renderCompactCard(card) {
  const useImage = cardSupportsMedia(card) && card_state.preferences.cardMedPref === "image" && getMediaPreviewSource(card);
  const linkButton = isTitleCard(card) || isTimelineCard(card)
    ? ""
    : `<button class="icon-button card-link compact-card-link" type="button" data-action="connect" title="Drag to connect" aria-label="Drag to connect from this card">
      ${card_icons.link}
    </button>`;
  return `
    ${linkButton}
    <div class="card-compact-content">
      ${useImage ? renderCompactImage(card) : renderCompactText(card)}
    </div>
  `;
}

// Renders compact text UI markup or state.
function renderCompactText(card) {
  return `
    <div>
      <div class="card-compact-title">${escapeHtml(getDisplayCardTitle(card))}</div>
    </div>
  `;
}

// Renders compact image UI markup or state.
function renderCompactImage(card) {
  return `
    <div class="card-compact-image">
      <img src="${escapeAttr(getMediaPreviewSource(card))}" alt="" draggable="false">
    </div>
  `;
}

// Handles card click events and updates related state.
function handleCardClick(event) {
  const actionButton = event.target.closest("[data-action]");
  const cardEl = event.target.closest(".card-item");
  const card = findCard(cardEl?.dataset.cardId);
  if (!card) return;

  if (!actionButton) {
    if (event.detail >= 2 && !isInteractiveTarget(event.target)) {
      markCardDoubleClick(event);
      expandCardForEditing(card);
    }
    return;
  }

  const action = actionButton.dataset.action;
  if (action === "connect") {
    return;
  }
  if (action === "collapse") {
    recordHistory();
    setCardExpanded(card, false, false);
  }
  if (action === "expand") {
    recordHistory();
    setCardExpanded(card, true, false);
  }
  if (action === "toggle-edit") {
    recordHistory();
    if (!isCardExpanded(card)) {
      setCardExpanded(card, true, true);
    } else {
      card.editable = !card.editable;
      if (!card.editable) card.savedAt = Date.now();
    }
  }
  if (action === "toggle-media") {
    openMediaAction(card);
    return;
  }
  if (action === "copy-card") {
    copyCard(card.id);
    return;
  }
  if (action === "color") {
    openCardColorPicker(card);
    return;
  }
  if (action === "toggle-character-picker") {
    if (!cardCanAddCharacters(card)) return;
    recordHistory();
    card_state.cards.forEach((item) => {
      if (item.id !== card.id) item.showCharacterPicker = false;
    });
    card.showCharacterPicker = !card.showCharacterPicker;
    renderCards();
    return;
  }
  if (action === "add-character-to-card") {
    addCharacterToCard(card, actionButton.dataset.characterName);
    return;
  }
  if (action === "inherit-characters") {
    inheritCharactersFromPriorScene(card);
    return;
  }
  if (action === "insert-character-dialogue") {
    if (event.detail >= 2 && cardAllowsDialogueInsert(card)) insertCharacterDialogueName(card, actionButton.dataset.characterName);
    return;
  }
  if (action === "remove-character-from-card") {
    if (event.detail >= 2 && isSceneCard(card)) removeCharacterFromCard(card, actionButton.dataset.characterName);
    return;
  }
  if (action === "delete") {
    card_state.pendingDeleteId = card.id;
    dom.deleteDialog.showModal();
    return;
  }
  markDirty();
  renderAll();
}

// Handles card input events and updates related state.
function handleCardInput(event) {
  const field = event.target.dataset.field;
  if (!field) return;
  const card = findCard(event.target.closest(".card-item")?.dataset.cardId);
  if (!card) return;
  if (field === "slugVisible" && event.type === "input") return;

  recordHistory();
  if (field === "mediaPath") {
    card.mediaPath = event.target.value;
    card.localMediaUrl = "";
  } else if (field === "slugVisible") {
    card.fields.slugVisible = event.target.checked;
  } else if (field === "location" && cardUsesSceneFields(card)) {
    card.fields[field] = normalizeSlugText(event.target.value);
    event.target.value = card.fields[field];
  } else if (field === "slugPrefix") {
    card.fields[field] = SLUG_PREFIXES.includes(event.target.value) ? event.target.value : SLUG_PREFIXES[0];
  } else if (field === "slugTime") {
    card.fields[field] = SLUG_TIMES.includes(event.target.value) ? event.target.value : SLUG_TIMES[0];
  } else {
    card.fields[field] = event.target.value;
    if (field === "header" && isTitleCard(card)) {
      card_state.projectName = event.target.value.trim();
      updateProjectNameDisplay();
    }
  }
  markDirty();
  renderStory();
}

// Handles card change events and updates related state.
function handleCardChange(event) {
  const field = event.target.dataset.field;
  if (!field) return;
  if (field === "mediaPath") {
    renderCards();
    renderLines();
    renderStory();
    return;
  }
  if (field === "slugPrefix" || field === "slugTime" || field === "slugVisible") {
    handleCardInput(event);
    renderCards();
    renderStory();
  }
}

// Handles media file selected events and updates related state.
function handleMediaFileSelected(event) {
  const file = event.target.files?.[0];
  const card = findCard(dom.mediaFileInput.dataset.cardId);
  if (!file || !card) {
    dom.mediaFileInput.value = "";
    return;
  }
  revokeLocalMediaUrl(card);
  recordHistory();
  card.localMediaUrl = URL.createObjectURL(file);
  card.mediaPath = normalizeMediaPath(file.name);
  card.showMediaPicker = true;
  dom.mediaFileInput.value = "";
  markDirty();
  renderAll();
}

// Opens media action.
function openMediaAction(card) {
  if (!getMediaPreviewSource(card)) {
    dom.mediaFileInput.dataset.cardId = card.id;
    dom.mediaFileInput.click();
    return;
  }
  dom.mediaDialog.dataset.cardId = card.id;
  dom.deleteMedia.disabled = false;
  dom.mediaDialog.showModal();
}

// Deletes selected media.
function deleteSelectedMedia(event) {
  event.preventDefault();
  const card = findCard(dom.mediaDialog.dataset.cardId);
  if (!card) return;
  recordHistory();
  revokeLocalMediaUrl(card);
  card.localMediaUrl = "";
  card.mediaPath = "";
  card.showMediaPicker = false;
  dom.mediaDialog.close();
  markDirty();
  renderAll();
}

// Supports replace selected media.
function replaceSelectedMedia(event) {
  event.preventDefault();
  const card = findCard(dom.mediaDialog.dataset.cardId);
  if (!card) return;
  dom.mediaDialog.close();
  dom.mediaFileInput.dataset.cardId = card.id;
  dom.mediaFileInput.click();
}

// Handles card double click events and updates related state.
function handleCardDoubleClick(event) {
  const cardEl = event.target.closest(".card-item");
  if (!cardEl || isInteractiveTarget(event.target)) return;
  event.stopPropagation();
  event.preventDefault();
  markCardDoubleClick(event);
  const card = findCard(cardEl.dataset.cardId);
  if (!card) return;
  expandCardForEditing(card);
}

// Records a card double-click so the canvas handler cannot also create a new card.
function markCardDoubleClick(event) {
  card_state.lastCardDoubleClick = {
    time: Date.now(),
    x: event.clientX,
    y: event.clientY
  };
}

// Supports expand card for editing.
function expandCardForEditing(card) {
  setCardExpanded(card, true, false);
  selectCard(card.id);
  card_state.raisedCardId = card.id;
  renderAll();
  requestAnimationFrame(() => focusCard(card.id, { focusTitle: false }));
}

// Opens card color picker.
function openCardColorPicker(card) {
  openCenteredColorPicker("card", card.color, card.id);
}

// Opens centered color picker.
function openCenteredColorPicker(targetType, value, cardId = "") {
  dom.colorDialog.dataset.targetType = targetType;
  dom.colorDialog.dataset.cardId = cardId;
  dom.centerColorInput.value = safeHex(value, card_state.preferences.defaultCardColor);
  dom.colorDialog.showModal();
  requestAnimationFrame(() => dom.centerColorInput.focus());
}

// Applies centered color.
function applyCenteredColor(event) {
  event.preventDefault();
  const color = safeHex(dom.centerColorInput.value, card_defaults.color);
  recordHistory();
  if (dom.colorDialog.dataset.targetType === "default-card") {
    card_state.preferences.defaultCardColor = color;
  } else {
    const card = findCard(dom.colorDialog.dataset.cardId);
    if (!card) return;
    card.color = color;
  }
  dom.colorDialog.close();
  markDirty();
  renderAll();
}

// Handles card pointer down events and updates related state.
function handleCardPointerDown(event) {
  const connectButton = event.target.closest('[data-action="connect"]');
  const cardEl = event.target.closest(".card-item");
  const card = findCard(cardEl?.dataset.cardId);

  if (connectButton && card) {
    startCardConnection(event, card);
    return;
  }

  if (event.button !== 0 || isInteractiveTarget(event.target) || !card) return;

  event.stopPropagation();
  setActivePane("cards");
  if (handleCompactCardDoublePress(event, card)) return;
  const selectedIds = getSelectedCardIds();
  const dragGroupIds = selectedIds.length > 1 && selectedIds.includes(card.id) ? selectedIds : [card.id];
  if (dragGroupIds.length > 1) {
    card_state.selectedCardId = card.id;
    card_state.raisedCardId = card.id;
    updateCardSelectionClasses();
  } else {
    selectCard(card.id);
  }
  card_state.raisedCardId = card.id;
  cardEl.classList.add("is-raised");

  const worldPoint = screenToWorld(event.clientX, event.clientY);
  card_state.pointer = {
    type: "drag-card",
    pointerId: event.pointerId,
    cardId: card.id,
    cardIds: dragGroupIds,
    startPositions: dragGroupIds.map((id) => {
      const item = findCard(id);
      return { id, x: item.x, y: item.y, size: getCardSize(item) };
    }),
    allStartPositions: captureCardPositions(),
    timelineY: getTimelineY(),
    startWasOnTimeline: cardTouchesTimeline(card),
    startClientX: event.clientX,
    startClientY: event.clientY,
    startWorld: worldPoint,
    longPressTimer: null,
    longPressTriggered: false,
    historyRecorded: false,
    moved: false,
    offsetX: worldPoint.x - card.x,
    offsetY: worldPoint.y - card.y
  };
  if (!isCardExpanded(card)) {
    card_state.pointer.longPressTimer = window.setTimeout(() => {
      const activePointer = card_state.pointer;
      const activeCard = findCard(card.id);
      if (!activePointer || activePointer.type !== "drag-card" || activePointer.cardId !== card.id || !activeCard) return;
      activePointer.longPressTriggered = true;
      setCardExpanded(activeCard, true, false);
      selectCard(activeCard.id);
      renderAll();
      requestAnimationFrame(() => focusCard(activeCard.id, { focusTitle: false }));
    }, 560);
  }
  attachPointerListeners();
}

// Handles compact card double press events and updates related state.
function handleCompactCardDoublePress(event, card) {
  if (isCardExpanded(card)) {
    card_state.lastCardPress = null;
    return false;
  }
  const now = Date.now();
  const last = card_state.lastCardPress;
  const isDoublePress = last
    && last.cardId === card.id
    && now - last.time < 380
    && Math.hypot(event.clientX - last.x, event.clientY - last.y) < 24;
  card_state.lastCardPress = {
    cardId: card.id,
    time: now,
    x: event.clientX,
    y: event.clientY
  };
  if (!isDoublePress) return false;
  card_state.lastCardPress = null;
  markCardDoubleClick(event);
  setCardExpanded(card, true, false);
  selectCard(card.id);
  renderAll();
  requestAnimationFrame(() => focusCard(card.id, { focusTitle: false }));
  return true;
}

// Supports start card connection.
function startCardConnection(event, card) {
  if (event.button !== 0) return;
  if (isTimelineCard(card)) return;
  event.preventDefault();
  event.stopPropagation();
  setActivePane("cards");
  selectCard(card.id);
  card_state.raisedCardId = card.id;
  const worldPoint = screenToWorld(event.clientX, event.clientY);
  card_state.pointer = {
    type: "connect",
    pointerId: event.pointerId,
    sourceId: card.id,
    current: worldPoint
  };
  attachPointerListeners();
  renderLines();
}

// Handles canvas pointer down events and updates related state.
function handleCanvasPointerDown(event) {
  if (event.button !== 0 || !isCanvasGridTarget(event.target)) return;
  setActivePane("cards");
  if (isLassoMode()) {
    startLassoSelection(event);
    return;
  }
  clearCardSelection();

  if (event.pointerType === "touch") {
    card_state.touchPoints.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (card_state.touchPoints.size === 2) {
      const points = [...card_state.touchPoints.values()];
      const midpoint = midpointOf(points[0], points[1]);
      card_state.pointer = {
        type: "pinch",
        startDistance: distance(points[0], points[1]),
        startZoom: card_state.zoom,
        startWorld: screenToWorld(midpoint.x, midpoint.y)
      };
      attachPointerListeners();
      return;
    }
  }

  event.preventDefault();
  dom.canvasViewport.classList.add("is-panning");
  card_state.pointer = {
    type: "pan",
    pointerId: event.pointerId,
    pointerType: event.pointerType,
    startX: event.clientX,
    startY: event.clientY,
    startPan: { ...card_state.pan },
    startWorld: screenToWorld(event.clientX, event.clientY),
    moved: false
  };
  attachPointerListeners();
}

// Clears card selection.
function clearCardSelection() {
  card_state.selectedCardId = null;
  card_state.selectedCardIds = [];
  card_state.raisedCardId = null;
  updateCardSelectionClasses();
}

// Handles canvas double click events and updates related state.
function handleCanvasDoubleClick(event) {
  if (event.defaultPrevented || isRecentCardDoubleClick(event)) return;
  if (!isCanvasGridTarget(event.target)) return;
  if (isMobileMode()) return;
  if (isLassoMode()) return;
  event.preventDefault();
  const point = screenToWorld(event.clientX, event.clientY);
  createCardAt(point.x, point.y);
}

// Returns whether a canvas double-click is the trailing event from opening a card.
function isRecentCardDoubleClick(event) {
  const last = card_state.lastCardDoubleClick;
  if (!last) return false;
  const recent = Date.now() - last.time < 600;
  const close = Math.hypot(event.clientX - last.x, event.clientY - last.y) < 40;
  if (recent && close) return true;
  if (!recent) card_state.lastCardDoubleClick = null;
  return false;
}

// Confirms a pointer target is the card grid itself, not an overlay, control, card, or pane chrome.
function isCanvasGridTarget(target) {
  return target === dom.canvasViewport ||
    target === dom.canvasWorld ||
    target === dom.cardsLayer ||
    target === dom.lineLayer;
}

// Starts a lasso selection rectangle from the card grid.
function startLassoSelection(event) {
  event.preventDefault();
  clearCardSelection();
  const point = viewportPoint(event.clientX, event.clientY);
  card_state.pointer = {
    type: "lasso",
    pointerId: event.pointerId,
    startClientX: event.clientX,
    startClientY: event.clientY,
    currentClientX: event.clientX,
    currentClientY: event.clientY,
    startViewportX: point.x,
    startViewportY: point.y,
    moved: false
  };
  updateLassoRect();
  attachPointerListeners();
}

// Updates the visible lasso rectangle overlay.
function updateLassoRect() {
  const pointer = card_state.pointer;
  if (!dom.lassoRect || pointer?.type !== "lasso") return;
  const current = viewportPoint(pointer.currentClientX, pointer.currentClientY);
  const left = Math.min(pointer.startViewportX, current.x);
  const top = Math.min(pointer.startViewportY, current.y);
  const width = Math.abs(current.x - pointer.startViewportX);
  const height = Math.abs(current.y - pointer.startViewportY);
  dom.lassoRect.hidden = false;
  dom.lassoRect.style.left = `${left}px`;
  dom.lassoRect.style.top = `${top}px`;
  dom.lassoRect.style.width = `${width}px`;
  dom.lassoRect.style.height = `${height}px`;
}

// Selects cards touched by the active lasso rectangle.
function updateLassoSelection() {
  const pointer = card_state.pointer;
  if (pointer?.type !== "lasso") return;
  const start = screenToWorld(pointer.startClientX, pointer.startClientY);
  const current = screenToWorld(pointer.currentClientX, pointer.currentClientY);
  const bounds = {
    x: Math.min(start.x, current.x),
    y: Math.min(start.y, current.y),
    width: Math.abs(current.x - start.x),
    height: Math.abs(current.y - start.y)
  };
  const ids = card_state.cards
    .filter((card) => rectsIntersect(bounds, {
      x: card.x,
      y: card.y,
      width: getCardSize(card).width,
      height: getCardSize(card).height
    }))
    .map((card) => card.id);
  selectCards(ids, ids[ids.length - 1] || "");
}

// Hides the lasso rectangle overlay.
function hideLassoRect() {
  if (!dom.lassoRect) return;
  dom.lassoRect.hidden = true;
  dom.lassoRect.removeAttribute("style");
}

// Returns viewport-relative pointer coordinates.
function viewportPoint(clientX, clientY) {
  const rect = dom.canvasViewport.getBoundingClientRect();
  return {
    x: clientX - rect.left,
    y: clientY - rect.top
  };
}

// Handles canvas wheel events and updates related state.
function handleCanvasWheel(event) {
  event.preventDefault();
  const factor = event.deltaY < 0 ? 1.08 : 1 / 1.08;
  setZoom(card_state.zoom * factor, { x: event.clientX, y: event.clientY });
}

// Supports attach pointer listeners.
function attachPointerListeners() {
  document.addEventListener("pointermove", handlePointerMove);
  document.addEventListener("pointerup", handlePointerUp);
  document.addEventListener("pointercancel", handlePointerUp);
}

// Supports detach pointer listeners.
function detachPointerListeners() {
  document.removeEventListener("pointermove", handlePointerMove);
  document.removeEventListener("pointerup", handlePointerUp);
  document.removeEventListener("pointercancel", handlePointerUp);
}

// Handles pointer move events and updates related state.
function handlePointerMove(event) {
  const pointer = card_state.pointer;
  if (!pointer) return;

  if (event.pointerType === "touch" && card_state.touchPoints.has(event.pointerId)) {
    card_state.touchPoints.set(event.pointerId, { x: event.clientX, y: event.clientY });
  }

  if (pointer.type === "pinch" && card_state.touchPoints.size >= 2) {
    const points = [...card_state.touchPoints.values()].slice(0, 2);
    const midpoint = midpointOf(points[0], points[1]);
    const nextZoom = pointer.startZoom * (distance(points[0], points[1]) / pointer.startDistance);
    setZoom(nextZoom, midpoint, pointer.startWorld);
    return;
  }

  if (pointer.pointerId !== event.pointerId) return;

  if (pointer.type === "pan") {
    const dx = event.clientX - pointer.startX;
    const dy = event.clientY - pointer.startY;
    if (Math.hypot(dx, dy) > 4) pointer.moved = true;
    card_state.pan.x = pointer.startPan.x + dx;
    card_state.pan.y = pointer.startPan.y + dy;
    renderCanvasTransform();
  }

  if (pointer.type === "lasso") {
    pointer.currentClientX = event.clientX;
    pointer.currentClientY = event.clientY;
    if (Math.hypot(event.clientX - pointer.startClientX, event.clientY - pointer.startClientY) > 4) pointer.moved = true;
    updateLassoRect();
    updateLassoSelection();
    return;
  }

  if (pointer.type === "drag-card") {
    const dragDistance = Math.hypot(event.clientX - pointer.startClientX, event.clientY - pointer.startClientY);
    if (dragDistance > 8) clearLongPressTimer(pointer);
    if (pointer.longPressTriggered) return;
    if (dragDistance > 4) {
      pointer.moved = true;
      if (!pointer.historyRecorded) {
        recordHistory();
        pointer.historyRecorded = true;
      }
    }
    const card = findCard(pointer.cardId);
    if (!card) return;
    const point = screenToWorld(event.clientX, event.clientY);
    if (pointer.cardIds?.length > 1) {
      const dx = snap(point.x - pointer.startWorld.x);
      const dy = snap(point.y - pointer.startWorld.y);
      const nextPositions = pointer.startPositions.map((position) => ({
        ...position,
        x: snap(position.x + dx),
        y: snap(position.y + dy)
      }));
      if (!canPlaceCardGroup(nextPositions, pointer.cardIds)) return;
      nextPositions.forEach((position) => {
        const item = findCard(position.id);
        if (!item) return;
        item.x = position.x;
        item.y = position.y;
        positionCardElement(item);
      });
      renderLines();
      renderStory();
      return;
    }
    const movedCards = cardCanDisplaceCards(card)
      ? placeTimelineCardDuringDrag(pointer, card, point.x - pointer.offsetX, point.y - pointer.offsetY)
      : placeCardWithoutNudge(card, point.x - pointer.offsetX, point.y - pointer.offsetY);
    movedCards.forEach(positionCardElement);
    renderLines();
    renderStory();
  }

  if (pointer.type === "connect") {
    pointer.current = screenToWorld(event.clientX, event.clientY);
    renderLines();
  }
}

// Handles pointer up events and updates related state.
function handlePointerUp(event) {
  const pointer = card_state.pointer;
  if (event.pointerType === "touch") card_state.touchPoints.delete(event.pointerId);
  if (!pointer) return;

  if (pointer.type === "pan" && pointer.pointerId === event.pointerId) {
    dom.canvasViewport.classList.remove("is-panning");
    if (pointer.pointerType === "touch" && !pointer.moved) {
      handleTouchTap(event, pointer.startWorld);
    }
    clearPointer();
  }

  if (pointer.type === "lasso" && pointer.pointerId === event.pointerId) {
    hideLassoRect();
    clearPointer();
  }

  if (pointer.type === "drag-card" && pointer.pointerId === event.pointerId) {
    clearLongPressTimer(pointer);
    if (pointer.longPressTriggered) {
      clearPointer();
      return;
    }
    if (!pointer.moved) {
      clearPointer();
      return;
    }
    const card = findCard(pointer.cardId);
    if (card) {
      if (pointer.cardIds?.length > 1) {
        pointer.cardIds.forEach((id) => {
          const item = findCard(id);
          if (!item) return;
          item.x = snap(item.x);
          item.y = snap(item.y);
          positionCardElement(item);
        });
      } else if (isTimelineCard(card)) {
        restoreDragStartPositions(pointer, new Set([card.id]), false);
        if (cardTouchesTimeline(card)) {
          if (pointer.startWasOnTimeline && timelineCardConflictsWithAnother(card) && !timelineCardOvertookAnother(pointer, card)) {
            restoreTimelineCardToDragStart(pointer, card).forEach(positionCardElement);
          } else {
            const movedCards = placeCardAndNudge(card, card.x, card.y);
            movedCards.forEach(positionCardElement);
          }
        } else {
          placeCardOffTimeline(card, card.x, card.y).forEach(positionCardElement);
        }
      } else {
        placeCardWithoutNudge(card, card.x, card.y).forEach(positionCardElement);
      }
      markDirty();
      renderLines();
      renderStory();
    }
    card_state.raisedCardId = null;
    renderCards();
    clearPointer();
  }

  if (pointer.type === "connect" && pointer.pointerId === event.pointerId) {
    const targetCard = document.elementFromPoint(event.clientX, event.clientY)?.closest(".card-item");
    const targetProjectTitle = document.elementFromPoint(event.clientX, event.clientY)?.closest("#projectNameInput, .project-title");
    const targetId = targetCard?.dataset.cardId || (targetProjectTitle ? PROJECT_TARGET_ID : "");
    if (targetId && targetId !== pointer.sourceId) {
      createLine(pointer.sourceId, targetId);
    } else {
      severOutgoingConnection(pointer.sourceId);
      showNotice("Outgoing Connection Cleared");
    }
    card_state.raisedCardId = null;
    clearPointer();
    renderAll();
  }

  if (pointer.type === "pinch" && card_state.touchPoints.size < 2) {
    clearPointer();
  }
}

// Clears pointer.
function clearPointer() {
  clearLongPressTimer();
  hideLassoRect();
  card_state.pointer = null;
  dom.canvasViewport.classList.remove("is-panning");
  detachPointerListeners();
  renderLines();
}

// Clears long press timer.
function clearLongPressTimer(pointer = card_state.pointer) {
  if (!pointer?.longPressTimer) return;
  window.clearTimeout(pointer.longPressTimer);
  pointer.longPressTimer = null;
}

// Handles touch tap events and updates related state.
function handleTouchTap(event, worldPoint) {
  const now = Date.now();
  const tap = { time: now, x: event.clientX, y: event.clientY };
  const last = card_state.lastTouchTap;
  card_state.lastTouchTap = tap;
  if (!last) return;
  const closeEnough = Math.hypot(tap.x - last.x, tap.y - last.y) < 28;
  if (now - last.time < 360 && closeEnough) {
    card_state.lastTouchTap = null;
    if (isLassoMode() || isMobileMode()) return;
    createCardAt(worldPoint.x, worldPoint.y);
  }
}

// Creates card at.
function createCardAt(x, y, options = {}) {
  const cardType = normalizeCardType(options.type);
  if (cardType === TITLE_CARD_TYPE && getTitleCard()) return getTitleCard();
  if (!options.skipHistory) recordHistory();
  const cardNumber = getNextCardTitleIndex(cardType);
  const size = { ...card_sizes.expanded };
  const position = isTimelineCardType(cardType)
    ? findOpenTimelinePosition(null, x, size)
    : findNonOverlappingPosition(null, x, y, size);
  const card = {
    id: `card_${card_state.nextCard++}`,
    type: cardType,
    x: position.x,
    y: position.y,
    size,
    expanded: true,
    editable: Boolean(options.editable),
    color: getDefaultCardColorForType(cardType),
    fields: {
      header: options.fields?.header || "",
      slugVisible: options.fields?.slugVisible === true,
      slugPrefix: SLUG_PREFIXES.includes(options.fields?.slugPrefix) ? options.fields.slugPrefix : SLUG_PREFIXES[0],
      location: normalizeSlugText(options.fields?.location || ""),
      slugTime: SLUG_TIMES.includes(options.fields?.slugTime) ? options.fields.slugTime : SLUG_TIMES[0],
      characters: normalizeCardCharacters(options.fields?.characters),
      notes: options.fields?.notes || "",
      author: options.fields?.author || "",
      date: options.fields?.date || "",
      tagline: options.fields?.tagline || "",
      supporting: options.fields?.supporting || ""
    },
    titlePlaceholder: options.titlePlaceholder || makeGeneratedCardTitle(cardType, cardNumber),
    titleIndex: cardNumber,
    characterName: options.characterName || "",
    supportingPlaceholder: randomInspiration(),
    mediaPath: options.mediaPath || "",
    localMediaUrl: options.localMediaUrl || "",
    creationIndex: card_state.nextCardCreation++
  };
  if (!cardSupportsMedia(card)) {
    card.mediaPath = "";
    card.showMediaPicker = false;
  }
  card_state.cards.push(card);
  if (!options.skipDirty) markDirty();
  if (options.quiet) return card;
  selectCard(card.id);
  card_state.raisedCardId = card.id;
  renderAll();
  requestAnimationFrame(() => focusCard(card.id, { focusTitle: false }));
  return card;
}

// Ensures the project has exactly one title card without treating the default card as user content.
function ensureTitleCard(options = {}) {
  normalizeTitleCards();
  let card = getTitleCard();
  if (!card) {
    const rect = dom.canvasViewport?.getBoundingClientRect();
    const point = rect
      ? screenToWorld(rect.left + rect.width / 2, rect.top + 120)
      : { x: 0, y: 0 };
    card = createCardAt(point.x - card_sizes.expanded.width / 2, point.y, {
      type: TITLE_CARD_TYPE,
      fields: {
        header: card_state.projectName || "",
        author: "",
        date: "",
        tagline: ""
      },
      titlePlaceholder: card_defaults.projectName,
      editable: true,
      skipHistory: true,
      skipDirty: true,
      quiet: true
    });
  }
  syncTitleCardFromProjectName();
  card.creationIndex = 0;
  if (options.select && card) selectCard(card.id);
  return card;
}

// Removes duplicate title cards if loaded data contains more than one.
function normalizeTitleCards() {
  const titleCards = card_state.cards.filter((card) => getCardType(card) === TITLE_CARD_TYPE);
  if (titleCards.length <= 1) return;
  const [keeper, ...duplicates] = titleCards.sort((a, b) => a.creationIndex - b.creationIndex);
  const duplicateIds = new Set(duplicates.map((card) => card.id));
  duplicates.forEach((card) => revokeLocalMediaUrl(card));
  card_state.cards = card_state.cards.filter((card) => !duplicateIds.has(card.id));
  card_state.lines = card_state.lines.filter((line) => !duplicateIds.has(line.sourceId) && !duplicateIds.has(line.targetId));
  if (card_state.selectedCardId && duplicateIds.has(card_state.selectedCardId)) card_state.selectedCardId = keeper.id;
}

// Returns the single project title card.
function getTitleCard() {
  return card_state.cards.find((card) => getCardType(card) === TITLE_CARD_TYPE) || null;
}

// Mirrors the current project name into the title card title field.
function syncTitleCardFromProjectName() {
  const card = getTitleCard();
  if (!card) return;
  card.fields.header = card_state.projectName || "";
  card.titlePlaceholder = card_defaults.projectName;
  card.color = "#000000";
}

// Creates card from button.
function createCardFromButton(type) {
  const cardType = normalizeCardType(type);
  const last = getLastCardInChain();
  let x;
  let y;
  if (cardType === "note") {
    const anchor = getLastSpawnedCard() || getTitleCard();
    if (anchor) {
      const grid = card_state.preferences.gridSize;
      x = anchor.x;
      y = anchor.y + card_sizes.expanded.height + grid;
    } else {
      const rect = dom.canvasViewport.getBoundingClientRect();
      const point = screenToWorld(rect.left + rect.width / 2, rect.top + 110);
      x = point.x - card_sizes.expanded.width / 2;
      y = point.y;
    }
  } else if (isTimelineCardType(cardType) && last) {
    const grid = card_state.preferences.gridSize;
    x = last.x + getCardSize(last).width + grid;
    y = getTimelineTopForSize(card_sizes.expanded);
  } else {
    const rect = dom.canvasViewport.getBoundingClientRect();
    const titleCard = getTitleCard();
    if (isTimelineCardType(cardType)) {
      x = getTimelineStartX();
      y = getTimelineTopForSize(card_sizes.expanded);
    } else if (titleCard) {
      const grid = card_state.preferences.gridSize;
      x = titleCard.x;
      y = titleCard.y + card_sizes.expanded.height + grid;
    } else {
      const point = screenToWorld(rect.left + rect.width / 2, rect.top + 110);
      x = point.x - card_sizes.expanded.width / 2;
      y = point.y;
    }
  }
  return createCardAt(x, y, { type: cardType });
}

// Returns the most recently created non-title card.
function getLastSpawnedCard() {
  return [...card_state.cards]
    .filter((card) => !isTitleCard(card))
    .sort((a, b) => b.creationIndex - a.creationIndex)[0] || null;
}

// Copies an existing card into a nearby card while preserving media and content.
function copyCard(cardId) {
  const source = findCard(cardId);
  if (!source || isTitleCard(source)) return;
  const grid = card_state.preferences.gridSize || card_defaults.gridSize;
  const position = findNonOverlappingPosition(null, source.x + getCardSize(source).width + grid, source.y, getCardSize(source));
  const sourceSupportsMedia = cardSupportsMedia(source);
  const card = createCardAt(position.x, position.y, {
    type: source.type,
    fields: {
      slugVisible: source.fields.slugVisible === true,
      slugPrefix: source.fields.slugPrefix,
      location: source.fields.location,
      slugTime: source.fields.slugTime,
      characters: getCardCharacters(source),
      notes: source.fields.notes,
      author: source.fields.author || "",
      date: source.fields.date || "",
      tagline: source.fields.tagline || "",
      supporting: source.fields.supporting
    },
    mediaPath: sourceSupportsMedia ? source.mediaPath : "",
    localMediaUrl: sourceSupportsMedia ? source.localMediaUrl : ""
  });
  card.color = source.color;
  card.expanded = source.expanded;
  card.editable = false;
  card.showMediaPicker = Boolean(source.showMediaPicker) && cardSupportsMedia(card);
  if (!(isTimelineCard(source) && isTimelineCard(card))) createLine(source.id, card.id);
  renderAll();
}

// Returns next card title index.
function getNextCardTitleIndex(cardType) {
  const used = new Set();
  card_state.cards.forEach((card) => {
    if (getCardType(card) !== cardType || card.fields.header) return;
    const index = getGeneratedTitleIndex(card, cardType);
    if (index) used.add(index);
  });
  let next = 1;
  while (used.has(next)) next += 1;
  return next;
}

// Creates a card from a pane-header button and connects it to the current chain when allowed.
function createConnectedCardFromButton(type) {
  const card = createCardFromButton(type);
  if (!card) return null;
  renderAll();
  return card;
}

// Returns last card in chain.
function getLastCardInChain() {
  const cards = getTimelineStoryCards()
    .sort((a, b) => a.x - b.x || a.creationIndex - b.creationIndex);
  return cards[cards.length - 1] || null;
}

// Supports select card.
function selectCard(cardId) {
  card_state.selectedCardId = cardId;
  card_state.selectedCardIds = cardId ? [cardId] : [];
  updateCardSelectionClasses();
}

// Selects multiple cards while keeping one active card for focused controls.
function selectCards(cardIds, activeId = "") {
  const ids = [...new Set(cardIds.filter((id) => findCard(id)))];
  card_state.selectedCardIds = ids;
  card_state.selectedCardId = activeId && ids.includes(activeId) ? activeId : ids[0] || null;
  card_state.raisedCardId = card_state.selectedCardId;
  updateCardSelectionClasses();
}

// Returns whether a card is part of the current card selection.
function isCardSelected(cardId) {
  return card_state.selectedCardIds.includes(cardId) || card_state.selectedCardId === cardId;
}

// Returns the current card selection as existing card ids.
function getSelectedCardIds() {
  const ids = [...new Set([
    ...card_state.selectedCardIds,
    card_state.selectedCardId
  ].filter(Boolean))];
  return ids.filter((id) => findCard(id));
}

// Applies selected and raised classes without requiring a full card render.
function updateCardSelectionClasses() {
  const selected = new Set(card_state.selectedCardIds);
  if (card_state.selectedCardId) selected.add(card_state.selectedCardId);
  dom.cardsLayer.querySelectorAll(".card-item").forEach((el) => {
    const isSelected = selected.has(el.dataset.cardId);
    el.classList.toggle("is-selected", isSelected);
    el.classList.toggle("is-raised", isSelected || el.dataset.cardId === card_state.raisedCardId);
  });
}

// Supports expand all cards.
function expandAllCards() {
  recordHistory();
  card_state.cards.forEach((card) => setCardExpanded(card, true, card.editable));
  markDirty();
  renderAll();
}

// Supports compact all cards.
function compactAllCards() {
  recordHistory();
  card_state.cards.forEach((card) => setCardExpanded(card, false, false));
  markDirty();
  renderAll();
}

// Sets card expanded.
function setCardExpanded(card, expanded, editable) {
  const shouldExpand = expanded;
  const wasExpanded = Boolean(card.expanded);
  const wasOnTimeline = cardTouchesTimeline(card);
  card.expanded = shouldExpand;
  card.editable = Boolean(editable);
  card.size = { ...(shouldExpand ? card_sizes.expanded : card_sizes.compact) };
  card.x = snap(card.x);
  card.y = wasOnTimeline ? getTimelineTopForSize(card.size, card.id) : snap(card.y);
  if (shouldExpand && !wasExpanded) {
    if (wasOnTimeline) {
      placeCardAndNudge(card, card.x, card.y);
    } else {
      resolveOverlapsAfterExpansion(card.id);
    }
  }
}

// Returns whether card expanded.
function isCardExpanded(card) {
  return Boolean(card.expanded);
}

// Creates line.
function createLine(sourceId, targetId) {
  if (!sourceId || !targetId || sourceId === targetId) return;
  const sourceCard = findCard(sourceId);
  const targetCard = findCard(targetId);
  if (!sourceCard || (!targetCard && targetId !== PROJECT_TARGET_ID)) return;

  if (isTitleCard(sourceCard)) {
    showNotice("Title card cannot create outgoing connections");
    return;
  }
  if (isTitleCard(targetCard) && !isNoteCard(sourceCard)) {
    showNotice("Only notes can connect to the title card");
    return;
  }
  if ((isCharacterCard(sourceCard) || isCharacterCard(targetCard)) && !(isCharacterCard(sourceCard) && isCharacterCard(targetCard))) {
    showNotice("Character cards connect only to character cards");
    return;
  }
  if (isTimelineCard(sourceCard) && isTimelineCard(targetCard)) {
    showNotice("Use Timeline To Order Story");
    return;
  }
  if (targetId === PROJECT_TARGET_ID && !isNoteCard(sourceCard)) {
    showNotice("Only notes can connect to the project title");
    return;
  }
  if (targetId === PROJECT_TARGET_ID && isNoteCard(sourceCard)) {
    const nextLines = card_state.lines.filter((line) => line.sourceId !== sourceId);
    recordHistory();
    card_state.lines = nextLines;
    card_state.lines.push({
      id: `card_line_${card_state.nextLine++}`,
      sourceId,
      targetId,
      color: getOutgoingCardColor(sourceCard),
      creationIndex: card_state.nextLineCreation++
    });
    refreshConnectionFlags();
    markDirty();
    return;
  }
  if (isNoteCard(targetCard) && !isNoteCard(sourceCard)) {
    showNotice("Notes can receive connections only from notes");
    return;
  }
  if (isNoteCard(sourceCard) && targetCard && !isNoteCard(targetCard) && !cardAppearsInStoryline(targetCard) && !isTitleCard(targetCard)) {
    showNotice("Notes connect only to story cards, notes, or the title card");
    return;
  }

  const nextLines = card_state.lines.filter((line) => {
    if (line.sourceId === sourceId && cardHasSingleOutgoing(sourceCard)) return false;
    if (!isNoteCard(sourceCard) && line.targetId === targetId && cardHasSingleIncoming(targetCard)) return false;
    return true;
  });

  if (lineWouldCross(sourceId, targetId, nextLines)) {
    showNotice("Line blocked by crossing");
    return;
  }
  if (wouldCreateLoop(sourceId, targetId, nextLines)) {
    showNotice("Line blocked to avoid a loop");
    return;
  }

  recordHistory();
  card_state.lines = nextLines;
  card_state.lines.push({
    id: `card_line_${card_state.nextLine++}`,
    sourceId,
    targetId,
    color: getOutgoingCardColor(sourceCard),
    creationIndex: card_state.nextLineCreation++
  });
  refreshConnectionFlags();
  markDirty();
}

// Supports sever outgoing connection.
function severOutgoingConnection(cardId) {
  const before = card_state.lines.length;
  recordHistory();
  card_state.lines = card_state.lines.filter((line) => line.sourceId !== cardId);
  if (card_state.lines.length !== before) {
    refreshConnectionFlags();
    markDirty();
  }
}

// Supports would create loop.
function wouldCreateLoop(sourceId, targetId, lines) {
  const outgoing = new Map();
  lines.forEach((line) => {
    if (isTimelineConnection(line)) return;
    if (!outgoing.has(line.sourceId)) outgoing.set(line.sourceId, []);
    outgoing.get(line.sourceId).push(line.targetId);
  });
  const stack = [targetId];
  const seen = new Set();
  while (stack.length) {
    const current = stack.pop();
    if (current === sourceId) return true;
    if (seen.has(current)) continue;
    seen.add(current);
    (outgoing.get(current) || []).forEach((next) => stack.push(next));
  }
  return false;
}

// Supports refresh connection flags.
function refreshConnectionFlags() {
  card_state.cards.forEach((card) => {
    card.incomingLineId = "";
    card.outgoingLineId = "";
    card.incomingCardId = "";
    card.outgoingCardId = "";
  });
  card_state.lines
    .slice()
    .sort((a, b) => a.creationIndex - b.creationIndex)
    .forEach((line) => {
      const source = findCard(line.sourceId);
      const target = findCard(line.targetId);
      if (isTimelineCard(source) && isTimelineCard(target)) return;
      if (source) {
        source.outgoingLineId = line.id;
        source.outgoingCardId = line.targetId;
      }
      if (target && (
        (cardAppearsInStoryline(source) && cardAppearsInStoryline(target))
        || (isNoteCard(source) && isNoteCard(target))
        || (isCharacterCard(source) && isCharacterCard(target))
      )) {
        target.incomingLineId = line.id;
        target.incomingCardId = line.sourceId;
      }
    });
}

// Inserts an unconnected story card into the nearest direct story connection it was dropped between.
function insertCardIntoStoryFlow(card) {
  if (!cardAppearsInStoryline(card)) return false;
  if (card_state.lines.some((line) => line.sourceId === card.id || line.targetId === card.id)) return false;
  const candidate = findInsertionLineForCard(card);
  if (!candidate) return false;

  const originalTargetId = candidate.line.targetId;
  const nextLines = card_state.lines.map((line) => (
    line.id === candidate.line.id ? { ...line, targetId: card.id, color: getOutgoingCardColor(findCard(line.sourceId)) } : { ...line }
  ));
  nextLines.push({
    id: `card_line_${card_state.nextLine}`,
    sourceId: card.id,
    targetId: originalTargetId,
    color: getOutgoingCardColor(card),
    creationIndex: card_state.nextLineCreation
  });

  if (wouldCreateLoop(card.id, originalTargetId, nextLines)) return false;
  if (lineWouldCross(card.id, originalTargetId, nextLines.filter((line) => line.sourceId !== card.id))) return false;

  candidate.line.targetId = card.id;
  candidate.line.color = getOutgoingCardColor(findCard(candidate.line.sourceId));
  card_state.lines.push({
    id: `card_line_${card_state.nextLine++}`,
    sourceId: card.id,
    targetId: originalTargetId,
    color: getOutgoingCardColor(card),
    creationIndex: card_state.nextLineCreation++
  });
  refreshConnectionFlags();
  return {
    sourceId: candidate.line.sourceId,
    targetId: originalTargetId
  };
}

// Finds the nearest direct story line that contains a card's center between its endpoints.
function findInsertionLineForCard(card) {
  const center = getCardCenter(card);
  const axis = getNewCardAxis();
  const grid = card_state.preferences.gridSize || card_defaults.gridSize;
  const cardSize = getCardSize(card);
  const threshold = axis === "y"
    ? cardSize.width / 2 + grid * 2
    : cardSize.height / 2 + grid * 2;

  return card_state.lines
    .map((line) => {
      const source = findCard(line.sourceId);
      const target = findCard(line.targetId);
      if (!cardAppearsInStoryline(source) || !cardAppearsInStoryline(target)) return null;
      const start = getCardCenter(source);
      const end = getCardCenter(target);
      const sourceSize = getCardSize(source);
      const targetSize = getCardSize(target);
      const between = axis === "y"
        ? isBetweenCardEdges(center.y, source.y, sourceSize.height, target.y, targetSize.height, grid)
        : isBetweenCardEdges(center.x, source.x, sourceSize.width, target.x, targetSize.width, grid);
      if (!between) return null;
      const distanceToLine = pointToSegmentDistance(center, start, end);
      if (distanceToLine > threshold) return null;
      return { line, distanceToLine };
    })
    .filter(Boolean)
    .sort((a, b) => a.distanceToLine - b.distanceToLine)[0] || null;
}

// Returns whether a point along one axis sits between the visible edges of two cards.
function isBetweenCardEdges(value, firstStart, firstLength, secondStart, secondLength, tolerance) {
  const firstEnd = firstStart + firstLength;
  const secondEnd = secondStart + secondLength;
  const lower = firstStart <= secondStart ? firstEnd : secondEnd;
  const upper = firstStart <= secondStart ? secondStart : firstStart;
  if (upper < lower) return false;
  return value >= lower - tolerance && value <= upper + tolerance;
}

// Returns the shortest distance from a point to a line segment.
function pointToSegmentDistance(point, start, end) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  if (dx === 0 && dy === 0) return distance(point, start);
  const t = clamp(((point.x - start.x) * dx + (point.y - start.y) * dy) / (dx * dx + dy * dy), 0, 1);
  return distance(point, {
    x: start.x + t * dx,
    y: start.y + t * dy
  });
}

// Deletes pending card.
function deletePendingCard() {
  const cardId = card_state.pendingDeleteId;
  if (!cardId) return;
  const card = findCard(cardId);
  if (isTitleCard(card)) {
    card_state.pendingDeleteId = null;
    renderAll();
    return;
  }
  recordHistory();
  if (isCharacterCard(card)) {
    deleteCharacterByName(getCharacterCardName(card));
    card_state.pendingDeleteId = null;
    markDirty();
    renderAll();
    return;
  }
  revokeLocalMediaUrl(card);
  card_state.cards = card_state.cards.filter((item) => item.id !== cardId);
  card_state.lines = card_state.lines.filter((line) => line.sourceId !== cardId && line.targetId !== cardId);
  if (card_state.selectedCardId === cardId) card_state.selectedCardId = null;
  card_state.pendingDeleteId = null;
  markDirty();
  renderAll();
}

// Renders lines UI markup or state.
function renderLines() {
  const markerDefs = [];
  const lineParts = [];
  const timeline = getTimelineVisual();
  markerDefs.push(`
    <marker id="timeline_arrow_start" viewBox="0 0 10 10" refX="1" refY="5" markerWidth="4" markerHeight="4" orient="auto" markerUnits="strokeWidth">
      <path d="M10 0 0 5 10 10z" fill="#1f2a33"></path>
    </marker>
    <marker id="timeline_arrow_end" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto" markerUnits="strokeWidth">
      <path d="M0 0 10 5 0 10z" fill="#1f2a33"></path>
    </marker>
  `);
  lineParts.push(`<path class="timeline-line" d="M ${timeline.startX} ${timeline.y} L ${timeline.endX} ${timeline.y}" marker-start="url(#timeline_arrow_start)" marker-end="url(#timeline_arrow_end)"></path>`);
  card_state.lines.forEach((line) => {
    if (isTimelineConnection(line)) return;
    const points = getLinePoints(line.sourceId, line.targetId);
    if (!points) return;
    const markerId = `arrow_${line.id}`;
    const color = getLineRenderColor(line);
    line.color = color;
    markerDefs.push(`
      <marker id="${markerId}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto" markerUnits="strokeWidth">
        <path d="M0 0 10 5 0 10z" fill="${color}"></path>
      </marker>
    `);
    const d = `M ${points.start.x} ${points.start.y} L ${points.end.x} ${points.end.y}`;
    lineParts.push(`
      <g data-line-id="${line.id}">
        <path class="line-visible" d="${d}" stroke="${color}" stroke-width="6" marker-end="url(#${markerId})"></path>
      </g>
    `);
  });

  if (card_state.pointer?.type === "connect") {
    const source = findCard(card_state.pointer.sourceId);
    if (source) {
      const start = getCardCenter(source);
      const d = `M ${start.x} ${start.y} L ${card_state.pointer.current.x} ${card_state.pointer.current.y}`;
      lineParts.push(`<path class="line-draft" d="${d}" stroke="${getOutgoingCardColor(source)}"></path>`);
    }
  }

  dom.lineLayer.innerHTML = `<defs>${markerDefs.join("")}</defs>${lineParts.join("")}`;
}

// Returns whether a stored line is superseded by the single visual timeline.
function isTimelineConnection(line) {
  return isTimelineCard(findCard(line.sourceId)) && isTimelineCard(findCard(line.targetId));
}

// Supports line would cross.
function lineWouldCross(sourceId, targetId, lines = card_state.lines) {
  const nextPoints = getLinePoints(sourceId, targetId);
  if (!nextPoints) return false;
  for (const line of lines) {
    if (isTimelineConnection(line)) continue;
    if ([line.sourceId, line.targetId].includes(sourceId) || [line.sourceId, line.targetId].includes(targetId)) {
      continue;
    }
    const existingPoints = getLinePoints(line.sourceId, line.targetId);
    if (!existingPoints) continue;
    if (segmentsIntersect(nextPoints.start, nextPoints.end, existingPoints.start, existingPoints.end)) {
      return true;
    }
  }
  return false;
}

// Returns line points.
function getLinePoints(sourceId, targetId) {
  const source = findCard(sourceId);
  const target = findCard(targetId);
  if (!source || !target) return null;
  return {
    start: getRectEdgePoint(source, target),
    end: getRectEdgePoint(target, source)
  };
}

// Returns card center.
function getCardCenter(card) {
  const size = getCardSize(card);
  return {
    x: card.x + size.width / 2,
    y: card.y + size.height / 2
  };
}

// Returns rect edge point.
function getRectEdgePoint(card, towardCard) {
  const center = getCardCenter(card);
  const toward = getCardCenter(towardCard);
  const size = getCardSize(card);
  const dx = toward.x - center.x;
  const dy = toward.y - center.y;
  if (dx === 0 && dy === 0) return center;
  const scaleX = dx === 0 ? Infinity : (size.width / 2) / Math.abs(dx);
  const scaleY = dy === 0 ? Infinity : (size.height / 2) / Math.abs(dy);
  const scale = Math.min(scaleX, scaleY);
  return {
    x: center.x + dx * scale,
    y: center.y + dy * scale
  };
}

// Supports segments intersect.
function segmentsIntersect(a, b, c, d) {
  if (pointsEqual(a, c) || pointsEqual(a, d) || pointsEqual(b, c) || pointsEqual(b, d)) return false;
  const o1 = orientation(a, b, c);
  const o2 = orientation(a, b, d);
  const o3 = orientation(c, d, a);
  const o4 = orientation(c, d, b);

  if (o1 !== o2 && o3 !== o4) return true;
  if (o1 === 0 && onSegment(a, c, b)) return true;
  if (o2 === 0 && onSegment(a, d, b)) return true;
  if (o3 === 0 && onSegment(c, a, d)) return true;
  if (o4 === 0 && onSegment(c, b, d)) return true;
  return false;
}

// Supports orientation.
function orientation(a, b, c) {
  const value = (b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y);
  if (Math.abs(value) < 0.0001) return 0;
  return value > 0 ? 1 : 2;
}

// Supports on segment.
function onSegment(a, b, c) {
  return b.x <= Math.max(a.x, c.x) + 0.0001
    && b.x + 0.0001 >= Math.min(a.x, c.x)
    && b.y <= Math.max(a.y, c.y) + 0.0001
    && b.y + 0.0001 >= Math.min(a.y, c.y);
}

// Supports points equal.
function pointsEqual(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y) < 0.0001;
}

// Renders story UI markup or state.
function renderStory() {
  const storylines = buildStorylines();
  updateMobileStoryProjectTitle();
  dom.storyCount.value = String(storylines.reduce((sum, group) => sum + group.cards.length, 0));
  dom.storyOutput.innerHTML = getStoryBodyHtml(storylines, { liveEditing: true });
  refreshTextPopout();
}

// Returns story body html.
function getStoryBodyHtml(storylines = buildStorylines(), options = {}) {
  const fields = getActiveStoryFields();
  const projectTitle = fields.titleCard ? renderProjectTitleBlock(options) : "";
  const projectNotes = fields.titleCard ? renderFootnotesForTarget(PROJECT_TARGET_ID, options) : "";
  const emptyStory = projectTitle || projectNotes ? "" : '<div class="empty-story">Place scene or dialog cards on the timeline to build story.</div>';
  return storylines.length
    ? `${projectTitle}${projectNotes}${storylines.map((group, index) => renderStoryline(group, index, storylines.length > 1 && fields.act, options)).join("")}`
    : `${projectTitle}${projectNotes}${emptyStory}`;
}

// Renders the project title and optional title-card metadata for story output.
function renderProjectTitleBlock(options = {}) {
  const titleCard = getTitleCard();
  const titleAttrs = options.liveEditing
    ? ' class="project-title story-editable" data-story-edit="projectTitle" title="Double-click or long-press to edit"'
    : ' class="project-title"';
  const fields = getActiveStoryFields();
  const mediaPath = titleCard && fields.media
    ? (options.exportImages ? exportMediaPath(titleCard.mediaPath) : getMediaPreviewSource(titleCard))
    : "";
  const media = mediaPath ? `<img class="project-title-media" src="${escapeAttr(mediaPath)}" alt="">` : "";
  const metaFields = [
    ["author", "Author"],
    ["date", "Date"],
    ["tagline", "Tagline"]
  ];
  const meta = titleCard
    ? metaFields
      .map(([field, label]) => {
        const value = String(titleCard.fields[field] || "").trim();
        if (!value) return "";
        return renderStoryTextPart("p", field, titleCard, value, options, `project-meta project-${field}`);
      })
      .join("")
    : "";
  return `${media}<h1${titleAttrs}>${escapeHtml(getProjectName())}</h1>${meta}`;
}

// Renders storyline UI markup or state.
function renderStoryline(group, index, showTitle, options = {}) {
  const colorStyle = group.color ? ` style="color:${escapeAttr(group.color)}"` : "";
  const title = getStorylineTitle(group, index);
  const defaultTitle = getDefaultActTitle(index);
  const titleMarkup = options.liveEditing
    ? `<h1 class="storyline-title story-editable" data-story-edit="storyline" data-storyline-key="${escapeAttr(group.key)}" data-default-title="${escapeAttr(defaultTitle)}" title="Double-click or long-press to edit"${colorStyle}>${escapeHtml(title)}</h1>`
    : `<h1 class="storyline-title"${colorStyle}>${escapeHtml(title)}</h1>`;
  const cardsHtml = group.cards.map((card) => renderStoryCard(card, options)).join("");
  if (!showTitle && !cardsHtml.trim()) return "";
  return `
    <section class="storyline">
      ${showTitle ? titleMarkup : ""}
      ${cardsHtml}
    </section>
  `;
}

// Builds one card section in the story output.
function renderStoryCard(card, options = {}) {
  const fields = getActiveStoryFields();
  const mediaPath = options.exportImages ? exportMediaPath(card.mediaPath) : getMediaPreviewSource(card);
  const characters = getCardCharacters(card).join(", ");
  const dialogCard = isDialogCard(card);
  const parts = [
    fields.media && cardSupportsMedia(card) && mediaPath ? `<img src="${escapeAttr(mediaPath)}" alt="">` : "",
    fields.header ? renderStoryTextPart("h2", "header", card, getDisplayCardTitle(card), options) : "",
    fields.location && cardUsesSceneFields(card) && card.fields.slugVisible === true && getSceneSlug(card) ? renderStoryTextPart("h3", "location", card, getSceneSlug(card), options, "story-slug") : "",
    fields.characters && characters ? renderStoryTextPart("p", "characters", card, characters, options, "story-characters") : "",
    fields.notes && cardUsesSceneFields(card) && card.fields.notes ? renderStoryTextPart("h3", "notes", card, card.fields.notes, options) : "",
    fields.supporting && card.fields.supporting ? renderStoryTextPart("p", "supporting", card, card.fields.supporting, options, dialogCard ? "story-dialog-body" : "") : ""
  ].filter(Boolean);
  if (!parts.length) return "";
  const actions = options.liveEditing
    ? `<div class="story-card-actions">
        <button class="story-copy-button" type="button" data-story-copy="${escapeAttr(card.id)}" title="Copy card" aria-label="Copy ${escapeAttr(getDisplayCardTitle(card))}">${card_icons.copy}</button>
        <button class="story-delete-button" type="button" data-story-delete="${escapeAttr(card.id)}" title="Delete card" aria-label="Delete ${escapeAttr(getDisplayCardTitle(card))}">${card_icons.delete}</button>
      </div>`
    : "";
  return `
    <section class="story-card${dialogCard ? " is-dialog-card" : ""}" data-card-id="${card.id}">
      ${actions}
      ${parts.join("")}
      ${renderFootnotesForTarget(card.id, options)}
    </section>
  `;
}

// Renders footnotes for target UI markup or state.
function renderFootnotesForTarget(targetId, options = {}) {
  const fields = getActiveStoryFields();
  if (!fields.noteCards) return "";
  const titleCard = getTitleCard();
  const targetIds = targetId === PROJECT_TARGET_ID && titleCard
    ? new Set([PROJECT_TARGET_ID, titleCard.id])
    : new Set([targetId]);
  const notes = card_state.lines
    .filter((line) => targetIds.has(line.targetId))
    .map((line) => findCard(line.sourceId))
    .filter((card) => isNoteCard(card))
    .sort((a, b) => a.creationIndex - b.creationIndex);
  if (!notes.length) return "";
  return `
    <div class="story-footnotes">
      ${notes.map((note) => renderStoryNote(note, fields, options)).join("")}
    </div>
  `;
}

// Renders story note UI markup or state.
function renderStoryNote(note, fields, options = {}) {
  const title = fields.header ? `<h3>${escapeHtml(getDisplayCardTitle(note))}</h3>` : "";
  const body = fields.supporting && note.fields.supporting ? `<p>${formatBodyText(note.fields.supporting)}</p>` : "";
  if (!title && !body) return "";
  return `<aside class="story-note" data-card-id="${note.id}">${title}${body}${renderFootnotesForTarget(note.id, options)}</aside>`;
}

// Renders story text part UI markup or state.
function renderStoryTextPart(tag, field, card, value, options = {}, className = "") {
  const attrs = options.liveEditing
    ? ` class="${["story-editable", className].filter(Boolean).join(" ")}" data-story-edit="${field}" data-card-id="${escapeAttr(card.id)}" title="Double-click or long-press to edit"`
    : className ? ` class="${className}"` : "";
  const content = field === "supporting" ? formatBodyText(value) : escapeHtml(value);
  return `<${tag}${attrs}>${content}</${tag}>`;
}

// Builds the single timeline storyline ordered by card position.
function buildStorylines() {
  const cards = getTimelineStoryCards();
  if (!cards.length) return [];
  return [{
    key: "timeline",
    cards,
    x: Math.min(...cards.map((card) => card.x)),
    y: getTimelineY(),
    creationIndex: Math.min(...cards.map((card) => card.creationIndex)),
    color: card_defaults.lineColor
  }];
}

// Supports order cards within group.
function orderCardsWithinGroup(ids) {
  const idSet = new Set(ids);
  const cardsById = new Map(card_state.cards.map((card) => [card.id, card]));
  const incoming = new Map(ids.map((id) => [id, 0]));
  const outgoing = new Map(ids.map((id) => [id, []]));

  card_state.lines
    .filter((line) => idSet.has(line.sourceId) && idSet.has(line.targetId))
    .sort((a, b) => a.creationIndex - b.creationIndex)
    .forEach((line) => {
      outgoing.get(line.sourceId).push(line.targetId);
      incoming.set(line.targetId, incoming.get(line.targetId) + 1);
    });

  const queue = ids
    .filter((id) => incoming.get(id) === 0)
    .sort((a, b) => sortCards(cardsById.get(a), cardsById.get(b)));
  const ordered = [];
  const used = new Set();

  while (queue.length) {
    const current = queue.shift();
    if (used.has(current)) continue;
    used.add(current);
    ordered.push(cardsById.get(current));
    outgoing.get(current).forEach((targetId) => {
      incoming.set(targetId, incoming.get(targetId) - 1);
      if (incoming.get(targetId) === 0) {
        queue.push(targetId);
        queue.sort((a, b) => sortCards(cardsById.get(a), cardsById.get(b)));
      }
    });
  }

  ids
    .filter((id) => !used.has(id))
    .map((id) => cardsById.get(id))
    .sort(sortCards)
    .forEach((card) => ordered.push(card));

  return ordered;
}

// Returns group line color.
function getGroupLineColor(ids) {
  const idSet = new Set(ids);
  const line = card_state.lines
    .filter((item) => idSet.has(item.sourceId) && idSet.has(item.targetId))
    .sort((a, b) => a.creationIndex - b.creationIndex)[0];
  return line ? getLineRenderColor(line) : card_defaults.lineColor;
}

// Returns storyline key.
function getStorylineKey(ids) {
  return [...ids].sort().join("|");
}

// Returns storyline title.
function getStorylineTitle(group, index) {
  return card_state.storylineTitles[group.key] || getDefaultActTitle(index);
}

// Returns default act title.
function getDefaultActTitle(index) {
  return `ACT ${String(index + 1).padStart(2, "0")}`;
}

// Returns new card axis.
function getNewCardAxis() {
  return card_state.preferences.newCardAxis === "y" ? "y" : "x";
}

// Normalizes storyline titles.
function normalizeStorylineTitles(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(
    Object.entries(value)
      .map(([key, title]) => [String(key), String(title || "").trim()])
      .filter(([, title]) => title)
  );
}

// Supports sort cards.
function sortCards(a, b) {
  if (getNewCardAxis() === "y") {
    return a.y - b.y || a.x - b.x || a.creationIndex - b.creationIndex;
  }
  return a.x - b.x || a.y - b.y || a.creationIndex - b.creationIndex;
}

// Returns active story fields.
function getActiveStoryFields() {
  const fields = {};
  document.querySelectorAll("[data-story-field]").forEach((checkbox) => {
    fields[checkbox.dataset.storyField] = checkbox.checked;
  });
  return fields;
}

// Handles story double click events and updates related state.
function handleStoryDoubleClick(event) {
  const target = event.target.closest(".story-editable");
  if (!target || target.closest(".story-inline-editor")) return;
  event.preventDefault();
  beginStoryEdit(target);
}

// Handles story click events and updates related state.
function handleStoryClick(event) {
  const copyButton = event.target.closest("[data-story-copy]");
  if (copyButton) {
    event.preventDefault();
    event.stopPropagation();
    copyCard(copyButton.dataset.storyCopy);
    return;
  }
  const deleteButton = event.target.closest("[data-story-delete]");
  if (!deleteButton) return;
  event.preventDefault();
  event.stopPropagation();
  card_state.pendingDeleteId = deleteButton.dataset.storyDelete;
  dom.deleteDialog.showModal();
}

// Handles story pointer down events and updates related state.
function handleStoryPointerDown(event) {
  const target = event.target.closest(".story-editable");
  if (!target || event.button !== 0) return;
  clearStoryPress();
  card_state.storyPress = {
    target,
    x: event.clientX,
    y: event.clientY,
    timer: window.setTimeout(() => beginStoryEdit(target), 560)
  };
}

// Handles story pointer move events and updates related state.
function handleStoryPointerMove(event) {
  const press = card_state.storyPress;
  if (!press) return;
  if (Math.hypot(event.clientX - press.x, event.clientY - press.y) > 8) clearStoryPress();
}

// Handles story pointer up events and updates related state.
function handleStoryPointerUp() {
  clearStoryPress();
}

// Clears story press.
function clearStoryPress() {
  if (!card_state.storyPress) return;
  window.clearTimeout(card_state.storyPress.timer);
  card_state.storyPress = null;
}

// Supports begin story edit.
function beginStoryEdit(element) {
  clearStoryPress();
  if (!element?.isConnected) return;
  const existingEditor = dom.storyOutput.querySelector(".story-inline-editor");
  if (existingEditor) commitStoryEditor(existingEditor);

  const editType = element.dataset.storyEdit;
  const value = getStoryEditValue(element);
  const editor = document.createElement(editType === "supporting" ? "textarea" : "input");
  editor.className = `story-inline-editor${editType === "supporting" ? " story-inline-textarea" : ""}`;
  editor.name = `story_${editType}_${element.dataset.cardId || element.dataset.storylineKey || "project"}`;
  editor.value = value;
  editor.dataset.storyEdit = editType;
  editor.dataset.originalValue = value;
  if (element.dataset.cardId) editor.dataset.cardId = element.dataset.cardId;
  if (element.dataset.storylineKey) editor.dataset.storylineKey = element.dataset.storylineKey;
  if (element.dataset.defaultTitle) editor.dataset.defaultTitle = element.dataset.defaultTitle;
  if (element.style.color) editor.style.color = element.style.color;
  element.replaceWith(editor);
  editor.focus();
  editor.select();
}

// Returns story edit value.
function getStoryEditValue(element) {
  const editType = element.dataset.storyEdit;
  if (editType === "supporting") {
    const card = findCard(element.dataset.cardId);
    return card?.fields.supporting || "";
  }
  if (["author", "date", "tagline"].includes(editType)) {
    const card = findCard(element.dataset.cardId);
    return card?.fields[editType] || "";
  }
  if (editType === "projectTitle") {
    return getProjectName();
  }
  if (["location", "characters", "notes"].includes(editType)) {
    const card = findCard(element.dataset.cardId);
    if (editType === "characters") return getCardCharacters(card).join(", ");
    return card?.fields[editType] || "";
  }
  if (editType === "header") {
    const card = findCard(element.dataset.cardId);
    return card ? getDisplayCardTitle(card) : element.textContent.trim();
  }
  return element.textContent.trim();
}

// Handles story editor keydown events and updates related state.
function handleStoryEditorKeydown(event) {
  const editor = event.target.closest(".story-inline-editor");
  if (!editor) return;
  if (event.key === "Escape") {
    event.preventDefault();
    commitStoryEditor(editor, true);
    return;
  }
  if (editor.tagName === "TEXTAREA" && !(event.ctrlKey || event.metaKey)) return;
  if (event.key === "Enter") {
    event.preventDefault();
    commitStoryEditor(editor);
  }
}

// Handles story editor blur events and updates related state.
function handleStoryEditorBlur(event) {
  const editor = event.target.closest(".story-inline-editor");
  if (!editor) return;
  commitStoryEditor(editor);
}

// Supports commit story editor.
function commitStoryEditor(editor, cancel = false) {
  if (!editor || editor.dataset.committed) return;
  editor.dataset.committed = "true";
  if (cancel) {
    renderStory();
    return;
  }

  const editType = editor.dataset.storyEdit;
  const value = editor.value.trim();
  const originalValue = editor.dataset.originalValue || "";
  if (value === originalValue) {
    renderStory();
    return;
  }

  recordHistory();
  if (editType === "storyline") {
    const key = editor.dataset.storylineKey;
    if (key) {
      if (value) card_state.storylineTitles[key] = value;
      else delete card_state.storylineTitles[key];
    }
  } else if (editType === "projectTitle") {
    card_state.projectName = value;
    updateProjectNameDisplay();
    syncTitleCardFromProjectName();
  } else {
    const card = findCard(editor.dataset.cardId);
    if (!card) {
      renderStory();
      return;
    }
    if (editType === "header") {
      card.fields.header = value === getCardTitlePlaceholder(card) ? "" : value;
      if (isTitleCard(card)) {
        card_state.projectName = card.fields.header;
        updateProjectNameDisplay();
      }
    }
    if (editType === "characters") setCardCharacters(card, value);
    if (["location", "notes", "author", "date", "tagline"].includes(editType)) card.fields[editType] = value;
    if (editType === "supporting") card.fields.supporting = value;
  }

  markDirty();
  renderAll();
}

// Saves the current project JSON through the file picker or download fallback.
async function saveProjectJson(options = {}) {
  const { saveAs = false, silent = false } = options;
  const project = buildProjectData();
  const blob = new Blob([JSON.stringify(project, null, 2)], { type: "application/json" });
  const currentProjectName = normalizedProjectName(project.projectName);

  if (canUseFileSystemAccess()) {
    try {
      const needsNewHandle = saveAs || !card_state.fileHandle || card_state.savedProjectName !== currentProjectName;
      if (needsNewHandle) {
        card_state.fileHandle = await window.showSaveFilePicker({
          suggestedName: `${projectFileBaseName()}.json`,
          types: [{
            description: "Card Canvas Project",
            accept: { "application/json": [".json"] }
          }]
        });
      }
      await writeBlobToFileHandle(card_state.fileHandle, blob);
      card_state.savedProjectName = currentProjectName;
      markSaved();
      if (!silent) showNotice("Project saved");
      return true;
    } catch (error) {
      if (error?.name === "AbortError") return false;
      console.error(error);
      if (!silent) showNotice("Project could not be saved");
      return false;
    }
  }

  if (silent) {
    if (!card_state.autoSaveNoticeShown) {
      showNotice("Auto-Save needs Save As in this browser");
      card_state.autoSaveNoticeShown = true;
    }
    return false;
  }

  downloadFile(blob, `${projectFileBaseName()}.json`);
  card_state.savedProjectName = currentProjectName;
  markSaved();
  showNotice("Project saved");
  return true;
}

// Supports request new project.
function requestNewProject() {
  if (hasUnsavedProjectChanges()) {
    dom.newProjectDialog.showModal();
    return;
  }
  resetProject();
}

// Supports has unsaved project changes.
function hasUnsavedProjectChanges() {
  const substantiveCards = card_state.cards.filter((card) => !isEmptyTitleCard(card));
  const hasContent = Boolean(
    substantiveCards.length
    || card_state.lines.length
    || card_state.characters.length
    || Object.keys(card_state.storylineTitles).length
    || String(card_state.projectName || "").trim()
  );
  return hasContent && !card_state.projectHasSavedFile;
}

// Returns whether the title card is still the untouched default structural card.
function isEmptyTitleCard(card) {
  if (!isTitleCard(card)) return false;
  return !String(card.fields.header || "").trim()
    && !String(card.fields.author || "").trim()
    && !String(card.fields.date || "").trim()
    && !String(card.fields.tagline || "").trim()
    && !card_state.lines.some((line) => line.sourceId === card.id || line.targetId === card.id);
}

// Supports reset project.
function resetProject() {
  card_state.cards.forEach((card) => revokeLocalMediaUrl(card));
  card_state.projectName = "";
  card_state.projectHasSavedFile = false;
  card_state.cards = [];
  card_state.lines = [];
  card_state.characters = [];
  card_state.storylineTitles = {};
  card_state.fileHandle = null;
  card_state.savedProjectName = "";
  card_state.undoStack = [];
  card_state.redoStack = [];
  card_state.pan = { x: 84, y: 72 };
  card_state.zoom = 1;
  card_state.nextCard = 1;
  card_state.nextLine = 1;
  card_state.nextCardCreation = 1;
  card_state.nextLineCreation = 1;
  card_state.selectedCardId = null;
  card_state.selectedCardIds = [];
  card_state.raisedCardId = null;
  card_state.pendingDeleteId = null;
  updateProjectNameDisplay();
  resetStoryFieldToggles();
  clearAutoSaveTimer();
  ensureTitleCard({ skipDirty: true, select: true });
  renderAll();
}

// Supports reset story field toggles.
function resetStoryFieldToggles() {
  const defaults = {
    header: false,
    act: false,
    location: true,
    characters: false,
    notes: true,
    noteCards: true,
    media: true,
    supporting: true,
    titleCard: false
  };
  document.querySelectorAll("[data-story-field]").forEach((checkbox) => {
    checkbox.checked = Boolean(defaults[checkbox.dataset.storyField]);
  });
}

// Serializes the current project state into the project JSON shape.
function buildProjectData() {
  refreshConnectionFlags();
  const project = {
    version: 6,
    projectName: getProjectName(),
    cards: card_state.cards.map((card) => ({
      id: card.id,
      type: getCardType(card),
      position: { x: card.x, y: card.y },
      size: { ...getCardSize(card) },
      state: {
        expanded: isCardExpanded(card),
        editable: card.editable,
        showMediaPicker: Boolean(card.showMediaPicker)
      },
      color: card.color,
      titlePlaceholder: card.titlePlaceholder || makeGeneratedCardTitle(getCardType(card), card.titleIndex || 1),
      titleIndex: Number(card.titleIndex) || getGeneratedTitleIndex(card, getCardType(card)) || 1,
      characterName: card.characterName || "",
      fields: {
        header: getPersistedTitle(card),
        slugVisible: card.fields.slugVisible === true,
        slugPrefix: getSceneSlugPrefix(card),
        location: card.fields.location,
        slugTime: getSceneSlugTime(card),
        characters: getStoredCardCharacters(card),
        notes: card.fields.notes,
        author: card.fields.author || "",
        date: card.fields.date || "",
        tagline: card.fields.tagline || "",
        supporting: getPersistedSupporting(card)
      },
      connections: {
        incomingLineId: card.incomingLineId || "",
        incomingCardId: card.incomingCardId || "",
        outgoingLineId: card.outgoingLineId || "",
        outgoingCardId: card.outgoingCardId || ""
      },
      mediaPath: card.mediaPath,
      creationIndex: card.creationIndex
    })),
    lines: card_state.lines.map((line) => ({
      id: line.id,
      sourceId: line.sourceId,
      targetId: line.targetId,
      color: getLineRenderColor(line),
      creationIndex: line.creationIndex
    })),
    storylineTitles: { ...card_state.storylineTitles },
    characters: [...card_state.characters],
    preferences: { ...card_state.preferences }
  };
  return project;
}

// Supports load project requested.
async function loadProjectRequested() {
  if (!canUseFileSystemAccess() || !window.showOpenFilePicker) {
    dom.projectFileInput.click();
    return;
  }
  try {
    const [handle] = await window.showOpenFilePicker({
      multiple: false,
      types: [{
        description: "Card Canvas Project",
        accept: { "application/json": [".json"] }
      }]
    });
    const file = await handle.getFile();
    loadProjectJson(JSON.parse(await file.text()));
    card_state.fileHandle = handle;
    card_state.savedProjectName = normalizedProjectName(getProjectName());
    showNotice("Project loaded");
  } catch (error) {
    if (error?.name === "AbortError") return;
    console.error(error);
    showNotice("Project could not be loaded");
  }
}

// Supports load project from file.
function loadProjectFromFile(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      loadProjectJson(JSON.parse(String(reader.result)));
      card_state.fileHandle = null;
      card_state.savedProjectName = normalizedProjectName(getProjectName());
      showNotice("Project loaded");
    } catch (error) {
      showNotice("Project JSON could not be loaded");
      console.error(error);
    } finally {
      dom.projectFileInput.value = "";
    }
  });
  reader.readAsText(file);
}

// Normalizes loaded project JSON into live application state.
function loadProjectJson(project) {
  card_state.projectName = String(project.projectName || "").trim();
  updateProjectNameDisplay();
  const preferences = project.preferences || {};
  card_state.preferences = {
    defaultCardColor: safeHex(preferences.defaultCardColor, card_defaults.color),
    cardMedPref: preferences.cardMedPref === "image" ? "image" : "text",
    newCardAxis: preferences.newCardAxis === "y" ? "y" : "x",
    gridSize: clamp(Number(preferences.gridSize) || card_defaults.gridSize, 8, 96),
    hideBranding: Boolean(preferences.hideBranding),
    autoSaveEnabled: preferences.autoSaveEnabled !== false,
    autoSaveInterval: Number(preferences.autoSaveInterval) || card_defaults.autoSaveInterval,
    namingPrefix: normalizeNamingPrefix(preferences.namingPrefix || card_defaults.namingPrefix),
    namingSequence: preferences.namingSequence === "letter" ? "letter" : "number"
  };
  card_state.characters = Array.isArray(project.characters)
    ? [...new Set(project.characters.map((name) => String(name || "").trim()).filter(Boolean))]
    : [];
  card_state.storylineTitles = normalizeStorylineTitles(project.storylineTitles);

  card_state.cards.forEach((card) => {
    if (card.localMediaUrl) URL.revokeObjectURL(card.localMediaUrl);
  });

  card_state.cards = (project.cards || []).map((raw, index) => {
    const expanded = raw.state?.expanded ?? raw.expanded ?? true;
    const size = raw.size || (expanded ? card_sizes.expanded : card_sizes.compact);
    const cardType = normalizeCardType(raw.type);
    const titleIndex = Number(raw.titleIndex) || index + 1;
    return {
      id: String(raw.id || `card_${index + 1}`).startsWith("card_") ? String(raw.id || `card_${index + 1}`) : `card_${raw.id}`,
      type: cardType,
      x: snap(Number(raw.position?.x ?? raw.x ?? 0)),
      y: snap(Number(raw.position?.y ?? raw.y ?? 0)),
      size: {
        width: Number(size.width) || (expanded ? card_sizes.expanded.width : card_sizes.compact.width),
        height: Number(size.height) || (expanded ? card_sizes.expanded.height : card_sizes.compact.height)
      },
      expanded,
      editable: Boolean(raw.state?.editable ?? raw.editable ?? false),
      color: safeHex(raw.color, card_state.preferences.defaultCardColor),
      fields: {
        header: String(raw.fields?.header ?? ""),
        slugVisible: raw.fields?.slugVisible === true,
        slugPrefix: SLUG_PREFIXES.includes(raw.fields?.slugPrefix) ? raw.fields.slugPrefix : SLUG_PREFIXES[0],
        location: normalizeSlugText(String(raw.fields?.location ?? "")),
        slugTime: SLUG_TIMES.includes(raw.fields?.slugTime) ? raw.fields.slugTime : SLUG_TIMES[0],
        characters: normalizeCardCharacters(raw.fields?.characters),
        notes: String(raw.fields?.notes ?? ""),
        author: String(raw.fields?.author ?? ""),
        date: String(raw.fields?.date ?? ""),
        tagline: String(raw.fields?.tagline ?? ""),
        supporting: sanitizeLoadedSupporting(String(raw.fields?.supporting ?? ""))
      },
      titlePlaceholder: String(raw.titlePlaceholder || makeGeneratedCardTitle(cardType, titleIndex)),
      titleIndex,
      characterName: String(raw.characterName || ""),
      supportingPlaceholder: randomInspiration(),
      mediaPath: card_type_flags[cardType].media ? String(raw.mediaPath ?? "") : "",
      localMediaUrl: "",
      showMediaPicker: card_type_flags[cardType].media && Boolean(raw.state?.showMediaPicker ?? raw.showMediaPicker ?? raw.mediaPath ?? false),
      creationIndex: Number(raw.creationIndex) || index + 1
    };
  });
  card_state.nextCard = nextNumberFromIds(card_state.cards, /^card_(\d+)$/);
  card_state.nextCardCreation = Math.max(0, ...card_state.cards.map((card) => card.creationIndex)) + 1;
  normalizeTitleCards();
  ensureTitleCard({ skipDirty: true });

  const cardIds = new Set(card_state.cards.map((card) => card.id));
  card_state.lines = (project.lines || [])
    .filter((line) => cardIds.has(line.sourceId) && (cardIds.has(line.targetId) || line.targetId === PROJECT_TARGET_ID))
    .filter((line) => {
      const source = findCard(line.sourceId);
      const target = findCard(line.targetId);
      if (line.targetId === PROJECT_TARGET_ID) return isNoteCard(source);
      if (isTitleCard(source)) return false;
      if (isTitleCard(target)) return isNoteCard(source);
      if (isCharacterCard(source) || isCharacterCard(target)) return isCharacterCard(source) && isCharacterCard(target);
      if (isNoteCard(target)) return isNoteCard(source);
      return true;
    })
    .map((line, index) => ({
      id: String(line.id || `card_line_${index + 1}`).startsWith("card_line_") ? String(line.id || `card_line_${index + 1}`) : `card_line_${line.id}`,
      sourceId: line.sourceId,
      targetId: line.targetId,
      color: safeHex(line.color, card_defaults.lineColor),
      creationIndex: Number(line.creationIndex) || index + 1
    }));

  card_state.selectedCardId = getTitleCard()?.id || card_state.cards[0]?.id || null;
  card_state.selectedCardIds = card_state.selectedCardId ? [card_state.selectedCardId] : [];
  card_state.nextCard = nextNumberFromIds(card_state.cards, /^card_(\d+)$/);
  card_state.nextLine = nextNumberFromIds(card_state.lines, /^card_line_(\d+)$/);
  card_state.nextCardCreation = Math.max(0, ...card_state.cards.map((card) => card.creationIndex)) + 1;
  card_state.nextLineCreation = Math.max(0, ...card_state.lines.map((line) => line.creationIndex)) + 1;
  snapAllCardsToGrid();
  refreshConnectionFlags();
  card_state.undoStack = [];
  card_state.redoStack = [];
  markSaved();
  renderAll();
}

// Exports window text html.
async function exportWindowTextHtml() {
  const bodyHtml = getStoryBodyHtml(buildStorylines(), { exportImages: true }).replace(
    '<div class="empty-story">Connect cards to build story.</div>',
    '<div class="empty-story">No connected cards were present at export.</div>'
  );
  await saveBlobWithPicker(
    new Blob([buildStoryDocumentHtml(bodyHtml, false)], { type: "text/html" }),
    `${projectFileBaseName()}.html`,
    "HTML",
    { "text/html": [".html"] }
  );
}

// Exports window text plain.
async function exportWindowTextPlain() {
  const text = buildPlainTextStory();
  await saveBlobWithPicker(
    new Blob([text], { type: "text/plain" }),
    `${projectFileBaseName()}.txt`,
    "Plain Text",
    { "text/plain": [".txt"] }
  );
}

// Exports character report.
async function exportCharacterReport() {
  await saveBlobWithPicker(
    new Blob([buildCharacterReportHtml()], { type: "text/html" }),
    `${projectFileBaseName()}-characters.html`,
    "HTML",
    { "text/html": [".html"] }
  );
}

// Exports scene report.
async function exportSceneReport(mode = "chronological") {
  const normalizedMode = ["chronological", "time", "location", "prefix"].includes(mode) ? mode : "chronological";
  await saveBlobWithPicker(
    new Blob([buildSceneReportHtml(normalizedMode)], { type: "text/html" }),
    `${projectFileBaseName()}-scenes-${normalizedMode}.html`,
    "HTML",
    { "text/html": [".html"] }
  );
}

// Supports save blob with picker.
async function saveBlobWithPicker(blob, suggestedName, description, accept) {
  if (canUseFileSystemAccess()) {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName,
        types: [{ description, accept }]
      });
      await writeBlobToFileHandle(handle, blob);
      showNotice("Export saved");
      return true;
    } catch (error) {
      if (error?.name === "AbortError") return false;
      console.error(error);
      showNotice("Export could not be saved");
      return false;
    }
  }
  downloadFile(blob, suggestedName);
  showNotice("Export saved");
  return true;
}

// Returns whether use file system access.
function canUseFileSystemAccess() {
  return typeof window.showSaveFilePicker === "function";
}

// Supports write blob to file handle.
async function writeBlobToFileHandle(handle, blob) {
  const writable = await handle.createWritable();
  await writable.write(blob);
  await writable.close();
}

// Supports schedule auto save.
function scheduleAutoSave() {
  clearAutoSaveTimer();
  if (!card_state.preferences.autoSaveEnabled) return;
  if (card_state.projectHasSavedFile) return;
  const interval = Number(card_state.preferences.autoSaveInterval) || card_defaults.autoSaveInterval;
  card_state.autoSaveTimer = window.setTimeout(autoSaveProject, interval);
}

// Clears auto save timer.
function clearAutoSaveTimer() {
  if (!card_state.autoSaveTimer) return;
  window.clearTimeout(card_state.autoSaveTimer);
  card_state.autoSaveTimer = null;
}

// Supports auto save project.
async function autoSaveProject() {
  card_state.autoSaveTimer = null;
  if (card_state.projectHasSavedFile) return;
  if (!card_state.fileHandle || card_state.savedProjectName !== normalizedProjectName(getProjectName())) {
    if (!card_state.autoSaveNoticeShown) {
      showNotice("Auto-Save needs Save As first");
      card_state.autoSaveNoticeShown = true;
    }
    return;
  }
  await saveProjectJson({ silent: true });
}

// Builds plain text story data or markup.
function buildPlainTextStory() {
  const storylines = buildStorylines();
  const fields = getActiveStoryFields();
  const lines = [];
  if (fields.titleCard) {
    lines.push(getProjectName(), "");
    appendPlainProjectMeta(lines);
    appendPlainNotes(lines, PROJECT_TARGET_ID, fields);
  }
  if (!storylines.length) {
    if (!lines.length) lines.push("Connect cards to build story.");
    return lines.join("\n");
  }
  storylines.forEach((group, index) => {
    if (storylines.length > 1 && fields.act) lines.push(getStorylineTitle(group, index), "");
    group.cards.forEach((card) => {
      if (fields.header) lines.push(getDisplayCardTitle(card));
      if (fields.location && cardUsesSceneFields(card) && card.fields.slugVisible === true && getSceneSlug(card)) lines.push(getSceneSlug(card));
      if (fields.characters && getCardCharacters(card).length) lines.push(getCardCharacters(card).join(", "));
      if (fields.notes && cardUsesSceneFields(card) && card.fields.notes) lines.push(card.fields.notes);
      if (fields.supporting && card.fields.supporting) lines.push(plainBodyText(card.fields.supporting));
      appendPlainNotes(lines, card.id, fields);
      lines.push("");
    });
  });
  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trimEnd() + "\n";
}

// Appends title-card metadata to plain-text story export.
function appendPlainProjectMeta(lines) {
  const titleCard = getTitleCard();
  if (!titleCard) return;
  ["author", "date", "tagline"].forEach((field) => {
    const value = String(titleCard.fields[field] || "").trim();
    if (value) lines.push(value);
  });
  if (lines[lines.length - 1]) lines.push("");
}

// Supports append plain notes.
function appendPlainNotes(lines, targetId, fields) {
  if (!fields.noteCards) return;
  const titleCard = getTitleCard();
  const targetIds = targetId === PROJECT_TARGET_ID && titleCard
    ? new Set([PROJECT_TARGET_ID, titleCard.id])
    : new Set([targetId]);
  const notes = card_state.lines
    .filter((line) => targetIds.has(line.targetId))
    .map((line) => findCard(line.sourceId))
    .filter((card) => isNoteCard(card))
    .sort((a, b) => a.creationIndex - b.creationIndex);
  notes.forEach((note) => {
    if (fields.header) lines.push(getDisplayCardTitle(note));
    if (fields.supporting && note.fields.supporting) lines.push(plainBodyText(note.fields.supporting));
    appendPlainNotes(lines, note.id, fields);
    lines.push("");
  });
}

// Supports pop out text pane.
function popOutTextPane() {
  if (window.location.protocol === "file:") {
    showNotice("Use the local server to pop out story");
    return;
  }
  if (isMobileMode()) return;
  if (card_state.textPopoutWindow && !card_state.textPopoutWindow.closed) {
    card_state.textPopoutWindow.focus();
    return;
  }
  const popupUrl = createTextPopoutUrl();
  const popup = window.open(popupUrl, "story_popout", "width=680,height=760");
  if (!popup) {
    URL.revokeObjectURL(popupUrl);
    showNotice("Pop-out blocked");
    return;
  }
  revokeTextPopoutUrl();
  card_state.textPopoutUrl = popupUrl;
  card_state.textPopoutWindow = popup;
  card_state.prePopoutGridTemplate = dom.windowMain.style.gridTemplateColumns;
  dom.windowMain.classList.add("is-text-popped");
  dom.windowMain.style.gridTemplateColumns = "1fr";
  updateMenuState();
  clearInterval(card_state.textPopoutWatch);
  card_state.textPopoutWatch = window.setInterval(() => {
    if (!card_state.textPopoutWindow || card_state.textPopoutWindow.closed) {
      popInTextPane(false);
    }
  }, 600);
}

// Supports pop in text pane.
function popInTextPane(closeWindow) {
  if (closeWindow && card_state.textPopoutWindow && !card_state.textPopoutWindow.closed) {
    card_state.textPopoutWindow.close();
  }
  clearInterval(card_state.textPopoutWatch);
  card_state.textPopoutWatch = null;
  card_state.textPopoutWindow = null;
  revokeTextPopoutUrl();
  dom.windowMain.classList.remove("is-text-popped");
  dom.windowMain.style.gridTemplateColumns = card_state.prePopoutGridTemplate || "";
  card_state.prePopoutGridTemplate = "";
  updateMenuState();
}

// Supports refresh text popout.
function refreshTextPopout() {
  const popup = card_state.textPopoutWindow;
  if (!popup || popup.closed) return;
  const previousUrl = card_state.textPopoutUrl;
  const nextUrl = createTextPopoutUrl();
  card_state.textPopoutUrl = nextUrl;
  popup.location.replace(nextUrl);
  if (previousUrl) window.setTimeout(() => URL.revokeObjectURL(previousUrl), 1000);
}

// Creates a same-origin Blob URL for the current story pop-out document.
function createTextPopoutUrl() {
  const html = buildStoryDocumentHtml(getStoryBodyHtml(buildStorylines()), true);
  return URL.createObjectURL(new Blob([html], { type: "text/html" }));
}

// Revokes the current story pop-out Blob URL.
function revokeTextPopoutUrl() {
  if (!card_state.textPopoutUrl) return;
  URL.revokeObjectURL(card_state.textPopoutUrl);
  card_state.textPopoutUrl = "";
}

// Builds the standalone story HTML export document.
function buildStoryDocumentHtml(bodyHtml, includePopInButton) {
  const documentTitle = escapeHtml(getProjectName());
  const headerButton = includePopInButton
    ? `<button class="popin-button" type="button" title="Pop in story" aria-label="Pop in story" onclick="window.opener && window.opener.cardPopInText()">${materialIcon("keyboard_return")}</button>`
    : "";
  const fields = getActiveStoryFields();
  const assets = includePopInButton ? `
    <div class="popup-assets">
      <button class="assets-button" type="button" title="Filter assets" aria-label="Filter assets" onclick="document.body.classList.toggle('show-assets')">
        ${materialIcon("filter_list")}
      </button>
      <div class="popup-assets-panel">
        ${Object.entries({
          header: "Title",
          act: "ACT",
          location: "Location",
          characters: "Characters",
          notes: "Notes",
          noteCards: "Note Cards",
          media: "Media",
          supporting: "Body",
          titleCard: "Title Card"
        }).map(([field, label]) => `<label><input name="popup_${field}" type="checkbox" ${fields[field] ? "checked" : ""} onchange="window.opener && window.opener.cardSetStoryField('${field}', this.checked)"> ${label}</label>`).join("")}
      </div>
    </div>
  ` : "";
  const header = includePopInButton ? `
    <header class="export-header">
      ${assets}
      ${headerButton}
    </header>
  ` : "";
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${documentTitle}</title>
  ${includePopInButton ? '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,400,0,0">' : ""}
  <style>
    body{margin:0;background:#fbfcfd;color:#1f2a33;font:12pt/1.2 "Courier New",Courier,monospace;}
    .material-symbols-outlined{font-family:"Material Symbols Outlined";font-weight:400;font-style:normal;font-size:22px;line-height:1;letter-spacing:0;text-transform:none;display:inline-flex;white-space:nowrap;word-wrap:normal;direction:ltr;font-feature-settings:"liga";-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased;font-variation-settings:"FILL" 0,"wght" 400,"GRAD" 0,"opsz" 24;}
    .export-header{height:45px;display:flex;align-items:center;justify-content:space-between;padding:0 14px;border-bottom:1px solid #cfd8df;background:#f9fbfc;}
    .popup-assets{position:relative;}
    .assets-button{width:36px;min-height:36px;display:inline-flex;align-items:center;justify-content:center;border:1px solid #c8d2da;border-radius:6px;background:#fff;color:#25313a;cursor:pointer;box-shadow:0 1px 2px rgba(24,36,47,.14);}
    .assets-button .material-symbols-outlined{font-size:22px;}
    .popup-assets-panel{position:absolute;top:calc(100% + 6px);left:0;z-index:5;display:none;min-width:170px;padding:8px;border:1px solid #ccd5dc;border-radius:8px;background:#fff;box-shadow:0 10px 24px rgba(24,36,47,.18);}
    .show-assets .popup-assets-panel{display:grid;gap:7px;}
    .popup-assets-panel label{display:flex;align-items:center;gap:7px;min-height:26px;}
    main{max-width:820px;margin:0 auto;padding:24px;}
    .popin-button{width:36px;min-height:36px;display:inline-flex;align-items:center;justify-content:center;border:1px solid #c8d2da;border-radius:6px;background:#fff;color:#25313a;cursor:pointer;box-shadow:0 1px 2px rgba(24,36,47,.14);}
    .popin-button .material-symbols-outlined{font-size:22px;}
    .empty-story{margin:28px auto;padding:0;color:#5b6872;text-align:left;}
    .project-title{margin:0 0 18px;color:#1f2a33;font-size:12pt;line-height:1.2;text-align:center;overflow-wrap:anywhere;word-break:break-word;}
    .project-title-media{display:block;width:100%;max-height:320px;margin:0 0 18px;object-fit:cover;}
    .project-meta{margin:-10px 0 14px;color:#34434e;font-size:12pt;line-height:1.2;text-align:center;overflow-wrap:anywhere;word-break:break-word;}
    .storyline{margin:0 0 18px;padding:0 0 18px;border-bottom:1px solid #dde5eb;}
    .storyline:last-child{border-bottom:0;}
    .storyline-title{margin:0 0 12px;color:#13756d;font-size:12pt;font-weight:800;text-transform:uppercase;overflow-wrap:anywhere;word-break:break-word;}
    .story-card{margin:0 0 28px;padding:0;overflow-wrap:anywhere;word-break:break-word;}
    .story-card h2{margin:0 0 6px;font-size:12pt;line-height:1.2;text-align:left;}
    .story-card h3{margin:0 0 10px;color:#53616c;font-size:12pt;line-height:1.2;font-weight:650;text-align:left;}
    .story-card .story-slug{color:#1f2a33;font-weight:800;text-transform:uppercase;}
    .story-card p{margin:10px 0 0;color:#1f2a33;font-size:12pt;font-weight:400;line-height:1.2;text-align:left;}
    .story-card .story-characters{color:#1f2a33;font-size:12pt;font-weight:400;}
    .story-card.is-dialog-card .story-dialog-body{margin-top:0;padding-left:56px;}
    .story-card.is-dialog-card .story-dialog-body strong{display:block;margin:0 0 0 -56px;line-height:1.2;text-align:center;}
    .story-card img{display:block;width:100%;max-height:320px;margin:0 0 28px;object-fit:cover;border-radius:0;border:0;}
    .story-footnotes{margin-top:12px;display:grid;gap:8px;}
    .story-note{padding-left:56px;overflow-wrap:anywhere;word-break:break-word;}
    .story-note h3{margin:0 0 6px;color:#34434e;font-size:12pt;}
    .story-note p{margin:0;line-height:1.2;}
  </style>
</head>
<body>
  ${header}
  <main>
    ${bodyHtml}
  </main>
</body>
</html>`;
}

// Builds the standalone character report export document.
function buildCharacterReportHtml() {
  const rows = card_state.characters.map((name) => {
    const characterCard = findCharacterCardByName(name);
    const scenes = getSceneCardsForCharacter(name);
    return {
      name,
      characterCard,
      scenes,
      count: scenes.length
    };
  }).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

  const body = rows.length
    ? rows.map((row) => `
      <section class="report-card">
        <h2>${escapeHtml(row.name)}</h2>
        ${row.characterCard && exportMediaPath(row.characterCard.mediaPath) ? `<img src="${escapeAttr(exportMediaPath(row.characterCard.mediaPath))}" alt="">` : ""}
        <p>${row.count} scene${row.count === 1 ? "" : "s"}</p>
        ${row.scenes.length ? `<ol>${row.scenes.map((card) => `<li>${escapeHtml(getDisplayCardTitle(card))} - ${escapeHtml(getSceneSlug(card))}</li>`).join("")}</ol>` : "<p>No scene associations.</p>"}
      </section>
    `).join("")
    : '<p class="empty-story">No characters have been created.</p>';
  return buildReportDocumentHtml("Character Report", body);
}

// Builds the standalone scene report export document.
function buildSceneReportHtml(mode) {
  const scenes = getAllSceneCardsInStoryOrder();
  const label = {
    chronological: "Chronological",
    time: "Time",
    location: "Location",
    prefix: "INT./EXT."
  }[mode] || "Chronological";
  const body = mode === "chronological"
    ? renderSceneReportList(scenes)
    : renderGroupedSceneReport(scenes, mode);
  return buildReportDocumentHtml(`Scene Report - ${label}`, body || '<p class="empty-story">No scenes have been created.</p>');
}

// Renders grouped scene report UI markup or state.
function renderGroupedSceneReport(scenes, mode) {
  const groups = new Map();
  scenes.forEach((card) => {
    const key = getSceneReportGroupKey(card, mode);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(card);
  });
  return [...groups.entries()]
    .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]))
    .map(([key, cards]) => `
      <section class="report-group">
        <h2>${escapeHtml(key)}</h2>
        ${renderSceneReportList(cards)}
      </section>
    `).join("");
}

// Renders scene report list UI markup or state.
function renderSceneReportList(scenes) {
  if (!scenes.length) return "";
  return `
    <ol class="scene-report-list">
      ${scenes.map((card) => {
        const characters = getStoredCardCharacters(card);
        return `<li>
          <strong>${escapeHtml(getDisplayCardTitle(card))}</strong>
          <span>${escapeHtml(getSceneSlug(card))}</span>
          <small>${characters.length ? escapeHtml(characters.join(", ")) : "No characters"}</small>
        </li>`;
      }).join("")}
    </ol>
  `;
}

// Returns scene report group key.
function getSceneReportGroupKey(card, mode) {
  if (mode === "time") return getSceneSlugTime(card);
  if (mode === "location") return normalizeSlugText(card.fields.location || "").trim() || "NO LOCATION";
  if (mode === "prefix") return getSceneSlugPrefix(card);
  return "Chronological";
}

// Builds report document html data or markup.
function buildReportDocumentHtml(title, bodyHtml) {
  const documentTitle = `${getProjectName()} - ${title}`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(documentTitle)}</title>
  <style>
    body{margin:0;background:#fbfcfd;color:#1f2a33;font:12pt/1.2 "Courier New",Courier,monospace;}
    main{max-width:860px;margin:0 auto;padding:24px;}
    h1{margin:0 0 18px;text-align:center;font-size:12pt;line-height:1.2;}
    h2{margin:0 0 10px;font-size:12pt;line-height:1.2;}
    p{margin:8px 0;line-height:1.2;}
    img{display:block;width:100%;max-height:300px;object-fit:cover;margin:8px 0 12px;border:1px solid #d9e2e8;border-radius:6px;}
    .report-card,.report-group{margin:0 0 16px;padding:14px;border:1px solid #d9e2e8;border-radius:8px;background:#fff;overflow-wrap:anywhere;word-break:break-word;}
    ol{margin:8px 0 0;padding-left:24px;}
    li{margin:0 0 8px;}
    .scene-report-list li{display:grid;gap:3px;}
    .scene-report-list strong{font-weight:700;}
    .scene-report-list span{text-transform:uppercase;}
    .scene-report-list small{font:inherit;color:#53616c;}
    .empty-story{margin:28px auto;padding:18px;border:1px solid #d9e2e8;border-radius:8px;background:#fff;color:#5b6872;text-align:left;}
  </style>
</head>
<body>
  <main>
    <h1>${escapeHtml(documentTitle)}</h1>
    ${bodyHtml}
  </main>
</body>
</html>`;
}

// Returns scene cards for character.
function getSceneCardsForCharacter(name) {
  return getAllSceneCardsInStoryOrder().filter((card) => getStoredCardCharacters(card).includes(name));
}

// Returns all scene cards in story order.
function getAllSceneCardsInStoryOrder() {
  const ordered = [];
  const seen = new Set();
  buildStorylines().forEach((group) => {
    group.cards.filter((card) => isSceneCard(card)).forEach((card) => {
      ordered.push(card);
      seen.add(card.id);
    });
  });
  card_state.cards
    .filter((card) => isSceneCard(card) && !seen.has(card.id))
    .sort(sortCards)
    .forEach((card) => ordered.push(card));
  return ordered;
}

// Supports start pane resize.
function startPaneResize(event) {
  if (isMobileMode()) return;
  event.preventDefault();
  card_state.paneResize = { pointerId: event.pointerId };
  dom.windowMain.classList.add("is-resizing");
  document.addEventListener("pointermove", handlePaneResizeMove);
  document.addEventListener("pointerup", stopPaneResize);
  document.addEventListener("pointercancel", stopPaneResize);
}

// Handles pane resize move events and updates related state.
function handlePaneResizeMove(event) {
  if (!card_state.paneResize || card_state.paneResize.pointerId !== event.pointerId) return;
  applyPaneResize(event.clientX);
}

// Supports stop pane resize.
function stopPaneResize(event) {
  if (card_state.paneResize && card_state.paneResize.pointerId !== event.pointerId) return;
  card_state.paneResize = null;
  dom.windowMain.classList.remove("is-resizing");
  document.removeEventListener("pointermove", handlePaneResizeMove);
  document.removeEventListener("pointerup", stopPaneResize);
  document.removeEventListener("pointercancel", stopPaneResize);
}

// Handles pane resize keydown events and updates related state.
function handlePaneResizeKeydown(event) {
  if (!["ArrowLeft", "ArrowRight", "Home"].includes(event.key)) return;
  event.preventDefault();
  if (event.key === "Home") {
    resetPaneResize();
    return;
  }
  const current = dom.windowCards.getBoundingClientRect().width;
  applyPaneWidth(current + (event.key === "ArrowRight" ? 32 : -32));
}

// Supports reset pane resize.
function resetPaneResize() {
  dom.windowMain.style.gridTemplateColumns = "";
}

// Applies pane resize.
function applyPaneResize(clientX) {
  const rect = dom.windowMain.getBoundingClientRect();
  applyPaneWidth(clientX - rect.left);
}

// Applies pane width.
function applyPaneWidth(width) {
  const rect = dom.windowMain.getBoundingClientRect();
  const minLeft = 320;
  const minRight = 300;
  const divider = dom.paneResizer.getBoundingClientRect().width || 8;
  const nextWidth = clamp(width, minLeft, rect.width - minRight - divider);
  dom.windowMain.style.gridTemplateColumns = `${nextWidth}px ${divider}px minmax(${minRight}px, 1fr)`;
}

// Supports download file.
function downloadFile(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Supports project file base name.
function projectFileBaseName() {
  const cleaned = String(getProjectName())
    .trim()
    .replace(/^Give it a name!$/i, card_defaults.projectName)
    .replace(/[<>:"/\\|?*\u0000-\u001f]+/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned || card_defaults.projectName.toLowerCase();
}

// Returns project name.
function getProjectName() {
  return String(card_state.projectName || "").trim() || card_defaults.projectName;
}

// Normalizes normalized project name.
function normalizedProjectName(name) {
  return String(name || card_defaults.projectName).trim().toLowerCase();
}

// Supports position card element.
function positionCardElement(card) {
  const element = document.getElementById(card.id);
  if (!element) return;
  element.style.left = `${card.x}px`;
  element.style.top = `${card.y}px`;
}

// Captures current card positions for drag rollback.
function captureCardPositions() {
  return card_state.cards.map((card) => ({ id: card.id, x: card.x, y: card.y }));
}

// Returns whether a card type belongs to the main story timeline.
function isTimelineCardType(cardType) {
  return cardType === "scene" || cardType === "dialog";
}

// Returns whether a card belongs to the main story timeline.
function isTimelineCard(card) {
  return Boolean(card) && isTimelineCardType(getCardType(card));
}

// Returns whether a dragged card is allowed to displace neighboring cards.
function cardCanDisplaceCards(card) {
  return isTimelineCard(card);
}

// Lets a timeline card follow the pointer freely until the drop snaps it back to the timeline.
function placeTimelineCardDuringDrag(pointer, card, desiredX, desiredY) {
  restoreDragStartPositions(pointer, new Set([card.id]), false);
  card.x = snap(desiredX);
  card.y = snap(desiredY);
  return [card];
}

// Returns a timeline card to its exact drag-start slot when no reorder was intended.
function restoreTimelineCardToDragStart(pointer, card) {
  const start = pointer.startPositions?.find((position) => position.id === card.id);
  if (!start) return placeCardAndNudge(card, card.x, card.y);
  card.x = start.x;
  card.y = getTimelineTopForSize(getCardSize(card), card.id);
  return [card];
}

// Returns whether the dragged card's midpoint crossed another timeline card midpoint.
function timelineCardOvertookAnother(pointer, card) {
  const start = pointer.startPositions?.find((position) => position.id === card.id);
  if (!start) return true;
  const size = getCardSize(card);
  const startCenterX = start.x + start.size.width / 2;
  const currentCenterX = card.x + size.width / 2;
  const direction = Math.sign(currentCenterX - startCenterX);
  if (!direction) return false;
  return (pointer.allStartPositions || []).some((position) => {
    if (position.id === card.id) return false;
    const other = findCard(position.id);
    if (!cardTouchesTimeline(other)) return false;
    const otherCenterX = position.x + getCardSize(other).width / 2;
    return direction > 0
      ? startCenterX < otherCenterX && currentCenterX >= otherCenterX
      : startCenterX > otherCenterX && currentCenterX <= otherCenterX;
  });
}

// Returns whether a dropped timeline card is trying to occupy another timeline card's space.
function timelineCardConflictsWithAnother(card) {
  return getTimelineStoryCards().some((other) => (
    other.id !== card.id && cardsOverlapWithGap(card, other)
  ));
}

// Rebuilds drag-time nudges from the drag-start layout so displaced cards do not drift.
function placeCardAndNudgeFromDragStart(pointer, card, desiredX, desiredY) {
  restoreDragStartPositions(pointer, new Set([card.id]), false);
  return placeCardAndNudge(card, desiredX, desiredY);
}

// Places a card without moving any other cards.
function placeCardWithoutNudge(card, desiredX, desiredY) {
  if (isTimelineCard(card)) return placeCardOffTimeline(card, desiredX, desiredY);
  const desired = keepNonTimelineCardOffTimeline(card, snap(desiredX), snap(desiredY));
  const position = findNonOverlappingPosition(card, desired.x, desired.y);
  card.x = position.x;
  card.y = position.y;
  return [card];
}

// Places a scene or dialog card away from the timeline without connecting it to story order.
function placeCardOffTimeline(card, desiredX, desiredY) {
  card.x = snap(desiredX);
  card.y = snap(desiredY);
  return [card];
}

// Prevents title, note, and character cards from occupying the timeline lane on drop.
function keepNonTimelineCardOffTimeline(card, desiredX, desiredY) {
  if (isTimelineCard(card)) return { x: desiredX, y: desiredY };
  const size = getCardSize(card);
  const grid = card_state.preferences.gridSize || card_defaults.gridSize;
  const timelineY = getTimelineY();
  if (timelineY < desiredY || timelineY > desiredY + size.height) return { x: desiredX, y: desiredY };
  const centerY = desiredY + size.height / 2;
  return {
    x: desiredX,
    y: snap(centerY < timelineY ? timelineY - size.height - grid : timelineY + grid)
  };
}

// Restores drag-displaced cards to their original positions, optionally finding nearby open space.
function restoreDragStartPositions(pointer, keepIds = new Set(), avoidOverlap = false) {
  const restored = [];
  (pointer?.allStartPositions || []).forEach((position) => {
    if (keepIds.has(position.id)) return;
    const card = findCard(position.id);
    if (!card) return;
    let next = { x: position.x, y: position.y };
    if (avoidOverlap) next = findNonOverlappingPosition(card, position.x, position.y);
    card.x = next.x;
    card.y = next.y;
    restored.push(card);
    positionCardElement(card);
  });
  return restored;
}

// Places a dragged card at the requested position and nudges overlaps along the configured card axis.
function placeCardAndNudge(card, desiredX, desiredY) {
  card.x = snap(desiredX);
  card.y = isTimelineCard(card) ? getTimelineTopForSize(getCardSize(card), card.id) : snap(desiredY);
  const moved = new Map([[card.id, card]]);
  nudgeOverlappingCardsFrom(card.id).forEach((item) => moved.set(item.id, item));
  return [...moved.values()];
}

// Pushes overlapping timeline cards away from an anchor along the horizontal timeline.
function nudgeOverlappingCardsFrom(anchorId) {
  const moved = [];
  const queue = [anchorId];
  const maxIterations = Math.max(8, card_state.cards.length * 4);
  let iterations = 0;

  while (queue.length && iterations < maxIterations) {
    iterations += 1;
    const anchor = findCard(queue.shift());
    if (!cardCanDisplaceCards(anchor)) continue;
    card_state.cards.forEach((other) => {
      if (other.id === anchor.id) return;
      if (!cardTouchesTimeline(other)) return;
      if (!cardsOverlapWithGap(anchor, other)) return;
      const next = getAxisNudgePosition(anchor, other, "x");
      if (next.x === other.x && next.y === other.y) return;
      other.x = next.x;
      other.y = getTimelineTopForSize(getCardSize(other), other.id);
      moved.push(other);
      queue.push(other.id);
    });
  }

  return moved;
}

// Returns the story timeline y coordinate in world space.
function getTimelineY(excludeId = "") {
  if (card_state.pointer?.type === "drag-card" && Number.isFinite(card_state.pointer.timelineY)) {
    return card_state.pointer.timelineY;
  }
  const titleCard = getTitleCard();
  const grid = card_state.preferences.gridSize || card_defaults.gridSize;
  const top = titleCard
    ? titleCard.y + card_sizes.expanded.height + grid
    : screenToWorld(dom.canvasViewport.getBoundingClientRect().left + 120, dom.canvasViewport.getBoundingClientRect().top + 160).y;
  return snap(top + card_sizes.expanded.height / 2);
}

// Returns the top coordinate needed to center a card on the timeline.
function getTimelineTopForSize(size = card_sizes.expanded, excludeId = "") {
  return snap(getTimelineY(excludeId) - size.height / 2);
}

// Returns the visual timeline endpoints in world space.
function getTimelineVisual() {
  return {
    startX: -100000,
    endX: 100000,
    y: getTimelineY()
  };
}

// Returns the timeline's visible start x coordinate.
function getTimelineStartX() {
  const titleCard = getTitleCard();
  const firstTimelineCard = getTimelineStoryCards().sort((a, b) => a.x - b.x || a.creationIndex - b.creationIndex)[0];
  const grid = card_state.preferences.gridSize || card_defaults.gridSize;
  return snap((titleCard?.x ?? firstTimelineCard?.x ?? 0) - grid * 2);
}

// Finds an open placement on the horizontal timeline.
function findOpenTimelinePosition(card, desiredX, forcedSize = card_sizes.expanded) {
  const base = {
    x: snap(desiredX),
    y: getTimelineTopForSize(forcedSize, card?.id)
  };
  if (!positionOverlaps(card?.id, base.x, base.y, forcedSize)) return base;
  const grid = card_state.preferences.gridSize || card_defaults.gridSize;
  const maxRadius = Math.max(8, card_state.cards.length + 4);
  for (let radius = 1; radius <= maxRadius; radius += 1) {
    const right = { x: base.x + radius * grid, y: base.y };
    if (!positionOverlaps(card?.id, right.x, right.y, forcedSize)) return right;
    const left = { x: base.x - radius * grid, y: base.y };
    if (!positionOverlaps(card?.id, left.x, left.y, forcedSize)) return left;
  }
  return { x: base.x + (maxRadius + 1) * grid, y: base.y };
}

// Returns story cards ordered by their timeline position.
function getTimelineStoryCards() {
  return card_state.cards
    .filter(cardTouchesTimeline)
    .sort((a, b) => a.x - b.x || a.creationIndex - b.creationIndex);
}

// Aligns all on-timeline cards tightly from left to right without touching off-timeline cards.
function alignTimelineCards() {
  const cards = getTimelineStoryCards();
  if (!cards.length) return;
  recordHistory();
  const grid = card_state.preferences.gridSize || card_defaults.gridSize;
  let x = cards[0].x;
  cards.forEach((card, index) => {
    if (index > 0) {
      const previous = cards[index - 1];
      x = previous.x + getCardSize(previous).width + grid;
    }
    card.x = snap(x);
    card.y = getTimelineTopForSize(getCardSize(card), card.id);
  });
  markDirty();
  renderAll();
}

// Returns whether an eligible story card is physically touching the timeline.
function cardTouchesTimeline(card) {
  if (!isTimelineCard(card)) return false;
  const size = getCardSize(card);
  const timelineY = getTimelineY(card.id);
  return timelineY >= card.y && timelineY <= card.y + size.height;
}

// Returns the next position for an overlapped card using only the active story axis.
function getAxisNudgePosition(anchor, other, axis = getNewCardAxis()) {
  const grid = card_state.preferences.gridSize || card_defaults.gridSize;
  const anchorSize = getCardSize(anchor);
  const otherSize = getCardSize(other);
  const anchorCenter = getCardCenter(anchor);
  const otherCenter = getCardCenter(other);

  if (axis === "y") {
    const direction = otherCenter.y >= anchorCenter.y ? 1 : -1;
    return {
      x: other.x,
      y: direction > 0
        ? snap(anchor.y + anchorSize.height + grid)
        : snap(anchor.y - otherSize.height - grid)
    };
  }

  const direction = otherCenter.x >= anchorCenter.x ? 1 : -1;
  return {
    x: direction > 0
      ? snap(anchor.x + anchorSize.width + grid)
      : snap(anchor.x - otherSize.width - grid),
    y: other.y
  };
}

// Returns whether two live cards overlap with the configured safety gap.
function cardsOverlapWithGap(a, b) {
  const gap = card_state.preferences.gridSize || card_defaults.gridSize;
  return rectsOverlapWithGap({
    x: a.x,
    y: a.y,
    width: getCardSize(a).width,
    height: getCardSize(a).height
  }, {
    x: b.x,
    y: b.y,
    width: getCardSize(b).width,
    height: getCardSize(b).height
  }, gap);
}

// Supports find non overlapping position.
function findNonOverlappingPosition(card, desiredX, desiredY, forcedSize) {
  const base = {
    x: snap(desiredX),
    y: snap(desiredY)
  };
  const grid = card_state.preferences.gridSize || card_defaults.gridSize;
  const size = forcedSize || getCardSize(card);
  if (!positionOverlaps(card?.id, base.x, base.y, size)) return base;

  const maxRadius = Math.max(8, card_state.cards.length + 4);
  for (let radius = 1; radius <= maxRadius; radius += 1) {
    const candidates = [];
    for (let dx = -radius; dx <= radius; dx += 1) {
      candidates.push({ x: base.x + dx * grid, y: base.y - radius * grid });
      candidates.push({ x: base.x + dx * grid, y: base.y + radius * grid });
    }
    for (let dy = -radius + 1; dy <= radius - 1; dy += 1) {
      candidates.push({ x: base.x - radius * grid, y: base.y + dy * grid });
      candidates.push({ x: base.x + radius * grid, y: base.y + dy * grid });
    }
    candidates.sort((a, b) => distance(a, base) - distance(b, base));
    const open = candidates.find((candidate) => !positionOverlaps(card?.id, candidate.x, candidate.y, size));
    if (open) return open;
  }

  return {
    x: base.x,
    y: base.y + (maxRadius + 1) * grid
  };
}

// Supports resolve overlaps after expansion.
function resolveOverlapsAfterExpansion(anchorId) {
  const anchor = findCard(anchorId);
  if (!anchor) return;
  const orderedCards = card_state.cards
    .filter((card) => card.id !== anchorId)
    .sort((a, b) => distance(getCardCenter(a), getCardCenter(anchor)) - distance(getCardCenter(b), getCardCenter(anchor))
      || a.creationIndex - b.creationIndex);
  const maxPasses = Math.max(2, card_state.cards.length + 1);

  for (let pass = 0; pass < maxPasses; pass += 1) {
    let moved = false;
    orderedCards.forEach((card) => {
      if (!positionOverlaps(card.id, card.x, card.y, getCardSize(card))) return;
      const position = findNonOverlappingPosition(card, card.x, card.y);
      if (position.x === card.x && position.y === card.y) return;
      card.x = position.x;
      card.y = position.y;
      moved = true;
    });
    if (!moved) return;
  }
}

// Supports position overlaps.
function positionOverlaps(cardId, x, y, size) {
  const gap = card_state.preferences.gridSize || card_defaults.gridSize;
  const rect = { x, y, width: size.width, height: size.height };
  return card_state.cards.some((other) => {
    if (other.id === cardId) return false;
    return rectsOverlapWithGap(rect, {
      x: other.x,
      y: other.y,
      width: getCardSize(other).width,
      height: getCardSize(other).height
    }, gap);
  });
}

// Returns whether a group of selected cards can move to the requested positions.
function canPlaceCardGroup(positions, selectedIds) {
  const ignored = new Set(selectedIds);
  return positions.every((position) => !positionOverlapsIgnoring(position.id, position.x, position.y, position.size, ignored));
}

// Returns whether a card position overlaps any card outside an ignored set.
function positionOverlapsIgnoring(cardId, x, y, size, ignoredIds) {
  const gap = card_state.preferences.gridSize || card_defaults.gridSize;
  const rect = { x, y, width: size.width, height: size.height };
  return card_state.cards.some((other) => {
    if (other.id === cardId || ignoredIds.has(other.id)) return false;
    return rectsOverlapWithGap(rect, {
      x: other.x,
      y: other.y,
      width: getCardSize(other).width,
      height: getCardSize(other).height
    }, gap);
  });
}

// Returns whether two rectangles intersect without requiring the grid safety gap.
function rectsIntersect(a, b) {
  return a.x < b.x + b.width
    && a.x + a.width > b.x
    && a.y < b.y + b.height
    && a.y + a.height > b.y;
}

// Supports rects overlap with gap.
function rectsOverlapWithGap(a, b, gap) {
  return a.x < b.x + b.width + gap
    && a.x + a.width + gap > b.x
    && a.y < b.y + b.height + gap
    && a.y + a.height + gap > b.y;
}

// Supports snap all cards to grid.
function snapAllCardsToGrid() {
  card_state.cards.forEach((card) => {
    const position = findNonOverlappingPosition(card, card.x, card.y);
    card.x = position.x;
    card.y = position.y;
  });
}

// Supports snap.
function snap(value) {
  const grid = card_state.preferences.gridSize || card_defaults.gridSize;
  return Math.round(value / grid) * grid;
}

// Supports screen to world.
function screenToWorld(clientX, clientY) {
  const rect = dom.canvasViewport.getBoundingClientRect();
  return {
    x: (clientX - rect.left - card_state.pan.x) / card_state.zoom,
    y: (clientY - rect.top - card_state.pan.y) / card_state.zoom
  };
}

// Sets zoom.
function setZoom(nextZoom, screenPoint, fixedWorldPoint) {
  const zoom = clamp(nextZoom, 0.35, 2.5);
  const rect = dom.canvasViewport.getBoundingClientRect();
  const world = fixedWorldPoint || screenToWorld(screenPoint.x, screenPoint.y);
  card_state.zoom = zoom;
  card_state.pan.x = screenPoint.x - rect.left - world.x * zoom;
  card_state.pan.y = screenPoint.y - rect.top - world.y * zoom;
  renderCanvasTransform();
}

// Supports zoom canvas by.
function zoomCanvasBy(factor) {
  const rect = dom.canvasViewport.getBoundingClientRect();
  setZoom(card_state.zoom * factor, {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2
  });
}

// Focuses and centers a card, optionally placing focus in the title field.
function focusCard(cardId, options = {}) {
  const card = findCard(cardId);
  if (!card) return;
  card_state.selectedCardId = cardId;
  card_state.raisedCardId = cardId;
  const rect = dom.canvasViewport.getBoundingClientRect();
  const center = getCardCenter(card);
  const zoom = clamp(Math.max(card_state.zoom, 1.15), 0.35, 2.5);
  card_state.zoom = zoom;
  card_state.pan.x = rect.width / 2 - center.x * zoom;
  card_state.pan.y = rect.height / 2 - center.y * zoom;
  renderCanvasTransform();
  renderLines();
  const cardEl = document.getElementById(card.id);
  cardEl?.classList.add("is-selected", "is-raised");
  if (options.focusTitle !== false) {
    cardEl?.querySelector('[data-field="header"]')?.focus();
  }
}

// Returns card size.
function getCardSize(card) {
  if (isCardExpanded(card)) return { ...card_sizes.expanded };
  return { ...card_sizes.compact };
}

// Returns media preview source.
function getMediaPreviewSource(card) {
  if (!cardSupportsMedia(card)) return "";
  return card.localMediaUrl || normalizeMediaPath(card.mediaPath);
}

// Returns card title placeholder.
function getCardTitlePlaceholder(card) {
  return card.titlePlaceholder || makeGeneratedCardTitle(getCardType(card), card.titleIndex || card.creationIndex || 1);
}

// Returns display card title.
function getDisplayCardTitle(card) {
  return card.fields.header || getCardTitlePlaceholder(card);
}

// Returns persisted title.
function getPersistedTitle(card) {
  return card.fields.header === getCardTitlePlaceholder(card) ? "" : card.fields.header;
}

// Normalizes slug text.
function normalizeSlugText(value) {
  return String(value || "").toUpperCase().replace(/\s+/g, " ").trimStart();
}

// Returns scene slug prefix.
function getSceneSlugPrefix(card) {
  return SLUG_PREFIXES.includes(card?.fields?.slugPrefix) ? card.fields.slugPrefix : SLUG_PREFIXES[0];
}

// Returns scene slug time.
function getSceneSlugTime(card) {
  return SLUG_TIMES.includes(card?.fields?.slugTime) ? card.fields.slugTime : SLUG_TIMES[0];
}

// Returns scene slug.
function getSceneSlug(card) {
  if (!cardUsesSceneFields(card)) return "";
  const location = normalizeSlugText(card.fields.location || "").trim();
  const prefix = getSceneSlugPrefix(card);
  const time = getSceneSlugTime(card);
  return location ? `${prefix} ${location} - ${time}` : `${prefix} - ${time}`;
}

// Returns supporting placeholder.
function getSupportingPlaceholder(card) {
  return card.supportingPlaceholder || randomInspiration();
}

// Returns persisted supporting.
function getPersistedSupporting(card) {
  const value = card.fields.supporting;
  if (!value) return "";
  const defaults = new Set([getSupportingPlaceholder(card), ...card_state.inspirations]);
  return defaults.has(value) ? "" : value;
}

// Supports sanitize loaded supporting.
function sanitizeLoadedSupporting(value) {
  if (!value) return "";
  const defaults = [
    ...card_state.inspirations,
    "It was the best of times, it was the worst of times...",
    "It was a dark and stormy night."
  ];
  return defaults.includes(value) ? "" : value;
}

// Returns card line color.
function getCardLineColor(card) {
  const line = card_state.lines.find((item) => item.id === card.incomingLineId)
    || card_state.lines.find((item) => item.targetId === card.id && !isNoteCard(findCard(item.sourceId)));
  return line ? getLineRenderColor(line) : card_defaults.lineColor;
}

// Returns line render color.
function getLineRenderColor(line) {
  return getOutgoingCardColor(findCard(line?.sourceId));
}

// Returns outgoing card color.
function getOutgoingCardColor(card) {
  const forcedColor = card_type_flags[getCardType(card)]?.arrowColor;
  if (forcedColor) return forcedColor;
  const color = safeHex(card?.color, card_defaults.color).toLowerCase();
  const typeDefault = safeHex(getDefaultCardColorForType(getCardType(card)), card_defaults.color).toLowerCase();
  const globalDefault = safeHex(card_state.preferences.defaultCardColor, card_defaults.color).toLowerCase();
  return color === "#ffffff" || color === typeDefault || color === globalDefault ? "#000000" : color;
}

// Returns contrast text color.
function getContrastTextColor(hex) {
  const color = safeHex(hex, card_defaults.color).slice(1);
  const red = Number.parseInt(color.slice(0, 2), 16) / 255;
  const green = Number.parseInt(color.slice(2, 4), 16) / 255;
  const blue = Number.parseInt(color.slice(4, 6), 16) / 255;
  const linear = [red, green, blue].map((channel) => (
    channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  ));
  const luminance = 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
  return luminance > 0.46 ? "#1f2a33" : "#ffffff";
}

// Supports random inspiration.
function randomInspiration() {
  const choices = card_state.inspirations.length
    ? card_state.inspirations
    : [
      "It was the best of times, it was the worst of times...",
      "It was a dark and stormy night."
    ];
  return choices[Math.floor(Math.random() * choices.length)];
}

// Supports find card.
function findCard(cardId) {
  return card_state.cards.find((card) => card.id === cardId);
}

// Normalizes card type.
function normalizeCardType(type) {
  return Object.prototype.hasOwnProperty.call(card_type_flags, type) ? type : "scene";
}

// Returns card type.
function getCardType(card) {
  return normalizeCardType(card?.type);
}

// Supports card has flag.
function cardHasFlag(card, flag) {
  if (!card) return false;
  return Boolean(card_type_flags[getCardType(card)]?.[flag]);
}

// Returns whether title card.
function isTitleCard(card) {
  return getCardType(card) === TITLE_CARD_TYPE;
}

// Returns whether note card.
function isNoteCard(card) {
  return getCardType(card) === "note";
}

// Returns whether scene card.
function isSceneCard(card) {
  return getCardType(card) === "scene";
}

// Returns whether dialog card.
function isDialogCard(card) {
  return getCardType(card) === "dialog";
}

// Returns whether character card.
function isCharacterCard(card) {
  return getCardType(card) === "character";
}

// Supports card supports media.
function cardSupportsMedia(card) {
  return cardHasFlag(card, "media");
}

// Supports card uses scene fields.
function cardUsesSceneFields(card) {
  return cardHasFlag(card, "sceneFields");
}

// Supports card uses characters.
function cardUsesCharacters(card) {
  return cardHasFlag(card, "characters");
}

// Supports card allows dialogue insert.
function cardAllowsDialogueInsert(card) {
  return cardHasFlag(card, "dialogueInsert");
}

// Supports card can add characters.
function cardCanAddCharacters(card) {
  return cardUsesCharacters(card) && !(isDialogCard(card) && Boolean(card.incomingCardId));
}

// Supports card appears in storyline.
function cardAppearsInStoryline(card) {
  return cardHasFlag(card, "story");
}

// Supports card has single incoming.
function cardHasSingleIncoming(card) {
  return cardHasFlag(card, "singleIncoming");
}

// Supports card has single outgoing.
function cardHasSingleOutgoing(card) {
  return cardHasFlag(card, "singleOutgoing");
}

// Returns default card color for type.
function getDefaultCardColorForType(cardType) {
  const flags = card_type_flags[normalizeCardType(cardType)];
  return flags.defaultColor || safeHex(card_state.preferences.defaultCardColor, card_defaults.color);
}

// Returns naming prefix.
function getNamingPrefix() {
  return normalizeNamingPrefix(card_state.preferences.namingPrefix || card_defaults.namingPrefix);
}

// Returns naming sequence.
function getNamingSequence() {
  return card_state.preferences.namingSequence === "letter" ? "letter" : "number";
}

// Normalizes naming prefix.
function normalizeNamingPrefix(value) {
  return String(value || card_defaults.namingPrefix).trim().slice(0, 25) || card_defaults.namingPrefix;
}

// Supports make generated card title.
function makeGeneratedCardTitle(cardType, index) {
  const normalizedType = normalizeCardType(cardType);
  const prefix = normalizedType === "scene" ? getNamingPrefix() : card_type_flags[normalizedType].defaultPrefix;
  const sequence = normalizedType === "scene" ? formatNamingSequence(index) : String(index).padStart(2, "0");
  return `${prefix} ${sequence}`;
}

// Supports format naming sequence.
function formatNamingSequence(index) {
  const number = Math.max(1, Number(index) || 1);
  return getNamingSequence() === "letter" ? numberToLetters(number) : String(number).padStart(2, "0");
}

// Supports number to letters.
function numberToLetters(index) {
  let value = Math.max(1, Number(index) || 1);
  let output = "";
  while (value > 0) {
    value -= 1;
    output = String.fromCharCode(65 + (value % 26)) + output;
    value = Math.floor(value / 26);
  }
  return output;
}

// Supports letters to number.
function lettersToNumber(value) {
  const text = String(value || "").toUpperCase();
  let number = 0;
  for (const character of text) {
    const code = character.charCodeAt(0);
    if (code < 65 || code > 90) return 0;
    number = number * 26 + code - 64;
  }
  return number;
}

// Returns generated title index.
function getGeneratedTitleIndex(card, cardType) {
  if (Number(card?.titleIndex) > 0) return Number(card.titleIndex);
  const prefix = cardType === "scene" ? getNamingPrefix() : card_type_flags[normalizeCardType(cardType)].defaultPrefix;
  const escapedPrefix = prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = String(card?.titlePlaceholder || "").match(new RegExp(`^${escapedPrefix}\\s+([0-9]+|[A-Z]+)$`, "i"));
  if (!match) return 0;
  return /^[0-9]+$/.test(match[1]) ? Number(match[1]) : lettersToNumber(match[1]);
}

// Normalizes card characters.
function normalizeCardCharacters(value) {
  if (Array.isArray(value)) return [...new Set(value.map((item) => String(item || "").trim()).filter(Boolean))];
  return String(value || "")
    .split(/[,;\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

// Returns stored card characters.
function getStoredCardCharacters(card) {
  return normalizeCardCharacters(card?.fields?.characters);
}

// Returns card characters.
function getCardCharacters(card) {
  if (isDialogCard(card) && card?.incomingCardId) {
    return getCardCharacters(findCard(card.incomingCardId));
  }
  return getStoredCardCharacters(card);
}

// Sets card characters.
function setCardCharacters(card, characters) {
  card.fields.characters = normalizeCardCharacters(characters);
}

// Returns available characters for card.
function getAvailableCharactersForCard(card) {
  return [...card_state.characters];
}

// Closes character pickers.
function closeCharacterPickers() {
  const openCards = card_state.cards.filter((card) => card.showCharacterPicker);
  if (!openCards.length) return;
  openCards.forEach((card) => {
    card.showCharacterPicker = false;
  });
  renderCards();
}

// Adds character to card.
function addCharacterToCard(card, name) {
  const characterName = String(name || "").trim();
  if (!characterName) return;
  if (!getAvailableCharactersForCard(card).includes(characterName)) return;
  const characters = getCardCharacters(card);
  if (characters.includes(characterName)) {
    card.showCharacterPicker = false;
    renderCards();
    return;
  }
  recordHistory();
  characters.push(characterName);
  setCardCharacters(card, characters);
  card.showCharacterPicker = false;
  markDirty();
  renderAll();
}

// Copies characters from the most recent earlier scene card on the timeline that has characters.
function inheritCharactersFromPriorScene(card) {
  if (!cardUsesCharacters(card)) return;
  const source = getMostRecentPriorSceneWithCharacters(card);
  const characters = source ? getStoredCardCharacters(source) : [];
  if (!characters.length) {
    card.showCharacterPicker = false;
    showNotice("No Previous Character Detected");
    renderCards();
    return;
  }
  recordHistory();
  setCardCharacters(card, characters);
  card.showCharacterPicker = false;
  markDirty();
  renderAll();
}

// Finds the most recent prior scene on the timeline with at least one character.
function getMostRecentPriorSceneWithCharacters(card) {
  const timelineCards = getTimelineStoryCards();
  const currentIndex = timelineCards.findIndex((item) => item.id === card?.id);
  const beforeCurrent = currentIndex >= 0
    ? timelineCards.slice(0, currentIndex)
    : timelineCards.filter((item) => item.x < (card?.x ?? Infinity));
  for (let index = beforeCurrent.length - 1; index >= 0; index -= 1) {
    const candidate = beforeCurrent[index];
    if (isSceneCard(candidate) && getStoredCardCharacters(candidate).length) return candidate;
  }
  return null;
}

// Removes character from card.
function removeCharacterFromCard(card, name) {
  const characterName = String(name || "").trim();
  if (!characterName) return;
  const characters = getStoredCardCharacters(card).filter((item) => item !== characterName);
  recordHistory();
  setCardCharacters(card, characters);
  markDirty();
  renderAll();
}

// Supports insert character dialogue name.
function insertCharacterDialogueName(card, name) {
  if (!cardAllowsDialogueInsert(card)) return;
  const characterName = String(name || "").trim();
  if (!characterName) return;
  const textarea = document.querySelector(`#${CSS.escape(card.id)} textarea[data-field="supporting"]`);
  if (!textarea) return;
  recordHistory();
  const insertion = `\n**${characterName}**\n`;
  const start = textarea.selectionStart ?? textarea.value.length;
  const end = textarea.selectionEnd ?? start;
  const nextValue = `${textarea.value.slice(0, start)}${insertion}${textarea.value.slice(end)}`;
  card.fields.supporting = nextValue;
  textarea.value = nextValue;
  textarea.focus();
  textarea.selectionStart = textarea.selectionEnd = start + insertion.length;
  markDirty();
  renderStory();
}

// Opens characters dialog.
function openCharactersDialog() {
  renderCharacterList();
  dom.characterNameInput.value = "";
  card_state.characterEditOriginal = "";
  dom.charactersDialog.showModal();
  requestAnimationFrame(() => dom.characterNameInput.focus());
}

// Renders character list UI markup or state.
function renderCharacterList(selectedName = "") {
  dom.characterList.innerHTML = card_state.characters
    .map((name) => `<option value="${escapeAttr(name)}">${escapeHtml(name)}</option>`)
    .join("");
  const selectedIndex = selectedName ? card_state.characters.indexOf(selectedName) : -1;
  dom.characterList.selectedIndex = selectedIndex;
  card_state.characterEditOriginal = selectedIndex >= 0 ? selectedName : "";
  updateCharacterDialogActions();
}

// Synchronizes character dialog selection UI state from preferences or selection.
function syncCharacterDialogSelection() {
  const nextSelection = dom.characterList.value || "";
  if (card_state.characterEditOriginal && nextSelection !== card_state.characterEditOriginal) {
    if (!commitCharacterNameEdit(nextSelection)) {
      renderCharacterList(card_state.characterEditOriginal);
      dom.characterNameInput.value = card_state.characterEditOriginal;
      return;
    }
  }
  card_state.characterEditOriginal = nextSelection;
  dom.characterNameInput.value = nextSelection;
  updateCharacterDialogActions();
}

// Adds character from dialog.
function addCharacterFromDialog() {
  if (card_state.characterEditOriginal) {
    commitCharacterNameEdit();
    return;
  }
  const name = dom.characterNameInput.value.trim();
  if (!name) return;
  if (characterNameExists(name)) {
    showNotice("Character name already exists");
    return;
  }
  recordHistory();
  card_state.characters.push(name);
  card_state.characters.sort((a, b) => a.localeCompare(b));
  createCharacterCard(name);
  renderCharacterList();
  dom.characterList.selectedIndex = -1;
  dom.characterNameInput.value = "";
  markDirty();
  renderAll();
  requestAnimationFrame(() => dom.characterNameInput.focus());
}

// Copies selected character.
function copySelectedCharacter() {
  if (!commitCharacterNameEdit()) return;
  const selected = dom.characterList.value;
  if (!selected) return;
  const base = `${selected} Copy`;
  let name = base;
  let index = 2;
  while (characterNameExists(name)) {
    name = `${base} ${index}`;
    index += 1;
  }
  recordHistory();
  card_state.characters.push(name);
  card_state.characters.sort((a, b) => a.localeCompare(b));
  createCharacterCard(name);
  renderCharacterList();
  dom.characterList.selectedIndex = -1;
  dom.characterNameInput.value = "";
  markDirty();
  renderAll();
}

// Deletes selected character.
function deleteSelectedCharacter() {
  if (!commitCharacterNameEdit()) return;
  const selected = dom.characterList.value;
  if (!selected) return;
  recordHistory();
  deleteCharacterByName(selected);
  dom.characterNameInput.value = "";
  card_state.characterEditOriginal = "";
  renderCharacterList();
  markDirty();
  renderAll();
}

// Deletes a character from the project, its character card, and all card references.
function deleteCharacterByName(name) {
  const selected = String(name || "").trim();
  if (!selected) return;
  card_state.characters = card_state.characters.filter((item) => item !== selected);
  card_state.cards.forEach((card) => {
    setCardCharacters(card, getStoredCardCharacters(card).filter((item) => item !== selected));
    revokeLocalMediaUrl(isCharacterCard(card) && getCharacterCardName(card) === selected ? card : null);
  });
  card_state.cards = card_state.cards.filter((card) => !(isCharacterCard(card) && getCharacterCardName(card) === selected));
  card_state.lines = card_state.lines.filter((line) => findCard(line.sourceId) && (findCard(line.targetId) || line.targetId === PROJECT_TARGET_ID));
}

// Handles character name keydown events and updates related state.
function handleCharacterNameKeydown(event) {
  if (event.key !== "Enter") return;
  event.preventDefault();
  if (card_state.characterEditOriginal) commitCharacterNameEdit();
  else addCharacterFromDialog();
}

// Supports update character dialog actions.
function updateCharacterDialogActions() {
  if (!dom.deleteCharacter) return;
  dom.deleteCharacter.hidden = !dom.characterList.value;
}

// Commits a pending character rename from the character manager input.
function commitCharacterNameEdit(nextSelection = "") {
  const oldName = card_state.characterEditOriginal;
  if (!oldName) return true;
  const newName = dom.characterNameInput.value.trim();
  if (!newName || characterNameExists(newName, oldName)) {
    if (newName && characterNameExists(newName, oldName)) showNotice("Character name already exists");
    dom.characterNameInput.value = oldName;
    return false;
  }
  if (newName === oldName) {
    renderCharacterList(nextSelection && card_state.characters.includes(nextSelection) ? nextSelection : oldName);
    dom.characterNameInput.value = nextSelection && card_state.characters.includes(nextSelection) ? nextSelection : oldName;
    return true;
  }

  recordHistory();
  card_state.characters = card_state.characters.map((name) => name === oldName ? newName : name).sort((a, b) => a.localeCompare(b));
  card_state.cards.forEach((card) => {
    setCardCharacters(card, getStoredCardCharacters(card).map((name) => name === oldName ? newName : name));
    if (isCharacterCard(card) && getCharacterCardName(card) === oldName) {
      card.characterName = newName;
      if (!card.fields.header || card.fields.header === oldName) card.fields.header = newName;
      card.titlePlaceholder = newName;
    }
  });
  markDirty();
  renderAll();
  const selection = nextSelection && card_state.characters.includes(nextSelection) ? nextSelection : newName;
  renderCharacterList(selection);
  dom.characterNameInput.value = selection;
  return true;
}

// Returns whether a character name already exists, with optional current-name exemption.
function characterNameExists(name, exceptName = "") {
  const key = normalizeCharacterNameKey(name);
  const exceptKey = normalizeCharacterNameKey(exceptName);
  return card_state.characters.some((item) => normalizeCharacterNameKey(item) === key && normalizeCharacterNameKey(item) !== exceptKey);
}

// Normalizes character names for uniqueness checks.
function normalizeCharacterNameKey(name) {
  return String(name || "").trim().toLocaleLowerCase();
}

// Creates character card.
function createCharacterCard(name) {
  if (findCharacterCardByName(name)) return null;
  const position = getCharacterCardPosition();
  return createCardAt(position.x, position.y, {
    type: "character",
    fields: { header: name },
    characterName: name,
    skipHistory: true,
    quiet: true
  });
}

// Supports find character card by name.
function findCharacterCardByName(name) {
  return card_state.cards.find((card) => isCharacterCard(card) && getCharacterCardName(card) === name);
}

// Returns character card name.
function getCharacterCardName(card) {
  return String(card?.characterName || card?.fields?.header || getDisplayCardTitle(card) || "").trim();
}

// Returns character card position.
function getCharacterCardPosition() {
  const grid = card_state.preferences.gridSize || card_defaults.gridSize;
  const storyStart = [...card_state.cards]
    .filter((card) => !isCharacterCard(card))
    .sort((a, b) => a.creationIndex - b.creationIndex)[0];
  const base = storyStart || {
    x: screenToWorld(dom.canvasViewport.getBoundingClientRect().left + 120, dom.canvasViewport.getBoundingClientRect().top + 120).x,
    y: screenToWorld(dom.canvasViewport.getBoundingClientRect().left + 120, dom.canvasViewport.getBoundingClientRect().top + 120).y
  };
  const index = card_state.cards.filter((card) => isCharacterCard(card)).length;
  const xAxis = getNewCardAxis() === "x";
  const leftOfStory = base.x - card_sizes.expanded.width * 2 - grid;
  return findNonOverlappingPosition(null,
    xAxis ? leftOfStory : leftOfStory - index * (card_sizes.expanded.width + grid),
    xAxis ? base.y + index * (card_sizes.expanded.height + grid) : base.y,
    card_sizes.expanded
  );
}

// Supports revoke local media url.
function revokeLocalMediaUrl(card) {
  if (!card?.localMediaUrl) return;
  const url = card.localMediaUrl;
  const shared = card_state.cards.some((item) => item.id !== card.id && item.localMediaUrl === url);
  if (!shared && !historyReferencesLocalMediaUrl(url)) URL.revokeObjectURL(url);
}

// Returns whether an undo or redo snapshot still needs a local media URL.
function historyReferencesLocalMediaUrl(url) {
  return [...card_state.undoStack, ...card_state.redoStack].some((snapshot) => (
    snapshot.cards?.some((card) => card.localMediaUrl === url)
  ));
}

// Normalizes image paths to the app img folder convention.
function normalizeMediaPath(path) {
  const trimmed = String(path || "").trim().replaceAll("\\", "/").replace(/^\.\/+/, "");
  if (!trimmed) return "";
  if (/^(https?:|data:|blob:|file:|\/)/i.test(trimmed)) return trimmed;
  if (trimmed.startsWith("img/")) return trimmed;
  return `img/${trimmed}`;
}

// Exports media path.
function exportMediaPath(path) {
  const normalized = normalizeMediaPath(path);
  if (!normalized) return "";
  if (/^(https?:|data:|blob:|file:|\/)/i.test(normalized)) return normalized;
  return `img/${normalized.split("/").pop()}`;
}

// Supports safe hex.
function safeHex(value, fallback) {
  return /^#[0-9a-f]{6}$/i.test(String(value || "")) ? String(value) : fallback;
}

// Escapes text for safe insertion into HTML.
function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Escapes text for safe insertion into HTML attributes.
function escapeAttr(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}

// Supports format multiline.
function formatMultiline(value) {
  return escapeHtml(value).replace(/\n/g, "<br>");
}

// Supports format body text.
function formatBodyText(value) {
  return formatMultiline(value).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

// Supports plain body text.
function plainBodyText(value) {
  return String(value || "").replace(/\*\*([^*]+)\*\*/g, "$1");
}

// Supports clamp.
function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

// Returns whether interactive target.
function isInteractiveTarget(target) {
  const control = target.closest("button,input,textarea,select,label");
  if (!control) return false;
  if ("disabled" in control && control.disabled) return false;
  return true;
}

// Supports distance.
function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

// Supports midpoint of.
function midpointOf(a, b) {
  return {
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2
  };
}

// Supports next number from ids.
function nextNumberFromIds(items, regex) {
  const max = items.reduce((value, item) => {
    const match = String(item.id).match(regex);
    return match ? Math.max(value, Number(match[1])) : value;
  }, 0);
  return max + 1;
}

// Shows a temporary toast notification over the card canvas.
function showNotice(message) {
  let notice = document.querySelector(".app-toast");
  if (!notice) {
    notice = document.createElement("div");
    notice.className = "app-toast";
    notice.setAttribute("role", "status");
  }
  const host = dom.canvasViewport || document.body;
  if (notice.parentElement !== host) host.append(notice);
  notice.textContent = message;
  notice.classList.add("is-visible");
  window.clearTimeout(showNotice.timeout);
  showNotice.timeout = window.setTimeout(() => {
    notice.classList.remove("is-visible");
  }, 1800);
}

# JavaScript Function Inventory

The current build of this project is in C:\Users\slime\Documents\Repositories\cardcanvas. This inventory covers top-level named function declarations in the app source, plus a separate section for named functions embedded inside the standalone HTML export script template. Inline arrow callbacks used for event listeners, array mapping, timers, and one-off closures are represented as part of the function that contains them rather than as separate rows.

## Scope Summary

- Top-level app function declarations found: 153
- Embedded export-template function declarations found: 25
- HTML IDs cached through `cacheDom()`: 91
- CSS classes referenced from JavaScript strings/selectors: 120
- Data attributes referenced from JavaScript: 31

## Cached HTML Dependencies

These are the stable HTML nodes loaded into the shared `dom` object. Per-function rows below reference these keys and IDs.

- `dom.windowMain` -> `#window_main`
- `dom.windowCards` -> `#window_cards`
- `dom.windowText` -> `#window_text`
- `dom.paneResizer` -> `#paneResizer`
- `dom.canvasViewport` -> `#canvasViewport`
- `dom.canvasWorld` -> `#canvasWorld`
- `dom.lineLayer` -> `#lineLayer`
- `dom.cardsLayer` -> `#cardsLayer`
- `dom.lassoRect` -> `#lassoRect`
- `dom.storyOutput` -> `#storyOutput`
- `dom.storyCount` -> `#storyCount`
- `dom.cardCount` -> `#cardCount`
- `dom.zoomReadout` -> `#zoomReadout`
- `dom.fileMenuButton` -> `#fileMenuButton`
- `dom.fileMenuPanel` -> `#fileMenuPanel`
- `dom.windowMenuButton` -> `#windowMenuButton`
- `dom.windowMenuPanel` -> `#windowMenuPanel`
- `dom.settingsMenuButton` -> `#settingsMenuButton`
- `dom.settingsMenuPanel` -> `#settingsMenuPanel`
- `dom.prefCardColorButton` -> `#prefCardColorButton`
- `dom.openGridSize` -> `#openGridSize`
- `dom.cardViewToggle` -> `#cardViewToggle`
- `dom.toggleOutputRender` -> `#toggleOutputRender`
- `dom.newProject` -> `#newProject`
- `dom.saveProject` -> `#saveProject`
- `dom.saveAsProject` -> `#saveAsProject`
- `dom.loadProject` -> `#loadProject`
- `dom.exportHtml` -> `#exportHtml`
- `dom.exportText` -> `#exportText`
- `dom.exportPdf` -> `#exportPdf`
- `dom.exportCharacterReport` -> `#exportCharacterReport`
- `dom.projectFileInput` -> `#projectFileInput`
- `dom.projectNameInput` -> `#projectNameInput`
- `dom.mobileStoryProjectTitle` -> `#mobileStoryProjectTitle`
- `dom.mobileTabs` -> `#mobileTabs`
- `dom.mobileCardsTab` -> `#mobileCardsTab`
- `dom.mobileTextTab` -> `#mobileTextTab`
- `dom.mobileAddCard` -> `#mobileAddCard`
- `dom.noteAddCard` -> `#noteAddCard`
- `dom.bulkSelectMode` -> `#bulkSelectMode`
- `dom.editOnOpenToggle` -> `#editOnOpenToggle`
- `dom.undoAction` -> `#undoAction`
- `dom.redoAction` -> `#redoAction`
- `dom.mediaFileInput` -> `#mediaFileInput`
- `dom.prefGridSize` -> `#prefGridSize`
- `dom.gridDialog` -> `#gridDialog`
- `dom.openNamingScheme` -> `#openNamingScheme`
- `dom.namingDialog` -> `#namingDialog`
- `dom.namingPrefixInput` -> `#namingPrefixInput`
- `dom.colorDialog` -> `#colorDialog`
- `dom.centerColorInput` -> `#centerColorInput`
- `dom.applyColor` -> `#applyColor`
- `dom.speechDialog` -> `#speechDialog`
- `dom.speechDialogTitle` -> `#speechDialogTitle`
- `dom.speechExtension` -> `#speechExtension`
- `dom.speechDialogText` -> `#speechDialogText`
- `dom.saveSpeechDialog` -> `#saveSpeechDialog`
- `dom.deleteDialogTitle` -> `#deleteDialogTitle`
- `dom.deleteDialogMessage` -> `#deleteDialogMessage`
- `dom.jumpToStart` -> `#jumpToStart`
- `dom.jumpToEnd` -> `#jumpToEnd`
- `dom.alignTimelineCards` -> `#alignTimelineCards`
- `dom.toggleBranding` -> `#toggleBranding`
- `dom.autoSaveToggle` -> `#autoSaveToggle`
- `dom.assetsMenuButton` -> `#assetsMenuButton`
- `dom.assetsMenuPanel` -> `#assetsMenuPanel`
- `dom.openCharactersDialog` -> `#openCharactersDialog`
- `dom.charactersDialog` -> `#charactersDialog`
- `dom.characterNameInput` -> `#characterNameInput`
- `dom.characterList` -> `#characterList`
- `dom.addCharacter` -> `#addCharacter`
- `dom.copyCharacter` -> `#copyCharacter`
- `dom.deleteCharacter` -> `#deleteCharacter`
- `dom.characterDeleteDialog` -> `#characterDeleteDialog`
- `dom.confirmCharacterDelete` -> `#confirmCharacterDelete`
- `dom.bubbleDeleteDialog` -> `#bubbleDeleteDialog`
- `dom.confirmBubbleDelete` -> `#confirmBubbleDelete`
- `dom.mediaDialog` -> `#mediaDialog`
- `dom.newProjectDialog` -> `#newProjectDialog`
- `dom.discardNewProject` -> `#discardNewProject`
- `dom.saveNewProject` -> `#saveNewProject`
- `dom.deleteMedia` -> `#deleteMedia`
- `dom.replaceMedia` -> `#replaceMedia`
- `dom.deleteDialog` -> `#deleteDialog`
- `dom.confirmDelete` -> `#confirmDelete`
- `dom.zoomIn` -> `#zoomIn`
- `dom.zoomOut` -> `#zoomOut`
- `dom.textPopout` -> `#textPopout`
- `dom.closeStoryRender` -> `#closeStoryRender`
- `dom.windowPopout` -> `#windowPopout`
- `dom.windowPopin` -> `#windowPopin`

## Top-Level App Function Inventory

### materialIcon

- Source: `outputs/app.js:114`
- Purpose: Returns Material Symbols icon markup.
- Parameters: `name`, `extraClass =`
- Variables: `card_state`, `className`, `dom`, `extraClass`, `loadedDefault`, `name`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `bindEvents`, `cacheDom`

### cacheDom

- Source: `outputs/app.js:196`
- Purpose: Caches static DOM nodes used by the app.
- Parameters: None
- Variables: None detected
- HTML dependencies: `#addCharacter`, `#alignTimelineCards`, `#applyColor`, `#assetsMenuButton`, `#assetsMenuPanel`, `#autoSaveToggle`, `#bubbleDeleteDialog`, `#bulkSelectMode`, `#canvasViewport`, `#canvasWorld`, `#cardCount`, `#cardsLayer`, `#cardViewToggle`, `#centerColorInput`, `#characterDeleteDialog`, `#characterList`, `#characterNameInput`, `#charactersDialog`, `#closeStoryRender`, `#colorDialog`, `#confirmBubbleDelete`, `#confirmCharacterDelete`, `#confirmDelete`, `#copyCharacter`, plus 158 more
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: None detected

### bindEvents

- Source: `outputs/app.js:291`
- Purpose: Attaches all UI, pointer, file, and dialog event handlers.
- Parameters: None
- Variables: `checkbox`, `response`, `saved`, `text`
- HTML dependencies: `#canvasViewport`, `#projectNameInput`, `#toggleBranding`, `#toggleOutputRender`, `dom.addCharacter (#addCharacter)`, `dom.alignTimelineCards (#alignTimelineCards)`, `dom.applyColor (#applyColor)`, `dom.assetsMenuButton (#assetsMenuButton)`, `dom.assetsMenuPanel (#assetsMenuPanel)`, `dom.autoSaveToggle (#autoSaveToggle)`, `dom.bulkSelectMode (#bulkSelectMode)`, `dom.canvasViewport (#canvasViewport)`, `dom.canvasWorld (#canvasWorld)`, `dom.cardCount (#cardCount)`, `dom.cardsLayer (#cardsLayer)`, `dom.cardViewToggle (#cardViewToggle)`, `dom.centerColorInput (#centerColorInput)`, `dom.characterList (#characterList)`, `dom.characterNameInput (#characterNameInput)`, `dom.charactersDialog (#charactersDialog)`, `dom.closeStoryRender (#closeStoryRender)`, `dom.colorDialog (#colorDialog)`, `dom.confirmBubbleDelete (#confirmBubbleDelete)`, `dom.confirmCharacterDelete (#confirmCharacterDelete)`, plus 63 more
- CSS dependencies: `?`, `&&`, `body-markup-toolbar`, `body-markup-tools`, `button`, `card-act-select`, `card-bottom`, `card-color-button`, `card-compact-content`, `card-compact-image`, `card-compact-title`, `card-control`, `card-copy-button`, `card-item`, `card-link`, `card-link-spacer`, `card-media-toggle`, `card-save-toggle`, `card-status`, `card-title-input`, `card-title-spacer`, `card-top`, `cards`, `character-add-button`, `character-add-spacer`, `character-chip`, `character-chips`, `character-field`, plus 41 more
- Data/action dependencies: `data-action`, `data-auto-save-interval`, `data-block-index`, `data-card-id`, `data-card-type`, `data-character-name`, `data-field`, `data-scene-report`, `data-setting-card-med`, `data-story-field`, `dataset.action`, `dataset.autoSaveInterval`, `dataset.blockIndex`, `dataset.cardId`, `dataset.characterName`, `dataset.field`, `dataset.sceneReport`, `dataset.settingCardMed`, `dataset.targetType`
- Calls: `deletePendingCard`, `openCharactersDialog`, `renderStory`

### findInsertionLineForCard

- Source: `outputs/app.js:2760`
- Purpose: Finds the nearest direct story line that contains a card's center between its endpoints.
- Parameters: `card`
- Variables: `between`, `card`, `cardSize`, `center`, `distanceToLine`, `end`, `grid`, `source`, `sourceSize`, `start`, `target`, `targetSize`, `threshold`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `cardAppearsInStoryline`, `findCard`, `getCardCenter`, `isBetweenCardEdges`, `pointToSegmentDistance`

### isBetweenCardEdges

- Source: `outputs/app.js:2786`
- Purpose: Returns whether a point along one axis sits between the visible edges of two cards.
- Parameters: `value`, `firstStart`, `firstLength`, `secondStart`, `secondLength`, `tolerance`
- Variables: `firstEnd`, `firstLength`, `firstStart`, `lower`, `secondEnd`, `secondLength`, `secondStart`, `tolerance`, `upper`, `value`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: None detected

### pointToSegmentDistance

- Source: `outputs/app.js:2796`
- Purpose: Returns the shortest distance from a point to a line segment.
- Parameters: `point`, `start`, `end`
- Variables: `dx`, `dy`, `end`, `point`, `start`, `t`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `clamp`, `distance`

### deletePendingCard

- Source: `outputs/app.js:2808`
- Purpose: Deletes pending card.
- Parameters: None
- Variables: `card`, `cardId`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `deleteCharacterByName`, `findCard`, `getCharacterCardName`, `isCharacterCard`, `isTitleCard`, `revokeLocalMediaUrl`

### configureDeleteDialogForCard

- Source: `outputs/app.js:2835`
- Purpose: Configures delete dialog copy for card type.
- Parameters: `card`
- Variables: `card`
- HTML dependencies: `dom.deleteDialogMessage (#deleteDialogMessage)`, `dom.deleteDialogTitle (#deleteDialogTitle)`
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `isCharacterCard`

### renderLines

- Source: `outputs/app.js:2847`
- Purpose: Renders lines UI markup or state.
- Parameters: None
- Variables: `color`, `d`, `lineParts`, `markerDefs`, `markerId`, `points`, `source`, `start`, `timeline`
- HTML dependencies: `#timeline_arrow_end`, `#timeline_arrow_start`, `dom.lineLayer (#lineLayer)`
- CSS dependencies: `line-draft`, `line-visible`, `timeline-line`
- Data/action dependencies: `data-line-id`
- Calls: `findCard`, `getCardCenter`, `getLinePoints`, `getLineRenderColor`, `isTimelineConnection`

### isTimelineConnection

- Source: `outputs/app.js:2893`
- Purpose: Returns whether a stored line is superseded by the single visual timeline.
- Parameters: `line`
- Variables: `line`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `findCard`

### lineWouldCross

- Source: `outputs/app.js:2898`
- Purpose: Supports line would cross.
- Parameters: `sourceId`, `targetId`, `lines = card_state.lines`
- Variables: `existingPoints`, `lines`, `nextPoints`, `sourceId`, `targetId`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `getLinePoints`, `isTimelineConnection`, `segmentsIntersect`

### getLinePoints

- Source: `outputs/app.js:2916`
- Purpose: Returns line points.
- Parameters: `sourceId`, `targetId`
- Variables: `source`, `sourceId`, `target`, `targetId`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `findCard`, `getRectEdgePoint`

### getCardCenter

- Source: `outputs/app.js:2927`
- Purpose: Returns card center.
- Parameters: `card`
- Variables: `card`, `size`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: None detected

### getRectEdgePoint

- Source: `outputs/app.js:2936`
- Purpose: Returns rect edge point.
- Parameters: `card`, `towardCard`
- Variables: `card`, `center`, `dx`, `dy`, `scale`, `scaleX`, `scaleY`, `size`, `toward`, `towardCard`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `getCardCenter`

### segmentsIntersect

- Source: `outputs/app.js:2953`
- Purpose: Supports segments intersect.
- Parameters: `a`, `b`, `c`, `d`
- Variables: `a`, `b`, `c`, `d`, `o1`, `o2`, `o3`, `o4`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `onSegment`, `orientation`, `pointsEqual`

### orientation

- Source: `outputs/app.js:2969`
- Purpose: Supports orientation.
- Parameters: `a`, `b`, `c`
- Variables: `a`, `b`, `c`, `value`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: None detected

### onSegment

- Source: `outputs/app.js:2976`
- Purpose: Supports on segment.
- Parameters: `a`, `b`, `c`
- Variables: `a`, `b`, `c`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: None detected

### pointsEqual

- Source: `outputs/app.js:2984`
- Purpose: Supports points equal.
- Parameters: `a`, `b`
- Variables: `a`, `b`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: None detected

### renderStory

- Source: `outputs/app.js:2989`
- Purpose: Renders story UI markup or state.
- Parameters: None
- Variables: `fields`, `run`, `storylines`
- HTML dependencies: `dom.storyCount (#storyCount)`, `dom.storyOutput (#storyOutput)`, `dom.windowText (#window_text)`
- CSS dependencies: `show-page-numbers`
- Data/action dependencies: None detected
- Calls: `cancelStoryPagination`

### cancelStoryPagination

- Source: `outputs/app.js:3019`
- Purpose: Cancels a pending story pagination job.
- Parameters: None
- Variables: `hasTitlePage`, `nodes`, `page`, `pages`
- HTML dependencies: `dom.storyOutput (#storyOutput)`
- CSS dependencies: `is-paginated`, `story-pages`
- Data/action dependencies: None detected
- Calls: `appendStoryNodeToPages`, `collectStoryPaginationNodes`

### collectStoryPaginationNodes

- Source: `outputs/app.js:3054`
- Purpose: Returns story nodes as pagination units, flattening timeline wrappers into cards.
- Parameters: `container`
- Variables: `container`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: None detected

### appendStoryNodeToPages

- Source: `outputs/app.js:3061`
- Purpose: Appends one story node to paginated screenplay pages, splitting dialogue when needed.
- Parameters: `node`, `page`, `pages`, `hasTitlePage`
- Variables: `hasTitlePage`, `node`, `page`, `pages`
- HTML dependencies: None detected
- CSS dependencies: `story-dialog-body`
- Data/action dependencies: None detected
- Calls: `appendDialogStoryCardToPages`, `appendWholeStoryNodeToPages`

### appendWholeStoryNodeToPages

- Source: `outputs/app.js:3069`
- Purpose: Appends an unsplittable story node to pages.
- Parameters: `node`, `page`, `pages`, `hasTitlePage`
- Variables: `hasTitlePage`, `node`, `page`, `pages`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: None detected

### appendDialogStoryCardToPages

- Source: `outputs/app.js:3080`
- Purpose: Appends a story card with dialogue, allowing dialogue units to continue across pages.
- Parameters: `sourceCard`, `page`, `pages`, `hasTitlePage`
- Variables: `card`, `children`, `hasTitlePage`, `page`, `pages`, `sourceCard`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `appendDialogBodyToPages`, `appendStoryCardChildToPages`, `cloneStoryCardShell`, `storyCardHasContent`

### cloneStoryCardShell

- Source: `outputs/app.js:3096`
- Purpose: Creates an empty clone of a story card shell, preserving actions for in-app editing.
- Parameters: `sourceCard`
- Variables: `actions`, `clone`, `sourceCard`
- HTML dependencies: None detected
- CSS dependencies: `story-card-actions`
- Data/action dependencies: None detected
- Calls: None detected

### storyCardHasContent

- Source: `outputs/app.js:3104`
- Purpose: Returns whether a story card shell contains visible output content.
- Parameters: `card`
- Variables: `card`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: None detected

### appendStoryCardChildToPages

- Source: `outputs/app.js:3113`
- Purpose: Appends a non-dialog card child, moving the whole child when it does not fit.
- Parameters: `child`, `sourceCard`, `page`, `pages`, `hasTitlePage`, `card`
- Variables: `card`, `child`, `clone`, `hasTitlePage`, `page`, `pages`, `sourceCard`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `cloneStoryCardShell`, `storyCardHasContent`

### appendDialogBodyToPages

- Source: `outputs/app.js:3128`
- Purpose: Appends mixed direction and dialogue content to pages.
- Parameters: `sourceBody`, `sourceCard`, `page`, `pages`, `hasTitlePage`, `card`
- Variables: `body`, `card`, `hasTitlePage`, `page`, `pages`, `sourceBody`, `sourceCard`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `appendDialogUnitToPages`, `appendDirectionLineToPages`, `ensureDialogBodyForCard`

### ensureDialogBodyForCard

- Source: `outputs/app.js:3142`
- Purpose: Ensures the current card has a dialog-body container.
- Parameters: `card`, `sourceBody`
- Variables: `body`, `card`, `sourceBody`
- HTML dependencies: None detected
- CSS dependencies: `story-dialog-body`
- Data/action dependencies: None detected
- Calls: None detected

### appendDirectionLineToPages

- Source: `outputs/app.js:3152`
- Purpose: Appends a direction/action body line without splitting it.
- Parameters: `child`, `sourceBody`, `sourceCard`, `page`, `pages`, `hasTitlePage`, `card`, `body`
- Variables: `body`, `card`, `child`, `clone`, `hasTitlePage`, `page`, `pages`, `sourceBody`, `sourceCard`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `cloneStoryCardShell`, `ensureDialogBodyForCard`, `storyCardHasContent`

### appendDialogUnitToPages

- Source: `outputs/app.js:3169`
- Purpose: Appends a dialogue unit, splitting at sentence boundaries when it crosses a page.
- Parameters: `unit`, `sourceBody`, `sourceCard`, `page`, `pages`, `hasTitlePage`, `card`, `body`
- Variables: `added`, `body`, `card`, `currentUnit`, `dialogueStarted`, `guard`, `hasTitlePage`, `line`, `page`, `pages`, `remaining`, `sentences`, `sourceBody`, `sourceCard`, `speaker`, `speakerLabel`, `unit`, `whole`
- HTML dependencies: None detected
- CSS dependencies: `dialog-speaker`
- Data/action dependencies: None detected
- Calls: `appendDirectionLineToPages`, `fitMoreCueOnPage`, `moveDialogueToNextPage`, `pageHasVisibleStoryContent`, `splitDialogueIntoSentences`, `storyCardHasContent`

### moveDialogueToNextPage

- Source: `outputs/app.js:3233`
- Purpose: Creates the next page and shell needed to continue dialogue.
- Parameters: `sourceBody`, `sourceCard`, `pages`, `hasTitlePage`
- Variables: `body`, `card`, `hasTitlePage`, `page`, `pages`, `sourceBody`, `sourceCard`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `cloneStoryCardShell`, `ensureDialogBodyForCard`

### pageHasVisibleStoryContent

- Source: `outputs/app.js:3242`
- Purpose: Returns whether a screenplay page already has visible story content.
- Parameters: `page`
- Variables: `page`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `storyCardHasContent`

### fitMoreCueOnPage

- Source: `outputs/app.js:3249`
- Purpose: Adds a MORE cue, rolling back the last sentence when needed so it fits.
- Parameters: `body`, `currentUnit`, `remaining`, `page`
- Variables: `body`, `currentUnit`, `lastLine`, `lines`, `page`, `remaining`
- HTML dependencies: None detected
- CSS dependencies: `dialog-line`
- Data/action dependencies: None detected
- Calls: None detected

### splitDialogueIntoSentences

- Source: `outputs/app.js:3272`
- Purpose: Splits a rendered dialogue unit into sentence-safe chunks.
- Parameters: `unit`
- Variables: `characters`, `main`, `nodes`, `page`, `pages`, `text`, `unit`
- HTML dependencies: `dom.canvasViewport (#canvasViewport)`, `dom.deleteDialog (#deleteDialog)`, `dom.newProjectDialog (#newProjectDialog)`, `dom.paneResizer (#paneResizer)`, `dom.projectFileInput (#projectFileInput)`, `dom.storyOutput (#storyOutput)`, `dom.windowCards (#window_cards)`, `dom.windowMain (#window_main)`
- CSS dependencies: `?`, `assets-button`, `button`, `dialog-line`, `dialog-more`, `dialog-speaker`, `dialog-unit`, `empty-story`, `export-header`, `has-dialog-body`, `is-paginated`, `is-raised`, `is-resizing`, `is-selected`, `is-text-popped`, `is-title-story-card`, `material-symbols-outlined`, `popin-button`, `popup-assets`, `popup-assets-panel`, `project-meta`, `project-title`, `project-title-media`, `report-card`, `report-group`, `scene-report-list`, `screenplay-page`, `screenplay-page-content`, plus 20 more
- Data/action dependencies: `data-card-id`, `data-field`, `data-story-copy`, `data-story-delete`, `data-story-edit`, `data-story-field`, `dataset.cardId`, `dataset.committed`, `dataset.originalHtml`, `dataset.originalValue`, `dataset.pageIndex`, `dataset.storyCopy`, `dataset.storyDelete`, `dataset.storyEdit`, `dataset.storyField`
- Calls: `escapeAttr`, `escapeHtml`, `exportMediaPath`, `getSceneSlug`, `getStoredCardCharacters`

### normalizeSlugTimeValue

- Source: `outputs/app.js:5664`
- Purpose: Sanitizes custom slug time values.
- Parameters: `value`
- Variables: `token`, `value`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: None detected

### normalizeTransitionValue

- Source: `outputs/app.js:5671`
- Purpose: Sanitizes transition values and enforces the final colon.
- Parameters: `value`
- Variables: `token`, `value`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: None detected

### normalizeActValue

- Source: `outputs/app.js:5679`
- Purpose: Sanitizes card ACT selector values.
- Parameters: `value`
- Variables: `value`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: None detected

### promptCustomSelectValue

- Source: `outputs/app.js:5684`
- Purpose: Prompts for a custom select value and returns the sanitized result.
- Parameters: `title`, `currentValue`, `sanitizer`
- Variables: `currentValue`, `raw`, `sanitizer`, `title`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: None detected

### renderActOptions

- Source: `outputs/app.js:5691`
- Purpose: Renders ACT dropdown options.
- Parameters: `currentValue`
- Variables: `current`, `currentValue`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `normalizeActValue`

### renderSlugTimeOptions

- Source: `outputs/app.js:5699`
- Purpose: Renders slug time options, preserving a current custom value.
- Parameters: `card`
- Variables: `card`, `current`, `values`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `getSceneSlugTime`

### renderTransitionOptions

- Source: `outputs/app.js:5710`
- Purpose: Renders transition options, preserving a current custom value.
- Parameters: `card`
- Variables: `card`, `current`, `values`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `getSceneTransition`

### getSceneSlugPrefix

- Source: `outputs/app.js:5721`
- Purpose: Returns scene slug prefix.
- Parameters: `card`
- Variables: `card`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: None detected

### getSceneSlugTime

- Source: `outputs/app.js:5726`
- Purpose: Returns scene slug time.
- Parameters: `card`
- Variables: `card`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `normalizeSlugTimeValue`

### getSceneTransition

- Source: `outputs/app.js:5731`
- Purpose: Returns scene transition.
- Parameters: `card`
- Variables: `card`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `normalizeTransitionValue`

### getSceneSlug

- Source: `outputs/app.js:5736`
- Purpose: Returns scene slug.
- Parameters: `card`
- Variables: `card`, `location`, `prefix`, `time`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `cardUsesSceneFields`, `getSceneSlugPrefix`, `getSceneSlugTime`

### getSupportingPlaceholder

- Source: `outputs/app.js:5745`
- Purpose: Returns supporting placeholder.
- Parameters: `card`
- Variables: `card`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `randomInspiration`

### getPersistedSupporting

- Source: `outputs/app.js:5750`
- Purpose: Returns persisted supporting.
- Parameters: `card`
- Variables: `card`, `defaults`, `value`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `getSupportingPlaceholder`

### sanitizeLoadedSupporting

- Source: `outputs/app.js:5758`
- Purpose: Supports sanitize loaded supporting.
- Parameters: `value`
- Variables: `defaults`, `value`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: None detected

### getLineRenderColor

- Source: `outputs/app.js:5769`
- Purpose: Returns line render color.
- Parameters: `line`
- Variables: `line`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `findCard`, `getOutgoingCardColor`

### getOutgoingCardColor

- Source: `outputs/app.js:5774`
- Purpose: Returns outgoing card color.
- Parameters: `card`
- Variables: `card`, `color`, `forcedColor`, `globalDefault`, `typeDefault`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `getCardType`, `getDefaultCardColorForType`, `safeHex`

### getContrastTextColor

- Source: `outputs/app.js:5784`
- Purpose: Returns contrast text color.
- Parameters: `hex`
- Variables: `blue`, `color`, `green`, `hex`, `linear`, `luminance`, `red`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `safeHex`

### randomInspiration

- Source: `outputs/app.js:5797`
- Purpose: Supports random inspiration.
- Parameters: None
- Variables: `choices`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: None detected

### findCard

- Source: `outputs/app.js:5808`
- Purpose: Supports find card.
- Parameters: `cardId`
- Variables: `cardId`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: None detected

### normalizeCardType

- Source: `outputs/app.js:5813`
- Purpose: Normalizes card type.
- Parameters: `type`
- Variables: `type`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: None detected

### getCardType

- Source: `outputs/app.js:5818`
- Purpose: Returns card type.
- Parameters: `card`
- Variables: `card`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `normalizeCardType`

### cardHasFlag

- Source: `outputs/app.js:5823`
- Purpose: Supports card has flag.
- Parameters: `card`, `flag`
- Variables: `card`, `flag`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `getCardType`

### isTitleCard

- Source: `outputs/app.js:5829`
- Purpose: Returns whether title card.
- Parameters: `card`
- Variables: `card`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `getCardType`

### isNoteCard

- Source: `outputs/app.js:5834`
- Purpose: Returns whether note card.
- Parameters: `card`
- Variables: `card`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `getCardType`

### isSceneCard

- Source: `outputs/app.js:5839`
- Purpose: Returns whether scene card.
- Parameters: `card`
- Variables: `card`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `getCardType`

### isCharacterCard

- Source: `outputs/app.js:5844`
- Purpose: Returns whether character card.
- Parameters: `card`
- Variables: `card`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `getCardType`

### cardSupportsMedia

- Source: `outputs/app.js:5849`
- Purpose: Supports card supports media.
- Parameters: `card`
- Variables: `card`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `cardHasFlag`

### cardUsesSceneFields

- Source: `outputs/app.js:5854`
- Purpose: Supports card uses scene fields.
- Parameters: `card`
- Variables: `card`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `cardHasFlag`

### cardUsesCharacters

- Source: `outputs/app.js:5859`
- Purpose: Supports card uses characters.
- Parameters: `card`
- Variables: `card`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `cardHasFlag`

### cardUsesAct

- Source: `outputs/app.js:5864`
- Purpose: Returns whether a card exposes the ACT selector.
- Parameters: `card`
- Variables: `card`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `isSceneCard`

### cardAllowsDialogueInsert

- Source: `outputs/app.js:5869`
- Purpose: Supports card allows dialogue insert.
- Parameters: `card`
- Variables: `card`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `cardHasFlag`

### cardCanAddCharacters

- Source: `outputs/app.js:5874`
- Purpose: Supports card can add characters.
- Parameters: `card`
- Variables: `card`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `cardUsesCharacters`

### cardAppearsInStoryline

- Source: `outputs/app.js:5879`
- Purpose: Supports card appears in storyline.
- Parameters: `card`
- Variables: `card`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `cardHasFlag`

### cardHasSingleIncoming

- Source: `outputs/app.js:5884`
- Purpose: Supports card has single incoming.
- Parameters: `card`
- Variables: `card`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `cardHasFlag`

### cardHasSingleOutgoing

- Source: `outputs/app.js:5889`
- Purpose: Supports card has single outgoing.
- Parameters: `card`
- Variables: `card`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `cardHasFlag`

### getDefaultCardColorForType

- Source: `outputs/app.js:5894`
- Purpose: Returns default card color for type.
- Parameters: `cardType`
- Variables: `cardType`, `flags`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `normalizeCardType`, `safeHex`

### getNamingPrefix

- Source: `outputs/app.js:5900`
- Purpose: Returns naming prefix.
- Parameters: None
- Variables: None detected
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `normalizeNamingPrefix`

### getNamingSequence

- Source: `outputs/app.js:5905`
- Purpose: Returns naming sequence.
- Parameters: None
- Variables: None detected
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: None detected

### normalizeNamingPrefix

- Source: `outputs/app.js:5910`
- Purpose: Normalizes naming prefix.
- Parameters: `value`
- Variables: `value`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: None detected

### makeGeneratedCardTitle

- Source: `outputs/app.js:5915`
- Purpose: Supports make generated card title.
- Parameters: `cardType`, `index`
- Variables: `cardType`, `index`, `normalizedType`, `prefix`, `sequence`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `formatNamingSequence`, `getNamingPrefix`, `normalizeCardType`

### formatNamingSequence

- Source: `outputs/app.js:5923`
- Purpose: Supports format naming sequence.
- Parameters: `index`
- Variables: `index`, `number`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `getNamingSequence`, `numberToLetters`

### numberToLetters

- Source: `outputs/app.js:5929`
- Purpose: Supports number to letters.
- Parameters: `index`
- Variables: `index`, `output`, `value`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: None detected

### lettersToNumber

- Source: `outputs/app.js:5941`
- Purpose: Supports letters to number.
- Parameters: `value`
- Variables: `number`, `text`, `value`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: None detected

### getGeneratedTitleIndex

- Source: `outputs/app.js:5953`
- Purpose: Returns generated title index.
- Parameters: `card`, `cardType`
- Variables: `card`, `cardType`, `escapedPrefix`, `match`, `prefix`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `getNamingPrefix`, `lettersToNumber`, `normalizeCardType`

### normalizeCardCharacters

- Source: `outputs/app.js:5963`
- Purpose: Normalizes card characters.
- Parameters: `value`
- Variables: `value`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: None detected

### getStoredCardCharacters

- Source: `outputs/app.js:5972`
- Purpose: Returns stored card characters.
- Parameters: `card`
- Variables: `card`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `normalizeCardCharacters`

### getCardCharacters

- Source: `outputs/app.js:5977`
- Purpose: Returns card characters.
- Parameters: `card`
- Variables: `card`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `getStoredCardCharacters`

### setCardCharacters

- Source: `outputs/app.js:5982`
- Purpose: Sets card characters.
- Parameters: `card`, `characters`
- Variables: `card`, `characters`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `normalizeCardCharacters`

### getAvailableCharactersForCard

- Source: `outputs/app.js:5987`
- Purpose: Returns available characters for card.
- Parameters: `card`
- Variables: `card`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: None detected

### closeCharacterPickers

- Source: `outputs/app.js:5992`
- Purpose: Closes character pickers.
- Parameters: None
- Variables: `openCards`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: None detected

### addCharacterToCard

- Source: `outputs/app.js:6002`
- Purpose: Adds character to card.
- Parameters: `card`, `name`
- Variables: `card`, `characterName`, `characters`, `name`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `getAvailableCharactersForCard`, `getCardCharacters`, `setCardCharacters`

### inheritCharactersFromPriorScene

- Source: `outputs/app.js:6021`
- Purpose: Copies characters from the most recent earlier scene card on the timeline that has characters.
- Parameters: `card`
- Variables: `card`, `characters`, `source`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `cardUsesCharacters`, `getMostRecentPriorSceneWithCharacters`, `getStoredCardCharacters`, `setCardCharacters`, `showNotice`

### getMostRecentPriorSceneWithCharacters

- Source: `outputs/app.js:6039`
- Purpose: Finds the most recent prior scene on the timeline with at least one character.
- Parameters: `card`
- Variables: `beforeCurrent`, `candidate`, `card`, `currentIndex`, `index`, `timelineCards`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `getStoredCardCharacters`, `isSceneCard`

### removeCharacterFromCard

- Source: `outputs/app.js:6053`
- Purpose: Removes character from card.
- Parameters: `card`, `name`
- Variables: `card`, `characterName`, `characters`, `name`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `getStoredCardCharacters`, `setCardCharacters`

### hasDialogBlocks

- Source: `outputs/app.js:6064`
- Purpose: Returns whether body text contains dialog blocks.
- Parameters: `value`, `card`
- Variables: `card`, `value`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `parseSupportingBlocks`

### parseSupportingBlocks

- Source: `outputs/app.js:6069`
- Purpose: Parses card body text into plain text and dialog blocks.
- Parameters: `value`, `card`
- Variables: `blocks`, `card`, `text`, `value`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `normalizeSupportingBlocks`, `parseLegacyDialogBlocks`, `parseStructuredDialogBlocks`

### getSupportingEditorBlocks

- Source: `outputs/app.js:6078`
- Purpose: Adds editable text slots around dialog blocks for the mixed scene/dialog card editor.
- Parameters: `value`, `card`
- Variables: `blocks`, `card`, `editorBlocks`, `next`, `value`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `parseSupportingBlocks`

### parseStructuredDialogBlocks

- Source: `outputs/app.js:6101`
- Purpose: Parses the current structured dialog block format.
- Parameters: `text`
- Variables: `blocks`, `bodyStart`, `close`, `cursor`, `dialogText`, `extension`, `marker`, `markerParts`, `speaker`, `speakerEnd`, `start`, `text`, `textBlock`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `sanitizeDialogExtension`, `sanitizeDialogSpeaker`

### parseLegacyDialogBlocks

- Source: `outputs/app.js:6140`
- Purpose: Parses older body text where a line containing **Character** begins dialog.
- Parameters: `text`, `card`
- Variables: `blocks`, `card`, `characterNames`, `dialogBlock`, `flushDialog`, `flushText`, `isSpeaker`, `lines`, `speaker`, `speakerMatch`, `text`, `textLines`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `getCardCharacters`, `sanitizeDialogSpeaker`

### normalizeSupportingBlocks

- Source: `outputs/app.js:6179`
- Purpose: Normalizes adjacent body text blocks and removes unusable dialog speakers.
- Parameters: `blocks`
- Variables: `blocks`, `normalized`, `speaker`, `text`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `sanitizeDialogExtension`, `sanitizeDialogSpeaker`

### serializeSupportingBlocks

- Source: `outputs/app.js:6205`
- Purpose: Serializes body text and dialog blocks for saving in the card body field.
- Parameters: `blocks`
- Variables: `blocks`, `extension`, `marker`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `normalizeSupportingBlocks`, `sanitizeDialogExtension`

### sanitizeDialogSpeaker

- Source: `outputs/app.js:6218`
- Purpose: Removes marker-breaking characters from dialog speaker names.
- Parameters: `name`
- Variables: `name`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: None detected

### sanitizeDialogExtension

- Source: `outputs/app.js:6223`
- Purpose: Returns supported dialog extension text.
- Parameters: `value`
- Variables: `extension`, `value`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: None detected

### getDisplayDialogSpeaker

- Source: `outputs/app.js:6229`
- Purpose: Returns the rendered speaker label without changing the stored character name.
- Parameters: `name`, `extension =`
- Variables: `cleanExtension`, `extension`, `name`, `speaker`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `sanitizeDialogExtension`, `sanitizeDialogSpeaker`

### updateSupportingBlockFromInput

- Source: `outputs/app.js:6236`
- Purpose: Updates one parsed body block from a custom editor input.
- Parameters: `card`, `input`
- Variables: `blocks`, `card`, `index`, `input`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: `dataset.blockIndex`
- Calls: `getSupportingEditorBlocks`, `isActiveSupportingInsert`, `serializeSupportingBlocks`

### isActiveSupportingInsert

- Source: `outputs/app.js:6248`
- Purpose: Returns whether a body insertion slot is currently active.
- Parameters: `cardId`, `index`
- Variables: `cardId`, `index`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: None detected

### activateBodyInsert

- Source: `outputs/app.js:6254`
- Purpose: Activates a body insertion slot and focuses its new text input.
- Parameters: `card`, `indexValue`
- Variables: `card`, `index`, `indexValue`, `input`
- HTML dependencies: None detected
- CSS dependencies: `dialog-scene-text`
- Data/action dependencies: `data-block-index`
- Calls: None detected

### getActiveSupportingInsertIndex

- Source: `outputs/app.js:6267`
- Purpose: Returns the active insertion index for a card, or null when none is active.
- Parameters: `card`, `blocks`
- Variables: `active`, `blocks`, `card`, `index`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: None detected

### openSpeechDialog

- Source: `outputs/app.js:6275`
- Purpose: Opens the speech editor dialog for a rendered speech bubble.
- Parameters: `card`, `indexValue`
- Variables: `block`, `blocks`, `card`, `index`, `indexValue`
- HTML dependencies: `dom.speechDialog (#speechDialog)`, `dom.speechDialogText (#speechDialogText)`, `dom.speechDialogTitle (#speechDialogTitle)`, `dom.speechExtension (#speechExtension)`
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `getDisplayDialogSpeaker`, `getSupportingEditorBlocks`, `sanitizeDialogExtension`

### saveSpeechDialog

- Source: `outputs/app.js:6290`
- Purpose: Saves speech text from the popup dialog back to the card body blocks.
- Parameters: `event`
- Variables: `block`, `blocks`, `card`, `event`, `target`
- HTML dependencies: `dom.speechDialog (#speechDialog)`, `dom.speechDialogText (#speechDialogText)`, `dom.speechExtension (#speechExtension)`
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `findCard`, `getSupportingEditorBlocks`, `sanitizeDialogExtension`, `serializeSupportingBlocks`

### handleSpeechDialogKeydown

- Source: `outputs/app.js:6309`
- Purpose: Saves the speech dialog when Enter is pressed, while Shift+Enter keeps multiline entry.
- Parameters: `event`
- Variables: `event`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `saveSpeechDialog`

### requestSpeechBubbleDelete

- Source: `outputs/app.js:6316`
- Purpose: Opens confirmation before removing a speech bubble.
- Parameters: `card`, `indexValue`
- Variables: `blocks`, `card`, `index`, `indexValue`
- HTML dependencies: `dom.bubbleDeleteDialog (#bubbleDeleteDialog)`
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `getSupportingEditorBlocks`

### confirmBubbleDelete

- Source: `outputs/app.js:6326`
- Purpose: Confirms deletion of one speech bubble.
- Parameters: `event`
- Variables: `card`, `event`, `pending`
- HTML dependencies: `dom.bubbleDeleteDialog (#bubbleDeleteDialog)`
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `deleteSpeechBubble`, `findCard`

### deleteSpeechBubble

- Source: `outputs/app.js:6337`
- Purpose: Removes one speech bubble from the card body block list.
- Parameters: `card`, `indexValue`
- Variables: `blocks`, `card`, `index`, `indexValue`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `getSupportingEditorBlocks`, `serializeSupportingBlocks`

### getDialogSpeakerMeta

- Source: `outputs/app.js:6351`
- Purpose: Returns consistent side and color assignment for a speaker in one card body.
- Parameters: `blocks`, `speaker`
- Variables: `blocks`, `index`, `speaker`, `speakers`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: None detected

### getCardBodyTextarea

- Source: `outputs/app.js:6365`
- Purpose: Returns the body textarea for a specific card if it is currently rendered.
- Parameters: `cardId`
- Variables: `cardId`, `cardSelector`, `focused`
- HTML dependencies: None detected
- CSS dependencies: `dialog-scene-text`
- Data/action dependencies: `data-field`
- Calls: None detected

### applyBodyMarkup

- Source: `outputs/app.js:6374`
- Purpose: Applies lightweight markup around the selected body text.
- Parameters: `card`, `type`, `color =`
- Variables: `after`, `alignment`, `before`, `card`, `close`, `color`, `end`, `indented`, `lineEnd`, `lineEndIndex`, `lineStart`, `nextEnd`, `nextStart`, `nextValue`, `open`, `savedBlockSelector`, `savedSelection`, `selected`, `start`, `target`, `textarea`, `type`
- HTML dependencies: None detected
- CSS dependencies: `card-item`
- Data/action dependencies: `data-block-index`, `dataset.field`
- Calls: `getCardBodyTextarea`, `renderLines`, `renderStory`, `updateSupportingBlockFromInput`

### insertCharacterDialogueName

- Source: `outputs/app.js:6444`
- Purpose: Supports insert character dialogue name.
- Parameters: `card`, `name`
- Variables: `activeIndex`, `blocks`, `card`, `characterName`, `dialogIndex`, `insertIndex`, `name`, `updatedBlocks`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `cardAllowsDialogueInsert`, `getActiveSupportingInsertIndex`, `getSupportingEditorBlocks`, `openSpeechDialog`, `serializeSupportingBlocks`

### openCharactersDialog

- Source: `outputs/app.js:6470`
- Purpose: Opens characters dialog.
- Parameters: None
- Variables: None detected
- HTML dependencies: `dom.characterNameInput (#characterNameInput)`, `dom.charactersDialog (#charactersDialog)`
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `renderCharacterList`

### handleCharactersDialogClose

- Source: `outputs/app.js:6479`
- Purpose: Commits pending character input when Done closes the character manager.
- Parameters: None
- Variables: None detected
- HTML dependencies: `dom.characterNameInput (#characterNameInput)`, `dom.charactersDialog (#charactersDialog)`
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `addCharacterFromDialog`, `commitCharacterNameEdit`

### renderCharacterList

- Source: `outputs/app.js:6493`
- Purpose: Renders character list UI markup or state.
- Parameters: `selectedName =`
- Variables: `selectedIndex`, `selectedName`
- HTML dependencies: `dom.characterList (#characterList)`
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `updateCharacterDialogActions`

### syncCharacterDialogSelection

- Source: `outputs/app.js:6504`
- Purpose: Synchronizes character dialog selection UI state from preferences or selection.
- Parameters: None
- Variables: `nextSelection`
- HTML dependencies: `dom.characterList (#characterList)`, `dom.characterNameInput (#characterNameInput)`
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `commitCharacterNameEdit`, `renderCharacterList`, `updateCharacterDialogActions`

### addCharacterFromDialog

- Source: `outputs/app.js:6519`
- Purpose: Adds character from dialog.
- Parameters: None
- Variables: `name`
- HTML dependencies: `dom.characterList (#characterList)`, `dom.characterNameInput (#characterNameInput)`
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `characterNameExists`, `commitCharacterNameEdit`, `createCharacterCard`, `renderCharacterList`, `showNotice`

### copySelectedCharacter

- Source: `outputs/app.js:6543`
- Purpose: Copies selected character.
- Parameters: None
- Variables: `base`, `index`, `name`, `selected`
- HTML dependencies: `dom.characterList (#characterList)`, `dom.characterNameInput (#characterNameInput)`
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `characterNameExists`, `commitCharacterNameEdit`, `createCharacterCard`, `renderCharacterList`

### requestSelectedCharacterDelete

- Source: `outputs/app.js:6566`
- Purpose: Opens delete confirmation for the selected character.
- Parameters: None
- Variables: `selected`
- HTML dependencies: `dom.characterDeleteDialog (#characterDeleteDialog)`, `dom.characterList (#characterList)`
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `commitCharacterNameEdit`

### confirmCharacterDelete

- Source: `outputs/app.js:6575`
- Purpose: Deletes selected character after confirmation.
- Parameters: `event`
- Variables: `event`, `selected`
- HTML dependencies: `dom.characterDeleteDialog (#characterDeleteDialog)`, `dom.characterNameInput (#characterNameInput)`
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `deleteCharacterByName`, `renderCharacterList`

### deleteCharacterByName

- Source: `outputs/app.js:6591`
- Purpose: Deletes a character from the project, its character card, and all card references.
- Parameters: `name`
- Variables: `name`, `selected`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `findCard`, `getCharacterCardName`, `getStoredCardCharacters`, `isCharacterCard`, `revokeLocalMediaUrl`, `setCardCharacters`

### handleCharacterNameKeydown

- Source: `outputs/app.js:6604`
- Purpose: Handles character name keydown events and updates related state.
- Parameters: `event`
- Variables: `event`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `addCharacterFromDialog`, `commitCharacterNameEdit`

### updateCharacterDialogActions

- Source: `outputs/app.js:6612`
- Purpose: Supports update character dialog actions.
- Parameters: None
- Variables: None detected
- HTML dependencies: `dom.characterList (#characterList)`, `dom.deleteCharacter (#deleteCharacter)`
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: None detected

### jumpToSelectedCharacterCard

- Source: `outputs/app.js:6618`
- Purpose: Jumps from the character manager to the selected character card on the canvas.
- Parameters: None
- Variables: `card`, `selected`
- HTML dependencies: `dom.characterList (#characterList)`, `dom.charactersDialog (#charactersDialog)`
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `commitCharacterNameEdit`, `createCharacterCard`, `findCharacterCardByName`

### commitCharacterNameEdit

- Source: `outputs/app.js:6632`
- Purpose: Commits a pending character rename from the character manager input.
- Parameters: `nextSelection =`
- Variables: `newName`, `nextSelection`, `oldName`, `selection`
- HTML dependencies: `dom.characterNameInput (#characterNameInput)`
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `characterNameExists`, `getCharacterCardName`, `getStoredCardCharacters`, `isCharacterCard`, `renderCharacterList`, `setCardCharacters`, `showNotice`

### characterNameExists

- Source: `outputs/app.js:6666`
- Purpose: Returns whether a character name already exists, with optional current-name exemption.
- Parameters: `name`, `exceptName =`
- Variables: `exceptKey`, `exceptName`, `key`, `name`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `normalizeCharacterNameKey`

### normalizeCharacterNameKey

- Source: `outputs/app.js:6673`
- Purpose: Normalizes character names for uniqueness checks.
- Parameters: `name`
- Variables: `name`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: None detected

### createCharacterCard

- Source: `outputs/app.js:6678`
- Purpose: Creates character card.
- Parameters: `name`, `options = {}`
- Variables: `name`, `options`, `position`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `findCharacterCardByName`, `getCharacterCardPosition`

### ensureCharacterCards

- Source: `outputs/app.js:6692`
- Purpose: Ensures every project character has a matching character card.
- Parameters: `options = {}`
- Variables: `options`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `createCharacterCard`, `findCharacterCardByName`

### findCharacterCardByName

- Source: `outputs/app.js:6699`
- Purpose: Supports find character card by name.
- Parameters: `name`
- Variables: `name`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `getCharacterCardName`, `isCharacterCard`

### getCharacterCardName

- Source: `outputs/app.js:6704`
- Purpose: Returns character card name.
- Parameters: `card`
- Variables: `card`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: None detected

### getCharacterCardPosition

- Source: `outputs/app.js:6709`
- Purpose: Returns character card position.
- Parameters: None
- Variables: `base`, `grid`, `index`, `leftOfStory`, `storyStart`, `topBelowTimeline`
- HTML dependencies: `dom.canvasViewport (#canvasViewport)`
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `isCharacterCard`

### revokeLocalMediaUrl

- Source: `outputs/app.js:6729`
- Purpose: Supports revoke local media url.
- Parameters: `card`
- Variables: `card`, `shared`, `url`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `historyReferencesLocalMediaUrl`

### historyReferencesLocalMediaUrl

- Source: `outputs/app.js:6737`
- Purpose: Returns whether an undo or redo snapshot still needs a local media URL.
- Parameters: `url`
- Variables: `url`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: None detected

### normalizeMediaPath

- Source: `outputs/app.js:6744`
- Purpose: Normalizes image paths to the app img folder convention.
- Parameters: `path`
- Variables: `path`, `trimmed`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: None detected

### exportMediaPath

- Source: `outputs/app.js:6753`
- Purpose: Exports media path.
- Parameters: `path`
- Variables: `normalized`, `path`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `normalizeMediaPath`

### safeHex

- Source: `outputs/app.js:6761`
- Purpose: Supports safe hex.
- Parameters: `value`, `fallback`
- Variables: `fallback`, `value`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: None detected

### escapeHtml

- Source: `outputs/app.js:6766`
- Purpose: Escapes text for safe insertion into HTML.
- Parameters: `value`
- Variables: `value`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: None detected

### escapeAttr

- Source: `outputs/app.js:6776`
- Purpose: Escapes text for safe insertion into HTML attributes.
- Parameters: `value`
- Variables: `value`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `escapeHtml`

### formatMultiline

- Source: `outputs/app.js:6781`
- Purpose: Supports format multiline.
- Parameters: `value`
- Variables: `value`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `escapeHtml`

### formatBodyText

- Source: `outputs/app.js:6786`
- Purpose: Supports format body text.
- Parameters: `value`
- Variables: `value`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `applyInlineBodyMarkup`, `formatMultiline`

### formatDialogBodyText

- Source: `outputs/app.js:6791`
- Purpose: Formats dialog-mode body text with centered speaker names and indented speech.
- Parameters: `value`, `card`
- Variables: `card`, `speech`, `speechText`, `value`
- HTML dependencies: None detected
- CSS dependencies: `dialog-line`, `dialog-speaker`, `dialog-text-block`, `dialog-unit`, `story-body-line`
- Data/action dependencies: None detected
- Calls: `normalizeDialogSpeechText`, `parseSupportingBlocks`

### normalizeDialogSpeechText

- Source: `outputs/app.js:6808`
- Purpose: Normalizes dialogue speech for screenplay output so extracted hard line breaks wrap naturally.
- Parameters: `value`
- Variables: `value`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: None detected

### applyInlineBodyMarkup

- Source: `outputs/app.js:6819`
- Purpose: Applies supported body markup after text has already been escaped.
- Parameters: `html`
- Variables: `html`
- HTML dependencies: None detected
- CSS dependencies: `story-align-$1`
- Data/action dependencies: None detected
- Calls: None detected

### plainBodyText

- Source: `outputs/app.js:6828`
- Purpose: Supports plain body text.
- Parameters: `value`
- Variables: `value`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: None detected

### plainDialogBodyText

- Source: `outputs/app.js:6837`
- Purpose: Returns plain body text indented for dialog-mode scene cards.
- Parameters: `value`, `card`
- Variables: `card`, `speech`, `value`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: `normalizeDialogSpeechText`, `parseSupportingBlocks`, `plainBodyText`

### clamp

- Source: `outputs/app.js:6849`
- Purpose: Supports clamp.
- Parameters: `value`, `min`, `max`
- Variables: `max`, `min`, `value`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: None detected

### isInteractiveTarget

- Source: `outputs/app.js:6854`
- Purpose: Returns whether interactive target.
- Parameters: `target`
- Variables: `control`, `target`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: None detected

### distance

- Source: `outputs/app.js:6862`
- Purpose: Supports distance.
- Parameters: `a`, `b`
- Variables: `a`, `b`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: None detected

### midpointOf

- Source: `outputs/app.js:6867`
- Purpose: Supports midpoint of.
- Parameters: `a`, `b`
- Variables: `a`, `b`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: None detected

### nextNumberFromIds

- Source: `outputs/app.js:6875`
- Purpose: Supports next number from ids.
- Parameters: `items`, `regex`
- Variables: `items`, `max`, `regex`
- HTML dependencies: None detected
- CSS dependencies: None detected
- Data/action dependencies: None detected
- Calls: None detected

### showNotice

- Source: `outputs/app.js:6884`
- Purpose: Shows a temporary toast notification over the card canvas.
- Parameters: `message`
- Variables: `host`, `message`, `notice`
- HTML dependencies: `dom.canvasViewport (#canvasViewport)`
- CSS dependencies: `app-toast`, `is-visible`
- Data/action dependencies: None detected
- Calls: None detected

## Embedded Export-Template Function Inventory

These functions are emitted as text inside `buildStoryDocumentHtml()` and run inside exported/pop-out HTML documents, not in the main app runtime. Their HTML/CSS dependencies are the generated export document, not `outputs/index.html`.

### pageLabel

- Source: `outputs/app.js:4479`
- Purpose: Embedded standalone export helper for page label.
- Parameters: `pageIndex`
- Variables: `pageIndex`
- HTML dependencies: `generated export HTML document`
- CSS dependencies: `generated export CSS`
- Data/action dependencies: None detected
- Calls: Included in generated export-document pagination flow

### createPage

- Source: `outputs/app.js:4484`
- Purpose: Embedded standalone export helper for create page.
- Parameters: `pageIndex`
- Variables: `pageIndex`
- HTML dependencies: `generated export HTML document`
- CSS dependencies: `generated export CSS`
- Data/action dependencies: None detected
- Calls: Included in generated export-document pagination flow

### collectNodes

- Source: `outputs/app.js:4499`
- Purpose: Embedded standalone export helper for collect nodes.
- Parameters: `main`
- Variables: `main`
- HTML dependencies: `generated export HTML document`
- CSS dependencies: `generated export CSS`
- Data/action dependencies: None detected
- Calls: Included in generated export-document pagination flow

### isOverflowing

- Source: `outputs/app.js:4504`
- Purpose: Embedded standalone export helper for is overflowing.
- Parameters: `page`
- Variables: `page`
- HTML dependencies: `generated export HTML document`
- CSS dependencies: `generated export CSS`
- Data/action dependencies: None detected
- Calls: Included in generated export-document pagination flow

### createNextPage

- Source: `outputs/app.js:4507`
- Purpose: Embedded standalone export helper for create next page.
- Parameters: `pages`
- Variables: `pages`
- HTML dependencies: `generated export HTML document`
- CSS dependencies: `generated export CSS`
- Data/action dependencies: None detected
- Calls: Included in generated export-document pagination flow

### storyCardHasContent

- Source: `outputs/app.js:4512`
- Purpose: Embedded standalone export helper for story card has content.
- Parameters: `card`
- Variables: `card`
- HTML dependencies: `generated export HTML document`
- CSS dependencies: `generated export CSS`
- Data/action dependencies: None detected
- Calls: Included in generated export-document pagination flow

### cloneStoryCardShell

- Source: `outputs/app.js:4519`
- Purpose: Embedded standalone export helper for clone story card shell.
- Parameters: `sourceCard`
- Variables: `sourceCard`
- HTML dependencies: `generated export HTML document`
- CSS dependencies: `generated export CSS`
- Data/action dependencies: None detected
- Calls: Included in generated export-document pagination flow

### appendWholeNode

- Source: `outputs/app.js:4525`
- Purpose: Embedded standalone export helper for append whole node.
- Parameters: `node`, `page`, `pages`
- Variables: `node`, `page`, `pages`
- HTML dependencies: `generated export HTML document`
- CSS dependencies: `generated export CSS`
- Data/action dependencies: None detected
- Calls: Included in generated export-document pagination flow

### appendStoryNode

- Source: `outputs/app.js:4534`
- Purpose: Embedded standalone export helper for append story node.
- Parameters: `node`, `page`, `pages`
- Variables: `node`, `page`, `pages`
- HTML dependencies: `generated export HTML document`
- CSS dependencies: `generated export CSS`
- Data/action dependencies: None detected
- Calls: Included in generated export-document pagination flow

### appendDialogStoryCard

- Source: `outputs/app.js:4540`
- Purpose: Embedded standalone export helper for append dialog story card.
- Parameters: `sourceCard`, `page`, `pages`
- Variables: `page`, `pages`, `sourceCard`
- HTML dependencies: `generated export HTML document`
- CSS dependencies: `generated export CSS`
- Data/action dependencies: None detected
- Calls: Included in generated export-document pagination flow

### appendStoryCardChild

- Source: `outputs/app.js:4559`
- Purpose: Embedded standalone export helper for append story card child.
- Parameters: `child`, `sourceCard`, `page`, `pages`, `card`
- Variables: `card`, `child`, `page`, `pages`, `sourceCard`
- HTML dependencies: `generated export HTML document`
- CSS dependencies: `generated export CSS`
- Data/action dependencies: None detected
- Calls: Included in generated export-document pagination flow

### ensureDialogBody

- Source: `outputs/app.js:4572`
- Purpose: Embedded standalone export helper for ensure dialog body.
- Parameters: `card`, `sourceBody`
- Variables: `card`, `sourceBody`
- HTML dependencies: `generated export HTML document`
- CSS dependencies: `generated export CSS`
- Data/action dependencies: None detected
- Calls: Included in generated export-document pagination flow

### appendDialogBody

- Source: `outputs/app.js:4580`
- Purpose: Embedded standalone export helper for append dialog body.
- Parameters: `sourceBody`, `sourceCard`, `page`, `pages`, `card`
- Variables: `card`, `page`, `pages`, `sourceBody`, `sourceCard`
- HTML dependencies: `generated export HTML document`
- CSS dependencies: `generated export CSS`
- Data/action dependencies: None detected
- Calls: Included in generated export-document pagination flow

### appendDirectionLine

- Source: `outputs/app.js:4596`
- Purpose: Embedded standalone export helper for append direction line.
- Parameters: `child`, `sourceBody`, `sourceCard`, `page`, `pages`, `card`, `body`
- Variables: `body`, `card`, `child`, `page`, `pages`, `sourceBody`, `sourceCard`
- HTML dependencies: `generated export HTML document`
- CSS dependencies: `generated export CSS`
- Data/action dependencies: None detected
- Calls: Included in generated export-document pagination flow

### appendDialogUnit

- Source: `outputs/app.js:4611`
- Purpose: Embedded standalone export helper for append dialog unit.
- Parameters: `unit`, `sourceBody`, `sourceCard`, `page`, `pages`, `card`, `body`
- Variables: `body`, `card`, `page`, `pages`, `sourceBody`, `sourceCard`, `unit`
- HTML dependencies: `generated export HTML document`
- CSS dependencies: `generated export CSS`
- Data/action dependencies: None detected
- Calls: Included in generated export-document pagination flow

### moveDialogueToNextPage

- Source: `outputs/app.js:4679`
- Purpose: Embedded standalone export helper for move dialogue to next page.
- Parameters: `sourceBody`, `sourceCard`, `pages`
- Variables: `pages`, `sourceBody`, `sourceCard`
- HTML dependencies: `generated export HTML document`
- CSS dependencies: `generated export CSS`
- Data/action dependencies: None detected
- Calls: Included in generated export-document pagination flow

### pageHasVisibleStoryContent

- Source: `outputs/app.js:4686`
- Purpose: Embedded standalone export helper for page has visible story content.
- Parameters: `page`
- Variables: `page`
- HTML dependencies: `generated export HTML document`
- CSS dependencies: `generated export CSS`
- Data/action dependencies: None detected
- Calls: Included in generated export-document pagination flow

### fitMoreCueOnPage

- Source: `outputs/app.js:4691`
- Purpose: Embedded standalone export helper for fit more cue on page.
- Parameters: `body`, `currentUnit`, `remaining`, `page`
- Variables: `body`, `currentUnit`, `page`, `remaining`
- HTML dependencies: `generated export HTML document`
- CSS dependencies: `generated export CSS`
- Data/action dependencies: None detected
- Calls: Included in generated export-document pagination flow

### splitDialogueIntoSentences

- Source: `outputs/app.js:4712`
- Purpose: Embedded standalone export helper for split dialogue into sentences.
- Parameters: `unit`
- Variables: `unit`
- HTML dependencies: `generated export HTML document`
- CSS dependencies: `generated export CSS`
- Data/action dependencies: None detected
- Calls: Included in generated export-document pagination flow

### createDialogContinuationUnit

- Source: `outputs/app.js:4722`
- Purpose: Embedded standalone export helper for create dialog continuation unit.
- Parameters: `speaker`
- Variables: `speaker`
- HTML dependencies: `generated export HTML document`
- CSS dependencies: `generated export CSS`
- Data/action dependencies: None detected
- Calls: Included in generated export-document pagination flow

### createDialogLine

- Source: `outputs/app.js:4731`
- Purpose: Embedded standalone export helper for create dialog line.
- Parameters: `text`
- Variables: `text`
- HTML dependencies: `generated export HTML document`
- CSS dependencies: `generated export CSS`
- Data/action dependencies: None detected
- Calls: Included in generated export-document pagination flow

### addMoreCue

- Source: `outputs/app.js:4737`
- Purpose: Embedded standalone export helper for add more cue.
- Parameters: `body`
- Variables: `body`
- HTML dependencies: `generated export HTML document`
- CSS dependencies: `generated export CSS`
- Data/action dependencies: None detected
- Calls: Included in generated export-document pagination flow

### removeMoreCue

- Source: `outputs/app.js:4744`
- Purpose: Embedded standalone export helper for remove more cue.
- Parameters: `body`
- Variables: `body`
- HTML dependencies: `generated export HTML document`
- CSS dependencies: `generated export CSS`
- Data/action dependencies: None detected
- Calls: Included in generated export-document pagination flow

### addContinuationToSpeakerLabel

- Source: `outputs/app.js:4748`
- Purpose: Embedded standalone export helper for add continuation to speaker label.
- Parameters: `label`
- Variables: `label`
- HTML dependencies: `generated export HTML document`
- CSS dependencies: `generated export CSS`
- Data/action dependencies: None detected
- Calls: Included in generated export-document pagination flow

### paginate

- Source: `outputs/app.js:4752`
- Purpose: Embedded standalone export helper for paginate.
- Parameters: None
- Variables: None detected
- HTML dependencies: `generated export HTML document`
- CSS dependencies: `generated export CSS`
- Data/action dependencies: None detected
- Calls: Included in generated export-document pagination flow

## Notes

- "Variables" includes function parameters and local `const`, `let`, and `var` declarations detected by static scanning. Destructured declarations are intentionally omitted from the variable list to avoid false names.
- "HTML dependencies" includes `dom.*` keys mapped back to IDs from `cacheDom()`, plus direct `document.getElementById(...)` usage.
- "CSS dependencies" includes classes emitted in generated markup, classes used through `classList`, and classes referenced by selectors.
- "Data/action dependencies" includes `data-*` attributes and `dataset.*` keys used for delegated event handling.
- This is a static inventory. Dynamic template expressions can produce additional runtime class combinations that are summarized by their base classes.

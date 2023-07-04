/**
 * @OnlyCurrentDoc
 */

/**
 * Runs when the add-on is installed.
 * @param {object} e
 */
function onInstall(e) {
  onOpen(e);
}

/**
 * Creates a menu entry in the Google Docs UI when the document is opened.
 * @param {object} e
 */
function onOpen(e) {
  DocumentApp.getUi()
    .createAddonMenu()
    .addItem("Start", "showSidebar")
    .addToUi();
}

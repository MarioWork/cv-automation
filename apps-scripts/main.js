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
   var ui = DocumentApp.getUi();


   ui.createMenu('Custom Menu')
      .addItem('First item', 'menuItem1')
      .addSeparator()
      .addSubMenu(ui.createMenu('Sub-menu')
          .addItem('Second item', 'menuItem2'))
      .addToUi();
}

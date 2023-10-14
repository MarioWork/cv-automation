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

    ui.createMenu('CV Automation')
        .addItem('Upload', 'showUploadFileDialog')
        .addSeparator()
        .addItem('Enhance', 'enhanceCVSidebar')
        .addToUi();
}

/**
 * Displays on the Google Docs UI the Show Upload File dialog
 */
function showUploadFileDialog() {
    const html = HtmlService.createHtmlOutputFromFile('upload-dialog.html')
        .setWidth(400)
        .setHeight(350);

    //Workaround for removing the dialog title
    const emptyCharacter = '‎';

    DocumentApp.getUi().showModalDialog(html, emptyCharacter);
}

//TODO: Implement
function enhanceCVSidebar() {}

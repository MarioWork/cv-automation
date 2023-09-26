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

//TODO: fix size
function showUploadFileDialog() {
    const html = HtmlService.createHtmlOutputFromFile('upload-dialog.html')
        .setWidth(400)
        .setHeight(300);

    const emptyCharacter = '‎';

    DocumentApp.getUi().showModalDialog(html, emptyCharacter);
}

function enhanceCVSidebar() {}

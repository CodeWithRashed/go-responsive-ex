const vscode = require("vscode");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // This line of code will only be executed once when your extension is activated
  // console.log('Congratulations, your extension "go-responsive" is now active!');

  //LOCAL STORAGE STATE
  const state = context.workspaceState;

  //GETTING MAX AND MIN CONTAINER VALUE
  let maxContainer = parseInt(state.get("maxContainer", 1440));
  let minContainer = parseInt(state.get("minContainer", 425));

  //CREATING STATUS BAR FOR DISPLAY USER INFO
  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );
  // Set text and command for the status bar item
  statusBarItem.text = "$(info) Go Responsive";
  statusBarItem.tooltip = `Container: ${maxContainer}px - ${minContainer}px. Click to change the container sizes!`;
  statusBarItem.command = "go-responsive.updateContainerSize";
  // Show the status bar item
  statusBarItem.show();

  //GET FONT SIZE
  let getFontSize = vscode.commands.registerCommand(
    "go-responsive.getFont",
    async function () {
      // GETTING USER INPUT FOR MAX AND MIN FONT SIZE
      async function getUserInput() {
        const maxFontSize = await vscode.window.showInputBox({
          prompt: "Enter the maximum font size:",
          placeHolder: "Maximum font size / Font size ..",
        });

        const minFontSize = await vscode.window.showInputBox({
          prompt: "Enter the minimum font size:",
          placeHolder: "Minimum font size / Font size for mobile",
        });

        return { maxFontSize, minFontSize };
      }

      //GETTING ACTIVE CURSOR LOCATION
      const editor = vscode.window.activeTextEditor;

      //SENDING WARNING IF THERE IS NO ACTIVE CURSOR
      if (!editor) {
        vscode.window.showErrorMessage(
          "No active window found. Please open a file first."
        );
        return;
      }

      const selection = editor.selection;
      const cursorPosition = selection.active || selection.start;

      //GETTING USER INPUTS RESULT
      const userInput = await getUserInput();

      //SENDING WARNING IF ANY FONT SIZE IS NOT PROVIDED
      if (!userInput.maxFontSize || !userInput.minFontSize) {
        vscode.window.showErrorMessage("Font Size Can't be empty.");
        return;
      }


      const maxFontSizeInt = parseInt(userInput.maxFontSize)
      const minFontSizeInt = parseInt(userInput.minFontSize)

      //CALCULATING THE FONT SIZE
      const scalingFactorFontSize =(maxFontSizeInt - minFontSizeInt) / (maxContainer - minContainer);

        
      const fontSize = `font-size: clamp(${minFontSizeInt}px, calc(${scalingFactorFontSize} * (100vw - ${minContainer}px) + ${minFontSizeInt}px), ${maxFontSizeInt}px);`;



      //PASTING RESULT HERE
      editor.edit((editBuilder) => {
        editBuilder.insert(cursorPosition, fontSize);
      });
    }
  );


  //GET FONT SIZE AND LINE HEIGHT
  let getFontSizeAndLineHeight = vscode.commands.registerCommand(
    "go-responsive.getFontAndLineHeight",
    async function () {
      // GETTING USER INPUT FOR MAX AND MIN FONT SIZE
      async function getUserInput() {
        const maxFontSize = await vscode.window.showInputBox({
          prompt: "Enter the maximum font size:",
          placeHolder: "Maximum font size / Font size ..",
        });

        const minFontSize = await vscode.window.showInputBox({
          prompt: "Enter the minimum font size:",
          placeHolder: "Minimum font size / Font size for mobile",
        });
        const maxLineHeight = await vscode.window.showInputBox({
          prompt: "Enter the maximum line height:",
          placeHolder: "Maximum line height / line height ..",
        });

        const minLineHeight = await vscode.window.showInputBox({
          prompt: "Enter the minimum line height:",
          placeHolder: "Minimum line height / line height for mobile",
        });

        return { maxFontSize, minFontSize, maxLineHeight, minLineHeight };
      }

      //GETTING ACTIVE CURSOR LOCATION
      const editor = vscode.window.activeTextEditor;

      //SENDING WARNING IF THERE IS NO ACTIVE CURSOR
      if (!editor) {
        vscode.window.showErrorMessage(
          "No active window found. Please open a file first."
        );
        return;
      }

      const selection = editor.selection;
      const cursorPosition = selection.active || selection.start;

      //GETTING USER INPUTS RESULT
      const userInput = await getUserInput();

      //SENDING WARNING IF ANY FONT SIZE IS NOT PROVIDED
      if (!userInput.maxFontSize || !userInput.minFontSize) {
        vscode.window.showErrorMessage("Font Size And Line Height Can't be empty.");
        return;
      }


      const maxFontSizeInt = parseInt(userInput.maxFontSize)
      const minFontSizeInt = parseInt(userInput.minFontSize)
      const maxLineHeightInt = parseInt(userInput.maxLineHeight)
      const minLineHeightInt = parseInt(userInput.minLineHeight)

      //CALCULATING THE FONT SIZE
      const scalingFactorFontSize =(maxFontSizeInt - minFontSizeInt) / (maxContainer - minContainer);
      const scalingFactorLineHeight =(maxLineHeightInt - minLineHeightInt) / (maxContainer - minContainer);

        
      const fontSize = `font-size: clamp(${minFontSizeInt}px, calc(${scalingFactorFontSize} * (100vw - ${minContainer}px) + ${minFontSizeInt}px), ${maxFontSizeInt}px);`;
      const lineHeight = `line-height: clamp(${minLineHeightInt}px, calc(${scalingFactorLineHeight} * (100vw - ${minContainer}px) + ${minLineHeightInt}px), ${maxLineHeightInt}px);`;

const result = `${fontSize}
${lineHeight}
`

      //PASTING RESULT HERE
      editor.edit((editBuilder) => {
        editBuilder.insert(cursorPosition, result);
      });
    }
  );

  //GET PADDING SIZE
  let getPadding = vscode.commands.registerCommand(
    "go-responsive.getPadding",
    async function () {
      // GETTING USER INPUT FOR MAX AND MIN FONT SIZE
      async function getUserInput() {
        const maxPaddingString = await vscode.window.showInputBox({
          prompt: "Enter the maximum padding:",
          placeHolder: "Maximum padding ..",
        });

        const minPaddingString = await vscode.window.showInputBox({
          prompt: "Enter the minimum padding:",
          placeHolder: "Minimum padding for mobile",
        });

        const maxPadding = parseInt(maxPaddingString);
        const minPadding = parseInt(minPaddingString);

        return { maxPadding, minPadding };
      }

      //GETTING ACTIVE CURSOR LOCATION
      const editor = vscode.window.activeTextEditor;

      //SENDING WARNING IF THERE IS NO ACTIVE CURSOR
      if (!editor) {
        vscode.window.showErrorMessage(
          "No active window found. Please open a file first."
        );
        return;
      }

      const selection = editor.selection;
      const cursorPosition = selection.active || selection.start;

      //GETTING USER INPUTS RESULT
      const userInput = await getUserInput();

      //SENDING WARNING IF ANY FONT SIZE IS NOT PROVIDED
      if (!userInput.maxPadding || !userInput.minPadding) {
        vscode.window.showErrorMessage("Padding Size Can't be empty.");
        return;
      }

      //CALCULATING THE FONT SIZE
      const scalingFactor =
        (userInput.maxPadding - userInput.minPadding) /
        (maxContainer - minContainer);
      const padding = `padding: clamp(${userInput.minPadding}px, calc(${scalingFactor} * (100vw - ${minContainer}px) + ${userInput.minPadding}px), ${userInput.maxPadding}px);`;

      //PASTING RESULT HERE
      editor.edit((editBuilder) => {
        editBuilder.insert(cursorPosition, padding);
      });
    }
  );

  //GET HEIGHT AND WIDTH
  let getHeightAndWidth = vscode.commands.registerCommand(
    "go-responsive.getHeightAndWidth",
    async function () {
      // GETTING USER INPUT FOR MAX AND MIN
      async function getUserInput() {
        const maxHeightString = await vscode.window.showInputBox({
          prompt: "Enter the maximum height of the element:",
          placeHolder: "Maximum height..",
        });
        const minHeightString = await vscode.window.showInputBox({
          prompt: "Enter the minimum height of the element:",
          placeHolder: "Minimum height..",
        });
        const maxWidthString = await vscode.window.showInputBox({
          prompt: "Enter the maximum width of the element:",
          placeHolder: "Maximum Width..",
        });
        const minWidthString = await vscode.window.showInputBox({
          prompt: "Enter the minimum width of the element:",
          placeHolder: "Minimum Width..",
        });

        const maxHeight = parseInt(maxHeightString);
        const minHeight = parseInt(minHeightString);
        const maxWidth = parseInt(maxWidthString);
        const minWidth = parseInt(minWidthString);

        return { maxHeight, minHeight, maxWidth, minWidth };
      }

      //GETTING ACTIVE CURSOR LOCATION
      const editor = vscode.window.activeTextEditor;

      //SENDING WARNING IF THERE IS NO ACTIVE CURSOR
      if (!editor) {
        vscode.window.showErrorMessage(
          "No active window found. Please open a file first."
        );
        return;
      }

      const selection = editor.selection;
      const cursorPosition = selection.active || selection.start;

      //GETTING USER INPUTS RESULT
      const userInput = await getUserInput();

      //SENDING WARNING IF ANY FONT SIZE IS NOT PROVIDED
      if (
        !userInput.maxHeight ||
        !userInput.minHeight ||
        !userInput.maxWidth ||
        !userInput.minWidth
      ) {
        vscode.window.showErrorMessage("Height or Width Can't be empty.");
        return;
      }

      // CALCULATING THE SIZE OF HEIGHT
      const heightScalingFactor =
        (userInput.maxHeight - userInput.minHeight) /
        (maxContainer - minContainer);
      const heightResult = `height: clamp(${userInput.minHeight}px, calc(${heightScalingFactor} * (100vw - ${minContainer}px) + ${userInput.minHeight}px), ${userInput.maxHeight}px);`;

      // CALCULATING THE SIZE OF WIDTH
      const widthScalingFactor =
        (userInput.maxWidth - userInput.minWidth) /
        (maxContainer - minContainer);
      const widthResult = `width: clamp(${userInput.minWidth}px, calc(${widthScalingFactor} * (100vw - ${minContainer}px) + ${userInput.minWidth}px), ${userInput.maxWidth}px);`;

      const finalResult = `${heightResult}
${widthResult}
`;

      //PASTING RESULT HERE
      editor.edit((editBuilder) => {
        editBuilder.insert(cursorPosition, finalResult);
      });
    }
  );


  //GET GENERIC CLAMP DATA
  let getGenericClamp = vscode.commands.registerCommand(
    "go-responsive.getGenericClamp",
    async function () {
      // GETTING USER INPUT FOR MAX AND MIN FONT SIZE
      async function getUserInput() {
        const maxGenericSizeString = await vscode.window.showInputBox({
          prompt: "Enter the maximum size:",
          placeHolder: "Maximum size ..",
        });

        const minGenericSizeString = await vscode.window.showInputBox({
          prompt: "Enter the minimum size:",
          placeHolder: "Minimum size ..",
        });


        const maxGeneric = parseInt(maxGenericSizeString);
        const minGeneric = parseInt(minGenericSizeString);

        return { maxGeneric, minGeneric };
      }

      //GETTING ACTIVE CURSOR LOCATION
      const editor = vscode.window.activeTextEditor;

      //SENDING WARNING IF THERE IS NO ACTIVE CURSOR
      if (!editor) {
        vscode.window.showErrorMessage(
          "No active window found. Please open a file first."
        );
        return;
      }

      const selection = editor.selection;
      const cursorPosition = selection.active || selection.start;

      //GETTING USER INPUTS RESULT
      const userInput = await getUserInput();

      //SENDING WARNING IF ANY FONT SIZE IS NOT PROVIDED
      if (!userInput.maxGeneric || !userInput.minGeneric) {
        vscode.window.showErrorMessage("Size Can't be empty.");
        return;
      }

      //CALCULATING THE FONT SIZE
      const scalingFactor =
        (userInput.maxGeneric - userInput.minGeneric) /
        (maxContainer - minContainer);
      const clampResult = `clamp(${userInput.minGeneric}px, calc(${scalingFactor} * (100vw - ${minContainer}px) + ${userInput.minGeneric}px), ${userInput.maxGeneric}px);`;

      //PASTING RESULT HERE
      editor.edit((editBuilder) => {
        editBuilder.insert(cursorPosition, clampResult);
      });
    }
  );

  //UPDATED CONTAINER SIZE
  let updateContainerSize = vscode.commands.registerCommand(
    "go-responsive.updateContainerSize",
    async function () {
      // GETTING USER INPUT FOR MAX AND MIN FONT SIZE
      async function getUserInput() {
        const maxContainerString = await vscode.window.showInputBox({
          prompt: "Enter the max container size:",
          placeHolder: "Maximum Container Size..",
        });

        const minContainerString = await vscode.window.showInputBox({
          prompt: "Enter the minimum container size:",
          placeHolder: "Minimum Container Size..",
        });

        const maxContainerSizeInt = parseInt(maxContainerString);
        const minContainerSizeInt = parseInt(minContainerString);

        return { maxContainerSizeInt, minContainerSizeInt };
      }

      //GETTING USER INPUTS RESULT
      const userInput = await getUserInput();

      //SENDING WARNING IF ANY FONT SIZE IS NOT PROVIDED
      if (!userInput.maxContainerSizeInt || !userInput.minContainerSizeInt) {
        vscode.window.showErrorMessage("Container Size Can't be empty.");
        return;
      }

      state.update("maxContainer", userInput.maxContainerSizeInt);
      state.update("minContainer", userInput.minContainerSizeInt);
      maxContainer = parseInt(userInput.maxContainerSizeInt);
      minContainer = parseInt(userInput.minContainerSizeInt);

      statusBarItem.tooltip = `Container: ${maxContainer}px - ${minContainer}px. Click to change the container sizes!`;

      vscode.window.showInformationMessage("Container Size Updated!!");
    }
  );

  context.subscriptions.push(
    statusBarItem,
    getFontSize,
    getFontSizeAndLineHeight,
    getPadding,
    getHeightAndWidth,
    getGenericClamp,
    updateContainerSize
  );
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};

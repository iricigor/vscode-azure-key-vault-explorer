"use strict";
import * as vscode from "vscode";
import { INode } from "./model/INode";
import { KeyVaultNode } from "./model/keyVaultNode";
import { KeyVaultTreeDataProvider} from "./keyVaultTreeDataProvider";

export function activate(context: vscode.ExtensionContext) {

    const keyVaultTreeDataProvider = new KeyVaultTreeDataProvider(context);

    context.subscriptions.push(vscode.window.registerTreeDataProvider("azureKeyVault", keyVaultTreeDataProvider));

    context.subscriptions.push(vscode.commands.registerCommand("azure-key-vault-explorer.selectSubscriptions", () => {
        vscode.commands.executeCommand("azure-account.selectSubscriptions");
    }));

    context.subscriptions.push(vscode.commands.registerCommand("azure-key-vault-explorer.refresh", (node: INode) => {
        keyVaultTreeDataProvider.refresh(node);
    }));

    context.subscriptions.push(vscode.commands.registerCommand("azure-key-vault-explorer.export", (keyVaultNode: KeyVaultNode) => {
        keyVaultNode.export(keyVaultTreeDataProvider);
    }));

}

export function deactivate() {
}

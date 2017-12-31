// import keyvaultClient = require("azure-keyvault")   // https://www.npmjs.com/package/azure-keyvault

// general imports
import * as path from "path";
import * as vscode from "vscode";

// local imports
import { KeyVaultTreeDataProvider } from "../keyVaultTreeDataProvider";
import { INode } from "./INode";
import { SubscriptionNode } from "./subscriptionNode";
import { ResourceListResult } from "azure-arm-keyvault/lib/models";
import { Resource } from "azure-arm-resource/lib/resource/models";

export class KeyVaultNode implements INode {

    // TODO: Add Constructor, if needed; check TreeProvider
    constructor(private readonly keyVault: Resource) {
        // resource is key vault information containing properties: id, name, type, location, tags
    }

    public async getTreeItem(): Promise<vscode.TreeItem> {
     
        return {
            label: `${this.keyVault.name} (${this.keyVault.location})`,
            contextValue: "keyVault",
            iconPath: path.join(__filename, "..", "..", "..", "..", "resources", "key-vault-16px.png")
        };
 
    }

    public getChildren(): INode[] {
        return [];
    }

    // public start(virtualMachineTreeDataProvider: VirtualMachineTreeDataProvider): void {
    //     vscode.window.withProgress({
    //         title: `Starting VM [${this.virtualMachine.name}]`,
    //         location: vscode.ProgressLocation.Window,
    //     }, async (progress) => {
    //         await new Promise((resolve, reject) => {
    //             this.virtualMachines.start(this.resourceGroupName, this.virtualMachine.name).then((response) => {
    //                 if (response.error) {
    //                     reject(response.error.message);
    //                 } else {
    //                     virtualMachineTreeDataProvider.refresh(this.subscriptionNode);
    //                     resolve();
    //                 }
    //             });
    //         });
    //     });
    // }

    public export(keyVaultTreeDataProvider: KeyVaultTreeDataProvider): void {
        vscode.window.withProgress({
            title: `Exporting Key Vault: ${this.keyVault.name}`,
            location: vscode.ProgressLocation.Window,
        }, async (progress) => {
            await new Promise((resolve, reject) => {
                
                // TODO: Add code here, see https://github.com/Azure-Samples/key-vault-node-getting-started
                
                // list secrets
                // export list to file, then remove this test
                // in loop read all secrets with secrettext
                // convert to json
                // open new document and paste json content there

                // if any error, reject
                // else, resolve
            });
        });
    }
    
}

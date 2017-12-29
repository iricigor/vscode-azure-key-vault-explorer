

// import computeManagementClient = require("azure-arm-compute");
import keyvaultClient = require("azure-keyvault")   // https://www.npmjs.com/package/azure-keyvault

// general imports
import * as path from "path";
import * as vscode from "vscode";

// azure key vault imports
// TODO: Add imports here, I should install and package them into node_modules folder, see C:\Users\iiric\.vscode-insiders\extensions\formulahendry.azure-virtual-machine-explorer-0.0.2\node_modules

// import * as VirtualMachineModels from "../../node_modules/azure-arm-compute/lib/models";
// import * as VirtualMachineOperations from "../../node_modules/azure-arm-compute/lib/Operations";
import { KeyVaultTreeDataProvider } from "../keyVaultTreeDataProvider";

// local imports
import { INode } from "./INode";
import { SubscriptionNode } from "./subscriptionNode";

export class KeyVaultNode implements INode {

    // TODO: Add Constructor, if needed; check TreeProvider

    public async getTreeItem(): Promise<vscode.TreeItem> {
     
        return {
            label: this.keyVault.name,
            contextValue: "keyVault",
            iconPath: "../../resources/key-vault-16px.png",
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
            title: `Exporting KV [${this.keyVault.name}]`,
            location: vscode.ProgressLocation.Window,
        }, async (progress) => {
            await new Promise((resolve, reject) => {
                
                // TODO: Add code here, see https://github.com/Azure-Samples/key-vault-node-getting-started
                
                // list secrets
                // in loop read all secrets with secrettext
                // convert to json
                // open new document and paste json content there

                // if any error, reject
                // else, resolve
            });
        });
    }
    
}

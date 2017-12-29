// import computeManagementClient = require("azure-arm-compute");
import keyvaultClient = require("azure-keyvault")   // https://www.npmjs.com/package/azure-keyvault

// general imports
import * as path from "path";
import * as vscode from "vscode";

// local imports
import { AzureAccount, AzureResourceFilter } from "../azure-account.api";
import { INode } from "./INode";
// import { VirtualMachineNode } from "./virtualMachineNode";

// class start

export class SubscriptionNode implements INode {

    constructor(private readonly azureResourceFilter: AzureResourceFilter) {
    }

    public getTreeItem(): vscode.TreeItem {
        return {
            label: this.azureResourceFilter.subscription.displayName,
            collapsibleState: vscode.TreeItemCollapsibleState.Collapsed,
            contextValue: "subscription",
            iconPath: path.join(__filename, "..", "..", "..", "..", "resources", "AzureSubscription_16x.png"),
        };
    }

    // public async getChildren(azureAccount: AzureAccount): Promise<INode[]> {
    //     const client = new computeManagementClient(this.azureResourceFilter.session.credentials, this.azureResourceFilter.subscription.subscriptionId);
    //     const nodes = await client.virtualMachines.listAll().then((virtualMachines) => {
    //         return virtualMachines.map((virtualMachine) => {
    //             return new VirtualMachineNode(client.virtualMachines, virtualMachine, this);
    //         });
    //     });
    //     return nodes;
    // }

    public async getChildren(azureAccount: AzureAccount): Promise<INode[]> {

        const client = new keyvaultClient(this.azureResourceFilter.session.credentials, this.azureResourceFilter.subscription.subscriptionId);
   
        // Add more code
        


    }
}

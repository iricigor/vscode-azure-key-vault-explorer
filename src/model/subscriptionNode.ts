import keyVaultManagementClient  = require("azure-arm-keyvault")

// general imports
import * as path from "path";
import * as vscode from "vscode";

// local imports
import { AzureAccount, AzureResourceFilter } from "../azure-account.api";
import { INode } from "./INode";
import { KeyVaultNode } from "./keyVaultNode";
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

    public async getChildren(azureAccount: AzureAccount): Promise<INode[]> {

        //const client = new keyVaultClient(this.azureResourceFilter.session.credentials, this.azureResourceFilter.subscription.subscriptionId);
        //const client = new KeyVaultManagementClient(this.azureResourceFilter.session.credentials, this.azureResourceFilter.subscription.subscriptionId);
        const client = new keyVaultManagementClient(this.azureResourceFilter.session.credentials, this.azureResourceFilter.subscription.subscriptionId);
        const nodes = await client.vaults.list()

        return nodes.map((keyVault) => {
            return new KeyVaultNode(keyVault)
        })
    }
}

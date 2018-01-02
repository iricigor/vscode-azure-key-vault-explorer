import keyVault = require("azure-keyvault")   // https://www.npmjs.com/package/azure-keyvault
import msRestAzure = require("ms-rest-azure")

// general imports
import * as path from "path";
import * as vscode from "vscode";
//import { KeyVaultClient } from "azure-keyvault"

// local imports
import { AzureAccount, AzureResourceFilter } from "../azure-account.api";
import { KeyVaultTreeDataProvider } from "../keyVaultTreeDataProvider";
import { INode } from "./INode";
import { SubscriptionNode } from "./subscriptionNode";
import { ResourceListResult } from "azure-arm-keyvault/lib/models";
import { Resource } from "azure-arm-resource/lib/resource/models";
import { workspace, commands, window } from "vscode";
import { SecretListResult, SecretItem } from "azure-keyvault/lib/models";

export class KeyVaultNode implements INode {

    constructor(
        private readonly keyVault: Resource,
        private readonly azureResourceFilter: AzureResourceFilter) {
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

    public export(keyVaultTreeDataProvider: KeyVaultTreeDataProvider): void {

        const KVName = (this.keyVault.name).toLowerCase()
        const uri = `https://${KVName}.vault.azure.net`
        const timeStamp = (new Date()).toLocaleString()
        console.log(`returning secrets from ${uri} - ${timeStamp}`)

        
        // let nf = workbench.action.files.newUntitledFile
        // let nf = commands.executeCommand('workbench.action.files.newUntitledFile').then()

        // read secrets
        
        // const client = new keyVault.KeyVaultClient(this.azureResourceFilter.session.credentials); // as keyVault.KeyVaultCredentials
        let secretOptions = {
            generateClientRequestId: true,
            noRetryPolicy: false
        };
        const client = new keyVault.KeyVaultClient(this.azureResourceFilter.session.credentials, secretOptions); // as keyVault.KeyVaultCredentials
        
        const secrets3 = client.getSecrets(uri)
            .then()
            .catch( (err) => {
                console.log(err)
                console.log(err.statusCode)
                console.log(err.response)
            })  // anonymous?
        // it needs different set of credentials https://www.npmjs.com/package/azure-keyvault
        .then ( () => {
            const newFile = vscode.Uri.parse('untitled:' + KVName + '.json');
            vscode.workspace.openTextDocument(newFile).then(document => {
                const edit = new vscode.WorkspaceEdit();
                const text = `returning secrets from ${uri} - ${timeStamp} (${secrets3})`
                edit.insert(newFile, new vscode.Position(0, 0), text);
                return vscode.workspace.applyEdit(edit).then(success => {
                    if (success) {
                        vscode.window.showTextDocument(document);
                    } else {
                        vscode.window.showInformationMessage('Error!');
                    }
                });
            });    
        })


        // async function openFile() {

        //     try {
        //         console.log(`inside of async`)
        //         const newFile = vscode.Uri.parse('untitled:' + KVName + '.json');
        //         const document = await vscode.workspace.openTextDocument(newFile)
        //         const text = `returning secrets from ${uri} - ${timeStamp}`
        //         const edit = new vscode.WorkspaceEdit();
        //         await edit.insert(newFile, new vscode.Position(0, 0), text)    
        //     } catch (err) {
        //         console.log(err)
        //     }         
        // }
        // openFile().then()
        console.log(`finished returning secrets from ${uri} - ${timeStamp}`)

        //vscode.window.visibleTextEditors.
        // const client = new keyVaultClient.KeyVaultClient(this.azureResourceFilter.session.credentials);
        // var secretList: SecretItem[];

        // const secrets1 = client.getSecrets(uri)  // Promise<SecretListResult>
        // const secrets2 = client.getSecrets(uri).then( (value) => value) // Promise<SecretListResult>, value = SecretListResult
        // const secrets3 = client.getSecrets(uri).then() // Promise<SecretListResult>
        // const secrets4 = client.getSecrets(uri).then().then() // Promise<SecretListResult>
        // const secrets5 = client.getSecrets(uri).then( (value) => {return value}) // Promise<SecretListResult>
        // const secrets6 = client.getSecrets(uri, (err, result) => {})  // void
        // const secrets7 = client.getSecrets(uri, (err, result) => {return err ? err : result})  // void
        // const secrets8 = client.getSecrets(uri)

        // const secretGetter = client.getSecrets(uri) // Promise<SecretListResult>
        // const secrets9 = secretGetter.then( (a) => {return a})

        // secretGetter
        //     .then(() => {console.log("I am inside of then")} )
        //     .catch( () => {console.log("Something went wrong")})

        // const keys1 = client.getKeys(uri).then((value) => {return value})  // lets see with keys

        // client.getSecrets(uri).then(
        //     (res) => {
        //         console.log(`Task Complete! ${res}`); 
        //         resolve
        //     }, () => console.log("Task failed") )  // nothing?



        // client.getSecrets(uri, (err, result, n1, n2) => {
        //     if (err) {
        //         return err
        //     }
        //     secretList = result.map( (secret) => {return secret})
        //     console.log(`found ${secretList.length} secrets`)
        // })
        // //.map( (secret) => {return secret})

        // //  then( (result) => {return result.map}).
        // //  catch( (reason) => {console.log(`cannot read key vault because of ${reason}`)})
        
        // // let secrets: Promise<SecretListResult> = async () => {
        // //     return await client.getSecrets(uri).then((secret) => {return secret});
            
        // // }
        // // let secrets2 = Promise.resolve(secrets)

        // //const secrets = client.getSecrets(uri)
        // console.log(`end of getting secrets`) 

        
        // vscode.window.withProgress({
        //     title: `Exporting Key Vault: ${this.keyVault.name}`,
        //     location: vscode.ProgressLocation.Window,
        // }, async (progress) => {
        //     await new Promise((resolve, reject) => {
                
        //         // TODO: Add code here, see https://github.com/Azure-Samples/key-vault-node-getting-started
        //         let uri = `https://${(this.keyVault.name).toLowerCase()}.vault.azure.net`
        //         const client = new keyVaultClient.KeyVaultClient(this.azureResourceFilter.session.credentials);
                
        //         // const keyVaultSecrets = client.getSecrets(uri)
        //         const keyVaultSecrets = client.getSecrets(uri).then((secret) => {return secret}, (error) => {console.log("error reading secrets");  return error} )
                
        //         console.log(`returning secrets from ${uri} - ` + Date.now() )
        //         console.log(keyVaultSecrets)

        //         // resolve()
        //         // list secrets
        //         // export list to file, then remove this test
        //         // in loop read all secrets with secrettext
        //         // convert to json
        //         // open new document and paste json content there

        //         // if any error, reject
        //         // else, resolve
        //     });
        // });
    }    
}

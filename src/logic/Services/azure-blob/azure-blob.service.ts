import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import { Injectable } from '@nestjs/common';
import { uuid } from 'uuidv4';
const fs = require('fs');


@Injectable()
export class AzureBlobService {
    containerName: string //"photos"
    azureConnection = process.env.AZURE_CONNECTION_STRING

    getBlobClient(imageName: string): BlockBlobClient {
        const blobClientService = BlobServiceClient.fromConnectionString(this.azureConnection);
        const containerClient = blobClientService.getContainerClient (this.containerName)
        const blobClient = containerClient.getBlockBlobClient(imageName);
        return blobClient
    }

    async upload (file: Express.Multer.File, photoName: string,  containerName: string): Promise<string> {
        
        try {
            this.containerName = containerName;
            const pdfUrl = uuid() + photoName;
            const blobClient = this.getBlobClient(pdfUrl)
            await blobClient.uploadData(file.buffer);
            return pdfUrl
        }catch (error){
            console.error ("Error uploading file: ", error);
            throw new Error ("Failed to upload file");
        }
    }

    async uploadStringPhoto (stringPhoto: string, productName: string,  containerName: string, ): Promise<string> {
        try {
            this.containerName = containerName;
            const cleanBase64 = stringPhoto.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(cleanBase64, 'base64');
            // const buffer = Buffer.from(stringPhoto, 'base64');
            fs.writeFileSync('test.png', buffer); 
            // added .png so it would be a photo type
            const imageUrl = uuid() + '.png';
            const blobClient = this.getBlobClient(imageUrl)
            const options = {
                blobHTTPHeaders: {blobContentType: 'image/png'},
                metadata: {productName: productName}
            }
            await blobClient.uploadData(buffer, options);
            return blobClient.url
        } catch (error) {
            console.error("Error uploading string photo: ", error);
            throw new Error("Failed to upload string");
        }
    }

    async getFile (fileName: string, contailnerName: string) {
        this.containerName = contailnerName;
        const blobClient = this.getBlobClient(fileName);
        const blobDownloaded = await blobClient.download();
        return blobDownloaded.readableStreamBody;
    }

    async deletefile(fileName: string, containerName: string){
        this.containerName = containerName;
        const blobClient = this.getBlobClient(fileName);
        await blobClient.deleteIfExists()
    }
}


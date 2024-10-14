import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import { Injectable } from '@nestjs/common';
import { uuid } from 'uuidv4';



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

    async upload (file: Express.Multer.File, containerName: string): Promise<string> {
        try {
            this.containerName = containerName;
            const pdfUrl = uuid() + file.originalname;
            const blobClient = this.getBlobClient(pdfUrl)
            await blobClient.uploadData(file.buffer);
            return pdfUrl
        }catch (error){
            console.error ("Error uploading file: ", error);
            throw new Error ("Failed to upload file");
        }
    }

    async uploadStringPhoto (stringPhoto: string, containerName: string): Promise<string> {
        try {
            this.containerName = containerName;
            const buffer = Buffer.from(stringPhoto, 'base64'); 
            const pdfUrl = uuid() + stringPhoto;
            const blobClient = this.getBlobClient(pdfUrl)
            await blobClient.uploadData(buffer);
            return pdfUrl
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


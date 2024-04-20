// photo.service.ts

import { Injectable, Inject } from '@nestjs/common';
import { Bucket } from '@google-cloud/storage';

@Injectable()
export class PhotoService {
    constructor(@Inject('FIREBASE_BUCKET') private readonly bucket: Bucket) { }

    // async uploadPhoto(photo: Express.Multer.File): Promise<string> {
    //     const file = this.bucket.file(photo.originalname);
    //     await file.save(photo.buffer, {
    //         contentType: photo.mimetype,
    //     });
    //     const firebaseUrl = `https://storage.googleapis.com/${this.bucket.name}/${file.name}`;
    //     return firebaseUrl;
    // }
}
import { Test, TestingModule } from '@nestjs/testing';
import { PhotoService } from 'src/logic/Services/photo/photo.service';
import { AuthModule } from 'src/logic/Modules/auth/auth.module';
import { FirebaseModule } from 'src/logic/Modules/firebase/firebase.module';
import { PhotoController } from './photo.controller';
import { JwtService } from '@nestjs/jwt';

describe('PhotoController', () => {
  let controller: PhotoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [FirebaseModule, AuthModule],
      providers: [PhotoService, JwtService]

    }).compile();

    controller = module.get<PhotoController>(PhotoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

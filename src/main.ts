import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as firebaseAdmin from 'firebase-admin'
import * as serviceAccount from '../myblog-525f9-firebase-adminsdk-wad5t-29b4da572a.json'
require('dotenv').config();

//const urlPrefix = `https://storage.googleapis.com/${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}/`;

export const admin = firebaseAdmin.initializeApp({
  // @ts-ignore
  credential: firebaseAdmin.credential.cert(serviceAccount)
})
//export const storageRef = admin.storage().bucket('gs://post-images-storage.appspot.com')
// export const storageRef = admin.storage().bucket(process.env.FIREBASE_STORAGE_BUCKET);
export const storageRef = admin.storage().bucket("gs:/myblog-525f9.appspot.com");

async function bootstrap() {
  const PORT = process.env.PORT || 5101
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  //app.enableCors({credentials: true, origin: process.env.CLIENT_URL});
  app.enableCors({
    //origin: 'http://localhost:3000',
    origin: process.env.CLIENT_URL,
    //allowedHeaders: 'Origin, X-Requested-With, Content-Type, Access-Control-Allow-Origin,  Accept',
    credentials: true,
  });

  await app.listen(PORT, () => console.log(`Server running om port: ${PORT}`));
}
bootstrap();

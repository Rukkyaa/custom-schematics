import {
  DeleteObjectsCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

export type SignedUrlInfos = {
  signedUrl: string;
  key: string;
};

@Injectable()
export class <%= classify(name) %>Service {
  private readonly <%= lowercased(name) %>Client: S3Client;

  constructor() {
    this.<%= lowercased(name) %>Client = new S3Client({
      region: '<%= region %>',
    });
  }

  async getSignedPutUrl(bucketName: string): Promise<SignedUrlInfos> {
    const key = uuidv4();

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    const signedUrl = await getSignedUrl(this.<%= lowercased(name) %>Client, command, {
      expiresIn: 5 * 60,
    });

    return { signedUrl, key };
  }

  async getSignedGetUrl(
    bucketName: string,
    key: string,
  ): Promise<SignedUrlInfos> {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    const signedUrl = await getSignedUrl(this.<%= lowercased(name) %>Client, command);

    return { signedUrl, key };
  }

  async getS3Object(key: string, bucketName: string) {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    return this.<%= lowercased(name) %>Client.send(command);
  }

  async deleteObjects(keys: string[], bucketName: string) {
    const command = new DeleteObjectsCommand({
      Bucket: bucketName,
      Delete: {
        Objects: keys.map((key) => ({ Key: key })),
      },
    });

    try {
      const response = await this.<%= lowercased(name) %>Client.send(command);

      return response;
    } catch (error) {
      Logger.error(error);
    }
  }
}

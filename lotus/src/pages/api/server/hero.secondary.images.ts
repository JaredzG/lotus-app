import type { APIRoute } from "astro";
import {
  S3Client,
  GetObjectCommand,
  GetObjectTaggingCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME ?? "lotus-app-images";
const S3_BUCKET_REGION = process.env.S3_BUCKET_REGION ?? "us-east-2";
const S3_BUCKET_ACCESS_KEY =
  process.env.S3_BUCKET_ACCESS_KEY ?? "AKIA55IGFKLCGNSIHZWT";
const S3_BUCKET_SECRET_ACCESS_KEY = "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";

const s3 = new S3Client({
  credentials: {
    accessKeyId: S3_BUCKET_ACCESS_KEY,
    secretAccessKey: S3_BUCKET_SECRET_ACCESS_KEY,
  },
  region: S3_BUCKET_REGION,
});

const POST: APIRoute = async ({ params, request }) => {
  const reqData = await request.json();

  const responseData = [];

  for (let i = 0; i < reqData.images.length; i++) {
    const getHeroSecondaryImageCommand = new GetObjectCommand({
      Bucket: S3_BUCKET_NAME,
      Key: reqData.images[i],
    });

    const getSecondaryImageTagCommand = new GetObjectTaggingCommand({
      Bucket: S3_BUCKET_NAME,
      Key: reqData.images[i],
    });

    const secondaryImageUrl = await getSignedUrl(
      s3,
      getHeroSecondaryImageCommand
    );

    const secondaryImageTags = (await s3.send(getSecondaryImageTagCommand))
      .TagSet;

    responseData.push({
      imageUrl: secondaryImageUrl,
      tags: secondaryImageTags,
    });
  }
  return new Response(JSON.stringify(responseData));
};

export { POST };

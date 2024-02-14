// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SITE_HOST: string;
  readonly SITE_PORT: string;
  readonly DB_URI: string;
  readonly CF_DOMAIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      S3_BUCKET_NAME: string;
      S3_BUCKET_REGION: string;
      USER_ACCESS_KEY: string;
      USER_SECRET_ACCESS_KEY: string;
      DB_URI: string;
    }
  }
}

export {};

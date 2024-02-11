// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SITE_HOST: string;
  readonly SITE_PORT: string;
  readonly SB_URL: string;
  readonly SB_ANON_KEY: string;
  readonly CF_DOMAIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

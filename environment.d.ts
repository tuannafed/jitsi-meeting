declare namespace NodeJS {
  export interface ProcessEnv {
    readonly DOMAIN: string;
    readonly TIME_ZONE: string;
    readonly NEXT_PUBLIC_APP_URL: string;
    readonly NEXT_PUBLIC_BASE_API_IDENTITY: string;
    readonly NEXT_PUBLIC_BASE_API_COMPUTE: string;
    readonly NEXT_PUBLIC_AUTH_URL: string;
    readonly NEXT_PUBLIC_AUTH_SECRET: string;
  }
}

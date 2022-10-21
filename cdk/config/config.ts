export type LambdaConfig = {
    name: string,
    path: string
    envVars: { [key: string]: string; },
}

export type AppConfig = {
    env: string,
    appName: string,
    appAccount: string,
    region: string,
    lambda: Array<LambdaConfig>,
    tags: { [key: string]: string; },
}


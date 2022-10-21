#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { MySampleAppStack } from '../lib/stacks/my-sample-app-stack';
import { AppConfig } from '../config/config';

const app = new cdk.App();

// Fetch configuration from config file based on env value passed in cdk context

const envFromContext = app.node.tryGetContext('env');
if (envFromContext == undefined) {
  throw new Error("Provide cdk context: -c env=${ENV_NAME}")
}
const config_file = require(`../config/config-${envFromContext}.json`);
const config = <AppConfig>config_file;
if (config.env != envFromContext) {
  throw new Error("env value defined in cdk context and config file does not match")
}

// Application stack

const AppStack = new MySampleAppStack(app, 'MySampleAppStack', {
  config: config,
  env: {
    account: config.appAccount,
    region: config.region
  }
});

// Apply tags to the stack

for (let key in config.tags) {
  cdk.Tags.of(AppStack).add(key, config.tags[key])
}
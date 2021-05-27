#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { InstallEpsagonLambdaLayerStack } from '../lib/install-epsagon-lambda-layer-stack';

const app = new cdk.App();
new InstallEpsagonLambdaLayerStack(app, 'InstallEpsagonLambdaLayerStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: 'us-west-1' },
});

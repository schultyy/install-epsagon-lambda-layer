import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as InstallEpsagonLambdaLayer from '../lib/install-epsagon-lambda-layer-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new InstallEpsagonLambdaLayer.InstallEpsagonLambdaLayerStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});

import * as cdk from '@aws-cdk/core';
import * as apigateway from "@aws-cdk/aws-apigateway";
import * as lambda from "@aws-cdk/aws-lambda";
import * as path from 'path';

export class InstallEpsagonLambdaLayerStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const epsagonLayer = lambda.LayerVersion.fromLayerVersionAttributes(this, "EpsagonInstrumentation", {
      layerVersionArn: "arn:aws:lambda:us-west-1:066549572091:layer:epsagon-node-layer:305"
    });

    const handler = new lambda.Function(this, "EpsagonInstrumentationHandler", {
      runtime: lambda.Runtime.NODEJS_10_X,
      code: lambda.Code.fromAsset("resources"),
      handler: "handler.main",
      layers: [epsagonLayer]
    });

    const api = new apigateway.RestApi(this, "epsagon-api", {
      restApiName: "Epsagon Instrumentation Example",
      description: "This is an example on how to install a Lambda Layer programmatically"
    });

    const handlerIntegration = new apigateway.LambdaIntegration(handler, {
      requestTemplates: { "application/json": '{ "statusCode": "200" }' }
    });

    api.root.addMethod("GET", handlerIntegration); // GET /
  }
}

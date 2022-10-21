import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CreateLambda } from '../constructs/create-lambda';
import { AppConfig } from '../../config/config';

interface StackConfigProps extends StackProps {
  config: AppConfig;
}

export class MySampleAppStack extends Stack {
  constructor(scope: Construct, id: string, props: StackConfigProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const prefix = `${props.config.env}-${props.config.appName}`

    // Iterate over the lambda config and create lambda functions using construct
    for (const lambda of props.config.lambda) {

      new CreateLambda(this, `${prefix}-${lambda.name}-Lambda`, {
        name: `${prefix}-${lambda.name}`,
        path: lambda.path,
        envVars: lambda.envVars
      });
    }

  }
}

// Construct to create a lambda function

import fs = require('fs');
import cdk = require('constructs');
import {
    Duration,
    aws_lambda as lambda
} from 'aws-cdk-lib'


export interface CreateLambdaProps {
    name: string;
    path: string;
    envVars: { [key: string]: string; }
    
}

export class CreateLambda extends cdk.Construct {
    readonly lambdaFunction: lambda.IFunction;

    constructor(scope: cdk.Construct, id: string, props: CreateLambdaProps) {
        super(scope, id);


        const lambdaFunction = new lambda.Function(this, `${props.name}-Function`, {
            functionName: `${props.name}-Function`,
            code: new lambda.InlineCode(fs.readFileSync(`./${props.path}/lambda-handler.py`, { encoding: 'utf-8' })),
            handler: 'index.main',
            timeout: Duration.seconds(300),
            runtime: lambda.Runtime.PYTHON_3_9,
            environment: props.envVars
          });
        
        this.lambdaFunction = lambdaFunction;
    }

}
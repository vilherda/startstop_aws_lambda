const AWS = require('aws-sdk');

exports.handler = async (event) => {
    const states = { 'stop': 'running', 'start': 'stoped' };
    const state = states[event.action];
    const ec2 = new AWS.EC2({ region: event.instanceRegion });
    console.log('Execution of the process to stop EC2 instances:', JSON.stringify(event, null, 2));
    const description = await ec2.describeInstanceStatus({
        Filters: [{ Name: "instance-state-name", Values: [state] }]
    }).promise();
    const body = { success: false, message: 'can not describe the EC2 instances status' };
    if (description !== null) {
        // console.debug(description);
        const instancesIds = description.InstanceStatuses.map(instanceStatus => instanceStatus.InstanceId);
        console.info(`trying to ${event.action} EC2 instances:`, instancesIds);
        const actionParameters = { InstanceIds: instancesIds };
        var result = null;
        if (event.action === 'stop') {
            result = ec2.stopInstances(actionParameters).send();
        } else if (event.action === 'start') {
            result = ec2.startInstances(actionParameters).send();
        }
        // console.debug(result);
        body.success = true;
        body.message = `${event.action} EC2 instances action launched`;
        console.info(body.message);
    }
    // return new Promise((resolve, reject) => (body.success ? resolve({ statusCode: 200, body }) : reject({ statusCode: 200, body })));
    return { statusCode: 200, body };
};

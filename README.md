# startstop_aws_lambda

Lamda function to start and/or stop all the EC2 instances on a defined region. A payload is required and it must be compliant with the next structure:

```json
{
    "instanceRegion": "<region ID>",
    "action": "<action to execute>"
}
```

The fields:

- `instanceRegion`: String that represents the region ID where the EC2 instances are. By example `eu-central-1` (with the double quotes)
- `action`: String that represents the action to execute. The possible values are `start` and `stop` (with the double quotes)

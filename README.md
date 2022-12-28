# k6-and-slack-integration
If your company uses slack as a comunication tool, this is a Simple and straightfoward tutorial to perform his integration with k6 and see your performance test results output as a slack notification

Integration in just a few steps:

1- Access "Slack API webpage:  https://api.slack.com/ " login and click on "Create an App from Scratch";

2- Choose the name and workspace you want to use this app;

3- Choose your app's features by activating the "Incoming Webhooks" option;

4- Go to the option "Install Your App" and click on "Install to a Workspace" automatically your app will request a channel from your workspace for your app to be added;

5- After selecting the channel, go to the "App credentials" option and you will see the "Verification Token" field, copy it and paste it in the part of the code that asks for the slack api token to be added;

6- After that, go again to the "Incoming Webhooks" option on the slack API website and you will see the Webhook URL that must be replaced in the code;

7- And finally, after creating the app, adding the features and replacing the credentials, you must run the script and see the magic happen!!

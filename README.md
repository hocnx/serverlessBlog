This is my Blog: https://blog.serverless-specialist.com/


To run this app:
1. Configure your aws profile

```
$aws configure
```

2. Install node pakage
```
cd serverlessBlog
npm install
```

3. Create aws backend
```
$amplify init
? Do you want to use an existing environment? Yes
? Choose the environment you would like to use: dev
? Choose your default editor: Visual Studio Code
Using default provider  default
✔ Initialized provider successfully.
Your project has been successfully initialized and connected to the cloud!

$amplify push
```

4. Run app
```
$npm start
```

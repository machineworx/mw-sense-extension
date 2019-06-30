### QUICK START GUIDE:

Following steps are critical for the functioning of the extension
* Create your account by signing up for beta with the MachineWorks and access the cloud based AutoML platform
* You will receive an email outlining instructions to secure beta access for your credentials
* Retain the credentials for use within the extension as outlined in the instruction below

### INSTALLATION
* Download the extension from GitHub  https://github.com/machineworx/mw-sense-extension
* For QlikSense Desktop: (Tested for Feb 2019 Release)
> * Unzip or git clone the extension from github into the Extension folder of the Qliksense desktop 
> * Typical windows installation should look like 				C:\Users\<Username>\Documents\Qlik\Sense\Extensions
* For QlikSense Server:
> * Download the archived extension file mw-sense-extension-master
> * Open QMC and import the extension archive. This should allow the extension to be available as custom object within the Qliksense application

### APPLICATION USAGE:
* Open your existing QlikSense app or create a new app with training data pre-loaded
* Navigate to the Qliksense app overview and start a new sheet
* Locate the “MW-Extension” extension from the custom objects and drag/drop into the sheet
* In the property sheet of the extension, enter the following 
> * Model - Choose your desired algorithm for the model build. 
> * Default is set for AutoML. If you override the default, make sure to choose the correct algorithm for the type of the mL problem
> * For Regression, choose LinearRegression, RandomForectRegressor, DecisionTreeRegressor, XGBregressor
> * For Classification, choose LogisticRegression, RandomForectClassifier, GradientBoostClassifier, XGBClassifier
> * User Name - Your user name secured as part of the MachineWorks cloud account creation step
> * Password – Your MachineWorks account password
> * API URL – This defaults to the beta server where the model will be deployed and accessed from Qliksense. This URL need only to be changed if an on-premise solution is desired. Otherwise, leave the URL to its default. 
> * Use External – Leave this toggle to Off, if you would like to use QLIK data for training. If you prefer to bring your own training data that is not in QLIK, set this toggle to toggle off. During run time, you will be able to browse and locate the file from your local machine (NOTE: Free cloud account limits your training file size to 10mb only)

* You are now ready to train the model.  Click Done to close the sheet edit
* If “UseExternal” toggle was set to off, you will automatically be presented with all the data fields available within the Qlik application. Select your desired fields for creating the training and click “Upload”
* If UseExternal was set to On, you will be presented with “Browse” option to locate the training data file and load into the extension.  
* Upon successful upload of the training data set, the extension automatically generates univariate statistics within the explore screen. Here you have the ability to mouse over the micro chart to view additional statistics or click the chart to open a zoom view. 
* Clicking the column header will allow you to either remove with the “X” button or Identify the column as the “label to predict”. You will see the confirmation of the class selected displayed on top of the table and “Train” button is activated.
* Click train to complete the model training. Note: AutoML option is a compute intensive operation that will require atleast 2 to 3 mins to complete. Once successful, the model is deployed and ready for prediction
* You can now click “upload file for prediction” to generate batch prediction. Successful upload of the prediction file with all the required features, will activate the “Predict” button. Note: It is important that your prediction file has the exact feature names that were used in the model training step. Incomplete prediction file will result in error prompt to correct the prediction file and retry. 
* Upon successful prediction generation, you will see the message “Prediction Complete”. 
* The prediction file can be clicked to download as CSV file for further analysis

### USAGE AND LIMITATION
* MachineWorks AutoML platform supports free tier with datafile size restricted to 10MB. 
* Contact mw@machineworksai.com for usage scenarios without data file restrictions and help   
* FAQ & Training videos: https://medium.com/machine-works/automl-in-just-3-steps-51ca31527c28 
* Extension video https://youtu.be/i-wXuUhY6m8   
* MW Platform Link https://beta.machineworksai.com/

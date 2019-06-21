define( [], function () {
	'use strict';
	var userNameSetting = {
		ref: "props.username",
		label: "User Name",
		type: "string",
		expression: "optional",
		show: true,
		defaultValue: "viz.developer1@machineworksai.com"

	};

	var PasswordSetting = {
		ref: "props.password",
		label: "Password",
		type: "string",
		expression: "optional",
		show: true,
		defaultValue: "vizdeveloper123"
	};
	var ApiUrlSetting = {
		ref: "props.apiUrl",
		label: "ApiUrl",
		type: "string",
		expression: "optional",
		show: true,
		defaultValue: "https://beta.machineworksai.com:3443/"

	};
	var UseExternalSwitch= {
		type: "boolean",
		component: "switch",
		label: "UseExternal",
		ref: "props.useExternal",
		options: [{
			value: true,
			label: "On"
		}, {
			value: false,
			label: "Off"
		}],
		defaultValue: false
	};
	var ModelSelect=
	{
		type: "string",
		component: "dropdown",
		label: "Model",
		ref: "props.model",
		options: 
		[
			{
			value: "AutoML",
			label: "AutoML"
			}, 
			{
			value: "LinearRegression",
			label: "LinearRegression"
			},
			{
				value: "RandomForestRegressor",
				label: "RandomForestRegressor"
			},
			{
				value: "XGBRegressor",
				label: "XGBRegressor"
			},
			{
				value: "LogisticRegression",
				label: "LogisticRegression"
			}

		],
		defaultValue: "AutoML"
	};

	return {
		type: "items",
		component: "accordion",
		items: {


			appearance:  {
				uses: "settings",
				items: {}
			},
			additionalConfig:  {
				label: "Additional config",
				type: "items",
				items: {
					ModelSelect:ModelSelect,
					userNameSetting: userNameSetting,
					PasswordSetting :PasswordSetting,
					ApiUrlSetting :ApiUrlSetting,
					UseExternalSwitch:UseExternalSwitch
				}
			}
		},
		defaultUserName: "viz.developer1@machineworksai.com",
		defaultPassword: "vizdeveloper123"
	};
} );
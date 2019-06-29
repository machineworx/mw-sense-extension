var vJSONString;
define( [ 'jquery',"qlik",'text!./build/Group 71.png',
'text!./build/index.html','./MWEx_prop',
'text!./simpletable.css',
'css!./build/static/css/2.ecf4ef36.chunk.css',
'css!./build/static/css/main.592475fa.chunk.css',
'css!https://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css',
'./build/static/js/2.307e916c.chunk',
'./build/static/js/main.0b26208a.chunk'
/*
********************************************************************************************************

Author : MachineWorks
Description: Purpose of this extension is to leverage MachineWorks powerful code-free machine learning 
platform to automate complex compomenents of the machine learning workflow and help develop ML model using
curated data within BI platform such as QlikSense. 

Publish Date:  6/29/2019
Version: Initial Verion 1.0
Feedback/Questions:  Contact admin@machineworksai.com 

********************************************************************************************************
*/

],
function ( $, qlik, upload, mw, props,cssContent) {

	$( "<style>" ).html( cssContent ).appendTo( "head" );

	var flag1 = 1;
	var prevRadio='';
	var prevAlgorithm='';
	var prevUsername='';
	var prevPassword='';
	var prevApiUrl='';
	return {
		definition: props,
		initialProperties: {
			qListObjectDef: {
				"qDef": {
				 "qFieldDefs": [
				   "$Field"
				 ],
				 "qFieldLabels": [
				   "Dimensions"
				 ],
				 "qSortCriterias": [
				   {
					 "qSortByLoadOrder": 1
				   }
				 ]
			   },	 		
			   qShowAlternatives: true,
			   qFrequencyMode : "V",
			   qInitialDataFetch: [{
				   qWidth: 1,
				   qHeight: 1000
			   }]
			   },
			support : {
				snapshot: true,
				export: true,
				exportData : false
			}
		},
		resize: function () {
		},
		paint: function ($element, layout) {

			if(prevRadio==='')
			{
				prevRadio=layout.props.useExternal;
			}
			if(prevRadio != layout.props.useExternal)
			{
				flag1=1;
				prevRadio=layout.props.useExternal;
			}
			if(prevAlgorithm==='')
			{
				prevAlgorithm=layout.props.model;
			}
			if(prevAlgorithm != layout.props.model)
			{
				flag1=1;
				prevAlgorithm=layout.props.model;
			}
			if(prevUsername==='')
			{
				prevUsername=layout.props.username;
			}
			if(prevUsername != layout.props.username)
			{
				flag1=1;
				prevUsername=layout.props.username;
			}
			if(prevPassword==='')
			{
				prevPassword=layout.props.password;
			}
			if(prevPassword != layout.props.password)
			{
				flag1=1;
				prevPassword=layout.props.password;
			}
			if(prevApiUrl==='')
			{
				prevApiUrl=layout.props.apiUrl;
			}
			if(prevApiUrl != layout.props.apiUrl)
			{
				flag1=1;
				prevApiUrl=layout.props.apiUrl;
			}
			if (flag1 === 1) {
	
				flag1 = 0;
				var app = qlik.currApp(this);	//Openapp
				var me = this;
				var button = $('<button id="predictLoadButton" type="button" class="pull_right" style="display:none">').text('Reload');

				button.bind('click', function () {
					var app = qlik.currApp(this);
					var vSingleColumnname = '';
					var vSingleColumnValue = '';
					var vColumnName = '';
					var vColumnValue = '';
					var vApiKey = '';
					var vapiURL = '';
					var temp = '';
					var vevalmetrics = '';

					for (j in mwExtVariable.executeModelRequestPayload.features) {
						temp = mwExtVariable.executeModelRequestPayload.features[j].replace(/ /g, '').replace('(', '').replace(')', '').replace('/', '').replace(',', '');
						if (j == 0) {
							vSingleColumnname = '[' + mwExtVariable.executeModelRequestPayload.features[j] + ']';
							vSingleColumnValue = "(v" + temp + ")";
							vColumnName = '[' + mwExtVariable.executeModelRequestPayload.features[j] + ']';
							vColumnValue = '[' + mwExtVariable.executeModelRequestPayload.features[j] + ']';
						}
						else {
							vSingleColumnname += '|[' + mwExtVariable.executeModelRequestPayload.features[j] + ']';
							vSingleColumnValue += "&'|'&(v" + temp + ")";
							vColumnName += '|[' + mwExtVariable.executeModelRequestPayload.features[j] + ']';
							vColumnValue += "&'|'&[" + mwExtVariable.executeModelRequestPayload.features[j] + ']';
						}
					}
					vSingleColumnValue = '=' + vSingleColumnValue;

					app.variable.getByName('vSingleColumnName').then(function(model){
						app.variable.setStringValue('vSingleColumnName', vSingleColumnname);
					},function(errorObject){
						app.variable.create({qName: 'vSingleColumnName',qDefinition: vSingleColumnname	});
					});

					app.variable.getByName('vSingleColumnValue').then(function(model){
						app.variable.setStringValue('vSingleColumnValue', vSingleColumnValue);
					},function(errorObject){
						app.variable.create({qName: 'vSingleColumnValue',qDefinition: vSingleColumnValue	});
					});

					app.variable.getByName('vApiKey').then(function(model){
						app.variable.setStringValue('vApiKey', mwExtVariable.deployResponsePayload.apiKey);
					},function(errorObject){
						app.variable.create({qName: 'vApiKey',qDefinition: mwExtVariable.deployResponsePayload.apiKey	});
					});

					app.variable.getByName('vColumnName').then(function(model){
						app.variable.setStringValue('vColumnName', vColumnName);
					},function(errorObject){
						app.variable.create({qName: 'vColumnName',qDefinition: vColumnName	});
					});

					app.variable.getByName('vColumnValue').then(function(model){
						app.variable.setStringValue('vColumnValue', vColumnValue);
					},function(errorObject){
						app.variable.create({qName: 'vColumnValue',qDefinition: vColumnValue	});
					});

					app.variable.getByName('vapiURL').then(function(model){
						app.variable.setStringValue('vapiURL', layout.props.apiUrl);
					},function(errorObject){
						app.variable.create({qName: 'vapiURL',qDefinition: layout.props.apiUrl	});
					});

				});
				
				var html = $('<div>').append(button);
				

				$element.html(html);
				$element.append(mw);
				

				if(layout.props.useExternal===false) 
				{

				var Dim = [];
				var listobject = layout.qListObject;	
			
				
			$(document).on('click','.checkbox', function() {
			  if ($(this).is(':checked')) {
				Dim.push($(this).closest('td').next().text());
			  }
			  else
			  {
				var val = $(this).closest('td').next().text();
				var index = Dim.indexOf(val);
				if (index > -1) {
				  Dim.splice(index, 1);
				}
			  };
			});				
			$(document).on('click','.checkboxall', function() {
				Dim=[];
			  if ($(this).is(':checked')) {
			  $('.checkbox').prop('checked', true);
				self.backendApi.eachDataRow(function(rownum, row) {
					Dim.push(row[0].qText);
				});	
			  }
			  else
			  {
				$('.checkbox').prop('checked', false);
					Dim=[];
			  };
			});			
	
			$(document).on('click','#export',function() {
			//	console.log(exportJSON(Dim).then(function (x) { console.log(x)}));
			
			});

		}

		function exportJSON(selectedData) {
			return (function(hcDef) {
				return new Promise(function(dataLoaded) {
					app.createCube(hcDef).then(function(obj) {
						let colCount = obj.layout.qHyperCube.qSize.qcx || 1;
						let vMindatapages=Math.round(10000/colCount);
						(function getData(allData) {
							if (allData.length >= obj.layout.qHyperCube.qSize.qcy) dataLoaded({ dimInfo: obj.layout.qHyperCube.qDimensionInfo, data: allData });
							else {
								let pageDef = {
									qTop: allData.length, qLeft: 0, qWidth: colCount, qHeight: Math.ceil(Math.min(vMindatapages, obj.layout.qHyperCube.qSize.qcy - allData.length) / colCount)
								};
								obj.getHyperCubeData('/qHyperCubeDef', [pageDef]).then(function (dataPage) {
									if (dataPage[0].qMatrix.length > 0) getData(allData.concat(dataPage[0].qMatrix));
									else dataLoaded({ dimInfo: obj.layout.qHyperCube.qDimensionInfo, data: allData });
								})
							}
						})([])
					})
				}).then(function(data) {
					return {
						fields: data.dimInfo.map(function(d) { return d.qFallbackTitle }),
						values: data.data.map(function(row) { return row.map(function(cell) { return cell.qText }) })
					}
				})
			})
			({ qDimensions: selectedData.map(function(d) { return { qDef: { qFieldDefs: [d] } } }) }).then(function(data) {
				let jsonResponse = [];
				jsonResponse = data.values.map(function(row) {
					return row.reduce(function(record, cell, i) {
						record[data.fields[i]] = cell;
						return record
					}, {})
				})
				vJSONString = JSON.stringify(jsonResponse);
				return vJSONString;


			})
		}

		mwExtVariable.getExportedData = function(selectedData) {
			//console.log('selected Data', selectedData);
			return exportJSON(selectedData || [])
		};
		var columns = [];
		me.backendApi.eachDataRow(function(rownum, row) {
			columns.push(row[0].qText);
		});
			mwExtVariable.internalColumns = columns ;
			mwExtVariable.username = layout.props.username || '';
			mwExtVariable.password = layout.props.password || '';
			mwExtVariable.apiUrl = layout.props.apiUrl || '';
			mwExtVariable.options = this.options;
			mwExtVariable.useExternal = layout.props.useExternal || '';
            mwExtVariable.algorithm = layout.props.model || '';

			//needed for export
			return qlik.Promise.resolve();
	}

		},
		destroy: function ( ) {
			flag1=1;
		}
	};
});


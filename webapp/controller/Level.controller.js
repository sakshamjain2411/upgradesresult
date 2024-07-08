sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"./CustomerFormat",
	'sap/ui/core/util/Export',
	'sap/ui/core/util/ExportTypeCSV',
	"sap/ui/export/Spreadsheet"
], function(Controller,CustomerFormat,Export, ExportTypeCSV,Spreadsheet) {
	// "use strict";

	return Controller.extend("upgradesresult.controller.Level", {
		_selectedData: [],
		onInit: function() {
			setInterval(function() {

					if (window.location.href.split("siteId=")[1] == "146d771f-cf10-4920-9a7d-b31972423c89#Shell-home") {
						// if (self.stat == true) {} else {
						// 	jQuery.sap.includeStyleSheet("../../../../sap/fiori/zmpsaleschips/WebContent/tiles/Lpcust.css", "CUST");
						// }
						// self.stat = true;
						$(".sapUshellHeadTitle").text("Home");
					} else {
						// if (self.stat == false) {} else {
						// 	jQuery.sap.includeStyleSheet("../../../../sap/fiori/zmpsaleschips/WebContent/tiles/Lpcust2.css", "CUST");
						// }
						// self.stat = false;

						$(".sapUshellHeadTitle").text("Best Practices Usage Dashboard");
					}
				}, 100);
		
		},
		boldName : function(sName){
			if(sName!=null){
				return sName.toString().replace(/,/g, '\n');
			}
		},
		defaultname:function(sName){
			
			if(sName!=null){
			var modelAdmin = sap.ui.getCore().getModel("superadmin").getData();
			if (modelAdmin=="superadmin") {
				return sName;
			}else{
				var res = sName.slice(0, 2);
				return res+"***";
			}
			}
		},
		onAfterRendering:function(){
			var superadmin = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(superadmin, "superadmin");
			superadmin.setData("");
			
            if (sap.ushell && sap.ushell.cpv2 && sap.ushell.cpv2.services && sap.ushell.cpv2.services.cloudServices && sap.ushell.cpv2.services.cloudServices.SiteService) {

                var oLocalSiteService = sap.ushell.cpv2.services.cloudServices.SiteService();
                var oRoles = oLocalSiteService.siteModel.getProperty("/roles");
                var oProperty;


                for (oProperty in oRoles) {

                    if (oRoles.hasOwnProperty(oProperty)) {
                        if (oProperty.toString() === "SiteAdmin"){
				/// Some action based on the Test_Role
							superadmin.setData("superadmin");
                        }
                    }
                }
            }
            
			document.title = "Best Practices Dashboard";
			
			// $.sap.require('upgradesresult.control.viz');
			// this._setupSelectionList();
			
			/**
			 * default date range selection  
			 * */
			var Datetoday = new Date();
			var tDate = Datetoday.YYYYMMDD();
			var fDate = new Date();
			fDate.setMonth((fDate.getMonth() - 3));
			fDate.setDate(fDate.getDate() + 1);
			if(fDate.getDate()!=1){
				fDate.setDate(1);
			}
			
			fDate = fDate.YYYYMMDD();
			
				
			
			/** 
			 * date range functionality
			 * */
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData({
				delimiterDRS1: "~",
				dateValueDRS1: stringToDate(fDate),
				secondDateValueDRS1: stringToDate(tDate),
				dateFormatDRS1: "yyyy-MM-dd"
			});
			// sap.ui.getCore().setModel(oModel, 'dateModel');
			
			this.getView().byId("dateviewrange").setDateValue(stringToDate(fDate));
			this.getView().byId("dateviewrange").setSecondDateValue(stringToDate(tDate));
			
			var tempDateBtn = this.getView().byId("dateview").getSelectedButton().split("--")[1];
			if (tempDateBtn == "btn1Day") {
				
				var Datetoday = new Date();
				var toDate = new Date();
				toDate = toDate.YYYYMMDD();

				var fromDate = new Date();
				fromDate.setDate((fromDate.getDate() - 1) );
				// if(fromDate.getDate()!=1){
				// 	fromDate.setDate(1);
				// }
				var fromDateDay = fromDate.YYYYMMDD();

				var fromCompDate = fromDate.toISOString();
				var toCompDate = Datetoday.toISOString();
			} else if(tempDateBtn=="btn1Month"){
				var Datetoday = new Date();
				var fromDate = new Date();
				fromDate.setDate((fromDate.getDate() - 30) + 1);
				if(fromDate.getDate()!=1){
					fromDate.setDate(1);
				}
				// fromDate = fromDate.YYYYMMDD();
				
				var fromCompDate = fromDate.toISOString();
		    	var toCompDate = Datetoday.toISOString();
			}else if(tempDateBtn=="btn3Month"){
				var Datetoday = new Date();
				var fromDate = new Date();
				fromDate.setMonth((fromDate.getMonth() - 3));
				fromDate.setDate(fromDate.getDate() + 1);
				if(fromDate.getDate()!=1){
					fromDate.setDate(1);
				}
		    	
		    	var fromCompDate = fromDate.toISOString();
		    	var toCompDate = Datetoday.toISOString();
			}
			else if(tempDateBtn=="btn6Month"){
				var Datetoday = new Date();
				var fromDate = new Date();
				fromDate.setMonth((fromDate.getMonth() - 6));
				fromDate.setDate(fromDate.getDate() + 1);
				// fromDate = fromDate.YYYYMMDD();
				if(fromDate.getDate()!=1){
					fromDate.setDate(1);
				}
				
				var fromCompDate = fromDate.toISOString();
		    	var toCompDate = Datetoday.toISOString();
			}
			else if(tempDateBtn=="btn1Year"){
				var Datetoday = new Date();
				var fromDate = new Date();
				fromDate.setMonth((fromDate.getMonth() - 12));
				fromDate.setDate(fromDate.getDate() + 1);
				// fromDate = fromDate.YYYYMMDD();
				if(fromDate.getDate()!=1){
					fromDate.setDate(1);
				}
				
				var fromCompDate = fromDate.toISOString();
		    	var toCompDate = Datetoday.toISOString();
			}else if(tempDateBtn=="btn2Year"){
				var Datetoday = new Date();
				var fromDate = new Date();
				fromDate.setMonth((fromDate.getMonth() - 24));
				fromDate.setDate(fromDate.getDate() + 1);
				// fromDate = fromDate.YYYYMMDD();
				if(fromDate.getDate()!=1){
					fromDate.setDate(1);
				}
				
				var fromCompDate = fromDate.toISOString();
		    	var toCompDate = Datetoday.toISOString();
			}

			var oModelUpgradeRecruitEC = new sap.ui.model.json.JSONModel(sap.ui.require.toUrl("upgradesresult/model/EC.json"));
			oModelUpgradeRecruitEC.setSizeLimit(50000);
			sap.ui.getCore().setModel(oModelUpgradeRecruitEC, "oModelUpgradeRecruitEC");

			var oModelUpgradeRecruitSM = new sap.ui.model.json.JSONModel(sap.ui.require.toUrl("upgradesresult/model/SM.json"));
			oModelUpgradeRecruitSM.setSizeLimit(50000);
			sap.ui.getCore().setModel(oModelUpgradeRecruitSM, "oModelUpgradeRecruitSM");

			var oModelUpgradeRecruitPG = new sap.ui.model.json.JSONModel(sap.ui.require.toUrl("upgradesresult/model/PG.json"));
			oModelUpgradeRecruitPG.setSizeLimit(50000);
			sap.ui.getCore().setModel(oModelUpgradeRecruitPG, "oModelUpgradeRecruitPG");

			var oModelUpgradeRecruitCO = new sap.ui.model.json.JSONModel(sap.ui.require.toUrl("upgradesresult/model/CO.json"));
			oModelUpgradeRecruitCO.setSizeLimit(50000);
			sap.ui.getCore().setModel(oModelUpgradeRecruitCO, "oModelUpgradeRecruitCO");

			var oModelUpgradeRecruitON = new sap.ui.model.json.JSONModel(sap.ui.require.toUrl("upgradesresult/model/ON.json"));
			oModelUpgradeRecruitON.setSizeLimit(50000);
			sap.ui.getCore().setModel(oModelUpgradeRecruitON, "oModelUpgradeRecruitON");

			var oModelUpgradeRecruitREC = new sap.ui.model.json.JSONModel(sap.ui.require.toUrl("upgradesresult/model/REC.json"));
			oModelUpgradeRecruitREC.setSizeLimit(50000);
			sap.ui.getCore().setModel(oModelUpgradeRecruitREC, "oModelUpgradeRecruitREC");
	    	
			let sURL = this.getOwnerComponent().getManifestObject().resolveUri("sap/sfsf_repo/service/services.xsodata/");
			var ODataModel = new sap.ui.model.odata.ODataModel(sURL, true); // Changes made on 16/03/2017 and on 16/03/2018
			ODataModel.setDefaultCountMode(false);
			ODataModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
			this.getView().setModel(ODataModel);
			
			var oModelUpgradeRefData = new sap.ui.model.json.JSONModel();
			oModelUpgradeRefData.setSizeLimit(50000);
			sap.ui.getCore().setModel(oModelUpgradeRefData, "oModelUpgradeRefData");
			
			
			var oModelUpgradeRefDataUpgrade = new sap.ui.model.json.JSONModel();
			oModelUpgradeRefDataUpgrade.setSizeLimit(50000);
			sap.ui.getCore().setModel(oModelUpgradeRefDataUpgrade, "oModelUpgradeRefDataUpgrade");

			this.CallCustomerData(ODataModel, "", fromCompDate,toCompDate,"");
			this.loadChartBottom(ODataModel, "", fromCompDate,toCompDate);
			this.loadLineChart(ODataModel, "", fromCompDate,toCompDate);
			this.loadKPINumbers(ODataModel, "", fromCompDate,toCompDate);
			this.loadDDlVersion(ODataModel, fromCompDate,toCompDate);
			this.loadDailyChart(ODataModel,"","","");
			
			$(".hBoxUpgrade").css('height',$(window).height() - 160 + "px");
			
			this.getView().byId("tableSc").setHeight($(window).height() - 354 + "px");
			
			this.getView().byId("tableScUpgrade").setHeight($(window).height() - 489 + "px");
			
			
		},
		createColumnConfig: function() {
			var aCols = [];

			// aCols.push({
			// 	label: 'ID',
			// 	type: 'number',
			// 	property: 'UserID',
			// 	scale: 0
			// });
			
			var modelAdmin = sap.ui.getCore().getModel("superadmin").getData();
			if (modelAdmin=="superadmin") {
				aCols.push({
					property:'val',
					label: 'Company Name',
					type: 'string',
					width: '30'
				});
			}else{
				aCols.push({
					property:'Default',
					label: 'Company Name',
					type: 'string',
					width: '30'
				});
			}


			// aCols.push({
			// 	property:'val',
			// 	label: 'Company Name',
			// 	type: 'string',
			// 	width: '30'
			// });

			aCols.push({
				property:'upgradeString',
				label: 'Configuration Blocks',
				type: 'string',
				width: '30'
			});

			aCols.push({
				label:'Time Stamp (Last Run)',
				property: 'time',
				type: 'string'
			});

			return aCols;
		},
		
		createColumnConfigUpgrade: function() {
			var aCols = [];

			aCols.push({
				property:'element',
				label: 'Configuration Blocks',
				type: 'string',
				width: '30'
			});
			aCols.push({
				property:'count',
				label: 'Count',
				type: 'string',
				width: '30'
			});

			return aCols;
		},
		
		onExport: function() {
			var aCols, aProducts, oSettings, oRowBinding;
			
			if (!this._oTable) {
				this._oTable = this.byId("listTable");
			}

			oRowBinding = this._oTable.getBinding("items");
			
			var oModel = oRowBinding.getModel();
			// var oModelInterface = oModel.getInterface();

			aCols = this.createColumnConfig();
			aProducts = oModel.getProperty("/stlistUser");

			oSettings = {
				workbook: { columns: aCols },
				dataSource: aProducts,
				fileName : "Customer List.xlsx",
				showProgress : false
			};

			new Spreadsheet(oSettings)
				.build()
				.then( function() {
					new sap.m.MessageToast.show("Customer List export has finished");
			});
				
			// var aBoundProperties, aCols, oProperties, oRowBinding, oSettings, oTable, oController;

			// oController = this;

			// if (!this._oTable) {
			// 	this._oTable = this.byId("listTable");
			// }

			// oTable = this._oTable;
			// oRowBinding = oTable.getBinding("items");

			// aCols = this.createColumnConfig();

			// var oModel = oRowBinding.getModel();
			// var oModelInterface = oModel.getInterface();

			// oSettings = {
			// 	workbook: { columns: aCols },
			// 	dataSource: {
			// 		type: "oData",
			// 		dataUrl: oRowBinding.getDownloadUrl ? oRowBinding.getDownloadUrl() : null,
			// 		serviceUrl: oModelInterface.sServiceUrl,
			// 		headers: oModelInterface.getHeaders ? oModelInterface.getHeaders() : null,
			// 		count: oRowBinding.getLength ? oRowBinding.getLength() : null,
			// 		useBatch: oModelInterface.bUseBatch,
			// 		sizeLimit: oModelInterface.iSizeLimit
			// 	},
			// 	worker: false // We need to disable worker because we are using a MockServer as OData Service
			// };

			// new Spreadsheet(oSettings).build();
		},
		
		onExportList:function(){
			
			var aCols, aProducts, oSettings, oRowBinding;
			
			if (!this._oTable) {
				this._oTable = this.byId("listTableListUpgrade");
			}

			oRowBinding = this._oTable.getBinding("items");
			
			var oModel = oRowBinding.getModel();
			// var oModelInterface = oModel.getInterface();

			aCols = this.createColumnConfigUpgrade();
			aProducts = oModel.getProperty("/splist");

			oSettings = {
				workbook: { columns: aCols },
				dataSource: aProducts,
				fileName : "Configuration Block List.xlsx",
				showProgress : false
			};

			new Spreadsheet(oSettings)
				.build()
				.then( function() {
					new sap.m.MessageToast.show("Configuration Block List export has finished");
			});
		},
		
		onSearch: function(oEvt) {
			// add filter for search
			var aFilters = [];
			var sQuery = oEvt.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new sap.ui.model.Filter("val", sap.ui.model.FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}
			// update list binding
			var list = this.getView().byId("listTable");
			var binding = list.getBinding("items");
			binding.filter(aFilters, "Application");
		},
		ddlProductChanged:function(oEvt){
			
			var self = this;
			self.stat = true;
			self.state = false;
			//self.copyReq.abort();
			
			if(self.stat==true){
				var tempDateBtn = this.getView().byId("dateview").getSelectedButton().split("--")[1];
				if (tempDateBtn == "btn1Day") {
				
				var Datetoday = new Date();
				var toDate = new Date();
				toDate = toDate.YYYYMMDD();

				var fromDate = new Date();
				fromDate.setDate((fromDate.getDate() - 1) );
				// if(fromDate.getDate()!=1){
				// 	fromDate.setDate(1);
				// }
				var fromDateDay = fromDate.YYYYMMDD();

				var fromCompDate = fromDate.toISOString();
				var toCompDate = Datetoday.toISOString();
			} else if(tempDateBtn=="btn1Month"){
					var Datetoday = new Date();
					var fromDate = new Date();
					fromDate.setDate((fromDate.getDate() - 30) + 1);
					if(fromDate.getDate()!=1){
						fromDate.setDate(1);
					}
					// fromDate = fromDate.YYYYMMDD();
					
					var fromCompDate = fromDate.toISOString();
			    	var toCompDate = Datetoday.toISOString();
				}else if(tempDateBtn=="btn3Month"){
					var Datetoday = new Date();
					var fromDate = new Date();
					fromDate.setMonth((fromDate.getMonth() - 3));
					fromDate.setDate(fromDate.getDate() + 1);
					if(fromDate.getDate()!=1){
						fromDate.setDate(1);
					}
			    	
			    	var fromCompDate = fromDate.toISOString();
			    	var toCompDate = Datetoday.toISOString();
				}
				else if(tempDateBtn=="btn6Month"){
					var Datetoday = new Date();
					var fromDate = new Date();
					fromDate.setMonth((fromDate.getMonth() - 6));
					fromDate.setDate(fromDate.getDate() + 1);
					// fromDate = fromDate.YYYYMMDD();
					if(fromDate.getDate()!=1){
						fromDate.setDate(1);
					}
					
					var fromCompDate = fromDate.toISOString();
			    	var toCompDate = Datetoday.toISOString();
				}
				else if(tempDateBtn=="btn1Year"){
					var Datetoday = new Date();
					var fromDate = new Date();
					fromDate.setMonth((fromDate.getMonth() - 12));
					fromDate.setDate(fromDate.getDate() + 1);
					// fromDate = fromDate.YYYYMMDD();
					if(fromDate.getDate()!=1){
						fromDate.setDate(1);
					}
					
					var fromCompDate = fromDate.toISOString();
			    	var toCompDate = Datetoday.toISOString();
				}else if(tempDateBtn=="btn2Year"){
					var Datetoday = new Date();
					var fromDate = new Date();
					fromDate.setMonth((fromDate.getMonth() - 24));
					fromDate.setDate(fromDate.getDate() + 1);
					// fromDate = fromDate.YYYYMMDD();
					if(fromDate.getDate()!=1){
						fromDate.setDate(1);
					}
					
					var fromCompDate = fromDate.toISOString();
			    	var toCompDate = Datetoday.toISOString();
				}else{
				var fromDateVal = this.getView().byId("dateviewrange").getDateValue();
				var toDateVal = this.getView().byId("dateviewrange").getSecondDateValue();
				
				var fromCompDate = fromDateVal.toISOString();
		    	var toCompDate = toDateVal.toISOString();
			}
			}else{
				var fromDateVal = this.getView().byId("dateviewrange").getDateValue();
				var toDateVal = this.getView().byId("dateviewrange").getSecondDateValue();
				
				var fromCompDate = fromDateVal.toISOString();
		    	var toCompDate = toDateVal.toISOString();
			}
			
			var mdl = this.getView().getModel();

			// var groups = this.getView().byId("ddlVersion").getValue();
			// if (groups == "") {
			// 	this.getView().byId("ddlVersion").setValue("Build Version");
			// 	this.getView().byId("ddlVersion").setSelectedKey("Build Version");
			// }
			
			var tempKey = this.getView().byId("ddlVersion").getSelectedKey();
			if (tempKey == "Version") {
				tempKey = "";
			}
			this.showBusyIndicator(10000, 0);
			this.CallCustomerData(mdl, tempKey, fromCompDate,toCompDate,"");
			this.loadChartBottom(mdl, tempKey, fromCompDate,toCompDate);
			this.loadLineChart(mdl, tempKey, fromCompDate,toCompDate);
			this.loadKPINumbers(mdl, tempKey, fromCompDate,toCompDate);
			this.loadDailyChart(mdl,tempKey,"","");
		
		},
		
			hideBusyIndicator: function () {
			sap.ui.core.BusyIndicator.hide();
		},

		showBusyIndicator: function (iDuration, iDelay) {
			sap.ui.core.BusyIndicator.show(iDelay);

			if (iDuration && iDuration > 0) {
				if (this._sTimeoutId) {
					jQuery.sap.clearDelayedCall(this._sTimeoutId);
					this._sTimeoutId = null;
				}

				this._sTimeoutId = jQuery.sap.delayedCall(iDuration, this, function () {
					this.hideBusyIndicator();
				});
			}
		},
		
		ddlDeployChanged:function(oEvt){
			var self = this;
			self.stat = true;
			self.state = false;

			if (self.stat == true) {
				var tempDateBtn = this.getView().byId("dateview").getSelectedButton().split("--")[1];
				if (tempDateBtn == "btn1Month") {
					var Datetoday = new Date();
					var fromDate = new Date();
					fromDate.setDate((fromDate.getDate() - 30) + 1);
					// fromDate = fromDate.YYYYMMDD();
					if(fromDate.getDate()!=1){
						fromDate.setDate(1);
					}

					var fromCompDate = fromDate.toISOString();
					var toCompDateTemp = Datetoday.toISOString();
				} else if (tempDateBtn == "btn3Month") {
					var Datetoday = new Date();
					var fromDate = new Date();
					fromDate.setMonth((fromDate.getMonth() - 3));
					fromDate.setDate(fromDate.getDate() + 1);
					if(fromDate.getDate()!=1){
						fromDate.setDate(1);
					}

					var fromCompDate = fromDate.toISOString();
					var toCompDateTemp = Datetoday.toISOString();
				} else if (tempDateBtn == "btn6Month") {
					var Datetoday = new Date();
					var fromDate = new Date();
					fromDate.setMonth((fromDate.getMonth() - 6));
					fromDate.setDate(fromDate.getDate() + 1);
					if(fromDate.getDate()!=1){
						fromDate.setDate(1);
					}
					// fromDate = fromDate.YYYYMMDD();

					var fromCompDate = fromDate.toISOString();
					var toCompDateTemp = Datetoday.toISOString();
				} else if (tempDateBtn == "btn1Year") {
					var Datetoday = new Date();
					var fromDate = new Date();
					fromDate.setMonth((fromDate.getMonth() - 12));
					fromDate.setDate(fromDate.getDate() + 1);
					if(fromDate.getDate()!=1){
						fromDate.setDate(1);
					}
					// fromDate = fromDate.YYYYMMDD();

					var fromCompDate = fromDate.toISOString();
					var toCompDateTemp = Datetoday.toISOString();
				} else if (tempDateBtn == "btn2Year") {
					var Datetoday = new Date();
					var fromDate = new Date();
					fromDate.setMonth((fromDate.getMonth() - 24));
					fromDate.setDate(fromDate.getDate() + 1);
					if(fromDate.getDate()!=1){
						fromDate.setDate(1);
					}
					// fromDate = fromDate.YYYYMMDD();

					var fromCompDate = fromDate.toISOString();
					var toCompDateTemp = Datetoday.toISOString();
				} else {
					var fromDateVal = this.getView().byId("dateviewrange").getDateValue();
					var toDateVal = this.getView().byId("dateviewrange").getSecondDateValue();
	
					var fromCompDate = fromDateVal.toISOString();
					var toCompDateTemp = toDateVal.toISOString();
				}
			} else {
				var fromDateVal = this.getView().byId("dateviewrange").getDateValue();
				var toDateVal = this.getView().byId("dateviewrange").getSecondDateValue();

				var fromCompDate = fromDateVal.toISOString();
				var toCompDateTemp = toDateVal.toISOString();
			}

			var mdl = this.getView().getModel();

			// var groups = this.getView().byId("ddlVersion").getValue();
			// if (groups == "") {
			// 	this.getView().byId("ddlVersion").setValue("Build Version");
			// 	this.getView().byId("ddlVersion").setSelectedKey("Build Version");
			// }
			
			var tempKey = this.getView().byId("ddlVersion").getSelectedKey();
			if (tempKey == "Version") {
				tempKey = "";
			}

			fromCompDate = fromCompDate.split("T")[0]+"T00:00";
			toCompDateTemp = toCompDateTemp.split("T")[0]+"T24:00";
			var tempDateTo = (new Date(toCompDateTemp)).getDate();
			var d = new Date(toCompDateTemp);
			d.setDate(tempDateTo);
			var toCompDate = d.toISOString();
			toCompDate = toCompDate.split("T")[0]+"T24:00";

			var tempKey = this.getView().byId("ddlVersion").getSelectedKey();
			if(tempKey!="Version"&&tempKey!="b1808/"&&tempKey!="b1811/"&&tempKey!="b1902/"&&tempKey!="b1905/"&&tempKey!="b1908/"&&tempKey!="b1911/"&&tempKey!="b2002/"&&tempKey!="b2005/"&&tempKey!="b2008/"&&tempKey!="b2011/"&&tempKey!=""){
				this.getView().byId("ddlProd").setSelectedKey("EC");
				this.getView().byId("ddlProd").setEnabled(false);
			}else{
				this.getView().byId("ddlProd").setSelectedKey("All");
				this.getView().byId("ddlProd").setEnabled(true);
			}
			if (tempKey == "Version") {
				tempKey = "";
			}
			
			this.showBusyIndicator(10000, 0);
			this.CallCustomerData(mdl, tempKey, fromCompDate,toCompDate,"");
			this.loadChartBottom(mdl, tempKey, fromCompDate,toCompDate);
			this.loadLineChart(mdl, tempKey, fromCompDate,toCompDate);
			this.loadKPINumbers(mdl, tempKey, fromCompDate,toCompDate);
			
			
			
		
		},


		
		ddlVersionChanged: function() {
			var self = this;
			self.stat = true;
			self.state = false;
			
			//self.copyReq.abort();
			
			if(self.stat==true){
				var tempDateBtn = this.getView().byId("dateview").getSelectedButton().split("--")[1];
				if (tempDateBtn == "btn1Day") {
				
				var Datetoday = new Date();
				var toDate = new Date();
				toDate = toDate.YYYYMMDD();

				var fromDate = new Date();
				fromDate.setDate((fromDate.getDate() - 1) );
				// if(fromDate.getDate()!=1){
				// 	fromDate.setDate(1);
				// }
				var fromDateDay = fromDate.YYYYMMDD();

				var fromCompDate = fromDate.toISOString();
				var toCompDate = Datetoday.toISOString();
			} else if(tempDateBtn=="btn1Month"){
					var Datetoday = new Date();
					var fromDate = new Date();
					fromDate.setDate((fromDate.getDate() - 30) + 1);
					if(fromDate.getDate()!=1){
						fromDate.setDate(1);
					}
					// fromDate = fromDate.YYYYMMDD();
					
					var fromCompDate = fromDate.toISOString();
			    	var toCompDate = Datetoday.toISOString();
				}else if(tempDateBtn=="btn3Month"){
					var Datetoday = new Date();
					var fromDate = new Date();
					fromDate.setMonth((fromDate.getMonth() - 3));
					fromDate.setDate(fromDate.getDate() + 1);
					if(fromDate.getDate()!=1){
						fromDate.setDate(1);
					}
			    	
			    	var fromCompDate = fromDate.toISOString();
			    	var toCompDate = Datetoday.toISOString();
				}
				else if(tempDateBtn=="btn6Month"){
					var Datetoday = new Date();
					var fromDate = new Date();
					fromDate.setMonth((fromDate.getMonth() - 6));
					fromDate.setDate(fromDate.getDate() + 1);
					// fromDate = fromDate.YYYYMMDD();
					if(fromDate.getDate()!=1){
						fromDate.setDate(1);
					}
					
					var fromCompDate = fromDate.toISOString();
			    	var toCompDate = Datetoday.toISOString();
				}
				else if(tempDateBtn=="btn1Year"){
					var Datetoday = new Date();
					var fromDate = new Date();
					fromDate.setMonth((fromDate.getMonth() - 12));
					fromDate.setDate(fromDate.getDate() + 1);
					// fromDate = fromDate.YYYYMMDD();
					if(fromDate.getDate()!=1){
						fromDate.setDate(1);
					}
					
					var fromCompDate = fromDate.toISOString();
			    	var toCompDate = Datetoday.toISOString();
				}else if(tempDateBtn=="btn2Year"){
					var Datetoday = new Date();
					var fromDate = new Date();
					fromDate.setMonth((fromDate.getMonth() - 24));
					fromDate.setDate(fromDate.getDate() + 1);
					// fromDate = fromDate.YYYYMMDD();
					if(fromDate.getDate()!=1){
						fromDate.setDate(1);
					}
					
					var fromCompDate = fromDate.toISOString();
			    	var toCompDate = Datetoday.toISOString();
				}else{
				var fromDateVal = this.getView().byId("dateviewrange").getDateValue();
				var toDateVal = this.getView().byId("dateviewrange").getSecondDateValue();
				
				var fromCompDate = fromDateVal.toISOString();
		    	var toCompDate = toDateVal.toISOString();
			}
			}else{
				var fromDateVal = this.getView().byId("dateviewrange").getDateValue();
				var toDateVal = this.getView().byId("dateviewrange").getSecondDateValue();
				
				var fromCompDate = fromDateVal.toISOString();
		    	var toCompDate = toDateVal.toISOString();
			}
			
			var mdl = this.getView().getModel();

			// var groups = this.getView().byId("ddlVersion").getValue();
			// if (groups == "") {
			// 	this.getView().byId("ddlVersion").setValue("Build Version");
			// 	this.getView().byId("ddlVersion").setSelectedKey("Build Version");
			// }
			// var tempKey = this.getView().byId("ddlVersion").getSelectedKey();
			// if (tempKey == "Version") {
			// 	tempKey = "";
			// }
			
			var tempKey = this.getView().byId("ddlVersion").getSelectedKey();
			if(tempKey!="Version"&&tempKey!="b1808/"&&tempKey!="b1811/"&&tempKey!="b1902/"&&tempKey!="b1905/"&&tempKey!="b1908/"&&tempKey!="b1911/"&&tempKey!="b2002/"&&tempKey!="b2005/"&&tempKey!="b2008/"&&tempKey!="b2011/"&&tempKey!=""){
				this.getView().byId("ddlProd").setSelectedKey("EC");
				this.getView().byId("ddlProd").setEnabled(false);
			}else{
				this.getView().byId("ddlProd").setSelectedKey("All");
				this.getView().byId("ddlProd").setEnabled(true);
			}
			if (tempKey == "Version") {
				tempKey = "";
			}
			
			
			var oModelUpgradeRefData = new sap.ui.model.json.JSONModel();
			oModelUpgradeRefData.setSizeLimit(50000);
			sap.ui.getCore().setModel(oModelUpgradeRefData, "oModelUpgradeRefData");
			
			
			var oModelUpgradeRefDataUpgrade = new sap.ui.model.json.JSONModel();
			oModelUpgradeRefDataUpgrade.setSizeLimit(50000);
			sap.ui.getCore().setModel(oModelUpgradeRefDataUpgrade, "oModelUpgradeRefDataUpgrade");
			
			this.showBusyIndicator(10000, 0);
			
			this.CallCustomerData(mdl, tempKey, fromCompDate,toCompDate,"");
			this.loadChartBottom(mdl, tempKey, fromCompDate,toCompDate);
			this.loadLineChart(mdl, tempKey, fromCompDate,toCompDate);
			this.loadKPINumbers(mdl, tempKey, fromCompDate,toCompDate);
			this.loadDailyChart(mdl,tempKey,"","");
		},
		ddlSPChanged: function(oEvent) {
			
			
			var _temp1 = "";
			var _temp2 = "";
			
			var fillBP = "";
			var fillBPAry = [];
			var tmpStrg = "";
			var self = this;
			this.getView().byId("searchfield").setValue("");
			//self.copyReq.abort();
			
			if (this.getView().byId("ddlSP").getSelectedKeys().length == 0) {
				this.getView().byId("ddlSP").setSelectedKeys("All");
				fillBP = "";
			} else if (this.getView().byId("ddlSP").getSelectedKeys().length == 1) {
				var tempArray = this.getView().byId("ddlSP").getSelectedKeys();
				if (tempArray.indexOf("All") > -1) {
					fillBP = "";
				} else {
					// tempStr = JSON.stringify(sap.ui.getCore().byId("ddlSP").getSelectedKeys());
					// _temp1 = (tempStr.split("[")[1]).split("]")[0];
					// _temp2 = _temp1.replace(/("|')/g, "'");
					// that._tempT = _temp2.replace(/,/g, "','");
					
					for(var q=0;q<tempArray.length;q++){
						if(q==tempArray.length-1){
							fillBPAry.push("UPGRADE_ELEMENT eq '"+tempArray[q]+"'");
						}else{
							fillBPAry.push("UPGRADE_ELEMENT eq '"+tempArray[q]+"' or ");
						}
						
					}
					tmpStrg = JSON.stringify(fillBPAry);
					_temp1 = (tmpStrg.split("[")[1]).split("]")[0];
					_temp2 = _temp1.replace(/"/g,"");
					fillBP = _temp2.replace(/,/g,"");

				}
			} else {
				var tempArray = this.getView().byId("ddlSP").getSelectedKeys();
				if (tempArray.indexOf("All") == 0) {
					tempArray.splice(tempArray.indexOf("All"), 1);
					// tempStr = JSON.stringify(tempArray);
					// _temp1 = (tempStr.split("[")[1]).split("]")[0];
					// _temp2 = _temp1.replace(/("|')/g, "'");
					// that._tempT = _temp2.replace(/,/g, "','");
					
					for(var q=0;q<tempArray.length;q++){
						if(q==tempArray.length-1){
							fillBPAry.push("UPGRADE_ELEMENT eq '"+tempArray[q]+"'");
						}else{
							fillBPAry.push("UPGRADE_ELEMENT eq '"+tempArray[q]+"' or ");
						}
						
					}
					tmpStrg = JSON.stringify(fillBPAry);
					_temp1 = (tmpStrg.split("[")[1]).split("]")[0];
					_temp2 = _temp1.replace(/"/g,"");
					fillBP = _temp2.replace(/,/g,"");

					this.getView().byId("ddlSP").setSelectedKeys(tempArray);

				} else if (tempArray.indexOf("All") > 0) {
					this.getView().byId("ddlSP").setSelectedKeys("All");
					fillBP = "";
				} else {
					// tempStr = JSON.stringify(tempArray);
					// _temp1 = (tempStr.split("[")[1]).split("]")[0];
					// _temp2 = _temp1.replace(/("|')/g, "'");
					// that._tempT = _temp2.replace(/,/g, "','");
					
					
					for(var q=0;q<tempArray.length;q++){
						if(q==tempArray.length-1){
							fillBPAry.push("UPGRADE_ELEMENT eq '"+tempArray[q]+"'");
						}else{
							fillBPAry.push("UPGRADE_ELEMENT eq '"+tempArray[q]+"' or ");
						}
						
					}
					tmpStrg = JSON.stringify(fillBPAry);
					_temp1 = (tmpStrg.split("[")[1]).split("]")[0];
					_temp2 = _temp1.replace(/"/g,"");
					fillBP = _temp2.replace(/,/g,"");
				}

			}
			
			
			self.stat = true;
			self.state = false;
			
			if(self.stat==true){
				var tempDateBtn = this.getView().byId("dateview").getSelectedButton().split("--")[1];
				if (tempDateBtn == "btn1Day") {
				
				var Datetoday = new Date();
				var toDate = new Date();
				toDate = toDate.YYYYMMDD();

				var fromDate = new Date();
				fromDate.setDate((fromDate.getDate() - 1) );
				// if(fromDate.getDate()!=1){
				// 	fromDate.setDate(1);
				// }
				var fromDateDay = fromDate.YYYYMMDD();

				var fromCompDate = fromDate.toISOString();
				var toCompDate = Datetoday.toISOString();
			} else if(tempDateBtn=="btn1Month"){
					var Datetoday = new Date();
					var fromDate = new Date();
					fromDate.setDate((fromDate.getDate() - 30) + 1);
					if(fromDate.getDate()!=1){
						fromDate.setDate(1);
					}
					// fromDate = fromDate.YYYYMMDD();
					
					var fromCompDate = fromDate.toISOString();
			    	var toCompDate = Datetoday.toISOString();
				}else if(tempDateBtn=="btn3Month"){
					var Datetoday = new Date();
					var fromDate = new Date();
					fromDate.setMonth((fromDate.getMonth() - 3));
					fromDate.setDate(fromDate.getDate() + 1);
					if(fromDate.getDate()!=1){
						fromDate.setDate(1);
					}
			    	
			    	var fromCompDate = fromDate.toISOString();
			    	var toCompDate = Datetoday.toISOString();
				}
				else if(tempDateBtn=="btn6Month"){
					var Datetoday = new Date();
					var fromDate = new Date();
					fromDate.setMonth((fromDate.getMonth() - 6));
					fromDate.setDate(fromDate.getDate() + 1);
					// fromDate = fromDate.YYYYMMDD();
					if(fromDate.getDate()!=1){
						fromDate.setDate(1);
					}
					
					var fromCompDate = fromDate.toISOString();
			    	var toCompDate = Datetoday.toISOString();
				}
				else if(tempDateBtn=="btn1Year"){
					var Datetoday = new Date();
					var fromDate = new Date();
					fromDate.setMonth((fromDate.getMonth() - 12));
					fromDate.setDate(fromDate.getDate() + 1);
					// fromDate = fromDate.YYYYMMDD();
					if(fromDate.getDate()!=1){
						fromDate.setDate(1);
					}
					
					var fromCompDate = fromDate.toISOString();
			    	var toCompDate = Datetoday.toISOString();
				}else if(tempDateBtn=="btn2Year"){
					var Datetoday = new Date();
					var fromDate = new Date();
					fromDate.setMonth((fromDate.getMonth() - 24));
					fromDate.setDate(fromDate.getDate() + 1);
					// fromDate = fromDate.YYYYMMDD();
					if(fromDate.getDate()!=1){
						fromDate.setDate(1);
					}
					
					var fromCompDate = fromDate.toISOString();
			    	var toCompDate = Datetoday.toISOString();
				}
			}else{
				var fromDateVal = this.getView().byId("dateviewrange").getDateValue();
				var toDateVal = this.getView().byId("dateviewrange").getSecondDateValue();
				
				var fromCompDate = fromDateVal.toISOString();
		    	var toCompDate = toDateVal.toISOString();
			}
			
			var mdl = this.getView().getModel();

			// var groups = this.getView().byId("ddlVersion").getValue();
			// if (groups == "") {
			// 	this.getView().byId("ddlVersion").setValue("Build Version");
			// 	this.getView().byId("ddlVersion").setSelectedKey("Build Version");
			// }
			// var tempKey = this.getView().byId("ddlVersion").getSelectedKey();
			// if (tempKey == "Version") {
			// 	tempKey = "";
			// }
			var tempKey = this.getView().byId("ddlVersion").getSelectedKey();
			if(tempKey!="Version"&&tempKey!="b1808/"&&tempKey!="b1811/"&&tempKey!="b1902/"&&tempKey!="b1905/"&&tempKey!="b1908/"&&tempKey!="b1911/"&&tempKey!="b2002/"&&tempKey!="b2005/"&&tempKey!="b2008/"&&tempKey!="b2011/"&&tempKey!=""){
				this.getView().byId("ddlProd").setSelectedKey("EC");
				this.getView().byId("ddlProd").setEnabled(false);
			}else{
				this.getView().byId("ddlProd").setSelectedKey("All");
				this.getView().byId("ddlProd").setEnabled(true);
			}
			if (tempKey == "Version") {
				tempKey = "";
			}
			
			this.showBusyIndicator(10000, 0);
			
			this.CallCustomerData(mdl, tempKey, fromCompDate,toCompDate,fillBP);

		},
		
		UpdateGUIGraphsdate:function(oEvent){
			var self = this;
			self.stat = true;
			self.state = false;
			//self.copyReq.abort();
			
			var tempDateBtn = (oEvent.getParameters().id).split("--")[1];
			// var tempDateBtn = this.getView().byId("dateview").getSelectedButton().split("--")[1];
			if (tempDateBtn == "btn1Day") {
				
				var Datetoday = new Date();
				var toDate = new Date();
				toDate = toDate.YYYYMMDD();

				var fromDate = new Date();
				fromDate.setDate((fromDate.getDate() - 1) );
				// if(fromDate.getDate()!=1){
				// 	fromDate.setDate(1);
				// }
				var fromDateDay = fromDate.YYYYMMDD();

				var fromCompDate = fromDate.toISOString();
				var toCompDate = Datetoday.toISOString();
			} else if(tempDateBtn=="btn1Month"){
				var Datetoday = new Date();
				var toDate = new Date();
				toDate = toDate.YYYYMMDD();
				
				var fromDate = new Date();
				fromDate.setDate((fromDate.getDate() - 30) + 1);
				if(fromDate.getDate()!=1){
					fromDate.setDate(1);
				}
				
				var fromDateDay = fromDate.YYYYMMDD();
				
				var fromCompDate = fromDate.toISOString();
		    	var toCompDate = Datetoday.toISOString();
			}else if(tempDateBtn=="btn3Month"){
				var Datetoday = new Date();
				var toDate = new Date();
				toDate = toDate.YYYYMMDD();
				
				var fromDate = new Date();
				fromDate.setMonth((fromDate.getMonth() - 3));
				fromDate.setDate(fromDate.getDate() + 1);
				if(fromDate.getDate()!=1){
					fromDate.setDate(1);
				}
		    	var fromDateDay = fromDate.YYYYMMDD();
		    	
		    	var fromCompDate = fromDate.toISOString();
		    	var toCompDate = Datetoday.toISOString();
			}
			else if(tempDateBtn=="btn6Month"){
				var Datetoday = new Date();
				var toDate = new Date();
				toDate = toDate.YYYYMMDD();
				
				var fromDate = new Date();
				fromDate.setMonth((fromDate.getMonth() - 6));
				fromDate.setDate(fromDate.getDate() + 1);
				if(fromDate.getDate()!=1){
					fromDate.setDate(1);
				}
				
				var fromDateDay = fromDate.YYYYMMDD();
				
				var fromCompDate = fromDate.toISOString();
		    	var toCompDate = Datetoday.toISOString();
			}
			else if(tempDateBtn=="btn1Year"){
				var Datetoday = new Date();
				var toDate = new Date();
				toDate = toDate.YYYYMMDD();
				
				var fromDate = new Date();
				fromDate.setMonth((fromDate.getMonth() - 12));
				fromDate.setDate(fromDate.getDate() + 1);
				if(fromDate.getDate()!=1){
					fromDate.setDate(1);
				}
				var fromDateDay = fromDate.YYYYMMDD();
				
				var fromCompDate = fromDate.toISOString();
		    	var toCompDate = Datetoday.toISOString();
			}else if(tempDateBtn=="btn2Year"){
				var Datetoday = new Date();
				var toDate = new Date();
				toDate = toDate.YYYYMMDD();
				
				var fromDate = new Date();
				fromDate.setMonth((fromDate.getMonth() - 24));
				fromDate.setDate(fromDate.getDate() + 1);
				if(fromDate.getDate()!=1){
					fromDate.setDate(1);
				}
				var fromDateDay = fromDate.YYYYMMDD();
				
				var fromCompDate = fromDate.toISOString();
		    	var toCompDate = Datetoday.toISOString();
			}
			this.getView().byId("dateviewrange").setDateValue(stringToDate(fromDateDay));
			this.getView().byId("dateviewrange").setSecondDateValue(stringToDate(toDate));
			
			var mdl = this.getView().getModel();
			var tempKey = this.getView().byId("ddlVersion").getSelectedKey();
			if (tempKey == "Version") {
				tempKey = "";
			}
			
			this.showBusyIndicator(10000, 0);
			this.CallCustomerData(mdl, tempKey, fromCompDate,toCompDate,"");
			this.loadChartBottom(mdl, tempKey, fromCompDate,toCompDate);
			this.loadLineChart(mdl, tempKey, fromCompDate,toCompDate);
			this.loadKPINumbers(mdl, tempKey, fromCompDate,toCompDate);

		},
		
		UpdateDateRange:function(oEvent){
			var self = this;
			self.stat = false;
			self.state = true;
			//self.copyReq.abort();
			
			this.getView().byId("dateview").setSelectedButton("0");
			// var d = this.getView().byId("dateview").getSelectedButton();
			var fromDateVal = this.getView().byId("dateviewrange").getDateValue();
			var fromDate = fromDateVal.YYYYMMDD();
			var toDateVal = this.getView().byId("dateviewrange").getSecondDateValue();
			var toDate = toDateVal.YYYYMMDD();
			var tempDateToday = new Date();
			var tempDateToday = tempDateToday.YYYYMMDD();
			if (fromDate > tempDateToday) {
				oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
			} else if (toDate > tempDateToday) {
				oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
			} else {
				oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
			}
			
			this.getView().byId("dateviewrange").setDateValue(stringToDate(fromDate));
			this.getView().byId("dateviewrange").setSecondDateValue(stringToDate(toDate));
			
			// var fromCompDate = fromDateVal.toISOString();
		 //   var toCompDate = toDateVal.toISOString();
		    
		    var fromCompDate = fromDateVal.toISOString();
		    fromCompDate = fromCompDate.split("T")[0] + "T00:00";
			var toCompDateTemp = toDateVal.toISOString();
			var tempDateTo = (new Date(toCompDateTemp)).getDate();
			var d = new Date(toCompDateTemp);
			d.setDate(tempDateTo);
			var toCompDate = d.toISOString();
			toCompDate = toCompDate.split("T")[0] + "T24:00";
			
			var mdl = this.getView().getModel();
			var tempKey = this.getView().byId("ddlVersion").getSelectedKey();
			if (tempKey == "Version") {
				tempKey = "";
			}
			
			this.showBusyIndicator(10000, 0);
			this.CallCustomerData(mdl, tempKey, fromCompDate,toCompDate,"");
			this.loadChartBottom(mdl, tempKey, fromCompDate,toCompDate);
			this.loadLineChart(mdl, tempKey, fromCompDate,toCompDate);
			this.loadKPINumbers(mdl, tempKey, fromCompDate,toCompDate);

		},
		
		
		loadDDlVersion: function(mdl) {

			var me = this;
			var url =
				"/UpgradeCenterResult?$select=COMPANYSCHEMA,COMPANY,FILEVERSION&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and not substringof('sfsales',COMPANYSCHEMA) and FILEVERSION ne '' and COMPANY ne 'BPMCINSTANCE1' and COMPANY ne 'BPMCINSTANCE4' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering'";

			// mdl.read(
			// 	url,
			// 	null, null, true,
			// 	function(oData, oResponse) {
			// 		if (oData.results.length > 0) {

			// 			var oModelVersion = new sap.ui.model.json.JSONModel();
			// 			oModelVersion.setSizeLimit(1000);
			// 			sap.ui.getCore().setModel(oModelVersion, "oModelVersion");

			// 			var tempData = [];
			// 			for (var q = 0; q < oData.results.length; q++) {
			// 				// if(oData.results[q].COMPANY=="CRUZ ROJA ESPAÑOLA"){
			// 				// 	oData.results[q].COMPANY="CRUZ ROJA ESPAÑOLA DESARROLLO";
			// 				// }
			// 				// if(oData.results[q].COMPANY=="Release"){
			// 				// 	oData.results[q].COMPANY="Stericycle Inc (de)";
			// 				// }
							
			// 				// if(oData.results[q].COMPANY!="BPMCINSTANCE4" && oData.results[q].COMPANY!="BPMCINSTANCE1"){
			// 				// 	if (oData.results[q].COMPANYSCHEMA!=null && oData.results[q].COMPANYSCHEMA.toLowerCase().indexOf("sfsales")==-1) {
			// 						// if(oData.results[q].COMPANYSCHEMA.toLowerCase().indexOf("sfv4")>-1 || oData.results[q].COMPANYSCHEMA.toLowerCase().indexOf("stockpm172200_ref2") > -1 || oData.results[q].COMPANYSCHEMA.toLowerCase().indexOf("hanapm")>-1 || oData.results[q].COMPANYSCHEMA.toLowerCase().indexOf("stg")>-1 || oData.results[q].COMPANYSCHEMA.toLowerCase().indexOf("dc")>-1){
			// 							if (oData.results[q].FILEVERSION != "") {
			// 								if (oData.results[q].FILEVERSION != null) {
			// 									tempData.push({
			// 										version: oData.results[q].FILEVERSION.split("b")[1].split("/")[0],
			// 										versionPara: oData.results[q].FILEVERSION
			// 									});
			// 								}
			// 							}
			// 						// }	
			// 				// 	}
			// 				// }
			// 			}

			// 			var uniqueVersion = tempData.reduce(function(item, e1) {
			// 				var matches = item.filter(function(e2) {
			// 					return e1.version == e2.version;
			// 				});
			// 				if (matches.length == 0) {
			// 					item.push(e1);
			// 				}
			// 				return item;
			// 			}, []);
			// 			uniqueVersion.sort(function(a, b) {
			// 				return (a.version > b.version) ? 1 : ((b.version > a.version) ? -1 : 0);
			// 			});
			// 			uniqueVersion = uniqueVersion.reverse();
						

			// 			uniqueVersion.unshift({
			// 				version: "Build Version",
			// 				versionPara: "Version"
			// 			});

			// 			var oDataGrp = {
			// 				"stlist": uniqueVersion
			// 			};

			// 			oModelVersion.setData(oDataGrp);
			// 			me.getView().byId("ddlVersion").setModel(oModelVersion);

			// 		}else{
			// 			var oModelVersion = new sap.ui.model.json.JSONModel();
			// 			oModelVersion.setSizeLimit(1000);
			// 			sap.ui.getCore().setModel(oModelVersion, "oModelVersion");

			// 			var oDataGrp = {
			// 				"stlist": []
			// 			};

			// 			oModelVersion.setData(oDataGrp);
			// 			me.getView().byId("ddlVersion").setModel(oModelVersion);
			// 		}
			// 	},
			// 	function(oError) {
			// 		console.log("Error 127");
			// 	});
				
				
				var oModelVersion = new sap.ui.model.json.JSONModel();
						oModelVersion.setSizeLimit(1000);
						sap.ui.getCore().setModel(oModelVersion, "oModelVersion");
						var uniqueVersion = [{
							version: "Build Version",
							versionPara: "Version"
						},{
							version: "2111",
							versionPara: "b2111/"
						},{
							version: "2105",
							versionPara: "b2105/"
						},{
							version: "2011",
							versionPara: "b2011/"
						},{
							version: "2005",
							versionPara: "b2005/"
						},{
							version: "1911",
							versionPara: "b1911"
						},{
							version: "1908",
							versionPara: "b1908/"
						},{
							version: "1905",
							versionPara: "b1905/"
						},{
							version: "1902",
							versionPara: "b1902/"
						},{
							version: "1811",
							versionPara: "b1811/"
						},{
							version: "1808",
							versionPara: "b1808/"
						},{
							version: "1805",
							versionPara: "b1805/"
						},{
							version: "1802",
							versionPara: "b1802/"
						},{
							version: "1711",
							versionPara: "b1711/"
						},{
							version: "1708",
							versionPara: "b1708/"
						},{
							version: "1705",
							versionPara: "b1705/"
						}];
						

						var oDataGrp = {
							"stlist": uniqueVersion
						};

						oModelVersion.setData(oDataGrp);
						me.getView().byId("ddlVersion").setModel(oModelVersion);

		},
		CallCustomerData: function(mdl, para, fromCompDate,toCompDate,fillBP) {
			var tempTestAry = [];
			var me = this;
			var tempODATAPreCheck = [];
			var tempODATAPreCheckFilter = [];
			// var oModelUpgradeRecruitData = sap.ui.getCore().getModel("oModelUpgradeRecruit").getData();
			var deployKey = me.getView().byId("ddlDeploy").getSelectedKey();
			
			var datatempoModelUpgradeRecruitON = sap.ui.getCore().getModel("oModelUpgradeRecruitON").getData();
			var datatempoModelUpgradeRecruitREC = sap.ui.getCore().getModel("oModelUpgradeRecruitREC").getData();
			var datatempoModelUpgradeRecruitSM = sap.ui.getCore().getModel("oModelUpgradeRecruitSM").getData();
			var datatempoModelUpgradeRecruitPG = sap.ui.getCore().getModel("oModelUpgradeRecruitPG").getData();
			var datatempoModelUpgradeRecruitCO = sap.ui.getCore().getModel("oModelUpgradeRecruitCO").getData();
			var datatempoModelUpgradeRecruitEC = sap.ui.getCore().getModel("oModelUpgradeRecruitEC").getData();
			
			
			if(fillBP==""){
				if (para != "") {
					if(deployKey=="All"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"'";
					}else if(deployKey=="CUST"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and substringof('_',UPGRADE_ELEMENT) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"'";
					}else{
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and indexof(UPGRADE_ELEMENT,'_') eq -1  and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"'";
					}
					
					// var url =
					// 	"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
					// 	para + "' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"'";
				} else {
					
					if(deployKey=="All"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"'";
					}else if(deployKey=="CUST"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and substringof('_',UPGRADE_ELEMENT) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"'";
					}else{
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and indexof(UPGRADE_ELEMENT,'_') eq -1  and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"'";
					}
					
					
					// var url =
					// 	"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"'";
				}
			}else{
				if (para != "") {
					
					if(deployKey=="All"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and not substringof('sfsales',COMPANYSCHEMA) and COMPANY ne 'BPMCINSTANCE1' and COMPANY ne 'BPMCINSTANCE4' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"' and "+fillBP;
					}else if(deployKey=="CUST"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and substringof('_',UPGRADE_ELEMENT) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and not substringof('sfsales',COMPANYSCHEMA) and COMPANY ne 'BPMCINSTANCE1' and COMPANY ne 'BPMCINSTANCE4' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"' and "+fillBP;
					}else{
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and indexof(UPGRADE_ELEMENT,'_') eq -1  and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and not substringof('sfsales',COMPANYSCHEMA) and COMPANY ne 'BPMCINSTANCE1' and COMPANY ne 'BPMCINSTANCE4' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"' and "+fillBP;
					}
					
					// var url =
					// 	"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
					// 	para + "' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"' and "+fillBP;
				} else {
					
					if(deployKey=="All"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and not substringof('sfsales',COMPANYSCHEMA) and COMPANY ne 'BPMCINSTANCE1' and COMPANY ne 'BPMCINSTANCE4' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"' and "+fillBP;
					}else if(deployKey=="CUST"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and substringof('_',UPGRADE_ELEMENT) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and not substringof('sfsales',COMPANYSCHEMA) and COMPANY ne 'BPMCINSTANCE1' and COMPANY ne 'BPMCINSTANCE4' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"' and "+fillBP;
					}else{
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and indexof(UPGRADE_ELEMENT,'_') eq -1  and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and not substringof('sfsales',COMPANYSCHEMA) and COMPANY ne 'BPMCINSTANCE1' and COMPANY ne 'BPMCINSTANCE4' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"' and "+fillBP;
					}
					
					// var url =
					// 	"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"' and "+fillBP;
				}
			}
			
			//console.log(url);
			mdl.read(
				url,
				null, null, true,
				function(oData, oResponse) {
					if(oData.results.length>0){
						
						tempODATAPreCheck = oData.results;
						
						for (var q = 0; q < tempODATAPreCheck.length; q++) {
							
							var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
							var lastItem = majorBlk[majorBlk.length-1];
							if(lastItem.length!=32){
								
							if(me.getView().byId("ddlProd").getSelectedKey()=="All"){
							
								
									tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="RM"){
			
									for(var a2=0;a2<datatempoModelUpgradeRecruitREC.length;a2++){
										
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
											
										
											if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitREC[a2].UPGRADE_ELEMENT){
													// if(datatempoModelUpgradeRecruitREC[a2].PRODUCT=="Recruiting"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitREC[a2].UPGRADE_ELEMENT){
													// if(datatempoModelUpgradeRecruitREC[a2].PRODUCT=="Recruiting"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitREC[a2].UPGRADE_ELEMENT){
													// if(datatempoModelUpgradeRecruitREC[a2].PRODUCT=="Recruiting"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="SM"){
									for(var a2=0;a2<datatempoModelUpgradeRecruitSM.length;a2++){
										
			// 							
										
										
											if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
												
										
											if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitSM[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Succession Management"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitSM[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Succession Management"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitSM[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Succession Management"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="PG"){
									for(var a2=0;a2<datatempoModelUpgradeRecruitPG.length;a2++){
										
										
									
										
										
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
										
												if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitPG[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Performance and Goals"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitPG[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Performance and Goals"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitPG[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Performance and Goals"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="CO"){
									for(var a2=0;a2<datatempoModelUpgradeRecruitCO.length;a2++){
										
									
			
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
											
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitCO[a2].UPGRADE_ELEMENT){
											// if(oModelUpgradeRecruitData[a2].PRODUCT=="Compensation"){
												tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
												break;
											
											// }
											}
										
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitCO[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Compensation"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitCO[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Compensation"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="ON"){
									for(var a2=0;a2<datatempoModelUpgradeRecruitON.length;a2++){
										
									
										
			
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
											
											if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitON[a2].UPGRADE_ELEMENT){
											// if(oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding" || oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding 2.0"){
												tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
												break;
											// }
										}
										
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitON[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding" || oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding 2.0"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitON[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding" || oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding 2.0"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="EC"){
									for(var a2=0; a2<datatempoModelUpgradeRecruitEC.length; a2++){
										
									// var datatempoModelUpgradeRecruitON = sap.ui.getCore().getModel("oModelUpgradeRecruitON").getData();
			// var datatempoModelUpgradeRecruitREC = sap.ui.getCore().getModel("oModelUpgradeRecruitREC").getData();
			// var datatempoModelUpgradeRecruitSM = sap.ui.getCore().getModel("oModelUpgradeRecruitSM").getData();
			// var datatempoModelUpgradeRecruitPG = sap.ui.getCore().getModel("oModelUpgradeRecruitPG").getData();
			// var datatempoModelUpgradeRecruitCO = sap.ui.getCore().getModel("oModelUpgradeRecruitCO").getData();
			// var datatempoModelUpgradeRecruitEC = sap.ui.getCore().getModel("oModelUpgradeRecruitEC").getData();
										
										
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
											
										
												if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitEC[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Employee Central"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											
										 
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitEC[a2].UPGRADE_ELEMENT){
													// if(datatempoModelUpgradeRecruitEC[a2].PRODUCT=="Employee Central"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitEC[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Employee Central"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
									}
								}
							
							}
							
						}
						// for (var q = 0; q < tempODATAPreCheck.length; q++) {
						// 	if(me.getView().byId("ddlProd").getSelectedKey()=="All"){
						// 		tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
						// 	} else if(me.getView().byId("ddlProd").getSelectedKey()=="RM"){
						// 		for(var a2=0;a2<oModelUpgradeRecruitData.length;a2++){
						// 			if(tempODATAPreCheck[q].UPGRADE_ELEMENT==oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
						// 				tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
						// 				break;
						// 			}
						// 				// break;
						// 		}
						// 	} else if(me.getView().byId("ddlProd").getSelectedKey()=="EC"){
						// 		for(var a2=0; a2<oModelUpgradeRecruitData.length; a2++){
						// 			if(tempODATAPreCheck[q].UPGRADE_ELEMENT!=oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
						// 				tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
						// 				break;
						// 			}
						// 				// break;
						// 		}
						// 	}
						// }
						
						if (tempODATAPreCheckFilter.length > 0) {
	
							var oModelVersion = new sap.ui.model.json.JSONModel();
							oModelVersion.setSizeLimit(1000);
							sap.ui.getCore().setModel(oModelVersion, "oModelVersion");
	
							var oModelCustomer = new sap.ui.model.json.JSONModel();
							oModelCustomer.setSizeLimit(1000);
							sap.ui.getCore().setModel(oModelCustomer, "oModelCustomer");
	
							var tempODATA = [];
							var tempdataRg = [];
							var tempTimeData = [];
							var custName = [];
							var custUsers = [];
	
							tempdataRg.push({
								version: "Build Version",
								versionPara: "Version"
							});
							var tempData = [];
							var count = 0;
							for (var q = 0; q < tempODATAPreCheckFilter.length; q++) {
								// if(tempODATAPreCheckFilter[q].COMPANY=="CRUZ ROJA ESPAÑOLA"){
								// 	tempODATAPreCheckFilter[q].COMPANY="CRUZ ROJA ESPAÑOLA DESARROLLO";
								// }
								// if(tempODATAPreCheckFilter[q].COMPANY=="Release"){
								// 	tempODATAPreCheckFilter[q].COMPANY="Stericycle Inc (de)";
								// }
								// if(tempODATAPreCheckFilter[q].COMPANY!="BPMCINSTANCE4" && tempODATAPreCheckFilter[q].COMPANY!="BPMCINSTANCE1"){
								// if (tempODATAPreCheckFilter[q].COMPANYSCHEMA!=null && tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf("sfsales")==-1) {
									// if(tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf("sfv4")>-1 || tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf("stockpm172200_ref2") > -1 || tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf("hanapm")>-1 || tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf("stg")>-1 || tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf("dc")>-1){
											tempODATA.push(tempODATAPreCheckFilter[q].COMPANY);
											
											if(tempODATAPreCheckFilter[q].RESULT=="true"){
												var stat = "Success";
											}else if(tempODATAPreCheckFilter[q].RESULT=="false"){
												var stat = "Failure";
											}
											
											if (tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practice Configurations Employee Central")[1] == undefined) {
												if(tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("bestpracticesEmployeeCentral")[1] == undefined){
													// tempTimeData.push({
													// 	company: tempODATAPreCheckFilter[q].COMPANY,
													// 	result: stat,
													// 	upgrade:"EC "+tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practices Employee Central")[1],
													// 	timestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toDateString(),
													// 	puretimestamp: tempODATAPreCheckFilter[q].TIME_STAMP
													// });
													if(tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practices Employee Central")[1] == undefined){
														if(tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practices")[1]==undefined){
															if(tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practice")[1]==undefined){
																tempTimeData.push({
																	company: tempODATAPreCheckFilter[q].COMPANY,
																	result: stat,
																	upgrade:tempODATAPreCheckFilter[q].UPGRADE_ELEMENT,
																	timestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString(),//toDateString(),
																	puretimestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString()
																});
															}else{
																if(tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.indexOf("In-app learning")>-1){
																	tempTimeData.push({
																	company: tempODATAPreCheckFilter[q].COMPANY,
																	result: stat,
																	upgrade:tempODATAPreCheckFilter[q].UPGRADE_ELEMENT,
																	timestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString(),//toDateString(),
																	puretimestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString()
																});
																}else{
																	tempTimeData.push({
																	company: tempODATAPreCheckFilter[q].COMPANY,
																	result: stat,
																	upgrade:tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practice")[1],
																	timestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString(),//toDateString(),
																	puretimestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString()
																});
																}
																
															}
															
														}else{
															tempTimeData.push({
																company: tempODATAPreCheckFilter[q].COMPANY,
																result: stat,
																upgrade:tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practices")[1],
																timestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString(),//.toDateString(),
																puretimestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString()
															});
														}
													}else{
														tempTimeData.push({
															company: tempODATAPreCheckFilter[q].COMPANY,
															result: stat,
															upgrade:"EC "+tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practices Employee Central")[1],
															timestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString(),//.toDateString(),
															puretimestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString()
														});
													}
												}else{
													tempTimeData.push({
														company: tempODATAPreCheckFilter[q].COMPANY,
														result: stat,
														upgrade: "EC "+tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("bestpracticesEmployeeCentral")[1],
														timestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString(),//.toDateString(),
														puretimestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString()
													});
												}
											} else {
												tempTimeData.push({
													company: tempODATAPreCheckFilter[q].COMPANY,
													result: stat,
													upgrade: "EC "+tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practice Configurations Employee Central")[1],
													timestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString(),//.toDateString(),
													puretimestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString()
												});
											
											}
		
											// tempTimeData.push({
											// 	company: oData.results[q].COMPANY,
											// 	upgrade: oData.results[q].UPGRADE_ELEMENT,
											// 	timestamp: oData.results[q].TIME_STAMP.toDateString()
											// });
									// }
								// }}
							}
	
							var unique = tempODATA.filter(function(itm, i, tempODATA) {
								return i == tempODATA.indexOf(itm);
							});
	
							count = me.NumberFormat(Math.round(unique.length));
	
							var tempTimeAry = [];
							
							// var oDataGrpUsers = {
							// 	"stlistUser": tempTimeAry
							// };
							// oModelCustomer.setData(oDataGrpUsers);
							me.getView().byId("listTable").setModel(oModelCustomer);
							
	
							for (var w = 0; w < unique.length; w++) {
								for (var z = 0; z < tempTimeData.length; z++) {
									if (unique[w] == tempTimeData[z].company) {
										tempTimeAry.push({
											val: unique[w],
											upgrade:[],
											upgradeDisplay: [],
											upgradeString:"",
											time: (tempTimeData[z].timestamp).split(' ', 4).join(' '),
											puretime: tempTimeData[z].puretimestamp
										});
										break;
									}
									// if (unique[w] == tempTimeData[z].company) {
									// 	tempTimeAry.push({
									// 		upgrade:tempTimeData[z].upgrade,
									// 	});
									// }
								}
							}
							
							for (var w = 0; w < tempTimeAry.length; w++) {
								for (var z = 0; z < tempTimeData.length; z++) {
									if (tempTimeAry[w].val == tempTimeData[z].company) {
										if(tempTimeAry[w].upgrade.indexOf(tempTimeData[z].upgrade)==-1){
											tempTimeAry[w].upgrade.push(tempTimeData[z].upgrade);
											// tempTimeAry[w].upgradeDisplay.push(tempTimeData[z].upgrade + " - " +tempTimeData[z].result + " - " + tempTimeData[z].timestamp);
											tempTimeAry[w].upgradeDisplay.push(tempTimeData[z].upgrade + " - " + ((tempTimeData[z].timestamp).split(' ', 4).join(' ')).replace(","," "));
										}
									}
								}
							}
							
							var uniqueData = [];
							for (var w = 0; w < tempTimeAry.length; w++) {
								var tempODATA = tempTimeAry[w].upgrade;
								
								uniqueData.push({
									index: w,
									data: tempODATA.filter(function(itm, i, tempODATA) {
										return i == tempODATA.indexOf(itm);
									})
								});
								
							}
							for (var w = 0; w < tempTimeAry.length; w++) {
								tempTimeAry[w].upgrade = uniqueData[w].data;
							}
	
							var uniqueDataDisplay = [];
							for (var w = 0; w < tempTimeAry.length; w++) {
								var tempODATA = tempTimeAry[w].upgradeDisplay;
								
								uniqueDataDisplay.push({
									index: w,
									dataInput: [],
									data: tempODATA.filter(function(itm, i, tempODATA) {
										return i == tempODATA.indexOf(itm);
									})
								});						    
								
								
								// uniqueDataDisplay.push({
								// 	index: w,
								// 	dataInput: [],
								// 	data: tempODATA.reduce(function(p, c){
								// 	    if (c in p) {
								// 	       p[c]++;
								// 	    } else {
								// 	        p[c]=1;
								// 	    }
								// 	    return p;
									    
								// 	}, {})
								// });
							}
							
							for (var w = 0; w < tempTimeAry.length; w++) {
								
								tempTimeAry[w].upgradeDisplay = uniqueDataDisplay[w].dataInput;
								tempTimeAry[w].upgradeDisplay = uniqueDataDisplay[w].data;
							}
	
							for (var w = 0; w < tempTimeAry.length; w++) {
								tempTimeAry[w].upgradeString = tempTimeAry[w].upgrade.toString();
							}
							
							
							// var citrus = (tempTimeAry).slice(0, 5);
							
							
							// var oDataGrpUsers = {
							// 	"stlistUser": tempTimeAry
							// };
							// oModelCustomer.setData(oDataGrpUsers);
							// me.getView().byId("listTable").setModel(oModelCustomer);
							var oModelGroups = sap.ui.getCore().getModel("oModelCustomer");
							oModelGroups.setProperty('/stlistUser', tempTimeAry);
							// oModelGroups.setProperty('/stlistUser', citrus);
	
						}
						
					}else{
						var oModelCustomer = new sap.ui.model.json.JSONModel();
						oModelCustomer.setSizeLimit(1000);
						sap.ui.getCore().setModel(oModelCustomer, "oModelCustomer");
	
	
						var oDataGrpUsers = {
							"stlistUser": []
						};
						oModelCustomer.setData(oDataGrpUsers);
						me.getView().byId("listTable").setModel(oModelCustomer);
					}
				},
				function(oError) {
					console.log("Error 127");
				});

		},
		loadChartBottom: function(mdl, para, fromCompDate,toCompDate) {
			var tempBP = [];
			var tempBPCountArray = [];
			var tempBPCountArrayCore = [];
			var oDataCHST = {};
			var tempdataSP = [];
			var totalCount = null;
			var upgradeInput = [];
			var countInput = [];
			var tempdataSPUpgrade = [];
			
			var oDataCHSTLine = {};
			var oModelLineChartSVAccDetailBtm = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(oModelLineChartSVAccDetailBtm, "oModelLineChartSVAccDetailBtm");
				
			var tempODATAPreCheck = [];
			var tempODATAPreCheckFilter = [];
			var tempODATAPreCheckSub = [];
			var tempODATAPreCheckFilterSub = [];
			// var oModelUpgradeRecruitData = sap.ui.getCore().getModel("oModelUpgradeRecruit").getData();
			
			var datatempoModelUpgradeRecruitON = sap.ui.getCore().getModel("oModelUpgradeRecruitON").getData();
			var datatempoModelUpgradeRecruitREC = sap.ui.getCore().getModel("oModelUpgradeRecruitREC").getData();
			var datatempoModelUpgradeRecruitSM = sap.ui.getCore().getModel("oModelUpgradeRecruitSM").getData();
			var datatempoModelUpgradeRecruitPG = sap.ui.getCore().getModel("oModelUpgradeRecruitPG").getData();
			var datatempoModelUpgradeRecruitCO = sap.ui.getCore().getModel("oModelUpgradeRecruitCO").getData();
			var datatempoModelUpgradeRecruitEC = sap.ui.getCore().getModel("oModelUpgradeRecruitEC").getData();
			
												 
			var me = this;
			var oModelColumnChartSVAccDetail = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(oModelColumnChartSVAccDetail, "oModelColumnChartSVAccDetail");

			var oModelGroups = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(oModelGroups, "oModelGroups");
			oModelGroups.setSizeLimit(10000);
			
			var oModelTrend = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(oModelTrend, "oModelTrend");
			me.getView().byId("listTableListUpgrade").setModel(oModelTrend);
			var deployKey = me.getView().byId("ddlDeploy").getSelectedKey();
						
			tempdataSP.push({
				BP: "All Upgrade Elements",
				BPKEY: "All"
			});

			if (para != "") {
				
				if(deployKey=="All"){
					var url =
					"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and not substringof('sfsales',COMPANYSCHEMA) and COMPANY ne 'BPMCINSTANCE1' and COMPANY ne 'BPMCINSTANCE4' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
					para + "' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"'";
				}else if(deployKey=="CUST"){
					var url =
					"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and substringof('_',UPGRADE_ELEMENT) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and not substringof('sfsales',COMPANYSCHEMA) and COMPANY ne 'BPMCINSTANCE1' and COMPANY ne 'BPMCINSTANCE4' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
					para + "' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"'";
				}else{
					var url =
					"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and indexof(UPGRADE_ELEMENT,'_') eq -1  and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and not substringof('sfsales',COMPANYSCHEMA) and COMPANY ne 'BPMCINSTANCE1' and COMPANY ne 'BPMCINSTANCE4' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
					para + "' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"'";
				}
					
				// var url =
				// 	"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
				// 	para + "' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"'";
			} else {
				
				
				if(deployKey=="All"){
					var url = "/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and not substringof('sfsales',COMPANYSCHEMA) and COMPANY ne 'BPMCINSTANCE1' and COMPANY ne 'BPMCINSTANCE4' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"'";
				}else if(deployKey=="CUST"){
					var url = "/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and substringof('_',UPGRADE_ELEMENT) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and not substringof('sfsales',COMPANYSCHEMA) and COMPANY ne 'BPMCINSTANCE1' and COMPANY ne 'BPMCINSTANCE4' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"'";
				}else{
					var url = "/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and indexof(UPGRADE_ELEMENT,'_') eq -1 and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and not substringof('sfsales',COMPANYSCHEMA) and COMPANY ne 'BPMCINSTANCE1' and COMPANY ne 'BPMCINSTANCE4' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"'";
				}
				
				
				
				
				// var url = "/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"'";
			}

			mdl.read(url,
				null, null, true,
				function(oData, oResponse) {
					if(oData.results.length > 0){
						tempODATAPreCheck = oData.results;
						for (var q = 0; q < tempODATAPreCheck.length; q++) {
							
							var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
							var lastItem = majorBlk[majorBlk.length-1];
							if(lastItem.length!=32){
								
							if(me.getView().byId("ddlProd").getSelectedKey()=="All"){
							
								
									tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="RM"){
			
									for(var a2=0;a2<datatempoModelUpgradeRecruitREC.length;a2++){
										
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
											
										
											if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitREC[a2].UPGRADE_ELEMENT){
													// if(datatempoModelUpgradeRecruitREC[a2].PRODUCT=="Recruiting"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitREC[a2].UPGRADE_ELEMENT){
													// if(datatempoModelUpgradeRecruitREC[a2].PRODUCT=="Recruiting"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitREC[a2].UPGRADE_ELEMENT){
													// if(datatempoModelUpgradeRecruitREC[a2].PRODUCT=="Recruiting"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="SM"){
									for(var a2=0;a2<datatempoModelUpgradeRecruitSM.length;a2++){
										
			// 							
										
										
											if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
												
										
											if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitSM[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Succession Management"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitSM[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Succession Management"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitSM[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Succession Management"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="PG"){
									for(var a2=0;a2<datatempoModelUpgradeRecruitPG.length;a2++){
										
										
									
										
										
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
										
												if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitPG[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Performance and Goals"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitPG[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Performance and Goals"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitPG[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Performance and Goals"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="CO"){
									for(var a2=0;a2<datatempoModelUpgradeRecruitCO.length;a2++){
										
									
			
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
											
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitCO[a2].UPGRADE_ELEMENT){
											// if(oModelUpgradeRecruitData[a2].PRODUCT=="Compensation"){
												tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
												break;
											
											// }
											}
										
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitCO[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Compensation"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitCO[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Compensation"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="ON"){
									for(var a2=0;a2<datatempoModelUpgradeRecruitON.length;a2++){
										
									
										
			
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
											
											if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitON[a2].UPGRADE_ELEMENT){
											// if(oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding" || oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding 2.0"){
												tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
												break;
											// }
										}
										
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitON[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding" || oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding 2.0"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitON[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding" || oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding 2.0"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="EC"){
									for(var a2=0; a2<datatempoModelUpgradeRecruitEC.length; a2++){
										
									// var datatempoModelUpgradeRecruitON = sap.ui.getCore().getModel("oModelUpgradeRecruitON").getData();
			// var datatempoModelUpgradeRecruitREC = sap.ui.getCore().getModel("oModelUpgradeRecruitREC").getData();
			// var datatempoModelUpgradeRecruitSM = sap.ui.getCore().getModel("oModelUpgradeRecruitSM").getData();
			// var datatempoModelUpgradeRecruitPG = sap.ui.getCore().getModel("oModelUpgradeRecruitPG").getData();
			// var datatempoModelUpgradeRecruitCO = sap.ui.getCore().getModel("oModelUpgradeRecruitCO").getData();
			// var datatempoModelUpgradeRecruitEC = sap.ui.getCore().getModel("oModelUpgradeRecruitEC").getData();
										
										
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
											
										
												if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitEC[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Employee Central"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											
										 
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitEC[a2].UPGRADE_ELEMENT){
													// if(datatempoModelUpgradeRecruitEC[a2].PRODUCT=="Employee Central"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitEC[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Employee Central"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
									}
								}
							
							}
						}
						
						if (tempODATAPreCheckFilter.length > 0) {
						for (var w = 0; w < tempODATAPreCheckFilter.length; w++) {
							// if(tempODATAPreCheckFilter[w].COMPANY=="CRUZ ROJA ESPAÑOLA"){
							// 	tempODATAPreCheckFilter[w].COMPANY="CRUZ ROJA ESPAÑOLA DESARROLLO";
							// }
							// if(tempODATAPreCheckFilter[w].COMPANY=="Release"){
							// 	tempODATAPreCheckFilter[w].COMPANY="Stericycle Inc (de)";
							// }
							
							
							// if(tempODATAPreCheckFilter[w].COMPANY!="BPMCINSTANCE4" && tempODATAPreCheckFilter[w].COMPANY!="BPMCINSTANCE1"){
							// if (tempODATAPreCheckFilter[w].COMPANYSCHEMA != null && tempODATAPreCheckFilter[w].COMPANYSCHEMA.toLowerCase().indexOf("sfsales")==-1) {
								// if (tempODATAPreCheckFilter[w].COMPANYSCHEMA.toLowerCase().indexOf("sfv4") > -1 || tempODATAPreCheckFilter[w].COMPANYSCHEMA.toLowerCase().indexOf("stockpm172200_ref2") > -1 || tempODATAPreCheckFilter[w].COMPANYSCHEMA.toLowerCase().indexOf("hanapm") > -1 || tempODATAPreCheckFilter[w].COMPANYSCHEMA.toLowerCase().indexOf(
								// 		"stg") > -1 || tempODATAPreCheckFilter[w].COMPANYSCHEMA.toLowerCase().indexOf("dc") > -1) {
									tempBP.push(tempODATAPreCheckFilter[w].UPGRADE_ELEMENT);
								// }
							// }
							// }

						}
						var uniqueBP = tempBP.filter(function(itm, i, tempBP) {
							return i == tempBP.indexOf(itm);
						});
						
						
						for (var z = 0; z < uniqueBP.length; z++) {
							var fillBPNewAr = [];

							if (uniqueBP[z].split("Best Practice Configurations Employee Central")[1] == undefined) {
								if(uniqueBP[z].split("bestpracticesEmployeeCentral")[1] == undefined){
									
									if(uniqueBP[z].split("Best Practices Employee Central")[1] == undefined){
										if(uniqueBP[z].split("Best Practices")[1]==undefined){
											if(uniqueBP[z].split("Best Practice")[1]==undefined){
												// if(uniqueBP[z]=='Health & Vaccine Tracking Solution'){
												// 	debugger;	
												// }
												tempdataSP.push({
													BP: uniqueBP[z],
													BPKEY: uniqueBP[z]
												});
											}else{
												tempdataSP.push({
													BP: uniqueBP[z].split("Best Practice")[1],
													BPKEY: uniqueBP[z]
												});
											}
											
										}else{
											if(uniqueBP[z].indexOf("In-app learning")>-1){
												tempdataSP.push({
													BP: uniqueBP[z],
													BPKEY: uniqueBP[z]
												});
											}else{
												tempdataSP.push({
													BP: uniqueBP[z].split("Best Practices")[1],
													BPKEY: uniqueBP[z]
												});
											}
											
										}
									}else{
										tempdataSP.push({
											BP: "EC "+uniqueBP[z].split("Best Practices Employee Central")[1],
											BPKEY: uniqueBP[z]
										});
									}
												
												
								}else{
									tempdataSP.push({
										BP: "EC "+uniqueBP[z].split("bestpracticesEmployeeCentral")[1],
										BPKEY: uniqueBP[z]
									});
								}
							} else {
								tempdataSP.push({
									BP: "EC "+uniqueBP[z].split("Best Practice Configurations Employee Central")[1],
									BPKEY: uniqueBP[z]
								});
							}

							var oModelGroups = sap.ui.getCore().getModel("oModelGroups");
							oModelGroups.setProperty('/splist', tempdataSP);
							
							
							
							
							for(var t=0;t<tempODATAPreCheckFilter.length;t++){
								if(uniqueBP[z]==tempODATAPreCheckFilter[t].UPGRADE_ELEMENT){
									fillBPNewAr.push({
										UPGRADE_ELEMENT:tempODATAPreCheckFilter[t].UPGRADE_ELEMENT,
										COMPANY :tempODATAPreCheckFilter[t].COMPANY,
										COMPANYSCHEMA:tempODATAPreCheckFilter[t].COMPANYSCHEMA
									});
								}
								
								
								if(t==tempODATAPreCheckFilter.length-1){
									
									var tempCmpny = [];
									
									tempODATAPreCheckSub = fillBPNewAr;
									tempODATAPreCheckFilterSub = tempODATAPreCheckSub;
						
									if (tempODATAPreCheckFilterSub.length > 0) {
										for (var w = 0; w < tempODATAPreCheckFilterSub.length; w++) {
											// if(tempODATAPreCheckFilterSub[w ].COMPANY=="CRUZ ROJA ESPAÑOLA"){
											// 	tempODATAPreCheckFilterSub[w].COMPANY="CRUZ ROJA ESPAÑOLA DESARROLLO";
											// }
											// if(tempODATAPreCheckFilterSub[w].COMPANY=="Release"){
											// 	tempODATAPreCheckFilterSub[w].COMPANY="Stericycle Inc (de)";
											// }
											
											
											// if(tempODATAPreCheckFilterSub[w].COMPANY!="BPMCINSTANCE4"  && tempODATAPreCheckFilterSub[w].COMPANY!="BPMCINSTANCE1"){
											// 	if (tempODATAPreCheckFilterSub[w].COMPANYSCHEMA != null && tempODATAPreCheckFilter[w].COMPANYSCHEMA.toLowerCase().indexOf("sfsales")==-1) {
													tempCmpny.push(tempODATAPreCheckFilterSub[w].COMPANY);
											// }
											// }

										}
										var uniqueCmpny = tempCmpny.filter(function(itm, i, tempCmpny) {
											return i == tempCmpny.indexOf(itm);
										});
										
										
										if(uniqueBP[z].split("Best Practices Employee Central")[1] == undefined){
										if(uniqueBP[z].split("Best Practices")[1]==undefined){
											
											if(uniqueBP[z].split("Best Practice")[1]==undefined){
												tempBPCountArray.push({
													element: uniqueBP[z],
													count: uniqueCmpny.length
												});
												
												
											}else{
												
												tempBPCountArray.push({
													element: uniqueBP[z].split("Best Practice")[1],
													count: uniqueCmpny.length
												});
												
											}
											
											
										}else{
											if(uniqueBP[z].indexOf("In-app learning")>-1){
												tempBPCountArray.push({
													element: uniqueBP[z],
													count: uniqueCmpny.length
												});
												
												
											}else{
												tempBPCountArray.push({
													element: uniqueBP[z].split("Best Practices")[1],
													count: uniqueCmpny.length
												});
												
											}
										}
										}else{
										tempBPCountArray.push({
											element: "EC"+uniqueBP[z].split("Best Practices Employee Central")[1],
											count: uniqueCmpny.length
										});
										
									}
									

										totalCount += uniqueCmpny.length;
										var oModelColumnChartSVAccDetail = sap.ui.getCore().getModel("oModelColumnChartSVAccDetail");
										
										// if(z == uniqueBP.length-1){
										// 	var A = tempBPCountArray;
										// 	var temp = {};
											
										// 	for (var i=0; i<A.length; i++) {
										// 	    temp[A[i].element] = temp[A[i].element] === undefined ? A[i].count : temp[A[i].element]+A[i].count;
										// 	}
											
										// 	A = [];
											
										// 	for (var key in temp) {
										// 	    A.push({element: key, count:temp[key]});
										// 	}
											
										// 	tempBPCountArray = A;
										// 	tempBPCountArray.sort(function(a,b) {return (a.count > b.count) ? 1 : ((b.count> a.count) ? -1 : 0);} );
										// 	tempBPCountArray.reverse();
										// 	var tempBPCountArrayFilter = [];
											
										// 	if(me.getView().byId("ddlSC").getSelectedKey()!="All"){
										// 		for(var t1=0;t1<tempBPCountArray.length;t1++){
										// 			if(tempBPCountArray[t1].element.indexOf(me.getView().byId("ddlSC").getSelectedKey())>-1){
										// 				tempBPCountArrayFilter.push(tempBPCountArray[t1]);
										// 			}
										// 		}
										// 	}else{
										// 		tempBPCountArrayFilter = tempBPCountArray;
										// 	}
											
											
										// 	for(var t=0;t<tempBPCountArrayFilter.length;t++){
										// 		 upgradeInput.push(tempBPCountArrayFilter[t].element);
										// 		 countInput.push(tempBPCountArrayFilter[t].count);
										// 	}
										
										// 	$("#repoContainerReviewUpgrade").find("svg").remove();
											
										// 	Highcharts.SVGRenderer.prototype.symbols.download = function (x, y, w, h) {
										// 	    var path = [
										// 	        // Arrow stem
										// 	        'M', x + w * 0.5, y,
										// 	        'L', x + w * 0.5, y + h * 0.7,
										// 	        // Arrow head
										// 	        'M', x + w * 0.3, y + h * 0.5,
										// 	        'L', x + w * 0.5, y + h * 0.7,
										// 	        'L', x + w * 0.7, y + h * 0.5,
										// 	        // Box
										// 	        'M', x, y + h * 0.9,
										// 	        'L', x, y + h,
										// 	        'L', x + w, y + h,
										// 	        'L', x + w, y + h * 0.9
										// 	    ];
										// 	    return path;
										// 	};
											
										// 	var chart3d = Highcharts.chart('repoContainerReviewUpgrade', {
										// 	    chart: {
										// 	        type: 'column',
										// 	        // height:'380',
										// 	        // options3d: {
										// 	        //     enabled: true,
										// 	        //     alpha: 15,
										// 	        //     beta: 15,
										// 	        //     depth: 70
										// 	        // }
										// 	    },
										// 	    colors:["#2B908F"],
										// 	    title: {
										// 	        text: ''
										// 	    },
										// 	    subtitle: {
										// 	        text: ''
										// 	    },
										// 	    plotOptions: {
										// 	        // column: {
										// 	        //     depth: 25
										// 	        // },
										// 	        series: {
										// 	            dataLabels: {
										// 		            // align: 'center',
										// 		            enabled: true,
										// 		            color: '#fff'
										// 		        },
										// 		        states: {
										//                     select: {
										//                         color: '#63e5e4'    
										//                     }
										//                 },
										//                 slicedOffset: 0,
										//                 point: {
										//                     events: {
										//       //                 click: function(event){
																	
										//       //                 	me.getView().byId("ddlSP").setSelectedKeys("All");
										// 							// me.getView().byId("searchfield").setValue("");
																	
										//       //                 	var tempAryFilter = [];
										//       //                 	var tempAry = [];
										//       //                     this.select(null, true);
										//       //                     var ary = this.series.chart.getSelectedPoints();
										                            
										//       //                     for(var q=0;q<ary.length;q++){
										//       //                     	tempAryFilter.push(ary[q].category);
										//       //                     }
										                            
										//       //                     var ddlItems = me.getView().byId("ddlSP").getItems();
										// 					  //        for(var q=0;q<ddlItems.length;q++){
										// 					  //        	for(var j=0;j<tempAryFilter.length;j++){
										// 						 //         	if(ddlItems[q].getText()==tempAryFilter[j]){
										// 						 //         		tempAry.push(ddlItems[q].getKey());
										// 						 //         	}	
										// 					  //        	}
										// 					  //        }
															          
										//       //                     	if(ary.length==0){
										// 					  //        		tempAry.push("All");
										// 					  //      	}
										// 					  //      	me.getView().byId("ddlSP").setSelectedKeys(tempAry);
										// 					  //      	me.ddlSPChanged();
										//       //                     // console.log(this.series.chart.getSelectedPoints());
										//       //                 }
										//                     }  
										//                 } 
										// 	        }
										// 	    },
											    
										// 	    legend: {
										// 	    	itemStyle: {
										// 	            color: '#ddd',
										// 	        },
										// 	        margin: 2,
										// 	        // align: 'bottom',
										// 	        // verticalAlign: 'bottom',
										// 	        // layout: 'vertical',
										// 	        // x: 15,
										// 	        // y: 25,
										// 	        // itemWidth: 50
										// 	    },
										// 	    xAxis: {
										// 	        categories: upgradeInput,
										// 	        labels: {
										// 	            skew3d: true,
										// 	            style: {
										// 	                fontSize: '11.5px',
										// 	                color: '#ddd',
										// 	            },
										// 	        //     useHTML: true,
										// 			      //formatter() {
										// 			      //  let label = this.value;
										// 			      //  let title = this.value;
										// 			      //  let style = `text-overflow: ellipsis; overflow: hidden;`; // <- YOUR OWN STYLE
										// 			      //  return `<div style="${style}" title="${title}">${label}</div>`;
										// 			      //},
										// 	        },
										// 	        // tickColor: '#bbb',
										// 	        gridLineColor: 'transparent'
										// 	    },
										// 	    yAxis: {
										// 	        title: {
										// 	            text: null
										// 	        },
										// 	        labels: {
										// 	            style: {
										// 	                color: '#ddd'
										// 	            }
										// 	        },
										// 	        // gridLineColor: '#bbb'
										// 	    },
										// 	    series: [{
										// 	        name: 'Number of Customers',
										// 	        data: countInput
										// 	    }],
										// 	      credits: {
										// 		    enabled: false
										// 		  },
										// 	    navigation: {
										// 	        buttonOptions: {
										// 	            verticalAlign: 'top',
										// 	            x:9,
										// 	            y:-10
										// 	        },
										// 	        menuStyle: {
										// 	            background: '#555'
										// 	        },
										// 	        menuItemStyle: {
										// 	            color: '#ddd'
										// 	        }
										// 	    },
										// 	    exporting: {
										// 	     	chartOptions: {
										// 			    chart: {
										// 			      backgroundColor: '#555'
										// 			    }
										// 			  },
										// 	        buttons: {
										// 	            contextButton: {
										// 	                symbol: 'download',
										// 	                symbolFill: '#555'
										// 	            }
										// 	        },
										// 	        filename: 'Upgrade Usage Chart'
										// 	    }
										// 	});
										// }
										
										
										oModelColumnChartSVAccDetail.setProperty('/data', tempBPCountArray);
									}
									
								}
								
							}
							
							
							if(z == uniqueBP.length-1){
											for(var a=0;a<tempBPCountArray.length;a++){
												
												
												if(tempBPCountArray[a].element.indexOf("Anniversary Alerts")>-1 || tempBPCountArray[a].element.indexOf("Income Tax")>-1 || tempBPCountArray[a].element.indexOf("Employee Sample")>-1 || tempBPCountArray[a].element.indexOf("Employee Central ")>-1 || tempBPCountArray[a].element.indexOf("DemoData")>-1 || tempBPCountArray[a].element.indexOf("Apprentice")>-1||tempBPCountArray[a].element.indexOf("Document Generation")>-1||tempBPCountArray[a].element.indexOf("Contingent")>-1||tempBPCountArray[a].element.indexOf("Concurrent")>-1||tempBPCountArray[a].element.indexOf("EC Global Assignment")>-1||tempBPCountArray[a].element.indexOf("EC Position")>-1||tempBPCountArray[a].element.indexOf("Time Off Integration")>-1||tempBPCountArray[a].element.indexOf("Company Structure")>-1){
													if(tempBPCountArray[a].element.indexOf("Employee Central Core")>-1){
														tempBPCountArray[a].parent="Employee Central Core";
													}else if(tempBPCountArray[a].element.indexOf("Employee Central Benefits")>-1||tempBPCountArray[a].element.indexOf("Employee Central Global Benefits")>-1){
													tempBPCountArray[a].parent="Employee Central Benefits";
													}else if(tempBPCountArray[a].element.indexOf("Employee Central Dependents")>-1){
														tempBPCountArray[a].parent="Employee Central Dependents Management";
													}else if(tempBPCountArray[a].element.indexOf("Employee Central Time Off")>-1){
														tempBPCountArray[a].parent="Employee Central Time Off";
													}else if(tempBPCountArray[a].element.indexOf("Employee Central Time Sheet")>-1){
														tempBPCountArray[a].parent="Employee Central Time Sheet";
													}else if (tempBPCountArray[a].element.indexOf("Recruiting Management")>-1){
														tempBPCountArray[a].parent="Recruiting";
													}else if(tempBPCountArray[a].element.indexOf("Reward and Recognition")>-1 || tempBPCountArray[a].element.indexOf("Compensation")>-1||tempBPCountArray[a].element.indexOf("Stock")>-1 || tempBPCountArray[a].element.indexOf("Salary")>-1||tempBPCountArray[a].element.indexOf("Variable pay")>-1){
													tempBPCountArray[a].parent="Compensation";
													
												}
													else{
														tempBPCountArray[a].parent="Employee Central";
													}
													
												}else if(tempBPCountArray[a].element.indexOf("Employee Central Core")>-1 || tempBPCountArray[a].element.indexOf("EC  Core")>-1){
													tempBPCountArray[a].parent="Employee Central Core";
												}else if(tempBPCountArray[a].element.indexOf("EC Benefits")>-1 || tempBPCountArray[a].element.indexOf("EC  Benefits")>-1||tempBPCountArray[a].element.indexOf("EC  Global Benefits")>-1 || tempBPCountArray[a].element.indexOf("Employee Central Benefits")>-1||tempBPCountArray[a].element.indexOf("Employee Central Global Benefits")>-1){
													tempBPCountArray[a].parent="Employee Central Benefits";
												}else if(tempBPCountArray[a].element.indexOf("EC Dependents")>-1 || tempBPCountArray[a].element.indexOf("EC  Dependents")>-1 || tempBPCountArray[a].element.indexOf("Employee Central Dependents")>-1){
													tempBPCountArray[a].parent="Employee Central Dependents Management";
												}else if(tempBPCountArray[a].element.indexOf("EC Time Off")>-1 || tempBPCountArray[a].element.indexOf("EC  Time Off")>-1 || tempBPCountArray[a].element.indexOf("Employee Central Time Off")>-1){
													tempBPCountArray[a].parent="Employee Central Time Off";
												}else if(tempBPCountArray[a].element.indexOf("EC Time Sheet")>-1 || tempBPCountArray[a].element.indexOf("EC  Time Sheet")>-1 || tempBPCountArray[a].element.indexOf("Employee Central Time Sheet")>-1){
													tempBPCountArray[a].parent="Employee Central Time Sheet";
												}else if(tempBPCountArray[a].element.indexOf("Succession")>-1||tempBPCountArray[a].element.indexOf("Career and Development")>-1||tempBPCountArray[a].element.indexOf("Mentoring")>-1){
													tempBPCountArray[a].parent="Succession and Development";
												}else if(tempBPCountArray[a].element.indexOf("Recruiting")>-1||tempBPCountArray[a].element.indexOf("People Profile")>-1||tempBPCountArray[a].element.indexOf("Job Description")>-1){
													if(tempBPCountArray[a].element.indexOf("Onboarding")>-1){
														tempBPCountArray[a].parent="Onboarding 2.0";
													}else if(tempBPCountArray[a].element.indexOf("Succession Management")>-1){
														tempBPCountArray[a].parent="Succession and Development";
													}else{
														tempBPCountArray[a].parent="Recruiting";
													}
													
												}else if(tempBPCountArray[a].element.indexOf("Performance And")>-1||tempBPCountArray[a].element.indexOf("Performance and")>-1){
													tempBPCountArray[a].parent="Performance and Goals";
												}else if(tempBPCountArray[a].element.indexOf("Offboarding")>-1||tempBPCountArray[a].element.indexOf("Onboarding")>-1){
													tempBPCountArray[a].parent="Onboarding 2.0";
													
												}else if(tempBPCountArray[a].element.indexOf("Reward and Recognition")>-1 || tempBPCountArray[a].element.indexOf("Compensation")>-1||tempBPCountArray[a].element.indexOf("Stock")>-1 || tempBPCountArray[a].element.indexOf("Salary")>-1||tempBPCountArray[a].element.indexOf("Variable pay")>-1){
													tempBPCountArray[a].parent="Compensation";
													
												}else{
													tempBPCountArray[a].parent="Optional";
												}
												
											}
											
											tempBPCountArray.sort(function(a,b) {return (a.parent > b.parent) ? 1 : ((b.parent> a.parent) ? -1 : 0);} );
											
										    var result = tempBPCountArray.reduce(function (r, a) {
										        r[a.parent] = r[a.parent] || [];
										        r[a.parent].push(a);
										        return r;
										    }, Object.create(null));
											
											var keys = [];
											for(var k in result) keys.push(k);
											
											var uniqueEmps = [];
											var uniqueEmpsDet = [];
											var uniqueEmpsDrill = [];
											
											for(var q=0;q<keys.length;q++){
												for(var t=0;t<tempBPCountArray.length;t++){
													if(keys[q]==tempBPCountArray[t].parent){
														
														if(uniqueEmpsDet.indexOf(tempBPCountArray[t].parent)>-1){
															uniqueEmps[uniqueEmpsDet.indexOf(tempBPCountArray[t].parent)].y=uniqueEmps[uniqueEmpsDet.indexOf(tempBPCountArray[t].parent)].y+tempBPCountArray[t].count;
														}else{
															uniqueEmpsDet.push(tempBPCountArray[t].parent);
															uniqueEmps.push({
																name: keys[q],
											                    y: tempBPCountArray[t].count,
											                    drilldown: keys[q],
											              //      dataLabels: {
													            //     align: 'right',
													            //     rotation: -90,
													            //     shape: null
													            // }
															}); 
															uniqueEmpsDrill.push({
																name: keys[q],
																id: keys[q],
																data:[]
															});
														}
														
													}
												}
											}
											tempBPCountArray.sort(function(a,b) {return (a.count > b.count) ? 1 : ((b.count> a.count) ? -1 : 0);} );
											tempBPCountArray.reverse();
											
											for(var t1=0;t1<tempBPCountArray.length;t1++){
												for(var t2=0;t2<uniqueEmpsDrill.length;t2++){
													if(tempBPCountArray[t1].parent==uniqueEmpsDrill[t2].name){
														uniqueEmpsDrill[t2].data.push([tempBPCountArray[t1].element,tempBPCountArray[t1].count]);
													}
													// if(t2==uniqueEmpsDrill.length-1){
													// 	uniqueEmpsDrill[t2].data.sort(function(a,b) {return (a.count > b.count) ? 1 : ((b.count> a.count) ? -1 : 0);} );
													// 	uniqueEmpsDrill[t2].data.reverse();
													// }
												}
											}
											
											// for(var t=0;t<tempBPCountArray.length;t++){
											// 	 upgradeInput.push(tempBPCountArray[t].element);
											// 	 countInput.push(tempBPCountArray[t].count);
											// }
											
											// tempBPCountArray.sort(function(a,b) {return (a.count > b.count) ? 1 : ((b.count> a.count) ? -1 : 0);} );
											// tempBPCountArray.reverse();
											
											tempdataSPUpgrade = tempBPCountArray;
											
											var oModelTrend = sap.ui.getCore().getModel("oModelTrend");
											oModelTrend.setProperty('/splist', tempdataSPUpgrade);
											
											//viz frame start
												// oDataCHSTLine = {
												// 	data: tempdataSPUpgrade
												// };
						
												// var oModelLineChartSVAccDetailBtm = sap.ui.getCore().getModel("oModelLineChartSVAccDetailBtm");
												// oModelLineChartSVAccDetailBtm.setData(oDataCHSTLine);
						
												// var oVizFrame = me.getView().byId("HBarChart");
						
												// oVizFrame.destroyFeeds();
						
												// var oDataset = new sap.viz.ui5.data.FlattenedDataset({
												// 	dimensions: [{
												// 		name: "Scope Item",
												// 		value: "{element}"
						
												// 	}],
												// 	measures: [{
												// 		name: "Count",
												// 		value: "{count}"
												// 	}],
						
												// 	data: {
												// 		path: "/data"
												// 	}
												// });
						
												// oVizFrame.setDataset(oDataset);
												// oVizFrame.setModel(oModelLineChartSVAccDetailBtm);
						
												// var feedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
												// 	'uid': "valueAxis",
												// 	'type': "Measure",
												// 	'values': ["Count"]
												// });
												// var feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
												// 	'uid': "categoryAxis",
												// 	'type': "Dimension",
												// 	'values': ["Scope Item"]
												// });
												// oVizFrame.addFeed(feedValueAxis);
												// oVizFrame.addFeed(feedCategoryAxis);
						
												// oVizFrame.setVizProperties({
												// 	plotArea: {
												// 		dataLabel: {
												// 			visible: true,
												// 			//formatString: CustomerFormat.FIORI_LABEL_SHORTFORMAT_2,
												// 			type: "short",
												// 			style: {
												// 				color: "#fff"
												// 			}
												// 		},
												// 		gap: {
												// 			barSpacing: 0.2,
												// 			groupSpacing: 0.2
						
												// 		},
												// 		dataPointSize: {
												// 			min: 10,
												// 			max: 20
												// 		},
												// 		drawingEffect: 'glossy',
												// 		colorPalette: ['#024084', '#86aed6'],
												// 		// colorPalette: ['#61BC52', '#302720,#4c4540'],
												// 		gridline: {
												// 			visible: false
												// 		}
												// 	},
												// 	general: {
												// 		background: {
												// 			color: "transparent"
												// 		},
												// 	},
												// 	categoryAxis: {
												// 		title: {
												// 			visible: false
												// 		},
												// 		label: {
												// 			// style: {
												// 			// 	color: "#ddd"
												// 			// },
												// 			// rotation:"fixed",
												// 			// angle:"90"
															
												// 			style: {
												// 				color: "#ddd",
												// 				fontSize:"8.9px"
												// 			},
												// 			linesOfWrap:3,
												// 			angle:60
												// 		},
												// 		hoverShadow: {
												// 			color: "#000"
												// 		},
												// 		mouseDownShadow: {
												// 			color: "#7b7878"
												// 		},
												// 	},
												// 	valueAxis: {
												// 		label: {
												// 			style: {
												// 				color: "#ddd"
												// 			}
												// 		},
												// 		title: {
												// 			visible: false
												// 		}
												// 	},
												// 	legend: {
												// 		drawingEffect: 'glossy',
												// 		label: {
												// 			style: {
												// 				color: "#ddd"
												// 			}
												// 		},
												// 		hoverShadow: {
												// 			color: "#000"
												// 		},
												// 		mouseDownShadow: {
												// 			color: "#7b7878"
												// 		}
												// 	},
												// 	legendGroup: {
												// 		layout: {
												// 			position: 'bottom'
												// 		}
												// 	}
						
												// });
												// oVizFrame.setLegendVisible(false);
						
											//viz frame ends
										
											// uniqueEmpsDrill.sort(function(a,b) {return (a.count > b.count) ? 1 : ((b.count> a.count) ? -1 : 0);} );
											// uniqueEmpsDrill.reverse();
											
											$("#repoContainerReviewUpgrade").find("svg").remove();
											
											Highcharts.SVGRenderer.prototype.symbols.download = function (x, y, w, h) {
											    var path = [
											        // Arrow stem
											        'M', x + w * 0.5, y,
											        'L', x + w * 0.5, y + h * 0.7,
											        // Arrow head
											        'M', x + w * 0.3, y + h * 0.5,
											        'L', x + w * 0.5, y + h * 0.7,
											        'L', x + w * 0.7, y + h * 0.5,
											        // Box
											        'M', x, y + h * 0.9,
											        'L', x, y + h,
											        'L', x + w, y + h,
											        'L', x + w, y + h * 0.9
											    ];
											    return path;
											};
						
											// var chart3d = Highcharts.chart('repoContainerReviewUpgrade', {
											//     chart: {
											//         type: 'column',
											//         // height:'380',
											//         options3d: {
											//             enabled: false,
											//             // alpha: 15,
											//             // beta: 0,
											//             // depth: 0
											            
											//             alpha: 15,
											//             beta: 15,
											//             depth: 50,
											//             viewDistance: 25
											            
											            
											//         }
											//     },
											//     colors:["#2B908F"],
											//     title: {
											//         text: ''
											//     },
											//     subtitle: {
											//         text: ''
											//     },
											//     plotOptions: {
											//         // column: {
											//         //     depth: 25
											//         // },
											//         series: {
											//         	borderColor: 'transparent',
											//             dataLabels: {
											// 	            // align: 'center',
											// 	            enabled: true,
											// 	            color: '#f0ab00'
											// 	        },
											// 	        states: {
										 //                   select: {
										 //                       color: '#63e5e4'    
										 //                   }
										 //               },
										 //               slicedOffset: 0,
										 //               point: {
										 //                   events: {
										 //                       click: function(event){
										 //      //                 	var chart = $('#repoContainerReviewUpgrade').highcharts();
										                        	
										 //      //                 	var data = chart.series[0].data;
				
											// 						// for(var q=0;q<data.length;q++){
											// 						// 	if(chart.series[0].data[q].options.selected==true){
											// 						// 	chart.series[0].data[q].update({
											// 						//             color: '#63e5e4'
											// 						//         });
																					
											// 						// 	}else{
											// 						// 		chart.series[0].data[q].update({
											// 						//             color: '#2B908F'
											// 						//         });
																				
											// 						// 	}
											// 						// }
																	
										 //                       	me.getView().byId("ddlSP").setSelectedKeys("All");
											// 						me.getView().byId("searchfield").setValue("");
																	
										 //                       	var tempAryFilter = [];
										 //                       	var tempAry = [];
										 //                           this.select(null, true);
										 //                           var ary = this.series.chart.getSelectedPoints();
										                            
										 //                           for(var q=0;q<ary.length;q++){
										 //                           	tempAryFilter.push(ary[q].category);
										 //             //              	ary[q].update({
											// 					        //     color: '#63e5e4'
											// 					        // });
										 //                           }
										                            
										 //                           var ddlItems = me.getView().byId("ddlSP").getItems();
											// 				          for(var q=0;q<ddlItems.length;q++){
											// 				          	for(var j=0;j<tempAryFilter.length;j++){
											// 					          	if(ddlItems[q].getText()==tempAryFilter[j]){
											// 					          		tempAry.push(ddlItems[q].getKey());
											// 					          	}	
											// 				          	}
											// 				          }
															          
										 //                           	if(ary.length==0){
											// 				          		tempAry.push("All");
											// 				        	}
											// 				        	me.getView().byId("ddlSP").setSelectedKeys(tempAry);
											// 				        	me.ddlSPChanged();
										 //                           // console.log(this.series.chart.getSelectedPoints());
										 //                       }
										 //                   }  
										 //               } 
											//         }
											//     },
											    
											//     legend: {
											//     	itemStyle: {
											//             color: '#ddd',
											//         },
											//         margin: 2,
											//         // align: 'bottom',
											//         // verticalAlign: 'bottom',
											//         // layout: 'vertical',
											//         // x: 15,
											//         // y: 25,
											//         // itemWidth: 50
											//     },
											//     xAxis: {
											//         categories: upgradeInput,
											//         labels: {
											//             skew3d: true,
											//             style: {
											//                 fontSize: '11.5px',
											//                 color: '#ddd',
											//             },
											//         //     useHTML: true,
											// 		      //formatter() {
											// 		      //  let label = this.value;
											// 		      //  let title = this.value;
											// 		      //  let style = `text-overflow: ellipsis; overflow: hidden;`; // <- YOUR OWN STYLE
											// 		      //  return `<div style="${style}" title="${title}">${label}</div>`;
											// 		      //},
											//         },
											//         // tickColor: '#bbb',
											//         gridLineColor: 'transparent'
											//     },
											//     yAxis: {
											//         title: {
											//             text: null
											//         },
											//         labels: {
											//             style: {
											//                 color: '#ddd'
											//             }
											//         },
											//         // gridLineColor: '#bbb'
											//     },
											//     series: [{
											//         name: 'Count',
											//         data: countInput,
											//     }],
											//     credits: {
											// 	    enabled: false
											// 	  },
											//     navigation: {
											//         buttonOptions: {
											//             verticalAlign: 'top',
											//             x:9,
											//             y:-10
											//         },
											//         menuStyle: {
											//             background: '#555'
											//         },
											//         menuItemStyle: {
											//             color: '#ddd'
											//         }
											//     },
											//     exporting: {
											//      	chartOptions: {
											// 		    chart: {
											// 		      backgroundColor: '#555'
											// 		    }
											// 		  },
											//         buttons: {
											//             contextButton: {
											//                 symbol: 'download',
											//                 symbolFill: '#555'
											//             }
											//         },
											//         filename: 'Upgrade Usage Chart'
											//     }
											// });
											
											// Create the chart
											// Highcharts.setOptions({
											//     lang: {
											//         drillUpText: 'Back'
											//     }
											// });
											
											
											Highcharts.theme = {
											    colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
											        '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
											    chart: {
											        backgroundColor: {
											            linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
											            stops: [
											                [0, '#2a2a2b'],
											                [1, '#3e3e40']
											            ]
											        },
											        style: {
											            fontFamily: '\'Unica One\', sans-serif'
											        },
											        plotBorderColor: '#606063'
											    },
											    title: {
											        style: {
											            color: '#E0E0E3',
											            textTransform: 'uppercase',
											            fontSize: '20px'
											        }
											    },
											    subtitle: {
											        style: {
											            color: '#E0E0E3',
											            textTransform: 'uppercase'
											        }
											    },
											    xAxis: {
											      //  gridLineColor: '#707073',
											      //  labels: {
											      //  	rotation: 0,
											      //  	staggerLines: 2,
											      //  	overflow:"justify",
											      //      style: {
											      //          color: '#E0E0E3',
											      //          fontSize: '9px'
											      //      },
											            
											      ////      useHTML: true,
													    // // formatter() {
													    // //   return '<div style="font-size: 9px;">'+this.value+'</div>';
													    // // },
											      //  },
											        lineColor: '#707073',
											        minorGridLineColor: '#505053',
											        tickColor: '#707073',
											        title: {
											            style: {
											                color: '#A0A0A3'
											
											            }
											        }
											    },
											    yAxis: {
											        // gridLineColor: '#707073',
											        labels: {
											            style: {
											                color: '#E0E0E3'
											            }
											        },
											        gridLineColor: 'transparent',
											        // lineColor: '#707073',
											        // minorGridLineColor: '#505053',
											        tickColor: '#707073',
											        tickWidth: 1,
											        title: {
											            style: {
											                color: '#A0A0A3'
											            }
											        }
											    },
											    tooltip: {
											        backgroundColor: 'rgba(0, 0, 0, 0.85)',
											        style: {
											            color: '#F0F0F0'
											        }
											    },
											    lang: {
											        drillUpText: 'Back'
											    },
											    plotOptions: {
											        series: {
											            dataLabels: {
											                color: '#B0B0B3'
											            },
											            marker: {
											                lineColor: '#333'
											            }
											        },
											        boxplot: {
											            fillColor: '#505053'
											        },
											        candlestick: {
											            lineColor: 'white'
											        },
											        errorbar: {
											            color: 'white'
											        }
											    },
											    legend: {
											        itemStyle: {
											            color: '#E0E0E3'
											        },
											        itemHoverStyle: {
											            color: '#FFF'
											        },
											        itemHiddenStyle: {
											            color: '#606063'
											        }
											    },
											    credits: {
											        style: {
											            color: '#666'
											        }
											    },
											    labels: {
											        style: {
											            color: '#707073'
											        }
											    },
											
											    drilldown: {
											        activeAxisLabelStyle: {
											            color: '#F0F0F3',
											            fontWeight: 'normal'
											        },
											        activeDataLabelStyle: {
											            color: '#F0F0F3'
											        },
											         drillUpButton: {
											            relativeTo: 'spacingBox',
											            
											            // position: {
											            // 	align:'left',
											            //     y: -20,
											            //     // x: -20
											            // },
											            // theme: {
											            //     fill: 'white',
											            //     'stroke-width': 1,
											            //     stroke: 'silver',
											            //     r: 0,
											            //     states: {
											            //         hover: {
											            //             fill: '#a4edba'
											            //         },
											            //         select: {
											            //             stroke: '#039',
											            //             fill: '#a4edba'
											            //         }
											            //     }
											            // }
											
											        },
        
											    },
											
											    navigation: {
											        buttonOptions: {
											            symbolStroke: '#DDDDDD',
											            theme: {
											                fill: '#505053'
											            }
											        }
											    },
											
											    // scroll charts
											    rangeSelector: {
											        buttonTheme: {
											            fill: '#505053',
											            stroke: '#000000',
											            style: {
											                color: '#CCC'
											            },
											            states: {
											                hover: {
											                    fill: '#707073',
											                    stroke: '#000000',
											                    style: {
											                        color: 'white'
											                    }
											                },
											                select: {
											                    fill: '#000003',
											                    stroke: '#000000',
											                    style: {
											                        color: 'white'
											                    }
											                }
											            }
											        },
											        inputBoxBorderColor: '#505053',
											        inputStyle: {
											            backgroundColor: '#333',
											            color: 'silver'
											        },
											        labelStyle: {
											            color: 'silver'
											        }
											    },
											
											    navigator: {
											        handles: {
											            backgroundColor: '#666',
											            borderColor: '#AAA'
											        },
											        outlineColor: '#CCC',
											        maskFill: 'rgba(255,255,255,0.1)',
											        series: {
											            color: '#7798BF',
											            lineColor: '#A6C7ED'
											        },
											        xAxis: {
											            gridLineColor: '#505053'
											        }
											    },
											
											    scrollbar: {
											        barBackgroundColor: '#808083',
											        barBorderColor: '#808083',
											        buttonArrowColor: '#CCC',
											        buttonBackgroundColor: '#606063',
											        buttonBorderColor: '#606063',
											        rifleColor: '#FFF',
											        trackBackgroundColor: '#404043',
											        trackBorderColor: '#404043'
											    },
											
											    // special colors for some of the
											    legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
											    background2: '#505053',
											    dataLabelsColor: '#B0B0B3',
											    textColor: '#C0C0C0',
											    contrastTextColor: '#F0F0F3',
											    maskColor: 'rgba(255,255,255,0.3)'
											};
											
											// Apply the theme
											Highcharts.setOptions(Highcharts.theme);
											
											
											var chart3d = Highcharts.chart('repoContainerReviewUpgrade', {
											    chart: {
											        type: 'bar'
											    },
											    title: {
											        text: ''
											    },
											    subtitle: {
											        text: ''
											    },
											    xAxis: {
											        type: 'category',
											        gridLineColor: '#707073',
											        labels: {
											        	rotation: 0,
											        	staggerLines: 2,
											        	overflow:"justify",
											            style: {
											                color: '#E0E0E3',
											                fontSize: '9px'
											            },
											            
											      //      useHTML: true,
													    // formatter() {
													    //   return '<div style="font-size: 9px;">'+this.value+'</div>';
													    // },
											        },
											        
													// labels: {
													// 	style: {
													// 		// color: '#ddd',
													// 		fontSize: '9px'
													// 	},
														
													// },
													// categories: timeInput,
													tickColor: 'transparent'
											    },
											    yAxis: {
											        title: {
											            text: ''
											        }
											
											    },
											    legend: {
											        enabled: false
											    },
											    plotOptions: {
											        series: {
											            borderWidth: 0,
											            dataLabels: {
											                enabled: true,
											                format: '{point.y}'
											            }
											        }
											    },
											
											    tooltip: {
											        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
											        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
											    },
											
											    series: [
											        {
											            name: "Configuration Blocks",
											            colorByPoint: true,
											            // data: [
											            //     {
											            //         name: "Chrome",
											            //         y: 62.74,
											            //         drilldown: "Chrome"
											            //     },
											            //     {
											            //         name: "Firefox",
											            //         y: 10.57,
											            //         drilldown: "Firefox"
											            //     },
											            //     {
											            //         name: "Internet Explorer",
											            //         y: 7.23,
											            //         drilldown: "Internet Explorer"
											            //     },
											            //     {
											            //         name: "Safari",
											            //         y: 5.58,
											            //         drilldown: "Safari"
											            //     },
											            //     {
											            //         name: "Edge",
											            //         y: 4.02,
											            //         drilldown: "Edge"
											            //     },
											            //     {
											            //         name: "Opera",
											            //         y: 1.92,
											            //         drilldown: "Opera"
											            //     },
											            //     {
											            //         name: "Other",
											            //         y: 7.62,
											            //         drilldown: null
											            //     }
											            // ]
											          //   dataLabels: [{
													        //     // align: 'left',
													        //     verticalAlign : 'top',
													        //     format: '({point.name})'
													        // }, 
													        // {
													        //     // align: 'right',
													        //     verticalAlign : 'bottom',
													        //     format: '{y} points'
													        // }
													        // ],
											            data:uniqueEmps
											        }
											    ],
											    drilldown: {
											        // series: [
											        //     {
											        //         name: "Chrome",
											        //         id: "Chrome",
											        //         data: [
											        //             [
											        //                 "v65.0",
											        //                 0.1
											        //             ],
											        //             [
											        //                 "v64.0",
											        //                 1.3
											        //             ],
											        //             [
											        //                 "v63.0",
											        //                 53.02
											        //             ],
											        //             [
											        //                 "v62.0",
											        //                 1.4
											        //             ],
											        //             [
											        //                 "v61.0",
											        //                 0.88
											        //             ],
											        //             [
											        //                 "v60.0",
											        //                 0.56
											        //             ],
											        //             [
											        //                 "v59.0",
											        //                 0.45
											        //             ],
											        //             [
											        //                 "v58.0",
											        //                 0.49
											        //             ],
											        //             [
											        //                 "v57.0",
											        //                 0.32
											        //             ],
											        //             [
											        //                 "v56.0",
											        //                 0.29
											        //             ],
											        //             [
											        //                 "v55.0",
											        //                 0.79
											        //             ],
											        //             [
											        //                 "v54.0",
											        //                 0.18
											        //             ],
											        //             [
											        //                 "v51.0",
											        //                 0.13
											        //             ],
											        //             [
											        //                 "v49.0",
											        //                 2.16
											        //             ],
											        //             [
											        //                 "v48.0",
											        //                 0.13
											        //             ],
											        //             [
											        //                 "v47.0",
											        //                 0.11
											        //             ],
											        //             [
											        //                 "v43.0",
											        //                 0.17
											        //             ],
											        //             [
											        //                 "v29.0",
											        //                 0.26
											        //             ]
											        //         ]
											        //     },
											        //     {
											        //         name: "Firefox",
											        //         id: "Firefox",
											        //         data: [
											        //             [
											        //                 "v58.0",
											        //                 1.02
											        //             ],
											        //             [
											        //                 "v57.0",
											        //                 7.36
											        //             ],
											        //             [
											        //                 "v56.0",
											        //                 0.35
											        //             ],
											        //             [
											        //                 "v55.0",
											        //                 0.11
											        //             ],
											        //             [
											        //                 "v54.0",
											        //                 0.1
											        //             ],
											        //             [
											        //                 "v52.0",
											        //                 0.95
											        //             ],
											        //             [
											        //                 "v51.0",
											        //                 0.15
											        //             ],
											        //             [
											        //                 "v50.0",
											        //                 0.1
											        //             ],
											        //             [
											        //                 "v48.0",
											        //                 0.31
											        //             ],
											        //             [
											        //                 "v47.0",
											        //                 0.12
											        //             ]
											        //         ]
											        //     },
											        //     {
											        //         name: "Internet Explorer",
											        //         id: "Internet Explorer",
											        //         data: [
											        //             [
											        //                 "v11.0",
											        //                 6.2
											        //             ],
											        //             [
											        //                 "v10.0",
											        //                 0.29
											        //             ],
											        //             [
											        //                 "v9.0",
											        //                 0.27
											        //             ],
											        //             [
											        //                 "v8.0",
											        //                 0.47
											        //             ]
											        //         ]
											        //     },
											        //     {
											        //         name: "Safari",
											        //         id: "Safari",
											        //         data: [
											        //             [
											        //                 "v11.0",
											        //                 3.39
											        //             ],
											        //             [
											        //                 "v10.1",
											        //                 0.96
											        //             ],
											        //             [
											        //                 "v10.0",
											        //                 0.36
											        //             ],
											        //             [
											        //                 "v9.1",
											        //                 0.54
											        //             ],
											        //             [
											        //                 "v9.0",
											        //                 0.13
											        //             ],
											        //             [
											        //                 "v5.1",
											        //                 0.2
											        //             ]
											        //         ]
											        //     },
											        //     {
											        //         name: "Edge",
											        //         id: "Edge",
											        //         data: [
											        //             [
											        //                 "v16",
											        //                 2.6
											        //             ],
											        //             [
											        //                 "v15",
											        //                 0.92
											        //             ],
											        //             [
											        //                 "v14",
											        //                 0.4
											        //             ],
											        //             [
											        //                 "v13",
											        //                 0.1
											        //             ]
											        //         ]
											        //     },
											        //     {
											        //         name: "Opera",
											        //         id: "Opera",
											        //         data: [
											        //             [
											        //                 "v50.0",
											        //                 0.96
											        //             ],
											        //             [
											        //                 "v49.0",
											        //                 0.82
											        //             ],
											        //             [
											        //                 "v12.1",
											        //                 0.14
											        //             ]
											        //         ]
											        //     }
											        // ]
											        series:uniqueEmpsDrill
											    },
											    
											    navigation: {
											        buttonOptions: {
											            verticalAlign: 'top',
											            x:9,
											            y:-10
											        },
											        menuStyle: {
											            background: '#555'
											        },
											        menuItemStyle: {
											            color: '#ddd'
											        }
											    },
											    exporting: {
											     	chartOptions: {
													    chart: {
													      backgroundColor: '#555'
													    }
													  },
											        buttons: {
											            contextButton: {
											                symbol: 'download',
											                symbolFill: '#555'
											            }
											        },
											        filename: 'Upgrade Usage Chart'
											    }
											
											});
										
											me.chart3dFull = chart3d;
										}
										




							// if (para != "") {
							// 	var subUrl =
							// 		"/UpgradeCenterResult?$select=COMPANYSCHEMA,COMPANY&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and UPGRADE_ELEMENT eq '" +
							// 		uniqueBP[z] + "' and FILEVERSION eq '" + para + "' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"'";
							// } else {
							// 	var subUrl =
							// 		"/UpgradeCenterResult?$select=COMPANYSCHEMA,COMPANY&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and UPGRADE_ELEMENT eq '" +
							// 		uniqueBP[z] + "' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"'";
							// }
							
							// mdl.read(
							// 	subUrl,
							// 	null, null, true,
							// 	function(oData, oResponse) {
							// 		var tempCmpny = [];
									
							// 		tempODATAPreCheckSub = oData.results;
							// 		tempODATAPreCheckFilterSub = tempODATAPreCheckSub;
						
							// 		if (tempODATAPreCheckFilterSub.length > 0) {
							// 			for (var w = 0; w < tempODATAPreCheckFilterSub.length; w++) {
							// 				if(tempODATAPreCheckFilterSub[w ].COMPANY=="CRUZ ROJA ESPAÑOLA"){
							// 					tempODATAPreCheckFilterSub[w].COMPANY="CRUZ ROJA ESPAÑOLA DESARROLLO";
							// 				}
							// 				if(tempODATAPreCheckFilterSub[w].COMPANY=="Release"){
							// 					tempODATAPreCheckFilterSub[w].COMPANY="Stericycle Inc (de)";
							// 				}
							// 				if(tempODATAPreCheckFilter[w].COMPANY!="BPMCINSTANCE4" && tempODATAPreCheckFilter[w].COMPANY!="BPMCINSTANCE1"){
							// 					if (tempODATAPreCheckFilterSub[w].COMPANYSCHEMA != null) {
							// 			// 		if (tempODATAPreCheckFilterSub[w].COMPANYSCHEMA.toLowerCase().indexOf("sfv4") > -1 || tempODATAPreCheckFilter[w].COMPANYSCHEMA.toLowerCase().indexOf("stockpm172200_ref2") > -1 || tempODATAPreCheckFilterSub[w].COMPANYSCHEMA.toLowerCase().indexOf("hanapm") > -1 || tempODATAPreCheckFilterSub[w].COMPANYSCHEMA.toLowerCase().indexOf(
							// 			// "stg") > -1 || tempODATAPreCheckFilterSub[w].COMPANYSCHEMA.toLowerCase().indexOf("dc") > -1) {
							// 						tempCmpny.push(tempODATAPreCheckFilterSub[w].COMPANY);
							// 					// }
							// 				}
							// 				}

							// 			}
							// 			var uniqueCmpny = tempCmpny.filter(function(itm, i, tempCmpny) {
							// 				return i == tempCmpny.indexOf(itm);
							// 			});

							// 			if (oResponse.requestUri.split("eq")[1].split("'")[1].split("Best Practice Configurations Employee Central")[1] == undefined) {
							// 				if(oResponse.requestUri.split("eq")[1].split("'")[1].split("bestpracticesEmployeeCentral")[1] == undefined){
							// 					if(oResponse.requestUri.split("Best Practices Employee Central")[1] == undefined){
							// 						if(oResponse.requestUri.split("Best Practices")[1]==undefined){
							// 							if(oResponse.requestUri.split("Best Practice")[1]==undefined){
							// 								tempBPCountArray.push({
							// 									element: oResponse.requestUri.split("eq")[1].split("'")[1],
							// 									count: uniqueCmpny.length,
							// 									parent:""
							// 								});
							// 							}else{
							// 								tempBPCountArray.push({
							// 									element: oResponse.requestUri.split("eq")[1].split("'")[1].split("Best Practice")[1],
							// 									count: uniqueCmpny.length,
							// 									parent:""
							// 								});
							// 							}
														
							// 						}else{
							// 							if(oResponse.requestUri.indexOf("In-app learning")>-1){
							// 								tempBPCountArray.push({
							// 								element: oResponse.requestUri.split("eq")[1].split("'")[1],
							// 								count: uniqueCmpny.length,
							// 								parent:""
							// 							});
							// 							}else{
							// 								tempBPCountArray.push({
							// 								element: oResponse.requestUri.split("eq")[1].split("'")[1].split("Best Practices")[1],
							// 								count: uniqueCmpny.length,
							// 								parent:""
							// 							});
							// 							}
														
							// 						}
							// 					}else{
													
							// 							tempBPCountArray.push({
							// 								element: "EC "+oResponse.requestUri.split("eq")[1].split("'")[1].split("Best Practices Employee Central")[1],
							// 								count: uniqueCmpny.length,
							// 								parent: ""
							// 							});
													
							// 					}
							// 				}else{
							// 						tempBPCountArray.push({
							// 							element: "EC "+oResponse.requestUri.split("eq")[1].split("'")[1].split("bestpracticesEmployeeCentral")[1],
							// 							count: uniqueCmpny.length,
							// 							parent: ""
							// 						});
							// 				}
							// 			} else {
							// 					tempBPCountArray.push({
							// 						element: "EC "+oResponse.requestUri.split("eq")[1].split("'")[1].split("Best Practice Configurations Employee Central")[1],
							// 						count: uniqueCmpny.length,
							// 						parent: ""
							// 					});
							// 			}

							// 			totalCount += uniqueCmpny.length;
							// 			var oModelColumnChartSVAccDetail = sap.ui.getCore().getModel("oModelColumnChartSVAccDetail");
										
							// 			if(z == tempBPCountArray.length){
							// 				// var A = tempBPCountArray;
							// 				// var temp = {};
											
							// 				// for (var i=0; i<A.length; i++) {
							// 				//     temp[A[i].element] = temp[A[i].element] === undefined ? A[i].count : temp[A[i].element]+A[i].count;
							// 				// }
											
							// 				// A = [];
											
							// 				// for (var key in temp) {
							// 				//     A.push({element: key, count:temp[key],});
							// 				// }
											
							// 				// tempBPCountArray = A;
							// 				for(var a=0;a<tempBPCountArray.length;a++){
							// 					if(tempBPCountArray[a].element.indexOf("DemoData")>-1 || tempBPCountArray[a].element.indexOf("EC  Apprentice")>-1||tempBPCountArray[a].element.indexOf("Document Generation")>-1||tempBPCountArray[a].element.indexOf("EC  Contingent")>-1||tempBPCountArray[a].element.indexOf("EC  Concurrent")>-1||tempBPCountArray[a].element.indexOf("EC  Global Assignment")>-1||tempBPCountArray[a].element.indexOf("EC  Position")>-1||tempBPCountArray[a].element.indexOf("Time Off Integration")>-1||tempBPCountArray[a].element.indexOf("Company Structure")>-1){
							// 						tempBPCountArray[a].parent="Employee Central";
							// 					}else if(tempBPCountArray[a].element.indexOf("Employee Central Core")>-1 || tempBPCountArray[a].element.indexOf("EC  Core")>-1){
							// 						tempBPCountArray[a].parent="Employee Central Core";
							// 					}else if(tempBPCountArray[a].element.indexOf("EC  Benefits")>-1||tempBPCountArray[a].element.indexOf("EC  Global Benefits")>-1){
							// 						tempBPCountArray[a].parent="Employee Central Benefits";
							// 					}else if(tempBPCountArray[a].element.indexOf("EC  Dependents")>-1){
							// 						tempBPCountArray[a].parent="Employee Central Dependents Management";
							// 					}else if(tempBPCountArray[a].element.indexOf("EC  Time Off")>-1){
							// 						tempBPCountArray[a].parent="Employee Central Time Off";
							// 					}else if(tempBPCountArray[a].element.indexOf("EC  Time Sheet")>-1){
							// 						tempBPCountArray[a].parent="Employee Central Time Sheet";
							// 					}else if(tempBPCountArray[a].element.indexOf("Succession")>-1||tempBPCountArray[a].element.indexOf("Career and Development")>-1||tempBPCountArray[a].element.indexOf("Mentoring")>-1){
							// 						tempBPCountArray[a].parent="Succession and Development";
							// 					}else if(tempBPCountArray[a].element.indexOf("Recruiting")>-1||tempBPCountArray[a].element.indexOf("People Profile Talent")>-1||tempBPCountArray[a].element.indexOf("Job Description")>-1){
							// 						tempBPCountArray[a].parent="Recruiting";
							// 					}else if(tempBPCountArray[a].element.indexOf("Performance And")>-1||tempBPCountArray[a].element.indexOf("Performance and")>-1){
							// 						tempBPCountArray[a].parent="Performance and Goals";
							// 					}else{
							// 						tempBPCountArray[a].parent="Custom";
							// 					}
							// 				}
											
							// 				tempBPCountArray.sort(function(a,b) {return (a.parent > b.parent) ? 1 : ((b.parent> a.parent) ? -1 : 0);} );
											
							// 			    var result = tempBPCountArray.reduce(function (r, a) {
							// 			        r[a.parent] = r[a.parent] || [];
							// 			        r[a.parent].push(a);
							// 			        return r;
							// 			    }, Object.create(null));
											
							// 				var keys = [];
							// 				for(var k in result) keys.push(k);
											
							// 				var uniqueEmps = [];
							// 				var uniqueEmpsDet = [];
							// 				var uniqueEmpsDrill = [];
											
							// 				for(var q=0;q<keys.length;q++){
							// 					for(var t=0;t<tempBPCountArray.length;t++){
							// 						if(keys[q]==tempBPCountArray[t].parent){
														
							// 							if(uniqueEmpsDet.indexOf(tempBPCountArray[t].parent)>-1){
							// 								uniqueEmps[uniqueEmpsDet.indexOf(tempBPCountArray[t].parent)].y=uniqueEmps[uniqueEmpsDet.indexOf(tempBPCountArray[t].parent)].y+tempBPCountArray[t].count;
							// 							}else{
							// 								uniqueEmpsDet.push(tempBPCountArray[t].parent);
							// 								uniqueEmps.push({
							// 									name: keys[q],
							// 				                    y: tempBPCountArray[t].count,
							// 				                    drilldown: keys[q],
							// 				              //      dataLabels: {
							// 						            //     align: 'right',
							// 						            //     rotation: -90,
							// 						            //     shape: null
							// 						            // }
							// 								}); 
							// 								uniqueEmpsDrill.push({
							// 									name: keys[q],
							// 									id: keys[q],
							// 									data:[]
							// 								});
							// 							}
														
							// 						}
							// 					}
							// 				}
							// 				tempBPCountArray.sort(function(a,b) {return (a.count > b.count) ? 1 : ((b.count> a.count) ? -1 : 0);} );
							// 				tempBPCountArray.reverse();
											
							// 				for(var t1=0;t1<tempBPCountArray.length;t1++){
							// 					for(var t2=0;t2<uniqueEmpsDrill.length;t2++){
							// 						if(tempBPCountArray[t1].parent==uniqueEmpsDrill[t2].name){
							// 							uniqueEmpsDrill[t2].data.push([tempBPCountArray[t1].element,tempBPCountArray[t1].count]);
							// 						}
							// 						// if(t2==uniqueEmpsDrill.length-1){
							// 						// 	uniqueEmpsDrill[t2].data.sort(function(a,b) {return (a.count > b.count) ? 1 : ((b.count> a.count) ? -1 : 0);} );
							// 						// 	uniqueEmpsDrill[t2].data.reverse();
							// 						// }
							// 					}
							// 				}
											
							// 				// for(var t=0;t<tempBPCountArray.length;t++){
							// 				// 	 upgradeInput.push(tempBPCountArray[t].element);
							// 				// 	 countInput.push(tempBPCountArray[t].count);
							// 				// }
											
							// 				// tempBPCountArray.sort(function(a,b) {return (a.count > b.count) ? 1 : ((b.count> a.count) ? -1 : 0);} );
							// 				// tempBPCountArray.reverse();
											
							// 				tempdataSPUpgrade = tempBPCountArray;
											
							// 				var oModelTrend = sap.ui.getCore().getModel("oModelTrend");
							// 				oModelTrend.setProperty('/splist', tempdataSPUpgrade);
											
							// 				//viz frame start
							// 					// oDataCHSTLine = {
							// 					// 	data: tempdataSPUpgrade
							// 					// };
						
							// 					// var oModelLineChartSVAccDetailBtm = sap.ui.getCore().getModel("oModelLineChartSVAccDetailBtm");
							// 					// oModelLineChartSVAccDetailBtm.setData(oDataCHSTLine);
						
							// 					// var oVizFrame = me.getView().byId("HBarChart");
						
							// 					// oVizFrame.destroyFeeds();
						
							// 					// var oDataset = new sap.viz.ui5.data.FlattenedDataset({
							// 					// 	dimensions: [{
							// 					// 		name: "Scope Item",
							// 					// 		value: "{element}"
						
							// 					// 	}],
							// 					// 	measures: [{
							// 					// 		name: "Count",
							// 					// 		value: "{count}"
							// 					// 	}],
						
							// 					// 	data: {
							// 					// 		path: "/data"
							// 					// 	}
							// 					// });
						
							// 					// oVizFrame.setDataset(oDataset);
							// 					// oVizFrame.setModel(oModelLineChartSVAccDetailBtm);
						
							// 					// var feedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
							// 					// 	'uid': "valueAxis",
							// 					// 	'type': "Measure",
							// 					// 	'values': ["Count"]
							// 					// });
							// 					// var feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
							// 					// 	'uid': "categoryAxis",
							// 					// 	'type': "Dimension",
							// 					// 	'values': ["Scope Item"]
							// 					// });
							// 					// oVizFrame.addFeed(feedValueAxis);
							// 					// oVizFrame.addFeed(feedCategoryAxis);
						
							// 					// oVizFrame.setVizProperties({
							// 					// 	plotArea: {
							// 					// 		dataLabel: {
							// 					// 			visible: true,
							// 					// 			//formatString: CustomerFormat.FIORI_LABEL_SHORTFORMAT_2,
							// 					// 			type: "short",
							// 					// 			style: {
							// 					// 				color: "#fff"
							// 					// 			}
							// 					// 		},
							// 					// 		gap: {
							// 					// 			barSpacing: 0.2,
							// 					// 			groupSpacing: 0.2
						
							// 					// 		},
							// 					// 		dataPointSize: {
							// 					// 			min: 10,
							// 					// 			max: 20
							// 					// 		},
							// 					// 		drawingEffect: 'glossy',
							// 					// 		colorPalette: ['#024084', '#86aed6'],
							// 					// 		// colorPalette: ['#61BC52', '#302720,#4c4540'],
							// 					// 		gridline: {
							// 					// 			visible: false
							// 					// 		}
							// 					// 	},
							// 					// 	general: {
							// 					// 		background: {
							// 					// 			color: "transparent"
							// 					// 		},
							// 					// 	},
							// 					// 	categoryAxis: {
							// 					// 		title: {
							// 					// 			visible: false
							// 					// 		},
							// 					// 		label: {
							// 					// 			// style: {
							// 					// 			// 	color: "#ddd"
							// 					// 			// },
							// 					// 			// rotation:"fixed",
							// 					// 			// angle:"90"
															
							// 					// 			style: {
							// 					// 				color: "#ddd",
							// 					// 				fontSize:"8.9px"
							// 					// 			},
							// 					// 			linesOfWrap:3,
							// 					// 			angle:60
							// 					// 		},
							// 					// 		hoverShadow: {
							// 					// 			color: "#000"
							// 					// 		},
							// 					// 		mouseDownShadow: {
							// 					// 			color: "#7b7878"
							// 					// 		},
							// 					// 	},
							// 					// 	valueAxis: {
							// 					// 		label: {
							// 					// 			style: {
							// 					// 				color: "#ddd"
							// 					// 			}
							// 					// 		},
							// 					// 		title: {
							// 					// 			visible: false
							// 					// 		}
							// 					// 	},
							// 					// 	legend: {
							// 					// 		drawingEffect: 'glossy',
							// 					// 		label: {
							// 					// 			style: {
							// 					// 				color: "#ddd"
							// 					// 			}
							// 					// 		},
							// 					// 		hoverShadow: {
							// 					// 			color: "#000"
							// 					// 		},
							// 					// 		mouseDownShadow: {
							// 					// 			color: "#7b7878"
							// 					// 		}
							// 					// 	},
							// 					// 	legendGroup: {
							// 					// 		layout: {
							// 					// 			position: 'bottom'
							// 					// 		}
							// 					// 	}
						
							// 					// });
							// 					// oVizFrame.setLegendVisible(false);
						
							// 				//viz frame ends
										
							// 				// uniqueEmpsDrill.sort(function(a,b) {return (a.count > b.count) ? 1 : ((b.count> a.count) ? -1 : 0);} );
							// 				// uniqueEmpsDrill.reverse();
											
							// 				$("#repoContainerReviewUpgrade").find("svg").remove();
											
							// 				Highcharts.SVGRenderer.prototype.symbols.download = function (x, y, w, h) {
							// 				    var path = [
							// 				        // Arrow stem
							// 				        'M', x + w * 0.5, y,
							// 				        'L', x + w * 0.5, y + h * 0.7,
							// 				        // Arrow head
							// 				        'M', x + w * 0.3, y + h * 0.5,
							// 				        'L', x + w * 0.5, y + h * 0.7,
							// 				        'L', x + w * 0.7, y + h * 0.5,
							// 				        // Box
							// 				        'M', x, y + h * 0.9,
							// 				        'L', x, y + h,
							// 				        'L', x + w, y + h,
							// 				        'L', x + w, y + h * 0.9
							// 				    ];
							// 				    return path;
							// 				};
						
							// 				// var chart3d = Highcharts.chart('repoContainerReviewUpgrade', {
							// 				//     chart: {
							// 				//         type: 'column',
							// 				//         // height:'380',
							// 				//         options3d: {
							// 				//             enabled: false,
							// 				//             // alpha: 15,
							// 				//             // beta: 0,
							// 				//             // depth: 0
											            
							// 				//             alpha: 15,
							// 				//             beta: 15,
							// 				//             depth: 50,
							// 				//             viewDistance: 25
											            
											            
							// 				//         }
							// 				//     },
							// 				//     colors:["#2B908F"],
							// 				//     title: {
							// 				//         text: ''
							// 				//     },
							// 				//     subtitle: {
							// 				//         text: ''
							// 				//     },
							// 				//     plotOptions: {
							// 				//         // column: {
							// 				//         //     depth: 25
							// 				//         // },
							// 				//         series: {
							// 				//         	borderColor: 'transparent',
							// 				//             dataLabels: {
							// 				// 	            // align: 'center',
							// 				// 	            enabled: true,
							// 				// 	            color: '#f0ab00'
							// 				// 	        },
							// 				// 	        states: {
							// 			 //                   select: {
							// 			 //                       color: '#63e5e4'    
							// 			 //                   }
							// 			 //               },
							// 			 //               slicedOffset: 0,
							// 			 //               point: {
							// 			 //                   events: {
							// 			 //                       click: function(event){
							// 			 //      //                 	var chart = $('#repoContainerReviewUpgrade').highcharts();
										                        	
							// 			 //      //                 	var data = chart.series[0].data;
				
							// 				// 						// for(var q=0;q<data.length;q++){
							// 				// 						// 	if(chart.series[0].data[q].options.selected==true){
							// 				// 						// 	chart.series[0].data[q].update({
							// 				// 						//             color: '#63e5e4'
							// 				// 						//         });
																					
							// 				// 						// 	}else{
							// 				// 						// 		chart.series[0].data[q].update({
							// 				// 						//             color: '#2B908F'
							// 				// 						//         });
																				
							// 				// 						// 	}
							// 				// 						// }
																	
							// 			 //                       	me.getView().byId("ddlSP").setSelectedKeys("All");
							// 				// 						me.getView().byId("searchfield").setValue("");
																	
							// 			 //                       	var tempAryFilter = [];
							// 			 //                       	var tempAry = [];
							// 			 //                           this.select(null, true);
							// 			 //                           var ary = this.series.chart.getSelectedPoints();
										                            
							// 			 //                           for(var q=0;q<ary.length;q++){
							// 			 //                           	tempAryFilter.push(ary[q].category);
							// 			 //             //              	ary[q].update({
							// 				// 					        //     color: '#63e5e4'
							// 				// 					        // });
							// 			 //                           }
										                            
							// 			 //                           var ddlItems = me.getView().byId("ddlSP").getItems();
							// 				// 				          for(var q=0;q<ddlItems.length;q++){
							// 				// 				          	for(var j=0;j<tempAryFilter.length;j++){
							// 				// 					          	if(ddlItems[q].getText()==tempAryFilter[j]){
							// 				// 					          		tempAry.push(ddlItems[q].getKey());
							// 				// 					          	}	
							// 				// 				          	}
							// 				// 				          }
															          
							// 			 //                           	if(ary.length==0){
							// 				// 				          		tempAry.push("All");
							// 				// 				        	}
							// 				// 				        	me.getView().byId("ddlSP").setSelectedKeys(tempAry);
							// 				// 				        	me.ddlSPChanged();
							// 			 //                           // console.log(this.series.chart.getSelectedPoints());
							// 			 //                       }
							// 			 //                   }  
							// 			 //               } 
							// 				//         }
							// 				//     },
											    
							// 				//     legend: {
							// 				//     	itemStyle: {
							// 				//             color: '#ddd',
							// 				//         },
							// 				//         margin: 2,
							// 				//         // align: 'bottom',
							// 				//         // verticalAlign: 'bottom',
							// 				//         // layout: 'vertical',
							// 				//         // x: 15,
							// 				//         // y: 25,
							// 				//         // itemWidth: 50
							// 				//     },
							// 				//     xAxis: {
							// 				//         categories: upgradeInput,
							// 				//         labels: {
							// 				//             skew3d: true,
							// 				//             style: {
							// 				//                 fontSize: '11.5px',
							// 				//                 color: '#ddd',
							// 				//             },
							// 				//         //     useHTML: true,
							// 				// 		      //formatter() {
							// 				// 		      //  let label = this.value;
							// 				// 		      //  let title = this.value;
							// 				// 		      //  let style = `text-overflow: ellipsis; overflow: hidden;`; // <- YOUR OWN STYLE
							// 				// 		      //  return `<div style="${style}" title="${title}">${label}</div>`;
							// 				// 		      //},
							// 				//         },
							// 				//         // tickColor: '#bbb',
							// 				//         gridLineColor: 'transparent'
							// 				//     },
							// 				//     yAxis: {
							// 				//         title: {
							// 				//             text: null
							// 				//         },
							// 				//         labels: {
							// 				//             style: {
							// 				//                 color: '#ddd'
							// 				//             }
							// 				//         },
							// 				//         // gridLineColor: '#bbb'
							// 				//     },
							// 				//     series: [{
							// 				//         name: 'Count',
							// 				//         data: countInput,
							// 				//     }],
							// 				//     credits: {
							// 				// 	    enabled: false
							// 				// 	  },
							// 				//     navigation: {
							// 				//         buttonOptions: {
							// 				//             verticalAlign: 'top',
							// 				//             x:9,
							// 				//             y:-10
							// 				//         },
							// 				//         menuStyle: {
							// 				//             background: '#555'
							// 				//         },
							// 				//         menuItemStyle: {
							// 				//             color: '#ddd'
							// 				//         }
							// 				//     },
							// 				//     exporting: {
							// 				//      	chartOptions: {
							// 				// 		    chart: {
							// 				// 		      backgroundColor: '#555'
							// 				// 		    }
							// 				// 		  },
							// 				//         buttons: {
							// 				//             contextButton: {
							// 				//                 symbol: 'download',
							// 				//                 symbolFill: '#555'
							// 				//             }
							// 				//         },
							// 				//         filename: 'Upgrade Usage Chart'
							// 				//     }
							// 				// });
											
							// 				// Create the chart
							// 				// Highcharts.setOptions({
							// 				//     lang: {
							// 				//         drillUpText: 'Back'
							// 				//     }
							// 				// });
											
											
							// 				Highcharts.theme = {
							// 				    colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
							// 				        '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
							// 				    chart: {
							// 				        backgroundColor: {
							// 				            linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
							// 				            stops: [
							// 				                [0, '#2a2a2b'],
							// 				                [1, '#3e3e40']
							// 				            ]
							// 				        },
							// 				        style: {
							// 				            fontFamily: '\'Unica One\', sans-serif'
							// 				        },
							// 				        plotBorderColor: '#606063'
							// 				    },
							// 				    title: {
							// 				        style: {
							// 				            color: '#E0E0E3',
							// 				            textTransform: 'uppercase',
							// 				            fontSize: '20px'
							// 				        }
							// 				    },
							// 				    subtitle: {
							// 				        style: {
							// 				            color: '#E0E0E3',
							// 				            textTransform: 'uppercase'
							// 				        }
							// 				    },
							// 				    xAxis: {
							// 				      //  gridLineColor: '#707073',
							// 				      //  labels: {
							// 				      //  	rotation: 0,
							// 				      //  	staggerLines: 2,
							// 				      //  	overflow:"justify",
							// 				      //      style: {
							// 				      //          color: '#E0E0E3',
							// 				      //          fontSize: '9px'
							// 				      //      },
											            
							// 				      ////      useHTML: true,
							// 						    // // formatter() {
							// 						    // //   return '<div style="font-size: 9px;">'+this.value+'</div>';
							// 						    // // },
							// 				      //  },
							// 				        lineColor: '#707073',
							// 				        minorGridLineColor: '#505053',
							// 				        tickColor: '#707073',
							// 				        title: {
							// 				            style: {
							// 				                color: '#A0A0A3'
											
							// 				            }
							// 				        }
							// 				    },
							// 				    yAxis: {
							// 				        // gridLineColor: '#707073',
							// 				        labels: {
							// 				            style: {
							// 				                color: '#E0E0E3'
							// 				            }
							// 				        },
							// 				        gridLineColor: 'transparent',
							// 				        // lineColor: '#707073',
							// 				        // minorGridLineColor: '#505053',
							// 				        tickColor: '#707073',
							// 				        tickWidth: 1,
							// 				        title: {
							// 				            style: {
							// 				                color: '#A0A0A3'
							// 				            }
							// 				        }
							// 				    },
							// 				    tooltip: {
							// 				        backgroundColor: 'rgba(0, 0, 0, 0.85)',
							// 				        style: {
							// 				            color: '#F0F0F0'
							// 				        }
							// 				    },
							// 				    lang: {
							// 				        drillUpText: 'Back'
							// 				    },
							// 				    plotOptions: {
							// 				        series: {
							// 				            dataLabels: {
							// 				                color: '#B0B0B3'
							// 				            },
							// 				            marker: {
							// 				                lineColor: '#333'
							// 				            }
							// 				        },
							// 				        boxplot: {
							// 				            fillColor: '#505053'
							// 				        },
							// 				        candlestick: {
							// 				            lineColor: 'white'
							// 				        },
							// 				        errorbar: {
							// 				            color: 'white'
							// 				        }
							// 				    },
							// 				    legend: {
							// 				        itemStyle: {
							// 				            color: '#E0E0E3'
							// 				        },
							// 				        itemHoverStyle: {
							// 				            color: '#FFF'
							// 				        },
							// 				        itemHiddenStyle: {
							// 				            color: '#606063'
							// 				        }
							// 				    },
							// 				    credits: {
							// 				        style: {
							// 				            color: '#666'
							// 				        }
							// 				    },
							// 				    labels: {
							// 				        style: {
							// 				            color: '#707073'
							// 				        }
							// 				    },
											
							// 				    drilldown: {
							// 				        activeAxisLabelStyle: {
							// 				            color: '#F0F0F3',
							// 				            fontWeight: 'normal'
							// 				        },
							// 				        activeDataLabelStyle: {
							// 				            color: '#F0F0F3'
							// 				        },
							// 				         drillUpButton: {
							// 				            relativeTo: 'spacingBox',
											            
							// 				            position: {
							// 				            	align:'left',
							// 				                y: -20,
							// 				                // x: -20
							// 				            },
							// 				            // theme: {
							// 				            //     fill: 'white',
							// 				            //     'stroke-width': 1,
							// 				            //     stroke: 'silver',
							// 				            //     r: 0,
							// 				            //     states: {
							// 				            //         hover: {
							// 				            //             fill: '#a4edba'
							// 				            //         },
							// 				            //         select: {
							// 				            //             stroke: '#039',
							// 				            //             fill: '#a4edba'
							// 				            //         }
							// 				            //     }
							// 				            // }
											
							// 				        },
        
							// 				    },
											
							// 				    navigation: {
							// 				        buttonOptions: {
							// 				            symbolStroke: '#DDDDDD',
							// 				            theme: {
							// 				                fill: '#505053'
							// 				            }
							// 				        }
							// 				    },
											
							// 				    // scroll charts
							// 				    rangeSelector: {
							// 				        buttonTheme: {
							// 				            fill: '#505053',
							// 				            stroke: '#000000',
							// 				            style: {
							// 				                color: '#CCC'
							// 				            },
							// 				            states: {
							// 				                hover: {
							// 				                    fill: '#707073',
							// 				                    stroke: '#000000',
							// 				                    style: {
							// 				                        color: 'white'
							// 				                    }
							// 				                },
							// 				                select: {
							// 				                    fill: '#000003',
							// 				                    stroke: '#000000',
							// 				                    style: {
							// 				                        color: 'white'
							// 				                    }
							// 				                }
							// 				            }
							// 				        },
							// 				        inputBoxBorderColor: '#505053',
							// 				        inputStyle: {
							// 				            backgroundColor: '#333',
							// 				            color: 'silver'
							// 				        },
							// 				        labelStyle: {
							// 				            color: 'silver'
							// 				        }
							// 				    },
											
							// 				    navigator: {
							// 				        handles: {
							// 				            backgroundColor: '#666',
							// 				            borderColor: '#AAA'
							// 				        },
							// 				        outlineColor: '#CCC',
							// 				        maskFill: 'rgba(255,255,255,0.1)',
							// 				        series: {
							// 				            color: '#7798BF',
							// 				            lineColor: '#A6C7ED'
							// 				        },
							// 				        xAxis: {
							// 				            gridLineColor: '#505053'
							// 				        }
							// 				    },
											
							// 				    scrollbar: {
							// 				        barBackgroundColor: '#808083',
							// 				        barBorderColor: '#808083',
							// 				        buttonArrowColor: '#CCC',
							// 				        buttonBackgroundColor: '#606063',
							// 				        buttonBorderColor: '#606063',
							// 				        rifleColor: '#FFF',
							// 				        trackBackgroundColor: '#404043',
							// 				        trackBorderColor: '#404043'
							// 				    },
											
							// 				    // special colors for some of the
							// 				    legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
							// 				    background2: '#505053',
							// 				    dataLabelsColor: '#B0B0B3',
							// 				    textColor: '#C0C0C0',
							// 				    contrastTextColor: '#F0F0F3',
							// 				    maskColor: 'rgba(255,255,255,0.3)'
							// 				};
											
							// 				// Apply the theme
							// 				Highcharts.setOptions(Highcharts.theme);
											
											
							// 				var chart3d = Highcharts.chart('repoContainerReviewUpgrade', {
							// 				    chart: {
							// 				        type: 'bar'
							// 				    },
							// 				    title: {
							// 				        text: ''
							// 				    },
							// 				    subtitle: {
							// 				        text: ''
							// 				    },
							// 				    xAxis: {
							// 				        type: 'category',
							// 				        gridLineColor: '#707073',
							// 				        labels: {
							// 				        	rotation: 0,
							// 				        	staggerLines: 2,
							// 				        	overflow:"justify",
							// 				            style: {
							// 				                color: '#E0E0E3',
							// 				                fontSize: '9px'
							// 				            },
											            
							// 				      //      useHTML: true,
							// 						    // formatter() {
							// 						    //   return '<div style="font-size: 9px;">'+this.value+'</div>';
							// 						    // },
							// 				        },
											        
							// 						// labels: {
							// 						// 	style: {
							// 						// 		// color: '#ddd',
							// 						// 		fontSize: '9px'
							// 						// 	},
														
							// 						// },
							// 						// categories: timeInput,
							// 						tickColor: 'transparent'
							// 				    },
							// 				    yAxis: {
							// 				        title: {
							// 				            text: ''
							// 				        }
											
							// 				    },
							// 				    legend: {
							// 				        enabled: false
							// 				    },
							// 				    plotOptions: {
							// 				        series: {
							// 				            borderWidth: 0,
							// 				            dataLabels: {
							// 				                enabled: true,
							// 				                format: '{point.y}'
							// 				            }
							// 				        }
							// 				    },
											
							// 				    tooltip: {
							// 				        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
							// 				        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
							// 				    },
											
							// 				    series: [
							// 				        {
							// 				            name: "Configuration Blocks",
							// 				            colorByPoint: true,
							// 				            // data: [
							// 				            //     {
							// 				            //         name: "Chrome",
							// 				            //         y: 62.74,
							// 				            //         drilldown: "Chrome"
							// 				            //     },
							// 				            //     {
							// 				            //         name: "Firefox",
							// 				            //         y: 10.57,
							// 				            //         drilldown: "Firefox"
							// 				            //     },
							// 				            //     {
							// 				            //         name: "Internet Explorer",
							// 				            //         y: 7.23,
							// 				            //         drilldown: "Internet Explorer"
							// 				            //     },
							// 				            //     {
							// 				            //         name: "Safari",
							// 				            //         y: 5.58,
							// 				            //         drilldown: "Safari"
							// 				            //     },
							// 				            //     {
							// 				            //         name: "Edge",
							// 				            //         y: 4.02,
							// 				            //         drilldown: "Edge"
							// 				            //     },
							// 				            //     {
							// 				            //         name: "Opera",
							// 				            //         y: 1.92,
							// 				            //         drilldown: "Opera"
							// 				            //     },
							// 				            //     {
							// 				            //         name: "Other",
							// 				            //         y: 7.62,
							// 				            //         drilldown: null
							// 				            //     }
							// 				            // ]
							// 				          //   dataLabels: [{
							// 						        //     // align: 'left',
							// 						        //     verticalAlign : 'top',
							// 						        //     format: '({point.name})'
							// 						        // }, 
							// 						        // {
							// 						        //     // align: 'right',
							// 						        //     verticalAlign : 'bottom',
							// 						        //     format: '{y} points'
							// 						        // }
							// 						        // ],
							// 				            data:uniqueEmps
							// 				        }
							// 				    ],
							// 				    drilldown: {
							// 				        // series: [
							// 				        //     {
							// 				        //         name: "Chrome",
							// 				        //         id: "Chrome",
							// 				        //         data: [
							// 				        //             [
							// 				        //                 "v65.0",
							// 				        //                 0.1
							// 				        //             ],
							// 				        //             [
							// 				        //                 "v64.0",
							// 				        //                 1.3
							// 				        //             ],
							// 				        //             [
							// 				        //                 "v63.0",
							// 				        //                 53.02
							// 				        //             ],
							// 				        //             [
							// 				        //                 "v62.0",
							// 				        //                 1.4
							// 				        //             ],
							// 				        //             [
							// 				        //                 "v61.0",
							// 				        //                 0.88
							// 				        //             ],
							// 				        //             [
							// 				        //                 "v60.0",
							// 				        //                 0.56
							// 				        //             ],
							// 				        //             [
							// 				        //                 "v59.0",
							// 				        //                 0.45
							// 				        //             ],
							// 				        //             [
							// 				        //                 "v58.0",
							// 				        //                 0.49
							// 				        //             ],
							// 				        //             [
							// 				        //                 "v57.0",
							// 				        //                 0.32
							// 				        //             ],
							// 				        //             [
							// 				        //                 "v56.0",
							// 				        //                 0.29
							// 				        //             ],
							// 				        //             [
							// 				        //                 "v55.0",
							// 				        //                 0.79
							// 				        //             ],
							// 				        //             [
							// 				        //                 "v54.0",
							// 				        //                 0.18
							// 				        //             ],
							// 				        //             [
							// 				        //                 "v51.0",
							// 				        //                 0.13
							// 				        //             ],
							// 				        //             [
							// 				        //                 "v49.0",
							// 				        //                 2.16
							// 				        //             ],
							// 				        //             [
							// 				        //                 "v48.0",
							// 				        //                 0.13
							// 				        //             ],
							// 				        //             [
							// 				        //                 "v47.0",
							// 				        //                 0.11
							// 				        //             ],
							// 				        //             [
							// 				        //                 "v43.0",
							// 				        //                 0.17
							// 				        //             ],
							// 				        //             [
							// 				        //                 "v29.0",
							// 				        //                 0.26
							// 				        //             ]
							// 				        //         ]
							// 				        //     },
							// 				        //     {
							// 				        //         name: "Firefox",
							// 				        //         id: "Firefox",
							// 				        //         data: [
							// 				        //             [
							// 				        //                 "v58.0",
							// 				        //                 1.02
							// 				        //             ],
							// 				        //             [
							// 				        //                 "v57.0",
							// 				        //                 7.36
							// 				        //             ],
							// 				        //             [
							// 				        //                 "v56.0",
							// 				        //                 0.35
							// 				        //             ],
							// 				        //             [
							// 				        //                 "v55.0",
							// 				        //                 0.11
							// 				        //             ],
							// 				        //             [
							// 				        //                 "v54.0",
							// 				        //                 0.1
							// 				        //             ],
							// 				        //             [
							// 				        //                 "v52.0",
							// 				        //                 0.95
							// 				        //             ],
							// 				        //             [
							// 				        //                 "v51.0",
							// 				        //                 0.15
							// 				        //             ],
							// 				        //             [
							// 				        //                 "v50.0",
							// 				        //                 0.1
							// 				        //             ],
							// 				        //             [
							// 				        //                 "v48.0",
							// 				        //                 0.31
							// 				        //             ],
							// 				        //             [
							// 				        //                 "v47.0",
							// 				        //                 0.12
							// 				        //             ]
							// 				        //         ]
							// 				        //     },
							// 				        //     {
							// 				        //         name: "Internet Explorer",
							// 				        //         id: "Internet Explorer",
							// 				        //         data: [
							// 				        //             [
							// 				        //                 "v11.0",
							// 				        //                 6.2
							// 				        //             ],
							// 				        //             [
							// 				        //                 "v10.0",
							// 				        //                 0.29
							// 				        //             ],
							// 				        //             [
							// 				        //                 "v9.0",
							// 				        //                 0.27
							// 				        //             ],
							// 				        //             [
							// 				        //                 "v8.0",
							// 				        //                 0.47
							// 				        //             ]
							// 				        //         ]
							// 				        //     },
							// 				        //     {
							// 				        //         name: "Safari",
							// 				        //         id: "Safari",
							// 				        //         data: [
							// 				        //             [
							// 				        //                 "v11.0",
							// 				        //                 3.39
							// 				        //             ],
							// 				        //             [
							// 				        //                 "v10.1",
							// 				        //                 0.96
							// 				        //             ],
							// 				        //             [
							// 				        //                 "v10.0",
							// 				        //                 0.36
							// 				        //             ],
							// 				        //             [
							// 				        //                 "v9.1",
							// 				        //                 0.54
							// 				        //             ],
							// 				        //             [
							// 				        //                 "v9.0",
							// 				        //                 0.13
							// 				        //             ],
							// 				        //             [
							// 				        //                 "v5.1",
							// 				        //                 0.2
							// 				        //             ]
							// 				        //         ]
							// 				        //     },
							// 				        //     {
							// 				        //         name: "Edge",
							// 				        //         id: "Edge",
							// 				        //         data: [
							// 				        //             [
							// 				        //                 "v16",
							// 				        //                 2.6
							// 				        //             ],
							// 				        //             [
							// 				        //                 "v15",
							// 				        //                 0.92
							// 				        //             ],
							// 				        //             [
							// 				        //                 "v14",
							// 				        //                 0.4
							// 				        //             ],
							// 				        //             [
							// 				        //                 "v13",
							// 				        //                 0.1
							// 				        //             ]
							// 				        //         ]
							// 				        //     },
							// 				        //     {
							// 				        //         name: "Opera",
							// 				        //         id: "Opera",
							// 				        //         data: [
							// 				        //             [
							// 				        //                 "v50.0",
							// 				        //                 0.96
							// 				        //             ],
							// 				        //             [
							// 				        //                 "v49.0",
							// 				        //                 0.82
							// 				        //             ],
							// 				        //             [
							// 				        //                 "v12.1",
							// 				        //                 0.14
							// 				        //             ]
							// 				        //         ]
							// 				        //     }
							// 				        // ]
							// 				        series:uniqueEmpsDrill
							// 				    },
											    
							// 				    navigation: {
							// 				        buttonOptions: {
							// 				            verticalAlign: 'top',
							// 				            x:9,
							// 				            y:-10
							// 				        },
							// 				        menuStyle: {
							// 				            background: '#555'
							// 				        },
							// 				        menuItemStyle: {
							// 				            color: '#ddd'
							// 				        }
							// 				    },
							// 				    exporting: {
							// 				     	chartOptions: {
							// 						    chart: {
							// 						      backgroundColor: '#555'
							// 						    }
							// 						  },
							// 				        buttons: {
							// 				            contextButton: {
							// 				                symbol: 'download',
							// 				                symbolFill: '#555'
							// 				            }
							// 				        },
							// 				        filename: 'Upgrade Usage Chart'
							// 				    }
											
							// 				});
										
											
							// 			}
										
							// 			oModelColumnChartSVAccDetail.setProperty('/data', tempBPCountArray);
										
							// 		}
							// 	},
							// 	function(oError) {
							// 		console.log("Error 127");
							// 	});
								
								
						}

						var oDataGrp = {
							"splist": tempdataSP
						};

						oModelGroups.setData(oDataGrp);
						me.getView().byId("ddlSP").setModel(oModelGroups);
						me.getView().byId("ddlSP").setSelectedKeys("All");
						
					}
					}else{
						var oDataGrp = {
							"splist": []
						};
						var oModelGroups = sap.ui.getCore().getModel("oModelGroups");

						oModelGroups.setData(oDataGrp);
						me.getView().byId("ddlSP").setModel(oModelGroups);
						me.getView().byId("ddlSP").setSelectedKeys("All");
						
						var oModelTrend = sap.ui.getCore().getModel("oModelTrend");
						oModelTrend.setProperty('/splist', []);
						
						var oModelColumnChartSVAccDetail = sap.ui.getCore().getModel("oModelColumnChartSVAccDetail");
						oModelColumnChartSVAccDetail.setProperty('/data', []);
						
						$("#repoContainerReviewUpgrade").find("svg").remove();
					}
				},
				function(oError) {
					console.log("Error 127");
				});

		},
		onEnlargeHC:function(){
			// var me = this;
	       //$('.barChartVBox').toggleClass('modal');
	       //$('.repoContainerReviewUpgradeChart', this).highcharts().reflow();
	       
	       //me.chart3dFull.fullscreen.toggle();
	       
	       var container = document.getElementById('repoContainerReviewUpgrade');

                    if (container.requestFullscreen) {
                        container.requestFullscreen();
                    } else if (container.mozRequestFullScreen) {
                        container.mozRequestFullScreen();
                    } else if (container.webkitRequestFullscreen) {
                        container.webkitRequestFullscreen();
                    } else if (container.msRequestFullscreen) {
                        container.msRequestFullscreen();
                    }
		},
		// loadLineChart: function(mdl, para, fromCompDate,toCompDate) {
		// 	var greenfield = [];
		// 	var brownfield = [];
		// 	var greenFeedArry = [];
		// 	var brownFeedArry = [];
			
		// 	var tempDate = [];
		// 	var oDataCHSTLine = {};
		// 	var inputFeedArry = [];
		// 	var preInputAry = [];
		// 	var oModelLineChartSVAccDetail = new sap.ui.model.json.JSONModel();
		// 	sap.ui.getCore().setModel(oModelLineChartSVAccDetail, "oModelLineChartSVAccDetail");
		// 	var me = this;

		// 	if (para != "") {
		// 		var url =
		// 			"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANY,COMPANYSCHEMA,TIME_STAMP&$orderby=TIME_STAMP asc&$filter=COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
		// 			para + "' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"'";
		// 	} else {
		// 		var url =
		// 			"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANY,COMPANYSCHEMA,TIME_STAMP&$orderby=TIME_STAMP asc&$filter=COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"'";
		// 	}

		// 	mdl.read(
		// 		url,
		// 		null, null, true,
		// 		function(oData, oResponse) {
		// 			if (oData.results.length > 0) {
		// 				for (var w = 0; w < oData.results.length; w++) {

		// 					if (oData.results[w].COMPANYSCHEMA.toLowerCase().indexOf("bizx") === -1) {
		// 						if (oData.results[w].COMPANY.toLowerCase().indexOf("test") === -1 && oData.results[w].COMPANY.toLowerCase().indexOf("demo") ===
		// 							-1) {
		// 							tempDate.push({
		// 								comp: oData.results[w].COMPANY + GetDDMMYY(oData.results[w].TIME_STAMP),
		// 								cmpny: oData.results[w].COMPANY,
		// 								time: GetDDMMYY(oData.results[w].TIME_STAMP),
		// 								timeComp: GetDDMM(oData.results[w].TIME_STAMP),
		// 								upgrade: oData.results[w].UPGRADE_ELEMENT
		// 							});
		// 						}
		// 					}
		// 				}
						

		// 				var tempDatetempDate = tempDate.reduce(function(item, e1) {
		// 					var matches = item.filter(function(e2) {
		// 						return e1.comp == e2.comp;
		// 					});
		// 					if (matches.length == 0) {
		// 						item.push(e1);
		// 					}
		// 					return item;
		// 				}, []);

		// 				var output = [];

		// 				tempDatetempDate.forEach(function(value) {
		// 					var existing = output.filter(function(v, i) {
		// 						return v.timeComp == value.timeComp;
		// 					});
							
		// 					if (existing.length) {
		// 						var existingIndex = output.indexOf(existing[0]);
		// 						output[existingIndex].cmpny = output[existingIndex].cmpny.concat(value.cmpny);
		// 						output[existingIndex].upgrade = output[existingIndex].upgrade.concat(value.upgrade);
		// 						output[existingIndex].time = output[existingIndex].time.concat(value.time);
		// 					} else {
		// 						if (typeof value.cmpny == 'string'){
		// 							value.cmpny = [value.cmpny];
		// 						}
		// 						if (typeof value.upgrade == 'string'){
		// 							value.upgrade = [value.upgrade];
		// 						}
		// 						if (typeof value.time == 'string'){
		// 							value.time = [value.time];
		// 						}
		// 						 output.push(value);
		// 					}
		// 				});
						
		// 				for(var q=0;q<output.length;q++){
		// 					preInputAry.push({timeComp:output[q].timeComp,items:[]});
							
		// 					for(var w=0;w<output[q].cmpny.length;w++){
		// 							preInputAry[q].items.push({cmpny:output[q].cmpny[w],upgrade:output[q].upgrade[w],time:output[q].time[w]});
		// 					}
		// 				}
						
		// 				for(var q=0;q<preInputAry.length;q++){
		// 					for(var w=0;w<preInputAry[q].items.length;w++){
		// 						if(preInputAry[q].items[w].upgrade.indexOf("Core")>-1){
		// 							// if(greenfield.length>0){
		// 							// 	for(var t=0;t<greenfield.length;t++){
		// 							// 		if(preInputAry[q].timeComp!=greenfield[t].timeComp){
		// 							// 			// if(preInputAry[q].items[w].cmpny==greenfield[t].cmpny){
		// 							// 				greenfield.push({cmpny:preInputAry[q].items[w].cmpny,time:preInputAry[q].items[w].time,timeComp:preInputAry[q].timeComp});
		// 							// 			// }
		// 							// 		}else{
		// 							// 			if(preInputAry[q].items[w].cmpny!=greenfield[t].cmpny){
		// 							// 				greenfield.push({cmpny:preInputAry[q].items[w].cmpny,time:preInputAry[q].items[w].time,timeComp:preInputAry[q].timeComp});
		// 							// 			}
		// 							// 		}	
		// 							// 	}
		// 							// }else{
		// 								greenfield.push({cmpny:preInputAry[q].items[w].cmpny,time:preInputAry[q].items[w].time,timeComp:preInputAry[q].timeComp,upgrade:preInputAry[q].items[w].upgrade});
		// 							// }
		// 						}else{
		// 							// if(greenfield.length>0){
		// 							// 	for(var t=0;t<greenfield.length;t++){
		// 							// 		if(preInputAry[q].timeComp!=greenfield[t].timeComp){
		// 							// 			// if(preInputAry[q].items[w].cmpny==greenfield[t].cmpny){
		// 							// 				brownfield.push({cmpny:preInputAry[q].items[w].cmpny,time:preInputAry[q].items[w].time,timeComp:preInputAry[q].timeComp});
		// 							// 			// }
		// 							// 		}else{
		// 							// 			if(preInputAry[q].items[w].cmpny!=greenfield[t].cmpny){
		// 							// 				brownfield.push({cmpny:preInputAry[q].items[w].cmpny,time:preInputAry[q].items[w].time,timeComp:preInputAry[q].timeComp});
		// 							// 			}
		// 							// 		}
		// 							// 	}
										
		// 							// }else{
		// 								brownfield.push({cmpny:preInputAry[q].items[w].cmpny,time:preInputAry[q].items[w].time,timeComp:preInputAry[q].timeComp,upgrade:preInputAry[q].items[w].upgrade});
		// 							// }
									
		// 						}
		// 					}
		// 				}
						
		// 				// greenfield.sort(function(a,b) {return (a.cmpny > b.cmpny) ? 1 : ((b.cmpny> a.cmpny) ? -1 : 0);} );
		// 				// brownfield.sort(function(a,b) {return (a.cmpny > b.cmpny) ? 1 : ((b.cmpny> a.cmpny) ? -1 : 0);} );
						
						
		// 				for(var q=0;q<greenfield.length;q++){
		// 					for(var z=0;z<brownfield.length;z++){
		// 						if(greenfield[q].cmpny==brownfield[z].cmpny){
		// 							if(greenfield[q].timeComp==brownfield[z].timeComp){
		// 								if(new Date(greenfield[q].time)<new Date(brownfield[z].time)){
		// 									brownfield.splice(z, 1);
		// 								}else{
		// 									greenfield.splice(q, 1);
		// 								}
		// 							}else{
		// 								var timeDiff = Math.abs(new Date(greenfield[q].time).getTime() - new Date(brownfield[z].time).getTime());
		// 								var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
		// 								if(diffDays>30){
		// 									if(new Date(greenfield[q].time)<new Date(brownfield[z].time)){
		// 										brownfield.splice(z, 1);
		// 									}else{
		// 										greenfield.splice(q, 1);
		// 									}
		// 								}else{
		// 									brownfield.splice(z, 1);
		// 								}
		// 							}
		// 						}else{
									
		// 						}
		// 					}
		// 				}
						
		// 				// var tempDataGreen = greenfield.reduce(function(item, e1) {
		// 				// 	var matches = item.filter(function(e2) {
		// 				// 		return e1.comp == e2.comp;
		// 				// 	});
		// 				// 	if (matches.length == 0) {
		// 				// 		item.push(e1);
		// 				// 	}
		// 				// 	return item;
		// 				// }, []);
						
		// 				var outputGreen = [];

		// 				greenfield.forEach(function(value) {
		// 					var existing = outputGreen.filter(function(v, i) {
		// 						return v.timeComp == value.timeComp;
		// 					});
							
		// 					if (existing.length) {
		// 						var existingIndex = outputGreen.indexOf(existing[0]);
		// 						outputGreen[existingIndex].cmpny = outputGreen[existingIndex].cmpny.concat(value.cmpny);
		// 						outputGreen[existingIndex].time = outputGreen[existingIndex].time.concat(value.time);
		// 					} else {
		// 						if (typeof value.cmpny == 'string'){
		// 							value.cmpny = [value.cmpny];
		// 						}
		// 						if (typeof value.time == 'string'){
		// 							value.time = [value.time];
		// 						}
		// 						 outputGreen.push(value);
		// 					}
		// 				});
						
		// 				var outputBrown = [];

		// 				brownfield.forEach(function(value) {
		// 					var existing = outputBrown.filter(function(v, i) {
		// 						return v.timeComp == value.timeComp;
		// 					});
							
		// 					if (existing.length) {
		// 						var existingIndex = outputBrown.indexOf(existing[0]);
		// 						outputBrown[existingIndex].cmpny = outputBrown[existingIndex].cmpny.concat(value.cmpny);
		// 						outputBrown[existingIndex].time = outputBrown[existingIndex].time.concat(value.time);
		// 					} else {
		// 						if (typeof value.cmpny == 'string'){
		// 							value.cmpny = [value.cmpny];
		// 						}
		// 						if (typeof value.time == 'string'){
		// 							value.time = [value.time];
		// 						}
		// 						 outputBrown.push(value);
		// 					}
		// 				});
						
		// 				// preInputAry.sort(function(a,b) {return (a.timeComp> b.timeComp) ? 1 : ((b.timeComp> a.timeComp) ? -1 : 0);} );					
		// 				// outputGreen.sort(function(a,b) {return (a.timeComp> b.timeComp) ? 1 : ((b.timeComp> a.timeComp) ? -1 : 0);} );
		// 				// outputBrown.sort(function(a,b) {return (a.timeComp> b.timeComp) ? 1 : ((b.timeComp> a.timeComp) ? -1 : 0);} );
						
		// 				if(outputGreen.length<preInputAry.length){
		// 					var tempGreenCount = preInputAry.length-outputGreen.length;
		// 					for(var t=0;t<tempGreenCount.length;t++){
		// 						outputGreen.push({
		// 							cmpny:[],
		// 							timeComp:preInputAry[outputGreen.length+t+1].timeComp
		// 						});
		// 					}
		// 				}
						
		// 				if(outputBrown.length<preInputAry.length){
		// 					var tempGreenCount = preInputAry.length-outputBrown.length;
		// 					for(var t=0;t<tempGreenCount.length;t++){
		// 						outputBrown.push({
		// 							cmpny:[],
		// 							timeComp:preInputAry[outputBrown.length+t+1].timeComp
		// 						});
		// 					}
							
		// 					// for (var r=0;r<preInputAry.length;r++){
		// 					// 	for(var s=0;s<outputBrown.length;s++){
		// 					// 		if(){
										
		// 					// 		}
		// 					// 	}
		// 					// }
		// 				}
						
		// 				for(var w=0;w<preInputAry.length;w++){
		// 					if(outputBrown[w]==undefined){
		// 						outputBrown[w] = [];
		// 						outputBrown[w].cmpny = [];
		// 						// outputBrown[w].cmpny.length = 0;
		// 					}
		// 					if(outputGreen[w]==undefined){
		// 						outputGreen[w] = [];
		// 						outputGreen[w].cmpny = [];
		// 						// outputGreen[w].cmpny.length = 0;
		// 					}
		// 					inputFeedArry.push({
		// 						time: preInputAry[w].timeComp,
		// 						cmpny: outputGreen[w].cmpny.length,
		// 						cmpny1: outputBrown[w].cmpny.length
		// 					});
		// 				}

		// 				// for (var w = 0; w < preInputAry.length; w++) {
		// 				// 	inputFeedArry.push({
		// 				// 		time: preInputAry[w].timeComp,
		// 				// 		cmpny: greenfield.length,
		// 				// 		cmpny1: brownfield.length
		// 				// 	});
		// 				// }

		// 				oDataCHSTLine = {
		// 					data: inputFeedArry
		// 				};

		// 				var oModelLineChartSVAccDetail = sap.ui.getCore().getModel("oModelLineChartSVAccDetail");
		// 				oModelLineChartSVAccDetail.setData(oDataCHSTLine);

		// 				var oVizFrame = me.getView().byId("AreaDetailLineChartDir");

		// 				oVizFrame.destroyFeeds();

		// 				var oDataset = new sap.viz.ui5.data.FlattenedDataset({
		// 					dimensions: [{
		// 						name: "Time",
		// 						value: "{time}"

		// 					}],
		// 					measures: [{
		// 						name: "Green Field Customers",
		// 						value: "{cmpny}"
		// 					},
		// 					{
		// 						name: "Brown Field Customers",
		// 						value: "{cmpny1}"
		// 					}],

		// 					data: {
		// 						path: "/data"
		// 					}
		// 				});

		// 				oVizFrame.setDataset(oDataset);
		// 				oVizFrame.setModel(oModelLineChartSVAccDetail);

		// 				var feedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
		// 					'uid': "valueAxis",
		// 					'type': "Measure",
		// 					'values': ["Green Field Customers"]
		// 				});
		// 				var feedValueAxis2 = new sap.viz.ui5.controls.common.feeds.FeedItem({
		// 					'uid': "valueAxis",
		// 					'type': "Measure",
		// 					'values': ["Brown Field Customers"]
		// 				});
		// 				var feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
		// 					'uid': "categoryAxis",
		// 					'type': "Dimension",
		// 					'values': ["Time"]
		// 				});
		// 				oVizFrame.addFeed(feedValueAxis);
		// 				oVizFrame.addFeed(feedValueAxis2);
		// 				oVizFrame.addFeed(feedCategoryAxis);
						
		// 				// oVizFrame.setVizProperties({
		// 				// 	plotArea: {
		// 				// 		dataLabel: {
		// 				// 			// formatString:formatPattern.SHORTFLOAT_MFD2,
		// 				// 			visible: true,
		// 				// 			style: {
		// 				// 				color: "#fff"
		// 				// 			}
		// 				// 		},
		// 				// 		colorPalette: ['#427CAC', '#dddddd'],
		// 				// 		gridline: {
		// 				// 			visible: false
		// 				// 		}
		// 				// 	},
		// 				// 	general: {
		// 				// 		background: {
		// 				// 			color: "#555"
		// 				// 		},
		// 				// 	},
		// 				// 	valueAxis: {
		// 				// 		label: {
		// 				// 			style: {
		// 				// 				color: "#ddd"
		// 				// 			}
		// 				// 			// formatString: formatPattern.SHORTFLOAT
		// 				// 		},
		// 				// 		title: {
		// 				// 			visible: false
		// 				// 		},
		// 				// 	},
		// 				// 	categoryAxis: {
		// 				// 		title: {
		// 				// 			visible: false
		// 				// 		},
		// 				// 		label: {
		// 				// 			style: {
		// 				// 				color: "#ddd"
		// 				// 			}
		// 				// 		},
		// 				// 		hoverShadow: {
		// 				// 			color: "#000"
		// 				// 		},
		// 				// 		mouseDownShadow: {
		// 				// 			color: "#7b7878"
		// 				// 		}
		// 				// 	},
		// 				// 	title: {
		// 				// 		visible: false,
		// 				// 		text: ' '
		// 				// 	}
		// 				// });
						
						
		// 				oVizFrame.setVizProperties({
		// 					plotArea: {
		// 						dataLabel: {
		// 							visible: true,
		// 							//formatString: CustomerFormat.FIORI_LABEL_SHORTFORMAT_2,
		// 							type: "short",
		// 							style: {
		// 								color: "#fff"
		// 							}
		// 						},
		// 						gap: {
		// 							barSpacing: 0.3,
		// 							groupSpacing: 0.3

		// 						},
		// 						dataPointSize: {
		// 							min: 20,
		// 							max: 30
		// 						},
		// 						drawingEffect: 'glossy',
		// 						colorPalette: ['#529726', '#8B4513'],
		// 						gridline: {
		// 							visible: false
		// 						}
		// 					},
		// 					general: {
		// 						background: {
		// 							color: "#555"
		// 						},
		// 					},
		// 					categoryAxis: {
		// 						title: {
		// 							visible: false
		// 						},
		// 						label: {
		// 							style: {
		// 								color: "#ddd"
		// 							}
		// 						},
		// 						hoverShadow: {
		// 							color: "#000"
		// 						},
		// 						mouseDownShadow: {
		// 							color: "#7b7878"
		// 						}
		// 					},
		// 					valueAxis: {
		// 						label: {
		// 							style: {
		// 								color: "#ddd"
		// 							}
		// 						},
		// 						title: {
		// 							visible: false
		// 						}
		// 					},
		// 					legend:{
		// 						drawingEffect:'glossy',
		// 						label: {
		// 							style: {
		// 								color: "#ddd"
		// 							}
		// 						},
		// 						hoverShadow: {
		// 							color: "#000"
		// 						},
		// 						mouseDownShadow: {
		// 							color: "#7b7878"
		// 						}
		// 					}

		// 				});

		// 			}
		// 		},
		// 		function(oError) {
		// 			console.log("Error 127");
		// 		});
		// },
		
		loadLineChart: function(mdl, para, fromCompDate,toCompDate) {
			// var tempDate = [];
			// var oDataCHSTLine = {};
			// var inputFeedArry = [];
			// var oModelLineChartSVAccDetail = new sap.ui.model.json.JSONModel();
			// sap.ui.getCore().setModel(oModelLineChartSVAccDetail, "oModelLineChartSVAccDetail");
			// var me = this;

			// if (para != "") {
			// 	var url =
			// 		"/UpgradeCenterResult?$select=COMPANY,COMPANYSCHEMA,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
			// 		para + "' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"'";
			// } else {
			// 	var url =
			// 		"/UpgradeCenterResult?$select=COMPANY,COMPANYSCHEMA,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"'";
			// }

			// mdl.read(
			// 	url,
			// 	null, null, true,
			// 	function(oData, oResponse) {
			// 		if (oData.results.length > 0) {
			// 			for (var w = 0; w < oData.results.length; w++) {

			// 				if (oData.results[w].COMPANYSCHEMA.toLowerCase().indexOf("bizx") === -1) {
			// 					if (oData.results[w].COMPANY.toLowerCase().indexOf("test") === -1 && oData.results[w].COMPANY.toLowerCase().indexOf("demo") ===
			// 						-1) {
			// 						tempDate.push({
			// 							comp: oData.results[w].COMPANY + GetDDMMYY(oData.results[w].TIME_STAMP),
			// 							cmpny: oData.results[w].COMPANY,
			// 							time: GetDDMMYY(oData.results[w].TIME_STAMP),
			// 							timeComp: GetDDMM(oData.results[w].TIME_STAMP),
			// 							// upgrade: oData.results[w].UPGRADE_ELEMENT
			// 						});
			// 					}
			// 				}
							
			// 			}

			// 			var tempDatetempDate = tempDate.reduce(function(item, e1) {
			// 				var matches = item.filter(function(e2) {
			// 					if(e1.cmpny == e2.cmpny && e1.timeComp == e2.timeComp){
			// 						return e1.cmpny == e2.cmpny;
			// 					}
			// 				});
			// 				if (matches.length == 0) {
			// 					item.push(e1);
			// 				}
			// 				return item;
			// 			}, []);

			// 			var uniqueArray = me.removeDuplicates(tempDatetempDate, "cmpny");


			// 			var output = [];
						

			// 			uniqueArray.forEach(function(value) {
			// 				var existing = output.filter(function(v, i) {
			// 					return v.timeComp == value.timeComp;
			// 				});
							
			// 				if (existing.length) {
			// 					var existingIndex = output.indexOf(existing[0]);
			// 					output[existingIndex].cmpny = output[existingIndex].cmpny.concat(value.cmpny);
			// 					output[existingIndex].time = output[existingIndex].time.concat(value.time);
			// 				} else {
			// 					if (typeof value.cmpny == 'string'){
			// 						value.cmpny = [value.cmpny];
			// 					}
			// 					if (typeof value.time == 'string'){
			// 						value.time = [value.time];
			// 					}
			// 					 output.push(value);
			// 				}
			// 			});
						
			// 			for (var w = 0; w < output.length; w++) {
			// 				inputFeedArry.push({
			// 					time: output[w].timeComp,
			// 					cmpny: output[w].cmpny.length
			// 				});
			// 			}

			// 			oDataCHSTLine = {
			// 				data: inputFeedArry
			// 			};

			// 			var oModelLineChartSVAccDetail = sap.ui.getCore().getModel("oModelLineChartSVAccDetail");
			// 			oModelLineChartSVAccDetail.setData(oDataCHSTLine);

			// 			var oVizFrame = me.getView().byId("AreaDetailLineChartDir");

			// 			oVizFrame.destroyFeeds();

			// 			var oDataset = new sap.viz.ui5.data.FlattenedDataset({
			// 				dimensions: [{
			// 					name: "Element",
			// 					value: "{time}"

			// 				}],
			// 				measures: [{
			// 					name: "Count",
			// 					value: "{cmpny}"
			// 				}],

			// 				data: {
			// 					path: "/data"
			// 				}
			// 			});

			// 			oVizFrame.setDataset(oDataset);
			// 			oVizFrame.setModel(oModelLineChartSVAccDetail);

			// 			var feedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
			// 				'uid': "valueAxis",
			// 				'type': "Measure",
			// 				'values': ["Count"]
			// 			});
			// 			var feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
			// 				'uid': "categoryAxis",
			// 				'type': "Dimension",
			// 				'values': ["Element"]
			// 			});
			// 			oVizFrame.addFeed(feedValueAxis);
			// 			//oVizFrame.addFeed(feedValueAxis2);
			// 			oVizFrame.addFeed(feedCategoryAxis);

			// 			oVizFrame.setVizProperties({
			// 				plotArea: {
			// 					dataLabel: {
			// 						// formatString:formatPattern.SHORTFLOAT_MFD2,
			// 						visible: true,
			// 						style: {
			// 							color: "#fff"
			// 						}
			// 					},
			// 					colorPalette: ['#427CAC', '#dddddd'],
			// 					gridline: {
			// 						visible: false
			// 					}
			// 				},
			// 				general: {
			// 					background: {
			// 						color: "#555"
			// 					},
			// 				},
			// 				valueAxis: {
			// 					label: {
			// 						style: {
			// 							color: "#ddd"
			// 						}
			// 						// formatString: formatPattern.SHORTFLOAT
			// 					},
			// 					title: {
			// 						visible: false
			// 					},
			// 				},
			// 				categoryAxis: {
			// 					title: {
			// 						visible: false
			// 					},
			// 					label: {
			// 						style: {
			// 							color: "#ddd"
			// 						}
			// 					},
			// 					hoverShadow: {
			// 						color: "#000"
			// 					},
			// 					mouseDownShadow: {
			// 						color: "#7b7878"
			// 					}
			// 				},
			// 				title: {
			// 					visible: false,
			// 					text: ' '
			// 				}
			// 			});

			// 		}
			// 	},
			// 	function(oError) {
			// 		console.log("Error 127");
			// 	});
		},
		loadKPINumbers: function(mdl, para, fromCompDate,toCompDate) {
		    	var me = this;
		    	
		    	var tempODATAPreCheck = [];
				var tempODATAPreCheckFilter = [];
				// var oModelUpgradeRecruitData = sap.ui.getCore().getModel("oModelUpgradeRecruit").getData();
				var datatempoModelUpgradeRecruitON = sap.ui.getCore().getModel("oModelUpgradeRecruitON").getData();
			var datatempoModelUpgradeRecruitREC = sap.ui.getCore().getModel("oModelUpgradeRecruitREC").getData();
			var datatempoModelUpgradeRecruitSM = sap.ui.getCore().getModel("oModelUpgradeRecruitSM").getData();
			var datatempoModelUpgradeRecruitPG = sap.ui.getCore().getModel("oModelUpgradeRecruitPG").getData();
			var datatempoModelUpgradeRecruitCO = sap.ui.getCore().getModel("oModelUpgradeRecruitCO").getData();
			var datatempoModelUpgradeRecruitEC = sap.ui.getCore().getModel("oModelUpgradeRecruitEC").getData();
			
			var deployKey = me.getView().byId("ddlDeploy").getSelectedKey();
		    	
		    	if (para != "") {
		    		
		    		if(deployKey=="All"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,MIGRATION&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and not substringof('sfsales',COMPANYSCHEMA) and COMPANY ne 'BPMCINSTANCE1' and COMPANY ne 'BPMCINSTANCE4' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"'";
					}else if(deployKey=="CUST"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,MIGRATION&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and substringof('_',UPGRADE_ELEMENT) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and not substringof('sfsales',COMPANYSCHEMA) and COMPANY ne 'BPMCINSTANCE1' and COMPANY ne 'BPMCINSTANCE4' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"'";
					}else{
					var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,MIGRATION&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and indexof(UPGRADE_ELEMENT,'_') eq -1  and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and not substringof('sfsales',COMPANYSCHEMA) and COMPANY ne 'BPMCINSTANCE1' and COMPANY ne 'BPMCINSTANCE4' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"'";
					}
					
					
				// var url =
				// 		"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,MIGRATION&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
				// 		para + "' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"'";
				} else {
					
					if(deployKey=="All"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,MIGRATION&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and not substringof('sfsales',COMPANYSCHEMA) and COMPANY ne 'BPMCINSTANCE1' and COMPANY ne 'BPMCINSTANCE4' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"'";
					}else if(deployKey=="CUST"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,MIGRATION&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and substringof('_',UPGRADE_ELEMENT) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and not substringof('sfsales',COMPANYSCHEMA) and COMPANY ne 'BPMCINSTANCE1' and COMPANY ne 'BPMCINSTANCE4' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"'";
					}else{
					var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,MIGRATION&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and indexof(UPGRADE_ELEMENT,'_') eq -1  and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and not substringof('sfsales',COMPANYSCHEMA) and COMPANY ne 'BPMCINSTANCE1' and COMPANY ne 'BPMCINSTANCE4' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"'";
					}
					
					// var url =
					// 	"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,MIGRATION&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"'";
				}
			
				mdl.read(url, null, null, true,
                    function(oData, oResponse) {
                    	if(oData.results.length>0){
                    		
                    	tempODATAPreCheck = oData.results;
                    	for (var q = 0; q < tempODATAPreCheck.length; q++) {
                    		
                    		var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
							var lastItem = majorBlk[majorBlk.length-1];
							if(lastItem.length!=32){
								
							if(me.getView().byId("ddlProd").getSelectedKey()=="All"){
							
								
									tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="RM"){
			
									for(var a2=0;a2<datatempoModelUpgradeRecruitREC.length;a2++){
										
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
											
										
											if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitREC[a2].UPGRADE_ELEMENT){
													// if(datatempoModelUpgradeRecruitREC[a2].PRODUCT=="Recruiting"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitREC[a2].UPGRADE_ELEMENT){
													// if(datatempoModelUpgradeRecruitREC[a2].PRODUCT=="Recruiting"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitREC[a2].UPGRADE_ELEMENT){
													// if(datatempoModelUpgradeRecruitREC[a2].PRODUCT=="Recruiting"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="SM"){
									for(var a2=0;a2<datatempoModelUpgradeRecruitSM.length;a2++){
										
			// 							
										
										
											if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
												
										
											if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitSM[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Succession Management"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitSM[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Succession Management"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitSM[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Succession Management"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="PG"){
									for(var a2=0;a2<datatempoModelUpgradeRecruitPG.length;a2++){
										
										
									
										
										
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
										
												if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitPG[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Performance and Goals"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitPG[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Performance and Goals"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitPG[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Performance and Goals"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="CO"){
									for(var a2=0;a2<datatempoModelUpgradeRecruitCO.length;a2++){
										
									
			
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
											
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitCO[a2].UPGRADE_ELEMENT){
											// if(oModelUpgradeRecruitData[a2].PRODUCT=="Compensation"){
												tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
												break;
											
											// }
											}
										
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitCO[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Compensation"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitCO[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Compensation"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="ON"){
									for(var a2=0;a2<datatempoModelUpgradeRecruitON.length;a2++){
										
									
										
			
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
											
											if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitON[a2].UPGRADE_ELEMENT){
											// if(oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding" || oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding 2.0"){
												tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
												break;
											// }
										}
										
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitON[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding" || oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding 2.0"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitON[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding" || oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding 2.0"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="EC"){
									for(var a2=0; a2<datatempoModelUpgradeRecruitEC.length; a2++){
										
									// var datatempoModelUpgradeRecruitON = sap.ui.getCore().getModel("oModelUpgradeRecruitON").getData();
			// var datatempoModelUpgradeRecruitREC = sap.ui.getCore().getModel("oModelUpgradeRecruitREC").getData();
			// var datatempoModelUpgradeRecruitSM = sap.ui.getCore().getModel("oModelUpgradeRecruitSM").getData();
			// var datatempoModelUpgradeRecruitPG = sap.ui.getCore().getModel("oModelUpgradeRecruitPG").getData();
			// var datatempoModelUpgradeRecruitCO = sap.ui.getCore().getModel("oModelUpgradeRecruitCO").getData();
			// var datatempoModelUpgradeRecruitEC = sap.ui.getCore().getModel("oModelUpgradeRecruitEC").getData();
										
										
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
											
										
												if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitEC[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Employee Central"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											
										 
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitEC[a2].UPGRADE_ELEMENT){
													// if(datatempoModelUpgradeRecruitEC[a2].PRODUCT=="Employee Central"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitEC[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Employee Central"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
									}
								}
							}
						}
						// for (var q = 0; q < tempODATAPreCheck.length; q++) {
						// 	if(me.getView().byId("ddlProd").getSelectedKey()=="All"){
						// 		tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
						// 	} else if(me.getView().byId("ddlProd").getSelectedKey()=="RM"){
						// 		for(var a2=0;a2<oModelUpgradeRecruitData.length;a2++){
						// 			if(tempODATAPreCheck[q].UPGRADE_ELEMENT==oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
						// 				tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
						// 				break;
						// 			}
						// 				// break;
						// 		}
						// 	} else if(me.getView().byId("ddlProd").getSelectedKey()=="EC"){
						// 		for(var a2=0; a2<oModelUpgradeRecruitData.length; a2++){
						// 			if(tempODATAPreCheck[q].UPGRADE_ELEMENT!=oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
						// 				tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
						// 				break;
						// 			}
						// 				// break;
						// 		}
						// 	}
						// }
						
                    	if (tempODATAPreCheckFilter.length > 0) {
							var tempODATA = [];
							var tempODATABP = [];
							var tempTotalMig = [];
							var tempTotalNonMig = [];
							var count = 0;
							var countBP = 0;
							var countMig = 0;
							var countNonMig = 0;
							for(var q=0;q<tempODATAPreCheckFilter.length;q++){
								// if(tempODATAPreCheckFilter[q].COMPANY=="CRUZ ROJA ESPAÑOLA"){
								// 	tempODATAPreCheckFilter[q].COMPANY="CRUZ ROJA ESPAÑOLA DESARROLLO";
								// }
								// if(tempODATAPreCheckFilter[q].COMPANY=="Release"){
								// 	tempODATAPreCheckFilter[q].COMPANY="Stericycle Inc (de)";
								// }
								
								// if(tempODATAPreCheckFilter[q].COMPANY!="BPMCINSTANCE4" && tempODATAPreCheckFilter[q].COMPANY!="BPMCINSTANCE1"){
								// 	if (tempODATAPreCheckFilter[q].COMPANYSCHEMA!=null && tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf("sfsales")==-1) {
										
										
									// if(tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf("sfv4")>-1 || tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf("stockpm172200_ref2") > -1||  tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf("hanapm")>-1 || tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf("stg")>-1 || tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf("dc")>-1){
										// tempODATA.push({
										// 	'Customer':tempODATAPreCheckFilter[q].COMPANY,
										// 	'Schema':tempODATAPreCheckFilter[q].COMPANYSCHEMA
										// });
										tempODATA.push(
											tempODATAPreCheckFilter[q].COMPANY
										);
										
										// if(tempODATAPreCheckFilter[q].RESULT == "true"){
										tempODATABP.push({
											compny:tempODATAPreCheckFilter[q].COMPANY,
											ele:tempODATAPreCheckFilter[q].UPGRADE_ELEMENT
										});
										// }
										
										if(tempODATAPreCheckFilter[q].MIGRATION=="true"){
											tempTotalMig.push({cmpny:tempODATAPreCheckFilter[q].COMPANY,migration:tempODATAPreCheckFilter[q].MIGRATION});
										}else{
											tempTotalNonMig.push({cmpny:tempODATAPreCheckFilter[q].COMPANY,migration:tempODATAPreCheckFilter[q].MIGRATION});
										}
									// }
								// }
								
								// }
								// }
                    		}
							
								
							var uniqueBP = [];
							$.each(tempODATABP, function (i, e) {
							    var matchingItems = $.grep(uniqueBP, function (item) {
							       return item.compny === e.compny && item.ele === e.ele;
							    });
							    if (matchingItems.length === 0){
							        uniqueBP.push(e);
							    }
							});
							
							var uniqueMig = [];
							$.each(tempTotalMig, function (i, e) {
							    var matchingItems = $.grep(uniqueMig, function (item) {
							       return item.cmpny === e.cmpny && item.migration === e.migration;
							    });
							    if (matchingItems.length === 0){
							        uniqueMig.push(e);
							    }
							});
							
							var uniqueNonMig = [];
							$.each(tempTotalNonMig, function (i, e) {
							    var matchingItems = $.grep(uniqueNonMig, function (item) {
							       return item.cmpny === e.cmpny && item.migration === e.migration;
							    });
							    if (matchingItems.length === 0){
							        uniqueNonMig.push(e);
							    }
							});
							
							
							var unique = tempODATA.filter(function(itm, i, tempODATA) {
							    return i == tempODATA.indexOf(itm);
							});
							
							// var uniqueBP = tempODATABP.filter(function(itm, i, tempODATABP) {
							//     return i == tempODATABP.indexOf(itm);
							// });
							
							
							// countMig = me.NumberFormat(Math.round(uniqueMig.length));
							// me.getView().byId("migratedCount").setText(countMig["value"]+countMig["type"]);
							
							
							// countNonMig = me.NumberFormat(Math.round(uniqueNonMig.length));
							// me.getView().byId("nonmigratedCount").setText(countNonMig["value"]+countNonMig["type"]);
							
							
							

							// count = me.NumberFormat(Math.round(unique.length));
							// me.getView().byId("subTextSmallTiles1Top").setText(count["value"]+count["type"]);
							
							
							countBP = me.NumberFormat(Math.round(uniqueBP.length));
							me.getView().byId("subTextSmallTiles2Top").setValue(countBP["value"]);
							me.getView().byId("subTextSmallTiles2Top").setScale(countBP["type"]);
							
                    	}
                    	}else{
                    		me.getView().byId("subTextSmallTiles2Top").setValue("0");
                    	}
                    },
                    function(oError) {
                        console.log("Error 127");
                    });
				
			},
		// myOnClickHandlerBar:function(oEvent) {
	 //      var clickedData = oEvent.getParameter("data")[0].data;
		// },
		
		 //_setupSelectionList: function() {
   //       this.getView().byId('idList').setModel( new sap.ui.model.json.JSONModel(this._selectedData));
   //     },
        
        
        loadDailyChart: function(mdl,para){
			var Datetoday = new Date();
			var fromDate = new Date();
			fromDate.setDate((fromDate.getDate() - 30) );

			var fromCompDateAll = fromDate.toISOString();
			var toCompDateTemp = Datetoday.toISOString();

			fromCompDateAll = fromCompDateAll.split("T")[0] + "T00:00";
			toCompDateTemp = toCompDateTemp.split("T")[0] + "T24:00";
			var tempDateTo = (new Date(toCompDateTemp)).getDate();
			var d = new Date(toCompDateTemp);
			d.setDate(tempDateTo);
			var toCompDateAll = d.toISOString();
			toCompDateAll = toCompDateAll.split("T")[0] + "T24:00";

			var tempDateRef = [];
			var oDataCHSTLineRef = {};
			var inputFeedArryRef = [];
			var oModelLineChartDaily = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(oModelLineChartDaily, "oModelLineChartDaily");
			var me = this;
			
			var tempODATAPreCheck = [];
			var tempODATAPreCheckFilter = [];
			// var oModelUpgradeRecruitData = sap.ui.getCore().getModel("oModelUpgradeRecruit").getData();
			
			var datatempoModelUpgradeRecruitON = sap.ui.getCore().getModel("oModelUpgradeRecruitON").getData();
			var datatempoModelUpgradeRecruitREC = sap.ui.getCore().getModel("oModelUpgradeRecruitREC").getData();
			var datatempoModelUpgradeRecruitSM = sap.ui.getCore().getModel("oModelUpgradeRecruitSM").getData();
			var datatempoModelUpgradeRecruitPG = sap.ui.getCore().getModel("oModelUpgradeRecruitPG").getData();
			var datatempoModelUpgradeRecruitCO = sap.ui.getCore().getModel("oModelUpgradeRecruitCO").getData();
			var datatempoModelUpgradeRecruitEC = sap.ui.getCore().getModel("oModelUpgradeRecruitEC").getData();
			
		var deployKey = me.getView().byId("ddlDeploy").getSelectedKey();

			if (para != "") {
				if(deployKey=="All"){
						var url =
					"/UpgradeCenterResult?$select=COMPANY,UPGRADE_ELEMENT,COMPANYSCHEMA,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and not substringof('sfsales',COMPANYSCHEMA) and COMPANY ne 'BPMCINSTANCE1' and COMPANY ne 'BPMCINSTANCE4' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
					para + "' and TIME_STAMP ge datetime'" + fromCompDateAll + "' and TIME_STAMP le datetime'" + toCompDateAll + "'";
					}else if(deployKey=="CUST"){
						var url =
					"/UpgradeCenterResult?$select=COMPANY,UPGRADE_ELEMENT,COMPANYSCHEMA,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and substringof('_',UPGRADE_ELEMENT) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and not substringof('sfsales',COMPANYSCHEMA) and COMPANY ne 'BPMCINSTANCE1' and COMPANY ne 'BPMCINSTANCE4' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
					para + "' and TIME_STAMP ge datetime'" + fromCompDateAll + "' and TIME_STAMP le datetime'" + toCompDateAll + "'";
					}else{
					var url =
					"/UpgradeCenterResult?$select=COMPANY,UPGRADE_ELEMENT,COMPANYSCHEMA,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and indexof(UPGRADE_ELEMENT,'_') eq -1 and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and not substringof('sfsales',COMPANYSCHEMA) and COMPANY ne 'BPMCINSTANCE1' and COMPANY ne 'BPMCINSTANCE4' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
					para + "' and TIME_STAMP ge datetime'" + fromCompDateAll + "' and TIME_STAMP le datetime'" + toCompDateAll + "'";
					}
					
				// var url =
				// 	"/UpgradeCenterResult?$select=COMPANY,UPGRADE_ELEMENT,COMPANYSCHEMA,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
				// 	para + "' and TIME_STAMP ge datetime'" + fromCompDateAll + "' and TIME_STAMP le datetime'" + toCompDateAll + "'";
			} else {
				if(deployKey=="All"){
						var url =
					"/UpgradeCenterResult?$select=COMPANY,UPGRADE_ELEMENT,COMPANYSCHEMA,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and not substringof('sfsales',COMPANYSCHEMA) and COMPANY ne 'BPMCINSTANCE1' and COMPANY ne 'BPMCINSTANCE4' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
					fromCompDateAll + "' and TIME_STAMP le datetime'" + toCompDateAll + "'";
					}else if(deployKey=="CUST"){
						var url =
					"/UpgradeCenterResult?$select=COMPANY,UPGRADE_ELEMENT,COMPANYSCHEMA,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and substringof('_',UPGRADE_ELEMENT) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and not substringof('sfsales',COMPANYSCHEMA) and COMPANY ne 'BPMCINSTANCE1' and COMPANY ne 'BPMCINSTANCE4' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
					fromCompDateAll + "' and TIME_STAMP le datetime'" + toCompDateAll + "'";
					}else{
					var url =
					"/UpgradeCenterResult?$select=COMPANY,UPGRADE_ELEMENT,COMPANYSCHEMA,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA))  and indexof(UPGRADE_ELEMENT,'_') eq -1 and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and not substringof('sfsales',COMPANYSCHEMA) and COMPANY ne 'BPMCINSTANCE1' and COMPANY ne 'BPMCINSTANCE4' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
					fromCompDateAll + "' and TIME_STAMP le datetime'" + toCompDateAll + "'";
					}
					
				// var url =
				// 	"/UpgradeCenterResult?$select=COMPANY,UPGRADE_ELEMENT,COMPANYSCHEMA,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
				// 	fromCompDateAll + "' and TIME_STAMP le datetime'" + toCompDateAll + "'";
			}

			mdl.read(
				url,
				null, null, true,
				function(oData, oResponse) {
					if(oData.results.length>0){
						tempODATAPreCheck = oData.results;
						for (var q = 0; q < tempODATAPreCheck.length; q++) {
							
							var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
							var lastItem = majorBlk[majorBlk.length-1];
							if(lastItem.length!=32){
								
							if(me.getView().byId("ddlProd").getSelectedKey()=="All"){
							
								
									tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="RM"){
			
									for(var a2=0;a2<datatempoModelUpgradeRecruitREC.length;a2++){
										
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
											
										
											if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitREC[a2].UPGRADE_ELEMENT){
													// if(datatempoModelUpgradeRecruitREC[a2].PRODUCT=="Recruiting"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitREC[a2].UPGRADE_ELEMENT){
													// if(datatempoModelUpgradeRecruitREC[a2].PRODUCT=="Recruiting"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitREC[a2].UPGRADE_ELEMENT){
													// if(datatempoModelUpgradeRecruitREC[a2].PRODUCT=="Recruiting"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="SM"){
									for(var a2=0;a2<datatempoModelUpgradeRecruitSM.length;a2++){
										
			// 							
										
										
											if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
												
										
											if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitSM[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Succession Management"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitSM[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Succession Management"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitSM[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Succession Management"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="PG"){
									for(var a2=0;a2<datatempoModelUpgradeRecruitPG.length;a2++){
										
										
									
										
										
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
										
												if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitPG[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Performance and Goals"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitPG[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Performance and Goals"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitPG[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Performance and Goals"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="CO"){
									for(var a2=0;a2<datatempoModelUpgradeRecruitCO.length;a2++){
										
									
			
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
											
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitCO[a2].UPGRADE_ELEMENT){
											// if(oModelUpgradeRecruitData[a2].PRODUCT=="Compensation"){
												tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
												break;
											
											// }
											}
										
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitCO[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Compensation"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitCO[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Compensation"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="ON"){
									for(var a2=0;a2<datatempoModelUpgradeRecruitON.length;a2++){
										
									
										
			
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
											
											if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitON[a2].UPGRADE_ELEMENT){
											// if(oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding" || oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding 2.0"){
												tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
												break;
											// }
										}
										
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitON[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding" || oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding 2.0"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitON[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding" || oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding 2.0"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="EC"){
									for(var a2=0; a2<datatempoModelUpgradeRecruitEC.length; a2++){
										
									// var datatempoModelUpgradeRecruitON = sap.ui.getCore().getModel("oModelUpgradeRecruitON").getData();
			// var datatempoModelUpgradeRecruitREC = sap.ui.getCore().getModel("oModelUpgradeRecruitREC").getData();
			// var datatempoModelUpgradeRecruitSM = sap.ui.getCore().getModel("oModelUpgradeRecruitSM").getData();
			// var datatempoModelUpgradeRecruitPG = sap.ui.getCore().getModel("oModelUpgradeRecruitPG").getData();
			// var datatempoModelUpgradeRecruitCO = sap.ui.getCore().getModel("oModelUpgradeRecruitCO").getData();
			// var datatempoModelUpgradeRecruitEC = sap.ui.getCore().getModel("oModelUpgradeRecruitEC").getData();
										
										
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
											
										
												if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitEC[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Employee Central"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											
										 
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitEC[a2].UPGRADE_ELEMENT){
													// if(datatempoModelUpgradeRecruitEC[a2].PRODUCT=="Employee Central"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitEC[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Employee Central"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
									}
								}
							
							}
						}
						
						if (tempODATAPreCheckFilter.length > 0) {
						for (var w = 0; w < tempODATAPreCheckFilter.length; w++) {
							// if(tempODATAPreCheckFilter[w].COMPANY=="CRUZ ROJA ESPAÑOLA"){
							// 	tempODATAPreCheckFilter[w].COMPANY="CRUZ ROJA ESPAÑOLA DESARROLLO";
							// }
							// if(tempODATAPreCheckFilter[w].COMPANY=="Release"){
							// 	tempODATAPreCheckFilter[w].COMPANY="Stericycle Inc (de)";
							// }
							
							// if(tempODATAPreCheckFilter[w].COMPANY!="BPMCINSTANCE4" && tempODATAPreCheckFilter[w].COMPANY!="BPMCINSTANCE1"){
							// 	if (tempODATAPreCheckFilter[w].COMPANYSCHEMA != null && tempODATAPreCheckFilter[w].COMPANYSCHEMA.toLowerCase().indexOf("sfsales")==-1) {
								
								
								// if (tempODATAPreCheckFilter[w].COMPANYSCHEMA.toLowerCase().indexOf("sfv4") > -1 || tempODATAPreCheckFilter[w].COMPANYSCHEMA.toLowerCase().indexOf("stockpm172200_ref2") > -1 || tempODATAPreCheckFilter[w].COMPANYSCHEMA.toLowerCase().indexOf("hanapm") > -1 || tempODATAPreCheckFilter[w].COMPANYSCHEMA.toLowerCase().indexOf(
								// 		"stg") > -1 || tempODATAPreCheckFilter[w].COMPANYSCHEMA.toLowerCase().indexOf("dc") > -1) {
									tempDateRef.push({
										comp: tempODATAPreCheckFilter[w].UPGRADE_ELEMENT + GetDDMMYY(new Date(tempODATAPreCheckFilter[w].TIME_STAMP.toUTCString())),
										cmpny: tempODATAPreCheckFilter[w].UPGRADE_ELEMENT,
										time: GetMMDD(new Date(tempODATAPreCheckFilter[w].TIME_STAMP.toUTCString())),
										timeYY: GetMMDDYYYY(new Date(tempODATAPreCheckFilter[w].TIME_STAMP.toUTCString()))
									});
								// }
								
							// }
							// }
						}

						var tempDatetempDateRef = tempDateRef.reduce(function(item, e1) {
							var matchesRef = item.filter(function(e2) {
								if (e1.cmpny == e2.cmpny && e1.timeYY == e2.timeYY) {
									return e1.cmpny == e2.cmpny;
								}
							});
							if (matchesRef.length == 0) {
								item.push(e1);
							}
							return item;
						}, []);

						// var uniqueArrayRef = me.removeDuplicates(tempDatetempDateRef, "cmpny");
						var uniqueArrayRef = tempDatetempDateRef;

						var outputRef = [];
						
						uniqueArrayRef.forEach(function(value) {
							var existing = outputRef.filter(function(v, i) {
								return v.timeYY == value.timeYY;
							});

							if (existing.length) {
								var existingIndex = outputRef.indexOf(existing[0]);
								outputRef[existingIndex].cmpny = outputRef[existingIndex].cmpny.concat(value.cmpny);
								// outputRef[existingIndex].time = outputRef[existingIndex].time.concat(value.time);
							} else {
								if (typeof value.cmpny == 'string') {
									value.cmpny = [value.cmpny];
								}
								// if (typeof value.time == 'string') {
								// 	value.time = [value.time];
								// }
								outputRef.push(value);
							}
						});
						
						outputRef.sort(function(a, b) {
							return (new Date(a.timeYY) > new Date(b.timeYY)) ? 1 : ((new Date(b.timeYY) > new Date(a.timeYY)) ? -1 : 0);
						});
						var inputFeedArry = [];
						for (var j = 0; j< outputRef.length; j++) {
							inputFeedArry.push({
								timeYY: outputRef[j].timeYY,
								cmpny: outputRef[j].cmpny.length,
							});
						}

						var timeInput = [];
						var cmpnyInput = [];

						for (var t = 0; t < inputFeedArry.length; t++) {
							timeInput.push(inputFeedArry[t].timeYY);
							cmpnyInput.push(inputFeedArry[t].cmpny);
						}
						
						

						// Highcharts.setOptions({
						// 	colors: Highcharts.map(['#83bdf7'], function(color) {
						// 		return {
						// 			linearGradient: {
						// 				cx: 0.5,
						// 				cy: 0.3,
						// 				r: 0.7
						// 			},
						// 			stops: [
						// 				[0, color],
						// 				[1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
						// 			]
						// 		};
						// 	})
						// });

						Highcharts.SVGRenderer.prototype.symbols.download = function(x, y, w, h) {
							var path = [
								// Arrow stem
								'M', x + w * 0.5, y,
								'L', x + w * 0.5, y + h * 0.7,
								// Arrow head
								'M', x + w * 0.3, y + h * 0.5,
								'L', x + w * 0.5, y + h * 0.7,
								'L', x + w * 0.7, y + h * 0.5,
								// Box
								'M', x, y + h * 0.9,
								'L', x, y + h,
								'L', x + w, y + h,
								'L', x + w, y + h * 0.9
							];
							return path;
						};

						var chartArea = Highcharts.chart('repoContainerReviewUpgradeDay', {
							chart: {
								type: 'areaspline',
								height: '155',
								// width: '475',
								plotBackgroundColor: "transparent",
								plotBorderWidth: null,
								plotShadow: false
							},
							colors:["#83bdf7"],
							title: {
								text: ''
							},
							legend: {
								enabled: false,
								margin: 2,
								itemStyle: {
									color: '#ddd',
									textOverflow:'ellipsis'
								},
								// align: 'right',
						  //      verticalAlign: 'top',
						  //      layout: 'vertical',
						  //      x: 15,
						  //      y: 25,
						  //      itemWidth: 50
								// itemDistance: 50
							},
							xAxis: {
								labels: {
									style: {
										color: '#ddd',
										fontSize: '10px'
									},
									
								},
								categories: timeInput,
								tickColor: 'transparent'
							},
							yAxis: {
								title: {
									text: ''
								},
								labels: {
									style: {
										color: '#ddd'
									}
								},
								gridLineColor: 'transparent'
							},
							tooltip: {
								shared: true,
								valueSuffix: ''
							},
							credits: {
								enabled: false
							},
							plotOptions: {
								areaspline: {
								      fillOpacity: 0.5
								  },
								series: {
									// fillColor: {
									// 	linearGradient: [0, 0, 0, 300],
									// 	stops: [
									// 		[0, '#f0ab00'],
									// 		[1, Highcharts.Color("#D2E6F8").setOpacity(0).get('rgba')]
									// 	]
									// },
									dataLabels: {
										align: 'center',
										enabled: true,
										color: '#ddd'
									},
									allowPointSelect: true,
									marker: {
						                states: {
						                    select: {
						                        fillColor: '#63e5e4',
						                    }
						                }
						            },
									point: {
				                        events: {
				                            click: function(e) {
			                            		if (this.selected == false || this.selected == undefined) {
			                            			
			                            			
					        //                     	var chart = $("#repoContainerReviewArea").highcharts();
													// var selectedPoints = chart.getSelectedPoints();
													// if(selectedPoints.length>0){
													// 	selectedPoints[0].select();	
													// }
													
													// var chart2 = $("#repoContainerReview").highcharts();
													// var selectedPoints2 = chart2.getSelectedPoints();
													// if(selectedPoints2.length>0){
													// 	selectedPoints2[0].select();	
													// }
											        
					        //                     	me.getView().byId("HBarChart").vizSelection([], {
													// 	"clearSelection": true
													// });
													var aFilters = [];
													
					                            	var oModelAreaSplineRefData = sap.ui.getCore().getModel("oModelAreaSplineRef").getData();
					                            	for(var q=0;q<oModelAreaSplineRefData.length;q++){
					                            		if(oModelAreaSplineRefData[q].timeComp==this.category){
					                            			if(this.options.y==oModelAreaSplineRefData[q].cmpny.length){
				                            					for (var j = 0; j < oModelAreaSplineRefData[q].cmpny.length; j++) {
																	// var filter = new sap.ui.model.Filter("val", sap.ui.model.FilterOperator.Contains, oModelAreaSplineRefData[q].cmpny[j]);
																	var filter = new sap.ui.model.Filter("val", sap.ui.model.FilterOperator.EQ, oModelAreaSplineRefData[q].cmpny[j]);
																	aFilters.push(filter);
																}
	
																// update list binding
																var list = me.getView().byId("listTable");
																var binding = list.getBinding("items");
																binding.filter(aFilters, "Application");
																me.getView().byId("filterLabel").setText(this.category+" Customers");
					                            			}else{
					                            				var aFilters = [];
	
																// update list binding
																var list = me.getView().byId("listTable");
																var binding = list.getBinding("items");
																binding.filter(aFilters, "Application");
																me.getView().byId("filterLabel").setText("All Customers");
					                            			}
					                            		}
					                            	}
			                            		}else{
			                            			var aFilters = [];

													// update list binding
													var list = me.getView().byId("listTable");
													var binding = list.getBinding("items");
													binding.filter(aFilters, "Application");
													me.getView().byId("filterLabel").setText("All Customers");
			                            		}
						        			}
					                    }
			                        }
								},
							},
							series: [{
								name: 'All Configuration Blocks',
								data: cmpnyInput
							}],
							navigation: {
								buttonOptions: {
									verticalAlign: 'top',
									x: 10,
									y: -12
								},
								menuStyle: {
									background: '#555'
								},
								menuItemStyle: {
									color: '#ddd'
								}
							},
							exporting: {
								chartOptions: {
									chart: {
										backgroundColor: '#555'
									}
								},
								buttons: {
									contextButton: {
										symbol: 'download',
										symbolFill: '#555'
									}
								},
								filename: 'Daily Breakdown Chart'
							}

						});
					}
					}else{
						
					}
				},
				function(oError) {
					console.log("Error 127");
				});

		
		},


		onSelect: function(oEvent) {
			this.getView().byId("ddlSP").setSelectedKeys("All");
			this.getView().byId("searchfield").setValue("");
			
			var tempAry = [];
          var aSelections = oEvent.getParameter("data");
          for (var i = 0; i < aSelections.length; i++) {
            this._selectedData.push(aSelections[i].data);
          };
          
          var ddlItems = this.getView().byId("ddlSP").getItems();
          for(var q=0;q<ddlItems.length;q++){
          	for(var j=0;j<this._selectedData.length;j++){
	          	if(ddlItems[q].getText()==this._selectedData[j].Element){
	          		tempAry.push(ddlItems[q].getKey());
	          	}	
          	}
          }
          if(tempAry.length==0){
          	tempAry.push("All");
          }
          this.getView().byId("ddlSP").setSelectedKeys(tempAry);
          this.ddlSPChanged();
        },
        
        onDeselect: function(oEvent) {
        		var tempAry = [];
          var aSelections = oEvent.getParameter("data");
          //var oModel = this.getView().byId('idList').getModel();
          for (var i = 0; i < aSelections.length; i++) {
            for (var j = 0; j < this._selectedData.length; j++) {
              if (this._selectedData[j] === aSelections[i].data) {
                this._selectedData.splice(j, 1);
                break;
              }
            };
          };
          
          var ddlItems = this.getView().byId("ddlSP").getItems();
          for(var q=0;q<ddlItems.length;q++){
          	for(var j=0;j<this._selectedData.length;j++){
	          	if(ddlItems[q].getText()==this._selectedData[j].Element){
	          		tempAry.push(ddlItems[q].getKey());
	          	}	
          	}
          }
          if(tempAry.length==0){
          	tempAry.push("All");
          }
          this.getView().byId("ddlSP").setSelectedKeys(tempAry);
          this.ddlSPChanged();
        },
		
			
		removeDuplicates:function(originalArray, prop) {
		     var newArray = [];
		     var lookupObject  = {};
		
		     for(var i in originalArray) {
		        lookupObject[originalArray[i][prop]] = originalArray[i];
		     }
		
		     for(i in lookupObject) {
		         newArray.push(lookupObject[i]);
		     }
		      return newArray;
		 },
		NumberFormat: function(val) {
			if (val == "" || val == null) {
				val = 0;
			}
			if (isNaN(val)) {
				val = 0;
			}
			var num = {};
			val = Math.abs(val);
			if (val < 0) {
				val = Math.abs(val);
			} else {
				val;
			}
			if (val < 1000) {
				num["value"] = val.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1');
				num["type"] = "";
			} else if (val / 1000 < 1000) {
				num["value"] = (val / 1000).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1');
				num["type"] = "K";
			} else {
				num["value"] = (val / 1000000).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1');
				num["type"] = "M";
			}
			// else {
			//  num["value"] = (val / 1000000000).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
			//  num["type"] = "B";
			// }
			return num;
		}
	});
	
	
	function MentionChartXbyMonth(pattern, value) {
		var typeA = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		var typeB = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		if (pattern == "MM") {
			return (value + 1);
		}
		if (pattern == "MMM") {
			if (typeA[value - 1] == undefined) {
				typeA[value - 1] = "Dec";
			}
			return typeA[value - 1];
		}
		if (pattern == "MMMM") {
			return typeB[value - 1];
		}
		if (pattern == "MM/YYYY") {
			return "0";
		}
	};

	function MentionDayName(value) {
		var day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		return day[value];
	};

	function MentionGetMonthName(value) {
		var a = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		return a[value];
	};

	function GetDDMM(date) {
		var d = date;
		var day = d.getDate();
		var month = MentionGetMonthName(d.getMonth());
		var year = d.getFullYear();
		var result = year + "-" + month;
		return result;
	};
	function GetDDMMYY(date) {
		var d = date;
		var day = d.getDate();
		var month = MentionGetMonthName(d.getMonth());
		var year = d.getFullYear();
		var result = year + "-" + month + "-" + day;
		return result;
	};
	function GetMMDD(date) {
		var d = date;
		var day = d.getDate();
		var month = MentionGetMonthName(d.getMonth());
		var year = d.getFullYear();
		var result = day + "-" + month;
		return result;
	};
	function GetMMDDYYYY(date) {
		var d = date;
		var day = d.getDate();
		var month = MentionGetMonthName(d.getMonth());
		var year = d.getFullYear();
		var result = day + "-" + month + "-" + year;
		return result;
	};
	Date.prototype.YYYYMMDD = function() {
		var yyyy = this.getFullYear().toString();
		var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
		var dd = this.getDate().toString();
		return yyyy + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + (dd[1] ? dd : "0" + dd[0]); // padding
	};
	
	function runAllAjaxHubCopy(array, me, para, fromCompDate, toCompDate, tempODATAPreCheck,tempODATAPreCheckFilter, tempODATAPreCheckSub,tempODATAPreCheckFilterSub, tempBPCountArray, totalCount, upgradeInput, countInput, tempdataSPUpgrade){
		var i = 0;
		var newArr1 = [];
		
		

		function next() {
			if (para != "") {
				var subUrl =
					"/UpgradeCenterResult?$select=COMPANYSCHEMA,COMPANY&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and not substringof('sfsales',COMPANYSCHEMA) and COMPANY ne 'BPMCINSTANCE1' and COMPANY ne 'BPMCINSTANCE4' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and UPGRADE_ELEMENT eq '" +
					array[i] + "' and FILEVERSION eq '" + para + "' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"'";
			} else {
				var subUrl =
					"/UpgradeCenterResult?$select=COMPANYSCHEMA,COMPANY&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'USBASEIAS22V1' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and not substringof('sfsales',COMPANYSCHEMA) and COMPANY ne 'BPMCINSTANCE1' and COMPANY ne 'BPMCINSTANCE4' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and UPGRADE_ELEMENT eq '" +
					array[i] + "' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"'";
			}
			
			
			me.copyReq = $.ajax({
				// $.ajax({
				url: "/sap/sfsf_repo/service/services.xsodata"+subUrl,
				type: 'GET',
				dataType: 'json',
				success: function (resIn) {
					
									var tempCmpny = [];
									
									tempODATAPreCheckSub = resIn.d.results;
									tempODATAPreCheckFilterSub = tempODATAPreCheckSub;
						
									if (tempODATAPreCheckFilterSub.length > 0) {
										for (var w = 0; w < tempODATAPreCheckFilterSub.length; w++) {
											// if(tempODATAPreCheckFilterSub[w ].COMPANY=="CRUZ ROJA ESPAÑOLA"){
											// 	tempODATAPreCheckFilterSub[w].COMPANY="CRUZ ROJA ESPAÑOLA DESARROLLO";
											// }
											// if(tempODATAPreCheckFilterSub[w].COMPANY=="Release"){
											// 	tempODATAPreCheckFilterSub[w].COMPANY="Stericycle Inc (de)";
											// }
											
											
											// if(tempODATAPreCheckFilter[w].COMPANY!="BPMCINSTANCE4" && tempODATAPreCheckFilter[w].COMPANY!="BPMCINSTANCE1"){
											// 	if (tempODATAPreCheckFilterSub[w].COMPANYSCHEMA != null && tempODATAPreCheckFilterSub[w].COMPANYSCHEMA.toLowerCase().indexOf("sfsales")==-1) {
										
										// 		if (tempODATAPreCheckFilterSub[w].COMPANYSCHEMA.toLowerCase().indexOf("sfv4") > -1 || tempODATAPreCheckFilter[w].COMPANYSCHEMA.toLowerCase().indexOf("stockpm172200_ref2") > -1 || tempODATAPreCheckFilterSub[w].COMPANYSCHEMA.toLowerCase().indexOf("hanapm") > -1 || tempODATAPreCheckFilterSub[w].COMPANYSCHEMA.toLowerCase().indexOf(
										// "stg") > -1 || tempODATAPreCheckFilterSub[w].COMPANYSCHEMA.toLowerCase().indexOf("dc") > -1) {
													tempCmpny.push(tempODATAPreCheckFilterSub[w].COMPANY);
												// }
												
												
											// }
											// }

										}
										var uniqueCmpny = tempCmpny.filter(function(itm, ii, tempCmpny) {
											return ii == tempCmpny.indexOf(itm);
										});
										
										var oResponse = subUrl;

										if (oResponse.split("eq")[1].split("'")[1].split("Best Practice Configurations Employee Central")[1] == undefined) {
											if(oResponse.split("eq")[1].split("'")[1].split("bestpracticesEmployeeCentral")[1] == undefined){
												if(oResponse.split("Best Practices Employee Central")[1] == undefined){
													if(oResponse.split("Best Practices")[1]==undefined){
														if(oResponse.split("Best Practice")[1]==undefined){
															tempBPCountArray.push({
																element: oResponse.split("eq")[1].split("'")[1],
																count: uniqueCmpny.length,
																parent:""
															});
														}else{
															tempBPCountArray.push({
																element: oResponse.split("eq")[1].split("'")[1].split("Best Practice")[1],
																count: uniqueCmpny.length,
																parent:""
															});
														}
														
													}else{
														if(oResponse.indexOf("In-app learning")>-1){
															tempBPCountArray.push({
															element: oResponse.split("eq")[1].split("'")[1],
															count: uniqueCmpny.length,
															parent:""
														});
														}else{
															tempBPCountArray.push({
															element: oResponse.split("eq")[1].split("'")[1].split("Best Practices")[1],
															count: uniqueCmpny.length,
															parent:""
														});
														}
														
													}
												}else{
													
														tempBPCountArray.push({
															element: "EC "+oResponse.split("eq")[1].split("'")[1].split("Best Practices Employee Central")[1],
															count: uniqueCmpny.length,
															parent: ""
														});
													
												}
											}else{
													tempBPCountArray.push({
														element: "EC "+oResponse.split("eq")[1].split("'")[1].split("bestpracticesEmployeeCentral")[1],
														count: uniqueCmpny.length,
														parent: ""
													});
											}
										} else {
												tempBPCountArray.push({
													element: "EC "+oResponse.split("eq")[1].split("'")[1].split("Best Practice Configurations Employee Central")[1],
													count: uniqueCmpny.length,
													parent: ""
												});
										}

										totalCount += uniqueCmpny.length;
										var oModelColumnChartSVAccDetail = sap.ui.getCore().getModel("oModelColumnChartSVAccDetail");
										
										if(i == tempBPCountArray.length){
											// var A = tempBPCountArray;
											// var temp = {};
											
											// for (var i=0; i<A.length; i++) {
											//     temp[A[i].element] = temp[A[i].element] === undefined ? A[i].count : temp[A[i].element]+A[i].count;
											// }
											
											// A = [];
											
											// for (var key in temp) {
											//     A.push({element: key, count:temp[key],});
											// }
											
											// tempBPCountArray = A;
											for(var a=0;a<tempBPCountArray.length;a++){
												
												
												if(tempBPCountArray[a].element.indexOf("Anniversary Alerts")>-1 || tempBPCountArray[a].element.indexOf("Income Tax")>-1 || tempBPCountArray[a].element.indexOf("Employee Sample")>-1 || tempBPCountArray[a].element.indexOf("Employee Central ")>-1 || tempBPCountArray[a].element.indexOf("DemoData")>-1 || tempBPCountArray[a].element.indexOf("Apprentice")>-1||tempBPCountArray[a].element.indexOf("Document Generation")>-1||tempBPCountArray[a].element.indexOf("Contingent")>-1||tempBPCountArray[a].element.indexOf("Concurrent")>-1||tempBPCountArray[a].element.indexOf("EC Global Assignment")>-1||tempBPCountArray[a].element.indexOf("EC Position")>-1||tempBPCountArray[a].element.indexOf("Time Off Integration")>-1||tempBPCountArray[a].element.indexOf("Company Structure")>-1){
													if(tempBPCountArray[a].element.indexOf("Employee Central Core")>-1){
														tempBPCountArray[a].parent="Employee Central Core";
													}else if(tempBPCountArray[a].element.indexOf("Employee Central Benefits")>-1||tempBPCountArray[a].element.indexOf("Employee Central Global Benefits")>-1){
													tempBPCountArray[a].parent="Employee Central Benefits";
													}else if(tempBPCountArray[a].element.indexOf("Employee Central Dependents")>-1){
														tempBPCountArray[a].parent="Employee Central Dependents Management";
													}else if(tempBPCountArray[a].element.indexOf("Employee Central Time Off")>-1){
														tempBPCountArray[a].parent="Employee Central Time Off";
													}else if(tempBPCountArray[a].element.indexOf("Employee Central Time Sheet")>-1){
														tempBPCountArray[a].parent="Employee Central Time Sheet";
													}else if (tempBPCountArray[a].element.indexOf("Recruiting Management")>-1){
														tempBPCountArray[a].parent="Recruiting";
													}else if(tempBPCountArray[a].element.indexOf("Reward and Recognition")>-1 || tempBPCountArray[a].element.indexOf("Compensation")>-1||tempBPCountArray[a].element.indexOf("Stock")>-1 || tempBPCountArray[a].element.indexOf("Salary")>-1||tempBPCountArray[a].element.indexOf("Variable pay")>-1){
													tempBPCountArray[a].parent="Compensation";
													
												}
													else{
														tempBPCountArray[a].parent="Employee Central";
													}
													
												}else if(tempBPCountArray[a].element.indexOf("Employee Central Core")>-1 || tempBPCountArray[a].element.indexOf("EC  Core")>-1){
													tempBPCountArray[a].parent="Employee Central Core";
												}else if(tempBPCountArray[a].element.indexOf("EC Benefits")>-1 || tempBPCountArray[a].element.indexOf("EC  Benefits")>-1||tempBPCountArray[a].element.indexOf("EC  Global Benefits")>-1 || tempBPCountArray[a].element.indexOf("Employee Central Benefits")>-1||tempBPCountArray[a].element.indexOf("Employee Central Global Benefits")>-1){
													tempBPCountArray[a].parent="Employee Central Benefits";
												}else if(tempBPCountArray[a].element.indexOf("EC Dependents")>-1 || tempBPCountArray[a].element.indexOf("EC  Dependents")>-1 || tempBPCountArray[a].element.indexOf("Employee Central Dependents")>-1){
													tempBPCountArray[a].parent="Employee Central Dependents Management";
												}else if(tempBPCountArray[a].element.indexOf("EC Time Off")>-1 || tempBPCountArray[a].element.indexOf("EC  Time Off")>-1 || tempBPCountArray[a].element.indexOf("Employee Central Time Off")>-1){
													tempBPCountArray[a].parent="Employee Central Time Off";
												}else if(tempBPCountArray[a].element.indexOf("EC Time Sheet")>-1 || tempBPCountArray[a].element.indexOf("EC  Time Sheet")>-1 || tempBPCountArray[a].element.indexOf("Employee Central Time Sheet")>-1){
													tempBPCountArray[a].parent="Employee Central Time Sheet";
												}else if(tempBPCountArray[a].element.indexOf("Succession")>-1||tempBPCountArray[a].element.indexOf("Career and Development")>-1||tempBPCountArray[a].element.indexOf("Mentoring")>-1){
													tempBPCountArray[a].parent="Succession and Development";
												}else if(tempBPCountArray[a].element.indexOf("Recruiting")>-1||tempBPCountArray[a].element.indexOf("People Profile")>-1||tempBPCountArray[a].element.indexOf("Job Description")>-1){
													if(tempBPCountArray[a].element.indexOf("Onboarding")>-1){
														tempBPCountArray[a].parent="Onboarding 2.0";
													}else if(tempBPCountArray[a].element.indexOf("Succession Management")>-1){
														tempBPCountArray[a].parent="Succession and Development";
													}else{
														tempBPCountArray[a].parent="Recruiting";
													}
													
												}else if(tempBPCountArray[a].element.indexOf("Performance And")>-1||tempBPCountArray[a].element.indexOf("Performance and")>-1){
													tempBPCountArray[a].parent="Performance and Goals";
												}else if(tempBPCountArray[a].element.indexOf("Offboarding")>-1||tempBPCountArray[a].element.indexOf("Onboarding")>-1){
													tempBPCountArray[a].parent="Onboarding 2.0";
													
												}else if(tempBPCountArray[a].element.indexOf("Reward and Recognition")>-1 || tempBPCountArray[a].element.indexOf("Compensation")>-1||tempBPCountArray[a].element.indexOf("Stock")>-1 || tempBPCountArray[a].element.indexOf("Salary")>-1||tempBPCountArray[a].element.indexOf("Variable pay")>-1){
													tempBPCountArray[a].parent="Compensation";
													
												}else{
													tempBPCountArray[a].parent="Optional";
												}
											}
											
											tempBPCountArray.sort(function(a,b) {return (a.parent > b.parent) ? 1 : ((b.parent> a.parent) ? -1 : 0);} );
											
										    var result = tempBPCountArray.reduce(function (r, a) {
										        r[a.parent] = r[a.parent] || [];
										        r[a.parent].push(a);
										        return r;
										    }, Object.create(null));
											
											var keys = [];
											for(var k in result) keys.push(k);
											
											var uniqueEmps = [];
											var uniqueEmpsDet = [];
											var uniqueEmpsDrill = [];
											
											for(var q=0;q<keys.length;q++){
												for(var t=0;t<tempBPCountArray.length;t++){
													if(keys[q]==tempBPCountArray[t].parent){
														
														if(uniqueEmpsDet.indexOf(tempBPCountArray[t].parent)>-1){
															uniqueEmps[uniqueEmpsDet.indexOf(tempBPCountArray[t].parent)].y=uniqueEmps[uniqueEmpsDet.indexOf(tempBPCountArray[t].parent)].y+tempBPCountArray[t].count;
														}else{
															uniqueEmpsDet.push(tempBPCountArray[t].parent);
															uniqueEmps.push({
																name: keys[q],
											                    y: tempBPCountArray[t].count,
											                    drilldown: keys[q],
											              //      dataLabels: {
													            //     align: 'right',
													            //     rotation: -90,
													            //     shape: null
													            // }
															}); 
															uniqueEmpsDrill.push({
																name: keys[q],
																id: keys[q],
																data:[]
															});
														}
														
													}
												}
											}
											tempBPCountArray.sort(function(a,b) {return (a.count > b.count) ? 1 : ((b.count> a.count) ? -1 : 0);} );
											tempBPCountArray.reverse();
											
											for(var t1=0;t1<tempBPCountArray.length;t1++){
												for(var t2=0;t2<uniqueEmpsDrill.length;t2++){
													if(tempBPCountArray[t1].parent==uniqueEmpsDrill[t2].name){
														uniqueEmpsDrill[t2].data.push([tempBPCountArray[t1].element,tempBPCountArray[t1].count]);
													}
													// if(t2==uniqueEmpsDrill.length-1){
													// 	uniqueEmpsDrill[t2].data.sort(function(a,b) {return (a.count > b.count) ? 1 : ((b.count> a.count) ? -1 : 0);} );
													// 	uniqueEmpsDrill[t2].data.reverse();
													// }
												}
											}
											
											// for(var t=0;t<tempBPCountArray.length;t++){
											// 	 upgradeInput.push(tempBPCountArray[t].element);
											// 	 countInput.push(tempBPCountArray[t].count);
											// }
											
											// tempBPCountArray.sort(function(a,b) {return (a.count > b.count) ? 1 : ((b.count> a.count) ? -1 : 0);} );
											// tempBPCountArray.reverse();
											
											tempdataSPUpgrade = tempBPCountArray;
											
											var oModelTrend = sap.ui.getCore().getModel("oModelTrend");
											oModelTrend.setProperty('/splist', tempdataSPUpgrade);
											
											//viz frame start
												// oDataCHSTLine = {
												// 	data: tempdataSPUpgrade
												// };
						
												// var oModelLineChartSVAccDetailBtm = sap.ui.getCore().getModel("oModelLineChartSVAccDetailBtm");
												// oModelLineChartSVAccDetailBtm.setData(oDataCHSTLine);
						
												// var oVizFrame = me.getView().byId("HBarChart");
						
												// oVizFrame.destroyFeeds();
						
												// var oDataset = new sap.viz.ui5.data.FlattenedDataset({
												// 	dimensions: [{
												// 		name: "Scope Item",
												// 		value: "{element}"
						
												// 	}],
												// 	measures: [{
												// 		name: "Count",
												// 		value: "{count}"
												// 	}],
						
												// 	data: {
												// 		path: "/data"
												// 	}
												// });
						
												// oVizFrame.setDataset(oDataset);
												// oVizFrame.setModel(oModelLineChartSVAccDetailBtm);
						
												// var feedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
												// 	'uid': "valueAxis",
												// 	'type': "Measure",
												// 	'values': ["Count"]
												// });
												// var feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
												// 	'uid': "categoryAxis",
												// 	'type': "Dimension",
												// 	'values': ["Scope Item"]
												// });
												// oVizFrame.addFeed(feedValueAxis);
												// oVizFrame.addFeed(feedCategoryAxis);
						
												// oVizFrame.setVizProperties({
												// 	plotArea: {
												// 		dataLabel: {
												// 			visible: true,
												// 			//formatString: CustomerFormat.FIORI_LABEL_SHORTFORMAT_2,
												// 			type: "short",
												// 			style: {
												// 				color: "#fff"
												// 			}
												// 		},
												// 		gap: {
												// 			barSpacing: 0.2,
												// 			groupSpacing: 0.2
						
												// 		},
												// 		dataPointSize: {
												// 			min: 10,
												// 			max: 20
												// 		},
												// 		drawingEffect: 'glossy',
												// 		colorPalette: ['#024084', '#86aed6'],
												// 		// colorPalette: ['#61BC52', '#302720,#4c4540'],
												// 		gridline: {
												// 			visible: false
												// 		}
												// 	},
												// 	general: {
												// 		background: {
												// 			color: "transparent"
												// 		},
												// 	},
												// 	categoryAxis: {
												// 		title: {
												// 			visible: false
												// 		},
												// 		label: {
												// 			// style: {
												// 			// 	color: "#ddd"
												// 			// },
												// 			// rotation:"fixed",
												// 			// angle:"90"
															
												// 			style: {
												// 				color: "#ddd",
												// 				fontSize:"8.9px"
												// 			},
												// 			linesOfWrap:3,
												// 			angle:60
												// 		},
												// 		hoverShadow: {
												// 			color: "#000"
												// 		},
												// 		mouseDownShadow: {
												// 			color: "#7b7878"
												// 		},
												// 	},
												// 	valueAxis: {
												// 		label: {
												// 			style: {
												// 				color: "#ddd"
												// 			}
												// 		},
												// 		title: {
												// 			visible: false
												// 		}
												// 	},
												// 	legend: {
												// 		drawingEffect: 'glossy',
												// 		label: {
												// 			style: {
												// 				color: "#ddd"
												// 			}
												// 		},
												// 		hoverShadow: {
												// 			color: "#000"
												// 		},
												// 		mouseDownShadow: {
												// 			color: "#7b7878"
												// 		}
												// 	},
												// 	legendGroup: {
												// 		layout: {
												// 			position: 'bottom'
												// 		}
												// 	}
						
												// });
												// oVizFrame.setLegendVisible(false);
						
											//viz frame ends
										
											// uniqueEmpsDrill.sort(function(a,b) {return (a.count > b.count) ? 1 : ((b.count> a.count) ? -1 : 0);} );
											// uniqueEmpsDrill.reverse();
											
											$("#repoContainerReviewUpgrade").find("svg").remove();
											
											Highcharts.SVGRenderer.prototype.symbols.download = function (x, y, w, h) {
											    var path = [
											        // Arrow stem
											        'M', x + w * 0.5, y,
											        'L', x + w * 0.5, y + h * 0.7,
											        // Arrow head
											        'M', x + w * 0.3, y + h * 0.5,
											        'L', x + w * 0.5, y + h * 0.7,
											        'L', x + w * 0.7, y + h * 0.5,
											        // Box
											        'M', x, y + h * 0.9,
											        'L', x, y + h,
											        'L', x + w, y + h,
											        'L', x + w, y + h * 0.9
											    ];
											    return path;
											};
						
											// var chart3d = Highcharts.chart('repoContainerReviewUpgrade', {
											//     chart: {
											//         type: 'column',
											//         // height:'380',
											//         options3d: {
											//             enabled: false,
											//             // alpha: 15,
											//             // beta: 0,
											//             // depth: 0
											            
											//             alpha: 15,
											//             beta: 15,
											//             depth: 50,
											//             viewDistance: 25
											            
											            
											//         }
											//     },
											//     colors:["#2B908F"],
											//     title: {
											//         text: ''
											//     },
											//     subtitle: {
											//         text: ''
											//     },
											//     plotOptions: {
											//         // column: {
											//         //     depth: 25
											//         // },
											//         series: {
											//         	borderColor: 'transparent',
											//             dataLabels: {
											// 	            // align: 'center',
											// 	            enabled: true,
											// 	            color: '#f0ab00'
											// 	        },
											// 	        states: {
										 //                   select: {
										 //                       color: '#63e5e4'    
										 //                   }
										 //               },
										 //               slicedOffset: 0,
										 //               point: {
										 //                   events: {
										 //                       click: function(event){
										 //      //                 	var chart = $('#repoContainerReviewUpgrade').highcharts();
										                        	
										 //      //                 	var data = chart.series[0].data;
				
											// 						// for(var q=0;q<data.length;q++){
											// 						// 	if(chart.series[0].data[q].options.selected==true){
											// 						// 	chart.series[0].data[q].update({
											// 						//             color: '#63e5e4'
											// 						//         });
																					
											// 						// 	}else{
											// 						// 		chart.series[0].data[q].update({
											// 						//             color: '#2B908F'
											// 						//         });
																				
											// 						// 	}
											// 						// }
																	
										 //                       	me.getView().byId("ddlSP").setSelectedKeys("All");
											// 						me.getView().byId("searchfield").setValue("");
																	
										 //                       	var tempAryFilter = [];
										 //                       	var tempAry = [];
										 //                           this.select(null, true);
										 //                           var ary = this.series.chart.getSelectedPoints();
										                            
										 //                           for(var q=0;q<ary.length;q++){
										 //                           	tempAryFilter.push(ary[q].category);
										 //             //              	ary[q].update({
											// 					        //     color: '#63e5e4'
											// 					        // });
										 //                           }
										                            
										 //                           var ddlItems = me.getView().byId("ddlSP").getItems();
											// 				          for(var q=0;q<ddlItems.length;q++){
											// 				          	for(var j=0;j<tempAryFilter.length;j++){
											// 					          	if(ddlItems[q].getText()==tempAryFilter[j]){
											// 					          		tempAry.push(ddlItems[q].getKey());
											// 					          	}	
											// 				          	}
											// 				          }
															          
										 //                           	if(ary.length==0){
											// 				          		tempAry.push("All");
											// 				        	}
											// 				        	me.getView().byId("ddlSP").setSelectedKeys(tempAry);
											// 				        	me.ddlSPChanged();
										 //                           // console.log(this.series.chart.getSelectedPoints());
										 //                       }
										 //                   }  
										 //               } 
											//         }
											//     },
											    
											//     legend: {
											//     	itemStyle: {
											//             color: '#ddd',
											//         },
											//         margin: 2,
											//         // align: 'bottom',
											//         // verticalAlign: 'bottom',
											//         // layout: 'vertical',
											//         // x: 15,
											//         // y: 25,
											//         // itemWidth: 50
											//     },
											//     xAxis: {
											//         categories: upgradeInput,
											//         labels: {
											//             skew3d: true,
											//             style: {
											//                 fontSize: '11.5px',
											//                 color: '#ddd',
											//             },
											//         //     useHTML: true,
											// 		      //formatter() {
											// 		      //  let label = this.value;
											// 		      //  let title = this.value;
											// 		      //  let style = `text-overflow: ellipsis; overflow: hidden;`; // <- YOUR OWN STYLE
											// 		      //  return `<div style="${style}" title="${title}">${label}</div>`;
											// 		      //},
											//         },
											//         // tickColor: '#bbb',
											//         gridLineColor: 'transparent'
											//     },
											//     yAxis: {
											//         title: {
											//             text: null
											//         },
											//         labels: {
											//             style: {
											//                 color: '#ddd'
											//             }
											//         },
											//         // gridLineColor: '#bbb'
											//     },
											//     series: [{
											//         name: 'Count',
											//         data: countInput,
											//     }],
											//     credits: {
											// 	    enabled: false
											// 	  },
											//     navigation: {
											//         buttonOptions: {
											//             verticalAlign: 'top',
											//             x:9,
											//             y:-10
											//         },
											//         menuStyle: {
											//             background: '#555'
											//         },
											//         menuItemStyle: {
											//             color: '#ddd'
											//         }
											//     },
											//     exporting: {
											//      	chartOptions: {
											// 		    chart: {
											// 		      backgroundColor: '#555'
											// 		    }
											// 		  },
											//         buttons: {
											//             contextButton: {
											//                 symbol: 'download',
											//                 symbolFill: '#555'
											//             }
											//         },
											//         filename: 'Upgrade Usage Chart'
											//     }
											// });
											
											// Create the chart
											// Highcharts.setOptions({
											//     lang: {
											//         drillUpText: 'Back'
											//     }
											// });
											
											
											Highcharts.theme = {
											    colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
											        '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
											    chart: {
											        backgroundColor: {
											            linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
											            stops: [
											                [0, '#2a2a2b'],
											                [1, '#3e3e40']
											            ]
											        },
											        style: {
											            fontFamily: '\'Unica One\', sans-serif'
											        },
											        plotBorderColor: '#606063'
											    },
											    title: {
											        style: {
											            color: '#E0E0E3',
											            textTransform: 'uppercase',
											            fontSize: '20px'
											        }
											    },
											    subtitle: {
											        style: {
											            color: '#E0E0E3',
											            textTransform: 'uppercase'
											        }
											    },
											    xAxis: {
											      //  gridLineColor: '#707073',
											      //  labels: {
											      //  	rotation: 0,
											      //  	staggerLines: 2,
											      //  	overflow:"justify",
											      //      style: {
											      //          color: '#E0E0E3',
											      //          fontSize: '9px'
											      //      },
											            
											      ////      useHTML: true,
													    // // formatter() {
													    // //   return '<div style="font-size: 9px;">'+this.value+'</div>';
													    // // },
											      //  },
											        lineColor: '#707073',
											        minorGridLineColor: '#505053',
											        tickColor: '#707073',
											        title: {
											            style: {
											                color: '#A0A0A3'
											
											            }
											        }
											    },
											    yAxis: {
											        // gridLineColor: '#707073',
											        labels: {
											            style: {
											                color: '#E0E0E3'
											            }
											        },
											        gridLineColor: 'transparent',
											        // lineColor: '#707073',
											        // minorGridLineColor: '#505053',
											        tickColor: '#707073',
											        tickWidth: 1,
											        title: {
											            style: {
											                color: '#A0A0A3'
											            }
											        }
											    },
											    tooltip: {
											        backgroundColor: 'rgba(0, 0, 0, 0.85)',
											        style: {
											            color: '#F0F0F0'
											        }
											    },
											    lang: {
											        drillUpText: 'Back'
											    },
											    plotOptions: {
											        series: {
											            dataLabels: {
											                color: '#B0B0B3'
											            },
											            marker: {
											                lineColor: '#333'
											            }
											        },
											        boxplot: {
											            fillColor: '#505053'
											        },
											        candlestick: {
											            lineColor: 'white'
											        },
											        errorbar: {
											            color: 'white'
											        }
											    },
											    legend: {
											        itemStyle: {
											            color: '#E0E0E3'
											        },
											        itemHoverStyle: {
											            color: '#FFF'
											        },
											        itemHiddenStyle: {
											            color: '#606063'
											        }
											    },
											    credits: {
											        style: {
											            color: '#666'
											        }
											    },
											    labels: {
											        style: {
											            color: '#707073'
											        }
											    },
											
											    drilldown: {
											        activeAxisLabelStyle: {
											            color: '#F0F0F3',
											            fontWeight: 'normal'
											        },
											        activeDataLabelStyle: {
											            color: '#F0F0F3'
											        },
											         drillUpButton: {
											            relativeTo: 'spacingBox',
											            
											            // position: {
											            // 	align:'left',
											            //     y: -20,
											            //     // x: -20
											            // },
											            // theme: {
											            //     fill: 'white',
											            //     'stroke-width': 1,
											            //     stroke: 'silver',
											            //     r: 0,
											            //     states: {
											            //         hover: {
											            //             fill: '#a4edba'
											            //         },
											            //         select: {
											            //             stroke: '#039',
											            //             fill: '#a4edba'
											            //         }
											            //     }
											            // }
											
											        },
        
											    },
											
											    navigation: {
											        buttonOptions: {
											            symbolStroke: '#DDDDDD',
											            theme: {
											                fill: '#505053'
											            }
											        }
											    },
											
											    // scroll charts
											    rangeSelector: {
											        buttonTheme: {
											            fill: '#505053',
											            stroke: '#000000',
											            style: {
											                color: '#CCC'
											            },
											            states: {
											                hover: {
											                    fill: '#707073',
											                    stroke: '#000000',
											                    style: {
											                        color: 'white'
											                    }
											                },
											                select: {
											                    fill: '#000003',
											                    stroke: '#000000',
											                    style: {
											                        color: 'white'
											                    }
											                }
											            }
											        },
											        inputBoxBorderColor: '#505053',
											        inputStyle: {
											            backgroundColor: '#333',
											            color: 'silver'
											        },
											        labelStyle: {
											            color: 'silver'
											        }
											    },
											
											    navigator: {
											        handles: {
											            backgroundColor: '#666',
											            borderColor: '#AAA'
											        },
											        outlineColor: '#CCC',
											        maskFill: 'rgba(255,255,255,0.1)',
											        series: {
											            color: '#7798BF',
											            lineColor: '#A6C7ED'
											        },
											        xAxis: {
											            gridLineColor: '#505053'
											        }
											    },
											
											    scrollbar: {
											        barBackgroundColor: '#808083',
											        barBorderColor: '#808083',
											        buttonArrowColor: '#CCC',
											        buttonBackgroundColor: '#606063',
											        buttonBorderColor: '#606063',
											        rifleColor: '#FFF',
											        trackBackgroundColor: '#404043',
											        trackBorderColor: '#404043'
											    },
											
											    // special colors for some of the
											    legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
											    background2: '#505053',
											    dataLabelsColor: '#B0B0B3',
											    textColor: '#C0C0C0',
											    contrastTextColor: '#F0F0F3',
											    maskColor: 'rgba(255,255,255,0.3)'
											};
											
											// Apply the theme
											Highcharts.setOptions(Highcharts.theme);
											
											
											var chart3d = Highcharts.chart('repoContainerReviewUpgrade', {
											    chart: {
											        type: 'bar'
											    },
											    title: {
											        text: ''
											    },
											    subtitle: {
											        text: ''
											    },
											    xAxis: {
											        type: 'category',
											        gridLineColor: '#707073',
											        labels: {
											        	rotation: 0,
											        	staggerLines: 2,
											        	overflow:"justify",
											            style: {
											                color: '#E0E0E3',
											                fontSize: '9px'
											            },
											            
											      //      useHTML: true,
													    // formatter() {
													    //   return '<div style="font-size: 9px;">'+this.value+'</div>';
													    // },
											        },
											        
													// labels: {
													// 	style: {
													// 		// color: '#ddd',
													// 		fontSize: '9px'
													// 	},
														
													// },
													// categories: timeInput,
													tickColor: 'transparent'
											    },
											    yAxis: {
											        title: {
											            text: ''
											        }
											
											    },
											    legend: {
											        enabled: false
											    },
											    plotOptions: {
											        series: {
											            borderWidth: 0,
											            dataLabels: {
											                enabled: true,
											                format: '{point.y}'
											            }
											        }
											    },
											
											    tooltip: {
											        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
											        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
											    },
											
											    series: [
											        {
											            name: "Configuration Blocks",
											            colorByPoint: true,
											            // data: [
											            //     {
											            //         name: "Chrome",
											            //         y: 62.74,
											            //         drilldown: "Chrome"
											            //     },
											            //     {
											            //         name: "Firefox",
											            //         y: 10.57,
											            //         drilldown: "Firefox"
											            //     },
											            //     {
											            //         name: "Internet Explorer",
											            //         y: 7.23,
											            //         drilldown: "Internet Explorer"
											            //     },
											            //     {
											            //         name: "Safari",
											            //         y: 5.58,
											            //         drilldown: "Safari"
											            //     },
											            //     {
											            //         name: "Edge",
											            //         y: 4.02,
											            //         drilldown: "Edge"
											            //     },
											            //     {
											            //         name: "Opera",
											            //         y: 1.92,
											            //         drilldown: "Opera"
											            //     },
											            //     {
											            //         name: "Other",
											            //         y: 7.62,
											            //         drilldown: null
											            //     }
											            // ]
											          //   dataLabels: [{
													        //     // align: 'left',
													        //     verticalAlign : 'top',
													        //     format: '({point.name})'
													        // }, 
													        // {
													        //     // align: 'right',
													        //     verticalAlign : 'bottom',
													        //     format: '{y} points'
													        // }
													        // ],
											            data:uniqueEmps
											        }
											    ],
											    drilldown: {
											        // series: [
											        //     {
											        //         name: "Chrome",
											        //         id: "Chrome",
											        //         data: [
											        //             [
											        //                 "v65.0",
											        //                 0.1
											        //             ],
											        //             [
											        //                 "v64.0",
											        //                 1.3
											        //             ],
											        //             [
											        //                 "v63.0",
											        //                 53.02
											        //             ],
											        //             [
											        //                 "v62.0",
											        //                 1.4
											        //             ],
											        //             [
											        //                 "v61.0",
											        //                 0.88
											        //             ],
											        //             [
											        //                 "v60.0",
											        //                 0.56
											        //             ],
											        //             [
											        //                 "v59.0",
											        //                 0.45
											        //             ],
											        //             [
											        //                 "v58.0",
											        //                 0.49
											        //             ],
											        //             [
											        //                 "v57.0",
											        //                 0.32
											        //             ],
											        //             [
											        //                 "v56.0",
											        //                 0.29
											        //             ],
											        //             [
											        //                 "v55.0",
											        //                 0.79
											        //             ],
											        //             [
											        //                 "v54.0",
											        //                 0.18
											        //             ],
											        //             [
											        //                 "v51.0",
											        //                 0.13
											        //             ],
											        //             [
											        //                 "v49.0",
											        //                 2.16
											        //             ],
											        //             [
											        //                 "v48.0",
											        //                 0.13
											        //             ],
											        //             [
											        //                 "v47.0",
											        //                 0.11
											        //             ],
											        //             [
											        //                 "v43.0",
											        //                 0.17
											        //             ],
											        //             [
											        //                 "v29.0",
											        //                 0.26
											        //             ]
											        //         ]
											        //     },
											        //     {
											        //         name: "Firefox",
											        //         id: "Firefox",
											        //         data: [
											        //             [
											        //                 "v58.0",
											        //                 1.02
											        //             ],
											        //             [
											        //                 "v57.0",
											        //                 7.36
											        //             ],
											        //             [
											        //                 "v56.0",
											        //                 0.35
											        //             ],
											        //             [
											        //                 "v55.0",
											        //                 0.11
											        //             ],
											        //             [
											        //                 "v54.0",
											        //                 0.1
											        //             ],
											        //             [
											        //                 "v52.0",
											        //                 0.95
											        //             ],
											        //             [
											        //                 "v51.0",
											        //                 0.15
											        //             ],
											        //             [
											        //                 "v50.0",
											        //                 0.1
											        //             ],
											        //             [
											        //                 "v48.0",
											        //                 0.31
											        //             ],
											        //             [
											        //                 "v47.0",
											        //                 0.12
											        //             ]
											        //         ]
											        //     },
											        //     {
											        //         name: "Internet Explorer",
											        //         id: "Internet Explorer",
											        //         data: [
											        //             [
											        //                 "v11.0",
											        //                 6.2
											        //             ],
											        //             [
											        //                 "v10.0",
											        //                 0.29
											        //             ],
											        //             [
											        //                 "v9.0",
											        //                 0.27
											        //             ],
											        //             [
											        //                 "v8.0",
											        //                 0.47
											        //             ]
											        //         ]
											        //     },
											        //     {
											        //         name: "Safari",
											        //         id: "Safari",
											        //         data: [
											        //             [
											        //                 "v11.0",
											        //                 3.39
											        //             ],
											        //             [
											        //                 "v10.1",
											        //                 0.96
											        //             ],
											        //             [
											        //                 "v10.0",
											        //                 0.36
											        //             ],
											        //             [
											        //                 "v9.1",
											        //                 0.54
											        //             ],
											        //             [
											        //                 "v9.0",
											        //                 0.13
											        //             ],
											        //             [
											        //                 "v5.1",
											        //                 0.2
											        //             ]
											        //         ]
											        //     },
											        //     {
											        //         name: "Edge",
											        //         id: "Edge",
											        //         data: [
											        //             [
											        //                 "v16",
											        //                 2.6
											        //             ],
											        //             [
											        //                 "v15",
											        //                 0.92
											        //             ],
											        //             [
											        //                 "v14",
											        //                 0.4
											        //             ],
											        //             [
											        //                 "v13",
											        //                 0.1
											        //             ]
											        //         ]
											        //     },
											        //     {
											        //         name: "Opera",
											        //         id: "Opera",
											        //         data: [
											        //             [
											        //                 "v50.0",
											        //                 0.96
											        //             ],
											        //             [
											        //                 "v49.0",
											        //                 0.82
											        //             ],
											        //             [
											        //                 "v12.1",
											        //                 0.14
											        //             ]
											        //         ]
											        //     }
											        // ]
											        series:uniqueEmpsDrill
											    },
											    
											    navigation: {
											        buttonOptions: {
											            verticalAlign: 'top',
											            x:9,
											            y:-10
											        },
											        menuStyle: {
											            background: '#555'
											        },
											        menuItemStyle: {
											            color: '#ddd'
											        }
											    },
											    exporting: {
											     	chartOptions: {
													    chart: {
													      backgroundColor: '#555'
													    }
													  },
											        buttons: {
											            contextButton: {
											                symbol: 'download',
											                symbolFill: '#555'
											            }
											        },
											        filename: 'Upgrade Usage Chart'
											    }
											
											});
										
											
										}
										
										oModelColumnChartSVAccDetail.setProperty('/data', tempBPCountArray);
										
									}
								
					
					
					++i;
					if (i >= array.length) {
						
					} else {
						next();
					}
				},
				error: function (xmlhttprequest, textstatus, message) {
					// if (xmlhttprequest.status == 504) {

						++i;
						if (i >= array.length) {
							
						} else {
							next();
						}
					// }
				}
			});
		}
		next();
	}

	function stringToDate(dateStr) {
		// var date = new Date(dateStr);
		// return date;
		
		var tempDate1 = dateStr.replace("-","/");
		var tempDate2 =tempDate1.replace("-","/");
		var date = new Date(tempDate2); 
		return date;

	};
});
Date.prototype.YYYYMMDD = function() {
	var yyyy = this.getFullYear().toString();
	var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
	var dd = this.getDate().toString();
	return yyyy + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + (dd[1] ? dd : "0" + dd[0]); // padding
};
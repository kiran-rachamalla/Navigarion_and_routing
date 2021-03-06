sap.ui.define([
"kiran/Myapp/controller/BaseController"
], function(BaseController, JSONModel){
"use strict";
return BaseController.extend("kiran.Myapp.controller.employee.Employee",{
	onInit: function(){
		let oRouter = this.getRouter();
		oRouter.getRoute("employee").attachMatched(this._onRouteMatched,this);
	},
    _onRouteMatched:function(oEvent){
    	var oView,oArgs;
    	
    	oArgs = oEvent.getParameter("arguments");
    	oView = this.getView();
    	
    	oView.bindElement( {
    				path: '/Employees(' + oArgs.employeeId + ')' ,
    			    event: {
    			    	change: this._onBindChange.bind(this),
    			    	dataRequested:function(oEvent){
    			    		oView.setBusy(true)
    			    	},
    			    	dataRecivied: function(oEvent){
    			    		oView.setBusy(false)
    			    	}
    			    	
    			    }
    	});
    	
    },
	_onBindChange:function(oEvent){
		if(!this.getView.getBindingContext())
			this.getRouter().getTargets().display("notFound");
	},
	onShowResume : function (oEvent) {
		var oCtx = this.getView().getElementBinding().getBoundContext();

		this.getRouter().navTo("employeeResume", {
			employeeId : oCtx.getProperty("EmployeeID")
		});
	}
});
});
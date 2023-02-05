////////////////////////
//const gateRun=require("./gateRunWS.js");//run
const gateRun=require("./gateRunPOST.js");//run
const gate=new gateRun();

gate.run();//단일CPU
//gate.clusterRun();//모든CPU
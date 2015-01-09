/**
 * Read and parse OpenVPN server status log and expose it in JSON.
 *
 * @param  {String} pathToOvpnLogFile
 * @return {JSON}
 */

var fs  = require("fs");

module.exports = {
    parseOvpnLog: function( pathToOvpnLogFile ) {
	var tmp, idx, client;
	var section = "client_list";
	var section_counter = 0;
	var ret = {
		last_updated: null,
		client_list: [],
		routing_table: [],
		global_stats: []
	};
	try {
		var lines = fs.readFileSync(pathToOvpnLogFile, 'utf8').split('\n');
	} catch (e) {
		throw " "+e;
	};
	//
	for (var i=0, l=lines.length; i<l; i++){
		section_counter++;
		//
		switch ( lines[i] ){
			case "ROUTING TABLE":
				section = "routing_table";
				section_counter = 0;
				idx.length = 0;
				break;
			case "GLOBAL STATS":
				section = "global_stats";
				section_counter = 0;
				idx.length = 0;
				break;
		};
		//
		// section: CLIENT LIST
		//
		if (section === "client_list" && section_counter === 3){
			idx = lines[i].toLowerCase().replace(/ /g,"_").split(",");
		} else if (section === "client_list" && section_counter >3 && idx.length>0){
			tmp = lines[i].split(",");
			client = {};
			for (var c=0, cl=idx.length; c<cl; c++){
				client[ idx[c] ] = tmp[c];
			};
			ret.client_list.push( client );
		};
		//
		// section: ROUTING TABLE
		//
		if (section === "routing_table" && section_counter === 1){
			idx = lines[i].toLowerCase().replace(/ /g,"_").split(",");
		} else if (section === "routing_table" && section_counter >1 && idx.length>0){
			tmp = lines[i].split(",");
			client = {};
			for (var c=0, cl=idx.length; c<cl; c++){
				client[ idx[c] ] = tmp[c];
			};
			ret.routing_table.push( client );
		};
		//
		lss = lines[i].split(",");
		
		if ( lss[0].toLowerCase() === "updated"){
			ret.last_updated = lss[1];
		};
		
		//
	};
	//
	return ret;
    }
}

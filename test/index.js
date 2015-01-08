var should = require('chai').should(),
    parseOvpnLog = require('../index.js').parseOvpnLog;

describe('#parseOvpnLog', function() {
	
  it('Reads sample status log file and get JSON data', function() {
    //parseOvpnLog( 'openvpnserver.log' ).should.equal('&amp;');
	  var res = parseOvpnLog( './test/openvpnserver.log' );
	  console.log(JSON.stringify(res));
	  res.should.be.an("object");
	  //
	  res.should.have.property("last_updated");
	  res.should.have.property("client_list").with.length(1);
	  res.should.have.property("routing_table").with.length(1);
	  res.should.have.property("global_stats");
	  //
	  obj = res.client_list[0];
	  obj.should.be.an("object");
	  obj.should.have.property("common_name").equal("baba_jaga");
	  obj.should.have.property("real_address").equal("1.2.3.4:1194");
	  obj.should.have.property("bytes_received").equal("107322");
	  obj.should.have.property("bytes_sent").equal("492621");
	  obj.should.have.property("connected_since");
	  //
	  obj = res.routing_table[0];
	  obj.should.be.an("object");
	  obj.should.have.property("virtual_address").equal("172.16.0.1");
	  obj.should.have.property("common_name").equal("baba_jaga");
	  obj.should.have.property("real_address").equal("1.2.3.4:1194");	  
	  obj.should.have.property("last_ref");
  });

});
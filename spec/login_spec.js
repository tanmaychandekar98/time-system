var request = require("request");
//var helloWorld = require("../app.js");
var base_url = "http://localhost:3000";

var params = [
              {
                url: base_url+"/login",
                form: {
                    username:'2',
                    password: 'abc2pqr'
                }
            },
            {
                url: base_url+"/login",
                form: {
                    username:'2',
                    password: 'abc2pq'
                }
            },
            ];

describe("Time cards Server", function() {
  describe("LOGIN - ", function() {
    it("returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });


    it("logs in valid user", function(done) {
      request.post(params[0], function(error, response, body) {
        expect(response.statusCode).toBe(302);  // 302 status means success
        //console.log("\n\n\n\n"+JSON.stringify(response)+"\n\n\n\n\n");
        done();
      });
    });

    it("logs in invalid user", function(done) {
      request.post(params[1], function(error, response, body) {
        expect(response.statusCode).toBe(302);  // 302 status means success
        done();
      });
    });


  });
});
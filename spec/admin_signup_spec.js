var request = require("request");
//var helloWorld = require("../app.js");
var base_url = "http://localhost:3000/register/admin";

var params = [
              {
                url: base_url,
                form: {
                    cname:'Directi',
                    id: '1001',
                    name: 'Stuart',
                    password: 'admin1'
                }
            },
            {
                url: base_url,
                form: {
                    cname:'Amazon',
                    id: '1002',
                    name: 'Jeff',
                    password: 'admin2'
                }
            }
            ];

describe("Time cards Server", function() {
  describe("ADMIN-SIGNUP - ", function() {
    params.forEach(function(value){

      it("Sign-up valid user "+value.form.cname, function(done) {
        request.post(value, function(error, response, body) {
          expect(response.statusCode).toBe(302);  // 302 status means success
          //console.log("\n\n\n\n"+JSON.stringify(response)+"\n\n\n\n\n");
          done();
        });
      });


    });
  });
});
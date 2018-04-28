var request = require("request");
var base_url = "http://localhost:3000/register/emp";

var params = [
              {
                url: base_url,
                form: {
                    key:'5ac8cfc077d9ae37c8312571',
                    id: '100',
                    name: 'Stuart',
                    password: 'admin1',
                    job:'Developer',
                    email:'asd@qwe',
                    hdate:''
                }
            }
            ];

describe("Time cards Server", function() {
  describe("EMPLOYEE-SIGNUP - ", function() {
    params.forEach(function(value){

      it("Sign-up valid user "+value.form.name, function(done) {
        request.post(value, function(error, response, body) {
          expect(response.statusCode).toBe(302);  // 302 status means success
          //console.log("\n\n\n\n"+JSON.stringify(response)+"\n\n\n\n\n");
          done();
        });
      });


    });
  });
});
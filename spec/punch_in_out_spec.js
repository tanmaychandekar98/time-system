var request = require("request");
var base_url = "http://localhost:3000/users/";

// Punch in var
var params_in = [
              {
                url: base_url+'intime/'+'5ac8d054dec15e1cc74677cd',
            }
            ];

// Punch out var
var params_out = [
              {
                url: base_url+'outtime/'+'5ac8d054dec15e1cc74677cd',
            }
            ];


describe("Time cards Server", function() {
  describe("EMPLOYEE-PUNCH-IN-OUT - ", function() {
    params_in.forEach(function(value){

      it("punch in an employee ", function(done) {
        request.post(value, function(error, response, body) {
          expect(response.statusCode).toBe(302);  // 302 status means success
          //console.log("\n\n\n\n"+JSON.stringify(response)+"\n\n\n\n\n");
          done();
        });
      });


    });

    params_out.forEach(function(value){

      it("punch out an employee ", function(done) {
        request.post(value, function(error, response, body) {
          expect(response.statusCode).toBe(302);  // 302 status means success
          //console.log("\n\n\n\n"+JSON.stringify(response)+"\n\n\n\n\n");
          done();
        });
      });


    });
  });
});
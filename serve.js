/**
 * @description gbk decode by python server
 */

var os = require("os");
var dns = require("dns");
var exec = require("child_process").exec;

dns.lookup(os.hostname(), function(err, add, fam) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`Server on http://localhost:8080/dist`);
    console.log(`Server on http://${add}:8080/dist`);
});

exec("python -m SimpleHTTPServer 8080", function(err, stdout, stderr) {
    console.clear();
    if (err) {
        console.error(`exec error: ${err}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
});
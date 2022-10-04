const http = require("http");
const fs = require("fs");
const minimist = require("minimist");

let args = minimist(process.argv.slice(2), {
	default: {
		port: 3000,
	},
});

let homeContent = "";
let projectContent = "";
let registerContent = "";

fs.readFile("html/home.html", (err, home) => {
	if (err) {
		throw err;
	}
	homeContent = home;
});

fs.readFile("html/project.html", (err, project) => {
	if (err) {
		throw err;
	}
	projectContent = project;
});

fs.readFile("html/form/register.html", (err, register) => {
	if (err) {
		throw err;
	}
	registerContent = register;
});

http
	.createServer((request, response) => {
		let url = request.url;
		response.writeHeader(200, { "Content-Type": "text/html" });
		switch (url) {
			case "/project":
				response.write(projectContent);
				response.end();
				break;
			case "/register":
				response.write(registerContent);
				response.end();
				break;
			default:
				response.write(homeContent);
				response.end();
				break;
		}
	})
	.listen(args.port);

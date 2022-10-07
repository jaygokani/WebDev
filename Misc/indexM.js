const http = require("http");
const fs = require("fs");
const minimist = require("minimist");

const homeContent = "";
let projectContent = "";
const registerContent = "";

const args = minimist(process.argv.slice(2), {
	default: {
		port: 3000,
	},
});

fs.readFile("html/home.html", (err, home) => {
	if (err) throw err;
	projectContent = home;
});

fs.readFile("html/project.html", (err, project) => {
	if (err) throw err;
	projectContent = project;
});

fs.readFile("html/form/register.html", (err, register) => {
	if (err) throw err;
	projectContent = register;
});

http
	.createServer((request, response) => {
		const url = request.url;
		response.writeHeader(200, { "Content-type": "text/html" });

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
	.listen(args);

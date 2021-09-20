const http = require('http');
const queryString = require('query-string');
const func = require("./function.js");
const server = http.createServer((req, res) => {
    let reqInfo = {  };
    res.writeHead(200, { "Content-Type": "application/json" });
    if (req.method == 'GET') {
        let parsed = queryString.parseUrl(req.url)
        let op = parsed.query["op"];
        let x = parseInt(parsed.query["x"]);
        let y = parseInt(parsed.query["y"]);
        let n = parseInt(parsed.query["n"]);
        let urltemp = req.url.split('&')
        if (urltemp[3]){
            reqInfo.body = ({
                error: "Trop de paramètre"
            })
        } else if (op == ' ' || op == '+'){
            reqInfo.body = ({
                op: "+",
                x: x,
                y: y,
                Résultat: func.add(x, y),
            })
        } else if (op == '-'){
            reqInfo.body = ({
                op: op,
                x: x,
                y: y,
                Résultat: func.sub(x, y),
            })
        } else if (op == '/'){
            reqInfo.body = ({
                op: op,
                x: x,
                y: y,
                Résultat: func.div(x, y),
            })
        } else if (op == '*'){
            reqInfo.body = ({
                op: op,
                x: x,
                y: y,
                Résultat: func.mul(x, y),
            })
        } else if (op == '%'){
            reqInfo.body = ({
                op: op,
                x: x,
                y: y,
                Résultat: func.mod(x, y),
            })
        } else if (op == '!'){
            reqInfo.body = ({
                op: op,
                n: n,
                Résultat: func.fac(n),
            })
        } else if (op == 'p'){
            reqInfo.body = ({
                op: op,
                n: n,
                Résultat: func.pre(n),
            })
        } else if (op == 'np'){
            reqInfo.body = ({
                op: op,
                n: n,
                Résultat: func.np(n),
            })
        } else{
            reqInfo.body = ({
                op: "Opérateur invalide",
                x: x,
                y: y,
                n: n,
            })
        }
        res.end(JSON.stringify(reqInfo));
        
        
    } else {
        if (req.method == 'POST') {
            let body = [];
            req.on('data', chunk => {
                body.push(chunk);
            }).on('end', () => {
                try {
                    if (req.headers['content-type'] === "application/json") {
                        reqInfo.body = JSON.parse(body);
                    } else {
                        if (req.headers['content-type'] === "application/x-www-form-urlencoded") {
                            reqInfo.body = queryString.parse(body.toString());
                        } else {
                            reqInfo.body = body.toString();
                        }
                    }
                    res.end(JSON.stringify(reqInfo));
                } catch (error) {
                    console.log(error);
                }
            });
        }
    }
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
var database = require("../database/config");

function logar(email,senha){
    const query = ` select * from adm where email = '${email}' and senha ='${senha}';`;
    return database.executar(query)
}
module.exports = {
logar,
};

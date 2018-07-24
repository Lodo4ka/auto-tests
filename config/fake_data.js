const faker  = require('faker');

const fake = function() {
    return {
        email: faker.internet.email(),
        password: faker.internet.password(),
        contrAgentname: faker.internet.userName(),
        contrAgentDataFrom: faker.date.month(),
        contrAgentDataTo: faker.date.recent()
    };
};

module.exports = fake;
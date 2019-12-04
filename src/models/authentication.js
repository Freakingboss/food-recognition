let users = [
    {
        name: 'Maria'
    },
    {
        name: 'Joao'
    },
    {
        name: 'Thiago'
    },
    {
        name: 'Catarina'
    },
];

// Authenticate the user by his credentials
function authenticateUser(userCredentials) {
    let userExist = false;

    // Check if userCredentials is empty and is an object
    if(Object.entries(userCredentials).length === 0 &&
    userCredentials.constructor === Object) {
        let names = [];
        names = users.forEach( (obj) => {
            names.push(obj.name);
        });

        userExist = names.includes(userCredentials.username);
    }
    return userExist;
}

module.exports = {
    authenticateUser
};
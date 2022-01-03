
const validation = {
    required: (value) => {
        return value === "" ? "Should not be Empty." : null;
    },
    email: (value) => {
    
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(value).toLowerCase()) ? null : "Invalid Email";
    
    },
    minLength: (value, params) => {
        return value.length < params ? `Minimum Length is ${params}` : null;
    },
    match: (value, params) => {
        return value !== params ? "Password Doesn't Match" : null;
    }
}

export const validate = (form, rules) => {

    const errors = {};

    // loop through each form key eg. email, password
    Object.keys(rules).forEach(key => {
        
        // validate each rule of a particula key
        for(let i = 0; i < rules[key].length; i++){
            
            let rule = rules[key][i];
            let error = null;
            
            if(typeof rule === 'object'){

                const value = Object.values(rule)[0]; // get the object value
                rule = Object.keys(rule)[0]; // get object key
                error = validation[rule](form[key], value);

            }else{
                error = validation[rule](form[key]);
            }

            if(error){
                errors[key] = error;
                break;
            } 
            
        }

    });
    
    return {isValid: Object.keys(errors).length <= 0, errors};
}


const fs = require('fs');
const dotenv = require('dotenv');


// Figuring out the path to the default global.env file -------------

const path = require('path');
const os = require('os');
//var user_home = os.homedir();
//var home_home = path.dirname(user_home);

//if( os.platform != 'win32' && home_home == '/' )
//    home_home = '/home';

const global_env_file_path = path.join(os.homedir(), 'global.env');

//-------------------------------------------------------------------



function key_value_to_envstring(key, value)
{
    if( typeof value == 'object' )
        value = JSON.stringify(value)
    else
        value = String(value)
        
    key = String(key);    
    
    return `${key}='${value}'\n`;
}


    
module.exports = 
{
    parseSync(opts={})
    {
        var path = opts.path ? opts.path : global_env_file_path;        
        
        try
        {
            if( fs.existsSync(path) )
                return dotenv.parse( fs.readFileSync(path, 'utf8') )
            else
                return {}
        }
        catch(err)
        {
            throw err;
        }
    },
    
    appendSync(key, value, opts={})
    {
        var path = opts.path ? opts.path : global_env_file_path;        
        var env_string = key_value_to_envstring(key, value);
        
        try
        {
            fs.appendFileSync(path, env_string, 'utf8');
        } 
        catch(err)
        {
            throw err;
        }        
    }
}









# global-dotenv

Global-dotenv creates the shared persistent `global.env` file that is accessible from all running apps and allows them to read variables from it and append variables to it. It enables apps to "know about each other" and to share information between each other without building a message system.


## Install

```bash
npm install global-dotenv
```


## Usage

To read the global `global.env` file as JSON, require and parse global-dotenv:

```javascript
const global_dotenv = require('global-dotenv');

var global_dotenv_as_json = global_dotenv.parseSync();
// { FOO: 'BAR', MAY: 'The 4th' }

global_dotenv_as_json['FOO'];
// 'BAR'
```
If the global file doesn't yet exist or is removed, an empty object `{}` is returned. As the file is shared by all running apps, and can be altered by them at any moment, it's recommended to parse it every time right before you want to read the values from it.

To append variables to the global `global.env` file, pass them into appendSync function in the form of `key, value`:

```javascript
const global_dotenv = require('global-dotenv');

global_dotenv.appendSync('FOO', 'BAR');
global_dotenv.appendSync('NUMBER', 1024);
```

Both `key` and `value` will be converted into strings before appending. If typeof `value` is `"object"`, it's automatically converted into a string with `JSON.stringify()`:

```javascript
const global_dotenv = require('global-dotenv');

global_dotenv.appendSync('OBJ', {foo: 'bar'});
// { OBJ: '{"foo":"bar"}' }
```

## Config

The default path to the global file is `$HOME/global.env` (Like: `/home/user/global.env`) for Linux and `%HOMEPATH%\global.env` (Like: `C:\Users\User\global.env`) for Windows. You can change it by setting a custom path. Do this by passing an options object with a `path` key into `parseSync` and `appendSync` functions: 

```javascript
const global_dotenv = require('global-dotenv');

var global_dotenv_as_json = global_dotenv.parseSync({path: '/path/to/the/file'});

global_dotenv.appendSync('FOO', 'BAR', {path: '/path/to/the/file'});
```
If the file doesn't exist, it will be automatically created. By using a proper custom path every time you can have multiple global files if it makes sense to you and your apps. For example you can have several groups of apps that share different global files. 

## Accessibility of the global.env file

The whole point of this module is that the global file can be accessed by many apps. The default `$HOME/global.env` file is accessible by the apps that are running under the user who owns the `$HOME` directory, under `root` user or under any user with `sudo` command. If you want the `global.env` file to be accessed by apps that are run under different users, **make sure those users have access to the global file**. If the app that tries to use the global file is run under a user that has no acces to the global file, `parseSync` and `appendSync` functions will throw an exception. You'll need to try-catch it yourself.
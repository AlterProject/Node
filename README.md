# Alter Node

This repository contains only back-end files. Click [here](https://github.com/AlterProject/Panel) to see front-end files.

## Last features

- CPU charge in real time
- Disk usage in real time
- RAM usage in real time

## Setup Alter (Localhost)

Go to [AlterProject/Localhost](https://github.com/AlterProject/Localhost) and download it from GIT/Desktop or from ZIPPED file. 

- Unzip it
- Type "npm start" into the output folder 
- Go to http://localhost:5500/

## Setup Alter (Public server)

Download this repository and the [Alter Node](https://github.com/AlterProject/Node) from GIT/Desktop or from ZIPPED file.

### Initialization

- Unzip these folders
- Move the Node in a dedicated server where you want store users data (servers, database, etc...) \*
- Download a webserver like [WAMP](https://www.wampserver.com/#download)
- Move the Panel into the WAMP's `www` folder. (Make it empty before)

\* Moving the Node in a dedicated server allow you to use the panel from localhost. If you don't have one, you'll need a 3/4/5G device to use it correctly.

### Configuring

Node : 
- Go to the Node and edit the `config.json` file.
- Replace "`127.0.0.1`" by the panel hosting address.

Panel : 
- Go to the Panel and edit the "scripts.json" file.
- Replace "`127.0.0.1`" by the node address.
- Replace "`5500`" by the node port.

And enjoy!

## LICENSE
```
GPL-3.0
```

# PKHaku

This is a Nokia internal Hackathon project implemented in two days. This is about implementing a application for the dog sports. There is one or several human targets, which a dog has to find and the position of the target or targets is delivered from a cell phone to the nodejs server once that target presses button to send the coordinates. Also the position of the dog is sent to server every second. Position of the dog is received from the Thingsee IOT device attached to the dog.

The position of the target or targets and the dog is pushed in realtime to the html application which shows all these positions on the map. The route of the dog and route information is also displayed as well as the running time (i.e time from start to the moment when the dog has found all the targets). There is also a button to start the run and a button to stop the run. Pressing a start button will create a new empty GPX file in which the GPS coordinates of the dog are stored as well as timestamp. Pressing the stop button closes the file.

*Hackathon team "Cumulus":*
- Päivi Kaste, team lead and the original idea
- Hanne Kankaanranta
- Katriina Huovila
- Tarja Muikku
- Juhani Hakosalo

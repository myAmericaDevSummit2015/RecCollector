## RecCollector
A unified Application Programming Interface (API) server built around various
API's oriented towards providing useful data that correlates to core 
information pulled from the Recreation Information Database (RIDB) by
geolocation.

Built on Bluemix

[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.com/myAmericaDevSummit2015/RecCollector)

#### Introduction
RecCollector is a project that began its life as a hackathon effort by a team
of [IBMers] (www.ibm.com) as a part of [MyAmerica Developer Summit 2015]
(openglobe.github.io/myamerica-devsummit/), an effort hosted by the USDA and
DOI to get private industry, government and citizens developing value from 
RIDB and the greater public recreational data ecosystem.

RecCollector is built around the idea of aggragating informationr relevant to a
user provided location from a narrow set of API's whose data compliments that 
pulled from RIDB.

RecCollector is designed to be behavior driven, modular and in keeping with the
traditions of the [Unix Philosophy] (http://www.ru.j-npcs.org/usoft/WWW/LJ/Articles/unixtenets.html).

A proof of concept, mobile-first web client is currently under developement.

#### Dependencies
- [Npm] (https://www.npmjs.com/)
- [Node.js] (http://nodejs.org);
- [MongoDB] (https://www.mongodb.org/)
- [Watson Text-To-Speech Service] (https://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/text-to-speech/) (*As a part of modularity plans, services should be able to be turned on and off in the future*)
- [RIDB Key] (https://ridb.recreation.gov/?action=register)

*See package.json for programming stack*

#### Configuration and Setup
###### Environment Variables
- MADC2015API_USERNAME - API user username
- MADC2015API_PASSWORD - API user password
- MADC2015API_JWT_SECRET - JWT Token Secret
- MADC2015API_T2S_USERNAME - Watson Text-To-Speech username
- MADC2015API_T2S_PASSWORD - Watson Text-To-Speech password

###### General
- Setup local and/or remote MongoDB instance (see config/database.js for more)
- Install Node.js and Npm
- In working directory, run "npm install"
- Run application with "npm start"
- Test with "npm test"

###### Notes
- HTTP Basic Authentication is required for an Access Token at /token.
- Access Tokens are required to authenticate at all other enpoints. Acceptable
methods to send tokens are HTTP Headers, GET query strings or POST bodies. (see
app/lib/jwtAuthencitation.js for more)

#### Contributing
Feel free to contribute using both Github's Issues and Pull Request. Specs are
expected. If you stick to code conventions, it would be appreciated.

###### Currently Implemented API's
- RIDB (Core): /facilities, /recreational_areas
- OpenWeatherMap: /current, /forecast
- Watson Text-To-Speech: /text_to_speech

#### Resources
- [RIDB] (http://usda.github.io/RIDB/#introduction)
- [USDA] (http://www.usda.gov/wps/portal/usda/usdahome)
- [DOI] (http://www.doi.gov/index.cfm)
- [IBM] (http://www.ibm.gov)

#### License
[Apache 2.0] (https://www.apache.org/licenses/LICENSE-2.0)

#### Issues
Use Github's Issues

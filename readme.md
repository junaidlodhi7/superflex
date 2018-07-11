# SEISMIC


>SEISMIC is Defining the Future of Movement™ through Powered Clothing™. At SEISMIC, we are passionate about creating powered clothing. From biomechanics to apparel design, our team draws on diverse backgrounds and expertise.

## Table of Contents

- [Tech]
- [Up and Running]
    - [Local Setup]
		- [Docker Setup]
		- [EC2 Instance]
- [REST API]
    - [Test Accounts]
		- [Endpoints]
- [Contributing]


## Tech
* [AngularJS] - HTML enhanced for web apps!
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework.
* [PostgreSQL] - Sequelize is a promise-based ORM for Node.js
* [Sequelize] - Sequelize is a promise-based ORM for Node.js
* [Code Mirror] - CodeMirror is a versatile text editor implemented in JavaScript for the browser.
## Up and Running

### Local Setup
Make sure you have [Node.js] and the [PostgreSQL] installed.
Install the dependencies and devDependencies and start the server.

```sh
git clone https://github.com/superflextech/frontend.gitt # or clone your own fork
cd frontend
npm install # To install NodeJS dependencies.
cd client
npm install #To install AngularJS dependencies.
cd ..
npm run start:dev
```
### Environment Variable setup
```
* export DATABSE_USERNAME="My database username"
* export DATABASE_PASSWORD="My database password"
* export DATABASE_NAME="My database name"
* export DATABASE_HOST="My database host"
* export SECRET="My Secret 64bit"
* export NODE_ENV=production
* export PORT=8000
* export HOST=0.0.0.0
* export EMAIL=example@gmail.com
* export PASSWORD=gmailPassword
```
### Docker Setup

1. pending
2. Build:  cd client ; npm run ng build --prod
3. Migration : ../node_modules/.bin/sequelize db:migrate
4. Check client/src/environment/environment.prod.ts for the backend service

### EC2 Instance

To connect use ssh and a private key file which can be obtained upon request to the project maintainer.

For the development environment use this:
```
ssh -i "SEISMIC-staging.pem" ec2-user@ec2-18-220-95-175.us-east-2.compute.amazonaws.com
```

## REST API

### Test Accounts

**Admin User**
* email: test@SEISMIC.com
* password: password

### Endpoints


| Method 			| URI Pattern                 |
| ------------------| --------------------------- |
| `POST`		    | 	/api/auth/login           | 	
| `POST`		    | 	/api/admins               | 
| `GET`		        | 	/api/admins               |
| `GET`		        | 	/api/admins/:id           | 


### API Flow

To use the SEISMIC API you'll need to first have login to authenticate. You can use one of the test accounts included in the README to skip this step.

#### Create a Session
Using your account credentials you need to create a session to receive a token to authenticate all other API calls. 

Post request to /api/auth/login
```
{
	"email": "some1.email@example.com",
	"password": "password"
}
```

Response
```
{
    "success": true,
    "user": {
        "id": 20,
        "first_name": "John",
        "last_name": "Doe",
        "profile_pic_url": null,
        "user_mode": null,
        "location": null,
        "gender": null,
        "birth_date": null,
        "password": "$2a$10$eKcnjg6J.UdXzO/mwKlfzu.eIp391EDiXEBlO5cHiVAW2IT3Nq",
        "email": "some1.email@example.com",
        "role": 'admin',
        "createdAt": "2017-09-18T14:16:01.983Z",
        "updatedAt": "2017-09-18T14:16:01.983Z"
    },
    "message": "Successfully login.",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZhaXphbkBlbmdpbmV0ZWNoLmlvIidsZLyeicvlVN7eWnLuMuOi5E5y-_TYY"
}
```

To  authenticate all the request you need to set the Authoization header `-H 'authorization: {{token}}'` using your token and send this along with your request.

#### Create User
To create user you need to have authenticated with the token included in an Authentication header.

Post request to `/api/admins/`
```
{
	"first_name": "John",
	"last_name": "Doe",
	"email": "some1.email@example.com",
	"password": "password",
	"role": "role", // ['support' , 'user' , 'admin']
}
```

Response
```
{
    "id": 20,
    "first_name": "John",
    "last_name": "Doe",
    "profile_pic_url": null,
    "user_mode": null,
    "location": null,
    "gender": null,
    "birth_date": null,
    "password": "$2a$10$Ze9c2PFdo6DbYtpyJyZJNutymqI71uhOJkkp5ROcPM.ynbG0dyO",
    "email": "some1.email@example.com",
    "role": "admin",
    "createdAt": "2017-09-22T07:46:19.173Z",
    "updatedAt": "2017-09-22T07:46:19.173Z",
    "functional_movements": []
}
```

#### Create Functional Movement

Post request to `/api/functional_movements`
```
{
    "name": "sinusoid_2",
    "description": "sample sinusoid move 2st"
}
```

Response
```
{
    "id": "7",
    "name": "sinusoid_2",
    "description": "sample sinusoid move 2st",
    "admin_id": 20,
    "updated_timestamp": "2017-09-25T04:15:48.493Z",
    "created_timestamp": "2017-09-25T04:15:48.493Z"
}
```

#### Create Functional Movement Revision


Post request to `/api/functional_movements/7/functional_movement_revisions`
```
{
    "trajectory": "functional_movement:\n  - name: pre_movement_sit2stand\n  - description: “Pre movement sit2stand 09-22-2017”\n  - author: “Melinda”\n  - suit_model: b1\n  - suit_firmware_version: '1.0'\n  - sequence:\n     - value_type: setpoints\n     - time_type: seconds\n     - sequence_type: interval_delta\n     - trajectory:\n          - 0.0: { LEFT_EXTENSOR_M1: 0.0, LEFT_EXTENSOR_M2: -0.0, RIGHT_EXTENSOR_M1: 0.0, RIGHT_EXTENSOR_M2: -0.0 }\n          - 0.05: { LEFT_EXTENSOR_M1: 0.2819767742, LEFT_EXTENSOR_M2: -0.2819767742, RIGHT_EXTENSOR_M1: 0.2819767742, RIGHT_EXTENSOR_M2: -0.2819767742 }\n          - 0.1: { LEFT_EXTENSOR_M1: 1.108790027, LEFT_EXTENSOR_M2: -1.108790027, RIGHT_EXTENSOR_M1: 1.108790027, RIGHT_EXTENSOR_M2: -1.108790027 }\n          - 0.15: { LEFT_EXTENSOR_M1: 2.451764155, LEFT_EXTENSOR_M2: -2.451764155, RIGHT_EXTENSOR_M1: 2.451764155, RIGHT_EXTENSOR_M2: -2.451764155 }\n          - 0.2: { LEFT_EXTENSOR_M1: 4.282223553, LEFT_EXTENSOR_M2: -4.282223553, RIGHT_EXTENSOR_M1: 4.282223553, RIGHT_EXTENSOR_M2: -4.282223553 }\n          - 0.25: { LEFT_EXTENSOR_M1: 6.571492618, LEFT_EXTENSOR_M2: -6.571492618, RIGHT_EXTENSOR_M1: 6.571492618, RIGHT_EXTENSOR_M2: -6.571492618 }\n          - 0.3: { LEFT_EXTENSOR_M1: 9.290895745, LEFT_EXTENSOR_M2: -9.290895745, RIGHT_EXTENSOR_M1: 9.290895745, RIGHT_EXTENSOR_M2: -9.290895745 }\n          - 0.35: { LEFT_EXTENSOR_M1: 12.41175733, LEFT_EXTENSOR_M2: -12.41175733, RIGHT_EXTENSOR_M1: 12.41175733, RIGHT_EXTENSOR_M2: -12.41175733 }\n          - 0.4: { LEFT_EXTENSOR_M1: 15.90540177, LEFT_EXTENSOR_M2: -15.90540177, RIGHT_EXTENSOR_M1: 15.90540177, RIGHT_EXTENSOR_M2: -15.90540177 }\n          - 0.45: { LEFT_EXTENSOR_M1: 19.74315346, LEFT_EXTENSOR_M2: -19.74315346, RIGHT_EXTENSOR_M1: 19.74315346, RIGHT_EXTENSOR_M2: -19.74315346 }\n          - 0.5: { LEFT_EXTENSOR_M1: 23.89633679, LEFT_EXTENSOR_M2: -23.89633679, RIGHT_EXTENSOR_M1: 23.89633679, RIGHT_EXTENSOR_M2: -23.89633679 }\n          - 0.55: { LEFT_EXTENSOR_M1: 28.33627617, LEFT_EXTENSOR_M2: -28.33627617, RIGHT_EXTENSOR_M1: 28.33627617, RIGHT_EXTENSOR_M2: -28.33627617 }\n          - 0.6: { LEFT_EXTENSOR_M1: 33.03429598, LEFT_EXTENSOR_M2: -33.03429598, RIGHT_EXTENSOR_M1: 33.03429598, RIGHT_EXTENSOR_M2: -33.03429598 }\n          - 0.65: { LEFT_EXTENSOR_M1: 37.96172063, LEFT_EXTENSOR_M2: -37.96172063, RIGHT_EXTENSOR_M1: 37.96172063, RIGHT_EXTENSOR_M2: -37.96172063 }\n          - 0.7: { LEFT_EXTENSOR_M1: 43.0898745, LEFT_EXTENSOR_M2: -43.0898745, RIGHT_EXTENSOR_M1: 43.0898745, RIGHT_EXTENSOR_M2: -43.0898745 }\n          - 0.75: { LEFT_EXTENSOR_M1: 48.39008201, LEFT_EXTENSOR_M2: -48.39008201, RIGHT_EXTENSOR_M1: 48.39008201, RIGHT_EXTENSOR_M2: -48.39008201 }\n          - 0.8: { LEFT_EXTENSOR_M1: 53.83366753, LEFT_EXTENSOR_M2: -53.83366753, RIGHT_EXTENSOR_M1: 53.83366753, RIGHT_EXTENSOR_M2: -53.83366753 }\n          - 0.85: { LEFT_EXTENSOR_M1: 59.39195546, LEFT_EXTENSOR_M2: -59.39195546, RIGHT_EXTENSOR_M1: 59.39195546, RIGHT_EXTENSOR_M2: -59.39195546 }\n          - 0.9: { LEFT_EXTENSOR_M1: 65.03627021, LEFT_EXTENSOR_M2: -65.03627021, RIGHT_EXTENSOR_M1: 65.03627021, RIGHT_EXTENSOR_M2: -65.03627021 }\n          - 0.95: { LEFT_EXTENSOR_M1: 70.73793617, LEFT_EXTENSOR_M2: -70.73793617, RIGHT_EXTENSOR_M1: 70.73793617, RIGHT_EXTENSOR_M2: -70.73793617 }\n          - 1.0: { LEFT_EXTENSOR_M1: 76.46827774, LEFT_EXTENSOR_M2: -76.46827774, RIGHT_EXTENSOR_M1: 76.46827774, RIGHT_EXTENSOR_M2: -76.46827774 }\n          - 1.05: { LEFT_EXTENSOR_M1: 82.1986193, LEFT_EXTENSOR_M2: -82.1986193, RIGHT_EXTENSOR_M1: 82.1986193, RIGHT_EXTENSOR_M2: -82.1986193 }\n          - 1.1: { LEFT_EXTENSOR_M1: 87.90028526, LEFT_EXTENSOR_M2: -87.90028526, RIGHT_EXTENSOR_M1: 87.90028526, RIGHT_EXTENSOR_M2: -87.90028526 }\n          - 1.15: { LEFT_EXTENSOR_M1: 93.54460001, LEFT_EXTENSOR_M2: -93.54460001, RIGHT_EXTENSOR_M1: 93.54460001, RIGHT_EXTENSOR_M2: -93.54460001 }\n          - 1.2: { LEFT_EXTENSOR_M1: 99.10288795, LEFT_EXTENSOR_M2: -99.10288795, RIGHT_EXTENSOR_M1: 99.10288795, RIGHT_EXTENSOR_M2: -99.10288795 }\n          - 1.25: { LEFT_EXTENSOR_M1: 104.5464735, LEFT_EXTENSOR_M2: -104.5464735, RIGHT_EXTENSOR_M1: 104.5464735, RIGHT_EXTENSOR_M2: -104.5464735 }\n          - 1.3: { LEFT_EXTENSOR_M1: 109.846681, LEFT_EXTENSOR_M2: -109.846681, RIGHT_EXTENSOR_M1: 109.846681, RIGHT_EXTENSOR_M2: -109.846681 }\n          - 1.35: { LEFT_EXTENSOR_M1: 114.9748348, LEFT_EXTENSOR_M2: -114.9748348, RIGHT_EXTENSOR_M1: 114.9748348, RIGHT_EXTENSOR_M2: -114.9748348 }\n          - 1.4: { LEFT_EXTENSOR_M1: 119.9022595, LEFT_EXTENSOR_M2: -119.9022595, RIGHT_EXTENSOR_M1: 119.9022595, RIGHT_EXTENSOR_M2: -119.9022595 }\n          - 1.45: { LEFT_EXTENSOR_M1: 124.6002793, LEFT_EXTENSOR_M2: -124.6002793, RIGHT_EXTENSOR_M1: 124.6002793, RIGHT_EXTENSOR_M2: -124.6002793 }\n          - 1.5: { LEFT_EXTENSOR_M1: 129.0402187, LEFT_EXTENSOR_M2: -129.0402187, RIGHT_EXTENSOR_M1: 129.0402187, RIGHT_EXTENSOR_M2: -129.0402187 }\n          - 1.55: { LEFT_EXTENSOR_M1: 133.193402, LEFT_EXTENSOR_M2: -133.193402, RIGHT_EXTENSOR_M1: 133.193402, RIGHT_EXTENSOR_M2: -133.193402 }\n          - 1.6: { LEFT_EXTENSOR_M1: 137.0311537, LEFT_EXTENSOR_M2: -137.0311537, RIGHT_EXTENSOR_M1: 137.0311537, RIGHT_EXTENSOR_M2: -137.0311537 }\n          - 1.65: { LEFT_EXTENSOR_M1: 140.5247981, LEFT_EXTENSOR_M2: -140.5247981, RIGHT_EXTENSOR_M1: 140.5247981, RIGHT_EXTENSOR_M2: -140.5247981 }\n          - 1.7: { LEFT_EXTENSOR_M1: 143.6456597, LEFT_EXTENSOR_M2: -143.6456597, RIGHT_EXTENSOR_M1: 143.6456597, RIGHT_EXTENSOR_M2: -143.6456597 }\n          - 1.75: { LEFT_EXTENSOR_M1: 146.3650629, LEFT_EXTENSOR_M2: -146.3650629, RIGHT_EXTENSOR_M1: 146.3650629, RIGHT_EXTENSOR_M2: -146.3650629 }\n          - 1.8: { LEFT_EXTENSOR_M1: 148.6543319, LEFT_EXTENSOR_M2: -148.6543319, RIGHT_EXTENSOR_M1: 148.6543319, RIGHT_EXTENSOR_M2: -148.6543319 }\n          - 1.85: { LEFT_EXTENSOR_M1: 150.4847913, LEFT_EXTENSOR_M2: -150.4847913, RIGHT_EXTENSOR_M1: 150.4847913, RIGHT_EXTENSOR_M2: -150.4847913 }\n          - 1.9: { LEFT_EXTENSOR_M1: 151.8277654, LEFT_EXTENSOR_M2: -151.8277654, RIGHT_EXTENSOR_M1: 151.8277654, RIGHT_EXTENSOR_M2: -151.8277654 }\n          - 1.95: { LEFT_EXTENSOR_M1: 152.6545787, LEFT_EXTENSOR_M2: -152.6545787, RIGHT_EXTENSOR_M1: 152.6545787, RIGHT_EXTENSOR_M2: -152.6545787 }\n          - 2.0: { LEFT_EXTENSOR_M1: 152.9365555, LEFT_EXTENSOR_M2: -152.9365555, RIGHT_EXTENSOR_M1: 152.9365555, RIGHT_EXTENSOR_M2: -152.9365555 }\n"
}
```

Response
```
{
    "id": "7",
    "json": null,
    "trajectory": "functional_movement:\n  - name: pre_movement_sit2stand\n  - description: “Pre movement sit2stand 09-22-2017”\n  - author: “Melinda”\n  - suit_model: b1\n  - suit_firmware_version: '1.0'\n  - sequence:\n     - value_type: setpoints\n     - time_type: seconds\n     - sequence_type: interval_delta\n     - trajectory:\n          - 0.0: { LEFT_EXTENSOR_M1: 0.0, LEFT_EXTENSOR_M2: -0.0, RIGHT_EXTENSOR_M1: 0.0, RIGHT_EXTENSOR_M2: -0.0 }\n          - 0.05: { LEFT_EXTENSOR_M1: 0.2819767742, LEFT_EXTENSOR_M2: -0.2819767742, RIGHT_EXTENSOR_M1: 0.2819767742, RIGHT_EXTENSOR_M2: -0.2819767742 }\n          - 0.1: { LEFT_EXTENSOR_M1: 1.108790027, LEFT_EXTENSOR_M2: -1.108790027, RIGHT_EXTENSOR_M1: 1.108790027, RIGHT_EXTENSOR_M2: -1.108790027 }\n          - 0.15: { LEFT_EXTENSOR_M1: 2.451764155, LEFT_EXTENSOR_M2: -2.451764155, RIGHT_EXTENSOR_M1: 2.451764155, RIGHT_EXTENSOR_M2: -2.451764155 }\n          - 0.2: { LEFT_EXTENSOR_M1: 4.282223553, LEFT_EXTENSOR_M2: -4.282223553, RIGHT_EXTENSOR_M1: 4.282223553, RIGHT_EXTENSOR_M2: -4.282223553 }\n          - 0.25: { LEFT_EXTENSOR_M1: 6.571492618, LEFT_EXTENSOR_M2: -6.571492618, RIGHT_EXTENSOR_M1: 6.571492618, RIGHT_EXTENSOR_M2: -6.571492618 }\n          - 0.3: { LEFT_EXTENSOR_M1: 9.290895745, LEFT_EXTENSOR_M2: -9.290895745, RIGHT_EXTENSOR_M1: 9.290895745, RIGHT_EXTENSOR_M2: -9.290895745 }\n          - 0.35: { LEFT_EXTENSOR_M1: 12.41175733, LEFT_EXTENSOR_M2: -12.41175733, RIGHT_EXTENSOR_M1: 12.41175733, RIGHT_EXTENSOR_M2: -12.41175733 }\n          - 0.4: { LEFT_EXTENSOR_M1: 15.90540177, LEFT_EXTENSOR_M2: -15.90540177, RIGHT_EXTENSOR_M1: 15.90540177, RIGHT_EXTENSOR_M2: -15.90540177 }\n          - 0.45: { LEFT_EXTENSOR_M1: 19.74315346, LEFT_EXTENSOR_M2: -19.74315346, RIGHT_EXTENSOR_M1: 19.74315346, RIGHT_EXTENSOR_M2: -19.74315346 }\n          - 0.5: { LEFT_EXTENSOR_M1: 23.89633679, LEFT_EXTENSOR_M2: -23.89633679, RIGHT_EXTENSOR_M1: 23.89633679, RIGHT_EXTENSOR_M2: -23.89633679 }\n          - 0.55: { LEFT_EXTENSOR_M1: 28.33627617, LEFT_EXTENSOR_M2: -28.33627617, RIGHT_EXTENSOR_M1: 28.33627617, RIGHT_EXTENSOR_M2: -28.33627617 }\n          - 0.6: { LEFT_EXTENSOR_M1: 33.03429598, LEFT_EXTENSOR_M2: -33.03429598, RIGHT_EXTENSOR_M1: 33.03429598, RIGHT_EXTENSOR_M2: -33.03429598 }\n          - 0.65: { LEFT_EXTENSOR_M1: 37.96172063, LEFT_EXTENSOR_M2: -37.96172063, RIGHT_EXTENSOR_M1: 37.96172063, RIGHT_EXTENSOR_M2: -37.96172063 }\n          - 0.7: { LEFT_EXTENSOR_M1: 43.0898745, LEFT_EXTENSOR_M2: -43.0898745, RIGHT_EXTENSOR_M1: 43.0898745, RIGHT_EXTENSOR_M2: -43.0898745 }\n          - 0.75: { LEFT_EXTENSOR_M1: 48.39008201, LEFT_EXTENSOR_M2: -48.39008201, RIGHT_EXTENSOR_M1: 48.39008201, RIGHT_EXTENSOR_M2: -48.39008201 }\n          - 0.8: { LEFT_EXTENSOR_M1: 53.83366753, LEFT_EXTENSOR_M2: -53.83366753, RIGHT_EXTENSOR_M1: 53.83366753, RIGHT_EXTENSOR_M2: -53.83366753 }\n          - 0.85: { LEFT_EXTENSOR_M1: 59.39195546, LEFT_EXTENSOR_M2: -59.39195546, RIGHT_EXTENSOR_M1: 59.39195546, RIGHT_EXTENSOR_M2: -59.39195546 }\n          - 0.9: { LEFT_EXTENSOR_M1: 65.03627021, LEFT_EXTENSOR_M2: -65.03627021, RIGHT_EXTENSOR_M1: 65.03627021, RIGHT_EXTENSOR_M2: -65.03627021 }\n          - 0.95: { LEFT_EXTENSOR_M1: 70.73793617, LEFT_EXTENSOR_M2: -70.73793617, RIGHT_EXTENSOR_M1: 70.73793617, RIGHT_EXTENSOR_M2: -70.73793617 }\n          - 1.0: { LEFT_EXTENSOR_M1: 76.46827774, LEFT_EXTENSOR_M2: -76.46827774, RIGHT_EXTENSOR_M1: 76.46827774, RIGHT_EXTENSOR_M2: -76.46827774 }\n          - 1.05: { LEFT_EXTENSOR_M1: 82.1986193, LEFT_EXTENSOR_M2: -82.1986193, RIGHT_EXTENSOR_M1: 82.1986193, RIGHT_EXTENSOR_M2: -82.1986193 }\n          - 1.1: { LEFT_EXTENSOR_M1: 87.90028526, LEFT_EXTENSOR_M2: -87.90028526, RIGHT_EXTENSOR_M1: 87.90028526, RIGHT_EXTENSOR_M2: -87.90028526 }\n          - 1.15: { LEFT_EXTENSOR_M1: 93.54460001, LEFT_EXTENSOR_M2: -93.54460001, RIGHT_EXTENSOR_M1: 93.54460001, RIGHT_EXTENSOR_M2: -93.54460001 }\n          - 1.2: { LEFT_EXTENSOR_M1: 99.10288795, LEFT_EXTENSOR_M2: -99.10288795, RIGHT_EXTENSOR_M1: 99.10288795, RIGHT_EXTENSOR_M2: -99.10288795 }\n          - 1.25: { LEFT_EXTENSOR_M1: 104.5464735, LEFT_EXTENSOR_M2: -104.5464735, RIGHT_EXTENSOR_M1: 104.5464735, RIGHT_EXTENSOR_M2: -104.5464735 }\n          - 1.3: { LEFT_EXTENSOR_M1: 109.846681, LEFT_EXTENSOR_M2: -109.846681, RIGHT_EXTENSOR_M1: 109.846681, RIGHT_EXTENSOR_M2: -109.846681 }\n          - 1.35: { LEFT_EXTENSOR_M1: 114.9748348, LEFT_EXTENSOR_M2: -114.9748348, RIGHT_EXTENSOR_M1: 114.9748348, RIGHT_EXTENSOR_M2: -114.9748348 }\n          - 1.4: { LEFT_EXTENSOR_M1: 119.9022595, LEFT_EXTENSOR_M2: -119.9022595, RIGHT_EXTENSOR_M1: 119.9022595, RIGHT_EXTENSOR_M2: -119.9022595 }\n          - 1.45: { LEFT_EXTENSOR_M1: 124.6002793, LEFT_EXTENSOR_M2: -124.6002793, RIGHT_EXTENSOR_M1: 124.6002793, RIGHT_EXTENSOR_M2: -124.6002793 }\n          - 1.5: { LEFT_EXTENSOR_M1: 129.0402187, LEFT_EXTENSOR_M2: -129.0402187, RIGHT_EXTENSOR_M1: 129.0402187, RIGHT_EXTENSOR_M2: -129.0402187 }\n          - 1.55: { LEFT_EXTENSOR_M1: 133.193402, LEFT_EXTENSOR_M2: -133.193402, RIGHT_EXTENSOR_M1: 133.193402, RIGHT_EXTENSOR_M2: -133.193402 }\n          - 1.6: { LEFT_EXTENSOR_M1: 137.0311537, LEFT_EXTENSOR_M2: -137.0311537, RIGHT_EXTENSOR_M1: 137.0311537, RIGHT_EXTENSOR_M2: -137.0311537 }\n          - 1.65: { LEFT_EXTENSOR_M1: 140.5247981, LEFT_EXTENSOR_M2: -140.5247981, RIGHT_EXTENSOR_M1: 140.5247981, RIGHT_EXTENSOR_M2: -140.5247981 }\n          - 1.7: { LEFT_EXTENSOR_M1: 143.6456597, LEFT_EXTENSOR_M2: -143.6456597, RIGHT_EXTENSOR_M1: 143.6456597, RIGHT_EXTENSOR_M2: -143.6456597 }\n          - 1.75: { LEFT_EXTENSOR_M1: 146.3650629, LEFT_EXTENSOR_M2: -146.3650629, RIGHT_EXTENSOR_M1: 146.3650629, RIGHT_EXTENSOR_M2: -146.3650629 }\n          - 1.8: { LEFT_EXTENSOR_M1: 148.6543319, LEFT_EXTENSOR_M2: -148.6543319, RIGHT_EXTENSOR_M1: 148.6543319, RIGHT_EXTENSOR_M2: -148.6543319 }\n          - 1.85: { LEFT_EXTENSOR_M1: 150.4847913, LEFT_EXTENSOR_M2: -150.4847913, RIGHT_EXTENSOR_M1: 150.4847913, RIGHT_EXTENSOR_M2: -150.4847913 }\n          - 1.9: { LEFT_EXTENSOR_M1: 151.8277654, LEFT_EXTENSOR_M2: -151.8277654, RIGHT_EXTENSOR_M1: 151.8277654, RIGHT_EXTENSOR_M2: -151.8277654 }\n          - 1.95: { LEFT_EXTENSOR_M1: 152.6545787, LEFT_EXTENSOR_M2: -152.6545787, RIGHT_EXTENSOR_M1: 152.6545787, RIGHT_EXTENSOR_M2: -152.6545787 }\n          - 2.0: { LEFT_EXTENSOR_M1: 152.9365555, LEFT_EXTENSOR_M2: -152.9365555, RIGHT_EXTENSOR_M1: 152.9365555, RIGHT_EXTENSOR_M2: -152.9365555 }\n",
    "functional_movement_id": "7",
    "updated_timestamp": "2017-09-25T04:20:29.836Z",
    "created_timestamp": "2017-09-25T04:20:29.836Z",
    "revision_number": 7,
    "suit_id": null,
    "suit_firmware_version_id": null
}
    
```


## Contributing
1. Fork it!
2. Create your feature branch: git checkout -b my-new-feature
3. Commit your changes: git commit -am 'Add some feature'
4. Push to the branch: git push origin my-new-feature
5. Submit a pull request!



   [git-repo-url]: <https://github.com/superflextech/frontend.git>
   [Sequelize]: <http://docs.sequelizejs.com>
   [Code Mirror]: <https://codemirror.net>
   [node.js]: <http://nodejs.org>
   [PostgreSQL]: <https://www.postgresql.org>
   [jQuery]: <http://jquery.com>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>

const version = require('../../../package.json').version;
export const environment = {
  production: true,
  backendUrl: 'http://ec2-18-220-95-175.us-east-2.compute.amazonaws.com:8000/api/admin',
  version: version,
  fileStackAPIKey: 'A4zJ11NhZSZOLUxacxGJCz',
  pusherAPIKey: '1dd7560a110bc8cfa0c6'
};

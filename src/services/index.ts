import UserService from "./UserService";
import LocalService from "./LocalService";
const services = {
  UserService,
  LocalService
};

global.services = services;
export default services;
export { UserService, LocalService };

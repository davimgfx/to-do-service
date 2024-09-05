import * as createUser from "./CreateUser"
import * as signIn  from "./SignIn"

export const userController = {
    ...createUser,
    ...signIn
}

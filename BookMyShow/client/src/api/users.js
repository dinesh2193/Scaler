import { axiosInstance } from "./index";

// Register new user
export const RegisterUser = async (value) => {
    try {
        const response = await axiosInstance.post('/api/users/register', value)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// Login user
export const LoginUser = async (value) => {
    try {
        const response = await axiosInstance.post('/api/users/login', value)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const GetCurrentUser = async () => {
    try {
        const response = await axiosInstance.get('/api/users/get-current-user')
        return response.data
    } catch (error) {
        console.log(error)
    }
}

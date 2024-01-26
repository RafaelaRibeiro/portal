import axiosInstance from './axios'

const usersService = {
  async findOne(id) {
    try {
      const response = await axiosInstance.get(`/users/${id}`)
      return response.data
    } catch (error) {
      console.error('An error occurred while fetching users:', error)
    }
  },
}

export default usersService

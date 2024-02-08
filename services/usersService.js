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

  async updatePassword(id, password, newPassword, passwordConfirm) {
    try {
      const response = await axiosInstance.put(`/users/${id}/change-password`, {
        password,
        newPassword,
        passwordConfirm,
      })

      return response.data
    } catch (error) {
      console.log('Deu ruim!')
      throw error
    }
  },
  async updateUser(id, name, email, fone, extension, mobile, whatsapp) {
    try {
      const responde = await axiosInstance.put(`/users/${id}}`, {
        name,
        email,
        fone,
        extension,
        mobile,
        whatsapp,
      })

      return responde.data
    } catch (error) {}
  },
}

export default usersService

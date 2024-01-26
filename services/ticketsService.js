import axiosInstance from './axios'

const ticketsService = {
  async findOne(id) {
    try {
      const response = await axiosInstance.get(`/tickets/${id}`)
      return response.data
    } catch (error) {
      console.error('An error occurred while fetching tickets:', error)
    }
  },

  async getApprovers(clientId) {
    try {
      const response = await axiosInstance.get(`/clients/${clientId}/approvers`)
      return response.data
    } catch (error) {
      console.error('An error occurred while fetching approvers:', error)
    }
  },

  async createTicket(ticketData) {
    try {
      const response = await axiosInstance.post('/tickets', ticketData)
      return response.data
    } catch (error) {
      console.error('An error occurred while creating a ticket:', error)
    }
  },

  async uploadFile(ticketContentId, formData) {
    try {
      await axiosInstance.post(`/files/${ticketContentId}/upload`, formData)
    } catch (error) {
      console.error('An error occurred while uploading a file:', error)
    }
  },

  async update(id, data) {
    try {
      await axiosInstance.put(`/tickets/${id}/`, data)
    } catch (error) {
      console.error('An error occurred while uploading a file:', error)
    }
  },

  async approveById(id) {
    try {
      await axiosInstance.patch(`/tickets/${id}/approval`)
    } catch (error) {
      console.log(error)
    }
  },
  async disapproveById(id) {
    try {
      await axiosInstance.patch(`/tickets/${id}/disapprove`)
    } catch (error) {
      console.log(error)
    }
  },
}

export default ticketsService

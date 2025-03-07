import prisma from '../db'

export class UserService {
  async createUser(data: {
    name: string, 
    email: string, 
    password: string
  }) {
    return prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: data.password
      }
    })
  }

  async getUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email }
    })
  }

  async getAllUsers() {
    return prisma.user.findMany()
  }

  async getUserById(id: number) {
    return prisma.user.findUnique({
      where: { id }
    })
  }
}
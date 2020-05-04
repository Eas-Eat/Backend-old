import bcrypt from 'bcryptjs'

export async function createPassword(password: string): Promise<string> {
  const hash = await bcrypt.hash(password, 8)

  if (!hash) {
    throw new Error("Can't generated new password hash.")
  }

  return hash
}

export async function verifyPassword(password: string, encryptedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, encryptedPassword)
}

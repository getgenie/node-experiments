import crypto from 'crypto'

export const encrypt = (fileBuffer, password) => {
    const salt = crypto.randomBytes(16)
    const iv = crypto.randomBytes(16)
    const key = crypto.pbkdf2Sync(password, salt, 100000, 256 / 8, 'sha256')
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
    
    cipher.write(fileBuffer)
    cipher.end()

    const encrypted = cipher.read()

    return {
        encrypted: Buffer.concat([salt, iv, encrypted]),
        authTag:cipher.getAuthTag()
    }
}

export const decrypt = (encrypted, password, getAuthTag) => {
    const saltLen = 16
    const ivLen = 16
    console.log("key d", encrypted);
    const salt = encrypted.slice(0, saltLen)
    const iv = encrypted.slice(0 + saltLen, saltLen + ivLen)
    const key = crypto.pbkdf2Sync(password, salt, 100000, 256 / 8, 'sha256')
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv)
    decipher.setAuthTag(getAuthTag)
    decipher.write(encrypted.slice(saltLen + ivLen))
    decipher.end()

    const decrypted = decipher.read()

    return decrypted
}
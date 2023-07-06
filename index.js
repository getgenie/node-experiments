import { encrypt, decrypt } from "./crypto.js";
import {promises as fs} from 'fs'

const password = 'password'
const file = await fs.readFile('./Chipmunk.mp4')
const encrypted = encrypt(file, password)
const decrypted = decrypt(encrypted.encrypted, password, encrypted.authTag)
fs.writeFile('./test1-1.mp4', encrypted.encrypted)
fs.writeFile('./test1.mp4', decrypted)
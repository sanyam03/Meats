import { compare, hash } from "bcrypt"

const hashRounds = 10

export async function createHash(normalString: string) {
	return await hash(normalString, hashRounds)
}

export async function verifyHash(normalString: string, hashedString: string) {
	return await compare(normalString, hashedString)
}

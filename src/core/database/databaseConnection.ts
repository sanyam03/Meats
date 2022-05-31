import { Connection, createConnection } from "typeorm"
import ormConfig from "./ormconfig"

var _connection: Connection | undefined

export async function connectDatabase() {
	_connection = await createConnection(ormConfig)
}

export function isDatabaseConnected() {
	return _connection !== undefined
}

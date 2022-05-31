import _ from "lodash"
import { QueryRunner, getConnection } from "typeorm"

export class DatabaseSession {
	protected queryRunner: QueryRunner
	private isSessionInitiatedHere: boolean = false

	constructor(existingSession?: DatabaseSession) {
		this.queryRunner = existingSession?.queryRunner ?? this.createQueryRunner()
	}

	get runner(): QueryRunner {
		return this.queryRunner
	}

	private createQueryRunner(): QueryRunner {
		const connection = getConnection()
		this.isSessionInitiatedHere = true
		return connection.createQueryRunner()
	}

	async withTransaction<T>(serviceFunction: (runner: QueryRunner) => Promise<T>) {
		try {
			await this.startTransaction()
			const result = await serviceFunction(this.queryRunner)
			await this.commitTransaction()
			return result
		} catch (err) {
			await this.rollbackTransaction()
			throw err
		} finally {
			await this.release()
		}
	}

	private async startTransaction() {
		if (this.isSessionInitiatedHere && !this.queryRunner.isTransactionActive) {
			await this.queryRunner.startTransaction()
		}
	}

	private async commitTransaction() {
		if (this.isSessionInitiatedHere && this.queryRunner.isTransactionActive) {
			await this.queryRunner.commitTransaction()
		}
	}

	private async rollbackTransaction() {
		if (this.isSessionInitiatedHere && this.queryRunner.isTransactionActive) {
			await this.queryRunner.rollbackTransaction()
		}
	}

	private async release() {
		if (this.isSessionInitiatedHere && !this.queryRunner.isReleased) {
			await this.queryRunner.release()
		}
	}
}

export function getDbSession(existingSession?: DatabaseSession): DatabaseSession {
	return new DatabaseSession(existingSession)
}

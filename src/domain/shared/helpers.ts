import { UnprocessableEntityError } from "@core/http"
import { EntityTarget, QueryRunner } from "typeorm"
import { BaseEntity } from "./BaseEntity"

export async function findOneByIdOrThrow<Entity extends BaseEntity<any>>(
	runner: QueryRunner,
	{
		entity,
		id,
		errorMessage,
	}: { entity: EntityTarget<Entity>; id: Entity["id"]; errorMessage: string },
): Promise<Entity> {
	const el = await runner.manager.findOneOrFail(entity, id)
	if (!el) throw new UnprocessableEntityError(errorMessage)
	return el
}

import { UnprocessableEntityError } from "http-rest-api"
import { Entity, EntityTarget, QueryRunner } from "typeorm"
import { BaseEntity } from "./BaseEntity"

export async function getOneByIdOrThrow<Entity extends BaseEntity<any>>(
	runner: QueryRunner,
	{
		entity,
		id,
		errorMessage,
	}: { entity: EntityTarget<Entity>; id: Entity["id"]; errorMessage?: string },
): Promise<Entity> {
	const el = await runner.manager.findOneOrFail(entity, id)
	if (!el)
		throw new UnprocessableEntityError(errorMessage || `${Entity().name} not found`)
	return el
}

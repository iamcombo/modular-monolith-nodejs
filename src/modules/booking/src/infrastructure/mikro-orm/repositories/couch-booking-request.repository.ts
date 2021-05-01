import { MikroOrmRepository, MikroOrmRepositoryDependencies } from "@travelhoop/infrastructure";
import { AggregateId } from "@travelhoop/shared-kernel";
import { CouchBookingRequestRepository, CouchBookingRequest, CouchBookingRequestProps } from "../../../domain";
import { bookableCouchEntitySchema } from "../entity-schemas/bookable-couch.entity";

export class MikroOrmCouchBookingRequestRepository
  extends MikroOrmRepository<CouchBookingRequest, CouchBookingRequestProps>
  implements CouchBookingRequestRepository {
  constructor({ dbConnection }: MikroOrmRepositoryDependencies) {
    super({ dbConnection, entitySchema: bookableCouchEntitySchema });
  }

  async get(id: AggregateId) {
    return (this.repo.findOneOrFail({ id }) as unknown) as CouchBookingRequest;
  }

  async add(couchBookingRequest: CouchBookingRequest) {
    await this.repo.persistAndFlush(couchBookingRequest);
  }
}
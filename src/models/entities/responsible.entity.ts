import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export default class TicketResponsible {
    @PrimaryColumn()
    responsibleUser!: number;

    @PrimaryColumn()
    responsibleTicket!: number;
};

// TicketResponsible.belongsTo(userModel, { foreignKey: 'responsibleUser' });
// TicketResponsible.belongsTo(ticketModel, { foreignKey: 'responsibleTicket' });

import { Pipe, PipeTransform } from '@angular/core';
import { Ticket } from '../common-types/ticket';

@Pipe({
  name: 'ticketHasStatus'
})
export class TicketStatusPipe implements PipeTransform {

  transform(tickets: Ticket[], ...args: boolean[]): Ticket[] {
    return tickets.filter((t) => t.isOpened === args[0])
  }

}

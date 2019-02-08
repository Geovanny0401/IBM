import { Cliente } from './cliente';
import { DetalleConsumo } from './detalleConsumo';

export class Tarjeta{
    public idTarjeta: number;
    public ccv: string;
    public numtarjeta: number;
    public tiptarjeta: string;
    public cliente: Cliente;
    public detalleConsumo: DetalleConsumo[];
} 
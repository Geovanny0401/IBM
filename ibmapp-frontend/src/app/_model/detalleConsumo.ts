import { Tarjeta } from './tarjeta';
export class DetalleConsumo
{
    public idDetalleConsumo: number;
    public descripcion: string;
    public fecha: string;
    public monto: number;
    public tarjeta: Tarjeta;
}
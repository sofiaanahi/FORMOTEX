import Equipo from "../models/Equipo";
import { IEquipo, InterfazEquiposInfo } from "../interfaces/interfacesEquipo";

class EquipoServices {
    async createEquipo(data: InterfazEquiposInfo): Promise<IEquipo> {
        try {
            const equipo = await Equipo.create(data);
            return equipo;
        } catch (error) {
            throw new Error('Error al crear el equipo')
        }
  }
}
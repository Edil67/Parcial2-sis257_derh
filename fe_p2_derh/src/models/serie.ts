import type { Pais } from "./pais"

export interface Serie {
  id: number
  titulo: string
  sinopsis: string
  director: string
  temporadas: number
  fecha_estreno: Date
  pais: Pais
  id_pais: number
}

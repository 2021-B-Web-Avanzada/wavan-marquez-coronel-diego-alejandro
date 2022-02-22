export interface ProductInterface {
  _id?: string,
  nombre: string,
  marca: string,
  unidad: number,
  fechaAdquisicion: string,
  precio: number,
  // Store
  storeID: string,
}

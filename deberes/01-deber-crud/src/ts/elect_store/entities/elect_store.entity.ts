import Elect_Product from "../../elect_product/entities/elect_product.entity";

type LocationStores = "QUITO" | "GUAYAQUIL" | "CUENCA" | "IBARRA" |
    "ESMERALDAS" | "LOJA" | "PUYO" | "MANTA"

export default interface ElectStore {
    id: number
    location : string
    responsable : string
    products: Elect_Product[]
    openingHour: Date
}
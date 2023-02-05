export default interface PublicationType {
    id: string;
    name: string;
    type: "Livro" | "Poema" | "Conselho" | "Reflexão";
    imageUrl: string;
    fileUrl: string;
}
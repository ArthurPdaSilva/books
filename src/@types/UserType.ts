import PublicationType from "./PublicationType";

export default interface UserType {
    uid: string;
    name: string;
    email: string;
    avatarUrl?: string;
    publications: PublicationType[];
    likePosts: String[];
}
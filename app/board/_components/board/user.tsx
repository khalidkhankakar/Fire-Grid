
import Tip from "@/components/shared/tip";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
interface UserProps {
    src?: string;
    name?: string;
    fallback?: string;
    borderColor?: string;
}
const User = ({ src, name, borderColor }: UserProps) => {
    return (
        <Tip label={name || "Teammate"} side='bottom' >
            <Avatar style={{ border: `2px solid ${borderColor}`, cursor: 'pointer' }}>
                <AvatarImage src={src} />
                <AvatarFallback>{name![0] || 'T'}</AvatarFallback>
            </Avatar>
        </Tip>
    )
}

export default User

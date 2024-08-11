import CollaborativeRoom from "@/components/CollaborativeRoom"
import { getDocument } from "@/lib/actions/room.actions";
import { getClerkUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";

const Document = async ({ params: { id } }: SearchParamProps) => {
    const clerkUser = await currentUser();
    if (!clerkUser) redirect('/sign-in');

    const room = await getDocument({
        roomId: id,
        userId: clerkUser.emailAddresses[0].emailAddress,
    });

    if (!room) redirect('/');

    const userIds = Object.keys(room.usersAccesses);
    const users = await getClerkUsers({ userIds });
    console.log(userIds)
    const usersData = users.map((user: User | null | undefined) => {
        if (!user) {
            console.error('Encountered null or undefined user:', user);
            return {
                userType: 'viewer', // Or some default value
            };
        }

        // Proceed only if user is valid
        const email = user.email || '';
        const accessList = room.usersAccesses?.[email] || [];

        const userType = accessList.includes('room:write')
            ? 'editor'
            : 'viewer';

        return {
            ...user,
            userType
        };
    });

    const currentUserType = room.usersAccesses[clerkUser.emailAddresses[0].emailAddress]?.includes('room:write') ? 'editor' : 'viewer';

    return (
        <main className="flex w-full flex-col items-center">
            <CollaborativeRoom
                roomId={id}
                roomMetadata={room.metadata}
                users={usersData}
                currentUserType={currentUserType}
            />
        </main>
    )
}

export default Document
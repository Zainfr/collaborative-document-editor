import { useOthers } from '@liveblocks/react/suspense'
import Image from 'next/image';
import React from 'react'

const ActiveCollaborators = () => {

    const others = useOthers();
    const collaborators = others.map((other) => other.info)

    return (
        <div>
            <ul className='collaborators-list'>
                {collaborators.map(({ id, avatar, color, name }) => (
                    <li key={id}>
                        <Image
                            src={avatar}
                            alt='user'
                            width={100}
                            height={100}
                            className='inline-block rounded-full size-8 ring-2 ring-dark-100'
                            style={{ border: `3px solid ${color}` }}
                        />

                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ActiveCollaborators
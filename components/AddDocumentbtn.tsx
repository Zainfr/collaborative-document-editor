'use client';

import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { createDocument } from '@/lib/actions/room.actions';

const AddDocumentbtn = ({ userId, email }: AddDocumentBtnProps) => {

    const router = useRouter();

    const addDocumentHandler = async () => {
        try {
            const room = await createDocument({ userId, email });

            if (room) {
                router.push(`/documents/${room.id}`)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Button type='submit' onClick={addDocumentHandler} className='gradient-blue flex gap-1 shadow-sm'>
            <Image
                src='/assets/icons/add.svg' alt='add' width={24} height={24}
            />
            <p className='hidden sm:block'>Create a Blank Document</p>
        </Button>
    )
}

export default AddDocumentbtn
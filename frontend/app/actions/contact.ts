'use server'

import { postContact } from '@/api/api'
import { postContactProps } from '@/api/types'

export async function sendContactAction(formData: FormData) {
    const contactData = {
        full_name: String(formData.get('name') ?? ''),
        phone_number: String(formData.get('phone') ?? ''),
        email: String(formData.get('email') ?? ''),
        services: String(formData.get('service') ?? '') as postContactProps['services'],
        description: String(formData.get('message') ?? ''),
    }

    try {
        await postContact(contactData)
    } catch (err) {
        console.error('Error sending contact: ', err)
    }
}

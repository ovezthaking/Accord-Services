'use server'

import { postContact } from '@/api/api'
import { postContactProps } from '@/api/types'

export type ContactActionState = {
    ok: boolean
    message: string
}

export async function sendContactAction(
    _prevState: ContactActionState,
    formData: FormData
): Promise<ContactActionState> {
    const contactData = {
        full_name: String(formData.get('name') ?? ''),
        phone_number: String(formData.get('phone') ?? ''),
        email: String(formData.get('email') ?? ''),
        services: String(formData.get('service') ?? '') as postContactProps['services'],
        description: String(formData.get('message') ?? ''),
    }

    try {
        const result = await postContact(contactData)

        if (!result) {
            return {
                ok: false,
                message: 'Coś poszło nie tak...'
            }
        }

        return {
            ok: true,
            message: 'Dziękujemy, odezwiemy się wkrótce'
        }
    } catch (err) {
        console.error('Error sending contact: ', err)
        return {
            ok: false,
            message: 'Coś poszło nie tak...'
        }
    }
}

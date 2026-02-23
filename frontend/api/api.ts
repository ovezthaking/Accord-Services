import { postContactProps } from "./types";

export const postContact = async (
    { full_name, phone_number, email, services, description }: postContactProps
): Promise<any> => {
    try {
        const res = await fetch('http://localhost:8000/api/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                full_name,
                phone_number,
                email,
                services,
                description
            })
        })

        if (!res.ok) {
            throw new Error(`Error fetching post contact request, status: ${res.status}`)
        }

        const data = await res.json()
        return data
        
    } catch (err) {
        console.error('Fetch POST contact request failed: ', err)
        return null
    }
}

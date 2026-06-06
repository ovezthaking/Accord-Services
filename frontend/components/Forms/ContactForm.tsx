"use client"

import { useActionState, useEffect, useRef } from "react"
import { sendContactAction, type ContactActionState } from "@/app/actions/contact"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { Send } from "lucide-react"
import { toast } from "@/hooks/use-toast"

const initialState: ContactActionState = {
    ok: false,
    message: ''
}

export default function ContactForm() {
    const [state, formAction] = useActionState(sendContactAction, initialState)
    const lastMessageRef = useRef('')

    useEffect(() => {
        if (!state.message || state.message === lastMessageRef.current) {
            return
        }

        lastMessageRef.current = state.message

        if (state.ok) {
            toast({
                title: 'Wysłano',
                description: state.message
            })
            return
        }

        toast({
            title: 'Przepraszamy',
            description: state.message
        })
    }, [state])

    return (
        <form
            action={formAction}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8"
        >
            <h3 className="mb-6 text-xl font-bold text-foreground">Wyślij zapytanie</h3>
            <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">Imię i nazwisko</Label>
                    <Input id="name" name="name" placeholder="Jan Kowalski" className="bg-background text-foreground" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground">Telefon</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="601 234 567" className="bg-background text-foreground" required/>
                </div>
                <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="email" className="text-foreground">E-mail</Label>
                    <Input id="email" name="email" type="email" placeholder="jan@email.com" className="bg-background text-foreground" required />
                </div>
                <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="service" className="text-foreground">Usługa</Label>
                    <select
                        id="service"
                        name="service"
                        defaultValue=''
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        required
                    >
                        <option value='' disabled>Wybierz usługę...</option>
                        <option value="pompy">Pompy ciepła</option>
                        <option value="klimatyzacja">Klimatyzacja</option>
                        <option value="rekuperacja">Rekuperacja</option>
                        <option value="fotowoltaika">Fotowoltaika</option>
                        <option value="serwis">Serwis</option>
                    </select>
                </div>
                <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="message" className="text-foreground">Wiadomość</Label>
                    <Textarea id="message" name="message" placeholder="Opisz swoje potrzeby..." rows={4} className="bg-background text-foreground" />
                </div>
            </div>
            <Button
                type="submit"
                size='lg'
                className="mt-6 w-full bg-accent text-accent-foreground hover:bg-accent/90"
            >
                <Send className="mr-2 h-4 w-4" />
                Chcę darmową wycenę
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
                Odpowiadamy w ciągu 24 godzin.
            </p>
        </form>
    )
}

import { connect, Email } from 'node-mailjet'

interface Variable {
    [key: string]: string
}

interface Recipient {
    Email: string
    Vars?: Variable
}

interface Response extends Email.Response {
    [key: string]: any
}

export function sendEmailWithTemplate(
    Recipients: Array<Recipient>,
    templateId: number
): Promise<Response> {
    const { MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE } = process.env
    const mailjet = connect (
        MJ_APIKEY_PUBLIC as string,
        MJ_APIKEY_PRIVATE as string
    )
    return mailjet.post('send', {version: 'v3'}).request({
        FromEmail: 'easeat.efrei@gmail.com',
        Recipients,
        'Mj-TemplateID': templateId,
        'Mj-TemplateLanguage': true
    }) as Promise<Response>
}
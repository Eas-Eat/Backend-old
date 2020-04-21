import { sendEmailWithTemplate } from '../../libs/Mailjet'

describe('sendEmailWithTemplate(Recipients: Array<Recipient>, templateId: number): Promise<Email.Response>', () => {
  it('It should send an email to recipients', async () => {
    const recipients = [{ Email: 'dds1991@hotmail.fr' }]

    const result = await sendEmailWithTemplate(recipients, 0)

    expect(result.response.status).toEqual(200)
  })

  it("It should throw an Error: 'Unsuccessful: 401 Unauthorized' when no API KEYS in process.env", async () => {
    process.env.MJ_APIKEY_PRIVATE = ''
    process.env.MJ_APIKEY_PUBLIC = ''

    const recipients = [{ Email: 'dds1991@hotmail.fr' }]
    sendEmailWithTemplate(recipients, 0).catch((e) => {
      expect(e).toEqual(new Error('Unsuccessful: 401 Unauthorized'))
    })
  })
})

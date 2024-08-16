import { createTransport } from "../config/nodemailer.js";

export async function sendEmailNew({date, time}){
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS
    )

     // Enviar el email
     const info = await transporter.sendMail({
        from: 'AppSalon <citas@appsalon.com>',
        to: 'admin@admin.com',
        subject: "AppSalon - Nueva Cita",
        text: "AppSalon - Nueva Cita",
        html: `<p>Hola: Admin, tienes una nueva cita</p>
            <p>La cita sera el dia: ${date} a las ${time} horas.</p>
        `
    })

    console.log('Mensaje enviado', info.messageId)
}

export async function sendEmailUpdate({date, time}){
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS
    )

     // Enviar el email
     const info = await transporter.sendMail({
        from: 'AppSalon <citas@appsalon.com>',
        to: 'admin@admin.com',
        subject: "AppSalon - Cita Actualizada",
        text: "AppSalon - Cita Actualizada",
        html: `<p>Hola: Admin, un usuario ha modificado una cita.</p>
            <p>La nueva cita sera el dia: ${date} a las ${time} horas.</p>
        `
    })

    console.log('Mensaje enviado', info.messageId)
}

export async function sendEmailCancel({date, time}){
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS
    )

     // Enviar el email
     const info = await transporter.sendMail({
        from: 'AppSalon <citas@appsalon.com>',
        to: 'admin@admin.com',
        subject: "AppSalon - Cita Cancelada",
        text: "AppSalon - Cita Cancelada",
        html: `<p>Hola: Admin, un usuario ha cancelado una cita.</p>
            <p>La cita era el dia: ${date} a las ${time} horas.</p>
        `
    })

    console.log('Mensaje enviado', info.messageId)
}
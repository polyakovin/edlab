const nodemailer = require('nodemailer');

const config = {
  service: process.env.MAILER_SERVICE || sails.config.mail.MAILER_SERVICE || 'Outlook365',
  auth: {
    user: process.env.MAILER_EMAIL || sails.config.mail.MAILER_EMAIL,
    pass: process.env.MAILER_PASS || sails.config.mail.MAILER_PASS
  }
}

const adminEmails = process.env.ADMIN_EMAILS || sails.config.mail.ADMIN_EMAILS;
const signiture = `
<p>
  С уважением,<br>
  Команда edlabs
</p>
`;

let transporter = nodemailer.createTransport(config);

const emailGenerator = (to, subject, letter) => {
  let mailOptions = {
    from: config.auth.user,
    to: to,
    subject: subject,
    html: letter
  };

  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) return sails.log.error(error);

    sails.log.info(`E-mail "${subject}" => ${to}`);
    sails.log.info(`Details: ${info.response}`);
  });
};

const mailTypes = {
  sendInfoMailToAdmin: (data, mailType) => {
    data.email = adminEmails;
    mailTypes[mailType](data);
  },

  sendInfoMailToUser: async (id, mailType) => {
    const user = await User.findOne({id: id});
    mailTypes[mailType](user);
  },

  signUpPupil: (user) => {
    const link = `http://${user.hostName}/confirm-email-pupil?email=${user.email}&token=${user.emailToken}`;

    emailGenerator(
      user.email,
      'Регистранция на платформе edlabs',
      `
        <p>Приветствуем, ${user.familyName} ${user.firstName} ${user.patroName}!</p>
        <p>
          Ты уже совсем близко к тому, чтобы стать участником сообщества edlabs.
          В ближайшее время мы свяжемся с Вами и предложим наиболее удобный вариант подготовки по выбранному предмету для поступления в ВУЗ мечты.
        </p>
      `
    );
  },

  signUpTeacher: (user) => {
    const link = `http://${user.hostName}/confirm-email-teacher?email=${user.email}&token=${user.emailToken}`;

    emailGenerator(
      user.email,
      'Подтверждение e-mail',
      `
        <p>Привет!</p>
        <p>Спасибо за интерес к проекту edlabs.</p>

        <p>Если вы получили это сообщение по ошибке, пожалуйста, проигнорируйте его.</p>

        ${signiture}
      `
    );
  },


  registered: (user) => {
    emailGenerator(
      user.email,
      'Добро пожаловать на платформу!',
      `
        <p>Привет!</p>
        <p>
          Регистрация прошла успешно.
          Добро пожаловать на платформу!
        </p>

        ${signiture}
      `
    );
  },


  forgotPassword: (user) => {
    const link = `http://${user.hostName}/forgotPassword?email=${user.email}&token=${user.emailToken}`;

    emailGenerator(
      user.email,
      'Сброс пароля',
      `
        <p>
          Привет!
        </p>

        <p>
          Нам пришёл запрос на сброс пароля на платформе.

          <a href="${link}">Сбросить пароль</a>
        </p>

        <p>
          Если вы не собирались сбрасывать пароль, то просто проигнорируйте это письмо.
        </p>

        ${signiture}
      `
    );
  },


  feedback: (feedback) => {
    emailGenerator(
      adminEmails,
      'Обратная связь от ' + feedback.email,
      `
        <p>
          ${feedback.message}
        </p>
        <p>
          Системная информация пользователя: ${feedback.userAgent}
        </p>
      `
    );
  }
}

module.exports = mailTypes;
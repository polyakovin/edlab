// const nodemailer = require('nodemailer');

// const config = {
//   service: process.env.MAILER_SERVICE || sails.config.mail.MAILER_SERVICE || 'Outlook365',
//   auth: {
//     user: process.env.MAILER_EMAIL || sails.config.mail.MAILER_EMAIL,
//     pass: process.env.MAILER_PASS || sails.config.mail.MAILER_PASS
//   }
// }

// adminEmails = 'noggatur@ya.ru';

// let transporter = nodemailer.createTransport(config);

// const emailGenerator = (to, subject, letter) => {
//   let mailOptions = {
//     from: '"Emotion Miner" <info@emotionminer.com>',
//     to: to,
//     subject: subject,
//     html: letter
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       sails.log.error(error);
//     } else {
//       sails.log.info(`E-mail "${subject}" => ${to}`);
//       sails.log.info(`Details: ${info.response}`);

//       EmailLogs.create({
//         email: to,
//         subject: subject
//       }, (error, number) => {
//         if (error) {
//           sails.log.error(error);
//         }
//       });
//     }
//   });
// };

// const mailTypes = {
//   sendInfoMailToAdmin: (data, mailType) => {
//     data.email = adminEmails;
//     mailTypes[mailType](data);
//   },

//   sendInfoMailToAID: (AID, mailType, user = {}) => {
//     // достаём данные пользователя
//     AnnotatorProfile.findOne({
//       AID: AID
//     }).populate('AID').exec((error, profile) => {
//       if (error) {
//         sails.log.error(error);
//       } else {
//         user.email = profile.AID.email;

//         // вынимаем имя пользователя
//         const name = profile.name.split(',');
//         if (name.length === 1) {
//           user.firstName = name;
//         } else if (name.length === 2) {
//           user.firstName = name[1].slice(1);
//         }

//         // отправляем письмо
//         mailTypes[mailType](user);
//       }
//     });
//   },

//   signUp: (user) => {
//     const link = `http://${user.hostName}/annotators/confirmEmail?email=${user.email}&token=${user.emailToken}`;

//     emailGenerator(
//       user.email,
//       'E-mail confirmation',
//       `
//         <p>Dear ${user.firstName} ${user.secondName}!</p>
//         <p>Thanks for your registration in Emotion Miner video annotation service.</p>
//         <p>
//           To complete the process and confirm your email, please click the link below.<br>
//           <a href="${link}">${link}</a>
//         </p>
//         <p>If you received this email by mistake, please feel free to ignore and delete it.</p>

//         <p>
//           Best regards,<br>
//           Emotion Miner Team
//         </p>
//       `
//     );
//   },


//   registered: (user) => {
//     emailGenerator(
//       user.email,
//       'Welcome to Emotion Miner annotation service!',
//       `
//         <p>
//           Hi ${user.firstName}, welcome to Emotion Miner annotation service!
//           You've signed up successfully!
//         </p>

//         <p>
//           Making money is quite simple!}
//           <ol>
//             <li>
//               Go to your user profile "My_profile"
//             </li>
//             <li>
//               Fill in the form
//             </li>
//             <li>
//               Complete Demo Task and earn your first money on Emotion Miner!
//             </li>
//           </ol>
//         </p>

//         <p>
//           Find answers to frequently asked questions (please visit FAQ) or contact us.
//         </p>

//         <p>
//           Best regards,<br>
//           Emotion Miner Team
//         </p>
//       `
//     );
//   },


//   feedback: (feedback) => {
//     emailGenerator(
//       adminEmails,
//       'Feedback from ' + feedback.email,
//       `
//         <p>
//           Dear Mr. Admin,
//         </p>
//         <p>
//           The user <strong>${feedback.name}</strong> with email <strong>${feedback.email}</strong> (${feedback.AID ? feedback.AID : 'not authorized'}) has sent you the following message:
//         </p>
//         <p>
//           ${feedback.message}
//         </p>
//         <p>
//           The user's system information is: ${feedback.userAgent}
//         </p>
//       `
//     );
//   },


//   forgotPassword: (user) => {
//     const link = `http://${user.hostName}/annotators/forgotPassword?email=${user.email}&token=${user.emailToken}`;

//     emailGenerator(
//       user.email,
//       'Password reset request for Emotion Miner video annotation service',
//       `
//         <p>
//           Hi, ${user.firstName}!
//         </p>

//         <p>
//           We’ve just received a password reset request for Emotion Miner.
//           Please click here to reset your password:
//           <a href="${link}">${link}</a>
//         </p>

//         <p>
//           Best regards,<br>
//           Emotion Miner Team
//         </p>
//       `
//     );
//   },


//   deadlineAlert: (user) => {
//     emailGenerator(
//       user.email,
//       `${user.daysLeft} days before Standard Task deadline`,
//       `
//         <p>
//           Hi, ${user.firstName}!
//         </p>

//         <p>
//           Please consider that your Task deadline is <strong>${user.deadline}</strong>! You still have <strong>${user.daysLeft}</strong> days to complete your Task!
//         </p>

//         <p>
//           <a href="https://emotionminer.com">Go to my task</a>.
//         </p>

//         <p>
//           Best regards,<br>
//           Emotion Miner Team
//         </p>
//       `
//     );
//   },


//   deadlineMissed: (user) => {
//     // Cрок по вашей задаче истек
//     // Если пользователь не закрыл задачу в срок
//     emailGenerator(
//       user.email,
//       'Missed deadline for your Task',
//       `
//         <p>
//           Hi, ${user.firstName}!
//         </p>

//         <p>
//           Please consider that you’ve missed the deadline for your Task, so this task is locked for you, sorry about it.
//         </p>

//         <p>
//           But you can take another task!
//         </p>

//         <p>
//           <a href="https://emotionminer.com">Go to Task board</a>.
//         </p>

//         <p>
//           Best regards,<br>
//           Emotion Miner Team
//         </p>
//       `
//     );
//   },


//   taskRefusal: (user) => {
//     emailGenerator(
//       user.email,
//       'Task refusal confirmation',
//       `
//         <p>
//           Hi, ${user.firstName}!
//         </p>

//         <p>
//           Thank you for notification!
//           We would like to confirm you that we’ve received your task refusal.
//           Your balance has been topped up with appropriate sum.
//         </p>

//         <p>
//           Now you can take another task!
//         </p>

//         <p>
//           <a href="https://emotionminer.com">Go to Task board</a>.
//         </p>

//         <p>
//           Best regards,<br>
//           Emotion Miner Team
//         </p>
//       `
//     );
//   },


//   testsFinished: (user) => {
//     emailGenerator(
//       user.email,
//       'Congratulations on finishing all types of mini-tests!',
//       `
//         <p>
//           Hi, ${user.firstName}!
//         </p>

//         <p>
//           Congratulations on finishing all types of mini-tests!
//           Now you can take more profitable tasks (Extended Tasks and Jedi Master Task)!
//         </p>

//         <p>
//           <a href="https://emotionminer.com">Go to Task board</a>.<br>
//           Also, you can improve your emotion recognition skills by passing any other required mini-tests.
//         </p>

//         <p>
//           <a href="https://emotionminer.com">Go to mini-tests page</a>
//         </p>

//         <p>
//           Best regards,<br>
//           Emotion Miner Team
//         </p>
//       `
//     );
//   },


//   moneyRequest: (mRequest) => {
//     emailGenerator(
//       mRequest.email,
//       'New Money Request',
//       `
//         <p>
//           Dear Mr. Admin,
//         </p>
//         <p>
//           Annotator with AID <strong>${mRequest.AID}</strong> has earned <strong>$${mRequest.price}</strong> and wants to receive this amount of money.
//         </p>
//         <p>
//           Please, <a href="http://emotionminer.com">go to the web-site and pay</a> as soon as possible.
//         </p>
//       `
//     );
//   },


//   moneyRequestAlert: (user) => {
//     emailGenerator(
//       user.email,
//       'Your money transfer request is received',
//       `
//         <p>
//           Hi, ${user.firstName}!
//         </p>

//         <p>
//           Thank you for collaboration!
//           We got your money transfer request.
//           We’ll perform a quality control check and either accept or reject your request based on the results of verification.<br>Please note that it may take up to 7 working days.
//         </p>

//         <p>
//           If the withdrawal request is erroneous, please contact us.
//         </p>

//         <p>
//           <a href="mailto:info@emotionminer.com">Contact us</a>
//         </p>

//         <p>
//           Best regards,<br>
//           Emotion Miner Team
//         </p>
//       `
//     );
//   },


//   moneyTransferConfirmation: (user) => {
//     // Мы провели платеж по указаным рекизитам
//     // данные по денежным операциям
//     // имя, ссылка на создать новое письмо
//     emailGenerator(
//       user.email,
//       'Money transfer confirmation',
//       `
//         <p>
//           Hi, ${user.firstName}!
//         </p>

//         <p>
//           Your work has successfully passed a quality control check.<br>We’ve just transfered the money you requested to your PayPal account.
//           Thank you for collaboration!
//         </p>

//         <p>
//           If you haven't received the money yet, please contact us.
//         </p>

//         <p>
//           <a href="mailto:info@emotionminer.com">Contact us</a>
//         </p>

//         <p>
//           Best regards,<br>
//           Emotion Miner Team
//         </p>
//       `
//     );
//   },


//   networkingAward: (user) => {
//     emailGenerator(
//       user.email,
//       'Your networking bonus',
//       `
//         <p>
//           Hi, ${user.firstName}!
//         </p>

//         <p>
//           We calculated the 10% bonus of your friends’ earnings this week and added it to your balance.
//           Thank you for your collaboration!
//         </p>

//         <p>
//           As usual, you can request a money withdrawal if it’s equal or more than $5.
//         </p>

//         <p>
//           Best regards,<br>
//           Emotion Miner Team
//         </p>
//       `
//     );
//   },


//   networkingInvite: (invite) => {
//     emailGenerator(
//       invite.email,
//       'Your friend invited you to earn money in the Emotion Miner project',
//       `
//         <p>
//           Hi there!
//         </p>

//         <p>
//           <strong>${invite.referer}</strong> has invited you to join <strong><a href="https://www.emotionminer.com/networking/invite?login=${invite.login}">Emotion Miner</a></strong> platform.
//         </p>

//         <p>
//           It’s a project where you get paid for watching TV-shows and annotating emotions recognized in the videos.
//         </p>

//         <p>
//           This way you help advance the science, boost your emotional intelligence and earn money.
//         </p>

//         <p>
//           <strong>Please use thе link above to sign up.</strong>
//         </p>

//         <p>
//           Best regards,<br>
//           Emotion Miner Team
//         </p>
//       `
//     );
//   },

//   englishTestBan: (user) => {
//     emailGenerator(
//       user.email,
//       'Your account is blocked',
//       `
//         <p>
//           Dear ${user.firstName}!
//         </p>

//         <p>
//           Thank you for your interest in Emotion Miner project!
//           Unfortunately, we have to block your account because you failed the English test.
//         </p>

//         <p>
//           According to our Rules, good knowledge of the English language is obligatory for working on the platform.
//         </p>

//         <p>
//           We hope that in future we will find common ground with other initiatives.
//         </p>

//         <p>
//           Best regards,<br>
//           Emotion Miner Team
//         </p>
//       `
//     );
//   },

//   firstTaskEnded: (user) => {
//     emailGenerator(
//       user.email,
//       'You first Standard Task is due to the quality control check',
//       `
//         <p>
//           Hi, ${user.firstName}!
//         </p>

//         <p>
//           Congratulations on finishing your first Standard task!
//           Your work is due to the quality control check.
//           It might take up to 3 working days.
//           If it's a pass you will be able to continue working on the platform.
//           If it's a fail your account will be blocked.
//         </p>

//         <p>
//           We will send you an e-mail notification once the results of the check are ready.
//           For more information on money requests and quality control checks consult FAQ.
//         </p>

//         <p>
//           Please note that if the quality check is passed and the withdrawal request is accepted, it will take another day or two to fulfill the request.
//         </p>

//         <p>
//           Best regards,<br>
//           Emotion Miner Team
//         </p>
//       `
//     );
//   },

//   annotatorBanned: (user) => {
//     emailGenerator(
//       user.email,
//       'Your account is blocked',
//       `
//         <p>
//           Dear ${user.firstName}!
//         </p>

//         <p>
//           We are sorry to inform you that your account is blocked.
//           This might be due to the following reasons:
//         </p>

//         <ol>
//           <li>Your work has not passed our quality control check. Our platform was created with the ultimate goal of scientific advancement in emotion research. We need to secure high-quality results by attracting participants who demonstrate strong annotating skills.</li>
//           <li>You have breached the prohibition stated in the Rules of the project.</li>
//         </ol>

//         <p>
//           Thank you for your interest in our project!
//           Hope that in future we will find a common ground with some other initiatives.
//         </p>

//         <p>
//           Best regards,<br>
//           Emotion Miner Team
//         </p>
//       `
//     );
//   },

//   annoTaskApproved: (user) => {
//     emailGenerator(
//       user.email,
//       'You first Standard Task is a pass',
//       `
//         <p>
//           Hi, ${user.firstName}!
//         </p>

//         <p>
//           Your first Standard Task has successfully passed a quality control check.
//           Now you can continue working on the platform.
//         </p>

//         <p>
//           Please note that all completed tasks are also due to quality control check upon money withdrawal.
//         </p>

//         <p>
//           Best regards,<br>
//           Emotion Miner Team
//         </p>
//       `
//     );
//   },

//   withdrawalDetails: (user) => {
//     emailGenerator(
//       user.email,
//       'Your money transfer request is received',
//       `
//         <p>
//           Hi, ${user.firstName}!
//         </p>

//         <p>
//           Thank you for collaboration!
//           We got your money transfer request.
//         </p>

//         <p>
//           Request details:<br>
//           Date: ${user.date}<br>
//           Time: ${user.time} UTC<br>
//           Amount: $${user.price}.
//         </p>

//         <p>
//           We’ll perform a quality control check and either accept or reject your request based on the results of verification.
//           Please note that it may take up to 7 working days.
//         </p>

//         <p>
//           If the withdrawal request was sent by mistake, please contact us.
//         </p>

//         <p>
//           Best regards,<br>
//           Emotion Miner Team
//         </p>
//       `
//     );
//   },


//   moneyTransfered: (user) => {
//     const message = user.taskType === 'networking' ? 'Your networking earnings have been sent to your PayPal/Payoneer account.' : `
//       Your task has successfully passed our quality control check.
//       The requested money has been sent to your PayPal/Payoneer account.
//     `;

//     const taskInfo = user.taskType === 'networking' ? '' : `Task info: ${user.taskType}<br>`;

//     emailGenerator(
//       user.email,
//       'Money transfer accepted',
//       `
//         <p>
//           Hi, ${user.firstName}!
//         </p>

//         <p>
//           ${message}
//           Thank you for collaboration!
//         </p>

//         <p>
//           Payment details:
//           Date: ${user.date}<br>
//           Time: ${user.time} UTC<br>
//           ${taskInfo}
//           Amount: $${user.price}.
//         </p>

//         <p>
//           If you haven't received the money, please contact us.
//         </p>

//         <p>
//           Best regards,<br>
//           Emotion Miner Team
//         </p>
//       `
//     );
//   },

//   moneyTransferRejected: (user) => {
//     emailGenerator(
//       user.email,
//       'Money transfer rejected',
//       `
//         <p>
//           Hi, ${user.firstName}!
//         </p>

//         <p>
//           Unfortunately, your work has not passed our quality control check.
//           The results that are qualified as a fail do not get paid for.
//         </p>

//         <p>
//           Request details:<br>
//           Date: ${user.date}<br>
//           Time: ${user.time} UTC<br>
//           Task info: ${user.taskType}<br>
//           Amount: $${user.price}.
//         </p>

//         <p>
//           We kindly ask you to revise the concepts from our Tutorials to avoid the risk of failing in further tasks.
//           If you have any questions or doubts regarding the concepts, feel free to email us.
//           We'll be glad to help!
//         </p>

//         <p>
//           We also suggest that you take a task only when you can stay focused on it during the completion.
//           And don't forget, that if you are unsure about certain fragments, you can always switch to a full video to get a broader context.
//         </p>

//         <p>
//           Best regards,<br>
//           Emotion Miner Team
//         </p>
//       `
//     );
//   },

//   camAccepted: (user) => {
//     emailGenerator(
//       user.email,
//       'можешь взять таск',
//       `
//         <p>
//           Hi, ${user.firstName}!
//         </p>

//         <p>
//           Congratulations!
//           Your web-camera and recording conditions are appropriate for Video Recording Task!
//           Now you can <a href="http://emotionminer.com/#/profile/videoRecordingTask">take on a task</a>!
//         </p>

//         <p>
//           Best regards,<br>
//           Emotion Miner Team
//         </p>
//       `
//     );
//   },

//   camRejected: (user) => {
//     emailGenerator(
//       user.email,
//       'тебе брать таск нельзя',
//       `
//         <p>
//           Hi, ${user.firstName}!
//         </p>

//         <p>
//           Unfortunately, your web-camera and recording conditions are inappropriate for Video Recording Task.
//           Do not upset, there will be a lot of interesting projects on Emotion Miner platform.
//         </p>

//         <p>
//           Thank you for participation!
//         </p>

//         <p>
//           Best regards,<br>
//           Emotion Miner Team
//         </p>
//       `
//     );
//   }
// }

// module.exports = mailTypes;
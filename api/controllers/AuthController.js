	/**
	 * AuthController
	 *
	 * @description :: Server-side actions for handling incoming requests.
	 * @help        :: See https://sailsjs.com/docs/concepts/actions
	 */
	module.exports = {
    // регистрация нового аннотатора
    register: (req, res) => {
      // запоминаем данные запроса
      let user = req.allParams();

      // проверяем корректность введённых данных
      if (user.email === "") {
        res.status(400).send('no email');
      } else {
        // проверяем, есть ли такой пользователь
        User.find({
          or: [
            {email: user.email},
            {login: user.login}
          ]
        }).limit(1).exec(async (error, foundUser) => {
          if (error) {
            sails.log.error(error);
          } else {
            // если пользователь новый, то регистрируем
            if (foundUser.length === 0) {
              console.log(user);

              // шифруем пароль
              // user.password = CryptoService.encryptPassword(user.password);

              // регистрируем аннотатора
              const createdUser = await User.create(user).fetch();

              console.log(createdUser);
              // генерируем токен
              const emailToken = CryptoService.generateTokenFromJSON(user);
              user.emailToken = emailToken;

              // res.json({email: user.email});

              Tokens.create({
                id_user: createdUser.id,
                token: emailToken
              }).exec((error, token) => {
                if (error) {
                  sails.log.error(error);
                } else {
                  // отправляем оповещение на почту новому аннотатору
                  user.hostName = req.headers.host;
                  // EmailService.signUp(user);

                  // отправляем почту
                  res.json({email: user.email});
                }
              });
            } else {
              if (foundUser.email === user.email) {
                Tokens.find({
                  id_user: foundUser.id
                }).exec((error, token) => {
                  if (error) {
                    sails.log.error(error);
                  } else {
                    // проверяем, было ли подтверждение
                    if (token) {
                      // не было — отправляем повторное письмо
                      user.hostName = req.headers.host;
                      user.emailToken = token.token;
                      EmailService.signUp(user);

                      res.status(400).send('email exists resend');
                    } else {
                      // было — пусть восстанваливает пароль
                      res.status(400).send('email exists');
                    }
                  }
                });
              } else if (foundUser.login === user.login) {
                res.status(400).send('login exists');
              }
            }
          }
        });
      }
    },


    // подтверждение email
    confirmEmail: (req, res, next) => {
      let user = req.params.all();

      // проверяем токен при подтверждении регистрации
      Tokens.findOne({
        token: user.token
      }).populateAll().exec((error, token) => {
        if (error) {
          sails.log.error(error);
        } else {
          if (token) {
            if (token.id.email === user.email) {
              // удаляем токен
              Tokens.query(`DELETE FROM tokens WHERE token = '${token.token}'`, [], (error, result) => {
                if (error) {
                  sails.log.error(error);
                } else {
                  // регистрируем пользователя
                  AnnotatorInfo.update(
                    {
                      id: token.id.id,
                    },
                    {
                      registered: 1
                    }
                  ).exec((error, updated) => {
                    if (error) {
                      sails.log.error(error);
                    }
                  });

                  // отправляем уведомление на почту
                  EmailService.sendInfoMailToid(token.id.id, 'registered');

                  // авторизируем пользователя
                  req.session.userId = token.id.id;
                  req.session.isAuth = true;

                  // переходим на сайт
                  res.redirect('/');
                }
              });
            } else {
              // пользователь уже зарегистрирован. нужно восстановить пароль
              // res.send({error: "already registered"});
              res.redirect('/');
            }
          } else {
            // сообщаем о том, что ссылка недействительна (почта не зарегистрирована) и переводим на страницу авторизации
            // res.send({error: "token invalid"});
            res.redirect('/');
          }
        }
      });
    },


    // // вход в систему
    // login: (req, res, next) => {
    //   // запоминаем данные запроса
    //   let user = req.params.all();

    //   // шифруем пароль
    //   user.password = CryptoService.encryptPassword(user.password);

    //   // ищем пользователя по указанным данным
    //   User.findOne({
    //     or: [
    //       {email: user.login},
    //       {login: user.login}
    //     ]
    //   }).exec((error, foundUser) => {
    //     if (error) {
    //       sails.log.error(error);
    //     } else {
    //       // обрабатываем ошибки
    //       if (foundUser) {
    //         if (user.password === foundUser.password) {
    //           // вынимаем дополнительную инфу
    //           User.findOne({ // лучше использовать populate. но не выходить (нужно чтобы sails сам создал таблицу)
    //             id: foundUser.id
    //           }).exec((error, otherInfo) => {
    //             if (error) {
    //               sails.log.error(error);
    //             } else {
    //               if (otherInfo.registered) {
    //                 if (!otherInfo.bannedHard) {
    //                   // авторизируем пользователя
    //                   req.session.isAuth = true;
    //                   req.session.userId = foundUser.id;

    //                   // сообщаем, когда пользователь в последний раз заходил на сайт
    //                   updateLastLogin(req.session.userId);

    //                   if (!otherInfo.tutorials) {
    //                     otherInfo.tutorials = [
    //                       [0, 0, 0],
    //                       [0, 0, 0],
    //                       [0, 0, 0],
    //                       [0, 0, 0]
    //                     ];
    //                   } else {
    //                     otherInfo.tutorials = JSON.parse(otherInfo.tutorials);
    //                   }

    //                   // передаём данные пользователя
    //                   const user = {
    //                     id: foundUser.id,
    //                     username: foundUser.login,
    //                     email: foundUser.email
    //                   };

    //                   // отправляем результат
    //                   res.json(user);
    //                 } else {
    //                   res.status(400).send('banned hard');
    //                 }
    //               } else {
    //                 res.status(400).send('email is not validated');
    //               }
    //             }
    //           });
    //         } else {
    //           res.status(400).send('incorrect password');
    //         }
    //       } else {
    //         res.status(400).send('no email');
    //       }
    //     }
    //   });
    // },


    // // выходим из системы
    // logout: (req, res, next) => {
    //   // редактируем сессию
    //   req.session.isAuth = false;
    //   delete req.session.userId;

    //   // выходим из режима восстановления пароля
    //   delete req.session.changesPassword;

    //   // сообщаем об успехе
    //   res.send('true');
    // },


    // // напоминание пароля
    // forgot: (req, res, next) => {
    //   // запоминаем данные запроса
    //   let user = req.params.all();

    //   // ищем пользователя по email
    //   User.findOne({
    //     email: user.email
    //   }).exec((error, foundUser) => {
    //     if (error) {
    //       sails.log.error(error);
    //     } else {
    //       if (foundUser) {
    //         AnnotatorInfo.findOne({
    //           id: foundUser.id
    //         }).exec((error, foundUserInfo) => {
    //           if (!foundUserInfo.bannedHard) {
    //             // достаём данные аннотатора
    //             AnnotatorProfile.findOne({
    //               id: foundUser.id
    //             }).exec((error, foundUserProfile) => {
    //               if (error) {
    //                 sails.log.error(error);
    //               } else {
    //                 // разделяем имя и фамилию аннотатора
    //                 const names = foundUserProfile.name.split(',');
    //                 foundUser.firstName = names[1];
    //                 foundUser.secondName = names[0];

    //                 // генерируем токен и записываем в базу
    //                 foundUser.emailToken = CryptoService.generateTokenFromJSON(foundUser);

    //                 const doAfterCheckToken = () => {
    //                   // высылаем письмо со ссылкой на страницу смены пароля
    //                   foundUser.hostName = req.headers.host;
    //                   EmailService.forgotPassword(foundUser);

    //                   // сообщаем об успехе
    //                   res.send('true');
    //                 };

    //                 Tokens.findOne({
    //                   id: foundUser.id
    //                 }).exec((error, token) => {
    //                   if (error) {
    //                     sails.log.error(error);
    //                   } else {
    //                     if (token) {
    //                       // токен уже есть — обновляем
    //                       Tokens.update(
    //                         {
    //                           id: foundUser.id
    //                         },
    //                         {
    //                           token: foundUser.emailToken
    //                         }
    //                       ).exec((error, updated) => {
    //                         if (error) {
    //                           sails.log.error(error);
    //                         } else {
    //                           doAfterCheckToken();
    //                         }
    //                       });
    //                     } else {
    //                       // токена ещё нет — создаём
    //                       Tokens.create(
    //                         {
    //                           id: foundUser.id,
    //                           token: foundUser.emailToken
    //                         }
    //                       ).exec((error, updated) => {
    //                         if (error) {
    //                           sails.log.error(error);
    //                         } else {
    //                           doAfterCheckToken();
    //                         }
    //                       });
    //                     }
    //                   }
    //                 });
    //               }
    //             });
    //           } else {
    //             res.status(400).send('banned hard');
    //           }
    //         });
    //       } else {
    //         res.status(400).send('no email');
    //       }
    //     }
    //   });
    // },


    // // переход на страницу изменения пароля
    // forgotPassword: (req, res, next) => {
    //   // запоминаем данные запроса
    //   let user = req.params.all();

    //   // проверяем токен
    //   Tokens.findOne({
    //     token: user.token
    //   }).populateAll().exec((error, token) => {
    //     if (error) {
    //       sails.log.error(error);
    //     } else {
    //       if (token) {
    //         if (token.id.email === user.email) {
    //           // удаляем токен
    //           Tokens.query(`DELETE FROM tokens WHERE token = '${user.token}'`, [], (error, result) => {
    //             if (error) {
    //               sails.log.error(error);
    //             } else {
    //               // авторизируем пользователя
    //               req.session.changesPassword = user.email;

    //               // переходим на сайт
    //               res.redirect('/#/changePassword');
    //             }
    //           });
    //         } else {
    //           // пользователь уже зарегистрирован. нужно восстановить пароль
    //           // res.send({error: "already registered"});
    //           res.redirect('/');
    //         }
    //       } else {
    //         // сообщаем о том, что ссылка недействительна (почта не зарегистрирована) и переводим на страницу авторизации
    //         // res.send({error: "token invalid"});
    //         res.redirect('/');
    //       }
    //     }
    //   });
    // },


    // checkPassword: (req, res, next) => {
    //   const email = req.param('email');
    //   const password = CryptoService.encryptPassword(req.param('password'));

    //   User.findOne({
    //     email: email,
    //     password: password
    //   }).exec((error, foundUser) => {
    //     if (error) {
    //       sails.log.error(error);
    //     } else {
    //       if (foundUser) {
    //         res.json(true);
    //       } else {
    //         res.json(false);
    //       }
    //     }
    //   });
    // },


    // // изменение пароля
    // changePass: (req, res, next) => {
    //   // принимаем данные
    //   const email = req.session.changesPassword || req.param('email');
    //   const newPass = CryptoService.encryptPassword(req.param('password'));

    //   // запускаем пользователя на сервер
    //   User.findOne({
    //     email: email
    //   }).exec((error, foundUser) => {
    //     if (error) {
    //       sails.log.error(error);
    //     } else {
    //       if (foundUser) {
    //         // обновляем пароль
    //         User.update(
    //           {
    //             id: foundUser.id
    //           },
    //           {
    //             password: newPass
    //           }
    //         ).exec((error, updated) => {
    //           if (error) {
    //             sails.log.error(error);
    //           } else {
    //             // проверяем, регистрировался ли пользователь
    //             AnnotatorInfo.findOne({
    //               id: foundUser.id
    //             }).exec((error, foundUserInfo) => {
    //               if (error) {
    //                 sails.log.error(error);
    //               } else {
    //                 // если ещё не регистрировался
    //                 if (!foundUserInfo) {
    //                   // регистрируем и создаём таблицу с дополнительной информцией
    //                   AnnotatorInfo.create({
    //                     id: foundUser.id,
    //                     registered: 1
    //                   }).exec((error, updated) => {
    //                     if (error) {
    //                       sails.log.error(error);
    //                     }
    //                   });
    //                 }

    //                 // редактируем сессию
    //                 req.session.isAuth = true;
    //                 req.session.userId = foundUser.id;
    //                 delete req.session.changesPassword

    //                 // // сообщаем, когда пользователь в последний раз заходил на сайт
    //                 // updateLastLogin(userid);

    //                 // отправляем данные пользователя
    //                 res.json(foundUser);

    //                 // // перезапускаем сайт
    //                 // res.redirect('/');
    //               }
    //             });
    //           }
    //         });
    //       }
    //     }
    //   });
    // },

    getUsers: (req, res) => {
      User.find().exec((error, users) => {
        res.json(users);
      })
    }
	};
import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import UnauthorizedError from '../errors/UnauthorizedError.js';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле email не заполнено'],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Не подходящий email',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле password не заполнено'],
    select: false,
  },
  name: {
    type: String,
    minlength: [2, 'Поле имя `{VALUE}` содержит менее 2 символов'],
    maxlength: [30, 'Поле имя `{VALUE}` содержит более 30 символов'],
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (user) {
        return bcrypt.compare(password, user.password)
          .then((checked) => {
            if (checked) {
              const userOutOfPassword = user.toObject();
              delete userOutOfPassword.password;
              return userOutOfPassword;
            }
            throw new UnauthorizedError('Указаны некорректные почта или пароль');
          });
      }
      throw new UnauthorizedError('Указаны некорректные почта или пароль');
    });
};
export default mongoose.model('user', userSchema);

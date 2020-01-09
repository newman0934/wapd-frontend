//include vee-validate
import { required, confirmed, length, email, alpha_num, regex } from "vee-validate/dist/rules";
import { extend, localize } from "vee-validate";
import TW from 'vee-validate/dist/locale/zh_TW.json'

localize('zh_TW', TW)
extend("required", {
  ...required,
  message: "這個欄位為必填"
});

extend("email", {
  ...email,
  message: "請填入有效的Email"
});

extend("password", {
  validate: value => {
    return value.length >= 6 && value.length <= 50
  },
  message: "密碼為6碼以上，並至少含一個英文及數字"
});

extend("confirmed", {
  ...confirmed,
  message: "密碼確認欄位驗證有誤"
});

extend("length", {
  ...length,
  message: "This field must have 2 options"
});

extend("alpha_num", {
  ...alpha_num,
  message: "僅可填入英文及數字"
});

extend("regex", {
  ...regex,
  message: "格式有誤"
});
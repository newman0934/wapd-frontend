//include vee-validate
import { required, confirmed, length, email } from "vee-validate/dist/rules";
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

extend("confirmed", {
  ...confirmed,
  message: "密碼確認欄位驗證有誤"
});

extend("length", {
  ...length,
  message: "This field must have 2 options"
});

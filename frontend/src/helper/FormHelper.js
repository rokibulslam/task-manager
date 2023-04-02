
let EmailRegx = /\S+@\S+\.\S+/;

class FormHelper {
  IsEmpty(value) {
    return value.length === 0;
  }
  IsEmail(value) {
    return !EmailRegx.test(value);
  }


  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
}

export const {
  IsEmpty,
  IsEmail,
 
  getBase64,
  
} = new FormHelper();

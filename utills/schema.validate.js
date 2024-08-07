const yup = require('yup');


const phone = /^09\d{9}$/;
const addUser = yup.object().shape({
    fullName: yup.string().required('fullName is required'),
    phoneNumber: yup.string().matches(phone, 'Phone number is not valid').required('please enter your phoneNumber'),
    password: yup.string().required('please enter your password because password is required'),
    userName: yup.string().required('please enter your userName')
});

module.exports={addUser};